import type { Component } from 'vue'

export interface TutoringService {
  icon: Component
  iconClass: string
  title: string
  description: string
  tags: string[]
}

export interface Testimonial {
  quote?: string
  points?: string[]
  author: string
  context: string
}

export interface FeaturedStory {
  pullQuote: string
  leadParagraphs: string[]
  restParagraphs: string[]
  result: string
  author: string
}

export interface Achievement {
  value: string
  label: string
}

export interface Faq {
  question: string
  answer: string
}
