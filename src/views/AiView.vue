<script setup lang="ts">
import { ref } from "vue";
import { Schema } from "firebase/ai";
import { Sparkles, Send, PenLine, MessageCircle, CheckCircle2, AlertCircle } from "@lucide/vue";
import { useAI } from "@/composables/useAI";
import BaseButton from "@/components/BaseButton.vue";

/* ── Feature 1: English writing feedback (structured JSON output) ── */

interface Correction {
  original: string;
  suggestion: string;
  reason: string;
}

interface WritingFeedback {
  level: string;
  score: number;
  summary: string;
  strengths: string[];
  corrections: Correction[];
  revised: string;
}

const feedbackSchema = Schema.object({
  properties: {
    level: Schema.string({ description: "CEFR level, e.g. A2, B1, B2" }),
    score: Schema.number({ description: "Overall score from 0 to 100" }),
    summary: Schema.string({ description: "One-sentence overview in Traditional Chinese" }),
    strengths: Schema.array({ items: Schema.string() }),
    corrections: Schema.array({
      items: Schema.object({
        properties: {
          original: Schema.string(),
          suggestion: Schema.string(),
          reason: Schema.string({ description: "Why, in Traditional Chinese" }),
        },
      }),
    }),
    revised: Schema.string({ description: "A polished version of the whole text" }),
  },
});

const writer = useAI({
  model: "gemini-3.6-flash",
  systemInstruction:
    "You are Lauren, an experienced English tutor for Taiwanese students (GEPT / 學測 / TOEIC). " +
    "Grade the student's English writing fairly and encouragingly. " +
    "Write `summary` and each correction `reason` in Traditional Chinese; keep English examples in English. " +
    "Respond ONLY with JSON that matches the provided schema.",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: feedbackSchema,
  },
});

const essay = ref("");
const feedback = ref<WritingFeedback | null>(null);

const sampleEssay =
  "Last weekend I go to the mountain with my family. The weather are very nice and " +
  "we saw many beautiful flower. I think it is a good experience and I want to go there " +
  "again in the future because it make me feel relax.";

async function runFeedback() {
  if (!essay.value.trim() || writer.isLoading.value) return;
  feedback.value = null;
  try {
    const raw = await writer.generate(essay.value.trim());
    feedback.value = JSON.parse(raw) as WritingFeedback;
  } catch {
    /* error surfaced via writer.error */
  }
}

function scoreColor(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-error";
}

/* ── Feature 2: Free-form ask (streaming) ── */

const chat = useAI({
  model: "gemini-3.6-flash",
  systemInstruction:
    "You are a friendly assistant on Lauren Wang's personal website. " +
    "Lauren is a frontend engineer (Vue / TypeScript / Tailwind) and an English tutor. " +
    "Answer concisely in Traditional Chinese unless the user writes in another language.",
});

const question = ref("");
const answer = ref("");

async function ask() {
  if (!question.value.trim() || chat.isLoading.value) return;
  answer.value = "";
  try {
    await chat.stream(question.value.trim(), (chunk) => {
      answer.value += chunk;
    });
  } catch {
    /* error surfaced via chat.error */
  }
}
</script>

<template>
  <!-- Hero -->
  <div class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex items-center gap-2 text-accent-600 dark:text-accent-400">
        <Sparkles :size="16" />
        <span class="font-sans text-xs font-medium tracking-widest uppercase"
          >Firebase AI Logic</span
        >
      </div>
      <h1 class="mt-3 font-serif text-4xl text-dark/60 dark:text-neutral-100">AI 遊樂場</h1>
      <p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-dark/60 dark:text-neutral-400">
        由 Gemini（<code class="font-mono text-xs">gemini-3.6-flash</code>）直接在前端驅動，
        無需自建後端。以下是兩個示範：英文寫作批改與即時問答。
      </p>
    </div>
  </div>

  <!-- Feature 1: Writing feedback -->
  <div class="bg-neutral-50 dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="mb-8 flex items-center gap-3">
        <div
          class="rounded-lg bg-accent-100 p-2.5 text-accent-700 dark:bg-accent-500/20 dark:text-accent-300"
        >
          <PenLine :size="20" />
        </div>
        <div>
          <h2 class="font-serif text-2xl text-neutral-800 dark:text-neutral-100">英文寫作批改</h2>
          <p class="font-sans text-sm text-neutral-500 dark:text-neutral-400">
            貼上一段英文，取得評分與修改建議（結構化輸出）
          </p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2 md:items-start">
        <!-- Input -->
        <div class="flex flex-col gap-3">
          <textarea
            v-model="essay"
            rows="8"
            placeholder="Write or paste a few English sentences here…"
            class="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 font-sans text-sm leading-relaxed text-neutral-700 placeholder:text-neutral-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-600"
          />
          <div class="flex items-center gap-3">
            <BaseButton variant="primary" @click="runFeedback">
              <Sparkles :size="14" />
              {{ writer.isLoading.value ? "批改中…" : "開始批改" }}
            </BaseButton>
            <button
              type="button"
              class="font-sans text-xs text-neutral-400 underline underline-offset-2 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
              @click="essay = sampleEssay"
            >
              填入範例
            </button>
          </div>
          <p
            v-if="writer.error.value"
            class="flex items-center gap-1.5 font-sans text-xs text-error"
          >
            <AlertCircle :size="13" />
            {{ writer.error.value }}
          </p>
        </div>

        <!-- Result -->
        <div
          class="rounded-xl border border-neutral-200 bg-white p-6 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div
            v-if="!feedback"
            class="flex h-full min-h-40 items-center justify-center text-center"
          >
            <p class="font-sans text-sm text-neutral-400 dark:text-neutral-500">
              批改結果會顯示在這裡
            </p>
          </div>

          <div v-else class="flex flex-col gap-5">
            <!-- Score -->
            <div
              class="flex items-baseline gap-3 border-b border-neutral-100 pb-4 dark:border-neutral-800"
            >
              <span class="font-serif text-4xl font-light" :class="scoreColor(feedback.score)">
                {{ feedback.score }}
              </span>
              <span class="font-sans text-xs text-neutral-400 dark:text-neutral-500">/ 100</span>
              <span
                class="ml-auto rounded-full bg-accent-100 px-3 py-1 font-sans text-xs font-medium text-accent-700 dark:bg-accent-500/20 dark:text-accent-300"
              >
                {{ feedback.level }}
              </span>
            </div>

            <p class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {{ feedback.summary }}
            </p>

            <!-- Strengths -->
            <div v-if="feedback.strengths.length">
              <p
                class="mb-2 font-sans text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500"
              >
                做得好的地方
              </p>
              <ul class="space-y-1.5">
                <li
                  v-for="(s, i) in feedback.strengths"
                  :key="i"
                  class="flex gap-2 font-sans text-sm text-neutral-600 dark:text-neutral-300"
                >
                  <CheckCircle2 :size="15" class="mt-0.5 shrink-0 text-success" />
                  <span>{{ s }}</span>
                </li>
              </ul>
            </div>

            <!-- Corrections -->
            <div v-if="feedback.corrections.length">
              <p
                class="mb-2 font-sans text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500"
              >
                修改建議
              </p>
              <ul class="space-y-3">
                <li
                  v-for="(c, i) in feedback.corrections"
                  :key="i"
                  class="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800/50"
                >
                  <p class="font-sans text-sm">
                    <span class="text-error line-through">{{ c.original }}</span>
                    <span class="mx-1.5 text-neutral-300 dark:text-neutral-600">→</span>
                    <span class="font-medium text-success">{{ c.suggestion }}</span>
                  </p>
                  <p class="mt-1 font-sans text-xs text-neutral-500 dark:text-neutral-400">
                    {{ c.reason }}
                  </p>
                </li>
              </ul>
            </div>

            <!-- Revised -->
            <div v-if="feedback.revised">
              <p
                class="mb-2 font-sans text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500"
              >
                修改後範例
              </p>
              <p
                class="rounded-lg border border-accent-200 bg-accent-50 p-3 font-sans text-sm leading-relaxed text-neutral-700 dark:border-accent-500/30 dark:bg-accent-500/10 dark:text-neutral-200"
              >
                {{ feedback.revised }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Feature 2: Free ask (streaming) -->
  <div class="bg-white dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="mb-8 flex items-center gap-3">
        <div
          class="rounded-lg bg-accent-100 p-2.5 text-accent-700 dark:bg-accent-500/20 dark:text-accent-300"
        >
          <MessageCircle :size="20" />
        </div>
        <div>
          <h2 class="font-serif text-2xl text-neutral-800 dark:text-neutral-100">即時問答</h2>
          <p class="font-sans text-sm text-neutral-500 dark:text-neutral-400">
            問任何問題，回應逐字串流顯示
          </p>
        </div>
      </div>

      <div class="mx-auto max-w-2xl">
        <div class="flex gap-3">
          <input
            v-model="question"
            type="text"
            placeholder="例如：用一句話解釋什麼是 Vue 的 ref？"
            class="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-sans text-sm text-neutral-700 placeholder:text-neutral-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-200 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-600"
            @keydown.enter="ask"
          />
          <BaseButton variant="primary" @click="ask">
            <Send :size="14" />
            {{ chat.isLoading.value ? "…" : "送出" }}
          </BaseButton>
        </div>

        <p
          v-if="chat.error.value"
          class="mt-3 flex items-center gap-1.5 font-sans text-xs text-error"
        >
          <AlertCircle :size="13" />
          {{ chat.error.value }}
        </p>

        <div
          v-if="answer"
          class="mt-5 rounded-xl border border-neutral-200 bg-neutral-50 p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
        >
          {{ answer }}<span v-if="chat.isLoading.value" class="ml-0.5 animate-pulse">▋</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Production note -->
  <!-- <div class="bg-neutral-50 dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 pb-16">
      <div
        class="flex gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 font-sans text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"
      >
        <AlertCircle :size="16" class="mt-0.5 shrink-0 text-warning" />
        <span>
          正式上線前務必啟用
          <strong class="font-medium text-neutral-700 dark:text-neutral-200">App Check</strong>，
          否則前端的 AI endpoint 可能被盜用而產生費用。AI 產出僅供參考。
        </span>
      </div>
    </div>
  </div> -->
</template>
