<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import CodeSnippet from '@/components/visuals/CodeSnippet.vue'

/**
 * Closure in async code: `sendCode` returns a `counter` function that still
 * remembers `count`, and the interval callback remembers `timer` so it can
 * clear itself. The state survives after sendCode() has already returned.
 */
const DURATION = 5

const label = ref<string>('寄送驗證碼')
const disabled = ref<boolean>(false)
let timer: number | null = null

function sendCode(): () => void {
  let count = DURATION
  label.value = `請稍候 ${count} 秒`
  disabled.value = true

  return function counter() {
    timer = window.setInterval(() => {
      count--
      if (count > 0) {
        label.value = `請稍候 ${count} 秒`
      } else {
        if (timer !== null) window.clearInterval(timer)
        timer = null
        disabled.value = false
        label.value = '重新寄送驗證碼'
      }
    }, 1000)
  }
}

function handleSend(): void {
  if (disabled.value) return
  const start = sendCode() // returns the counter closure
  start() // run it — the closure keeps `count` alive
}

onUnmounted(() => {
  if (timer !== null) window.clearInterval(timer)
})

const code = `function sendCode() {
  let count = 5
  btn.disabled = true

  return function counter() {          // closure over count + timer
    const timer = setInterval(() => {
      count--                          // remembers count
      if (count === 0) {
        clearInterval(timer)           // remembers timer
        btn.disabled = false
      }
    }, 1000)
  }
}

const start = sendCode()  // step 1: get the closure
start()                   // step 2: run it`
</script>

<template>
  <div class="grid items-center gap-6 md:grid-cols-[1fr_1.1fr]">
    <!-- Live -->
    <div class="flex justify-center">
      <button
        type="button"
        class="rounded-md border px-6 py-3 font-sans text-sm font-medium transition-colors"
        :class="
          disabled
            ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500'
            : 'border-accent-500 bg-accent-500 text-white hover:brightness-95'
        "
        :disabled="disabled"
        @click="handleSend"
      >
        {{ label }}
      </button>
    </div>

    <!-- Code -->
    <CodeSnippet :code="code" />
  </div>
</template>
