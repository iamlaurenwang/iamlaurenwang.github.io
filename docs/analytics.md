# 網站訪客分析

> 狀態：**階段一實作中**——`docs` 已就位，等待 Cloudflare beacon token 才能掛載 script。階段二（GA4）尚未動工，需先回覆下方待確認事項。

## 背景

導入前網站**完全沒有任何分析追蹤**。`src/firebase/index.ts` 雖然 `import { getAnalytics }`，但從未呼叫，是個死 import；`VITE_FIREBASE_MEASUREMENT_ID` 也已接到 CI 卻沒有實際作用。等於「零可見度」：不知道有沒有人來、來了多久、從哪來。

要回答的四個問題：

1. 有使用者在觀看我的網站
2. 他停留多久
3. 使用者從哪裡進來的
4. 他在哪一頁停留最久

## 架構決策

### 分兩階段：先 Cloudflare，再 GA4

| 需求 | Cloudflare Web Analytics | GA4 |
|---|---|---|
| 1. 有人在看 | 🟡 有瀏覽量／訪問數，無「現在幾人在線」即時面板 | ✅ 即時報表（過去 30 分鐘活躍使用者） |
| 2. 停留多久 | ❌ 無此指標 | ✅ 平均參與時間 |
| 3. 從哪裡進來 | ✅ Referrer 排行 | ✅ 流量來源／管道 |
| 4. 哪頁停留最久 | ❌ 只有各頁瀏覽次數 | ✅ 各頁平均參與時間 |

**四個需求要全滿足，GA4 是必要的那一步，CF 不是。** 先做 CF 不是為了省時間，是為了**隱私分層**：CF 無 Cookie、不需同意橫幅，可永遠對 100% 訪客開著；GA4 之後若加上同意橫幅，拒絕的訪客就沒資料了，CF 那份仍持續計數，成為保底流量計數器。

### 曾評估但捨棄的做法

- **Umami Cloud**：免費方案 10 萬事件/月、無 Cookie、且**有**各頁停留時間，理論上一套就能滿足四個需求。捨棄理由：需再註冊第三方帳號，且免費方案資料保留期較短。
- **只用 Cloudflare**：無法滿足需求 2 與 4，資訊量不足。
- **啟用現有 `firebase/analytics`**：未捨棄，是階段二的候選接法之一，見下方待確認事項。

### 全域風險：hash 路由

網址形如 `iamlaurenwang.github.io/#/teaching`。第三方 script 的自動追蹤只認 `location.pathname`，**`#` 後的部分不會被送出**——所有頁面都可能被記成同一頁 `/`，需求 4 直接報廢。

- **GA4**（階段二）：可解。關掉自動 `page_view`，改在 `src/router/index.ts` 用 `afterEach` 手動送 `to.fullPath`。該檔目前完全沒有導航守衛，是乾淨的插入點。
- **CF**（階段一）：beacon 是黑箱、無 API 可介入，**各頁瀏覽量在 hash 路由下大機率是壞的**。不影響階段一的主要目的（需求 3 Referrer ＋ 需求 1 的流量存在性），但需實測並把結果記在下方。

## 階段一：Cloudflare Web Analytics

CF Web Analytics 支援非 CF 託管的站台，透過 JS beacon 掛載，**不需要把 DNS 轉到 Cloudflare**。

### 手動前置作業

1. 註冊／登入 Cloudflare 帳號
2. 進入 **Analytics & Logs → Web Analytics → Add a site**
3. 網站填 `iamlaurenwang.github.io`
4. 複製產生的 **beacon token**（一串 hex）

> beacon token 是**公開值**（本來就會出現在所有訪客的 HTML 原始碼裡），因此直接寫死在 `index.html`，不需要環境變數，不用改 `.env.example`、`env.d.ts` 或 `deploy.yml`。

### 檔案異動清單

| 檔案 | 異動 |
|---|---|
| `index.html` | 在 `</body>` 前加入 CF beacon script |
| `docs/analytics.md` | 本文件（新增） |

### 驗證步驟

1. `npm run build && npm run preview` — 確認 `dist/index.html` 有帶上 beacon
2. 推上 `main`，等 `.github/workflows/deploy.yml` 跑完
3. DevTools Network 面板造訪線上站台，確認 `beacon.min.js` 200 載入、且有一筆送往 `cloudflareinsights.com` 的請求
4. **hash 路由實測**：依序走 `/#/` → `/#/teaching` → `/#/resume` → `/#/notes`，等 CF dashboard 出數據後看 **Top pages** 是四筆不同路徑、還是全部併成 `/`
5. 從外部連結點進來一次，隔天確認 CF **Referrers** 有記到（需求 3 的驗收）

> CF Web Analytics 數據非即時，通常延遲數分鐘；第一次上線建議隔 1 天再看趨勢。

### hash 路由實測結果

⬜ **尚未實測**——上線後補寫。要記錄的是：CF 的 Top pages 有沒有區分 `#` 後的路徑。若沒有，則 CF 只能當總流量與 Referrer 的來源，各頁分析完全交給階段二的 GA4。

## 階段二：GA4（尚未動工）

完成需求 2（停留多久）與需求 4（哪頁停留最久），並補上需求 1 的真·即時面板。

### 待確認事項（動工前需回覆）

1. **GA4 接法二選一**：
   - **(A) 標準 gtag.js**（規劃時的推薦）：在 `index.html` 貼官方 snippet，由 Google CDN 非同步載入、不進 bundle；GA4 標準網站報表全部可用、文件最多、DebugView 最好除錯。代價：需新增 `VITE_GA_MEASUREMENT_ID`，要同步改 `env.d.ts`、`.env.example`、`deploy.yml` 三處。
   - **(B) 沿用現有 `firebase/analytics`**：`src/firebase/index.ts` 已 import `getAnalytics` 卻沒呼叫，`VITE_FIREBASE_MEASUREMENT_ID` 也已在 `deploy.yml` 中，加一行 `getAnalytics(app)` 即通、不用碰環境變數。代價：約 30KB 打進 bundle，且事件模型偏手機 App 風格。
2. **Measurement ID 放哪裡**（若選 A）：依 `deploy.yml` 既有註解「site key 為公開值，放在 repo Variables（非 Secrets）」的先例，GA Measurement ID 同為公開值 → 放 **repo Variables**，用 `vars.*` 而非 `secrets.*`。

### 預計異動（選 A 的情況）

| 檔案 | 異動 |
|---|---|
| `index.html` | gtag snippet，`config` 帶 `{ send_page_view: false }` 關掉自動 pageview |
| `src/router/index.ts` | 新增 `router.afterEach`，手動送 `page_view`，`page_path` 用 `to.fullPath` |
| `env.d.ts` | `ImportMetaEnv` 加 `readonly VITE_GA_MEASUREMENT_ID: string` |
| `.env.example` | 補上新 key。順帶：此檔目前**漏了** `VITE_RECAPTCHA_V3_SITE_KEY`，可一併補齊 |
| `.github/workflows/deploy.yml` | build step 的 `env:` 加一行 `VITE_GA_MEASUREMENT_ID: ${{ vars.VITE_GA_MEASUREMENT_ID }}` |

> 停留時間的精細度已確認：**用 GA4 內建的「平均參與時間」即可**，不自行實作 Page Visibility API + sendBeacon 的精準計時。

### 驗證步驟

用 GA4 **DebugView**（加 `?debug_mode=1` 或 gtag 設 `debug_mode: true`）確認：切換路由時每次都收到一筆 `page_view`，且 `page_path` 是 `/#/teaching` 這種帶 hash 的完整路徑、不是全部 `/`。這是需求 4 的驗收條件。

## 未完成事項

- 🟡 **階段一**：`docs` 已就位，**等待 Cloudflare beacon token** 才能改 `index.html` 並上線
- ⬜ **階段一**：hash 路由實測，結果寫回上方「hash 路由實測結果」段落
- ⬜ **階段二**：GA4 導入（先回覆上方兩個待確認事項）
- ⬜ **Cookie 同意橫幅**：GA4 會寫 Cookie，若在意 GDPR 需做同意流程（同意後才載入 gtag）。CF 那份無 Cookie、不受影響，可維持永遠開啟。做到 GA4 時再一併處理
- ⬜ **清掉死 import**：`src/firebase/index.ts` 的 `getAnalytics` import 目前完全沒用到。若階段二選 (A) gtag.js，這行應直接刪除；若選 (B) 則會被啟用。**階段一不要動這行**
