export type CourseLevel = "beginner" | "intermediate";

export interface CourseSession {
  /** 第幾堂（class 1~4） */
  no: number;
  /** 該堂大綱；內容未定則為 'TODO' */
  title: string;
}

export interface FreeCourse {
  id: string;
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
