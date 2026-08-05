<script lang="ts" setup>
import { Flower2 } from '@lucide/vue'
import ImagePlaceholder from './ImagePlaceholder.vue'
</script>

<template>
  <section class="relative flex min-h-[90vh] items-end overflow-hidden">
    <!-- Background image (color-block placeholder) -->
    <div class="absolute inset-0">
      <ImagePlaceholder tone="neutral-300" label="Hero portrait — Lauren" />
    </div>
    <!-- Warm legibility overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-neutral-800/50 via-neutral-800/10 to-transparent"
    />

    <!-- Content -->
    <div class="relative mx-auto w-full max-w-5xl px-6 pb-24 text-center">
      <Flower2 :size="30" class="mx-auto mb-6 text-neutral-50/90" />
      <h1
        class="font-serif text-4xl font-light tracking-wide text-neutral-50 sm:text-5xl md:text-6xl"
      >
        HELLO, I'M LAUREN WANG.
      </h1>
      <p
        class="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-neutral-100/90 sm:text-base"
      >
        A frontend-focused software engineer crafting clean, thoughtful web interfaces
        with Vue and TypeScript — and helping learners find their voice in English.
      </p>
      <button
        type="button"
        class="mt-8 border border-neutral-50/70 px-8 py-3 font-sans text-xs tracking-[0.2em] text-neutral-50 uppercase transition-colors duration-200 hover:bg-neutral-50 hover:text-neutral-800"
      >
        Let's Connect
      </button>
    </div>
  </section>
</template>
