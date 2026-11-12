<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ExternalLink, ArrowRight } from '@lucide/vue'
import type { PortfolioProject } from '@/types/portfolio'
import PillTag from '@/components/PillTag.vue'

defineProps<{ project: PortfolioProject }>()
</script>

<template>
  <article
    class="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-card transition-shadow duration-200 hover:shadow-card-hover dark:border-neutral-800 dark:bg-neutral-900"
  >
    <!-- Thumbnail -->
    <div
      class="aspect-video overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800"
    >
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col p-6">
      <p class="font-sans text-xs tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
        {{ project.tag }}
      </p>
      <h3 class="mt-1 font-serif text-xl text-neutral-800 dark:text-neutral-100">
        {{ project.title }}
      </h3>
      <p class="mt-2 flex-1 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {{ project.summary }}
      </p>

      <!-- Tech tags -->
      <div class="mt-4 flex flex-wrap gap-2">
        <PillTag v-for="t in project.tech" :key="t" variant="accent">{{ t }}</PillTag>
      </div>

      <!-- Links -->
      <div
        v-if="project.links?.github || project.links?.live || project.links?.internal"
        class="mt-4 flex gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-800"
      >
        <a
          v-if="project.links?.github"
          :href="project.links.github"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 font-sans text-xs text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
        >
          <ExternalLink :size="12" />
          GitHub
        </a>
        <a
          v-if="project.links?.live"
          :href="project.links.live"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 font-sans text-xs text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
        >
          <ExternalLink :size="12" />
          Live
        </a>
        <RouterLink
          v-if="project.links?.internal"
          :to="{ name: project.links.internal }"
          class="flex items-center gap-1.5 font-sans text-xs text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
        >
          <ArrowRight :size="12" />
          開啟
        </RouterLink>
      </div>
    </div>
  </article>
</template>
