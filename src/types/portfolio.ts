import type { RouteName } from '@/types/routes'

export interface PortfolioProjectLinks {
  github?: string
  live?: string // 外部 URL
  internal?: RouteName // 站內路由
}

export interface PortfolioProject {
  id: string
  title: string
  tag: string // 來源與年份，例如 'imedtac · 2025'
  summary: string
  tech: string[]
  image?: string // public 下的路徑，例如 '/projects/xxx.jpg'
  links?: PortfolioProjectLinks
}
