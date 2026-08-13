<script lang="ts" setup>
import { computed, reactive, ref, watch, type CSSProperties } from 'vue'
import { Minus, Plus, X } from '@lucide/vue'
import ControlGroup from './ControlGroup.vue'
import ResetButton from './ResetButton.vue'
import CodePanel from './CodePanel.vue'
import PageHeader from '@/components/PageHeader.vue'

/* ---------- Container (parent) ---------- */
const PLACE = ['stretch', 'start', 'center', 'end'] as const
type Place = (typeof PLACE)[number]

interface GridState {
  columns: number
  rows: number
  gap: number
  justifyItems: Place
  alignItems: Place
}

const DEFAULTS: GridState = {
  columns: 3,
  rows: 2,
  gap: 12,
  justifyItems: 'stretch',
  alignItems: 'stretch',
}

const state = reactive<GridState>({ ...DEFAULTS })

/* ---------- Items (children) ---------- */
const SELF = ['auto', 'start', 'center', 'end', 'stretch'] as const
type Self = (typeof SELF)[number]

interface GridChild {
  colSpan: number
  rowSpan: number
  justifySelf: Self
  alignSelf: Self
}

function makeChild(): GridChild {
  return { colSpan: 1, rowSpan: 1, justifySelf: 'auto', alignSelf: 'auto' }
}

const children = reactive<GridChild[]>(Array.from({ length: 6 }, makeChild))
const selectedIndex = ref<number | null>(null)
const selected = computed<GridChild | null>(() =>
  selectedIndex.value === null ? null : (children[selectedIndex.value] ?? null),
)

// Keep spans within the current track counts.
watch(
  () => state.columns,
  (cols) => children.forEach((c) => (c.colSpan = Math.min(c.colSpan, cols))),
)
watch(
  () => state.rows,
  (rows) => children.forEach((c) => (c.rowSpan = Math.min(c.rowSpan, rows))),
)

function selectItem(i: number): void {
  selectedIndex.value = selectedIndex.value === i ? null : i
}
function addItem(): void {
  if (children.length < 12) children.push(makeChild())
}
function removeItem(): void {
  if (children.length > 1) {
    children.pop()
    if (selectedIndex.value !== null && selectedIndex.value >= children.length) {
      selectedIndex.value = null
    }
  }
}
function reset(): void {
  Object.assign(state, DEFAULTS)
  children.splice(0, children.length, ...Array.from({ length: 6 }, makeChild))
  selectedIndex.value = null
}

/* ---------- Live styles ---------- */
const stageStyle = computed<CSSProperties>(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${state.columns}, minmax(0, 1fr))`,
  gridTemplateRows: `repeat(${state.rows}, 4.5rem)`,
  gridAutoRows: '4.5rem',
  gap: `${state.gap}px`,
  justifyItems: state.justifyItems,
  alignItems: state.alignItems,
}))

function childStyle(c: GridChild): CSSProperties {
  return {
    gridColumn: `span ${c.colSpan}`,
    gridRow: `span ${c.rowSpan}`,
    justifySelf: c.justifySelf,
    alignSelf: c.alignSelf,
  }
}

/* ---------- Native CSS output ---------- */
const cssCode = computed<string>(() => {
  const place =
    state.justifyItems === state.alignItems
      ? [`place-items: ${state.justifyItems};`]
      : [`justify-items: ${state.justifyItems};`, `align-items: ${state.alignItems};`]
  return [
    'display: grid;',
    `grid-template-columns: repeat(${state.columns}, minmax(0, 1fr));`,
    `grid-template-rows: repeat(${state.rows}, 4.5rem);`,
    `gap: ${state.gap}px;`,
    ...place,
  ].join('\n')
})

const childCss = computed<string>(() => {
  const c = selected.value
  if (!c) return ''
  const place =
    c.justifySelf === c.alignSelf
      ? [`place-self: ${c.justifySelf};`]
      : [`justify-self: ${c.justifySelf};`, `align-self: ${c.alignSelf};`]
  return [`grid-column: span ${c.colSpan};`, `grid-row: span ${c.rowSpan};`, ...place].join('\n')
})

const childSelector = computed<string>(() => `.item:nth-child(${(selectedIndex.value ?? 0) + 1})`)

/* ---------- Tailwind output ---------- */
const JUSTIFY_ITEMS_TW: Record<Place, string> = {
  stretch: 'justify-items-stretch',
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
}
const ALIGN_ITEMS_TW: Record<Place, string> = {
  stretch: 'items-stretch',
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
}

const containerTw = computed<string>(() => {
  const place =
    state.justifyItems === state.alignItems
      ? [`place-items-${state.justifyItems}`]
      : [JUSTIFY_ITEMS_TW[state.justifyItems], ALIGN_ITEMS_TW[state.alignItems]]
  return [
    'grid',
    `grid-cols-${state.columns}`,
    `grid-rows-${state.rows}`,
    'auto-rows-[4.5rem]',
    `gap-[${state.gap}px]`,
    ...place,
  ].join(' ')
})

const childTw = computed<string>(() => {
  const c = selected.value
  if (!c) return ''
  const place =
    c.justifySelf === c.alignSelf
      ? [`place-self-${c.justifySelf}`]
      : [`justify-self-${c.justifySelf}`, `self-${c.alignSelf}`]
  return [`col-span-${c.colSpan}`, `row-span-${c.rowSpan}`, ...place].join(' ')
})
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <PageHeader
        level="h2"
        size="section"
        title="Grid"
        description="Two-dimensional layout — align items across rows and columns."
      />
      <ResetButton @click="reset" />
    </div>

    <div class="grid gap-6 md:grid-cols-[16rem_1fr]">
      <!-- Controls -->
      <div class="space-y-5">
        <ControlGroup v-model="state.justifyItems" label="justify-items" :options="PLACE" />
        <ControlGroup v-model="state.alignItems" label="align-items" :options="PLACE" />

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500 dark:text-neutral-400">columns</p>
            <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ state.columns }}</span>
          </div>
          <input
            v-model.number="state.columns"
            type="range"
            min="1"
            max="6"
            step="1"
            class="w-full accent-accent-500"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500 dark:text-neutral-400">rows</p>
            <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ state.rows }}</span>
          </div>
          <input
            v-model.number="state.rows"
            type="range"
            min="1"
            max="4"
            step="1"
            class="w-full accent-accent-500"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500 dark:text-neutral-400">gap</p>
            <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ state.gap }}px</span>
          </div>
          <input
            v-model.number="state.gap"
            type="range"
            min="0"
            max="48"
            step="2"
            class="w-full accent-accent-500"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <p class="font-mono text-xs tracking-wide text-neutral-500 dark:text-neutral-400">items</p>
            <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ children.length }}</span>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              :disabled="children.length <= 1"
              @click="removeItem"
            >
              <Minus :size="14" />
            </button>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
              :disabled="children.length >= 12"
              @click="addItem"
            >
              <Plus :size="14" />
            </button>
          </div>
        </div>

        <!-- Child properties (selected item) -->
        <div
          v-if="selected"
          class="space-y-4 rounded-lg border border-accent-200 bg-accent-50/50 p-4 dark:border-accent-500/30 dark:bg-accent-500/5"
        >
          <div class="flex items-center justify-between">
            <p class="font-sans text-xs font-medium text-neutral-700 dark:text-neutral-200">
              Item {{ (selectedIndex ?? 0) + 1 }} · child
            </p>
            <button
              type="button"
              class="text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
              @click="selectedIndex = null"
            >
              <X :size="14" />
            </button>
          </div>

          <div>
            <div class="mb-2 flex items-center justify-between">
              <p class="font-mono text-xs tracking-wide text-neutral-500 dark:text-neutral-400">grid-column (span)</p>
              <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ selected.colSpan }}</span>
            </div>
            <input
              v-model.number="selected.colSpan"
              type="range"
              min="1"
              :max="state.columns"
              step="1"
              class="w-full accent-accent-500"
            />
          </div>

          <div>
            <div class="mb-2 flex items-center justify-between">
              <p class="font-mono text-xs tracking-wide text-neutral-500 dark:text-neutral-400">grid-row (span)</p>
              <span class="font-mono text-xs text-neutral-700 dark:text-neutral-300">{{ selected.rowSpan }}</span>
            </div>
            <input
              v-model.number="selected.rowSpan"
              type="range"
              min="1"
              :max="state.rows"
              step="1"
              class="w-full accent-accent-500"
            />
          </div>

          <ControlGroup v-model="selected.justifySelf" label="justify-self" :options="SELF" />
          <ControlGroup v-model="selected.alignSelf" label="align-self" :options="SELF" />
        </div>
        <p
          v-else
          class="rounded-lg border border-dashed border-neutral-300 px-3 py-3 text-center font-sans text-xs text-neutral-400 dark:border-neutral-700 dark:text-neutral-500"
        >
          Click an item to edit its child properties.
        </p>
      </div>

      <!-- Preview + code -->
      <div class="space-y-4">
        <div class="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900" :style="stageStyle">
          <button
            v-for="(c, i) in children"
            :key="i"
            type="button"
            class="flex items-center justify-center rounded-md bg-accent-500 px-5 py-3 font-mono text-sm font-medium text-white shadow-card transition-all duration-300"
            :class="
              selectedIndex === i
                ? 'ring-2 ring-accent-600 ring-offset-2 ring-offset-neutral-100 dark:ring-offset-neutral-900'
                : 'hover:brightness-95'
            "
            :style="childStyle(c)"
            @click="selectItem(i)"
          >
            {{ i + 1 }}
          </button>
        </div>

        <CodePanel
          :css="cssCode"
          :tw="containerTw"
          :child-css="childCss"
          :child-selector="childSelector"
          :child-tw="childTw"
        />
      </div>
    </div>
  </section>
</template>
