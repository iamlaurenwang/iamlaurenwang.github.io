<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import PillTag from "@/components/PillTag.vue";
import type { FreeCourse } from "@/types/course";

defineProps<{
  course: FreeCourse;
}>();

const expanded = ref(false);
</script>

<template>
  <div
    class="rounded-xl border border-neutral-200 bg-white shadow-card dark:border-neutral-800 dark:bg-neutral-900"
  >
    <button
      type="button"
      class="flex w-full items-start justify-between gap-4 p-5 text-left"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="font-serif text-xl text-neutral-800 dark:text-neutral-100">
            {{ course.title }}
          </h3>
          <PillTag :variant="course.level === 'intermediate' ? 'accent' : 'neutral'" size="xs">
            {{ course.level === "intermediate" ? "中級" : "初級" }}
          </PillTag>
        </div>
        <p class="mt-2 font-sans text-sm text-neutral-500 dark:text-neutral-400">
          {{ course.day }} {{ course.time }}
        </p>
        <p class="mt-1 font-sans text-xs text-neutral-400 dark:text-neutral-500">
          {{ course.dates.join("、") }}｜共 {{ course.sessions.length }} 堂
        </p>
      </div>
      <ChevronDown
        class="mt-1 size-5 shrink-0 text-neutral-400 transition-transform"
        :class="expanded ? 'rotate-180' : ''"
      />
    </button>

    <div v-if="expanded" class="border-t border-neutral-200 px-5 py-4 dark:border-neutral-800">
      <ol class="flex flex-col gap-3">
        <li
          v-for="session in course.sessions"
          :key="session.no"
          class="flex gap-3 font-sans text-sm"
        >
          <span
            class="shrink-0 font-medium text-accent-600 dark:text-accent-400"
          >
            Class {{ session.no }}
          </span>
          <span
            :class="
              session.title === 'TODO'
                ? 'text-neutral-400 italic dark:text-neutral-500'
                : 'text-neutral-700 dark:text-neutral-300'
            "
          >
            {{ session.title === "TODO" ? "內容準備中" : session.title }}
          </span>
        </li>
      </ol>
    </div>
  </div>
</template>
