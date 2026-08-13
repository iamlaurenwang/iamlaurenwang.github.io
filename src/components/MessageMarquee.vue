<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Message } from '@/types/message'

const props = defineProps<{
  messages: Message[]
}>()

const isPaused = ref(false)
const shouldScroll = computed(() => props.messages.length >= 4)
</script>

<template>
  <div
    class="overflow-hidden"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <div
      class="flex w-max gap-5"
      :class="shouldScroll ? 'animate-marquee' : 'flex-wrap justify-center px-6'"
      :style="shouldScroll ? { animationPlayState: isPaused ? 'paused' : 'running' } : {}"
    >
      <template v-for="pass in (shouldScroll ? 2 : 1)" :key="pass">
        <div
          v-for="msg in messages"
          :key="`${pass}-${msg.id}`"
          class="w-72 shrink-0 rounded-xl border border-neutral-200 bg-white p-5 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div class="mb-3 flex items-center gap-3">
            <img
              v-if="msg.photoURL"
              :src="msg.photoURL"
              :alt="msg.author"
              class="size-8 shrink-0 rounded-full object-cover"
            />
            <div
              v-else
              class="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-200 dark:bg-accent-500/25"
            >
              <span class="font-sans text-xs font-medium text-accent-700 dark:text-accent-300">
                {{ msg.author[0] }}
              </span>
            </div>
            <span class="font-sans text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ msg.author }}</span>
          </div>
          <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{{ msg.text }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
