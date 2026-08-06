<script setup lang="ts">
import { ExternalLink } from '@lucide/vue'
import type { Project } from '@/types/resume'
import { usePeriod } from '@/composables/usePeriod'
import PillTag from '@/components/PillTag.vue'

defineProps<{ project: Project }>()

const { formatPeriod } = usePeriod()
</script>

<template>
  <div class="flex flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
    <!-- Header -->
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <h3 class="font-serif text-xl text-neutral-800">{{ project.name }}</h3>
        <p class="mt-0.5 font-sans text-xs text-neutral-400">
          {{ project.company }} · {{ formatPeriod(project.period) }}
        </p>
      </div>
      <PillTag variant="muted" size="xs" class="shrink-0">{{ project.role }}</PillTag>
    </div>

    <!-- Description -->
    <p class="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
      {{ project.description }}
    </p>

    <!-- Highlights -->
    <ul v-if="project.highlights.length" class="mt-3 flex-1 space-y-1.5">
      <li
        v-for="h in project.highlights"
        :key="h"
        class="flex gap-2.5 font-sans text-sm leading-relaxed text-neutral-600"
      >
        <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
        {{ h }}
      </li>
    </ul>

    <!-- Tech tags -->
    <div class="mt-4 flex flex-wrap gap-2">
      <PillTag v-for="t in project.tech" :key="t" variant="accent">{{ t }}</PillTag>
    </div>

    <!-- Links -->
    <div
      v-if="project.links?.github || project.links?.live"
      class="mt-4 flex gap-4 border-t border-neutral-200 pt-4"
    >
      <a
        v-if="project.links?.github"
        :href="project.links.github"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 font-sans text-xs text-neutral-400 transition-colors hover:text-neutral-700"
      >
        <ExternalLink :size="12" />
        GitHub
      </a>
      <a
        v-if="project.links?.live"
        :href="project.links.live"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 font-sans text-xs text-neutral-400 transition-colors hover:text-neutral-700"
      >
        <ExternalLink :size="12" />
        Live
      </a>
    </div>
  </div>
</template>
