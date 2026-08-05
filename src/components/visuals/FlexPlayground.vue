<script lang="ts" setup>
import { computed, reactive, ref, type CSSProperties } from 'vue'
import { Minus, Plus, X } from '@lucide/vue'
import ControlGroup from './ControlGroup.vue'
import ResetButton from './ResetButton.vue'
import CodePanel from './CodePanel.vue'
import PageHeader from '@/components/PageHeader.vue'

/* ---------- Container (parent) ---------- */
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

/* ---------- Items (children) ---------- */
const GROW = ['0', '1', '2', '3'] as const
const SHRINK = ['0', '1', '2', '3'] as const
const BASIS = ['auto', '0', '64px', '128px', '200px'] as const
const SELF = ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'] as const

type GrowShrink = (typeof GROW)[number]
type Basis = (typeof BASIS)[number]
type Self = (typeof SELF)[number]

interface FlexChild {
  grow: GrowShrink
  shrink: GrowShrink
  basis: Basis
  self: Self
}

function makeChild(): FlexChild {
  return { grow: '0', shrink: '1', basis: 'auto', self: 'auto' }
}

const children = reactive<FlexChild[]>(Array.from({ length: 4 }, makeChild))
const selectedIndex = ref<number | null>(null)
const selected = computed<FlexChild | null>(() =>
  selectedIndex.value === null ? null : (children[selectedIndex.value] ?? null),
)

function selectItem(i: number): void {
  selectedIndex.value = selectedIndex.value === i ? null : i
}
function addItem(): void {
  if (children.length < 10) children.push(makeChild())
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
  children.splice(0, children.length, ...Array.from({ length: 4 }, makeChild))
  selectedIndex.value = null
}

/* ---------- Live styles ---------- */
const stageStyle = computed<CSSProperties>(() => ({
  display: 'flex',
  flexDirection: state.direction,
  justifyContent: state.justify,
  alignItems: state.align,
  flexWrap: state.wrap,
  gap: `${state.gap}px`,
}))

function childStyle(c: FlexChild): CSSProperties {
  return {
    flexGrow: Number(c.grow),
    flexShrink: Number(c.shrink),
    flexBasis: c.basis,
    alignSelf: c.self,
  }
}

/* ---------- Native CSS output ---------- */
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

const childCss = computed<string>(() => {
  const c = selected.value
  if (!c) return ''
  return [
    `flex-grow: ${c.grow};`,
    `flex-shrink: ${c.shrink};`,
    `flex-basis: ${c.basis};`,
    `align-self: ${c.self};`,
  ].join('\n')
})

const childSelector = computed<string>(() => `.item:nth-child(${(selectedIndex.value ?? 0) + 1})`)

/* ---------- Tailwind output ---------- */
const DIR_TW: Record<Direction, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
}
const JUSTIFY_TW: Record<Justify, string> = {
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
}
const ALIGN_TW: Record<Align, string> = {
  stretch: 'items-stretch',
  'flex-start': 'items-start',
  'flex-end': 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
}
const WRAP_TW: Record<Wrap, string> = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
}
const SELF_TW: Record<Self, string> = {
  auto: 'self-auto',
  'flex-start': 'self-start',
  'flex-end': 'self-end',
  center: 'self-center',
  stretch: 'self-stretch',
  baseline: 'self-baseline',
}

const containerTw = computed<string>(() =>
  [
    'flex',
    DIR_TW[state.direction],
    JUSTIFY_TW[state.justify],
    ALIGN_TW[state.align],
    WRAP_TW[state.wrap],
    `gap-[${state.gap}px]`,
  ].join(' '),
)

const childTw = computed<string>(() => {
  const c = selected.value
  if (!c) return ''
  const grow = c.grow === '0' ? 'grow-0' : c.grow === '1' ? 'grow' : `grow-[${c.grow}]`
  const shrink = c.shrink === '1' ? 'shrink' : c.shrink === '0' ? 'shrink-0' : `shrink-[${c.shrink}]`
  const basis = c.basis === 'auto' ? 'basis-auto' : c.basis === '0' ? 'basis-0' : `basis-[${c.basis}]`
  return [grow, shrink, basis, SELF_TW[c.self]].join(' ')
})
</script>

<template>
  <section>
    <div class="mb-6 flex items-end justify-between gap-4">
      <PageHeader
        level="h2"
        size="section"
        title="Flexbox"
        description="One-dimensional layout — arrange items along a single axis."
      />
      <ResetButton @click="reset" />
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
            <span class="font-mono text-xs text-neutral-700">{{ children.length }}</span>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
              :disabled="children.length <= 1"
              @click="removeItem"
            >
              <Minus :size="14" />
            </button>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-40"
              :disabled="children.length >= 10"
              @click="addItem"
            >
              <Plus :size="14" />
            </button>
          </div>
        </div>

        <!-- Child properties (selected item) -->
        <div
          v-if="selected"
          class="space-y-4 rounded-lg border border-accent-200 bg-accent-50/50 p-4"
        >
          <div class="flex items-center justify-between">
            <p class="font-sans text-xs font-medium text-neutral-700">
              Item {{ (selectedIndex ?? 0) + 1 }} · child
            </p>
            <button
              type="button"
              class="text-neutral-400 transition-colors hover:text-neutral-700"
              @click="selectedIndex = null"
            >
              <X :size="14" />
            </button>
          </div>
          <ControlGroup v-model="selected.grow" label="flex-grow" :options="GROW" />
          <ControlGroup v-model="selected.shrink" label="flex-shrink" :options="SHRINK" />
          <ControlGroup v-model="selected.basis" label="flex-basis" :options="BASIS" />
          <ControlGroup v-model="selected.self" label="align-self" :options="SELF" />
        </div>
        <p
          v-else
          class="rounded-lg border border-dashed border-neutral-300 px-3 py-3 text-center font-sans text-xs text-neutral-400"
        >
          Click an item to edit its child properties.
        </p>
      </div>

      <!-- Preview + code -->
      <div class="space-y-4">
        <div
          class="min-h-72 rounded-lg border border-neutral-200 bg-neutral-100 p-4"
          :style="stageStyle"
        >
          <button
            v-for="(c, i) in children"
            :key="i"
            type="button"
            class="flex items-center justify-center rounded-md bg-accent-300 px-5 py-3 font-mono text-sm font-medium text-neutral-800 shadow-card transition-all duration-300"
            :class="
              selectedIndex === i
                ? 'ring-2 ring-accent-600 ring-offset-2 ring-offset-neutral-100'
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
