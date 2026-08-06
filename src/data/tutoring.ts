import { BookOpen, PenLine, Globe, CalendarCheck } from '@lucide/vue'
import type { TutoringService, Testimonial, Faq } from '@/types/tutoring'

export const services: TutoringService[] = [
  {
    icon: BookOpen,
    iconClass: 'bg-accent-100 text-accent-700',
    title: 'GEPT 考照輔導',
    description: '初級、中級、中高級皆可。針對各級題型拆解策略，搭配模擬考與逐題詳解，有效備考。',
    tags: ['初級', '中級', '中高級'],
  },
  {
    icon: PenLine,
    iconClass: 'bg-neutral-200 text-neutral-600',
    title: '寫作加強',
    description: '學測作文、全民英檢作文結構拆解，每篇逐句批改，幫助建立完整的英文寫作思維框架。',
    tags: ['學測作文', '英檢作文'],
  },
  {
    icon: Globe,
    iconClass: 'bg-accent-200 text-accent-800',
    title: 'TESOL 主題式學習',
    description: '以日常生活、個人興趣或熱門影片作為課程主題，讓學習更有動機，全英或中英混授皆可。',
    tags: ['全英授課', '中英混授'],
  },
  {
    icon: CalendarCheck,
    iconClass: 'bg-neutral-100 text-neutral-500',
    title: '升學 & 讀書計畫諮詢',
    description: '根據學生目標制定個人化備考時間表，適合準備高中、大學入學或語言證照考試的學生。',
    tags: ['高中升學', '大學升學', '考照準備'],
  },
]

export const stats = [
  { value: '7+', label: '年教學經驗' },
  { value: '80%', label: 'GEPT 通過率' },
  { value: '小6–成人', label: '教學對象' },
]

export const successCases = ['高雄中學', '高雄女中', '台大化學系', '台藝大音樂系']

export const testimonials: Testimonial[] = [
  {
    quote: 'Lauren 老師教學很有耐心，寫作進步很多，最後順利通過 GEPT 中級！',
    author: '學生家長',
    context: 'GEPT 中級 · 2023',
  },
  {
    quote: '主題式上課很有趣，每次都期待上課，英文口說也變得更有自信。',
    author: '國中生',
    context: 'TESOL 主題式 · 2024',
  },
  {
    quote: '老師幫我規劃了完整的備考計畫，讓我的準備更有方向。非常推薦！',
    author: '高中生',
    context: '升學諮詢 · 2024',
  },
]

export const faqs: Faq[] = [
  {
    question: '上課方式為何？',
    answer: '課程以線上方式進行，使用 Google Meet，只需要有網路和一台電腦或平板即可。',
  },
  {
    question: '每堂課多長時間？',
    answer: '基本課程為 30 分鐘到 1 小時，可依學生年齡與需求彈性調整，沒有固定限制。',
  },
  {
    question: '適合哪些年齡段？',
    answer: '小學六年級到成人皆可，教學方式和進度會依學生年齡與程度個別設計。',
  },
  {
    question: '是否提供試聽？',
    answer: '有！第一堂課提供免費試聽，讓你先了解上課方式與風格，再決定是否繼續。',
  },
  {
    question: '如何預約？',
    answer: '點擊頁面下方的預約按鈕，或直接傳訊息給我，我會盡快回覆並安排時間。',
  },
]
