<script lang="ts" setup>
import { Flower2 } from '@lucide/vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
import type { Service } from '@/types/landing'

const services: Service[] = [
  { title: 'Frontend Engineering', tone: 'neutral-200' },
  { title: 'Full-Stack Development', tone: 'neutral-300' },
  { title: 'English Teaching & Exam Prep', tone: 'neutral-200' },
]
</script>

<template>
  <section class="bg-neutral-100">
    <div class="mx-auto max-w-6xl px-6 pb-20">
      <div class="mb-10 flex items-center justify-between">
        <h2 class="font-serif text-3xl font-light text-accent-500 md:text-4xl">
          How can I help you?
        </h2>
        <Flower2 :size="26" class="text-accent-400" />
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="group relative aspect-[3/4] overflow-hidden"
        >
          <ImagePlaceholder :tone="service.tone" />
          <div class="absolute inset-0 bg-gradient-to-b from-neutral-800/40 to-transparent" />
          <h3
            class="absolute inset-x-0 top-0 px-6 pt-8 text-center font-serif text-xl font-light text-neutral-50"
          >
            {{ service.title }}
          </h3>
        </article>
      </div>
    </div>
  </section>
</template>
