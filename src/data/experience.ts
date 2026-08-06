import type { WorkExperience, Education } from "@/types/resume";

export const education: Education = {
  school: "國立高雄師範大學 英語學系",
  schoolEn: "National Kaohsiung Normal University",
  location: "Kaohsiung, Taiwan",
  degree: "Bachelor of Arts in English",
  period: { start: "2014", end: "2018" },
};

export const experiences: WorkExperience[] = [
  {
    company: "imedtac Co., Ltd.",
    companyZh: "慧誠智醫",
    role: "Software Engineer",
    period: { start: "2025-02" },
    location: "Taipei, Taiwan",
    description:
      "Building frontend systems for occupational health management products used by enterprise clients.",
    highlights: [
      "Led Vue 3 Composition API adoption across the frontend team",
      "Integrated Claude Code and Figma MCP into team workflow, shortening design-to-code cycles",
      "Established CSP and XSS protection standards across all product interfaces",
    ],
    skills: ["Vue 3", "TypeScript", "TailwindCSS", "GitLab CI/CD", "Docker", "Claude Code"],
    type: "full-time",
  },
  {
    company: "TitanSoft",
    companyZh: "新加坡商鈦坦科技",
    role: "Software Engineer",
    period: { start: "2024-07", end: "2025-01" },
    location: "Taipei, Taiwan",
    description:
      "Developed enterprise web applications for logistics and operations management clients.",
    highlights: [
      "Built a reusable component library with Quasar Framework adopted across two product lines",
      "Wrote Vitest unit and E2E tests, raising coverage from 20% to 75%",
      "Participated in Agile sprints with weekly releases and regular code reviews",
    ],
    skills: ["Vue 3", "Quasar", "TypeScript", "Vitest", "GitLab CI/CD"],
    type: "full-time",
  },
  {
    company: "Cathay Life Insurance",
    companyZh: "國泰人壽",
    role: "Software Engineer",
    period: { start: "2023-06", end: "2024-06" },
    location: "Taipei, Taiwan",
    description:
      "Maintained and extended policy management and customer service systems for one of Taiwan's largest insurers.",
    highlights: [
      "Migrated 20+ legacy pages from jQuery to Vue 2 SPA with zero downtime",
      "Reduced API response time by 40% by introducing a Redis caching layer",
      "Collaborated with backend engineers on gRPC service contracts for real-time policy data",
    ],
    skills: ["Vue 2", "C#", "SQL", "Redis", "gRPC", "Entity Framework"],
    type: "full-time",
  },
  {
    company: "Pai Han Foreign Language",
    companyZh: "百瀚外語",
    role: "English Teacher",
    period: { start: "2019-03", end: "2022-06" },
    location: "Kaohsiung, Taiwan",
    description:
      "Taught English writing, composition, and standardised test preparation to students from high school to adult learners.",
    highlights: [
      "Designed GEPT and TOEIC preparation curricula tailored to each student's level",
      "Maintained a 90%+ pass rate among students sitting the GEPT intermediate exam",
      "Developed original writing prompts, rubrics, and self-evaluation materials",
    ],
    skills: ["GEPT", "TOEIC", "Curriculum Design", "Writing Instruction", "國高中升學準備"],
    type: "full-time",
  },
];
