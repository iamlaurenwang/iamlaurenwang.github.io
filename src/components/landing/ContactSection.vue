<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { RouteName } from '@/types/routes'
</script>

<template>
  <section class="bg-neutral-100">
    <div class="mx-auto max-w-5xl border-t border-neutral-200 px-6 py-20">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <h2 class="max-w-sm font-serif text-3xl font-light leading-tight text-neutral-800 md:text-5xl">
          Let's build<br />something together.
        </h2>
        <RouterLink
          :to="{ name: RouteName.Contact }"
          class="inline-block shrink-0 border border-neutral-900 px-7 py-3 font-sans text-xs uppercase tracking-[0.18em] text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        >
          Get in touch
        </RouterLink>
      </div>
    </div>
  </section>
</template>
