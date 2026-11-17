<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'

// 三賣點（速度 / 交接 / 英文），依 2026-11-14 諮詢報告定位。
const sellingPoints = [
  {
    title: 'Zero to working, fast',
    body: 'With no computer-vision background, I shipped a surgical-instrument recognition MVP at 84.4% accuracy in one week — and led a telemedicine platform through its full product lifecycle to launch in Japan.',
  },
  {
    title: 'Built to be handed over',
    body: 'I design myself out of the process: a localization workflow that no longer needs an engineer, onboarding docs that save managers half a day per hire, and a component library 600+ engineers rely on.',
  },
  {
    title: 'English as a working language',
    body: 'I have collaborated in English across borders in a Taiwan–Singapore Agile team, and years of teaching taught me to explain complex things clearly — to headquarters or overseas clients, without a translator in between.',
  },
]

const facts = [
  'Full-Stack Engineer',
  'Zero-to-one delivery',
  'Documentation & handover',
  'TOEIC 935/990',
  'Native Mandarin · Fluent English',
]
</script>

<template>
  <section id="about" class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="01" title="About" />

      <blockquote
        class="mt-10 font-serif text-2xl font-light leading-snug text-neutral-700 md:max-w-3xl md:text-3xl dark:text-neutral-200"
      >
        "I ship things no one on the team has built before — and when I'm done, no one needs me to
        keep them running."
      </blockquote>

      <div class="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
        <div v-for="point in sellingPoints" :key="point.title">
          <h3 class="font-serif text-lg text-neutral-800 dark:text-neutral-100">
            {{ point.title }}
          </h3>
          <p class="mt-3 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {{ point.body }}
          </p>
        </div>
      </div>

      <div class="mt-10 flex flex-wrap gap-2.5">
        <span
          v-for="fact in facts"
          :key="fact"
          class="border border-neutral-300 px-3 py-1.5 font-sans text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
          >{{ fact }}</span
        >
      </div>
    </div>
  </section>
</template>
