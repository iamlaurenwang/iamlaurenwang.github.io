<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppFooter from '@/components/layouts/AppFooter.vue'

const route = useRoute()
const showLayout = computed(() => !route.meta.hideLayout)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 font-sans text-neutral-700">
    <AppHeader v-if="showLayout" />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter v-if="showLayout" />
  </div>
</template>
