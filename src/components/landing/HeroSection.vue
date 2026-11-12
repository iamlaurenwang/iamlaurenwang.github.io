<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { RouteName } from '@/types/routes'
import mePhoto from '@/assets/images/me.jpg'

const sectionLinks = [
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Projects', hash: '#projects' },
]
</script>

<template>
  <section class="bg-white dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
        <!-- Photo -->
        <div class="w-36 shrink-0 md:w-52">
          <div class="aspect-[3/4] overflow-hidden rounded-xl">
            <img :src="mePhoto" alt="Lauren Wang" class="h-full w-full object-cover object-top" />
          </div>
        </div>

        <!-- Text -->
        <div class="flex min-w-0 flex-1 flex-col">
          <h1
            class="font-serif text-5xl font-light tracking-tight text-neutral-900 md:text-6xl dark:text-neutral-100"
          >
            Lauren<br />Wang
          </h1>

          <p
            class="mt-6 max-w-xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
          >
            Software engineer who cares about user experience, performance, and AI-assisted workflows — with a habit of automating the inefficient parts.
          </p>

          <div class="mt-6 border-t border-neutral-200 dark:border-neutral-800" />

          <!-- Jump to section -->
          <nav class="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Jump to section">
            <RouterLink
              v-for="link in sectionLinks"
              :key="link.hash"
              :to="{ name: RouteName.Landing, hash: link.hash }"
              class="font-sans text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors duration-200 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:outline-neutral-100"
            >
              {{ link.label }}
            </RouterLink>
          </nav>

          <div class="mt-10">
            <RouterLink
              :to="{ name: RouteName.Contact }"
              class="inline-block border border-neutral-900 px-7 py-3 font-sans text-xs uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:border-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900 dark:focus-visible:outline-neutral-100"
            >
              Get in touch
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
