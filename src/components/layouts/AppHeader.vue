<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { RouteName } from "@/types/routes";
import ThemeToggle from "./ThemeToggle.vue";

const navLinks = [
  { label: "Tutoring", to: { name: RouteName.Tutoring } },
  { label: "Visuals",  to: { name: RouteName.VisualsIndex } },
];
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80"
  >
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
      <!-- Logo -->
      <RouterLink
        :to="{ name: RouteName.Landing }"
        class="font-serif text-sm font-light tracking-wide text-neutral-900 transition-colors duration-150 hover:text-accent-600 dark:text-neutral-100 dark:hover:text-accent-400"
      >
        Lauren Wang
      </RouterLink>

      <!-- Nav -->
      <nav class="flex items-center gap-8">
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="font-sans text-sm text-neutral-500 transition-colors duration-150 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          active-class="text-neutral-900 font-medium dark:!text-neutral-100"
        >
          {{ link.label }}
        </RouterLink>

        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>
