<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import FreeCourseCard from "@/components/course/FreeCourseCard.vue";
import { freeCourses, FORM_URL, LINE_URL } from "@/data/courses";
</script>

<template>
  <div class="flex flex-col gap-8">
    <p class="max-w-2xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      9 月起開課，共四種類型、每種一個月。點開課程可查看每一堂的大綱。
    </p>

    <div class="grid gap-6 sm:grid-cols-2">
      <FreeCourseCard v-for="course in freeCourses" :key="course.id" :course="course" />
    </div>

    <div
      class="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        填寫報名表單後，即可拿到上課連結，系統也會自動把課程加入你的 Google
        Calendar。有任何問題也歡迎透過官方 Line 直接聯絡。
      </p>
      <div class="mt-4 flex flex-wrap gap-3">
        <BaseButton
          variant="primary"
          :href="FORM_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
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
