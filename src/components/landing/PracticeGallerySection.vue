<script lang="ts" setup>
import { Flower2 } from '@lucide/vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
import type { GalleryItem } from '@/types/landing'

const items: GalleryItem[] = [
  { tone: 'neutral-200', label: 'Vue.js' },
  { tone: 'accent-100', label: 'TypeScript' },
  { tone: 'neutral-300', label: 'Tailwind CSS', spanClass: 'row-span-2' },
  { tone: 'neutral-200', label: 'C# / .NET' },
  { tone: 'accent-100', label: 'Docker' },
  { tone: 'neutral-300', label: 'SQL' },
]
</script>

<template>
  <section class="bg-accent-300">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr] md:items-center">
      <!-- Heading -->
      <div class="flex flex-col gap-8">
        <h2 class="font-serif text-3xl leading-snug font-light text-neutral-50 md:text-4xl">
          A glimpse into my toolkit
        </h2>
        <Flower2 :size="30" class="text-neutral-50/90" />
      </div>

      <!-- Collage -->
      <div class="grid auto-rows-[7rem] grid-cols-3 gap-3 md:auto-rows-[8rem]">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="overflow-hidden"
          :class="item.spanClass"
        >
          <ImagePlaceholder :tone="item.tone" :label="item.label" />
        </div>
      </div>
    </div>
  </section>
</template>
