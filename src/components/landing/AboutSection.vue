<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
</script>

<template>
  <section id="about" class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="01" title="About" />

      <blockquote
        class="mt-10 font-serif text-2xl font-light leading-snug text-neutral-700 md:text-3xl md:max-w-3xl dark:text-neutral-200"
      >
        "I didn't take the straight path to get here —
        <br class="hidden md:block" />
        and that's exactly what makes my work better."
      </blockquote>

      <div class="mt-12 grid gap-6 md:grid-cols-2 md:gap-16">
        <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          I got into software because I care about user experience and efficiency. When making
          technical decisions, I start by asking who will use it and whose time it saves — and I
          apply the same thinking to AI and automation: reaching for them when they genuinely remove
          friction, not for their own sake.
        </p>
        <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          A native Mandarin speaker fluent in English (TOEIC 935/990), I bring the same care for
          clarity to both language and code — which makes me effective in cross-functional and
          international environments.
        </p>
      </div>

      <div class="mt-10 flex flex-wrap gap-2.5">
        <span
          v-for="fact in [
            'Software Engineer',
            'Full-stack capable',
            'TOEIC 935/990',
            'Native Mandarin · Fluent English',
            'NKNU English Dept.',
          ]"
          :key="fact"
          class="border border-neutral-300 px-3 py-1.5 font-sans text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
          >{{ fact }}</span
        >
      </div>
    </div>
  </section>
</template>
