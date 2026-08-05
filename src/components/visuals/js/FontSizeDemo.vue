<script setup lang="ts">
import { ref, type CSSProperties, computed } from 'vue'
import { Minus, Plus } from '@lucide/vue'
import CodeSnippet from '@/components/visuals/CodeSnippet.vue'

/**
 * Revealing module pattern: `size` is a single private variable, and both
 * increase() and decrease() close over *the same* one — a shared, protected
 * piece of state exposed only through the returned interface.
 */
interface FontSizeController {
  increase: () => void
  decrease: () => void
  current: () => number
}

function createFontSizeController(min: number, max: number, init: number): FontSizeController {
  let size = init // private, shared by both methods below
  return {
    increase() {
      if (size < max) size++
    },
    decrease() {
      if (size > min) size--
    },
    current() {
      return size
    },
  }
}

const MIN = 1
const MAX = 6
const controller = createFontSizeController(MIN, MAX, 3)

// ref only mirrors the private `size` for rendering.
const size = ref<number>(controller.current())

function increase(): void {
  controller.increase()
  size.value = controller.current()
}
function decrease(): void {
  controller.decrease()
  size.value = controller.current()
}

// scale step (1..6) -> font-size; the value itself is the teaching subject.
const textStyle = computed<CSSProperties>(() => ({ fontSize: `${0.75 + (size.value - 1) * 0.35}rem` }))

const code = `function createFontSizeController(min, max, init) {
  let size = init                    // ONE private variable

  return {
    increase() { if (size < max) size++ },   // both close over
    decrease() { if (size > min) size-- },   // the same size
    current()  { return size },
  }
}

const ctrl = createFontSizeController(1, 6, 3)
ctrl.increase()   // mutates the shared private state`
</script>

<template>
  <div class="grid gap-6 md:grid-cols-[1fr_1.1fr]">
    <!-- Live -->
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <div class="inline-flex overflow-hidden rounded-md border border-neutral-200">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
            :disabled="size <= MIN"
            @click="decrease"
          >
            <Minus :size="14" />
          </button>
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center border-l border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
            :disabled="size >= MAX"
            @click="increase"
          >
            <Plus :size="14" />
          </button>
        </div>
        <span class="font-mono text-xs text-neutral-500">size = {{ size }}</span>
      </div>

      <p
        class="rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-serif leading-relaxed text-neutral-800 transition-all"
        :style="textStyle"
      >
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>

    <!-- Code -->
    <CodeSnippet :code="code" />
  </div>
</template>
