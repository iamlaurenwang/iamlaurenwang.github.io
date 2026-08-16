<script setup lang="ts">
import { ref } from 'vue'
import ImageLightbox from './ImageLightbox.vue'
import type { TeachingAsset } from '@/types/teaching'

defineProps<{ assets: TeachingAsset[] }>()

const activeIndex = ref<number | null>(null)
</script>

<template>
  <div>
    <div class="grid gap-4 sm:grid-cols-2">
      <figure
        v-for="(asset, i) in assets"
        :key="asset.src"
        class="flex flex-col gap-2"
      >
        <button
          type="button"
          class="group overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800"
          :aria-label="`放大檢視：${asset.alt}`"
          @click="activeIndex = i"
        >
          <img
            :src="asset.src"
            :alt="asset.alt"
            :width="asset.width"
            :height="asset.height"
            loading="lazy"
            decoding="async"
            class="h-56 w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </button>
        <figcaption
          v-if="asset.caption"
          class="font-sans text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          {{ asset.caption }}
        </figcaption>
      </figure>
    </div>

    <ImageLightbox
      :assets="assets"
      :index="activeIndex"
      @close="activeIndex = null"
      @update:index="activeIndex = $event"
    />
  </div>
</template>
