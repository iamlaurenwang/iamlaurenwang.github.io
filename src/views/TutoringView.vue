<script setup lang="ts">
import { ref } from 'vue'
import { Quote, CheckCircle2, Mail } from '@lucide/vue'
import PillTag from '@/components/PillTag.vue'
import { services, stats, successCases, testimonials, faqs } from '@/data/tutoring'

const openFaq = ref<number | null>(null)

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}
</script>

<template>
  <!-- 1. Hero -->
  <div class="bg-accent-500">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-white/50">
        English Tutoring
      </p>
      <h1 class="font-serif text-4xl text-white">英文家教</h1>
      <p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/70">
        GEPT 考照 · 學測作文 · 主題式英語 · 升學諮詢 —
        高師大英語系畢業，7 年+ 教學經驗，陪你找到適合自己的英文學習方式。
      </p>

      <!-- Stats -->
      <div class="mt-10 flex flex-wrap gap-x-12 gap-y-6">
        <div v-for="s in stats" :key="s.label">
          <div class="font-serif text-3xl font-light text-white">{{ s.value }}</div>
          <div class="mt-0.5 font-sans text-xs text-white/60">{{ s.label }}</div>
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
  <div class="bg-neutral-800">
    <div class="mx-auto max-w-5xl px-6 py-14">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-16">
        <div class="shrink-0">
          <p class="font-sans text-xs font-medium uppercase tracking-widest text-white/40">
            About
          </p>
        </div>
        <p class="font-sans text-sm leading-relaxed text-white/70 sm:max-w-2xl">
          國立高雄師範大學英語學系畢業，擁有 7 年以上教學經驗，
          教過的學生從小學六年級到大學生、上班族都有。
          擅長根據每個學生的目標和個性，調整課程節奏與教材，讓學習不再是苦差事。
        </p>
      </div>
    </div>
  </div>

  <!-- 4. Success Cases -->
  <div class="bg-accent-100">
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
  <div class="bg-neutral-50">
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

  <!-- 6. FAQ -->
  <div class="bg-neutral-100">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        常見問題
      </p>
      <div class="divide-y divide-neutral-200">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.question"
          class="py-5"
        >
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
          <p
            v-show="openFaq === i"
            class="mt-3 font-sans text-sm leading-relaxed text-neutral-500"
          >
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 7. CTA -->
  <!-- TODO: add available time slots when confirmed -->
  <!-- TODO: add pricing info when confirmed -->
  <div class="bg-neutral-800">
    <div class="mx-auto max-w-5xl px-6 py-16 text-center">
      <h2 class="font-serif text-3xl text-white">預約免費試聽</h2>
      <p class="mt-3 font-sans text-sm text-white/60">
        第一堂課免費，先試試看再決定。
      </p>
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
