<script lang="ts" setup>
import { computed } from 'vue'
import { ImageIcon } from '@lucide/vue'
import type { PlaceholderTone } from '@/types/landing'

const props = withDefaults(
  defineProps<{
    tone?: PlaceholderTone
    /** Optional label shown under the icon (e.g. describing the intended photo). */
    label?: string
  }>(),
  { tone: 'neutral-200', label: '' },
)

const toneClass = computed<string>(() => {
  const map: Record<PlaceholderTone, string> = {
    'neutral-100': 'bg-neutral-100 dark:bg-neutral-800',
    'neutral-200': 'bg-neutral-200 dark:bg-neutral-800',
    'neutral-300': 'bg-neutral-300 dark:bg-neutral-700',
    'neutral-400': 'bg-neutral-400 dark:bg-neutral-700',
    'accent-100': 'bg-accent-100 dark:bg-accent-500/20',
    'accent-200': 'bg-accent-200 dark:bg-accent-500/25',
  }
  return map[props.tone]
})
</script>

<template>
  <div
    class="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden"
    :class="toneClass"
    aria-hidden="true"
  >
    <ImageIcon :size="28" class="text-neutral-500/50" />
    <span v-if="label" class="px-4 text-center font-sans text-xs text-neutral-500/70">
      {{ label }}
    </span>
  </div>
</template>
