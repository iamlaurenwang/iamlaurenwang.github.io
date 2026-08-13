<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'
import { useEmbedMode } from '@/composables/useEmbedMode'

const route = useRoute()
const showLayout = computed(() => !route.meta.hideLayout)

const { detectEmbed } = useEmbedMode()
watch(() => route.query, detectEmbed, { immediate: true })
</script>

<template>
  <div
    class="flex min-h-screen flex-col bg-neutral-50 font-sans text-neutral-700 dark:bg-black dark:text-neutral-300"
  >
    <AppHeader v-if="showLayout" />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter v-if="showLayout" />
  </div>
</template>
