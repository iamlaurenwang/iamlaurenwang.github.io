<script lang="ts" setup>
import ImagePlaceholder from './ImagePlaceholder.vue'
</script>

<template>
  <section class="bg-neutral-100">
    <div class="mx-auto grid max-w-6xl items-stretch gap-10 px-6 py-20 md:grid-cols-2 md:gap-16">
      <!-- Text -->
      <div class="flex flex-col justify-center">
        <h2 class="font-serif text-3xl leading-snug font-normal text-accent-500 md:text-4xl">
          I didn't take the straight path to get here and I think that's what makes my work
          better.
        </h2>
        <div class="mt-8 space-y-4 font-sans text-sm leading-relaxed text-neutral-600">
          <p>
            I started out drawn to language and teaching, then found my way into software — and
            that mix is exactly what makes my work better. Today I focus on the frontend,
            building interfaces with Vue.js, TypeScript, and Tailwind CSS, with hands-on
            experience across component libraries like Quasar, Element Plus, Nuxt UI, and
            Bootstrap.
          </p>
          <p>
            I'm comfortable across the full stack too — working with C#, Java, SQL, Entity
            Framework, Docker, and CI/CD pipelines. As a native Mandarin speaker fluent in
            English (TOEIC 935/990), I also teach writing, composition, and exam preparation for
            GEPT and TOEIC — a craft that keeps me curious, patient, and clear.
          </p>
        </div>
      </div>

      <!-- Image -->
      <div class="min-h-72 md:min-h-[28rem]">
        <ImagePlaceholder tone="neutral-300" label="Portrait — Lauren" />
      </div>
    </div>
  </section>
</template>
