<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(
  defineProps<{
    variant?: "primary" | "secondary";
    /** Render as a RouterLink when provided. */
    to?: RouteLocationRaw;
    /** Render as a plain anchor when provided. */
    href?: string;
  }>(),
  { variant: "secondary" },
);

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-offset-2 transition active:transition-none disabled:pointer-events-none disabled:opacity-50";

// Spotlight-style zinc buttons — teal is reserved for links, not fills.
const variants: Record<"primary" | "secondary", string> = {
  primary:
    "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:text-neutral-100/70 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-50",
  secondary:
    "bg-neutral-50 text-neutral-900 hover:bg-neutral-100 active:bg-neutral-100 active:text-neutral-900/60 dark:bg-neutral-800/50 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:active:bg-neutral-800/50 dark:active:text-neutral-50/70",
};
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="[base, variants[variant]]">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" :class="[base, variants[variant]]">
    <slot />
  </a>
  <button v-else :class="[base, variants[variant]]">
    <slot />
  </button>
</template>
