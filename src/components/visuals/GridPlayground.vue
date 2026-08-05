<script lang="ts" setup>
import { computed, reactive, ref, type CSSProperties } from 'vue'
import { Minus, Plus, RotateCcw } from '@lucide/vue'
import ControlGroup from './ControlGroup.vue'

const PLACE = ['stretch', 'start', 'center', 'end'] as const
type Place = (typeof PLACE)[number]

interface GridState {
  columns: number
  gap: number
  justifyItems: Place
  alignItems: Place
}

const DEFAULTS: GridState = {
  columns: 3,
  gap: 12,
  justifyItems: 'stretch',
  alignItems: 'stretch',
}

const state = reactive<GridState>({ ...DEFAULTS })
const itemCount = ref(6)

const stageStyle = computed<CSSProperties>(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${state.columns}, minmax(0, 1fr))`,
  gridAutoRows: '4.5rem',
  gap: `${state.gap}px`,
  justifyItems: state.justifyItems,
  alignItems: state.alignItems,
}))

const cssCode = computed<string>(() =>
  [
    'display: grid;',
    `grid-template-columns: repeat(${state.columns}, minmax(0, 1fr));`,
    'grid-auto-rows: 4.5rem;',
    `gap: ${state.gap}px;`,
    `justify-items: ${state.justifyItems};`,
    `align-items: ${state.alignItems};`,
  ].join('\n'),
)

const items = computed(() => Array.from({ length: itemCount.value }, (_, i) => i + 1))

function addItem(): void {
  if (itemCount.value < 12) itemCount.value++
}
function removeItem(): void {
  if (itemCount.value > 1) itemCount.value--
}
function reset(): void {
  Object.assign(state, DEFAULTS)
  itemCount.value = 6
}
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-neutral-800 md:text-3xl">Grid</h2>
        <p class="mt-1 font-sans text-sm text-neutral-500">
          Two-dimensional layout — align items across rows and columns.
        </p>
      </div>
      <button
        type="button"
        class="flex shrink-0 items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 font-sans text-xs text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
        @click="reset"
      >
        <RotateCcw :size="14" />
        Reset
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-[16rem_1fr]">
      <!-- Controls -->
      <div class="space-y-5">
        <ControlGroup v-model="state.justifyItems" label="justify-items" :options="PLACE" />
        <ControlGroup v-model="state.alignItems" label="align-items" :options="PLACE" />

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500">columns</p>
            <span class="font-mono text-xs text-neutral-700">{{ state.columns }}</span>
          </div>
          <input
            v-model.number="state.columns"
            type="range"
            min="1"
            max="6"
            step="1"
            class="w-full accent-accent-400"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500">gap</p>
            <span class="font-mono text-xs text-neutral-700">{{ state.gap }}px</span>
          </div>
          <input
            v-model.number="state.gap"
            type="range"
            min="0"
            max="48"
            step="2"
            class="w-full accent-accent-400"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500">items</p>
            <span class="font-mono text-xs text-neutral-700">{{ itemCount }}</span>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
              :disabled="itemCount <= 1"
              @click="removeItem"
            >
              <Minus :size="14" />
            </button>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
              :disabled="itemCount >= 12"
              @click="addItem"
            >
              <Plus :size="14" />
            </button>
          </div>
        </div>
      </div>

      <!-- Preview + code -->
      <div class="space-y-4">
        <div class="rounded-lg border border-neutral-200 bg-neutral-100 p-4" :style="stageStyle">
          <div
            v-for="n in items"
            :key="n"
            class="flex items-center justify-center rounded-md bg-accent-300 px-5 py-3 font-mono text-sm font-medium text-neutral-800 shadow-card transition-all duration-300"
          >
            {{ n }}
          </div>
        </div>

        <pre
          class="overflow-x-auto rounded-lg bg-neutral-800 p-4 font-mono text-xs leading-relaxed text-neutral-100"
        ><code>.container {
<span class="text-accent-200">{{ cssCode.split('\n').map((l) => '  ' + l).join('\n') }}</span>
}</code></pre>
      </div>
    </div>
  </section>
</template>
