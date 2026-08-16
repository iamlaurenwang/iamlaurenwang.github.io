<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Headphones } from '@lucide/vue'
import { RouteName } from '@/types/routes'
import PillTag from '@/components/PillTag.vue'
import type { TeachingItem } from '@/types/teaching'

const props = defineProps<{ item: TeachingItem }>()

const to = computed(() =>
  props.item.interactiveRoute
    ? { name: props.item.interactiveRoute }
    : { name: RouteName.TeachingDetail, params: { slug: props.item.slug } },
)
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-card transition-shadow hover:shadow-card-hover dark:border-neutral-800 dark:bg-neutral-900"
  >
    <div class="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
      <img
        :src="item.cover.src"
        :alt="item.cover.alt"
        :width="item.cover.width"
        :height="item.cover.height"
        loading="lazy"
        decoding="async"
        class="h-48 w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div v-if="item.interactiveRoute" class="absolute top-3 left-3">
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-accent-600 px-2.5 py-1 font-sans text-[0.65rem] font-medium tracking-wide text-white uppercase"
        >
          <Headphones :size="12" />
          可線上作答
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <h2 class="font-serif text-xl text-neutral-800 dark:text-neutral-100">
        {{ item.title }}
      </h2>
      <p
        class="mt-2 flex-1 font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400"
      >
        {{ item.summary }}
      </p>

      <div class="mt-4 flex flex-wrap gap-1.5">
        <PillTag
          v-for="tag in item.tags.slice(0, 3)"
          :key="tag"
          variant="neutral"
        >
          {{ tag }}
        </PillTag>
      </div>

      <span
        class="mt-4 flex items-center gap-1.5 font-sans text-xs tracking-wide text-accent-600 uppercase dark:text-accent-400"
      >
        {{ item.interactiveRoute ? '開始練習' : '看內容' }}
        <ArrowRight
          :size="14"
          class="transition-transform group-hover:translate-x-1"
        />
      </span>
    </div>
  </RouterLink>
</template>
