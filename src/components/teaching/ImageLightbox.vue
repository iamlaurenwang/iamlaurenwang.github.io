<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { X, ChevronLeft, ChevronRight } from '@lucide/vue'
import type { TeachingAsset } from '@/types/teaching'

const props = defineProps<{
  assets: TeachingAsset[]
  /** null 代表關閉 */
  index: number | null
}>()

const emit = defineEmits<{
  close: []
  'update:index': [value: number]
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const current = computed<TeachingAsset | null>(() =>
  props.index === null ? null : (props.assets[props.index] ?? null),
)

// 用原生 <dialog>：自帶 focus trap、Esc 關閉與背景 inert，不需要額外套件
watch(
  () => props.index,
  (i) => {
    const el = dialogRef.value
    if (!el) return
    if (i === null) {
      if (el.open) el.close()
    } else if (!el.open) {
      el.showModal()
    }
  },
)

function step(delta: number): void {
  if (props.index === null || props.assets.length < 2) return
  const next = (props.index + delta + props.assets.length) % props.assets.length
  emit('update:index', next)
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowLeft') step(-1)
  if (event.key === 'ArrowRight') step(1)
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="max-h-full max-w-full bg-transparent backdrop:bg-neutral-950/80 backdrop:backdrop-blur-sm"
    @close="emit('close')"
    @keydown="onKeydown"
    @click.self="emit('close')"
  >
    <div
      v-if="current"
      class="flex max-h-[90vh] w-[92vw] max-w-5xl flex-col gap-3"
    >
      <div class="flex items-center justify-between gap-4">
        <p class="font-sans text-sm text-neutral-200">
          {{ current.caption || current.alt }}
        </p>
        <button
          type="button"
          class="shrink-0 rounded-full p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="關閉"
          @click="emit('close')"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="flex min-h-0 items-center gap-3">
        <button
          v-if="assets.length > 1"
          type="button"
          class="shrink-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="上一張"
          @click="step(-1)"
        >
          <ChevronLeft :size="22" />
        </button>

        <img
          :src="current.src"
          :alt="current.alt"
          :width="current.width"
          :height="current.height"
          class="min-h-0 flex-1 rounded-lg bg-neutral-900 object-contain"
          style="max-height: 80vh"
        />

        <button
          v-if="assets.length > 1"
          type="button"
          class="shrink-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="下一張"
          @click="step(1)"
        >
          <ChevronRight :size="22" />
        </button>
      </div>

      <p
        v-if="assets.length > 1"
        class="text-center font-sans text-xs text-neutral-400"
      >
        {{ (index ?? 0) + 1 }} / {{ assets.length }}
      </p>
    </div>
  </dialog>
</template>
