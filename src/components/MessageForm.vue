<script setup lang="ts">
import { ref } from 'vue'
import { LogIn, Send } from '@lucide/vue'

// 預覽用：之後串 Firebase 時此 ref 改由 useAuth 提供
const isLoggedIn = ref(false)
const mockUser = { displayName: '王大明', photoURL: '' }
const text = ref('')
const MAX = 200

function togglePreview() {
  isLoggedIn.value = !isLoggedIn.value
  text.value = ''
}
</script>

<template>
  <!-- 未登入 -->
  <div v-if="!isLoggedIn" class="flex flex-col items-center gap-4 py-8">
    <p class="font-sans text-sm text-neutral-400">登入後即可留言</p>
    <button
      type="button"
      class="flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-6 py-2.5 font-sans text-sm text-neutral-700 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <!-- Google G logo -->
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      以 Google 帳號登入
    </button>
    <!-- 預覽切換，串 Firebase 後移除 -->
    <button
      type="button"
      class="font-sans text-xs text-neutral-300 underline underline-offset-2 hover:text-neutral-400"
      @click="togglePreview"
    >
      [預覽] 切換登入狀態
    </button>
  </div>

  <!-- 已登入 -->
  <div v-else class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <img
        v-if="mockUser.photoURL"
        :src="mockUser.photoURL"
        :alt="mockUser.displayName"
        class="size-8 shrink-0 rounded-full object-cover"
      />
      <div
        v-else
        class="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-200"
      >
        <span class="font-sans text-xs font-medium text-accent-700">
          {{ mockUser.displayName[0] }}
        </span>
      </div>
      <span class="font-sans text-sm font-medium text-neutral-700">{{ mockUser.displayName }}</span>
      <button
        type="button"
        class="ml-auto flex items-center gap-1.5 font-sans text-xs text-neutral-400 transition-colors hover:text-neutral-600"
        @click="togglePreview"
      >
        <LogIn :size="12" />
        登出
      </button>
    </div>

    <textarea
      v-model="text"
      :maxlength="MAX"
      rows="3"
      placeholder="留下你的心得或回饋…"
      class="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 font-sans text-sm leading-relaxed text-neutral-700 placeholder:text-neutral-300 focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-200"
    />

    <div class="flex items-center justify-between">
      <span class="font-sans text-xs text-neutral-300">{{ text.length }} / {{ MAX }}</span>
      <button
        type="button"
        :disabled="!text.trim()"
        class="flex items-center gap-2 rounded-full bg-accent-500 px-6 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send :size="13" />
        送出留言
      </button>
    </div>
  </div>
</template>
