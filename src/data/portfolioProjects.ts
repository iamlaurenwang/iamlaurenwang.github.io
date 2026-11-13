import type { PortfolioProject } from '@/types/portfolio'

// 作品集精選：imedtac 旗艦專案 + 個人 side project。
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'piano-learning-helper',
    title: 'Piano Learning Helper',
    tag: 'Side Project · 2026',
    summary:
      '幫助鋼琴學習者即時辨識彈奏的音與和弦的純前端 Web App：麥克風收音後即時在 SVG 鍵盤高亮，顯示音名／音準，並辨識四種三和弦附概念解說。所有運算在瀏覽器端完成，可安裝為 PWA。',
    tech: ['Vue 3', 'TypeScript', 'Web Audio API', 'Pitchy', 'PWA', 'Tailwind v4'],
    image: '/projects/piano-learning-helper.jpg',
    links: {
      live: 'https://piano-learning-helper.iamlaurenwang.workers.dev/',
    },
  },
  {
    id: 'ai-clinical-assistant',
    title: '遠距醫療AI助理',
    tag: 'imedtac · 2026',
    summary:
      '視訊看診中的 AI 助理：語音自動生成 SOAP 病歷，並以自然語言完成回診查詢與預約，將預約時間從 5–10 分鐘縮短到 1 分鐘內。',
    tech: ['Vue 3', 'TypeScript', 'LLM Tool-calling', 'Ollama', 'WebRTC', 'C#'],
    image: '/projects/ai-clinical-assistant.jpg',
  },
  {
    id: '手術器械辨識',
    title: 'Medical Instrument Detection',
    tag: 'imedtac · 2026',
    summary:
      '瀏覽器即時手術器械偵測：fine-tune YOLO 並以 ONNX Runtime 推論，一週內做出 84.4% 準確率的 MVP，單張推論延遲約 35 ms。',
    tech: ['Vue 3', 'FastAPI', 'ONNX Runtime', 'YOLO', 'Docker'],
    image: '/projects/medical-instrument-detection.jpg',
  },
]
