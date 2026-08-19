# 教學作品集（Teaching Portfolio）規劃

> 狀態：**P0–P2 已完成，可在本機瀏覽**（`npm run dev` → `/#/teaching`）。
> 尚未完成的項目見文件末尾的「未完成事項」。素材盤點見第二節。

## 目標

把過去做的**教案、自編題目、教材設計、課堂紀錄**整理成可瀏覽的作品集：

1. **對家長／學生**：看到實際教學內容與品質，補強 `/tutoring` 頁目前只有文字見證的不足
2. **對同業／機構**：等同教學履歷，能單獨分享連結
3. **對自己**：把散在硬碟／Canva／紙本的素材收成有結構的檔案

---

## 一、動工前第一件事：先 gitignore

`src/assets/todo/` 目前是**未追蹤（untracked）**狀態，**還沒進版控——這是好事，別讓它進去**。

總量 **60MB**，其中光影片就佔 40MB：

| 檔案 | 大小 |
|---|---|
| `PBL.../pictures/672900504.847860.mp4` | **25MB** |
| `PBL.../pictures/672900504.772422.mp4` | 8.1MB |
| `PBL.../pictures/Rehersal clip.mp4` | 4.1MB |
| `PBL.../how to use Instagram.pdf` | 4.1MB |
| `PBL.../pictures/Coordination clip.mp4` | 3.1MB |
| `CLIL.../CILI by Lauren.pptx` | 3.1MB |

圖片與影片一旦 commit，**即使之後刪掉也永遠留在 git 歷史裡**，repo 會永久肥大。所以：

```gitignore
# 教學素材原檔（原始檔放 Google Drive，站上只放壓縮後的預覽圖）
src/assets/todo/
```

**在跑任何 `git add .` 之前先加這行。** 原檔的家是 Google Drive，不是這個 repo。

---

## 二、素材盤點

實際看過每份檔案後的分類。這批東西比「教案 + 照片」豐富得多，值得分開呈現：

### A. 自編試題（最有價值，且已有你的版權浮水印）

| 檔案 | 內容 |
|---|---|
| `Mustard Greens by Lauren Wang.pdf` | 克漏字 10 題 + 食譜步驟排序活動。頁首頁面都有 `Copyright © 2022 Lauren Wang 王珝蕎` 浮水印 |
| `Jellyfish Cloze1.pdf` | 克漏字 13 題，主題是水母浮潛，含中文字彙註記 |
| `Charlie and the Chocolate Factory.pdf` | （文學主題教材） |
| `國二上閱讀U12.pdf` | Compare & Contrast 圖表學習單（龍捲風 vs 颱風）+ 圖片辨識活動 |

這幾份是**你自己寫的**、已標版權，是整個作品集最能證明專業度的東西。

### B. TOEIC 聽力題組（`toeic-questions/Q1–Q4`）

每組結構完全一致：

```
Q1/
├── q1-image.jpeg      ← 情境照片（TOEIC Part 1 看圖辨義）
├── ts_track_01.mp3    ← 選項 A（約 3 秒）
├── ts_track_02.mp3    ← 選項 B
├── ts_track_03.mp3    ← 選項 C
├── ts_track_04.mp3    ← 選項 D
└── merged.mp3         ← 四段合併（約 12 秒 ≒ 四段總和）
```

**整組題目——圖片、語音、題目本身——都是依上課內容客製的**，不是題庫抓來的。頁面上用一個四步驟的「製作說明」區塊講這件事：

1. 情境跟著當天課堂主題走（這四題是飯店結帳／會議簡報／機場登機／倉庫理貨）
2. 干擾選項對準學生當週的易錯點（時態、被動語態、「畫面沒出現但語意合理」的陷阱）
3. 語音用 TTS 合成，**同一份腳本可以指定不同口音重出**——多益聽力本來就混口音，平常就該輪流聽
4. 四段音檔用自己寫的 Base64 → MP3 工具合併成一整軌

第 4 點正好接上 `docs/base64-audio-merger.md` 那支工具：`merged.mp3` 就是它的產物。**寫了一個工具，然後用它來做教材**——這條線把「工程師」和「英文老師」接起來，是整個網站最好的敘事，所以放在頁面顯眼處而不是註腳。

### 多口音切換

`ListeningQuiz` 已支援口音切換，資料結構如下（`src/types/teaching.ts`）：

- `ListeningOption` 只留 `label` 與 `transcript`——**逐字稿不放在口音層**，因為各口音錄的是同一份腳本
- `AccentTake` 是「某一題、某一種口音」的一整組音檔（A–D 加合併軌）
- `ListeningQuestion.takes` 是這些 take 的陣列

切換鈕**只有在兩種以上口音時才顯示**，所以在補進第二組音檔之前，頁面不會出現一個切不動的選單，也不必替現有音檔硬取一個還沒確認的口音名稱。切換時會停掉正在播的音檔（不然會聽到上一個口音播完），但**保留已作答的答案與進度**。

`availableAccents` 只列出「每一題都有」的口音，避免切過去某題缺檔。

#### 補一種口音要做的兩件事

1. 音檔放成 `public/teaching/toeic/<題號>/<口音代號>/{a,b,c,d,all}.mp3`
   （例：`public/teaching/toeic/q1/uk/a.mp3`）
2. `src/data/toeicListening.ts` 裡 `accents` 加一筆，每題 `takes` 加一個 `take('<代號>', '<題號>')`

> 現有那組音檔的口音代號暫時叫 `default`，路徑維持扁平（`q1/a.mp3`）不必搬動。
> 等確認是美式還是英式，把它改名並移進對應子資料夾即可，`take()` 會自動組出路徑。

#### 合併軌是選配

英式那組只有 A–D、沒有 `all.mp3`。與其讓「播放全部選項」按鈕在切到英式時消失，
`toggleAll()` 改成：**有合併軌就播那一軌，沒有就把 A–D 接力播完**（`ended` 事件串起佇列）。
新增口音因此不必先產出合併軌，按鈕也不會忽有忽無。

要讓英式也有真正的單一軌，用 `/visuals/base64` 那支工具把四段接起來、命名為
`all.mp3` 放進 `public/teaching/toeic/<題號>/uk/`，再把資料裡的 `take('uk', 'qN', false)`
的 `false` 拿掉即可——澳洲那組就是這樣補上的：合併軌產出後（工具輸出的檔名是
`merged.mp3`，放進去前先改名成 `all.mp3`），`take('au', 'qN')` 直接用預設值，
「播放全部選項」播的就是單一軌而不是接力。

#### 現況

| 口音 | 代號 | 音檔 | 合併軌 |
|---|---|---|---|
| 原始版本（口音待確認） | `default` | `q<n>/{a,b,c,d}.mp3` | ✅ |
| 英式 British | `uk` | `q<n>/uk/{a,b,c,d}.mp3` | ❌ 用接力播放 |
| 澳洲 Australian | `au` | `q<n>/au/{a,b,c,d}.mp3` | ✅ `q<n>/au/all.mp3` |

三組取樣率不一致（原始 24000 Hz、英式與澳洲 22050 Hz，澳洲的合併軌 48000 Hz），
但因為是分開播放的獨立檔案，不影響播放——這也正是當初工具選擇 decode 後重新編碼、
而非直接串接位元組的原因。

### C. 主題式課程專案（兩個完整單元）

**`CLIL_ Colors, Colors Everywhere`**（跨學科內容語言整合教學）
- `CILI by Lauren.pptx`（3.1MB，授課簡報）
- `Special Packaging2.pdf`（設計精美的海報式教材，Martinelli's 蘋果汁包裝設計案例）
- `Extended Project_ Your Recipe.png`（延伸作業說明）
- `Color Association by the class.pdf`（**學生手寫成果，有署名——見第五節**）

**`PBL_The World According to Instagram`**（專題式學習）
- `0429 presentation.pptx`、`how to use Instagram.pdf`
- `documents/IG worksheet.pdf`（04/22 課堂活動單：分組任務 + 個人反思三問）
- `documents/IG VOC.pdf`、`22042022212834-0001.pdf`
- `pictures/`：`Discussion.jpg`、`Poster Design.jpg`、`Coordination.jpg`、`Rehersal1.jpg` + **4 支影片（40MB）**

這兩個是**完整教學單元**，有教案、教材、學生產出、課堂紀錄——最適合做成「案例研究（case study）」式的深度頁面，而不是零散的圖卡。

### D2. 作文進步歷程（`writing-before-after/`）

同一位學生、同一個**全民英檢中級**寫作題目（寫 email 給要來台灣當交換學生的堂弟 Peter）的**三個階段**。
學生 **12 歲**——中級寫作原本設定在高中程度，這點本身就是賣點。

題型佐證：圖上的「二、英文作文 (60%)」與「長度約 120 字（8 至 12 個句子）」正是 GEPT 中級寫作的規格。

| 檔案 | 階段 | 內容 |
|---|---|---|
| `outline-exercise.png` | 擬大綱 | 注意事項三點 + 景點一點，全是短語 |
| `first-paragraph-without-guidance.png` | 未指導 | 把大綱直接翻成句子，三個建議並排、無理由、結尾突兀 |
| `both-paragraph-after-guidance.png` | 指導後 | 補上目的句、`because` 理由子句、收束句，第二段擴成主題句＋細節＋結尾，並補完書信格式 |

**這是整批素材裡教學價值最高的一組**——因為進步的地方是**可以指出來的具體結構**，不是「變好了」這種模糊說法。三張並排看，讀者自己就能看出差別。

### D. 學生作品／批改（`Jellyfish Works/`，6 張掃描）

是 `Jellyfish Cloze1` 的**寫過並批改過的版本**：藍筆學生作答、紅筆你的中文字彙註解、旁邊還有藍筆補充的文法筆記（`as soon as S+V = On/Upon + Ving`）。

**這批東西的呈現價值很高**——「乾淨題目 vs 上完課的樣子」對照，比任何文字說明都更能展現教學細緻度。

---

## 三、託管策略：三層

你提到想用 Google Drive 連結讓人看完整資料——這正好解掉 60MB 的問題。分三層：

| 層 | 放什麼 | 放哪 |
|---|---|---|
| **站上（repo）** | 壓縮過的預覽圖、TOEIC 的圖與音檔、封面 | `public/teaching/` |
| **Google Drive** | 完整原檔：PPTX、多頁 PDF、影片 | Drive 資料夾，唯讀分享連結 |
| **完全不公開** | 未去識別化的學生作品原檔、同意書紀錄 | 本機／私人 Drive，不出現在任何地方 |

### Google Drive 的具體做法

- 分享權限設「**知道連結的任何人 → 檢視者**」，**絕不要給編輯者**
- 建議**一個作品一個資料夾連結**，而不是把整個「教學」根資料夾丟出去——避免不小心連帶公開其他檔案
- 站上按鈕寫「在 Google Drive 開啟完整教案 ↗」，`target="_blank" rel="noopener noreferrer"`
- **不建議用 iframe 嵌入** `drive.google.com/file/d/<ID>/preview`：Drive 的嵌入在流量大時會被限速、行動裝置體驗差、且未來 Google 改版就壞掉。用連結外開比較穩。
- 影片（40MB 那批）→ Drive 或 **YouTube 不公開（unlisted）**。YouTube 的播放體驗好很多，且若影片裡有學生入鏡，unlisted 比 Drive 連結更容易控管。

### 進 repo 的圖要先壓

- 去 EXIF（手機照片含 GPS）
- 轉 WebP，長邊 1600px（封面 1200px）
- 目標：封面 ≤150KB、內頁圖 ≤250KB
- TOEIC 那 4 張 jpeg 現在各 576KB–1MB，**壓完應該能到 150KB 以內**
- 記下壓縮後的 `width`/`height` 填進資料（鎖 aspect-ratio 避免版面跳動）

圖不多的話先用 [Squoosh](https://squoosh.app/) 手動處理就好，**不用為此加 `sharp` 依賴**（CLAUDE.md：新增依賴前先確認必要性）。

---

## 四、資訊架構

### 路由

沿用 `/visuals` 的 parent view + 巢狀子路由寫法（`VisualsView.vue`）：

```
/teaching              → TeachingIndexView    總覽 + 篩選
/teaching/:slug        → TeachingDetailView   單篇作品
```

Detail 用**動態 `:slug`**，不像 `/visuals` 一頁一個 route——作品會持續增加，不該每加一篇就改 router。找不到 slug 時導回 index 或顯示 `EmptyState.vue`（已存在）。

`RouteName` 新增 `Teaching` / `TeachingIndex` / `TeachingDetail`。

### 分類（index 的篩選軸）

用既有的 `FilterPill.vue`：

- **自編試題**（cloze / reading）
- **互動練習**（TOEIC 聽力、可線上作答的克漏字）
- **課程專案**（CLIL、PBL 兩個完整單元）
- **學生成果**（批改對照、課堂產出）

### 導覽

`AppHeader.vue` 目前是 Tutoring / Visuals / AI。建議加入 **Teaching**，並設 `hideInEmbed: true`（比照 Tutoring，見 `useEmbedMode.ts`）。同時在 `TutoringView.vue` 加一個「精選教案」區塊（取 `featured` 前 3 筆）導流過來。

---

## 五、隱私與授權（動工前必須先處理）

看過實際檔案後，具體風險如下：

### 🔴 必須處理：`Color Association by the class.pdf`

這份學生手寫成果上有**四個可辨識的署名**：一個中文姓名（左下）、`Eton`、`Sean`，以及右下角一個中文簽名。

**做法**：裁切掉署名區域，或用色塊遮蓋後再輸出。這份內容本身很好（學生對顏色的聯想詞），去識別化後完全可以放。

### 🔴 已處理：`first-paragraph-without-guidance.png` 底部的 Google Docs 連結

原圖頁尾印著兩行 `https://docs.google.com/document/d/1vIjpuu09...` 的完整文件網址。
公開這張圖等於公開那份文件的 ID，任何人都能拿去試開。**站上的版本已經裁掉頁尾**
（`public/teaching/writing/draft.jpg`），原圖仍保留在 `src/assets/todo/`。
之後若換圖或重新輸出，記得再裁一次。

### 🟡 學生英文名 `Matt`（未成年，12 歲）

作文的署名與內文（`I'm matt`）出現學生的英文名。只有名、沒有姓，識別度不高，
目前照原樣放著。不過這位學生**未成年**，公開前建議還是知會一下家長。

若要更保守可以把署名那兩處塗掉——但署名正是「補上完整書信格式」這個教學重點的證據，
塗掉會讓第三階段的進步少一項，取捨一下。

### 🟡 需要確認：`Jellyfish Works/` 六張掃描

第一張沒看到姓名（頁面上緣被裁掉），但**其餘五張需要逐張確認**是否有姓名欄、班級、座號。手寫筆跡本身識別度低，去掉姓名後風險不高。

### 🟡 需要確認：`PBL/pictures/` 的照片與影片

`Discussion.jpg`、`Rehersal1.jpg`、`Coordination.jpg` 以及四支影片，從檔名判斷都是**學生實際入鏡**的課堂活動紀錄。

- 有家長書面同意 → 可放（影片建議走 YouTube unlisted）
- 沒有 → 改用 `Poster Design.jpg`（拍作品不拍人）這類「拍成果不拍臉」的照片，人物照一律先不放
- 折衷：只放局部（手、海報、桌面），或用 `ImagePlaceholder.vue` 佔位

### 🟡 第三方素材的著作權

- `q1-image.jpeg`（TOEIC 情境照）看起來是**商業／授權圖庫照片**。課堂內部使用是一回事，**公開放到個人網站是另一回事**。建議換成自己拍的、或 Unsplash／Pexels 這類明確可商用的圖，重新錄一次選項音檔即可（音檔是 TTS 產的，重做成本很低）。
- `Special Packaging2.pdf` 用了 Martinelli's 的品牌照片與 logo。作為教學案例分析引用尚可，但頁面上建議標註「品牌圖片版權屬原公司，僅作教學範例引用」。
- 你自己寫的克漏字（Mustard Greens、Jellyfish）**已有版權浮水印**，可以放心公開，這是優勢不是風險。

### 同意紀錄放哪

**不要**寫進 `src/data/teaching.ts`——那會 build 進公開的前端 bundle。維護一份本機的 `docs/teaching-consent.md` 並 gitignore，或直接放在專案外的私人 Drive。程式碼裡只留「已審核通過」的素材。

---

## 六、呈現方式：別只放 PDF

這批素材最可惜的用法就是做成一排 PDF 下載連結。分三種強度：

### 強度 1：靜態展示（適用 C、D 類）

封面預覽圖 + 說明文字 + 「在 Google Drive 開啟完整檔案 ↗」。

**學生作品用「前後對照」呈現**：左邊乾淨題目、右邊批改後的掃描，用 tab 或滑桿切換。這是 D 類素材的最佳用法。

### 強度 2：TOEIC 聽力互動題（旗艦功能）

`toeic-questions/` 的結構天生就是一個可以直接玩的題目：

```
┌──────────────────────────────────┐
│  [情境照片]                       │
│                                  │
│  ▶ 播放全部（merged.mp3）        │
│                                  │
│  ○ A  ▶  ── 3s                   │
│  ○ B  ▶  ── 3s                   │
│  ○ C  ▶  ── 3s                   │
│  ○ D  ▶  ── 3s                   │
│                                  │
│  [ 對答案 ]                       │
└──────────────────────────────────┘
   作答後 → 顯示正解、逐字稿、解析
```

用原生 `<audio>` 就能做，**零新增依賴**。四題串成一個小測驗，最後給分數。

頁面上要放一句話點出那條敘事線：「**這些選項音檔是用我自己做的 [Base64 → MP3 合併工具](/#/visuals/base64) 產生的**」，並在 `Base64Converter.vue` 那頁回連過來。兩邊互指，故事才完整。

### 強度 3：線上克漏字（第二階段再做）

Mustard Greens / Jellyfish 那兩份是標準四選一克漏字，可以做成網頁版即時作答 + 顯示中文解析（解析內容你在 `Jellyfish Works` 的紅筆註記裡都寫好了，直接數位化）。

**但這要重新打字建資料**，工作量不小。建議 **P1 先只做 TOEIC 聽力**（資料量小、格式規律），克漏字放 P3，先用 PDF 預覽圖頂著。

---

## 七、資料模型

新增 `src/types/teaching.ts`。**注意**：`types/tutoring.ts` 與 `types/landing.ts` 已各有一個 `Testimonial`，此處避免再撞名。

```ts
export type TeachingCategory =
  | 'worksheet'    // 自編試題
  | 'interactive'  // 可線上作答
  | 'project'      // 課程專案（CLIL / PBL）
  | 'student-work' // 學生成果

export interface TeachingAsset {
  /** public/ 底下的絕對路徑，例如 '/teaching/jellyfish/cover.webp' */
  src: string
  /** 必填：無障礙需要，也是圖沒載入時的唯一資訊 */
  alt: string
  caption?: string
  /** 壓縮後的實際寬高，用來鎖 aspect-ratio */
  width: number
  height: number
}

/** 指向 Google Drive / YouTube 的完整原檔 */
export interface ExternalResource {
  label: string        // '完整簡報（PPTX）'
  url: string
  kind: 'drive' | 'youtube' | 'other'
}

export interface LessonStep {
  duration: string     // '0–10 min'
  activity: string
  note?: string
}

export interface TeachingItem {
  slug: string
  title: string
  category: TeachingCategory
  audience: string[]           // ['國中', '高中']
  tags: string[]               // ['克漏字', '字彙', 'CLIL']
  date: string                 // 'YYYY-MM'，排序用
  summary: string
  cover: TeachingAsset
  gallery?: TeachingAsset[]
  objectives?: string[]        // 教學目標
  outline?: LessonStep[]       // 課堂流程
  reflection?: string          // 教學反思／成效（作品集加分項）
  resources?: ExternalResource[]
  /** 前後對照：乾淨版 vs 批改版 */
  comparison?: { before: TeachingAsset; after: TeachingAsset }
  /** 標 featured 的會出現在 /tutoring 導流區塊 */
  featured?: boolean
}
```

TOEIC 互動題另外一組型別（放 `src/types/teaching.ts` 或獨立 `listening.ts`）：

```ts
export type OptionLabel = 'A' | 'B' | 'C' | 'D'

export interface ListeningOption {
  label: OptionLabel
  audioSrc: string
  /** 逐字稿，作答後才顯示 */
  transcript: string
}

export interface ListeningQuestion {
  id: string                   // 'q1'
  image: TeachingAsset
  options: ListeningOption[]
  answer: OptionLabel
  /** 四段合併音檔（來自 /visuals/base64 工具） */
  mergedAudioSrc?: string
  explanation?: string
}
```

資料放 `src/data/teaching.ts`，比照 `src/data/tutoring.ts`（純 TS 陣列，型別安全，不引 CMS）。作品超過 30 篇再考慮 markdown pipeline。

---

## 八、UI 規劃

沿用既有設計系統：`main.css` 的 neutral（zinc）+ accent（teal）色票、`font-serif` 標題 / `font-sans` 內文、`max-w-5xl`、`shadow-card` / `shadow-card-hover`，全部走 Tailwind utility（CLAUDE.md 規則 1、2）。

### Index

`PageHeader` → `FilterPill` 分類列 → 卡片 grid（`sm:grid-cols-2 lg:grid-cols-3`，樣式比照 `VisualsIndexView.vue` 的 `RouterLink` 卡）。互動類卡片加一個 `PillTag` 標「可線上作答」。篩選無結果 → `EmptyState.vue`。篩選狀態同步到 query string（`?category=interactive`），分享連結能保留篩選。

### Detail

返回連結 → `PageHeader`（title + summary）→ meta pills（日期／對象／標籤，用 `PillTag.vue`）→ 依 `category` 切主體模組 → 底部 Drive 資源連結 + 上下篇。

### 需要新做的元件

- `ImageLightbox.vue`：原生 `<dialog>` + `showModal()`（天生有 focus trap 與 Esc 關閉）、左右鍵切換、點背景關閉。**不加依賴。**
- `BeforeAfter.vue`：tab 切換乾淨版／批改版
- `ListeningQuiz.vue`：TOEIC 播放器 + 作答 + 對答案

### 圖片載入

`loading="lazy"` + `decoding="async"`（首屏封面除外，用 `fetchpriority="high"`）；用資料裡的 `width`/`height` 鎖 aspect-ratio；未上稿的位置先用 `ImagePlaceholder.vue`（已存在，可傳 `label` 描述預計放什麼）——這樣**可以先把整個頁面骨架做完，再慢慢補圖**。

---

## 九、檔案異動清單

| 檔案 | 異動 |
|---|---|
| `.gitignore` | **先加 `src/assets/todo/`** |
| `src/types/teaching.ts` | 新增，見第七節 |
| `src/data/teaching.ts` | 新增，作品資料 |
| `src/data/toeicListening.ts` | 新增，TOEIC 題組資料 |
| `src/types/routes.ts` | 新增 `Teaching` / `TeachingIndex` / `TeachingDetail` |
| `src/router/index.ts` | 新增 `/teaching` 巢狀路由 |
| `src/views/TeachingView.vue` | 新增，parent（sub-nav + `RouterView`），比照 `VisualsView.vue` |
| `src/views/teaching/TeachingIndexView.vue` | 新增 |
| `src/views/teaching/TeachingDetailView.vue` | 新增 |
| `src/components/teaching/TeachingCard.vue` | 新增 |
| `src/components/teaching/LessonOutline.vue` | 新增，教案流程表 |
| `src/components/teaching/AssetGallery.vue` | 新增 |
| `src/components/teaching/ImageLightbox.vue` | 新增 |
| `src/components/teaching/BeforeAfter.vue` | 新增 |
| `src/components/teaching/ListeningQuiz.vue` | 新增 |
| `src/composables/useTeachingFilter.ts` | 新增，篩選 ↔ query string |
| `src/components/layouts/AppHeader.vue` | 加 Teaching 連結（`hideInEmbed: true`） |
| `src/views/TutoringView.vue` | 加「精選教案」導流區塊 |
| `src/views/visuals/Base64Converter.vue` | 加一句回連到 TOEIC 題組頁 |
| `public/teaching/**` | 壓縮後的圖與 TOEIC 音檔 |

**不需要新增任何 npm 執行時依賴。**

---

## 十、分階段

| 階段 | 內容 | 狀態 |
|---|---|---|
| **P0** | gitignore → types + data + 路由 + index 卡片牆 | ✅ 完成 |
| **P1** | TOEIC 聽力互動題 | ✅ 完成（答案與逐字稿待補） |
| **P2** | detail 頁版面模組 + lightbox + 前後對照 + `/tutoring` 導流 | ✅ 完成 |
| **P3** | 隱私審核 → 決定哪些可公開 → 解除 `public/teaching/` 的 gitignore → 部署 | ⬜ 未開始 |
| **P4** | 線上克漏字、Drive 連結、手機 swipe | ⬜ 未開始 |

實際做的時候把 P1 排在 detail 頁之前：TOEIC 那組資料量小、格式規律、又能直接玩，最快確認音檔路徑與播放行為是對的。

### 實際完成的檔案

新增：`src/types/teaching.ts`、`src/data/teaching.ts`、`src/data/toeicListening.ts`、
`src/composables/useTeachingFilter.ts`、`src/views/TeachingView.vue`、
`src/views/teaching/{TeachingIndexView,TeachingDetailView,ToeicListeningView}.vue`、
`src/components/teaching/{TeachingCard,ListeningQuiz,ImageLightbox,AssetGallery,ProgressionViewer}.vue`

### 學習歷程用 N 階段，不是前後兩張

原本規劃的是 `BeforeAfter`（before / after 兩張）。作文素材進來後改成
`ProgressionViewer`，吃一個 `ProgressionStage[]`：每個階段有 `label`、`asset` 和一段
`note`（顯示在圖片下方，說明這個階段看到什麼）。兩個階段就是前後對照（Jellyfish），
三個以上就是完整歷程（作文）。一個元件涵蓋兩種情況，不用維護兩套。

修改：`.gitignore`、`src/types/routes.ts`、`src/router/index.ts`、`src/views/TutoringView.vue`

**沒有新增任何 npm 依賴**，音檔播放用原生 `Audio`、燈箱用原生 `<dialog>`。
依回覆調整的兩點：Teaching **不進 `AppHeader`**，只從 `/tutoring` 頁面導流；
TOEIC 題組放在 `/teaching` 底下，**沒有動 `/visuals`**（那裡只放程式相關內容）。

### 素材處理

原檔留在 `src/assets/todo/`（gitignore），站上用的是壓縮後的衍生檔：

- TOEIC 情境照 1408×768 → 1200 寬 JPEG，每張 576KB–1MB 壓到 90–240KB
- PDF 教材用 macOS Quick Look（`qlmanage -t`）算出首頁預覽圖 → 1200 寬 JPEG
- 作文三張 1.2–1.4MB PNG → JPEG 約 170–200KB；`draft.jpg` 另外裁掉頁尾的文件網址
- 全部放 `public/teaching/`，共約 4MB

---

## 十一、已知限制

- **SEO / 分享預覽**：router 用 `createWebHashHistory`，網址是 `/#/teaching/xxx`。純靜態站無 SSR，**各篇 detail 頁無法有自己的 OG 圖與描述**，分享到 LINE／FB 預覽會是首頁那張。若這對招生重要，要另外評估（改 `createWebHistory` + GitHub Pages 404 fallback，或搬到 Vercel/Netlify 做 prerender）——**獨立議題，不在本次範圍**。
- **Drive 連結會失效**：檔案移動或改分享設定就斷。建議在 Drive 開一個專用的「公開作品集」資料夾，檔案放進去後就別再搬。

---

## 未完成事項

### 🔴 必補：TOEIC 題目的正解與逐字稿

`src/data/toeicListening.ts` 裡四題的 `answer` 目前**全部是佔位值 `'A'`**，`transcript` 與
`explanation` 是空的。音檔內容無法從檔案本身判讀，需要你聽過
`public/teaching/toeic/qN/a–d.mp3` 後逐題填。**填完之前這一頁不要對外分享**——
現在按「對答案」會給出錯誤的結果。

逐字稿填了之後，作答完會顯示在每個選項下方；`explanation` 填了會多一塊解析。

### 🟡 這組音檔是哪種口音

`ToeicListeningView.vue` 的口音說明裡寫的是「下面這一組是**其中一個**口音的版本」——
因為我聽不了音檔，不知道實際是美式還是英式。裡面留了 `TODO`，
你確認後把它改成明確的口音名稱，那句話才有說服力。

### 🟡 文案是初稿

`src/data/teaching.ts` 裡的 `summary` / `objectives` / `reflection` 是我依教材實際內容整理的，
語氣不見得像你。上線前請自己改寫一遍——尤其 `reflection` 那兩段是揣摩的，請換成你真實的想法。

標了 `// TODO` 的 `date` 是從檔名或版權標示推出來的（例如 `26032022...jpg` → 2022-03、
Mustard Greens 的 `Copyright © 2022`），CLIL / Charlie / 龍捲風三筆需要你確認。

### 🟡 `public/teaching/` 目前是 gitignore

站上的圖與音檔**不會被 commit，也不會部署**，只在本機看得到。這是刻意的：
你說先在 local 看效果，而這些素材還沒做隱私與著作權審核。
要上線時，跑一次第五節的 checklist，決定哪些檔案可公開，再把 `.gitignore`
裡的 `public/teaching/` 拿掉（`src/assets/todo/` 那行請保留，60MB 原檔不該進 repo）。

### ⬜ 尚未驗證

型別檢查與 build 都過了，34 個素材路徑也都確認回 200，但**頁面實際渲染的樣子我沒看過**
（Chrome 擴充功能沒連上）。`npm run dev` 後看一下 `/#/teaching`。

---

## 待確認事項（已回覆，保留紀錄）

1. **PBL 課堂照片與影片的同意狀況**：`Discussion.jpg`、`Rehersal1.jpg`、`Coordination.jpg` 與四支影片有學生入鏡，有家長書面同意嗎？沒有的話第一版就跳過人物照，只放 `Poster Design.jpg` 這類拍成果的。 // 先在local看效果而已，不用考慮個資問題
2. **教材著作權歸屬**：CLIL / PBL 這兩個單元是任職期間為機構製作的，還是自己的？機構製作的可能著作權不在你手上。 // 先在local看效果而已，不用考慮個資問題
3. **TOEIC 情境照的來源**：`q1-image.jpeg` 等四張是圖庫授權照嗎？若不確定來源，建議換成可商用圖並重錄 TTS 音檔（成本很低）。 // 這些圖片是我自己的，不用特別考慮這塊
4. **Google Drive 資料夾要開幾個**：一個總資料夾，還是一個作品一個？（建議後者） // 這個還沒考慮，之後再說
5. **`Charlie and the Chocolate Factory.pdf`** 我沒細看內容——這份是自編教材還是含出版社原文？ // 這是一份教材
6. **導覽列**：Teaching 要進 `AppHeader`，還是只從 `/tutoring` 頁內導流？ // tutoring導流
7. **語言**：作品集頁面用中文、英文還是雙語？（`/tutoring` 是中文、`/visuals` 是英文，站內本來就混用；作品集若也想給國際機構看，建議英文為主） // visuals是放和程式碼相關的內容，不要放和教學相關作品
