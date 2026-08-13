<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  level?: 'h1' | 'h2'
  size?: 'page' | 'section'
}>(), {
  level: 'h1',
  size: 'page',
})
</script>

<template>
  <div>
    <component
      :is="level"
      :class="size === 'page'
        ? 'font-serif text-4xl text-neutral-800 dark:text-neutral-100'
        : 'font-serif text-2xl text-neutral-800 md:text-3xl dark:text-neutral-100'"
    >{{ title }}</component>
    <p
      v-if="description"
      :class="size === 'page'
        ? 'mt-3 max-w-2xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400'
        : 'mt-1 font-sans text-sm text-neutral-500 dark:text-neutral-400'"
    >{{ description }}</p>
  </div>
</template>
