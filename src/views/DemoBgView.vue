<script setup lang="ts">
import { ref, computed } from 'vue'

type PatternType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type Viewport = 'mobile' | 'tablet' | 'desktop'

const active = ref<PatternType>('A')
const viewport = ref<Viewport>('desktop')

const options: { id: PatternType; label: string; desc: string }[] = [
  { id: 'A', label: 'A — 散點', desc: '大小不一的圓點隨機散佈' },
  { id: 'B', label: 'B — 幾何碎片', desc: '散點 + 斜向矩形片段' },
  { id: 'C', label: 'C — 線條', desc: '短線條筆觸感' },
  { id: 'D', label: 'D — 十字', desc: '大小不一的十字符號' },
  { id: 'E', label: 'E — 圓環', desc: '大型部分圓弧' },
  { id: 'F', label: 'F — 線群', desc: '斜向平行線群組' },
]

const viewports: { id: Viewport; label: string; width: string; note: string }[] = [
  { id: 'mobile', label: 'Mobile', width: '375px', note: '375px' },
  { id: 'tablet', label: 'Tablet', width: '768px', note: '768px' },
  { id: 'desktop', label: 'Desktop', width: '100%', note: '1280px+' },
]

// side gutter = (containerWidth - 1024px content) / 2
// pattern SVGs are 200px wide; hide when gutter < 80px to avoid overlap
const showPattern = computed(() => {
  if (viewport.value === 'mobile') return false   // 375px — no room
  if (viewport.value === 'tablet') return false   // 768px — still too tight
  return true                                      // desktop — show
})

const previewStyle = computed(() => {
  const vp = viewports.find((v) => v.id === viewport.value)!
  return { width: vp.width, minHeight: '600px' }
})
</script>

<template>
  <!-- Control bar -->
  <div
    class="sticky top-0 z-50 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-neutral-200 bg-white/90 px-6 py-3 backdrop-blur"
  >
    <!-- Pattern picker -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-medium uppercase tracking-widest text-neutral-400">圖案</span>
      <button
        v-for="opt in options"
        :key="opt.id"
        :class="[
          'border px-3 py-1 text-xs font-medium transition-colors duration-150',
          active === opt.id
            ? 'border-neutral-900 bg-neutral-900 text-white'
            : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500',
        ]"
        @click="active = opt.id"
      >
        {{ opt.label }}
      </button>
    </div>

    <div class="h-4 w-px bg-neutral-200" />

    <!-- Viewport picker -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-medium uppercase tracking-widest text-neutral-400">裝置</span>
      <button
        v-for="vp in viewports"
        :key="vp.id"
        :class="[
          'border px-3 py-1 text-xs font-medium transition-colors duration-150',
          viewport === vp.id
            ? 'border-neutral-900 bg-neutral-900 text-white'
            : 'border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500',
        ]"
        @click="viewport = vp.id"
      >
        {{ vp.label }}
        <span class="ml-1 opacity-50">{{ vp.note }}</span>
      </button>
    </div>

    <span v-if="!showPattern" class="text-xs text-amber-500">
      ⚠ 此寬度側邊空間不足，圖案自動隱藏
    </span>
  </div>

  <!-- Preview wrapper — simulates viewport width -->
  <div class="flex min-h-screen justify-center bg-neutral-200 p-6">
    <div
      class="relative overflow-hidden bg-white shadow-lg transition-all duration-300"
      :style="previewStyle"
    >

    <!-- ── Patterns (only shown when viewport has side gutter space) ── -->
    <template v-if="showPattern">

    <!-- ── A: Dots ── -->
    <template v-if="active === 'A'">
      <svg class="pointer-events-none absolute right-0 top-0 select-none text-neutral-300" width="200" height="800" viewBox="0 0 200 800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <circle cx="165" cy="70" r="3" fill="currentColor" />
        <circle cx="95" cy="110" r="5" fill="currentColor" />
        <circle cx="25" cy="150" r="2.5" fill="currentColor" />
        <circle cx="140" cy="230" r="4" fill="currentColor" />
        <circle cx="55" cy="280" r="3" fill="currentColor" />
        <circle cx="120" cy="360" r="6" fill="currentColor" />
        <circle cx="30" cy="420" r="2.5" fill="currentColor" />
        <circle cx="175" cy="450" r="3.5" fill="currentColor" />
        <circle cx="80" cy="535" r="4" fill="currentColor" />
        <circle cx="145" cy="600" r="2" fill="currentColor" />
        <circle cx="45" cy="650" r="5.5" fill="currentColor" />
        <circle cx="120" cy="720" r="3" fill="currentColor" />
        <circle cx="175" cy="762" r="2" fill="currentColor" />
      </svg>
    </template>

    <!-- ── B: Dots + fragments ── -->
    <template v-else-if="active === 'B'">
      <svg class="pointer-events-none absolute right-0 top-0 select-none text-neutral-300" width="200" height="800" viewBox="0 0 200 800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <circle cx="165" cy="70" r="3" fill="currentColor" />
        <circle cx="95" cy="110" r="5" fill="currentColor" />
        <circle cx="25" cy="150" r="2.5" fill="currentColor" />
        <circle cx="140" cy="230" r="4" fill="currentColor" />
        <circle cx="55" cy="280" r="3" fill="currentColor" />
        <circle cx="120" cy="360" r="6" fill="currentColor" />
        <circle cx="30" cy="420" r="2.5" fill="currentColor" />
        <circle cx="175" cy="450" r="3.5" fill="currentColor" />
        <circle cx="80" cy="535" r="4" fill="currentColor" />
        <circle cx="145" cy="600" r="2" fill="currentColor" />
        <circle cx="45" cy="650" r="5.5" fill="currentColor" />
        <circle cx="175" cy="762" r="2" fill="currentColor" />
        <rect x="120" y="178" width="16" height="3" transform="rotate(25 128 179.5)" fill="currentColor" />
        <rect x="88" y="308" width="16" height="3" transform="rotate(30 96 309.5)" fill="currentColor" />
        <rect x="45" y="388" width="18" height="3" transform="rotate(-15 54 389.5)" fill="currentColor" />
        <rect x="140" y="578" width="14" height="3" transform="rotate(10 147 579.5)" fill="currentColor" />
        <rect x="20" y="648" width="12" height="3" transform="rotate(-20 26 649.5)" fill="currentColor" />
        <rect x="110" y="720" width="16" height="3" transform="rotate(-25 118 721.5)" fill="currentColor" />
      </svg>
    </template>

    <!-- ── C: Short strokes ── -->
    <template v-else-if="active === 'C'">
      <svg class="pointer-events-none absolute right-0 top-0 select-none text-neutral-300" width="200" height="800" viewBox="0 0 200 800" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <line x1="172" y1="65" x2="142" y2="40" stroke="currentColor" stroke-width="1.5" />
        <line x1="90" y1="108" x2="120" y2="84" stroke="currentColor" stroke-width="1.5" />
        <line x1="28" y1="148" x2="28" y2="190" stroke="currentColor" stroke-width="1.5" />
        <line x1="144" y1="228" x2="172" y2="204" stroke="currentColor" stroke-width="1.5" />
        <line x1="52" y1="278" x2="86" y2="302" stroke="currentColor" stroke-width="1.5" />
        <line x1="124" y1="358" x2="152" y2="332" stroke="currentColor" stroke-width="1.5" />
        <line x1="28" y1="418" x2="28" y2="460" stroke="currentColor" stroke-width="1.5" />
        <line x1="174" y1="448" x2="144" y2="470" stroke="currentColor" stroke-width="1.5" />
        <line x1="78" y1="532" x2="112" y2="554" stroke="currentColor" stroke-width="1.5" />
        <line x1="150" y1="598" x2="150" y2="640" stroke="currentColor" stroke-width="1.5" />
        <line x1="40" y1="648" x2="72" y2="622" stroke="currentColor" stroke-width="1.5" />
        <line x1="120" y1="718" x2="150" y2="742" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </template>

    <!-- ── D: Cross marks ── -->
    <template v-else-if="active === 'D'">
      <svg class="pointer-events-none absolute right-0 top-0 select-none text-neutral-300" width="200" height="800" viewBox="0 0 200 800" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M 153 70 L 167 70 M 160 63 L 160 77" stroke="currentColor" stroke-width="1.5" />
        <path d="M 70 130 L 90 130 M 80 120 L 80 140" stroke="currentColor" stroke-width="1.5" />
        <path d="M 20 190 L 30 190 M 25 185 L 25 195" stroke="currentColor" stroke-width="1.5" />
        <path d="M 132 280 L 148 280 M 140 272 L 140 288" stroke="currentColor" stroke-width="1.5" />
        <path d="M 49 360 L 61 360 M 55 354 L 55 366" stroke="currentColor" stroke-width="1.5" />
        <path d="M 166 420 L 184 420 M 175 411 L 175 429" stroke="currentColor" stroke-width="1.5" />
        <path d="M 90 500 L 100 500 M 95 495 L 95 505" stroke="currentColor" stroke-width="1.5" />
        <path d="M 22 570 L 38 570 M 30 562 L 30 578" stroke="currentColor" stroke-width="1.5" />
        <path d="M 149 640 L 161 640 M 155 634 L 155 646" stroke="currentColor" stroke-width="1.5" />
        <path d="M 60 720 L 80 720 M 70 710 L 70 730" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </template>

    <!-- ── E: Large rings ── -->
    <template v-else-if="active === 'E'">
      <svg class="pointer-events-none absolute right-0 top-0 select-none text-neutral-300" width="200" height="800" viewBox="0 0 200 800" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <circle cx="230" cy="160" r="140" stroke="currentColor" stroke-width="1" />
        <circle cx="90" cy="460" r="88" stroke="currentColor" stroke-width="1" />
        <circle cx="240" cy="710" r="110" stroke="currentColor" stroke-width="1" />
      </svg>
    </template>

    <!-- ── F: Grouped diagonal lines ── -->
    <template v-else-if="active === 'F'">
      <svg class="pointer-events-none absolute right-0 top-0 select-none text-neutral-300" width="200" height="800" viewBox="0 0 200 800" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <!-- Group 1 — top right, going down-left -->
        <line x1="200" y1="55" x2="140" y2="115" stroke="currentColor" stroke-width="1.5" />
        <line x1="188" y1="55" x2="128" y2="115" stroke="currentColor" stroke-width="1.5" />
        <line x1="176" y1="55" x2="116" y2="115" stroke="currentColor" stroke-width="1.5" />
        <!-- Group 2 — going down-right -->
        <line x1="60" y1="220" x2="120" y2="280" stroke="currentColor" stroke-width="1.5" />
        <line x1="72" y1="220" x2="132" y2="280" stroke="currentColor" stroke-width="1.5" />
        <!-- Group 3 — going down-left -->
        <line x1="200" y1="370" x2="140" y2="430" stroke="currentColor" stroke-width="1.5" />
        <line x1="188" y1="370" x2="128" y2="430" stroke="currentColor" stroke-width="1.5" />
        <line x1="176" y1="370" x2="116" y2="430" stroke="currentColor" stroke-width="1.5" />
        <!-- Group 4 — going down-right -->
        <line x1="110" y1="530" x2="170" y2="590" stroke="currentColor" stroke-width="1.5" />
        <line x1="122" y1="530" x2="182" y2="590" stroke="currentColor" stroke-width="1.5" />
        <!-- Group 5 — going down-left -->
        <line x1="170" y1="678" x2="110" y2="738" stroke="currentColor" stroke-width="1.5" />
        <line x1="158" y1="678" x2="98" y2="738" stroke="currentColor" stroke-width="1.5" />
        <line x1="146" y1="678" x2="86" y2="738" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </template>

    </template><!-- end showPattern -->

    <!-- Hero content replica -->
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
        <div class="w-36 shrink-0 md:w-52">
          <div class="aspect-[3/4] rounded-xl bg-neutral-200" />
        </div>
        <div class="flex min-w-0 flex-1 flex-col">
          <h1 class="font-serif text-5xl font-light tracking-tight text-neutral-900 md:text-6xl">
            Lauren<br />Wang
          </h1>
          <p class="mt-6 max-w-xl font-sans text-sm leading-relaxed text-neutral-500">
            Software engineer who cares about user experience, performance, and AI-assisted
            workflows — with a habit of automating the inefficient parts.
          </p>
          <div class="mt-6 border-t border-neutral-200" />
          <div class="mt-10">
            <button
              class="inline-block border border-neutral-900 px-7 py-3 font-sans text-xs uppercase tracking-[0.18em] text-neutral-900"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- About section replica -->
    <div class="bg-neutral-100">
      <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p class="font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
          01 — About
        </p>
        <blockquote
          class="mt-10 font-serif text-2xl font-light leading-snug text-neutral-700 md:max-w-3xl md:text-3xl"
        >
          "I didn't take the straight path to get here —<br />and that's exactly what makes my work
          better."
        </blockquote>
        <div class="mt-12 grid gap-6 md:grid-cols-2 md:gap-16">
          <p class="font-sans text-sm leading-relaxed text-neutral-600">
            I got into software because I care about user experience and efficiency. When making
            technical decisions, I start by asking who will use it and whose time it saves.
          </p>
          <p class="font-sans text-sm leading-relaxed text-neutral-600">
            A native Mandarin speaker fluent in English (TOEIC 935/990), I bring the same care for
            clarity to both language and code.
          </p>
        </div>
      </div>
    </div>
    </div><!-- end preview box -->
  </div><!-- end preview wrapper -->
</template>
