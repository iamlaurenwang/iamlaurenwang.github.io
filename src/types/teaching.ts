import type { RouteName } from './routes'

/** 作品分類，同時作為 index 頁的篩選軸。 */
export type TeachingCategory =
  'worksheet' | 'interactive' | 'project' | 'student-work'

/** 一張圖片素材。`width` / `height` 為壓縮後的實際尺寸，用來鎖 aspect-ratio 避免 CLS。 */
export interface TeachingAsset {
  /** public/ 底下的絕對路徑，例如 '/teaching/covers/jellyfish-clean.jpg' */
  src: string
  /** 必填：無障礙需要，也是圖沒載入時的唯一資訊 */
  alt: string
  caption?: string
  width: number
  height: number
}

/** 指向完整原檔的外部連結（Google Drive / YouTube）。 */
export interface ExternalResource {
  label: string
  url: string
  kind: 'drive' | 'youtube' | 'other'
}

/** 課堂流程的一個步驟。 */
export interface LessonStep {
  duration: string
  activity: string
  note?: string
}

/**
 * 學習歷程的一個階段。兩個階段就是單純的前後對照，
 * 三個以上可以呈現「大綱 → 初稿 → 指導後」這種完整的進步過程。
 */
export interface ProgressionStage {
  /** 分頁標籤，例如 '課前' / '指導後' */
  label: string
  asset: TeachingAsset
  /** 這個階段的觀察重點，顯示在圖片下方 */
  note?: string
}

export interface TeachingItem {
  slug: string
  title: string
  category: TeachingCategory
  /** 教學對象，例如 ['國中', '高中'] */
  audience: string[]
  tags: string[]
  /** 'YYYY-MM'，排序用 */
  date: string
  summary: string
  cover: TeachingAsset
  gallery?: TeachingAsset[]
  objectives?: string[]
  outline?: LessonStep[]
  /** 教學反思／成效 */
  reflection?: string
  resources?: ExternalResource[]
  /** 學習歷程對照（兩張＝前後，三張以上＝完整進步過程） */
  progression?: ProgressionStage[]
  /**
   * 有值代表這篇是可線上作答的互動作品，點卡片直接進專屬路由而非通用 detail 頁。
   */
  interactiveRoute?: RouteName
  /** 會出現在 /tutoring 的精選導流區塊 */
  featured?: boolean
}

export type OptionLabel = 'A' | 'B' | 'C' | 'D'

/** 口音代號，例如 'us' / 'uk' / 'au'。 */
export type AccentId = string

/** 一種口音的顯示資訊。 */
export interface Accent {
  id: AccentId
  /** 切換鈕上的文字，例如 '美式' */
  label: string
  /** 補充說明，例如 'American'，顯示在 label 旁邊 */
  hint?: string
}

/**
 * 一個選項的「內容」——代號與逐字稿。
 * 逐字稿不放在口音層，因為各口音錄的是同一份腳本。
 */
export interface ListeningOption {
  label: OptionLabel
  /** 逐字稿，作答後才顯示。留空則不顯示。 */
  transcript?: string
}

/** 同一題、同一份腳本，用某一種口音錄出來的一整組音檔。 */
export interface AccentTake {
  accent: AccentId
  /** 各選項的音檔位置 */
  audio: Record<OptionLabel, string>
  /** 四段合併音檔，由 /visuals/base64 那支工具產生 */
  mergedAudioSrc?: string
}

export interface ListeningQuestion {
  id: string
  image: TeachingAsset
  options: ListeningOption[]
  answer: OptionLabel
  /** 至少一組。有兩組以上時，作答介面會出現口音切換 */
  takes: AccentTake[]
  /** 解析，作答後顯示 */
  explanation?: string
}
