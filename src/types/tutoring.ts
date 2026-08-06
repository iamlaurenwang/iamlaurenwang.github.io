import type { Component } from 'vue'

export interface TutoringService {
  icon: Component
  iconClass: string
  title: string
  description: string
  tags: string[]
}

export interface Testimonial {
  quote: string
  author: string
  context: string
}

export interface Faq {
  question: string
  answer: string
}
