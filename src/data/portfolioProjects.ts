import type { PortfolioProject } from '@/types/portfolio'

// 作品集精選：imedtac 旗艦專案 + 個人 side project。
// 文案英文，依 2026-11-14 諮詢報告定位（小團隊 0→1 全端）；內部產品名與料號已泛化。
export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'surgical-instrument-3d',
    title: 'Surgical Instrument 3D Models',
    tag: 'imedtac · 2026',
    summary:
      'An AI pipeline that turns a single photo of a surgical instrument into an interactive 3D model nurses can rotate and zoom in the browser — background removal, feature understanding, and 3D generation (BiRefNet → DINOv3 → TRELLIS.2), delivered as GLB. 10 instruments shipped at near-zero cost per model, on fully commercial-use licenses.',
    tech: ['Vue 3', 'TypeScript', 'BiRefNet', 'DINOv3', 'TRELLIS.2', 'GLB'],
  },
  {
    id: '手術器械辨識',
    title: 'Medical Instrument Detection',
    tag: 'imedtac · 2026',
    summary:
      'Real-time surgical instrument detection in the browser: a fine-tuned YOLO model served through ONNX Runtime — a working MVP with 84.4% accuracy shipped within one week, at ~35 ms inference per frame.',
    tech: ['Vue 3', 'FastAPI', 'ONNX Runtime', 'YOLO', 'Docker'],
    image: '/projects/medical-instrument-detection.jpg',
  },
  {
    id: 'ai-clinical-assistant',
    title: 'AI Clinical Assistant',
    tag: 'imedtac · 2026',
    summary:
      'An AI assistant inside the video consultation: generates SOAP notes from speech, and handles follow-up queries and appointment booking in natural language — cutting booking time from 5–10 minutes to under 1 minute.',
    tech: ['Vue 3', 'TypeScript', 'LLM Tool-calling', 'Ollama', 'WebRTC', 'C#'],
    image: '/projects/ai-clinical-assistant.jpg',
  },
  {
    id: 'field-attendance-bot',
    title: 'Field Team Attendance Bot',
    tag: 'imedtac · 2026',
    summary:
      'A LINE bot that lets field application engineers check in and out by tagging it in the group chat, with every record logged to a spreadsheet automatically — managers see the daily roster instantly instead of waiting for replies.',
    tech: ['LINE Messaging API', 'Google Apps Script', 'Google Sheets'],
  },
  {
    id: 'piano-learning-helper',
    title: 'Piano Learning Helper',
    tag: 'Side Project · 2026',
    summary:
      'A browser-only web app that helps piano learners identify notes and chords in real time: microphone input lights up an SVG keyboard with note names and pitch accuracy, and recognizes four triad types with short theory explanations. Everything runs client-side; installable as a PWA.',
    tech: ['Vue 3', 'TypeScript', 'Web Audio API', 'Pitchy', 'PWA', 'Tailwind v4'],
    image: '/projects/piano-learning-helper.jpg',
    links: {
      live: 'https://piano-learning-helper.iamlaurenwang.workers.dev/',
    },
  },
]
