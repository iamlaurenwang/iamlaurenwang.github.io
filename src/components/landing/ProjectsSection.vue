<script setup lang="ts">
import { portfolioProjects } from '@/data/portfolioProjects'
import PortfolioProjectCard from '@/components/landing/PortfolioProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
</script>

<template>
  <section id="projects" class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="03" title="Projects" />

      <div class="mt-10 grid gap-6 sm:grid-cols-2">
        <PortfolioProjectCard v-for="proj in portfolioProjects" :key="proj.id" :project="proj" />
      </div>
    </div>
  </section>
</template>
