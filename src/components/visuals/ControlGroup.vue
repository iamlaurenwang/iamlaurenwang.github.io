<script lang="ts" setup generic="T extends string">
defineProps<{
  /** The CSS property name this control maps to, e.g. "justify-content". */
  label: string
  /** Selectable values for the property. */
  options: readonly T[]
  modelValue: T
}>()

defineEmits<{
  'update:modelValue': [value: T]
}>()
</script>

<template>
  <div>
    <p class="mb-2 font-mono text-xs tracking-wide text-neutral-500">{{ label }}</p>
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        class="rounded-md border px-2.5 py-1 font-mono text-xs transition-colors duration-150"
        :class="
          option === modelValue
            ? 'border-accent-400 bg-accent-300 text-neutral-800'
            : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700'
        "
        @click="$emit('update:modelValue', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
