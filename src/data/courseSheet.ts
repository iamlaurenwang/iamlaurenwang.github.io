/**
 * 課程資料的 Google Sheet 來源設定。
 *
 * 同一份試算表以不同工作表（gid）提供兩種課程的課表：
 *   - COURSE_SHEET_CSV_URL       gid=0        公開體驗課
 *   - COURSE_GROUP_SHEET_CSV_URL gid=44264924 5 人小班課（團課）
 * 兩者欄位 schema 相同，皆由 useCourseSheet 解析。
 *
 * ── 如何取得 CSV 連結 ──
 * 建議用「發布到網路」：
 *   Google Sheet → 檔案 → 共用 → 發布到網路 → 選要發布的「工作表」→ 格式選 CSV → 發布 → 複製連結
 *   連結長得像：https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv
 * （此連結為公開唯讀，不含金鑰，適合放在前端。）
 *   ※ 每個工作表都要各自「發布」一次；只發布 gid=0 時，團課的 gid 連結會回傳空內容。
 *
 * ── 工作表欄位（第一列必須是這些英文標題，一列代表一堂課）──
 *   term | course_id | title | level | day | time | session_no | date | session_title | number_student
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
 *   - 同一梯次的 day/time/title/level/number_student 以該課第一列為準。
 *   - number_student（團課目前報名人數，選填）：達 5 人顯示「滿班」，未達顯示「開放報名」。
 *     前端只顯示名額狀態、不會顯示實際人數。公開課工作表可不建此欄；
 *     不建此欄則不顯示名額標籤。
 */
// export const COURSE_SHEET_CSV_URL = "";
export const COURSE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqRIWdLoJG7nng-gKDaE6Rg8briY-ck0ngxOM3H9iHLiGZvtIzjwdiByArv1bZAscHJYq4AuCZb2fs/pub?gid=0&single=true&output=csv'

/** 5 人小班課（團課）課表來源；schema 同公開課，另可含 number_student 名額欄位。 */
export const COURSE_GROUP_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqRIWdLoJG7nng-gKDaE6Rg8briY-ck0ngxOM3H9iHLiGZvtIzjwdiByArv1bZAscHJYq4AuCZb2fs/pub?gid=44264924&single=true&output=csv'
