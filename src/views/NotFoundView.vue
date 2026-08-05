<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { RouteName } from '@/types/routes'

interface SuggestedRoute {
  label: string
  to: { name: RouteName }
}

const links: SuggestedRoute[] = [
  { label: 'Home', to: { name: RouteName.Landing } },
  { label: 'Visuals', to: { name: RouteName.VisualsIndex } },
  { label: 'Notes', to: { name: RouteName.Notes } },
  { label: 'Tutoring', to: { name: RouteName.Tutoring } },
  { label: 'Contact', to: { name: RouteName.Contact } },
]
</script>

<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-neutral-900 text-neutral-200">
    <!-- Candlelight — a single warm glow behind the numeral -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl sm:h-96 sm:w-96"
    />

    <!-- Wordmark — the way home -->
    <div class="relative px-6 py-6 sm:px-10">
      <RouterLink
        :to="{ name: RouteName.Landing }"
        class="rounded-sm font-serif text-sm font-light tracking-wide text-neutral-400 transition-colors hover:text-accent-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
      >
        Lauren Wang
      </RouterLink>
    </div>

    <!-- Centre stage -->
    <div class="relative flex flex-1 flex-col items-center justify-center px-6 pb-28 text-center">
      <div class="flex items-center gap-5 sm:gap-7">
        <span class="h-1.5 w-1.5 rounded-full bg-accent-400/70" />
        <span class="font-serif text-7xl leading-none text-accent-300 sm:text-8xl">404</span>
        <span class="h-1.5 w-1.5 rounded-full bg-accent-400/70" />
      </div>

      <div class="mt-10 h-px w-40 bg-gradient-to-r from-transparent via-accent-400 to-transparent" />

      <h1 class="mt-10 font-serif text-3xl text-neutral-100 sm:text-4xl">
        You’ve wandered off the path.
      </h1>
      <p class="mt-4 max-w-sm font-sans text-sm leading-relaxed text-neutral-400">
        This page doesn’t exist, or it may have moved. Choose where to head next.
      </p>

      <nav class="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="rounded-sm font-sans text-sm text-neutral-300 decoration-accent-400 underline-offset-8 transition-colors hover:text-accent-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </div>
</template>
