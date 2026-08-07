<template>
  <section class="bg-neutral-100">
    <div class="mx-auto max-w-5xl px-6 py-20">
      <blockquote
        class="font-serif text-2xl font-light leading-snug text-neutral-700 md:text-3xl md:max-w-3xl"
      >
        "I didn't take the straight path to get here —
        <br class="hidden md:block" />
        and that's exactly what makes my work better."
      </blockquote>

      <div class="mt-12 grid gap-6 md:grid-cols-2 md:gap-16">
        <p class="font-sans text-sm leading-relaxed text-neutral-600">
          I started out drawn to language and teaching, then found my way into software. Today I
          focus on the frontend, building interfaces with Vue.js, TypeScript, and Tailwind CSS —
          with hands-on experience across Quasar, Element Plus, Nuxt UI, and Bootstrap.
        </p>
        <p class="font-sans text-sm leading-relaxed text-neutral-600">
          As a native Mandarin speaker fluent in English (TOEIC 935/990), I also teach writing,
          composition, and exam preparation for GEPT and TOEIC. A craft that keeps me curious,
          patient, and precise.
        </p>
      </div>

      <div class="mt-10 flex flex-wrap gap-2.5">
        <span
          v-for="fact in [
            'TOEIC 935/990',
            '7+ yrs teaching',
            'Full-stack capable',
            'Native Mandarin · Fluent English',
            'NKNU English Dept.',
          ]"
          :key="fact"
          class="border border-neutral-300 px-3 py-1.5 font-sans text-xs text-neutral-500"
          >{{ fact }}</span
        >
      </div>
    </div>
  </section>
</template>
