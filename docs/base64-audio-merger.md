# Base64 → MP3 合併工具（`/visuals/base64`）

> 狀態：**規劃完成，尚未動工**。等待下方「待確認」項目回覆後開始實作。

## 背景

`src/views/visuals/Base64Converter.vue` 目前是佔位內容（複製自 Animation 頁的殘留）。目標：做一個網頁版工具，功能對應另一個獨立專案 `base64-converter`（Node CLI）已經做過的功能——把陣列中的 base64 音訊（欄位名為 `audio`，格式見同專案的 `example.md`）轉成 mp3，並且能**合併成單一檔案**。差異是這裡要能在網頁上操作＋點擊下載，而不是跑 CLI script。

## 架構決策

### 是否用後端（Firebase Cloud Functions）？

**否。** 曾評估用 Cloud Functions（2nd gen）重用 Node CLI 已驗證過的 `fluent-ffmpeg` + `ffmpeg-static` 邏輯，但 2nd gen 底層跑在 Cloud Run 上，即使用量在免費額度內也需要開通 **Blaze（隨用隨付）方案**。使用者明確表示不想開通 Blaze，維持 Spark 免費方案 → **改走純前端方案，不架後端**。

### 合併演算法：lamejs 重新編碼

流程：

1. 每筆 base64 → `ArrayBuffer` → `AudioContext.decodeAudioData()` 解碼成 PCM（`AudioBuffer`）
2. `decodeAudioData` 會自動把每筆音訊重新取樣到同一個 `AudioContext.sampleRate`，天生解決「來源取樣率不一致」的問題（這正是 Node CLI 版本當初選 ffmpeg re-encode、而非直接串接 raw bytes 的理由——同樣的考量套用在前端）
3. 聲道數不一致就統一升/降混成同一種（建議統一轉 mono，TTS 語音通常單聲道，檔案也更小）
4. 把各筆的 PCM `Float32Array` 依序接起來
5. 丟進 `lamejs`（純 JS MP3 encoder）逐塊 encode，組成最終 `Uint8Array` → `Blob(type: 'audio/mpeg')` → 觸發下載

**需要新增依賴**：`@breezystack/lamejs`（原始 `lamejs` 已多年未更新，這個是有 TS type 的維護中 fork）。純 JS、約 15KB，不需要 WASM、不需要 COOP/COEP headers，Spark 方案下無限制。

曾評估但捨棄的做法：

- **原始 bytes 直接串接**：零依賴、最簡單，但只在所有片段 bitrate/取樣率/聲道一致時才穩妥，格式不一致時可能造成部分播放器時長顯示錯誤或雜音。
- **ffmpeg.wasm**：跟 Node CLI 行為完全一致，但套件約 25–30MB，且部分建置版本需要 COOP/COEP headers，對純靜態的 GitHub Pages 站台偏重，故不採用。

> 效能備註：解碼＋編碼在主執行緒跑，clip 數量多時可能讓畫面卡頓；先做同步版本，之後有感覺卡頓再抽到 Web Worker，不影響目前規劃。

## 順手要修的既有 bug

- `src/router/index.ts`：`path: 'base64'` 目前指向 `AnimationDisplay.vue`（複製貼上錯誤），要改回 `Base64Converter.vue`
- `src/views/visuals/VisualsIndexView.vue`：`cards` 陣列裡沒有 Base64 這張卡片，路由存在但首頁點不進去，要補上（icon 可用 `@lucide/vue` 的 `AudioLines` 或 `FileAudio`）
- `src/views/visuals/Base64Converter.vue`：整頁重寫，目前內容是「Animation / Coming soon」的殘留佔位

## 檔案異動清單

| 檔案 | 異動 |
|---|---|
| `src/router/index.ts` | 修正 base64 路由指向 |
| `src/views/visuals/VisualsIndexView.vue` | 加一張 Base64 工具卡片 |
| `src/views/visuals/Base64Converter.vue` | 整頁重寫（見下方 UI 規劃） |
| `src/composables/useAudioMerge.ts`（新增） | 封裝 decode → concat → lamejs encode 的邏輯，回傳 loading/error/progress 狀態，比照 `useContactForm.ts` 的寫法習慣 |
| `src/types/visuals.ts` | 加入 `Base64AudioItem` 型別（沿用 `base64-converter` 專案已驗證過的欄位：`id?`, `audio`, `filename?`, `text?`, `voiceType?`, `voiceName?`, `style?`, `wpm?`, `locale?`, `instructions?`） |
| `package.json` | 新增 `@breezystack/lamejs`（＋視「分別下載」的決定，可能加 `fflate`） |

## 頁面 UI 規劃

沿用現有設計系統：`PageHeader` / `PillTag` / 暖色 neutral-accent 配色 / `max-w-5xl` 版面（比照 `JsConcepts.vue`、`VisualsIndexView.vue` 的寫法）。

1. **輸入區**，兩種模式切換（tab 或 toggle）：
   - **逐筆輸入**：一列一筆，`id`（選填）＋ base64 textarea，「+ 新增一筆」／每列可刪除，視覺比照 `ControlGroup.vue` 的按鈕樣式
   - **貼上 JSON 陣列**：一個大 textarea，貼上跟 `base64-converter/example.md` 一樣格式的 `Base64AudioItem[]`，直接 parse 成清單（方便直接貼 API 回應除錯）
2. **清單預覽**：每筆用 `<audio controls>` 搭配該筆 decode 出的 Blob URL 即時試聽，不用等按合併
3. **操作按鈕**：
   - 「分別下載」：純前端逐筆 decode → Blob → 下載。多檔案連續觸發下載，部分瀏覽器會擋（跳多次下載確認）——**待確認**是否要多裝 `fflate`（~8KB, MIT）打包成一個 `.zip`，或維持逐檔連續下載＋提示使用者允許多重下載
   - 「合併並下載 MP3」：跑上面的 lamejs 流程，過程中顯示 loading 狀態（比照 `CountdownDemo.vue` 的 disabled 按鈕樣式），完成後自動觸發 `merged.mp3` 下載
4. **錯誤處理**：清單為空、base64 格式錯誤（decode 失敗）、JSON parse 失敗，都用 `--color-error` 顯示清楚訊息

## 待確認（動工前需要回覆）

1. `@breezystack/lamejs` 這個新依賴可以裝嗎？
2. 「分別下載」要不要順便加 `fflate` 包成 zip，還是保持逐檔連續下載就好？

## 相關檔案

- 姊妹專案（Node CLI 版本，邏輯已驗證）：`/Users/lauren/Documents/workspace/base64-converter/index.ts`、其 `README.md`、`example.md`（真實資料格式範例）
