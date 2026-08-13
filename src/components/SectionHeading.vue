<script setup lang="ts">
defineProps<{
  number: string;
  title: string;
}>();
</script>

<template>
  <div class="flex items-center gap-4">
    <h2
      class="flex items-baseline gap-2.5 whitespace-nowrap font-serif text-2xl text-neutral-800 md:text-3xl dark:text-neutral-100"
    >
      <span class="font-sans text-lg font-medium text-accent-500 md:text-xl dark:text-accent-400"
        >{{ number }}.</span
      >
      {{ title }}
    </h2>
    <span class="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
  </div>
</template>
