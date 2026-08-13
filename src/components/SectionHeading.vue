<script setup lang="ts">
defineProps<{
  number: string;
  title: string;
}>();
</script>

<template>
  <div class="flex items-center gap-4">
    <h2
      class="flex items-baseline gap-2.5 whitespace-nowrap font-serif text-2xl text-neutral-800 md:text-3xl"
    >
      <span class="font-sans text-lg font-medium text-accent-500 md:text-xl">{{ number }}.</span>
      {{ title }}
    </h2>
    <span class="h-px flex-1 bg-neutral-200" />
  </div>
</template>
