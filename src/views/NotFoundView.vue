<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { Home, Palette, NotebookPen, GraduationCap, Mail, ArrowRight } from '@lucide/vue'
import { RouteName } from '@/types/routes'

interface SuggestedRoute {
  label: string
  description: string
  to: { name: RouteName }
  icon: typeof Home
}

const suggestions: SuggestedRoute[] = [
  {
    label: 'Home',
    description: 'Back to the start.',
    to: { name: RouteName.Landing },
    icon: Home,
  },
  {
    label: 'Visuals',
    description: 'Interactive front-end demos.',
    to: { name: RouteName.VisualsIndex },
    icon: Palette,
  },
  {
    label: 'Notes',
    description: 'Things I’ve been learning.',
    to: { name: RouteName.Notes },
    icon: NotebookPen,
  },
  {
    label: 'Tutoring',
    description: 'How I can help you learn.',
    to: { name: RouteName.Tutoring },
    icon: GraduationCap,
  },
  {
    label: 'Contact',
    description: 'Say hello.',
    to: { name: RouteName.Contact },
    icon: Mail,
  },
]
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
    <p class="font-serif text-7xl text-accent-400 sm:text-8xl">404</p>
    <h1 class="mt-4 font-serif text-3xl text-neutral-800 sm:text-4xl">
      This page wandered off
    </h1>
    <p class="mt-3 max-w-md font-sans text-sm leading-relaxed text-neutral-500">
      The path you’re looking for doesn’t exist or may have moved. Here are a few
      places you might like instead.
    </p>

    <div class="mt-12 grid w-full gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="item in suggestions"
        :key="item.label"
        :to="item.to"
        class="group flex items-start gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <component :is="item.icon" :size="22" class="mt-0.5 shrink-0 text-accent-500" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5">
            <h2 class="font-serif text-lg text-neutral-800">{{ item.label }}</h2>
            <ArrowRight
              :size="14"
              class="text-accent-600 transition-transform group-hover:translate-x-1"
            />
          </div>
          <p class="mt-1 font-sans text-sm leading-relaxed text-neutral-500">
            {{ item.description }}
          </p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
