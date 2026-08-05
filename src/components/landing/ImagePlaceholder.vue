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
    'neutral-100': 'bg-neutral-100',
    'neutral-200': 'bg-neutral-200',
    'neutral-300': 'bg-neutral-300',
    'neutral-400': 'bg-neutral-400',
    'accent-100': 'bg-accent-100',
    'accent-200': 'bg-accent-200',
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
