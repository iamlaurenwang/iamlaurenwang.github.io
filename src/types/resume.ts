export interface Period {
  start: string  // 'YYYY-MM', e.g. '2023-06'
  end?: string   // absent = present / current
}

export interface WorkExperience {
  company: string
  companyZh?: string
  role: string
  period: Period
  location?: string
  description: string
  highlights: string[]
  skills: string[]
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
}

export interface Project {
  name: string
  company: string
  period: Period
  role: string
  description: string
  highlights: string[]
  tech: string[]
  links?: {
    github?: string
    live?: string
  }
}

export interface Education {
  school: string
  schoolEn: string
  location: string
  degree: string
  period: { start: string; end: string }
}

export interface SkillCategory {
  category: string
  skills: string[]
}
