<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import { RouteName } from '@/types/routes'
import FreeCourseTerms from '@/components/course/FreeCourseTerms.vue'
import PaidCoursePreview from '@/components/course/PaidCoursePreview.vue'
import TutorComingSoon from '@/components/course/TutorComingSoon.vue'
import { freeCourseCampaignActive, freeCourses as staticFreeCourses } from '@/data/courses'
import { COURSE_SHEET_CSV_URL, COURSE_GROUP_SHEET_CSV_URL } from '@/data/courseSheet'
import { useCourseSheet } from '@/composables/useCourseSheet'

type Tab = 'free' | 'paid' | 'tutor'

const route = useRoute()
const router = useRouter()

const tabs: { id: Tab; label: string }[] = [
  { id: 'free', label: '公開體驗課' },
  { id: 'paid', label: '5人小班課' },
  { id: 'tutor', label: '一對一' },
]

// campaign 進行中預設顯示公開課；關閉後只剩付費課。
const defaultTab: Tab = freeCourseCampaignActive ? 'free' : 'paid'

function normalizeTab(value: unknown): Tab {
  if (!freeCourseCampaignActive) return 'paid'
  if (value === 'paid' || value === 'tutor') return value
  return 'free'
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

// 5 人小班課（團課）課表也來自 Google Sheet（另一個工作表），無靜態 fallback。
// 延遲載入：首次切到「5人小班課」tab 才抓，避免只看公開課的使用者多打一次網路。
const {
  courses: groupCourses,
  loading: groupLoading,
  load: loadGroup,
} = useCourseSheet(COURSE_GROUP_SHEET_CSV_URL)
let groupLoaded = false
watch(
  activeTab,
  (tab) => {
    if (tab === 'paid' && !groupLoaded) {
      groupLoaded = true
      loadGroup()
    }
  },
  { immediate: true },
)
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
      <TutorComingSoon v-else-if="activeTab === 'tutor'" />
      <PaidCoursePreview v-else :courses="groupCourses" :loading="groupLoading" />
    </div>
  </section>
</template>
