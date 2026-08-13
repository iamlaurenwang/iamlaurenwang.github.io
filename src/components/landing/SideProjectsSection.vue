<script setup lang="ts">
import { FolderGit2 } from "@lucide/vue";
import SectionHeading from "@/components/SectionHeading.vue";
import EmptyState from "@/components/EmptyState.vue";
</script>

<template>
  <section id="side-projects" class="bg-white dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="04" title="Side Projects" />

      <!-- TODO: replace with a grid of side-project cards (see Brittany "Other Noteworthy Projects") -->
      <EmptyState
        :icon="FolderGit2"
        title="Coming soon"
        description="Personal experiments and side projects will live here."
      />
    </div>
  </section>
</template>
