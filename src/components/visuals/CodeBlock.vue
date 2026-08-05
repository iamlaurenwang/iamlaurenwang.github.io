<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  code: string
  selector?: string
}>(), {
  selector: '.container',
})

const indented = computed(() =>
  props.code.split('\n').map(l => '  ' + l).join('\n'),
)
</script>

<template>
  <pre class="overflow-x-auto rounded-lg bg-neutral-800 p-4 font-mono text-xs leading-relaxed text-neutral-100"><code>{{ selector }} {
<span class="text-accent-200">{{ indented }}</span>
}</code></pre>
</template>
