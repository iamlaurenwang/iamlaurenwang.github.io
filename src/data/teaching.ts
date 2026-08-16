import { RouteName } from '@/types/routes'
import type { TeachingItem } from '@/types/teaching'

/**
 * 教學作品集資料。
 *
 * ⚠️ `summary` / `objectives` / `reflection` 目前是依教材實際內容整理的初稿，
 * 上線前請以自己的口吻改寫。標了 TODO 的日期是從檔名或版權標示推得，需確認。
 *
 * 圖片放在 public/teaching/（目前 gitignore，僅供本機預覽）。
 */
export const teachingItems: TeachingItem[] = [
  {
    slug: 'toeic-listening',
    title: 'TOEIC 看圖辨義聽力題組',
    category: 'interactive',
    audience: ['高中', '成人'],
    tags: ['TOEIC', '聽力', 'Part 1', '全客製', '多口音', '可線上作答'],
    date: '2025-08', // TODO: 確認實際製作時間
    summary:
      '圖片、語音、題目全部依上課內容自己做的四題 TOEIC Part 1。同一份腳本可以換口音重出，讓學生用不同耳朵再練一次；可以直接在網頁上聽、作答、對答案。',
    cover: {
      src: '/teaching/toeic/q2.jpg',
      alt: '會議室裡一名男子指著銷售報表長條圖向同事簡報',
      width: 1200,
      height: 654,
    },
    objectives: [
      '辨識職場情境中的人物動作與位置關係',
      '掌握 Part 1 常見的現在進行式與被動語態敘述',
      '練習排除「畫面沒出現但語意合理」的干擾選項',
      '適應多益聽力本來就會混用的不同口音',
    ],
    reflection:
      '市售題庫的主題是固定的，接不上當天課堂剛練過的字彙。軟體工程師的背景讓我不必受限於現成教材——情境自己設定、干擾選項對著學生當週的錯誤寫、語音用 TTS 合成還能指定口音，音檔的後製也自己寫工具解決。教材能跟著學生走，而不是學生去遷就教材。',
    interactiveRoute: RouteName.TeachingToeic,
    featured: true,
  },
  {
    slug: 'jellyfish-cloze',
    title: 'Jellyfish Cloze：水母主題克漏字',
    category: 'worksheet',
    audience: ['國中', '高中'],
    tags: ['克漏字', '字彙', '文法', '自編試題'],
    date: '2022-03',
    summary:
      '以浮潛遇上水母的短文為主軸的十三題克漏字，涵蓋分詞構句、動狀詞與轉折語氣，生字附中文註解。',
    cover: {
      src: '/teaching/covers/jellyfish-clean.jpg',
      alt: 'Jellyfish Cloze 學習單，短文搭配十三題四選一選項',
      width: 847,
      height: 1200,
    },
    progression: [
      {
        label: '課前',
        asset: {
          src: '/teaching/covers/jellyfish-clean.jpg',
          alt: '未作答的 Jellyfish Cloze 學習單',
          width: 847,
          height: 1200,
        },
      },
      {
        label: '上完課',
        asset: {
          src: '/teaching/covers/jellyfish-marked.jpg',
          alt: '上完課後的學習單：藍筆作答、紅筆中文字彙註解、旁邊補充文法筆記',
          width: 848,
          height: 1200,
        },
        note: '紅筆是每個選項干擾字的中文註解，藍筆是課堂上補充的文法規則。一份十三題的學習單，帶回去的是一份自己的筆記。',
      },
    ],
    gallery: [
      {
        src: '/teaching/covers/jellyfish-mindmap.jpg',
        alt: '學習單第二頁：閱讀理解三題，以及學生自己畫的水母字彙心智圖',
        caption:
          '第二頁的閱讀理解與字彙網。心智圖由學生自己發想（藍筆），課堂上再一起補上延伸節點（橘筆）；紅筆是訂正與延伸用法，例如把 its head is easily to drop down 改成 easy，並從 toxic 帶出 a toxic relationship 這個生活化的用法。',
        width: 848,
        height: 1200,
      },
    ],
    objectives: [
      '從上下文推論字彙語意，而非單靠中文字義配對',
      '辨識分詞構句與 On/Upon + Ving 的等價轉換',
      '累積海洋生物主題的學術字彙',
    ],
    reflection:
      '同一份題目在課堂上會延伸出遠超過十三題的內容——每個選項的干擾字都當作字彙點補充，寫在題目旁邊，學生帶回去的是一份屬於自己的筆記。',
    featured: true,
  },
  {
    slug: 'writing-progress',
    title: '全民英檢中級寫作：從條列到成篇',
    category: 'student-work',
    audience: ['12 歲'],
    tags: ['GEPT 中級', '英檢寫作', '段落結構', '學習歷程'],
    date: '2026-08',
    summary:
      '一位 12 歲學生挑戰全民英檢中級寫作的三個階段：先擬大綱，再獨立寫出第一段，最後在結構指導後完成整封信。三張放在一起看，進步的地方很具體。',
    cover: {
      src: '/teaching/writing/final.png',
      alt: '學生指導後完成的英文書信，兩段各有主題句、理由與結尾句',
      width: 1400,
      height: 972,
    },
    progression: [
      {
        label: '擬大綱',
        asset: {
          src: '/teaching/writing/outline.jpg',
          alt: '學生手寫的作文大綱，分成注意事項與景點兩部分',
          width: 1200,
          height: 893,
        },
        note: '先不寫句子，只列點。注意事項想出三點、景點一點——以中級寫作要求的 120 字來說素材已經夠了，但每一點都還只是短語，沒有理由支撐。',
      },
      {
        label: '第一段（未指導）',
        asset: {
          src: '/teaching/writing/draft.jpg',
          alt: '學生未經指導寫出的第一段，句子偏短且缺少理由與結尾',
          width: 1200,
          height: 961,
        },
        note: '把大綱直接翻成句子的結果：First / Second / Last 三個建議並排，但沒有一句說明「為什麼」，結尾 You may need these suggestion. 收得突然，整段讀起來像清單而不是信。',
      },
      {
        label: '指導後',
        asset: {
          src: '/teaching/writing/final.png',
          alt: '學生指導後完成的完整書信，含目的句、理由子句與結尾句',
          width: 1400,
          height: 972,
        },
        note: '同樣的三個點，加了三樣東西就成篇了：開頭的目的句（To help you get ready, I listed some tips）、每個建議後面的 because 理由子句、以及收束整段的 With these suggestions... 第二段也從單句擴成「主題句 + 支持細節 + 結尾」，並補上完整的書信格式。',
      },
    ],
    objectives: [
      '先用大綱把想法定下來，再處理句子',
      '每個主張都要有理由支撐，而不是條列並排',
      '段落要有收尾句，不能寫完最後一點就停',
    ],
    reflection:
      '全民英檢中級的寫作原本設定在高中程度，這位學生 12 歲。他缺的其實不是單字或文法，是把「口語」當成「寫作」——大綱階段他想得已經夠多了，少的是把點連成段落的那幾個接縫：理由子句和結尾句。補上那幾個接縫，同樣的內容就成篇了。',
    featured: true,
  },
  {
    slug: 'mustard-greens',
    title: 'Mustard Greens：克漏字 + 食譜排序',
    category: 'worksheet',
    audience: ['國中', '高中'],
    tags: ['克漏字', '閱讀', '主題式', '自編試題'],
    date: '2022-02',
    summary:
      '從年節food文化切入的十題克漏字，後半接一份食譜步驟排序活動，把閱讀理解轉成看得見的操作順序。',
    cover: {
      src: '/teaching/covers/mustard-greens.jpg',
      alt: 'Mustard Greens 學習單，上半為克漏字、下半為食譜步驟排序活動',
      width: 847,
      height: 1200,
    },
    objectives: [
      '掌握 green thumb、sweet tooth 等飲食相關慣用語',
      '依指令排列食譜步驟，練習程序性文本的閱讀',
    ],
    featured: true,
  },
  {
    slug: 'charlie-chocolate-factory',
    title: 'Charlie and the Chocolate Factory 文學導讀單',
    category: 'worksheet',
    audience: ['國小', '國中'],
    tags: ['文學', '字彙', '人物分析', '自編試題'],
    date: '2022-01', // TODO: 確認實際製作時間
    summary:
      '以《巧克力冒險工廠》為文本的導讀學習單：同義字擴充（owner / possessor、admission / access / entry）、金獎券情境寫作，以及五位得主的人物性格對照表。',
    cover: {
      src: '/teaching/covers/charlie.jpg',
      alt: 'Charlie and the Chocolate Factory 學習單，含人物性格對照表與角色配對圖',
      width: 848,
      height: 1200,
    },
    objectives: [
      '用同義字群擴充字彙，而非單字對單字記憶',
      '從情節推論人物性格，並用形容詞精準描述',
    ],
  },
  {
    slug: 'tornado-typhoon',
    title: 'Compare & Contrast：龍捲風 vs 颱風',
    category: 'worksheet',
    audience: ['國中'],
    tags: ['閱讀', '圖表組織', '學科英文', '自編試題'],
    date: '2022-01', // TODO: 確認實際製作時間
    summary:
      '國二上閱讀單元的圖表組織學習單，用比較表格拆解兩種風災的規模、影響、速度與發生時機，最後以圖片辨識驗收。',
    cover: {
      src: '/teaching/covers/tornado-typhoon.jpg',
      alt: 'Compare and Contrast 學習單，含龍捲風與颱風的比較表格與圖片辨識活動',
      width: 847,
      height: 1200,
    },
    objectives: [
      '使用比較／對比的圖表組織整理資訊',
      '辨識 similarities 與 differences 的表達句型',
    ],
  },
  {
    slug: 'clil-colors',
    title: 'CLIL：Colors, Colors Everywhere',
    category: 'project',
    audience: ['國中'],
    tags: ['CLIL', '跨學科', '主題式課程', '簡報'],
    date: '2022-03', // TODO: 確認實際授課時間
    summary:
      '以「顏色」串起語言與設計思考的 CLIL 單元：從顏色的文化聯想出發，分析商品包裝設計案例，最後延伸到學生自製食譜的專題。',
    cover: {
      src: '/teaching/covers/clil-packaging.jpg',
      alt: 'Special Packaging 教材，分析 Martinelli’s 蘋果汁的瓶身包裝設計',
      width: 847,
      height: 1200,
    },
    gallery: [
      {
        src: '/teaching/covers/clil-packaging.jpg',
        alt: 'Special Packaging 教材頁面，含包裝設計、設計理念與市場反應三段分析',
        caption: '包裝設計案例分析（品牌圖片版權屬原公司，僅作教學範例引用）',
        width: 847,
        height: 1200,
      },
      {
        src: '/teaching/covers/clil-color-association.png',
        alt: '全班的顏色聯想手寫成果，每張紙列出各種顏色對應的聯想詞',
        caption: '全班的顏色聯想成果',
        width: 1200,
        height: 926,
      },
      {
        src: '/teaching/covers/clil-recipe.jpg',
        alt: 'Extended Project：Your Recipe 延伸專題說明',
        caption: '延伸專題：設計自己的食譜',
        width: 1200,
        height: 850,
      },
    ],
    objectives: [
      '用英文描述顏色與情緒、文化之間的聯想',
      '分析真實商品的設計決策並說出理由',
      '把單元字彙延伸應用到自己的專題產出',
    ],
  },
  {
    slug: 'pbl-instagram',
    title: 'PBL：The World According to Instagram',
    category: 'project',
    audience: ['國中'],
    tags: ['PBL', '專題式學習', '分組合作', '簡報'],
    date: '2022-04',
    summary:
      '以「教不熟悉社群媒體的朋友使用 Instagram」為任務的專題式學習單元。學生分成設計組與示範組，產出一張說明海報與一支示範影片，最後回答三題個人反思。',
    cover: {
      src: '/teaching/covers/pbl-worksheet.jpg',
      alt: '04/22 課堂活動單，含分組任務表格與個人反思三問',
      width: 847,
      height: 1200,
    },
    gallery: [
      {
        src: '/teaching/covers/pbl-worksheet.jpg',
        alt: '課堂活動單：分組任務分配與個人反思問題',
        caption: '課堂活動單：任務分配 + 個人反思',
        width: 847,
        height: 1200,
      },
      {
        src: '/teaching/covers/pbl-poster.jpg',
        alt: '學生分組製作的 Instagram 使用說明海報',
        caption: '學生產出：使用說明海報',
        width: 1200,
        height: 899,
      },
    ],
    objectives: [
      '將熟悉的日常工具轉譯成清楚的英文操作說明',
      '在分組任務中協調角色分工並完成產出',
      '透過反思問題檢視自己解決問題的過程',
    ],
    reflection:
      '學生對 Instagram 的熟悉度遠高於我，這個題目讓語言變成工具而不是目標——他們忙著把事情講清楚，反而忘了自己正在用英文。',
  },
]

/** 依日期新到舊排序。 */
export const sortedTeachingItems: TeachingItem[] = [...teachingItems].sort(
  (a, b) => b.date.localeCompare(a.date),
)

export const featuredTeachingItems: TeachingItem[] = sortedTeachingItems.filter(
  (item) => item.featured,
)

export function findTeachingItem(slug: string): TeachingItem | undefined {
  return teachingItems.find((item) => item.slug === slug)
}
