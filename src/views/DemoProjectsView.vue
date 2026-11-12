<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import PortfolioProjectCard from '@/components/landing/PortfolioProjectCard.vue'
import { portfolioProjects } from '@/data/portfolioProjects'
import { RouteName } from '@/types/routes'
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-16">
    <RouterLink
      :to="{ name: RouteName.Landing, hash: '#projects' }"
      class="mb-8 inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 transition-colors hover:text-accent-600 dark:text-neutral-400 dark:hover:text-accent-400"
    >
      <ArrowLeft class="size-4" />
      回首頁
    </RouterLink>

    <PageHeader
      title="Projects"
      description="作品集測試頁：目前先放兩個 imedtac 旗艦專案，確認卡片與網格呈現效果。"
    />

    <div class="mt-10 grid gap-6 sm:grid-cols-2">
      <PortfolioProjectCard v-for="proj in portfolioProjects" :key="proj.id" :project="proj" />
    </div>
  </section>
</template>
