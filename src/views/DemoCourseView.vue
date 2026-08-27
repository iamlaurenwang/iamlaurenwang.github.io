<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { ArrowLeft, RotateCcw } from "@lucide/vue";
import PageHeader from "@/components/PageHeader.vue";
import BaseButton from "@/components/BaseButton.vue";
import FreeCourseTerms from "@/components/course/FreeCourseTerms.vue";
import { RouteName } from "@/types/routes";
import { COURSE_SHEET_CSV_URL } from "@/data/courseSheet";
import { useCourseSheet } from "@/composables/useCourseSheet";

const { courses, loading, error, load } = useCourseSheet(COURSE_SHEET_CSV_URL);

onMounted(load);
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-16">
    <RouterLink
      :to="{ name: RouteName.Course }"
      class="mb-8 inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-400"
    >
      <ArrowLeft class="size-4" />
      回正式課程頁
    </RouterLink>

    <PageHeader
      title="課程"
      description="Google Sheet 資料測試頁：課表內容改由試算表提供，編輯後按「重新載入」即可看到變化。"
    />

    <!-- 控制列：狀態 + 重新載入 -->
    <div
      class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div class="font-sans text-sm">
        <span v-if="loading" class="text-neutral-500 dark:text-neutral-400">載入中…</span>
        <span v-else-if="error" class="text-error">{{ error }}</span>
        <span v-else class="text-neutral-500 dark:text-neutral-400">
          已載入 {{ courses.length }} 門課程
        </span>
      </div>
      <BaseButton variant="secondary" :disabled="loading" @click="load">
        <RotateCcw class="size-4" />
        重新載入
      </BaseButton>
    </div>

    <!-- 尚未設定連結時的說明 -->
    <div
      v-if="!COURSE_SHEET_CSV_URL"
      class="mt-6 rounded-xl border border-neutral-200 bg-white p-6 font-sans text-sm leading-relaxed text-neutral-600 shadow-card dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
    >
      <p class="font-medium text-neutral-800 dark:text-neutral-100">設定步驟</p>
      <ol class="mt-3 flex list-decimal flex-col gap-2 pl-5">
        <li>
          在 Google Sheet 建立欄位（第一列標題）：<code
            class="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800"
            >course_id, title, level, day, time, session_no, date, session_title</code
          >，一列填一堂課。
        </li>
        <li>檔案 → 共用 → 發布到網路 → 選該工作表 → 格式 CSV → 發布，複製連結。</li>
        <li>
          把連結貼到
          <code class="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800"
            >src/data/courseSheet.ts</code
          >
          的 <code class="font-mono text-xs">COURSE_SHEET_CSV_URL</code>。
        </li>
        <li>之後在 Sheet 改資料，回這頁按「重新載入」即可驗證。</li>
      </ol>
    </div>

    <!-- 課表（吃 Sheet 資料） -->
    <div v-else class="mt-10">
      <FreeCourseTerms v-if="courses.length" :courses="courses" />
      <p
        v-else-if="!loading && !error"
        class="font-sans text-sm text-neutral-500 dark:text-neutral-400"
      >
        沒有課程資料。
      </p>
    </div>
  </section>
</template>
