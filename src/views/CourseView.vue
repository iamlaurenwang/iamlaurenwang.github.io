<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import { RouteName } from '@/types/routes'
import FreeCourseTerms from '@/components/course/FreeCourseTerms.vue'
import PaidCoursePreview from '@/components/course/PaidCoursePreview.vue'
import { freeCourseCampaignActive, freeCourses as staticFreeCourses } from '@/data/courses'
import { COURSE_SHEET_CSV_URL } from '@/data/courseSheet'
import { useCourseSheet } from '@/composables/useCourseSheet'

type Tab = 'free' | 'paid'

const route = useRoute()
const router = useRouter()

const tabs: { id: Tab; label: string }[] = [
  { id: 'free', label: '公開課' },
  { id: 'paid', label: '付費課' },
]

// campaign 進行中預設顯示公開課；關閉後只剩付費課。
const defaultTab: Tab = freeCourseCampaignActive ? 'free' : 'paid'

function normalizeTab(value: unknown): Tab {
  if (!freeCourseCampaignActive) return 'paid'
  return value === 'paid' ? 'paid' : 'free'
}

const activeTab = ref<Tab>(normalizeTab(route.query.tab))

watch(activeTab, (tab) => {
  const query = { ...route.query }
  if (tab === defaultTab) delete query.tab
  else query.tab = tab
  router.replace({ query })
})

// 公開課資料改由 Google Sheet 發布的 CSV 提供，方便不改程式碼就更新課表。
// 讀取失敗或尚未回應時，退回打包在程式內的靜態課表，確保正式頁永遠有內容。
const { courses, loading, load } = useCourseSheet(COURSE_SHEET_CSV_URL)
onMounted(() => {
  if (freeCourseCampaignActive) load()
})

const freeCoursesToShow = computed(() => (courses.value.length ? courses.value : staticFreeCourses))
// 只有「首次載入、尚無任何資料」時才顯示骨架；失敗後 courses 仍為空 → 直接退回靜態課表。
const showFreeSkeleton = computed(() => loading.value && courses.value.length === 0)
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-16">
    <RouterLink
      :to="{ name: RouteName.Tutoring }"
      class="mb-8 inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-400"
    >
      <ArrowLeft class="size-4" />
      返回家教頁
    </RouterLink>

    <PageHeader
      title="課程"
      description="全民英檢寫作與主題式英文課程，從初級到中級，線上小班授課。"
    />

    <div
      v-if="freeCourseCampaignActive"
      class="mt-8 border-b border-neutral-200 dark:border-neutral-800"
    >
      <div class="flex items-center gap-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="border-b-2 py-3 font-sans text-sm transition-colors"
          :class="
            activeTab === tab.id
              ? 'border-accent-400 text-neutral-800 dark:text-neutral-100'
              : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100'
          "
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="mt-10">
      <template v-if="freeCourseCampaignActive && activeTab === 'free'">
        <!-- 課表載入中的骨架 -->
        <div v-if="showFreeSkeleton" class="flex flex-col gap-6" aria-hidden="true">
          <div class="h-4 w-64 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div class="h-64 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <FreeCourseTerms v-else :courses="freeCoursesToShow" />
      </template>
      <PaidCoursePreview v-else />
    </div>
  </section>
</template>
