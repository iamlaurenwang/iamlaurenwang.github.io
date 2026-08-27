<script setup lang="ts">
import { computed, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import PillTag from "@/components/PillTag.vue";
import { freeCourses as staticFreeCourses, FORM_URL, LINE_URL } from "@/data/courses";
import { COURSE_LEVELS, type CourseLevelVariant, type FreeCourse } from "@/types/course";

// 預設用打包在程式碼裡的靜態課表；demo 頁可傳入來自 Google Sheet 的動態資料。
const props = withDefaults(defineProps<{ courses?: FreeCourse[] }>(), {
  courses: () => staticFreeCourses,
});

const DAY_ORDER = ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];

// 課表軸依實際資料推導，靜態資料會得到與原本相同的 週二~週五 / 17:00、19:00。
const days = computed(() => {
  const present = new Set(props.courses.map((c) => c.day));
  return DAY_ORDER.filter((d) => present.has(d));
});
const rows = computed(() => {
  const set = new Set(props.courses.map((c) => c.time.split("-")[0] ?? c.time));
  return [...set].sort();
});

function courseAt(day: string, start: string): FreeCourse | undefined {
  return props.courses.find((c) => c.day === day && c.time.startsWith(start));
}

const selectedId = ref("");
// 資料變動（含 Sheet 非同步載入完成）時，確保選中的仍是有效課程。
watch(
  () => props.courses,
  (list) => {
    if (!list.some((c) => c.id === selectedId.value)) {
      selectedId.value = list[0]?.id ?? "";
    }
  },
  { immediate: true },
);
const selectedCourse = computed(() => props.courses.find((c) => c.id === selectedId.value));

function levelLabel(course: FreeCourse): string {
  return COURSE_LEVELS[course.level].label;
}

function levelVariant(course: FreeCourse): CourseLevelVariant {
  return COURSE_LEVELS[course.level].variant;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <p class="max-w-2xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      9 月起開課，線上小班。點課表中的任一堂，看該課程一整個月的課綱。
    </p>

    <!-- 桌機：週課表 -->
    <div
      class="hidden overflow-hidden rounded-xl border border-neutral-300 sm:grid dark:border-neutral-700"
      style="grid-template-columns: 4rem repeat(4, 1fr)"
    >
      <!-- 首列：星期標題 -->
      <div class="border-b border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800" />
      <div
        v-for="day in days"
        :key="`head-${day}`"
        class="text-base border-b border-l border-neutral-300 bg-neutral-100 px-3 py-2.5 text-center font-sans  font-semibold uppercase tracking-widest text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
      >
        {{ day }}
      </div>

      <!-- 時段列 -->
      <template v-for="(start, rowIndex) in rows" :key="start">
        <div
          class="text-sm flex items-center justify-center border-neutral-300 bg-neutral-100/60 font-mono  font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-300"
          :class="rowIndex < rows.length - 1 ? 'border-b' : ''"
        >
          {{ start }}
        </div>
        <template v-for="day in days" :key="`${day}-${start}`">
          <button
            v-if="courseAt(day, start)"
            type="button"
            class="flex flex-col items-start gap-1.5 border-l border-neutral-300 px-3 py-4 text-left transition-colors dark:border-neutral-700"
            :class="[
              rowIndex < rows.length - 1 ? 'border-b' : '',
              selectedId === courseAt(day, start)!.id
                ? 'relative z-10 bg-white ring-2 ring-inset ring-accent-500 dark:bg-neutral-900 dark:ring-accent-400'
                : 'hover:bg-neutral-50 dark:hover:bg-neutral-900',
            ]"
            @click="selectedId = courseAt(day, start)!.id"
          >
            <span class="font-serif text-sm leading-snug text-neutral-900 dark:text-neutral-100">
              {{ courseAt(day, start)!.title }}
            </span>
            <PillTag :variant="levelVariant(courseAt(day, start)!)" size="xs">
              {{ levelLabel(courseAt(day, start)!) }}
            </PillTag>
          </button>
          <div
            v-else
            class="border-l border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/40"
            :class="rowIndex < rows.length - 1 ? 'border-b' : ''"
          />
        </template>
      </template>
    </div>

    <!-- 手機：直向清單 -->
    <div class="flex flex-col gap-3 sm:hidden">
      <button
        v-for="course in courses"
        :key="course.id"
        type="button"
        class="flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors"
        :class="
          selectedId === course.id
            ? 'border-accent-500 ring-1 ring-accent-500 dark:border-accent-400 dark:ring-accent-400'
            : 'border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900'
        "
        @click="selectedId = course.id"
      >
        <span class="min-w-0">
          <span class="block font-serif text-base text-neutral-900 dark:text-neutral-100">
            {{ course.title }}
          </span>
          <span class="mt-0.5 block font-mono text-xs text-neutral-600 dark:text-neutral-400">
            {{ course.day }} {{ course.time }}
          </span>
        </span>
        <PillTag :variant="levelVariant(course)" size="xs">{{ levelLabel(course) }}</PillTag>
      </button>
    </div>

    <!-- 詳情面板：所選課程的四週課綱 -->
    <Transition
      mode="out-in"
      enter-active-class="transition duration-200 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0 translate-y-1 motion-reduce:translate-y-0"
      leave-active-class="transition duration-150 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedCourse"
        :key="selectedCourse.id"
        class="rounded-xl border border-neutral-200 bg-white p-6 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="font-serif text-2xl text-neutral-800 dark:text-neutral-100">
            {{ selectedCourse.title }}
          </h3>
          <PillTag :variant="levelVariant(selectedCourse)" size="xs">
            {{ levelLabel(selectedCourse) }}
          </PillTag>
        </div>
        <p class="mt-2 font-mono text-xs text-neutral-400 dark:text-neutral-500">
          {{ selectedCourse.day }} {{ selectedCourse.time }}｜{{ selectedCourse.dates.join(" · ") }}
        </p>

        <ol class="mt-6 flex flex-col gap-4">
          <li
            v-for="session in selectedCourse.sessions"
            :key="session.no"
            class="flex items-baseline gap-4 font-sans text-sm"
          >
            <span class="shrink-0 font-mono text-sm font-medium text-accent-600 dark:text-accent-400">
              {{ pad(session.no) }}
            </span>
            <span class="h-px w-6 shrink-0 self-center bg-neutral-200 dark:bg-neutral-700" />
            <span
              :class="
                session.title === 'TODO'
                  ? 'italic text-neutral-400 dark:text-neutral-500'
                  : 'text-neutral-700 dark:text-neutral-300'
              "
            >
              {{ session.title === "TODO" ? "內容準備中" : session.title }}
            </span>
          </li>
        </ol>
      </div>
    </Transition>

    <!-- CTA -->
    <div
      class="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        填寫報名表單後，即可拿到上課連結，系統也會自動把課程加入你的 Google
        Calendar。有任何問題也歡迎透過官方 Line 直接聯絡。
      </p>
      <div class="mt-4 flex flex-wrap gap-3">
        <BaseButton variant="primary" :href="FORM_URL" target="_blank" rel="noopener noreferrer">
          填表單報名
        </BaseButton>
        <BaseButton
          v-if="LINE_URL"
          variant="secondary"
          :href="LINE_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          加 Line 詢問
        </BaseButton>
      </div>
    </div>
  </div>
</template>
