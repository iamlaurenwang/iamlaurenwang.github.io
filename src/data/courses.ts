import type { FreeCourse, PaidSlot } from "@/types/course";

/**
 * 免費課是 9 月開課的 campaign。campaign 結束後把此旗標設為 false，
 * Course 頁的免費 Tab 會隱藏、付費課自動成為主內容，不需改動頁面結構。
 */
export const freeCourseCampaignActive = true;

/** 免費課報名表單：填完可拿到上課連結，並自動加入 Google Calendar。 */
export const FORM_URL = "https://forms.gle/63t4F2zwC66TaUZj9";

/** 官方 Line 連結。TODO: 填入實際 Line 連結。 */
export const LINE_URL = "";

export const freeCourses: FreeCourse[] = [
  {
    id: "gepte-elementary-writing",
    title: "全民英檢初級寫作",
    level: "beginner",
    day: "週二",
    time: "17:00-17:50",
    dates: ["09/07", "09/14", "09/21", "09/28"],
    sessions: [
      { no: 1, title: "文法 01 & 作文 01" },
      { no: 2, title: "文法 02 & 作文 02" },
      { no: 3, title: "文法 01 & 作文 01" },
      { no: 4, title: "文法 02 & 作文 02" },
    ],
  },
  {
    id: "gepte-intermediate-writing",
    title: "全民英檢中級寫作",
    level: "intermediate",
    day: "週三",
    time: "19:00-19:50",
    dates: ["09/08", "09/15", "09/22", "09/29"],
    sessions: [
      { no: 1, title: "翻譯 01 & 作文 01 引導" },
      { no: 2, title: "翻譯 01 & 作文 01 完成" },
      { no: 3, title: "翻譯 02 & 作文 02 引導" },
      { no: 4, title: "翻譯 02 & 作文 02 完成" },
    ],
  },
  {
    id: "theme-elementary",
    title: "主題式課程（初級）",
    level: "beginner",
    day: "週四",
    time: "19:00-19:50",
    dates: ["09/09", "09/16", "09/23", "09/30"],
    sessions: [
      { no: 1, title: "TODO" },
      { no: 2, title: "TODO" },
      { no: 3, title: "TODO" },
      { no: 4, title: "TODO" },
    ],
  },
  {
    id: "theme-intermediate",
    title: "主題式課程（中級）",
    level: "intermediate",
    day: "週五",
    time: "19:00-19:50",
    dates: ["09/10", "09/17", "09/24"],
    sessions: [
      { no: 1, title: "Charlie and the Chocolate Factory" },
      { no: 2, title: "Inside Out" },
      { no: 3, title: "Taipei 101 and the Tuned Mass Damper" },
    ],
  },
];

export const paidSlots: PaidSlot[] = [
  { day: "週二", time: "17:00-17:50", title: "全民英檢初級寫作" },
  { day: "週二", time: "18:00-18:50", title: "全民英檢初級寫作" },
  { day: "週三", time: "19:00-19:50", title: "全民英檢中級寫作" },
  { day: "週三", time: "20:00-20:50", title: "全民英檢中級寫作" },
  { day: "週四", time: "19:00-19:50", title: "主題式課程（初級）" },
  { day: "週四", time: "20:00-20:50", title: "主題式課程（初級）" },
  { day: "週五", time: "19:00-19:50", title: "主題式課程（中級）" },
  { day: "週五", time: "20:00-20:50", title: "主題式課程（中級）" },
];

export const paidExtras: string[] = [
  "作業／作文批改：每位學生擁有專屬 Google 文件，逐篇回饋",
  "進階課堂活動：speaking、in-class debate 等 output 練習",
  "5 人滿班小班制，與老師互動更緊密",
];
