<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { AlertCircle, Download, Merge, Plus, Trash2 } from '@lucide/vue'
import BaseButton from '@/components/BaseButton.vue'
import PageHeader from '@/components/PageHeader.vue'
import PillTag from '@/components/PillTag.vue'
import type { Base64AudioItem } from '@/types/visuals'
import {
  base64ToMp3Blob,
  downloadBlob,
  itemFilename,
  useAudioMerge,
} from '@/composables/useAudioMerge'

type InputMode = 'manual' | 'json'

const MODES: { value: InputMode; label: string }[] = [
  { value: 'manual', label: 'One by one' },
  { value: 'json', label: 'Paste JSON' },
]

const JSON_PLACEHOLDER = `[
  { "id": "track_01", "audio": "//NkxAA..." },
  { "id": "track_02", "audio": "//NkxAA..." }
]`

const mode = ref<InputMode>('manual')

/* ── Manual entry ── */

interface Row {
  id: string
  audio: string
}

const rows = ref<Row[]>([{ id: '', audio: '' }])

function addRow(): void {
  rows.value.push({ id: '', audio: '' })
}

function removeRow(index: number): void {
  rows.value.splice(index, 1)
  if (rows.value.length === 0) addRow()
}

/* ── JSON entry ── */

const jsonText = ref('')
const jsonError = ref<string | null>(null)

const jsonItems = computed<Base64AudioItem[]>(() => {
  const raw = jsonText.value.trim()
  if (!raw) {
    jsonError.value = null
    return []
  }
  try {
    const parsed: unknown = JSON.parse(raw)
    const entries = Array.isArray(parsed) ? parsed : [parsed]
    const items = entries.filter(
      (entry): entry is Base64AudioItem =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as Base64AudioItem).audio === 'string',
    )
    jsonError.value = items.length
      ? null
      : '找不到任何含有 audio 欄位（字串）的項目。'
    return items
  } catch {
    jsonError.value = 'JSON 格式有誤，無法解析。'
    return []
  }
})

/** The effective list, whichever input mode is active. */
const items = computed<Base64AudioItem[]>(() => {
  if (mode.value === 'json') return jsonItems.value
  return rows.value
    .filter((row) => row.audio.trim())
    .map((row) =>
      row.id.trim()
        ? { id: row.id.trim(), audio: row.audio }
        : { audio: row.audio },
    )
})

const hasItems = computed(() => items.value.length > 0)

/* ── Previews ── */

interface Preview {
  url: string | null
  error: string | null
}

// Keyed by the base64 string itself, so editing an id never rebuilds blobs.
const previewCache = new Map<string, Preview>()
const previews = ref<Preview[]>([])

watch(
  items,
  (list) => {
    const seen = new Set<string>()
    previews.value = list.map((item) => {
      seen.add(item.audio)
      let preview = previewCache.get(item.audio)
      if (!preview) {
        try {
          preview = {
            url: URL.createObjectURL(base64ToMp3Blob(item.audio)),
            error: null,
          }
        } catch {
          preview = { url: null, error: '不是有效的 base64 內容。' }
        }
        previewCache.set(item.audio, preview)
      }
      return preview
    })

    for (const [key, preview] of previewCache) {
      if (seen.has(key)) continue
      if (preview.url) URL.revokeObjectURL(preview.url)
      previewCache.delete(key)
    }
  },
  { immediate: true, deep: true },
)

onUnmounted(() => {
  for (const preview of previewCache.values()) {
    if (preview.url) URL.revokeObjectURL(preview.url)
  }
  previewCache.clear()
})

/* ── Actions ── */

const { isMerging, progress, error, mergeToMp3 } = useAudioMerge()

function downloadOne(item: Base64AudioItem, index: number): void {
  downloadBlob(base64ToMp3Blob(item.audio), itemFilename(item, index))
}

/** Fires one download per clip, spaced out so browsers do not drop them. */
function downloadEach(): void {
  items.value.forEach((item, index) => {
    window.setTimeout(() => downloadOne(item, index), index * 300)
  })
}

async function mergeAndDownload(): Promise<void> {
  const blob = await mergeToMp3(items.value)
  if (blob) downloadBlob(blob, 'merged.mp3')
}

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-xs text-neutral-700 placeholder:text-neutral-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-600'
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-10 px-6 py-12">
    <PageHeader
      title="Base64 → MP3"
      description="把 base64 音訊轉成可試聽、可下載的 MP3，也能把多段音訊合併成單一檔案。全部在瀏覽器內完成，不會上傳任何資料。"
    />

    <!-- Input -->
    <section class="space-y-4">
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="option in MODES"
          :key="option.value"
          type="button"
          class="rounded-md border px-3 py-1.5 font-mono text-xs transition-colors duration-150"
          :class="
            option.value === mode
              ? 'border-accent-400 bg-accent-50 text-accent-700 dark:border-accent-500/40 dark:bg-accent-500/10 dark:text-accent-300'
              : 'border-neutral-200 bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'
          "
          @click="mode = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <!-- Manual rows -->
      <div v-if="mode === 'manual'" class="space-y-3">
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div class="flex items-center gap-3">
            <input
              v-model="row.id"
              type="text"
              :placeholder="`audio_${index + 1}`"
              :class="[inputClass, 'w-48 py-2']"
            />
            <span
              class="font-sans text-xs text-neutral-400 dark:text-neutral-500"
            >
              id（選填，作為檔名）
            </span>
            <button
              type="button"
              class="ml-auto rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
              aria-label="移除這一筆"
              @click="removeRow(index)"
            >
              <Trash2 :size="14" />
            </button>
          </div>
          <textarea
            v-model="row.audio"
            rows="3"
            placeholder="在此貼上 base64 音訊內容…"
            :class="[inputClass, 'mt-3 resize-y break-all']"
          />
        </div>

        <BaseButton @click="addRow">
          <Plus :size="14" />
          新增一筆
        </BaseButton>
      </div>

      <!-- JSON paste -->
      <div v-else class="space-y-2">
        <textarea
          v-model="jsonText"
          rows="10"
          :placeholder="JSON_PLACEHOLDER"
          :class="[inputClass, 'resize-y']"
        />
        <p
          v-if="jsonError"
          class="flex items-center gap-1.5 font-sans text-xs text-error"
        >
          <AlertCircle :size="13" />
          {{ jsonError }}
        </p>
        <p
          v-else
          class="font-sans text-xs text-neutral-400 dark:text-neutral-500"
        >
          一個物件陣列，每個物件用 <code class="font-mono">audio</code> 欄位存放
          base64 字串。
        </p>
      </div>
    </section>

    <!-- Clips -->
    <section v-if="hasItems" class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <PageHeader level="h2" size="section" title="音訊清單" />
        <PillTag variant="accent" size="sm">{{ items.length }}</PillTag>
      </div>

      <ul class="space-y-2">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <span
            class="w-40 shrink-0 truncate font-mono text-xs text-neutral-600 dark:text-neutral-300"
          >
            {{ itemFilename(item, index) }}
          </span>

          <audio
            v-if="previews[index]?.url"
            :src="previews[index]?.url ?? undefined"
            controls
            class="h-8 flex-1"
          />
          <span
            v-else
            class="flex flex-1 items-center gap-1.5 font-sans text-xs text-error"
          >
            <AlertCircle :size="13" />
            {{ previews[index]?.error ?? '無法讀取這一筆音訊。' }}
          </span>

          <BaseButton class="shrink-0" @click="downloadOne(item, index)">
            <Download :size="14" />
            下載
          </BaseButton>
        </li>
      </ul>
    </section>

    <!-- Actions -->
    <section v-if="hasItems" class="space-y-3">
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton @click="downloadEach">
          <Download :size="14" />
          分別下載
        </BaseButton>

        <BaseButton
          variant="primary"
          :disabled="isMerging"
          @click="mergeAndDownload"
        >
          <Merge :size="14" />
          {{ isMerging ? `合併中… ${progress}%` : '合併並下載' }}
        </BaseButton>
      </div>

      <p
        v-if="error"
        class="flex items-center gap-1.5 font-sans text-xs text-error"
      >
        <AlertCircle :size="13" />
        {{ error }}
      </p>

      <p
        class="font-sans text-xs leading-relaxed text-neutral-400 dark:text-neutral-500"
      >
        「分別下載」會原封不動地逐檔存下每段音訊，瀏覽器可能會詢問是否允許一次下載多個檔案。
        「合併並下載」則會解碼每段音訊、串接後重新編碼成單一的 128&nbsp;kbps
        MP3。
      </p>
    </section>
  </div>
</template>
