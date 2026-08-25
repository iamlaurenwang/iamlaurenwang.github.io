export type CourseLevel = "beginner" | "intermediate" | "upper-intermediate" | "advanced";

/** PillTag 的色彩變體（與 PillTag.vue 對應）。 */
export type CourseLevelVariant = "accent" | "neutral" | "muted" | "success" | "warning";

/** 級別的顯示中文與標籤顏色；新增級別只需在此加一項。 */
export const COURSE_LEVELS: Record<CourseLevel, { label: string; variant: CourseLevelVariant }> = {
  beginner: { label: "初級", variant: "neutral" },
  intermediate: { label: "中級", variant: "accent" },
  "upper-intermediate": { label: "中高級", variant: "success" },
  advanced: { label: "進階", variant: "warning" },
};

export interface CourseSession {
  /** 第幾堂（class 1~4） */
  no: number;
  /** 該堂大綱；內容未定則為 'TODO' */
  title: string;
}

export interface FreeCourse {
  id: string;
  /** 梯次月份，格式 "YYYY-MM"；未提供則視為單一梯次（不顯示月份選擇器） */
  term?: string;
  title: string;
  level: CourseLevel;
  /** 星期，例如「週二」 */
  day: string;
  /** 時段，例如「17:00-17:50」 */
  time: string;
  /** 各堂日期，例如 ['09/07', '09/14'] */
  dates: string[];
  sessions: CourseSession[];
}

export interface PaidSlot {
  day: string;
  time: string;
  title: string;
}
