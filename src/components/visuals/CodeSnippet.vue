<script setup lang="ts">
defineProps<{
  /** Raw source to display, verbatim (indentation preserved). */
  code: string
  /** Optional caption shown above the block. */
  label?: string
}>()
</script>

<template>
  <div class="space-y-2">
    <p v-if="label" class="font-mono text-xs tracking-wide text-neutral-500">{{ label }}</p>
    <pre
      class="overflow-x-auto rounded-lg bg-neutral-800 p-4 font-mono text-xs leading-relaxed text-neutral-100"
    ><code>{{ code }}</code></pre>
  </div>
</template>
