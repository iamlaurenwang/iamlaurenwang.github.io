<script setup lang="ts">
type PillVariant = 'accent' | 'neutral' | 'muted' | 'success' | 'warning'
type PillSize = 'sm' | 'xs'

withDefaults(defineProps<{
  variant?: PillVariant
  size?: PillSize
}>(), {
  variant: 'neutral',
  size: 'sm',
})

const variantClass: Record<PillVariant, string> = {
  accent:  'bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400',
  neutral: 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400',
  muted:   'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500',
  success: 'bg-green-50 text-success dark:bg-success/10',
  warning: 'bg-yellow-50 text-warning dark:bg-warning/10',
}

const sizeClass: Record<PillSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs font-medium',
  xs: 'px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full font-sans"
    :class="[variantClass[variant], sizeClass[size]]"
  >
    <slot />
  </span>
</template>
