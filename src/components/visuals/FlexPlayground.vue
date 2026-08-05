<script lang="ts" setup>
import { computed, reactive, ref, type CSSProperties } from 'vue'
import { Minus, Plus, RotateCcw } from '@lucide/vue'
import ControlGroup from './ControlGroup.vue'

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'] as const
const JUSTIFY = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const
const ALIGN = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] as const
const WRAP = ['nowrap', 'wrap', 'wrap-reverse'] as const

type Direction = (typeof DIRECTIONS)[number]
type Justify = (typeof JUSTIFY)[number]
type Align = (typeof ALIGN)[number]
type Wrap = (typeof WRAP)[number]

interface FlexState {
  direction: Direction
  justify: Justify
  align: Align
  wrap: Wrap
  gap: number
}

const DEFAULTS: FlexState = {
  direction: 'row',
  justify: 'flex-start',
  align: 'stretch',
  wrap: 'nowrap',
  gap: 12,
}

const state = reactive<FlexState>({ ...DEFAULTS })
const itemCount = ref(4)

const stageStyle = computed<CSSProperties>(() => ({
  display: 'flex',
  flexDirection: state.direction,
  justifyContent: state.justify,
  alignItems: state.align,
  flexWrap: state.wrap,
  gap: `${state.gap}px`,
}))

const cssCode = computed<string>(() =>
  [
    'display: flex;',
    `flex-direction: ${state.direction};`,
    `justify-content: ${state.justify};`,
    `align-items: ${state.align};`,
    `flex-wrap: ${state.wrap};`,
    `gap: ${state.gap}px;`,
  ].join('\n'),
)

const items = computed(() => Array.from({ length: itemCount.value }, (_, i) => i + 1))

function addItem(): void {
  if (itemCount.value < 10) itemCount.value++
}
function removeItem(): void {
  if (itemCount.value > 1) itemCount.value--
}
function reset(): void {
  Object.assign(state, DEFAULTS)
  itemCount.value = 4
}
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl text-neutral-800 md:text-3xl">Flexbox</h2>
        <p class="mt-1 font-sans text-sm text-neutral-500">
          One-dimensional layout — arrange items along a single axis.
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
        <ControlGroup v-model="state.direction" label="flex-direction" :options="DIRECTIONS" />
        <ControlGroup v-model="state.justify" label="justify-content" :options="JUSTIFY" />
        <ControlGroup v-model="state.align" label="align-items" :options="ALIGN" />
        <ControlGroup v-model="state.wrap" label="flex-wrap" :options="WRAP" />

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
              :disabled="itemCount >= 10"
              @click="addItem"
            >
              <Plus :size="14" />
            </button>
          </div>
        </div>
      </div>

      <!-- Preview + code -->
      <div class="space-y-4">
        <div
          class="min-h-72 rounded-lg border border-neutral-200 bg-neutral-100 p-4"
          :style="stageStyle"
        >
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
