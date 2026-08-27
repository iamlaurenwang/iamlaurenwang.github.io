<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import FreeCourseTimetable from "@/components/course/FreeCourseTimetable.vue";
import { freeCourses as staticFreeCourses } from "@/data/courses";
import type { FreeCourse } from "@/types/course";

const props = withDefaults(defineProps<{ courses?: FreeCourse[] }>(), {
  courses: () => staticFreeCourses,
});

// distinct term（由小到大），空字串（無 term）也算一組。
const terms = computed(() => {
  const set = new Set(props.courses.map((c) => c.term ?? ""));
  return [...set].sort();
});

// 只有單一組（含全部無 term）時，不顯示月份選擇器。
const hasMultipleTerms = computed(() => terms.value.length > 1);

const multiYear = computed(() => {
  const years = new Set(terms.value.map((t) => t.split("-")[0]));
  return years.size > 1;
});

function yearOf(term: string): string {
  return term.split("-")[0] ?? "";
}

function monthLabel(term: string): string {
  const month = term.split("-")[1];
  return month ? `${Number(month)} 月` : term || "課程";
}

function fullLabel(term: string): string {
  const [year, month] = term.split("-");
  return year && month ? `${year} 年 ${Number(month)} 月` : term;
}

// 跨年時，在每年的第一個月份 tab 前插入年份分隔標。
function showYearMarker(index: number): boolean {
  if (!multiYear.value) return false;
  const list = terms.value;
  return index === 0 || yearOf(list[index]!) !== yearOf(list[index - 1]!);
}

function currentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// 預設落在「當月或最近即將到來的月」，皆為過去則取最後一個。
function pickDefaultTerm(list: string[]): string {
  const ym = currentYearMonth();
  return list.find((t) => t >= ym) ?? list[list.length - 1] ?? "";
}

const selectedTerm = ref("");
watch(
  terms,
  (list) => {
    if (!list.includes(selectedTerm.value)) {
      selectedTerm.value = pickDefaultTerm(list);
    }
  },
  { immediate: true },
);

const selectedCourses = computed(() =>
  props.courses.filter((c) => (c.term ?? "") === selectedTerm.value),
);

// 月份多時，讓選中的 tab 自動捲進視野（水平置中、不動垂直捲軸）。
const stripRef = ref<HTMLElement | null>(null);
watch(
  selectedTerm,
  async () => {
    await nextTick();
    stripRef.value
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ inline: "center", block: "nearest" });
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col gap-8">
    <div
      v-if="hasMultipleTerms"
      ref="stripRef"
      role="tablist"
      class="flex items-stretch gap-1 overflow-x-auto border-b border-neutral-200 dark:border-neutral-800"
    >
      <template v-for="(term, index) in terms" :key="term">
        <span
          v-if="showYearMarker(index)"
          class="flex shrink-0 items-center whitespace-nowrap px-2 font-sans text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500"
        >
          {{ yearOf(term) }}
        </span>
        <button
          type="button"
          role="tab"
          :aria-selected="selectedTerm === term"
          :aria-label="fullLabel(term)"
          :data-active="selectedTerm === term"
          class="shrink-0 whitespace-nowrap border-b-2 px-3 py-3 font-sans text-sm transition-colors"
          :class="
            selectedTerm === term
              ? 'border-accent-500 font-medium text-neutral-800 dark:text-neutral-100'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100'
          "
          @click="selectedTerm = term"
        >
          {{ monthLabel(term) }}
        </button>
      </template>
    </div>

    <FreeCourseTimetable :key="selectedTerm" :courses="selectedCourses" />
  </div>
</template>
