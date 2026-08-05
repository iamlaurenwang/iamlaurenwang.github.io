<script lang="ts" setup>
import FlexPlayground from '@/components/visuals/FlexPlayground.vue'
import GridPlayground from '@/components/visuals/GridPlayground.vue'
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-16 px-6 py-12">
    <header>
      <h1 class="font-serif text-4xl text-neutral-800">Flexbox &amp; Grid</h1>
      <p class="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-neutral-500">
        Two interactive playgrounds for building intuition. Toggle each property, watch the items
        rearrange, and read the generated CSS. Flexbox handles one axis at a time; Grid handles
        rows and columns together.
      </p>
    </header>

    <FlexPlayground />

    <hr class="border-neutral-200" />

    <GridPlayground />
  </div>
</template>
