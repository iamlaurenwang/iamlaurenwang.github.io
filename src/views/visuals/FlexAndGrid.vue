<script lang="ts" setup>
import FlexPlayground from '@/components/visuals/FlexPlayground.vue'
import GridPlayground from '@/components/visuals/GridPlayground.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-16 px-6 py-12">
    <PageHeader
      title="Flexbox & Grid"
      description="Two interactive playgrounds for building intuition. Toggle each property, watch the items rearrange, and read the generated CSS. Flexbox handles one axis at a time; Grid handles rows and columns together."
    />

    <FlexPlayground />

    <hr class="border-neutral-200 dark:border-neutral-800" />

    <GridPlayground />
  </div>
</template>
