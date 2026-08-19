import type { Accent, AccentId, AccentTake, ListeningQuestion } from '@/types/teaching'

/**
 * TOEIC Part 1 看圖辨義題組。
 *
 * ⚠️ 待補：`answer`、`transcript`、`explanation` 目前是佔位值。
 * 音檔內容無法從檔案本身判讀，需要聽過音檔後逐題填入正解與逐字稿。
 * 填之前不要對外分享這一頁。
 *
 * 音檔來源：TTS 依同一份腳本合成，各口音各一組；`all.mp3` 是用 /visuals/base64
 * 那支 Base64 → MP3 合併工具接起來的（見 docs/base64-audio-merger.md）。
 *
 * ── 要新增一種口音時，只要做兩件事 ──────────────────────────
 * 1. 把音檔放成 `public/teaching/toeic/<題號>/<口音代號>/{a,b,c,d,all}.mp3`
 *    例如 public/teaching/toeic/q1/uk/a.mp3
 * 2. 在下面 `accents` 加一筆，並在每題的 `takes` 加 `take('<口音代號>', 'q<n>')`
 *
 * 只要有兩種以上口音，作答介面就會自動出現切換鈕；只有一種時不會顯示，
 * 所以現在不必替既有這組音檔取一個還沒確認的口音名稱。
 * ─────────────────────────────────────────────────────────
 */

/**
 * 口音清單，順序就是切換鈕的顯示順序。
 *
 * TODO: 既有這組音檔實際是哪種口音尚未確認。確認後把 `default` 這筆改成
 * 正確的代號與名稱（例如 `{ id: 'us', label: '美式', hint: 'American' }`），
 * 並把 public/teaching/toeic/ 各題資料夾底下的檔案移進對應的口音子資料夾。
 */
export const accents: Accent[] = [
  { id: 'default', label: '原始版本' },
  { id: 'uk', label: '英式', hint: 'British' },
  { id: 'au', label: '澳洲', hint: 'Australian' },
]

/**
 * 產生一組口音音檔的路徑。
 * `default` 口音沿用既有的扁平路徑（q1/a.mp3），其餘放在以口音為名的子資料夾（q1/uk/a.mp3）。
 *
 * `hasMerged` 為 false 時不指定合併軌，作答介面的「播放全部選項」會改成
 * 把 A–D 接力播完，所以新增口音不一定要先產出合併軌。
 */
function take(accent: AccentId, questionId: string, hasMerged = true): AccentTake {
  const base =
    accent === 'default'
      ? `/teaching/toeic/${questionId}`
      : `/teaching/toeic/${questionId}/${accent}`
  return {
    accent,
    audio: {
      A: `${base}/a.mp3`,
      B: `${base}/b.mp3`,
      C: `${base}/c.mp3`,
      D: `${base}/d.mp3`,
    },
    ...(hasMerged ? { mergedAudioSrc: `${base}/all.mp3` } : {}),
  }
}

export const toeicQuestions: ListeningQuestion[] = [
  {
    id: 'q1',
    image: {
      src: '/teaching/toeic/q1.jpg',
      alt: '飯店櫃檯前，一名女子將信用卡遞給櫃檯後方的接待人員，檯面上有讀卡機與皮夾',
      width: 1200,
      height: 654,
    },
    options: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }],
    answer: 'A', // TODO: 聽過音檔後確認
    takes: [take('default', 'q1'), take('uk', 'q1', false), take('au', 'q1')],
  },
  {
    id: 'q2',
    image: {
      src: '/teaching/toeic/q2.jpg',
      alt: '會議室裡一名男子站在白板前，指著月銷售報表的長條圖向四位同事簡報',
      width: 1200,
      height: 654,
    },
    options: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }],
    answer: 'A', // TODO: 聽過音檔後確認
    takes: [take('default', 'q2'), take('uk', 'q2', false), take('au', 'q2')],
  },
  {
    id: 'q3',
    image: {
      src: '/teaching/toeic/q3.jpg',
      alt: '機場登機門前旅客排隊等候，指示牌顯示 GATE B28 前往洛杉磯，窗外停著一架客機',
      width: 1200,
      height: 654,
    },
    options: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }],
    answer: 'A', // TODO: 聽過音檔後確認
    takes: [take('default', 'q3'), take('uk', 'q3', false), take('au', 'q3')],
  },
  {
    id: 'q4',
    image: {
      src: '/teaching/toeic/q4.jpg',
      alt: '倉庫走道上，一名工作人員正把紙箱搬上推車，貨架上堆滿棧板貨物',
      width: 1200,
      height: 654,
    },
    options: [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }],
    answer: 'A', // TODO: 聽過音檔後確認
    takes: [take('default', 'q4'), take('uk', 'q4', false), take('au', 'q4')],
  },
]

/** 每一題都具備的口音，切換鈕只列這些，避免切到某題缺檔。 */
export const availableAccents: Accent[] = accents.filter((accent) =>
  toeicQuestions.every((question) => question.takes.some((t) => t.accent === accent.id)),
)
