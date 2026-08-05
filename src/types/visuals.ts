export interface Tool {
  slug: string
  title: string
  description: string
  tags: string[]
  thumbnail?: string
}

export interface Work {
  title: string
  description: string
  thumbnail: string
  tags: string[]
  link?: string
}
