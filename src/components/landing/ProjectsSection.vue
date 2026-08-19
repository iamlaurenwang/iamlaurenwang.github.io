<script setup lang="ts">
import { projects } from '@/data/projects'
import ProjectCard from '@/components/resume/ProjectCard.vue'
import { FolderGit2 } from '@lucide/vue'
import EmptyState from '@/components/EmptyState.vue'
import SectionHeading from '@/components/SectionHeading.vue'
</script>

<template>
  <section id="projects" class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="03" title="Projects" />

      <!-- <div class="mt-10 grid gap-6 sm:grid-cols-2">
        <ProjectCard v-for="proj in projects" :key="proj.name" :project="proj" />
      </div> -->
      <!-- TODO: replace with a grid of side-project cards (see Brittany "Other Noteworthy Projects") -->
      <EmptyState
        :icon="FolderGit2"
        title="Coming soon"
        description="Personal experiments and side projects will live here."
      />
    </div>
  </section>
</template>
