<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
  Quote,
  CheckCircle2,
  ChevronDown,
  Mail,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
} from "@lucide/vue";
import { RouteName } from "@/types/routes";
import PillTag from "@/components/PillTag.vue";
import MessageMarquee from "@/components/MessageMarquee.vue";
import MessageForm from "@/components/MessageForm.vue";
import TeachingCard from "@/components/teaching/TeachingCard.vue";
import { featuredTeachingItems } from "@/data/teaching";
import {
  services,
  stats,
  successCases,
  achievements,
  testimonials,
  featuredStories,
  faqs,
} from "@/data/tutoring";
import type { Message } from "@/types/message";
import mePhoto from "@/assets/images/me.jpg";

const openFaq = ref<number | null>(null);
const openStories = ref<Record<string, boolean>>({});

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i;
}

function toggleStory(id: string) {
  openStories.value[id] = !openStories.value[id];
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
  <div class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
        <!-- Intro -->
        <div class="min-w-0 flex-1">
          <!-- <p class="mb-3 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            English Tutoring
          </p> -->
          <h1 class="font-serif text-4xl text-dark/60 dark:text-neutral-100">英文家教</h1>
          <p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-dark/60 dark:text-neutral-400">
            GEPT 考照 · 學測作文 · 主題式英語 · 升學諮詢 — 高師大英語系畢業，7 年+
            教學經驗，陪你找到適合自己的英文學習方式。
          </p>
        </div>

        <!-- Photo -->
        <div class="order-first w-40 shrink-0 sm:w-44 md:order-none md:w-56">
          <div
            class="aspect-[4/5] overflow-hidden rounded-2xl shadow-card ring-1 ring-neutral-900/5 dark:ring-white/10"
          >
            <img
              :src="mePhoto"
              alt="英文家教老師 Lauren Wang"
              class="h-full w-full object-cover object-top"
            />
          </div>
          <p class="mt-3 font-sans text-xs text-neutral-400 dark:text-neutral-500">
            Lauren Wang｜英文家教老師
          </p>
        </div>
      </div>

      <!-- Stats -->
      <div
        class="mt-12 grid grid-cols-1 divide-y divide-neutral-200 border-t border-neutral-300 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-neutral-800 dark:border-neutral-700"
      >
        <div v-for="s in stats" :key="s.label" class="py-4 sm:px-6 sm:py-5 sm:first:pl-0">
          <div class="font-serif text-3xl font-light text-dark/60 dark:text-neutral-200">{{ s.value }}</div>
          <div class="mt-0.5 font-sans text-xs text-neutral-400 dark:text-neutral-500">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. Services -->
  <div class="bg-neutral-50 dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        服務項目
      </p>
      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="svc in services"
          :key="svc.title"
          class="rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div class="flex items-start gap-4">
            <div :class="svc.iconClass" class="shrink-0 rounded-lg p-2.5">
              <component :is="svc.icon" :size="20" />
            </div>
            <div class="min-w-0">
              <h3 class="font-serif text-lg text-neutral-800 dark:text-neutral-100">{{ svc.title }}</h3>
              <p class="mt-2 font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
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
  <div class="bg-white dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-14">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-16">
        <div class="shrink-0">
          <p class="font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            About
          </p>
        </div>
        <p class="font-sans text-sm leading-relaxed text-neutral-600 sm:max-w-2xl dark:text-neutral-400">
          國立高雄師範大學英語學系畢業，擁有 7 年以上教學經驗，
          教過的學生從小學六年級到大學生、上班族都有。除一對一家教外，
          也具備 3～15 人小團班／講台授課經驗，
          擅長根據每個學生的目標和個性，調整課程節奏與教材，讓學習不再是苦差事。
        </p>
      </div>
    </div>
  </div>

  <!-- 4. Success Cases -->
  <div class="bg-neutral-50 dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:gap-16">
        <!-- Big stat + achievement highlights -->
        <div class="shrink-0 text-center sm:text-left">
          <div class="font-serif text-6xl font-light text-accent-700 dark:text-accent-400">80%</div>
          <div class="mt-1 font-sans text-sm text-neutral-500 dark:text-neutral-400">全民英檢通過率</div>

          <div class="mt-6 flex justify-center gap-8 sm:justify-start">
            <div v-for="a in achievements" :key="a.label">
              <div class="font-serif text-2xl font-light text-neutral-800 dark:text-neutral-200">
                {{ a.value }}
              </div>
              <div class="mt-0.5 font-sans text-xs text-neutral-400 dark:text-neutral-500">
                {{ a.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Notable alumni -->
        <div>
          <p class="mb-4 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            學生考上
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="school in successCases"
              :key="school"
              class="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 font-sans text-sm text-neutral-700 shadow-card dark:bg-neutral-800 dark:text-neutral-200"
            >
              <CheckCircle2 :size="14" class="text-accent-500 dark:text-accent-400" />
              {{ school }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 5. Testimonials -->
  <div class="bg-white dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        學生 & 家長回饋
      </p>

      <!-- 5A. Short quotes -->
      <div class="grid gap-6 sm:grid-cols-2">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
        >
          <Quote :size="20" class="mb-4 shrink-0 text-accent-300 dark:text-accent-500" />

          <!-- Paragraph quote -->
          <p
            v-if="t.quote"
            class="flex-1 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {{ t.quote }}
          </p>

          <!-- Bullet-point quote -->
          <ul v-else-if="t.points" class="flex-1 space-y-2.5">
            <li
              v-for="point in t.points"
              :key="point"
              class="flex gap-2.5 font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
            >
              <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-400 dark:bg-accent-500" />
              <span>{{ point }}</span>
            </li>
          </ul>

          <div class="mt-5 border-t border-neutral-100 pt-4 dark:border-neutral-800">
            <div class="font-sans text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ t.author }}</div>
            <div class="mt-0.5 font-sans text-xs text-neutral-400 dark:text-neutral-500">{{ t.context }}</div>
          </div>
        </div>
      </div>

      <!-- 5B. Featured stories (long-form testimonials) -->
      <div
        v-for="story in featuredStories"
        :key="story.id"
        class="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-8 shadow-card sm:p-12 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <!-- Pull-quote hook -->
        <div class="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Quote :size="32" class="shrink-0 text-accent-300 dark:text-accent-500" />
          <p class="font-serif text-2xl leading-snug text-neutral-800 sm:text-3xl dark:text-neutral-100">
            {{ story.pullQuote }}
          </p>
        </div>

        <!-- Body -->
        <div class="mt-8 space-y-4 sm:max-w-3xl">
          <p
            v-for="(para, i) in story.leadParagraphs"
            :key="`lead-${i}`"
            class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {{ para }}
          </p>
          <p
            v-for="(para, i) in story.restParagraphs"
            v-show="openStories[story.id]"
            :key="`rest-${i}`"
            class="font-sans text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            {{ para }}
          </p>
        </div>

        <!-- Read more toggle -->
        <button
          v-if="story.restParagraphs.length"
          type="button"
          class="mt-6 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent-700 transition-colors hover:text-accent-800 dark:text-accent-400 dark:hover:text-accent-300"
          @click="toggleStory(story.id)"
        >
          {{ openStories[story.id] ? "收合" : "閱讀完整見證" }}
          <ChevronDown
            :size="16"
            class="transition-transform duration-200"
            :class="openStories[story.id] ? 'rotate-180' : ''"
          />
        </button>

        <!-- Result + author -->
        <div class="mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <div class="flex flex-wrap items-center gap-2">
            <CheckCircle2 :size="16" class="shrink-0 text-accent-500 dark:text-accent-400" />
            <span class="font-sans text-sm font-medium text-neutral-700 dark:text-neutral-200">
              {{ story.result }}
            </span>
          </div>
          <div class="mt-3 font-sans text-xs text-neutral-400 dark:text-neutral-500">
            {{ story.author }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Messages — 暫時隱藏，待串 Firebase 後再開啟 -->
  <!-- <div class="bg-white py-16 dark:bg-black">
    <div class="mx-auto max-w-5xl px-6">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        學生&家長留言
      </p>
    </div>

    Marquee: max-w-[904px] = 3 cards (w-72) + 2 gaps (gap-5)
    <div class="mx-auto max-w-[904px]">
      <MessageMarquee :messages="mockMessages" />
    </div>

    Submit form
    <div class="mx-auto mt-10 max-w-2xl px-6">
      <MessageForm />
    </div>
  </div> -->


  <!-- 7. 教學作品集導流 -->
  <div class="bg-neutral-100 dark:bg-neutral-900">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            教學作品集
          </p>
          <p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            實際用在課堂上的教材與題目，其中的聽力題組可以直接在網頁上作答。
          </p>
        </div>
        <RouterLink
          :to="{ name: RouteName.TeachingIndex }"
          class="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent-600 transition-colors hover:text-accent-700 dark:text-accent-400"
        >
          看全部
          <ArrowRight :size="15" class="transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TeachingCard
          v-for="item in featuredTeachingItems.slice(0, 3)"
          :key="item.slug"
          :item="item"
        />
      </div>
    </div>
  </div>

  <!-- 8. FAQ -->
  <div class="bg-neutral-50 dark:bg-black">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        常見問題
      </p>
      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <div v-for="(faq, i) in faqs" :key="faq.question" class="py-5">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 text-left"
            @click="toggleFaq(i)"
          >
            <span class="font-sans text-sm font-medium text-neutral-800 dark:text-neutral-100">{{ faq.question }}</span>
            <span
              class="shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500"
              :class="openFaq === i ? 'rotate-45' : ''"
            >
              +
            </span>
          </button>
          <p v-show="openFaq === i" class="mt-3 font-sans text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
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
      <p class="mb-8 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
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
      <RouterLink
        :to="{ name: RouteName.Contact }"
        class="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-neutral-50 px-8 py-3 font-sans text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
      >
        <Mail :size="16" />
        立即聯繫
      </RouterLink>
    </div>
  </div>
</template>
