<script setup lang="ts">
import { ref } from "vue";
import { Quote, CheckCircle2, Mail, Sparkles, ArrowUpRight } from "@lucide/vue";
import PillTag from "@/components/PillTag.vue";
import MessageMarquee from "@/components/MessageMarquee.vue";
import MessageForm from "@/components/MessageForm.vue";
import { services, stats, successCases, testimonials, faqs } from "@/data/tutoring";
import type { Message } from "@/types/message";

const openFaq = ref<number | null>(null);

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i;
}

// 假資料，串 Firebase 後替換
const mockMessages: Message[] = [
  {
    id: "1",
    uid: "mock1",
    author: "林小芸",
    photoURL: "",
    text: "老師上課很生動，讓我對英文不再害怕！學測作文從 C 提升到 B，非常感謝。",
    createdAt: new Date("2026-07-15"),
  },
  {
    id: "2",
    uid: "mock2",
    author: "陳大偉",
    photoURL: "",
    text: "上課方式很靈活，會依照我的進度調整教材。GEPT 中級一次通過！",
    createdAt: new Date("2026-07-20"),
  },
  {
    id: "3",
    uid: "mock3",
    author: "王佳慧",
    photoURL: "",
    text: "老師很有耐心，每次上課都讓我收穫滿滿。推薦給想提升英文的同學！",
    createdAt: new Date("2026-07-25"),
  },
  {
    id: "4",
    uid: "mock4",
    author: "張宗翰",
    photoURL: "",
    text: "孩子原本很排斥英文，上了幾堂課後主動要求繼續學！真的很謝謝老師。",
    createdAt: new Date("2026-08-01"),
  },
  {
    id: "5",
    uid: "mock5",
    author: "李妙珍",
    photoURL: "",
    text: "備考期間老師提供很多實用技巧，口試也順利通過了！",
    createdAt: new Date("2026-08-03"),
  },
  {
    id: "6",
    uid: "mock6",
    author: "吳建明",
    photoURL: "",
    text: "課程很紮實，老師會真的了解你的弱點再針對性加強，進步很有感。",
    createdAt: new Date("2026-08-05"),
  },
];
</script>

<template>
  <!-- 1. Hero -->
  <div class="bg-neutral-100">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <!-- <p class="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        English Tutoring
      </p> -->
      <h1 class="font-serif text-4xl text-dark/60">英文家教</h1>
      <p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-dark/60">
        GEPT 考照 · 學測作文 · 主題式英語 · 升學諮詢 — 高師大英語系畢業，7 年+
        教學經驗，陪你找到適合自己的英文學習方式。
      </p>

      
      <!-- Stats -->
      <div class="mt-10 flex flex-wrap gap-x-12 gap-y-6">
        <div v-for="s in stats" :key="s.label">
          <div class="font-serif text-3xl font-light text-dark/60">{{ s.value }}</div>
          <div class="mt-0.5 font-sans text-xs text-neutral-400">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. Services -->
  <div class="bg-neutral-50">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        服務項目
      </p>
      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="svc in services"
          :key="svc.title"
          class="rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
        >
          <div class="flex items-start gap-4">
            <div :class="svc.iconClass" class="shrink-0 rounded-lg p-2.5">
              <component :is="svc.icon" :size="20" />
            </div>
            <div class="min-w-0">
              <h3 class="font-serif text-lg text-neutral-800">{{ svc.title }}</h3>
              <p class="mt-2 font-sans text-sm leading-relaxed text-neutral-500">
                {{ svc.description }}
              </p>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <PillTag v-for="tag in svc.tags" :key="tag" variant="neutral" size="xs">
                  {{ tag }}
                </PillTag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. About Me -->
  <div class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-14">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-16">
        <div class="shrink-0">
          <p class="font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
            About
          </p>
        </div>
        <p class="font-sans text-sm leading-relaxed text-neutral-600 sm:max-w-2xl">
          國立高雄師範大學英語學系畢業，擁有 7 年以上教學經驗，
          教過的學生從小學六年級到大學生、上班族都有。
          擅長根據每個學生的目標和個性，調整課程節奏與教材，讓學習不再是苦差事。
        </p>
      </div>
    </div>
  </div>

  <!-- 4. Success Cases -->
  <div class="bg-neutral-50">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
        <!-- Big stat -->
        <div class="shrink-0 text-center sm:text-left">
          <div class="font-serif text-6xl font-light text-accent-700">80%</div>
          <div class="mt-1 font-sans text-sm text-neutral-500">全民英檢通過率</div>
        </div>

        <!-- Notable alumni -->
        <div>
          <p class="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
            學生考上
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="school in successCases"
              :key="school"
              class="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-sans text-sm text-neutral-700 shadow-card"
            >
              <CheckCircle2 :size="14" class="text-accent-500" />
              {{ school }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 5. Testimonials -->
  <div class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        學生 & 家長回饋
      </p>
      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="t in testimonials"
          :key="t.author"
          class="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-card"
        >
          <Quote :size="20" class="mb-4 shrink-0 text-accent-300" />
          <p class="flex-1 font-sans text-sm leading-relaxed text-neutral-600">{{ t.quote }}</p>
          <div class="mt-5 border-t border-neutral-100 pt-4">
            <div class="font-sans text-sm font-medium text-neutral-700">{{ t.author }}</div>
            <div class="mt-0.5 font-sans text-xs text-neutral-400">{{ t.context }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Messages -->
  <div class="bg-white py-16">
    <div class="mx-auto max-w-5xl px-6">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        學生&家長留言
      </p>
    </div>

    <!-- Marquee: max-w-[904px] = 3 cards (w-72) + 2 gaps (gap-5) -->
    <div class="mx-auto max-w-[904px]">
      <MessageMarquee :messages="mockMessages" />
    </div>

    <!-- Submit form -->
    <div class="mx-auto mt-10 max-w-2xl px-6">
      <MessageForm />
    </div>
  </div>

  <!-- 7. FAQ -->
  <div class="bg-neutral-50">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        常見問題
      </p>
      <div class="divide-y divide-neutral-200">
        <div v-for="(faq, i) in faqs" :key="faq.question" class="py-5">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 text-left"
            @click="toggleFaq(i)"
          >
            <span class="font-sans text-sm font-medium text-neutral-800">{{ faq.question }}</span>
            <span
              class="shrink-0 text-neutral-400 transition-transform duration-200"
              :class="openFaq === i ? 'rotate-45' : ''"
            >
              +
            </span>
          </button>
          <p v-show="openFaq === i" class="mt-3 font-sans text-sm leading-relaxed text-neutral-500">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 8. Gemini interactive material -->
  <!-- TODO: rename this section heading / copy to match the actual Gemini content -->
  <!-- <div class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        互動教材
      </p>
      <a
        href="https://gemini.google.com/share/9c1285006053"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-5 rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
      >
        <div class="shrink-0 rounded-lg bg-accent-50 p-3 text-accent-600">
          <Sparkles :size="22" />
        </div>
        <div class="min-w-0">
          <h3 class="font-serif text-lg text-neutral-800">互動教材(Gemini)</h3>
          <p class="mt-1 font-sans text-sm leading-relaxed text-neutral-500">
            點擊開啟由 Gemini 製作的互動學習內容,在新分頁中瀏覽。
          </p>
        </div>
        <ArrowUpRight
          :size="18"
          class="ml-auto shrink-0 text-neutral-300 transition-colors duration-150 group-hover:text-accent-600"
        />
      </a>
    </div>
  </div> -->

  <!-- 9. CTA -->
  <!-- TODO: add available time slots when confirmed -->
  <!-- TODO: add pricing info when confirmed -->
  <div class="bg-neutral-800">
    <div class="mx-auto max-w-5xl px-6 py-16 text-center">
      <h2 class="font-serif text-3xl text-white">預約免費試聽</h2>
      <p class="mt-3 font-sans text-sm text-white/60">第一堂課免費，先試試看再決定。</p>
      <a
        href="mailto:placeholder@example.com"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3 font-sans text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-600"
      >
        <Mail :size="16" />
        立即聯繫
      </a>
    </div>
  </div>
</template>
