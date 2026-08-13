<script setup lang="ts">
import { Sun, Moon } from "@lucide/vue";
import { useTheme } from "@/composables/useTheme";

const { isDark, toggle } = useTheme();
</script>

<template>
  <button
    type="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-card transition-colors duration-150 hover:text-accent-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-accent-400"
    @click="toggle"
  >
    <Sun v-if="isDark" :size="16" />
    <Moon v-else :size="16" />
  </button>
</template>
