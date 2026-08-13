<script setup lang="ts">
import type { WorkExperience } from "@/types/resume";
import { usePeriod } from "@/composables/usePeriod";
import PillTag from "@/components/PillTag.vue";

defineProps<{
  experience: WorkExperience;
  isLast: boolean;
}>();

const TYPE_LABEL: Record<WorkExperience["type"], string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
};

const { formatPeriod } = usePeriod();
</script>

<template>
  <div class="flex gap-5">
    <!-- Timeline column -->
    <div class="flex shrink-0 flex-col items-center pt-1.5">
      <div class="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-400 ring-2 ring-accent-100 dark:ring-accent-500/20" />
      <div v-if="!isLast" class="mt-2 w-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1 pb-10">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
          <h3 class="font-serif text-xl text-neutral-800 dark:text-neutral-100">{{ experience.role }}</h3>
          <p class="mt-0.5 font-sans text-sm text-neutral-500 dark:text-neutral-400">
            <span v-if="experience.companyZh">{{ experience.companyZh }} | </span
            >{{ experience.company }}
            <span v-if="experience.location"> · {{ experience.location }}</span>
          </p>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-1.5">
          <span class="font-sans text-xs text-neutral-400 dark:text-neutral-500">{{
            formatPeriod(experience.period)
          }}</span>
          <PillTag variant="accent" size="xs">{{ TYPE_LABEL[experience.type] }}</PillTag>
          
        </div>
      </div>

      <p
        v-if="experience.description"
        class="mt-3 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
      >
        {{ experience.description }}
      </p>

      <ul v-if="experience.highlights.length" class="mt-3 space-y-1.5">
        <li
          v-for="h in experience.highlights"
          :key="h"
          class="flex gap-2.5 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          {{ h }}
        </li>
      </ul>

      <div v-if="experience.skills.length" class="mt-4 flex flex-wrap gap-2">
        <PillTag v-for="skill in experience.skills" :key="skill" variant="neutral">
          {{ skill }}
        </PillTag>
      </div>
    </div>
  </div>
</template>
