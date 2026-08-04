<script lang="ts" setup>
import { ExternalLink } from '@lucide/vue'
</script>

<template>
  <footer class="border-t border-neutral-200 bg-neutral-50">
    <div class="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
      <p class="font-sans text-xs text-neutral-400">
        © {{ new Date().getFullYear() }} Lauren Wang
      </p>

      <div class="flex items-center gap-6">
        <a
          href="https://github.com/iamlaurenwang"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 font-sans text-xs text-neutral-400 hover:text-neutral-700 transition-colors duration-150"
        >
          GitHub
          <ExternalLink :size="11" />
        </a>
        <a
          href="https://www.linkedin.com/in/lauren-w-4a8339268"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1.5 font-sans text-xs text-neutral-400 hover:text-neutral-700 transition-colors duration-150"
        >
          LinkedIn
          <ExternalLink :size="11" />
        </a>
      </div>
    </div>
  </footer>
</template>
