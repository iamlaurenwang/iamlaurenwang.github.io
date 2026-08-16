<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, Languages } from '@lucide/vue'
import { RouteName } from '@/types/routes'
import PageHeader from '@/components/PageHeader.vue'
import PillTag from '@/components/PillTag.vue'
import ListeningQuiz from '@/components/teaching/ListeningQuiz.vue'
import { availableAccents, toeicQuestions } from '@/data/toeicListening'

interface BuildStep {
  title: string
  detail: string
}

/** 這組題目的製作流程——說明「客製化」實際上做了哪些事。 */
const buildSteps: BuildStep[] = [
  {
    title: '情境跟著課堂走',
    detail:
      '場景依當天上課的主題決定。這四題是飯店結帳、會議室簡報、機場登機、倉庫理貨，接的是同一週練過的職場字彙。',
  },
  {
    title: '干擾選項對準學生的易錯點',
    detail:
      '四段敘述不是隨機湊的。錯的選項刻意放進學生當週寫錯的地方——時態、被動語態、還有「畫面沒出現但語意合理」的陷阱。',
  },
  {
    title: '語音用 TTS 合成，口音可以指定',
    detail:
      '同一份腳本可以產出美式、英式、澳洲等不同口音的版本。多益的聽力本來就混合口音，與其讓學生考場上第一次遇到，不如平常就輪流聽。',
  },
  {
    title: '音檔用自己寫的工具合併',
    detail:
      '四段獨立語音要接成一整軌，手動剪很花時間，所以寫了一支 Base64 → MP3 的合併工具來做。頁面上「播放全部選項」聽到的就是它的產物。',
  },
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-12">
    <RouterLink
      :to="{ name: RouteName.TeachingIndex }"
      class="inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
    >
      <ArrowLeft :size="16" />
      教學作品集
    </RouterLink>

    <div class="mt-6">
      <PageHeader
        title="TOEIC 看圖辨義聽力題組"
        description="四題 TOEIC Part 1。每題先看圖，再聽四段敘述，選出最符合畫面的一段。可以一次播完，也可以逐項慢慢聽。"
      />
    </div>

    <div class="mt-5 flex flex-wrap items-center gap-1.5">
      <PillTag variant="accent">TOEIC</PillTag>
      <PillTag variant="neutral">Part 1</PillTag>
      <PillTag variant="neutral">聽力</PillTag>
      <PillTag variant="neutral">全客製</PillTag>
    </div>

    <!-- 製作說明：圖、音檔、題目都是自己做的 -->
    <section
      class="mt-10 rounded-lg border border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <PageHeader
        title="這組題目是我自己做的"
        level="h2"
        size="section"
        description="圖片、四段語音、題目本身，全部依照上課內容量身做。市售題庫的主題是固定的，接不上當天課堂的內容——寫程式的背景讓我可以自己補上這一段。"
      />

      <ol class="mt-6 flex flex-col gap-5">
        <li v-for="(step, i) in buildSteps" :key="step.title" class="flex gap-4">
          <span
            class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600 font-sans text-xs font-medium text-white"
          >
            {{ i + 1 }}
          </span>
          <div class="flex flex-col gap-1">
            <p class="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-100">
              {{ step.title }}
            </p>
            <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {{ step.detail }}
            </p>
          </div>
        </li>
      </ol>

      <p
        class="mt-6 flex gap-3 border-t border-neutral-200 pt-5 font-sans text-sm leading-relaxed text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
      >
        <Languages :size="18" class="mt-0.5 shrink-0 text-accent-500" />
        <span v-if="availableAccents.length > 1">
          下面的題目可以切換口音，聽的是同一份腳本的不同錄音。多益的聽力本來就混合口音，換個耳朵再練一次。
        </span>
        <span v-else>
          同一份腳本換個設定就能重出英式或澳洲口音。目前站上先放一組，之後補上其他口音，題目上方就會出現切換鈕。
        </span>
      </p>
    </section>

    <div class="mt-10">
      <ListeningQuiz :questions="toeicQuestions" :accents="availableAccents" />
    </div>
  </div>
</template>
