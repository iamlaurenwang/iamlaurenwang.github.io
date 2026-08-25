<script lang="ts" setup>
import { useScrollSpy } from "@/composables/useScrollSpy";

interface AnchorLink {
  label: string;
  id: string;
}

const anchorLinks: AnchorLink[] = [
  { label: "家長&學生回饋", id: "feedback" },
  { label: "教材&講義", id: "materials" },
];

const { activeId, scrollTo } = useScrollSpy(anchorLinks.map((l) => l.id));
</script>

<template>
  <nav
    class="sticky top-16 z-40 border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80"
  >
    <div class="mx-auto flex max-w-5xl items-center gap-4 overflow-x-auto px-4 sm:gap-6 sm:px-6">
      <!-- Anchor links (in-page scroll) -->
      <a
        v-for="link in anchorLinks"
        :key="link.id"
        :href="`#${link.id}`"
        class="shrink-0 whitespace-nowrap border-b-2 py-3.5 font-sans text-sm transition-colors"
        :class="
          activeId === link.id
            ? 'border-accent-400 text-neutral-800 dark:text-neutral-100'
            : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100'
        "
        @click.prevent="scrollTo(link.id)"
      >
        {{ link.label }}
      </a>

      <!-- Divider between anchors and page navigation -->
      <span class="mx-1 h-4 w-px shrink-0 self-center bg-neutral-200 dark:bg-neutral-800" />

      <!-- Page navigation — Course placeholder (coming soon, phase 2) -->
      <span
        class="inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent py-3.5 font-sans text-sm text-neutral-300 dark:text-neutral-600"
      >
        Course
        <span
          class="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
        >
          即將推出
        </span>
      </span>
    </div>
  </nav>
</template>
