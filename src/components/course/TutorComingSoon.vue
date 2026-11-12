<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import BaseButton from '@/components/BaseButton.vue'
import { LINE_URL } from '@/data/courses'
</script>

<template>
  <div class="flex flex-col gap-8">
    <div
      class="flex flex-col items-center gap-4 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900"
    >
      <span
        class="inline-flex size-12 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400"
      >
        <Sparkles class="size-6" />
      </span>
      <h3 class="font-serif text-2xl text-neutral-800 dark:text-neutral-100">一對一家教</h3>
      <p class="max-w-md font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        客製化的一對一課程規劃中，Coming soon。若你有特定的學習目標與時段需求，歡迎先透過官方 Line
        與我聯絡，我會依你的程度量身安排。
      </p>
      <BaseButton
        v-if="LINE_URL"
        variant="primary"
        :href="LINE_URL"
        target="_blank"
        rel="noopener noreferrer"
      >
        加 Line 洽詢
      </BaseButton>
    </div>
  </div>
</template>
