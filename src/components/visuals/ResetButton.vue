<script setup lang="ts">
import { RotateCcw } from '@lucide/vue'

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="flex shrink-0 items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 font-sans text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
    @click="$emit('click')"
  >
    <RotateCcw :size="14" />
    Reset
  </button>
</template>
