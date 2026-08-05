<script lang="ts" setup>
import ImagePlaceholder from './ImagePlaceholder.vue'
import type { Testimonial } from '@/types/landing'

// NOTE: Placeholder testimonials — replace with real quotes before publishing.
const testimonials: Testimonial[] = [
  {
    quote:
      'Lauren turns fuzzy requirements into polished, reliable interfaces. She’s the engineer you want owning the frontend.',
    name: 'Sample Name',
    role: 'Product Manager',
    tone: 'neutral-300',
  },
  {
    quote:
      'Her feedback on my writing was clear and encouraging. I reached a TOEIC score I didn’t think was possible.',
    name: 'Sample Name',
    role: 'English Student',
    tone: 'neutral-400',
  },
]
</script>

<template>
  <section class="bg-neutral-100">
    <div class="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2">
      <figure
        v-for="t in testimonials"
        :key="t.name"
        class="relative aspect-[4/3] overflow-hidden"
      >
        <ImagePlaceholder :tone="t.tone" />
        <div class="absolute inset-0 bg-neutral-800/45" />
        <figcaption
          class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        >
          <blockquote class="font-sans text-sm leading-relaxed text-neutral-50/95">
            {{ t.quote }}
          </blockquote>
          <p class="mt-6 font-serif text-lg font-light text-neutral-50">— {{ t.name }}</p>
          <p class="mt-1 font-sans text-[0.65rem] tracking-[0.2em] text-neutral-100/80 uppercase">
            {{ t.role }}
          </p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
