<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

withDefaults(
  defineProps<{
    /** Container CSS declarations (one per line, no selector/braces). */
    css: string
    /** Container Tailwind classes, space separated. */
    tw: string
    /** Optional selected-child CSS declarations. Empty hides the child block. */
    childCss?: string
    childSelector?: string
    childTw?: string
  }>(),
  { childCss: '', childSelector: '.item', childTw: '' },
)

const TABS = ['css', 'tailwind'] as const
type Tab = (typeof TABS)[number]
const tab = ref<Tab>('css')
</script>

<template>
  <div class="space-y-3">
    <div class="flex gap-1.5">
      <button
        v-for="t in TABS"
        :key="t"
        type="button"
        class="rounded-md border px-3 py-1 font-mono text-xs transition-colors"
        :class="
          tab === t
            ? 'border-accent-400 bg-accent-300 text-neutral-800'
            : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
        "
        @click="tab = t"
      >
        {{ t === 'css' ? 'CSS' : 'Tailwind' }}
      </button>
    </div>

    <div v-show="tab === 'css'" class="space-y-3">
      <CodeBlock :code="css" selector=".container" />
      <CodeBlock v-if="childCss" :code="childCss" :selector="childSelector" />
    </div>

    <div v-show="tab === 'tailwind'">
      <pre
        class="overflow-x-auto rounded-lg bg-neutral-800 p-4 font-mono text-xs leading-relaxed text-neutral-100"
      ><code><span class="text-neutral-400">container</span>
&lt;div class="<span class="text-accent-200">{{ tw }}</span>"&gt;<template v-if="childTw">

<span class="text-neutral-400">item</span>
&lt;div class="<span class="text-accent-200">{{ childTw }}</span>"&gt;</template></code></pre>
    </div>
  </div>
</template>
