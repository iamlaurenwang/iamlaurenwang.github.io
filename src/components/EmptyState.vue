<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon?: Component
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-24">
    <component
      v-if="icon"
      :is="icon"
      :size="40"
      :stroke-width="1.5"
      class="text-neutral-300 dark:text-neutral-700"
    />
    <p class="font-sans text-lg font-semibold text-neutral-400 dark:text-neutral-500">{{ title }}</p>
    <p v-if="description" class="font-sans text-sm text-neutral-400 dark:text-neutral-500">
      {{ description }}
    </p>
  </div>
</template>
