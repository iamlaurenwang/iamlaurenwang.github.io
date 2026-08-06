import type { SkillCategory } from '@/types/resume'

export const skillCategories: SkillCategory[] = [
  {
    category: '前端框架與語言',
    skills: ['TypeScript', 'JavaScript', 'Vue.js (Vue2/Vue3)', 'Nuxt.js', 'C#'],
  },
  {
    category: 'UI／樣式庫',
    skills: ['TailwindCSS', 'Element Plus', 'Bootstrap', 'Quasar', 'Nuxt UI'],
  },
  {
    category: '測試',
    skills: ['Vitest', '單元測試', 'E2E 測試', 'TDD'],
  },
  {
    category: 'DevOps／CI-CD',
    skills: ['GitLab CI/CD', 'GitLab Runner', 'Docker'],
  },
  {
    category: '資料與訊息系統',
    skills: ['SQL', 'Entity Framework', 'Redis', 'Kafka (Pub/Sub)', 'gRPC'],
  },
  {
    category: '雲端與可觀測性',
    skills: ['GCP', 'Elastic', 'Grafana'],
  },
  {
    category: 'Web 資安',
    skills: ['CSP', 'CORS', 'XSS 防護'],
  },
  {
    category: '開發流程與協作',
    skills: ['Scrum', 'Agile', 'Code Review', 'SOLID 原則'],
  },
  {
    category: 'AI 輔助開發',
    skills: ['GitHub Copilot', 'Claude Code', 'Figma MCP'],
  },
]
