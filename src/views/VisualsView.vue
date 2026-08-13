<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router'
import { RouteName } from '@/types/routes'

interface SubNavLink {
  label: string
  to: { name: RouteName }
  exact: boolean
}

const subNav: SubNavLink[] = [
  { label: 'Overview', to: { name: RouteName.VisualsIndex }, exact: true },
  { label: 'Flex & Grid', to: { name: RouteName.VisualsFlexGrid }, exact: false },
  { label: 'JS Concepts', to: { name: RouteName.VisualsJs }, exact: false },
  { label: 'Animation', to: { name: RouteName.VisualsAnimation }, exact: false },
]
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-black">
    <nav class="border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-sm dark:border-neutral-800 dark:bg-black/80">
      <div class="mx-auto flex max-w-5xl gap-6 px-6">
        <RouterLink
          v-for="link in subNav"
          :key="link.label"
          v-slot="{ href, navigate, isActive, isExactActive }"
          :to="link.to"
          custom
        >
          <a
            :href="href"
            class="border-b-2 py-3.5 font-sans text-sm transition-colors"
            :class="
              (link.exact ? isExactActive : isActive)
                ? 'border-accent-400 text-neutral-800 dark:text-neutral-100'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100'
            "
            @click="navigate"
          >
            {{ link.label }}
          </a>
        </RouterLink>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
