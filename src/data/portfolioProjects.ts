import type { PortfolioProject } from '@/types/portfolio'

// 作品集精選。目前先放兩個 imedtac 旗艦專案，個人作品之後再加。
export const portfolioProjects: PortfolioProject[] = [
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
