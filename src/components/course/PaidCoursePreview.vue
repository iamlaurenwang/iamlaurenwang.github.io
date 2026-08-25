<script setup lang="ts">
import { Check } from "@lucide/vue";
import BaseButton from "@/components/BaseButton.vue";
import { paidSlots, paidExtras, LINE_URL } from "@/data/courses";
</script>

<template>
  <div class="flex flex-col gap-8">
    <p class="max-w-2xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
      付費課與免費課的主題、時段相同，但採 5 人滿班小班制，並提供額外的個人化服務與進階練習。
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

    <div>
      <h3 class="font-serif text-xl text-neutral-800 dark:text-neutral-100">開課時段</h3>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <div
          v-for="slot in paidSlots"
          :key="`${slot.day}-${slot.time}`"
          class="flex items-baseline justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <span class="font-sans text-sm text-neutral-700 dark:text-neutral-300">
            {{ slot.title }}
          </span>
          <span class="shrink-0 font-sans text-xs text-neutral-400 dark:text-neutral-500">
            {{ slot.day }} {{ slot.time }}
          </span>
        </div>
      </div>
    </div>

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
  </div>
</template>
