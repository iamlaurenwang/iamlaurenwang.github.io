<script setup lang="ts">
import { RotateCcw } from '@lucide/vue'

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="flex shrink-0 items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 font-sans text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
    @click="$emit('click')"
  >
    <RotateCcw :size="14" />
    Reset
  </button>
</template>
