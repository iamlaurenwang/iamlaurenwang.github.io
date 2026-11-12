<script lang="ts" setup>
import HeroSection from '@/components/landing/HeroSection.vue'
import AboutSection from '@/components/landing/AboutSection.vue'
import ExperienceSection from '@/components/landing/ExperienceSection.vue'
import ProjectsSection from '@/components/landing/ProjectsSection.vue'
import SideProjectsSection from '@/components/landing/SideProjectsSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Right-side dot decoration — only shown when viewport has enough gutter (xl+) -->
    <svg
      class="pointer-events-none absolute right-0 top-0 hidden select-none text-neutral-300 xl:block dark:text-neutral-600"
      width="200"
      height="800"
      viewBox="0 0 200 800"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="230" cy="160" r="140" stroke="currentColor" stroke-width="1" />
      <circle cx="90" cy="460" r="88" stroke="currentColor" stroke-width="1" />
      <circle cx="240" cy="710" r="110" stroke="currentColor" stroke-width="1" />
    </svg>

    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <SideProjectsSection />
    <ContactSection />
  </div>
</template>
