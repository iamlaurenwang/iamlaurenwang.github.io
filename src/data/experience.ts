import type { WorkExperience, Education } from '@/types/resume'

export const education: Education = {
  school: '國立高雄師範大學 英語學系',
  schoolEn: 'National Kaohsiung Normal University',
  location: 'Kaohsiung, Taiwan',
  degree: 'Bachelor of Arts in English',
  period: { start: '2014', end: '2018' },
}

export const experiences: WorkExperience[] = [
  {
    company: 'imedtac Co., Ltd.',
    companyZh: '慧誠智醫',
    role: 'Senior Software Engineer',
    period: { start: '2025-02' },
    location: 'Taipei, Taiwan',
    description:
      'Delivered full-stack features for a telemedicine SaaS platform and led end-to-end deployment for the Japan market.',
    highlights: [
      'Built an LLM agent (Ollama, tool-calling) that lets clinicians and patients manage appointments in natural language within the video call, reducing booking time from 5–10 min to under 1 min.',
      'Spearheaded a 0-to-1 surgical instrument recognition POC by fine-tuning a pretrained YOLO model on a custom dataset, delivering a working MVP with 84.4% accuracy within 1 week.',
      'Integrated the Tolgee localization platform to resolve i18n-induced RWD overflow issues and enabled PMs to manage copy independently, cutting the translation update cycle from 2–4 days to same-day.',
      'Deployed a Wiki.js knowledge base and authored system architecture docs, FAE troubleshooting guides, and a self-serve onboarding flow, saving half a day of managerial time per new hire.',
    ],
    skills: [
      'Vue 3',
      'TypeScript',
      'WebRTC',
      'C#',
      'Ollama',
      'YOLO',
      'Tolgee',
      'Wiki.js',
      'Docker',
      'GitLab CI/CD',
    ],
    type: 'full-time',
  },
  {
    company: 'TitanSoft',
    companyZh: '新加坡商鈦坦科技',
    role: 'Software Engineer',
    period: { start: '2024-07', end: '2025-01' },
    location: 'Taipei, Taiwan',
    description:
      'Developed enterprise web applications for logistics and operations management clients.',
    highlights: [
      'Built an automated voucher distribution system (Vue 3, TypeScript, C#), reducing the weekly manual process from 1–2 hours to under 3 minutes.',
      'Practiced TDD in an Agile team serving 20k+ users; created test suites as living documentation for complex business logic.',
      'Led resolution of Google "dangerous site" issues; implemented Elastic monitoring, automated alerts, and incident SOP for proactive issue detection.',
      'Participated in Agile sprints with weekly releases and regular code reviews.',
    ],
    skills: ['Vue 3', 'TypeScript', 'C#', 'Vitest', 'Playwright', 'Elastic', 'GCP', 'Scrum/Agile'],
    type: 'full-time',
  },
  {
    company: 'Cathay Life Insurance',
    companyZh: '國泰人壽',
    role: 'Software Engineer',
    period: { start: '2023-06', end: '2024-06' },
    location: 'Taipei, Taiwan',
    description: "Maintained and extended frontend systems for one of Taiwan's largest insurers.",
    highlights: [
      'Designed and maintained a Storybook UI component library adopted by 600+ engineers, standardizing frontend practices company-wide.',
      'Led frontend modernization of a legacy system serving 5,000–8,000 sales agents, focusing on performance and operational efficiency.',
    ],
    skills: ['Vue 3', 'TypeScript', 'Storybook', 'Java', 'SQL'],
    type: 'full-time',
  },
  {
    company: 'Pai Han Foreign Language',
    companyZh: '百瀚外語',
    role: 'English Teacher',
    period: { start: '2019-03', end: '2022-06' },
    location: 'Kaohsiung, Taiwan',
    description: 'Taught exam-prep English to students from high school to adult learners.',
    highlights: [
      'Maintained an ~80% pass rate among students sitting standardized English exams.',
      'Built strong communication and presentation skills through years of classroom instruction.',
    ],
    skills: ['GEPT', 'TOEIC', 'Curriculum Design', 'Writing Instruction'],
    type: 'full-time',
  },
]
