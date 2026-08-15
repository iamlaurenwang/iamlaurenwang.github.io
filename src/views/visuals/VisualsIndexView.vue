<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import {
  LayoutGrid,
  Sparkles,
  ArrowRight,
  Braces,
  AudioLines,
} from '@lucide/vue'
import { RouteName } from '@/types/routes'
import PillTag from '@/components/PillTag.vue'

interface VisualCard {
  title: string
  description: string
  to: { name: RouteName }
  icon: typeof LayoutGrid
  ready: boolean
}

const cards: VisualCard[] = [
  {
    title: 'Flexbox & Grid',
    description: 'Interactive playgrounds to build intuition for CSS layout.',
    to: { name: RouteName.VisualsFlexGrid },
    icon: LayoutGrid,
    ready: true,
  },
  {
    title: 'JavaScript Concepts',
    description: 'Interactive demos for language features, starting with closures.',
    to: { name: RouteName.VisualsJs },
    icon: Braces,
    ready: true,
  },
  {
    title: 'Base64 → MP3',
    description:
      'Decode base64 audio in the browser, preview it, and merge clips into one file.',
    to: { name: RouteName.VisualsBase64 },
    icon: AudioLines,
    ready: true,
  },
  {
    title: 'Animation',
    description: 'Easing curves and motion experiments.',
    to: { name: RouteName.VisualsAnimation },
    icon: Sparkles,
    ready: false,
  },
]
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-12">
    <h1 class="font-serif text-4xl text-neutral-800 dark:text-neutral-100">Visuals</h1>
    <p class="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      A small collection of interactive demos I build to explore and explain front-end concepts.
    </p>

    <div class="mt-10 grid gap-5 sm:grid-cols-2">
      <RouterLink
        v-for="card in cards"
        :key="card.title"
        :to="card.to"
        class="group flex flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-card transition-shadow hover:shadow-card-hover dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="flex items-center justify-between">
          <component :is="card.icon" :size="24" class="text-accent-500 dark:text-accent-400" />
          <PillTag v-if="!card.ready" variant="muted" size="xs">Soon</PillTag>
        </div>
        <h2 class="mt-4 font-serif text-xl text-neutral-800 dark:text-neutral-100">{{ card.title }}</h2>
        <p class="mt-2 flex-1 font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {{ card.description }}
        </p>
        <span
          class="mt-4 flex items-center gap-1.5 font-sans text-xs tracking-wide text-accent-600 uppercase"
        >
          Explore
          <ArrowRight :size="14" class="transition-transform group-hover:translate-x-1" />
        </span>
      </RouterLink>
    </div>
  </div>
</template>
