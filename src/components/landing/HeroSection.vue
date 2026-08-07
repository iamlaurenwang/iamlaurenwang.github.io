<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { RouteName } from '@/types/routes'
import ImagePlaceholder from './ImagePlaceholder.vue'
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">

        <!-- Photo -->
        <div class="w-36 shrink-0 md:w-52">
          <div class="aspect-[3/4] overflow-hidden">
            <!--
              Replace ImagePlaceholder with your photo when ready:
              <img src="..." alt="Lauren Wang" class="h-full w-full object-cover object-top" />
            -->
            <ImagePlaceholder tone="neutral-200" label="Lauren Wang" />
          </div>
        </div>

        <!-- Text -->
        <div class="flex min-w-0 flex-1 flex-col">
          <h1 class="font-serif text-5xl font-light tracking-tight text-neutral-900 md:text-6xl">
            Lauren<br />Wang
          </h1>

          <div class="mt-6 border-t border-neutral-200" />

          <div class="mt-6 grid gap-0 md:grid-cols-2">
            <!-- Engineering -->
            <div class="pb-8 md:pb-0 md:pr-10">
              <p class="font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
                Frontend Engineer
              </p>
              <ul class="mt-4 space-y-2 font-sans text-sm text-neutral-600">
                <li>Vue.js · TypeScript · Tailwind CSS</li>
                <li>Quasar · Element Plus · Nuxt UI</li>
                <li>C# · Java · SQL · Docker · CI/CD</li>
                <li>Cross-functional team delivery</li>
              </ul>
            </div>

            <!-- Teaching -->
            <div
              class="border-t border-neutral-200 pt-8 md:border-t-0 md:border-l md:border-neutral-200 md:pl-10 md:pt-0"
            >
              <p class="font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
                English Tutor
              </p>
              <ul class="mt-4 space-y-2 font-sans text-sm text-neutral-600">
                <li>GEPT · TOEIC exam preparation</li>
                <li>Writing &amp; composition coaching</li>
                <li>TOEIC 935/990 · native Mandarin</li>
                <li>7+ years, all ages and levels</li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <RouterLink
              :to="{ name: RouteName.Contact }"
              class="inline-block border border-neutral-900 px-7 py-3 font-sans text-xs uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              Get in touch
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
