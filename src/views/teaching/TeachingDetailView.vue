<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from '@lucide/vue'
import { RouteName } from '@/types/routes'
import PageHeader from '@/components/PageHeader.vue'
import PillTag from '@/components/PillTag.vue'
import EmptyState from '@/components/EmptyState.vue'
import AssetGallery from '@/components/teaching/AssetGallery.vue'
import ProgressionViewer from '@/components/teaching/ProgressionViewer.vue'
import ImageLightbox from '@/components/teaching/ImageLightbox.vue'
import { findTeachingItem, sortedTeachingItems } from '@/data/teaching'

const props = defineProps<{ slug: string }>()

const item = computed(() => findTeachingItem(props.slug))

const siblings = computed(() => {
  const list = sortedTeachingItems.filter((entry) => !entry.interactiveRoute)
  const index = list.findIndex((entry) => entry.slug === props.slug)
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  }
})

// 沒有 gallery 的作品，封面本身就是唯一一張圖，也讓它可以放大
const coverIndex = ref<number | null>(null)
</script>

<template>
  <div v-if="item" class="mx-auto max-w-3xl px-6 py-12">
    <RouterLink
      :to="{ name: RouteName.TeachingIndex }"
      class="inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
    >
      <ArrowLeft :size="16" />
      教學作品集
    </RouterLink>

    <div class="mt-6">
      <PageHeader :title="item.title" :description="item.summary" />
    </div>

    <div class="mt-5 flex flex-wrap items-center gap-1.5">
      <PillTag variant="accent">{{ item.date }}</PillTag>
      <PillTag
        v-for="audience in item.audience"
        :key="audience"
        variant="muted"
      >
        {{ audience }}
      </PillTag>
      <PillTag v-for="tag in item.tags" :key="tag" variant="neutral">{{
        tag
      }}</PillTag>
    </div>

    <!-- 主體：學習歷程與圖庫可以並存；兩者都沒有時退回單張封面 -->
    <div class="mt-10 flex flex-col gap-8">
      <ProgressionViewer v-if="item.progression?.length" :stages="item.progression" />

      <AssetGallery v-if="item.gallery?.length" :assets="item.gallery" />

      <template v-if="!item.progression?.length && !item.gallery?.length">
        <button
          type="button"
          class="w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800"
          :aria-label="`放大檢視：${item.cover.alt}`"
          @click="coverIndex = 0"
        >
          <img
            :src="item.cover.src"
            :alt="item.cover.alt"
            :width="item.cover.width"
            :height="item.cover.height"
            decoding="async"
            class="w-full object-contain"
          />
        </button>
        <ImageLightbox
          :assets="[item.cover]"
          :index="coverIndex"
          @close="coverIndex = null"
          @update:index="coverIndex = $event"
        />
      </template>
    </div>

    <!-- 教學目標 -->
    <section v-if="item.objectives?.length" class="mt-12">
      <PageHeader title="教學目標" level="h2" size="section" />
      <ul class="mt-4 flex flex-col gap-2">
        <li
          v-for="objective in item.objectives"
          :key="objective"
          class="flex gap-3 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
        >
          <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
          {{ objective }}
        </li>
      </ul>
    </section>

    <!-- 課堂流程 -->
    <section v-if="item.outline?.length" class="mt-12">
      <PageHeader title="課堂流程" level="h2" size="section" />
      <div
        class="mt-4 flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800"
      >
        <div
          v-for="step in item.outline"
          :key="step.activity"
          class="flex gap-5 py-3"
        >
          <span
            class="w-24 shrink-0 font-sans text-xs tracking-wide text-neutral-400 uppercase dark:text-neutral-500"
          >
            {{ step.duration }}
          </span>
          <div class="flex flex-col gap-1">
            <p class="font-sans text-sm text-neutral-700 dark:text-neutral-200">
              {{ step.activity }}
            </p>
            <p
              v-if="step.note"
              class="font-sans text-xs text-neutral-500 dark:text-neutral-400"
            >
              {{ step.note }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 教學反思 -->
    <section v-if="item.reflection" class="mt-12">
      <PageHeader title="教學反思" level="h2" size="section" />
      <p
        class="mt-4 border-l-2 border-accent-300 pl-5 font-serif text-lg leading-relaxed text-neutral-700 italic dark:border-accent-500/40 dark:text-neutral-300"
      >
        {{ item.reflection }}
      </p>
    </section>

    <!-- 完整原檔 -->
    <section v-if="item.resources?.length" class="mt-12">
      <PageHeader title="完整檔案" level="h2" size="section" />
      <div class="mt-4 flex flex-col gap-2">
        <a
          v-for="resource in item.resources"
          :key="resource.url"
          :href="resource.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
        >
          <FileText :size="18" class="shrink-0 text-accent-500" />
          <span
            class="flex-1 font-sans text-sm text-neutral-700 dark:text-neutral-200"
          >
            {{ resource.label }}
          </span>
          <ArrowUpRight
            :size="16"
            class="text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>

    <!-- 上下篇 -->
    <nav
      class="mt-16 flex items-start justify-between gap-6 border-t border-neutral-200 pt-6 dark:border-neutral-800"
    >
      <RouterLink
        v-if="siblings.prev"
        :to="{
          name: RouteName.TeachingDetail,
          params: { slug: siblings.prev.slug },
        }"
        class="group flex max-w-[45%] flex-col gap-1"
      >
        <span class="font-sans text-xs tracking-wide text-neutral-400 uppercase"
          >上一篇</span
        >
        <span
          class="flex items-center gap-1.5 font-sans text-sm text-neutral-600 transition-colors group-hover:text-accent-600 dark:text-neutral-300"
        >
          <ArrowLeft :size="14" class="shrink-0" />
          {{ siblings.prev.title }}
        </span>
      </RouterLink>
      <span v-else />

      <RouterLink
        v-if="siblings.next"
        :to="{
          name: RouteName.TeachingDetail,
          params: { slug: siblings.next.slug },
        }"
        class="group flex max-w-[45%] flex-col items-end gap-1 text-right"
      >
        <span class="font-sans text-xs tracking-wide text-neutral-400 uppercase"
          >下一篇</span
        >
        <span
          class="flex items-center gap-1.5 font-sans text-sm text-neutral-600 transition-colors group-hover:text-accent-600 dark:text-neutral-300"
        >
          {{ siblings.next.title }}
          <ArrowRight :size="14" class="shrink-0" />
        </span>
      </RouterLink>
    </nav>
  </div>

  <div v-else class="mx-auto max-w-3xl px-6 py-12">
    <EmptyState
      :icon="FileText"
      title="找不到這份作品"
      description="連結可能已經失效，回到作品集看看其他內容。"
    />
    <div class="flex justify-center">
      <RouterLink
        :to="{ name: RouteName.TeachingIndex }"
        class="inline-flex items-center gap-1.5 font-sans text-sm text-accent-600 hover:text-accent-700 dark:text-accent-400"
      >
        <ArrowLeft :size="16" />
        回到教學作品集
      </RouterLink>
    </div>
  </div>
</template>
