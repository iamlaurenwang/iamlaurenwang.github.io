<script setup lang="ts">
import { projects } from "@/data/projects";
import ProjectCard from "@/components/resume/ProjectCard.vue";
import SectionHeading from "@/components/SectionHeading.vue";
</script>

<template>
  <section id="projects" class="bg-neutral-100">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="03" title="Projects" />

      <div class="mt-10 grid gap-6 sm:grid-cols-2">
        <ProjectCard v-for="proj in projects" :key="proj.name" :project="proj" />
      </div>
    </div>
  </section>
</template>
