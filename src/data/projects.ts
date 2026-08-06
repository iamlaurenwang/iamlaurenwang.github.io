import type { Project } from '@/types/resume'

export const projects: Project[] = [
  {
    name: 'Employee Health Management System',
    company: 'imedtac Co., Ltd.',
    period: { start: '2025-03' },
    role: 'Frontend Lead',
    description: 'An internal platform for managing employee occupational health records, scheduling, and compliance reporting across enterprise clients.',
    highlights: [
      'Architected a modular Vue 3 component library used across 3 sub-systems',
      'Reduced page load time by 35% through route-level code splitting and lazy loading',
      'Integrated role-based access control with route-level permission guards',
    ],
    tech: ['Vue 3', 'TypeScript', 'TailwindCSS', 'GitLab CI/CD', 'Docker'],
  },
  {
    name: 'Logistics Operations Dashboard',
    company: 'TitanSoft',
    period: { start: '2024-08', end: '2025-01' },
    role: 'Frontend Engineer',
    description: 'A real-time dashboard for monitoring fleet status, delivery routes, and exception alerts for logistics operations teams.',
    highlights: [
      'Built data-dense table components with virtual scrolling supporting 10,000+ records',
      'Designed a configurable widget system allowing teams to customise dashboard layouts',
      'Added Kafka-driven live updates with WebSocket fallback for connection resilience',
    ],
    tech: ['Vue 3', 'Quasar', 'TypeScript', 'Kafka', 'WebSocket'],
  },
  {
    name: 'Insurance Policy Self-Service Portal',
    company: 'Cathay Life Insurance',
    period: { start: '2023-07', end: '2024-05' },
    role: 'Software Engineer',
    description: 'A customer-facing web portal for policyholders to view coverage details, submit claims, and manage beneficiaries.',
    highlights: [
      'Migrated 20+ legacy jQuery pages to a Vue 2 SPA with zero downtime using incremental rollout',
      'Reduced backend API calls by 40% through a Redis-backed session caching layer',
      'Worked with backend engineers on gRPC contract definitions for policy data synchronisation',
    ],
    tech: ['Vue 2', 'C#', 'SQL', 'Redis', 'gRPC', 'Entity Framework'],
  },
]
