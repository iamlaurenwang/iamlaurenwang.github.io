<script setup lang="ts">
import { Check } from '@lucide/vue'
import BaseButton from '@/components/BaseButton.vue'
import FreeCourseTerms from '@/components/course/FreeCourseTerms.vue'
import { paidExtras, LINE_URL } from '@/data/courses'
import type { FreeCourse } from '@/types/course'

// 課表資料由正式頁的團課 Google Sheet 提供；loading 時顯示骨架，空/失敗顯示「課表準備中」。
defineProps<{ courses: FreeCourse[]; loading: boolean }>()

const TIMETABLE_INTRO =
  '5 人滿班小班制，線上授課。點課表中的任一堂，看該課程一整個月的課綱與名額狀態。'
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- 行銷區：課程特色 + 加 Line 了解方案（永遠顯示，位於課表上方） -->
    <p class="max-w-2xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      付費課與公開課的主題、時段相同，但採 5 人滿班小班制，並提供額外的個人化服務與進階練習。
    </p>

    <ul class="flex flex-col gap-3">
      <li
        v-for="extra in paidExtras"
        :key="extra"
        class="flex gap-3 font-sans text-sm text-neutral-700 dark:text-neutral-300"
      >
        <Check class="mt-0.5 size-4 shrink-0 text-accent-600 dark:text-accent-400" />
        <span>{{ extra }}</span>
      </li>
    </ul>

    <div
      class="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        想了解課程方案與費用，歡迎透過官方 Line 聯絡，我會依你的程度與需求提供建議。
      </p>
      <div class="mt-4">
        <BaseButton
          v-if="LINE_URL"
          variant="primary"
          :href="LINE_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          加 Line 了解方案
        </BaseButton>
        <p v-else class="font-sans text-xs text-neutral-400 dark:text-neutral-500">
          Line 聯絡方式即將提供。
        </p>
      </div>
    </div>

    <!-- 課表區：吃團課 Google Sheet 資料，沿用公開課完整課表（隱藏公開課專屬報名 CTA） -->
    <div>
      <h3 class="font-serif text-xl text-neutral-800 dark:text-neutral-100">開課時段</h3>
      <div class="mt-4">
        <!-- 載入中骨架 -->
        <div v-if="loading" class="flex flex-col gap-6" aria-hidden="true">
          <div class="h-4 w-64 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div class="h-64 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <FreeCourseTerms
          v-else-if="courses.length"
          :courses="courses"
          :intro="TIMETABLE_INTRO"
          :show-cta="false"
        />
        <p v-else class="font-sans text-sm text-neutral-500 dark:text-neutral-400">
          課表準備中，歡迎加 Line 洽詢。
        </p>
      </div>
    </div>
  </div>
</template>
