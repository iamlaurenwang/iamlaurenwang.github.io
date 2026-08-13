<script setup lang="ts">
defineProps<{
  label: string
  active?: boolean
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-colors duration-150"
    :class="active
      ? 'bg-accent-600 text-white'
      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>
