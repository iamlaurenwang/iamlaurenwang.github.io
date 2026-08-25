/**
 * 課程資料的 Google Sheet 來源設定（僅供 /demo-course 測試用）。
 *
 * ── 如何取得 CSV 連結 ──
 * 建議用「發布到網路」：
 *   Google Sheet → 檔案 → 共用 → 發布到網路 → 選要發布的「工作表」→ 格式選 CSV → 發布 → 複製連結
 *   連結長得像：https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv
 * （此連結為公開唯讀，不含金鑰，適合放在前端。）
 *
 * ── 工作表欄位（第一列必須是這些英文標題，一列代表一堂課）──
 *   term | course_id | title | level | day | time | session_no | date | session_title
 *
 * 範例（同一 term + course_id 的多列 = 同一梯次的多堂課，會被組回巢狀結構）：
 *   term    | course_id                | title          | level    | day  | time        | session_no | date  | session_title
 *   2026-09 | gepte-elementary-writing | 全民英檢初級寫作 | beginner | 週二 | 17:00-17:50 | 1          | 09/07 | 文法01 & 作文01
 *   2026-09 | gepte-elementary-writing | 全民英檢初級寫作 | beginner | 週二 | 17:00-17:50 | 2          | 09/14 | 文法02 & 作文02
 *   2026-10 | gepte-elementary-writing | 全民英檢初級寫作 | beginner | 週二 | 17:00-17:50 | 1          | 10/06 | 文法01 & 作文01
 *
 * 規則：
 *   - term 選填，格式 YYYY-MM；資料中出現幾個不同 term，頁面就長出幾個月份 tab。
 *     同一 course_id 不同 term = 不同梯次；整欄留空則視為單一梯次（不顯示月份 tab）。
 *   - level 只接受 beginner / intermediate / upper-intermediate / advanced
 *     （分別顯示為 初級 / 中級 / 中高級 / 進階；其他值一律當 beginner）。
 *   - session_title 留空會顯示為「內容準備中」。
 *   - 同一梯次的 day/time/title/level 以該課第一列為準。
 */
// export const COURSE_SHEET_CSV_URL = "";
export const COURSE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqRIWdLoJG7nng-gKDaE6Rg8briY-ck0ngxOM3H9iHLiGZvtIzjwdiByArv1bZAscHJYq4AuCZb2fs/pub?gid=0&single=true&output=csv'
