# 網站訪客分析

> 狀態：**階段一、階段二程式碼皆已完成**。階段二採標準 gtag.js，本機端對端驗證通過，**但上線前必須先在 GitHub repo 設定 `VITE_GA_MEASUREMENT_ID` 這個 Variable**，否則追蹤會靜默停用。Cookie 同意橫幅本輪不做，見未完成事項。

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

✅ **已確認：CF 無法區分 hash 路由的各頁，Top pages 會全部併成 `/`。**

驗證方式不是等 dashboard 出數據，而是直接讀 `beacon.min.js`（31,612 bytes）的原始碼，結論更確定：

| 檢查項 | 結果 |
|---|---|
| `location.hash` 出現次數 | **0**（完全沒用到） |
| `location.href` 出現次數 | **0**（完全沒用到） |
| `location.pathname` 出現次數 | 3（回報頁面路徑的唯一來源） |
| `pushState` / `popstate` | 有攔截，SPA 換頁**會**被計為新的 page view |

關鍵那段（beacon 組出回報網址的邏輯）：

```js
try { const e = new URL(t); return `${e.protocol}://${e.host}${e.pathname}` } catch (t) {}
// fallback:
else { const t = window.location.pathname; ... }
```

即使 `pushState` 傳進來的網址是 `/#/teaching`，`new URL()` 之後只取 `protocol + host + pathname`——**hash 與 query 被明確捨棄**。

**實際影響**：

- ✅ 需求 3（Referrer）不受影響，正常運作
- ✅ 需求 1（有沒有人來、總流量）不受影響。因為 beacon 有攔截 `pushState`，而 Vue Router 的 `createWebHashHistory` 底層正是用 `pushState`，所以每次換頁都**有**被計到，瀏覽量總數是對的
- ❌ 需求 4（哪頁停留最久）在 CF 完全無解。不只是「沒有停留時間」，連「各頁瀏覽量」都是壞的——所有換頁都灌進 `/` 這一筆，Top pages 只會有一列
- ❌ 需求 2（停留多久）本來就沒有此指標

**結論**：CF 的定位確定收斂成「總流量計數器 ＋ Referrer 來源」。**所有各頁分析（需求 2 和 4）完全交給階段二的 GA4**，且 GA4 那邊務必用 `router.afterEach` 手動送 `to.fullPath`，不能依賴任何自動追蹤——上面這段原始碼就是自動追蹤在 hash 路由下必壞的實證。

## 階段二：GA4（標準 gtag.js）

補上需求 2（停留多久）與需求 4（哪頁停留最久），並提供需求 1 的即時面板。

### 已定案的決策

- **接法：標準 gtag.js**（非 `firebase/analytics`）。理由：GA4 標準網站報表全部可用、文件最多、DebugView 好除錯，且 gtag.js 由 Google CDN 非同步載入，不進 bundle。
- **Measurement ID：`G-H9M6ND0C7W`**，走 `VITE_GA_MEASUREMENT_ID` 環境變數。依 `deploy.yml` 既有先例（「site key 為公開值，放在 repo Variables」），**放 repo Variables，不是 Secrets**。
- **同意橫幅：本輪不做**，GA4 直接載入，先取得完整資料。見未完成事項。

### 為什麼是 runtime 注入而不是 index.html 貼 snippet

gtag 的 script 由 `src/composables/useAnalytics.ts` 在 runtime 動態插入，而不是寫死在 `index.html`。這樣在**沒有 Measurement ID 時（本機開發、fork）會自動退化成完全不追蹤**，而不是發出一個 `id=%VITE_GA_MEASUREMENT_ID%` 的壞請求。已驗證：不帶環境變數 build 時，整段追蹤程式碼會被 tree-shake 掉，產物中不含任何 GA 痕跡。

### 兩個關鍵實作細節

**1. 關掉自動 page view，改由 router 手動送**

```ts
window.gtag('config', MEASUREMENT_ID, { send_page_view: false })
```

原因與階段一的 CF beacon 完全相同——自動追蹤只認 `location.pathname`，在 hash 路由下每頁都是 `/`。改由 `src/router/index.ts` 的 `afterEach` 逐次回報。

**2. 把 hash 路由改寫成真實路徑**

```ts
const pageLocation = `${window.location.origin}${path}`  // path 來自 to.fullPath
```

GA4 的 Page path 維度是從 `page_location` 推導的，**而且會丟棄 fragment**。若照實送 `http://host/#/teaching`，GA4 一樣會算成 `/`。因此把 `/#/teaching` 改寫成 `/teaching` 回報。

> **已知取捨**：GA4 報表裡顯示的網址（如 `https://iamlaurenwang.github.io/teaching`）**不是可直接點開的網址**——直接開會 404，因為 GitHub Pages 沒有 server-side routing，真實網址是 `/#/teaching`。換來的是各頁報表真正可用，這正是需求 4 的目的。看報表時心裡要有這個對應關係。

另外 `page_referrer` 會串接：第一次瀏覽用真實的外部 `document.referrer`（需求 3），之後的 SPA 換頁則指向站內前一頁。

### 檔案異動清單

| 檔案 | 異動 |
|---|---|
| `src/composables/useAnalytics.ts`（新增） | gtag 動態載入、`initAnalytics()`、`trackPageView()`；無 ID 時整組停用 |
| `src/router/index.ts` | 加 `router.afterEach`，送 `to.fullPath` |
| `src/main.ts` | 在 `app.use(router)` 之前呼叫 `initAnalytics()`（router 安裝時會觸發第一次導航） |
| `src/firebase/index.ts` | **刪掉**沒用到的 `getAnalytics` import |
| `env.d.ts` | 加 `VITE_GA_MEASUREMENT_ID` |
| `.env.example` | 補上 `VITE_GA_MEASUREMENT_ID`，並補回先前遺漏的 `VITE_RECAPTCHA_V3_SITE_KEY` |
| `.github/workflows/deploy.yml` | build step 加 `VITE_GA_MEASUREMENT_ID: ${{ vars.VITE_GA_MEASUREMENT_ID }}` |

順帶清掉的：`src/firebase/index.ts` 那行 `getAnalytics` import 從未被呼叫，卻讓整個 `@firebase/analytics` 套件被打包進去。刪除後確認產物中已無 `googletagmanager` 字串（該字串原本來自這個套件）。

### 本機端對端驗證結果

用 `npm run preview` 搭配瀏覽器實測，依序走過 `/#/` → `/#/teaching` → `/#/resume` → `/#/notes`，`window.dataLayer` 的實際內容：

```
0: js | 2026-08-18T16:27:59.726Z
1: config | G-H9M6ND0C7W | {"send_page_view":false}
2: event | page_view | {"page_location":"http://localhost:4173/",         "page_referrer":""}
5: event | page_view | {"page_location":"http://localhost:4173/teaching", "page_referrer":".../"}
6: event | page_view | {"page_location":"http://localhost:4173/resume",   "page_referrer":".../teaching"}
7: event | page_view | {"page_location":"http://localhost:4173/notes",    "page_referrer":".../resume"}
```

確認事項：

- ✅ 每次換頁都送出**恰好一筆** `page_view`
- ✅ `page_location` 的 `#` 已被改寫掉，四頁是四個不同路徑（需求 4 成立，與 CF 的行為形成對比）
- ✅ `page_referrer` 正確串接
- ✅ `send_page_view: false` 生效，沒有重複計數
- ✅ gtag.js 確實載入並執行（`window.google_tag_manager` 已定義），且 `_ga` cookie 已設定 → GA4 初始化成功

**未能在本機驗證的部分**：實際送往 Google 伺服器的 collect 請求攔不到——gtag.js 在載入時就持有 `sendBeacon` 等傳輸函式的參照，事後 monkey-patch 攔截不到。但 `_ga` cookie 已設定即代表 tag 正常運作。最終確認請用 GA4 DebugView，見下方。

### 上線後的驗收步驟

1. **先在 GitHub 設定 Variable**（否則追蹤不會啟用）：repo → Settings → Secrets and variables → Actions → **Variables** 分頁 → New repository variable，名稱 `VITE_GA_MEASUREMENT_ID`，值 `G-H9M6ND0C7W`
2. 推上 `main` 等部署完成
3. 開 GA4 → **管理 → DebugView**，瀏覽器裝 Google Analytics Debugger 擴充功能（或在網址加 `?debug_mode=1`）後造訪線上站台
4. 切換數個路由，確認 DebugView 每次都收到一筆 `page_view`，且 `page_location` 是 `/teaching` 這種改寫後的路徑、不是全部 `/`
5. 隔 24–48 小時後看**參與度 → 網頁和畫面**報表，確認各頁的「平均參與時間」有數據（需求 2 與 4 的最終驗收）

## 階段三：UTM／campaign 來源歸因

散發連結（FB／IG／名片 QR 等）時要知道訪客從哪個管道來。做法沿用既有 GA4，把連結帶的 `utm_*` 參數轉成 GA4 的 campaign 歸因。

### 為什麼不能靠 GA4 自動 UTM 歸因

GA4 的自動 campaign 歸因是讀 `location.search`（`#` 之前的真實 query）。但本站是 hash 路由，散發連結長這樣：

```
https://iamlaurenwang.github.io/#/tutoring?utm_source=facebook&utm_medium=social&utm_campaign=launch
```

`utm_*` 位在 `#` 片段內，`location.search` 是空的 → 自動歸因抓不到。與階段一、二遇到的是同一類 hash 路由問題。

### 做法

- **擷取來源**：用 Vue Router 的 `route.query`（它會正確解析 hash 片段內的 query），而不是 `location.search`。
- **保存**：`src/composables/useAttribution.ts` 在**第一次**偵測到任一 `utm_*` 時存進 `sessionStorage`，之後站內導頁不再覆蓋——維持「進站來源 = 整個 session 的來源」。
- **送進 GA4**：`src/composables/useAnalytics.ts` 的 `trackPageView` 在每次 `page_view` 事件 spread 上 campaign 參數。用的是 GA4 手動 campaign 歸因的保留參數名：

  | 連結 query | GA4 事件參數 |
  |---|---|
  | `utm_source` | `campaign_source` |
  | `utm_medium` | `campaign_medium` |
  | `utm_campaign` | `campaign_name` |
  | `utm_term` | `campaign_term` |
  | `utm_content` | `campaign_content` |

- **page_location 維持乾淨**：刻意**不**把 utm 串回 `page_location`。原因與 134 行的改寫同理——`page_location` 會餵給 Page path 維度，串上 utm 會讓每頁報表都被 `?utm_source=...` 污染。改用 `campaign_*` 事件參數做歸因，各頁報表維持乾淨。

擷取與鎖定判定都集中在 `src/router/index.ts` 的 `router.beforeEach`，它跑在 `afterEach`（trackPageView）之前，確保進站第一個 `page_view` 就帶上 campaign。

### 檔案異動清單

| 檔案 | 異動 |
|---|---|
| `src/composables/useAttribution.ts`（新增） | 擷取 utm_* → sessionStorage；`getCampaignParams()` 純函式回傳 campaign_* |
| `src/composables/useAnalytics.ts` | `trackPageView` spread `getCampaignParams()` 進 page_view |
| `src/router/index.ts` | `beforeEach` 呼叫 `detectAttribution(to.query)` |

### 驗證

開 `/#/tutoring?utm_source=facebook&utm_medium=social&utm_campaign=launch`，GA4 DebugView 的 `page_view` 應帶 `campaign_source=facebook`、`campaign_medium=social`、`campaign_name=launch`；站內再導頁到其他頁，參數仍在且不被覆蓋。不帶 utm 進站時 `page_view` 不含 campaign_*，與原行為一致。

## Tutoring 鎖定（散發家教連結用）

家教招生連結散出去後，希望訪客專注在 `/tutoring`（TutoringView）的家教體驗，不要逛進通用開發者作品集首頁 `/`（LandingView）。

- **判定「從 tutoring 進來」**（滿足任一即鎖定，`src/composables/useTutoringLock.ts` 存 `sessionStorage`）：
  1. session 進站的**第一個**路由就是 `/tutoring`；或
  2. 連結帶 `?src=tutoring`（可貼在任何頁面精準標記，例如某篇貼文導流）。
- **鎖定行為**：被標記後，任何導向 `RouteName.Landing`（`/`）的動作在 `router.beforeEach` 被導回 `/tutoring`（保留 query 讓 utm 不遺失）。**只擋 LandingView**，其餘頁面（visuals／notes／resume／ai／teaching／contact）不受影響。
- **不會誤鎖**：若使用者**先進 `/`** 再從 header 點進 tutoring（非初始導航、也沒帶 `?src=tutoring`），不會被標記，仍可自由回到 `/`。
- **範圍**：黏著整個瀏覽 session；關閉分頁重開（新 session）即清除。

## 未完成事項

- ⚠️ **上線前必做**：在 GitHub repo 設定 Variable `VITE_GA_MEASUREMENT_ID` = `G-H9M6ND0C7W`。**沒設定的話 GA4 會靜默停用**（不報錯、不追蹤），這是刻意的退化設計，但也代表忘記設定不會有任何警告
- ⬜ **GA4 上線驗收**：DebugView 確認 `page_view` 與改寫後的路徑；48 小時後確認各頁平均參與時間有數據
- ⬜ **CF Referrers 驗收**：階段一上線滿 1 天後回 CF dashboard 確認 Referrers 有資料（需求 3）
- ⬜ **排除本機測試流量**：本機驗證期間送了約 8 筆 `page_view` 到 GA4，hostname 為 `localhost`。建議在 GA4 設定內部流量規則或用 hostname 篩選排除，避免污染早期數據
- ⬜ **Cookie 同意橫幅**：本輪明確決定不做，先取得完整資料。GA4 會寫 `_ga` cookie，若之後要面向歐盟訪客需補上同意流程（同意後才呼叫 `initAnalytics()`——目前的架構已經預留好這個切入點，因為 gtag 是 runtime 才注入的）。CF 那份無 Cookie，不受影響
- ⬜ **各頁標題**：專案沒有 head 管理器，`document.title` 永遠是 "Lauren's Website"，所以 GA4 的 page_title 維度沒有鑑別度。報表改看 page path 即可；若想讓報表更好讀，可之後加上逐路由的標題
