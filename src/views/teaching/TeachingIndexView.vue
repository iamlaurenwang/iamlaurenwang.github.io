<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, Layers } from '@lucide/vue'
import { RouteName } from '@/types/routes'
import PageHeader from '@/components/PageHeader.vue'
import FilterPill from '@/components/FilterPill.vue'
import EmptyState from '@/components/EmptyState.vue'
import TeachingCard from '@/components/teaching/TeachingCard.vue'
import { sortedTeachingItems } from '@/data/teaching'
import {
  teachingCategories,
  useTeachingFilter,
} from '@/composables/useTeachingFilter'

const { activeCategory, filteredItems, setCategory } =
  useTeachingFilter(sortedTeachingItems)
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-12">
    <RouterLink
      :to="{ name: RouteName.Tutoring }"
      class="mb-6 inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
    >
      <ArrowLeft :size="16" />
      英文家教
    </RouterLink>

    <PageHeader
      title="教學作品集"
      description="這些是我實際用在課堂上的教材：自己寫的克漏字與閱讀學習單、主題式課程專案，以及可以直接在網頁上作答的聽力題組。"
    />

    <div class="mt-8 flex flex-wrap gap-2">
      <FilterPill
        v-for="category in teachingCategories"
        :key="category.value"
        :label="category.label"
        :active="activeCategory === category.value"
        @click="setCategory(category.value)"
      />
    </div>

    <div
      v-if="filteredItems.length"
      class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <TeachingCard
        v-for="item in filteredItems"
        :key="item.slug"
        :item="item"
      />
    </div>

    <EmptyState
      v-else
      :icon="Layers"
      title="這個分類還沒有作品"
      description="換個分類看看，或選「全部」。"
    />
  </div>
</template>
