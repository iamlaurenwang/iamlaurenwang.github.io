# 可預約時段（Google Calendar 嵌入）

在 `/tutoring` 頁嵌入公開的 Google 共用行事曆，讓客戶直接看到目前可預約 / 已滿的時段。

## Phase 1（已完成）：唯讀嵌入

- **範圍**：唯讀檢視。實際預約仍走 `/tutoring` →「立即聯繫」→ `/contact` email 表單流程。
- **做法**：Google 官方 iframe embed，免後端、永遠同步。

### 相關檔案

- `src/components/tutoring/BookingCalendarSection.vue` — 嵌入區塊元件。讀取 `VITE_GOOGLE_CALENDAR_ID` 組出 embed URL；env 為空則不渲染。
- `src/views/TutoringView.vue` — 在 CTA 區塊前掛載 `<BookingCalendarSection />`。
- `.env.example` — `VITE_GOOGLE_CALENDAR_ID`。

### 環境變數

```
VITE_GOOGLE_CALENDAR_ID=<公開共用行事曆的 Calendar ID>
```

Calendar ID 公開嵌入後即會出現在頁面原始碼，並非機密。留空時區塊自動隱藏、不報錯（比照 `useAnalytics.ts` 對 `VITE_GA_MEASUREMENT_ID` 的處理）。

### 前置設定（Google Calendar，需手動）

行事曆必須設為「公開」，否則未登入訪客看不到內容：

1. Google Calendar → 該行事曆設定 → 「存取權限」。
2. 勾選「公開此行事曆」。
3. 權限建議選「**只能看到閒/忙（隱藏詳細資料）**」——客戶只看到某時段被佔用，不外洩活動標題/學生資訊。
   - 若想顯示「可預約」字樣，改選「查看所有活動詳細資料」，並在有空的時段建立標題為「可預約」的活動。

### embed URL 參數

`https://calendar.google.com/calendar/embed`

| 參數 | 值 | 說明 |
| --- | --- | --- |
| `src` | Calendar ID | 由 `URLSearchParams` 自動編碼 |
| `ctz` | `Asia/Taipei` | 時區 |
| `mode` | `WEEK` | 週檢視，最能表達「時段」 |
| `showTitle` / `showPrint` / `showTz` / `showCalendars` | `0` | 精簡 Google 預設 UI |
| `showTabs` | `1` | 保留週/月切換 |

## 已知限制

- Google iframe embed 沒有真正的深色主題；深色模式下只有外框跟著變，iframe 內部仍是 Google 淺色 UI。
- **無法限制顯示時段**：iframe 沒有「起始/結束小時」參數，週檢視一律顯示整天（24h 可捲動），無法只顯示 08:00–17:00。跨網域也無法用 CSS 裁切。若需要限制時段，只能改用下方「自訂主題元件」（FullCalendar 的 `slotMinTime` / `slotMaxTime`）。已與需求方確認 Phase 1 接受顯示整天。
- 顯示的是活動 / 閒忙，不是可點選預約的介面。

## 方案評估：升級為線上直接預約

> 決策紀錄。目前**未採用**任一者，維持 Phase 1 唯讀 iframe；此段供日後升級時參考。

**背景**：現況 iframe 為唯讀，且無法限制顯示時段（見「已知限制」）。若要做到「客戶直接預約」且「只顯示營業時段（如 08:00–17:00）」，需改用具 availability 設定的預約工具。評估了兩個候選：

| 面向 | Calendly（免費方案） | Google Appointment Schedule |
| --- | --- | --- |
| 直接預約 | ✅ | ✅ |
| 限制營業時段（8–17） | ✅（設定 availability） | ✅（設定 availability） |
| 寫回 Google Calendar | ✅ | ✅（原生） |
| 自動 Google Meet 連結 | ✅ | ✅ |
| 第三方 / 學生 PII 外流 | 是（經 Calendly） | 否（留在 Google） |
| 費用 | 免費限 1 種 event type | 免費 |
| 外觀符合 teal/serif 主題 | ❌（有品牌字樣） | ❌ |
| 額外維護帳號 | 多一個 SaaS | 用現有 Google 帳號 |
| 嵌入方式 | inline iframe / popup 按鈕，免後端 | iframe / 預約按鈕，免後端 |

**Calendly 免費方案注意事項**：僅 1 種 event type；切換啟用中的 event type 會使已嵌入的連結立即失效；畫面有「Powered by Calendly」字樣；樣式客製有限。

**傾向建議**：本站技術棧全在 Google（Calendar + Meet + Firebase / Google OAuth），且 CLAUDE.md 提醒避免不必要的第三方相依 → 若日後升級，**Google Appointment Schedule 為較貼合的預設選擇**。Calendly 適合偏好其介面精緻度、或需要提醒 / 自動化流程時。

## 後續 TODO

- [ ] **Phase 2：線上直接預約** — 改用 Google **Appointment Schedule**（原生預約頁，免後端、自動防重複預約），以按鈕/iframe 嵌入，讓客戶看到時段後直接下訂並寫回行事曆。方案比較見上方「方案評估：升級為線上直接預約」。
- [ ] **自訂主題元件** — 改用 Google Calendar API（`events.list`，公開行事曆 + 受限 API key）+ FullCalendar 自繪 Vue 元件，讓外觀（尤其 dark mode）完全符合 teal/serif 主題，並可用 `slotMinTime` / `slotMaxTime` 限制只顯示 08:00–17:00，一併解決上述深色模式與顯示時段兩項限制。
- [ ] **定價資訊** — 沿用 `TutoringView.vue` 既有 pricing TODO，於此頁補上。
