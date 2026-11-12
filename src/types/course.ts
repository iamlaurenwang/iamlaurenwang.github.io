export type CourseLevel = 'beginner' | 'intermediate' | 'upper-intermediate' | 'advanced'

/** PillTag 的色彩變體（與 PillTag.vue 對應）。 */
export type CourseLevelVariant = 'accent' | 'neutral' | 'muted' | 'success' | 'warning'

/** 級別的顯示中文與標籤顏色；新增級別只需在此加一項。 */
export const COURSE_LEVELS: Record<CourseLevel, { label: string; variant: CourseLevelVariant }> = {
  beginner: { label: '初級', variant: 'neutral' },
  intermediate: { label: '中級', variant: 'accent' },
  'upper-intermediate': { label: '中高級', variant: 'success' },
  advanced: { label: '進階', variant: 'warning' },
}

export interface CourseSession {
  /** 第幾堂（class 1~4） */
  no: number
  /** 該堂大綱；內容未定則為 'TODO' */
  title: string
}

export interface FreeCourse {
  id: string
  /** 梯次月份，格式 "YYYY-MM"；未提供則視為單一梯次（不顯示月份選擇器） */
  term?: string
  title: string
  level: CourseLevel
  /** 星期，例如「週二」 */
  day: string
  /** 時段，例如「17:00-17:50」 */
  time: string
  /** 各堂日期，例如 ['09/07', '09/14'] */
  dates: string[]
  sessions: CourseSession[]
  /**
   * 團課名額狀態：
   * - 'full'    = 滿班（報名人數 ≥ FULL_CLASS_SIZE）
   * - 'open'    = 開放報名（報名人數 > 0 且 < FULL_CLASS_SIZE）
   * - 'pending' = 尚未開班（報名人數為 0 或空值）
   * - undefined = 該課表未提供名額資訊（公開課），前端不顯示名額標籤。
   */
  full?: 'full' | 'open' | 'pending'
}
