<script setup lang="ts">
import { computed } from 'vue'

/**
 * 可預約時段：嵌入公開的 Google Calendar（共用行事曆），讓客戶直接看到目前時段。
 * 設定來自環境變數 VITE_GOOGLE_CALENDAR_ID；留空則整個區塊不渲染（比照 useAnalytics 對 GA ID 的處理）。
 * Phase 1 為唯讀檢視，實際預約仍走 /contact 流程。
 */
const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined

const embedUrl = computed(() => {
  if (!calendarId) return ''
  const params = new URLSearchParams({
    src: calendarId,
    ctz: 'Asia/Taipei',
    mode: 'WEEK',
    showTitle: '0',
    showPrint: '0',
    showTz: '0',
    showCalendars: '0',
    showTabs: '1',
  })
  return `https://calendar.google.com/calendar/embed?${params.toString()}`
})
</script>

<template>
  <div v-if="embedUrl" class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p
        class="mb-2 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500"
      >
        可預約時段
      </p>
      <p
        class="mb-8 max-w-xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
      >
        以下為目前的行事曆，空白時段即可預約。確認想上課的時間後，再透過下方「立即聯繫」與我約定。
      </p>

      <div
        class="overflow-hidden rounded-xl border border-neutral-200 shadow-card dark:border-neutral-800"
      >
        <iframe
          :src="embedUrl"
          title="Lauren 的可預約時段"
          class="h-[480px] w-full sm:h-[600px]"
          style="border: 0"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</template>
