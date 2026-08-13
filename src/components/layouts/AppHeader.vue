<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { RouteName } from "@/types/routes";

const navLinks = [
  { label: "Tutoring", to: { name: RouteName.Tutoring } },
  { label: "Visuals",  to: { name: RouteName.VisualsIndex } },
];
</script>

<template>
  <header class="sticky top-0 z-50 bg-neutral-50/90 backdrop-blur-sm border-b border-neutral-200">
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink
        :to="{ name: RouteName.Landing }"
        class="font-serif font-light tracking-wide text-neutral-900 text-sm hover:text-accent-600 transition-colors duration-150"
      >
        Lauren Wang
      </RouterLink>

      <!-- Nav -->
      <nav class="flex items-center gap-8">
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="font-sans text-sm text-neutral-500 hover:text-neutral-900 transition-colors duration-150"
          active-class="text-neutral-900 font-medium"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
