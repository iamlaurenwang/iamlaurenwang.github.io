<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import {
  Play,
  Pause,
  Check,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Languages,
} from '@lucide/vue'
import BaseButton from '@/components/BaseButton.vue'
import type {
  Accent,
  AccentId,
  AccentTake,
  ListeningQuestion,
  OptionLabel,
} from '@/types/teaching'

const props = defineProps<{
  questions: ListeningQuestion[]
  /** 可切換的口音；少於兩種時不顯示切換鈕 */
  accents?: Accent[]
}>()

const currentIndex = ref(0)
const selected = reactive<Record<string, OptionLabel | undefined>>({})
const revealed = reactive<Record<string, boolean>>({})

const current = computed<ListeningQuestion | undefined>(
  () => props.questions[currentIndex.value],
)

/* --- 口音 --- */
const accentOptions = computed<Accent[]>(() => props.accents ?? [])
const showAccentSwitch = computed(() => accentOptions.value.length > 1)
const activeAccent = ref<AccentId | null>(props.accents?.[0]?.id ?? null)

/** 目前這一題、目前口音的音檔；找不到就退回該題的第一組，確保一定播得出聲音 */
const currentTake = computed<AccentTake | undefined>(() => {
  const question = current.value
  if (!question) return undefined
  return (
    question.takes.find((t) => t.accent === activeAccent.value) ?? question.takes[0]
  )
})

function selectAccent(id: AccentId): void {
  if (activeAccent.value === id) return
  activeAccent.value = id
  stop() // 換口音時停掉正在播的，不然會聽到上一個口音播完
}
const isLast = computed(() => currentIndex.value === props.questions.length - 1)
const allRevealed = computed(() => props.questions.every((q) => revealed[q.id]))
const score = computed(
  () => props.questions.filter((q) => selected[q.id] === q.answer).length,
)

/* --- 音檔播放：共用一個 Audio 實例，同時間只會有一段在播 --- */
const audio = new Audio()
const playingSrc = ref<string | null>(null)
/** 連播佇列：沒有合併軌的口音，用逐段接力代替 */
const queue = ref<string[]>([])
const playingAll = ref(false)

audio.addEventListener('ended', () => {
  const next = queue.value.shift()
  if (next) {
    play(next)
    return
  }
  playingSrc.value = null
  playingAll.value = false
})

function play(src: string): void {
  audio.src = src
  audio.currentTime = 0
  void audio.play()
  playingSrc.value = src
}

function stop(): void {
  audio.pause()
  queue.value = []
  playingSrc.value = null
  playingAll.value = false
}

function toggle(src: string): void {
  if (playingSrc.value === src && !playingAll.value) {
    stop()
    return
  }
  stop()
  play(src)
}

/**
 * 「播放全部選項」：有合併軌就播那一軌，沒有就把 A–D 接力播完。
 * 這樣新增口音時不一定要先產出合併軌，按鈕也不會忽有忽無。
 */
function toggleAll(): void {
  if (playingAll.value) {
    stop()
    return
  }
  const take = currentTake.value
  if (!take) return
  stop()
  playingAll.value = true
  if (take.mergedAudioSrc) {
    play(take.mergedAudioSrc)
    return
  }
  const [first, ...rest] = (current.value?.options ?? []).map(
    (option) => take.audio[option.label],
  )
  if (!first) {
    playingAll.value = false
    return
  }
  queue.value = rest
  play(first)
}

// 換題時停掉正在播的音檔，避免上一題的聲音疊到下一題
watch(currentIndex, stop)
onBeforeUnmount(stop)

/* --- 作答 --- */
function choose(label: OptionLabel): void {
  const question = current.value
  if (!question || revealed[question.id]) return
  selected[question.id] = label
}

function reveal(): void {
  const question = current.value
  if (!question || !selected[question.id]) return
  revealed[question.id] = true
  stop()
}

function go(delta: number): void {
  const next = currentIndex.value + delta
  if (next >= 0 && next < props.questions.length) currentIndex.value = next
}

function restart(): void {
  stop()
  props.questions.forEach((q) => {
    delete selected[q.id]
    delete revealed[q.id]
  })
  currentIndex.value = 0
}

function optionClass(question: ListeningQuestion, label: OptionLabel): string {
  const isSelected = selected[question.id] === label
  if (!revealed[question.id]) {
    return isSelected
      ? 'border-accent-500 bg-accent-50 dark:bg-accent-500/10'
      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700'
  }
  if (label === question.answer)
    return 'border-success bg-green-50 dark:bg-success/10'
  if (isSelected) return 'border-error bg-red-50 dark:bg-error/10'
  return 'border-neutral-200 bg-neutral-50 opacity-60 dark:border-neutral-800 dark:bg-neutral-900'
}
</script>

<template>
  <div v-if="current" class="flex flex-col gap-6">
    <!-- 進度 -->
    <div class="flex items-center justify-between">
      <p
        class="font-sans text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
      >
        第 {{ currentIndex + 1 }} 題 / 共 {{ questions.length }} 題
      </p>
      <div class="flex gap-1.5">
        <span
          v-for="(q, i) in questions"
          :key="q.id"
          class="h-1.5 w-6 rounded-full transition-colors"
          :class="
            revealed[q.id]
              ? selected[q.id] === q.answer
                ? 'bg-success'
                : 'bg-error'
              : i === currentIndex
                ? 'bg-accent-500'
                : 'bg-neutral-200 dark:bg-neutral-700'
          "
        />
      </div>
    </div>

    <!-- 情境圖 -->
    <img
      :src="current.image.src"
      :alt="current.image.alt"
      :width="current.image.width"
      :height="current.image.height"
      decoding="async"
      class="w-full rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
    />

    <!-- 口音切換：只有一種口音時不顯示 -->
    <div
      v-if="showAccentSwitch"
      class="flex flex-wrap items-center gap-3 rounded-lg bg-neutral-100 px-4 py-3 dark:bg-neutral-900"
    >
      <span
        class="flex items-center gap-1.5 font-sans text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
      >
        <Languages :size="15" />
        口音
      </span>
      <div class="flex flex-wrap gap-1.5" role="radiogroup" aria-label="選擇口音">
        <button
          v-for="accent in accentOptions"
          :key="accent.id"
          type="button"
          role="radio"
          :aria-checked="activeAccent === accent.id"
          class="rounded-full px-3.5 py-1.5 font-sans text-xs font-medium transition-colors duration-150"
          :class="
            activeAccent === accent.id
              ? 'bg-accent-600 text-white'
              : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
          "
          @click="selectAccent(accent.id)"
        >
          {{ accent.label }}
          <span
            v-if="accent.hint"
            :class="activeAccent === accent.id ? 'text-white/70' : 'text-neutral-400'"
          >
            {{ accent.hint }}
          </span>
        </button>
      </div>
      <p class="font-sans text-xs text-neutral-400 dark:text-neutral-500">
        同一份腳本，換個耳朵再練一次
      </p>
    </div>

    <!-- 播放全部 -->
    <div v-if="currentTake" class="flex items-center gap-3">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-4 py-2 font-sans text-sm text-neutral-50 transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
        @click="toggleAll"
      >
        <component :is="playingAll ? Pause : Play" :size="16" />
        {{ playingAll ? '暫停' : '播放全部選項' }}
      </button>
      <p class="font-sans text-xs text-neutral-400 dark:text-neutral-500">
        或逐項聽下方 A–D
      </p>
    </div>

    <!-- 選項 -->
    <div class="flex flex-col gap-2" role="radiogroup" aria-label="選項">
      <div
        v-for="option in current.options"
        :key="option.label"
        class="flex flex-col gap-2 rounded-lg border p-3 transition-colors"
        :class="optionClass(current, option.label)"
      >
        <div class="flex items-center gap-3">
          <button
            type="button"
            role="radio"
            :aria-checked="selected[current.id] === option.label"
            :disabled="revealed[current.id]"
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-sans text-sm font-medium transition-colors disabled:cursor-default"
            :class="
              selected[current.id] === option.label
                ? 'border-transparent bg-accent-600 text-white'
                : 'border-neutral-300 text-neutral-500 dark:border-neutral-600 dark:text-neutral-400'
            "
            @click="choose(option.label)"
          >
            {{ option.label }}
          </button>

          <button
            v-if="currentTake"
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs text-neutral-600 transition-colors hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
            :aria-label="`播放選項 ${option.label}`"
            @click="toggle(currentTake.audio[option.label])"
          >
            <component
              :is="playingSrc === currentTake.audio[option.label] ? Pause : Play"
              :size="14"
            />
            {{ playingSrc === currentTake.audio[option.label] ? '播放中' : '播放' }}
          </button>

          <span class="flex-1" />

          <Check
            v-if="revealed[current.id] && option.label === current.answer"
            :size="18"
            class="text-success"
          />
          <X
            v-else-if="
              revealed[current.id] && selected[current.id] === option.label
            "
            :size="18"
            class="text-error"
          />
        </div>

        <p
          v-if="revealed[current.id] && option.transcript"
          class="pl-11 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
        >
          {{ option.transcript }}
        </p>
      </div>
    </div>

    <!-- 解析 -->
    <div
      v-if="revealed[current.id] && current.explanation"
      class="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900"
    >
      <p
        class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
      >
        {{ current.explanation }}
      </p>
    </div>

    <!-- 操作列 -->
    <div
      class="flex items-center justify-between gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-800 disabled:opacity-40 disabled:hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100"
        :disabled="currentIndex === 0"
        @click="go(-1)"
      >
        <ChevronLeft :size="16" />
        上一題
      </button>

      <BaseButton
        v-if="!revealed[current.id]"
        variant="primary"
        :disabled="!selected[current.id]"
        @click="reveal"
      >
        對答案
      </BaseButton>

      <button
        v-else-if="!isLast"
        type="button"
        class="inline-flex items-center gap-1 font-sans text-sm font-medium text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400"
        @click="go(1)"
      >
        下一題
        <ChevronRight :size="16" />
      </button>

      <span v-else class="font-sans text-sm text-neutral-400"
        >已是最後一題</span
      >

      <button
        type="button"
        class="inline-flex items-center gap-1 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
        @click="restart"
      >
        <RotateCcw :size="14" />
        重做
      </button>
    </div>

    <!-- 總分 -->
    <div
      v-if="allRevealed"
      class="rounded-lg border border-accent-200 bg-accent-50 p-5 text-center dark:border-accent-500/30 dark:bg-accent-500/10"
    >
      <p class="font-serif text-3xl text-neutral-800 dark:text-neutral-100">
        {{ score }} / {{ questions.length }}
      </p>
      <p class="mt-1 font-sans text-sm text-neutral-500 dark:text-neutral-400">
        {{
          score === questions.length
            ? '全對，聽力穩定。'
            : '再聽一次答錯的題目，注意動詞時態與畫面是否相符。'
        }}
      </p>
    </div>
  </div>
</template>
