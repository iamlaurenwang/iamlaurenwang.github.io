<script setup lang="ts">
import { computed, ref } from 'vue'
import ImageLightbox from './ImageLightbox.vue'
import type { ProgressionStage } from '@/types/teaching'

const props = defineProps<{ stages: ProgressionStage[] }>()

const activeStage = ref(0)
const lightboxIndex = ref<number | null>(null)

const assets = computed(() => props.stages.map((stage) => stage.asset))
const active = computed(() => props.stages[activeStage.value])
</script>

<template>
  <div v-if="active" class="flex flex-col gap-4">
    <!-- 階段切換 -->
    <div
      class="inline-flex flex-wrap self-start rounded-full bg-neutral-100 p-1 dark:bg-neutral-800"
      role="tablist"
    >
      <button
        v-for="(stage, i) in stages"
        :key="stage.label"
        type="button"
        role="tab"
        :aria-selected="activeStage === i"
        class="flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-colors duration-150"
        :class="
          activeStage === i
            ? 'bg-accent-600 text-white'
            : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100'
        "
        @click="activeStage = i"
      >
        <span
          v-if="stages.length > 2"
          class="font-mono text-[0.65rem]"
          :class="activeStage === i ? 'text-white/70' : 'text-neutral-400'"
        >
          {{ i + 1 }}
        </span>
        {{ stage.label }}
      </button>
    </div>

    <button
      type="button"
      class="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800"
      :aria-label="`放大檢視：${active.asset.alt}`"
      @click="lightboxIndex = activeStage"
    >
      <img
        :src="active.asset.src"
        :alt="active.asset.alt"
        :width="active.asset.width"
        :height="active.asset.height"
        loading="lazy"
        decoding="async"
        class="w-full object-contain"
      />
    </button>

    <p
      v-if="active.note"
      class="border-l-2 border-accent-300 pl-4 font-sans text-sm leading-relaxed text-neutral-600 dark:border-accent-500/40 dark:text-neutral-300"
    >
      {{ active.note }}
    </p>

    <ImageLightbox
      :assets="assets"
      :index="lightboxIndex"
      @close="lightboxIndex = null"
      @update:index="lightboxIndex = $event"
    />
  </div>
</template>
