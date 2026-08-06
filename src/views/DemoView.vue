<script lang="ts" setup>
import { ref } from 'vue'
import {
  ArrowRight, ExternalLink, FileText, Wrench,
  Mail, Code2, Briefcase, Tag, Calendar, X, Menu,
} from '@lucide/vue'
import PillTag from '@/components/PillTag.vue'
import FilterPill from '@/components/FilterPill.vue'

const hoveredCard = ref(false)

const filters = ['All', 'Vue', 'CSS', 'Canvas'] as const
const activeFilter = ref<(typeof filters)[number]>('All')

const neutralPalette = [
  { hex: '#FDFCF8', label: '50',  cls: 'bg-neutral-50  border border-neutral-300' },
  { hex: '#FAF8F2', label: '100', cls: 'bg-neutral-100 border border-neutral-300' },
  { hex: '#EDE5D8', label: '200', cls: 'bg-neutral-200' },
  { hex: '#BCA99A', label: '400', cls: 'bg-neutral-400' },
  { hex: '#7A6050', label: '500', cls: 'bg-neutral-500' },
  { hex: '#3D2B1F', label: '700', cls: 'bg-neutral-700' },
  { hex: '#1A0E0A', label: '900', cls: 'bg-neutral-900' },
]

const accentPalette = [
  { hex: '#FDF9EE', label: '50',  cls: 'bg-accent-50  border border-neutral-300' },
  { hex: '#FAF0CC', label: '100', cls: 'bg-accent-100' },
  { hex: '#F2DE96', label: '200', cls: 'bg-accent-200' },
  { hex: '#E5C85A', label: '300', cls: 'bg-accent-300' },
  { hex: '#D4B035', label: '400', cls: 'bg-accent-400' },
  { hex: '#C8A22A', label: '500', cls: 'bg-accent-500' },
  { hex: '#A8830D', label: '600', cls: 'bg-accent-600' },
  { hex: '#8A6C09', label: '700', cls: 'bg-accent-700' },
]

const typeScale = [
  { cls: 'text-6xl font-light tracking-tight text-neutral-900 font-serif italic',  label: '6xl · 60px · light italic · hero (serif)' },
  { cls: 'text-6xl font-light tracking-tight text-neutral-900 font-serif',         label: '6xl · 60px · light       · hero (serif)' },
  { cls: 'text-4xl font-light tracking-tight text-neutral-900 font-serif',         label: '4xl · 36px · light       · page title (serif)' },
  { cls: 'text-3xl font-normal text-neutral-900 font-serif',                       label: '3xl · 30px · regular     · section heading (serif)' },
  { cls: 'text-2xl font-medium text-neutral-900 font-serif',                       label: '2xl · 24px · medium      · card title (serif)' },
  { cls: 'text-lg text-neutral-700 leading-relaxed font-light',                    label: 'lg  · 18px · light       · lead paragraph (sans)' },
  { cls: 'text-base text-neutral-700 leading-relaxed',                             label: 'base· 16px · regular     · body (sans)' },
  { cls: 'text-sm text-neutral-500',                                               label: 'sm  · 14px · regular     · nav / caption (sans)' },
  { cls: 'text-xs tracking-widest uppercase text-neutral-500',                     label: 'xs  · 12px · widest      · overline label (sans)' },
]

const radiusScale = [
  { cls: 'rounded-sm',   label: 'sm · 4px' },
  { cls: 'rounded',      label: '· 6px' },
  { cls: 'rounded-md',   label: 'md · 8px' },
  { cls: 'rounded-lg',   label: 'lg · 12px' },
  { cls: 'rounded-xl',   label: 'xl · 16px' },
  { cls: 'rounded-2xl',  label: '2xl · 24px' },
  { cls: 'rounded-full', label: 'full' },
]

const shadowScale = [
  { cls: 'shadow-card',       label: 'shadow-card',       desc: 'at rest' },
  { cls: 'shadow-card-hover', label: 'shadow-card-hover', desc: 'on hover' },
  { cls: 'shadow-dropdown',   label: 'shadow-dropdown',   desc: 'menus' },
  { cls: 'shadow-modal',      label: 'shadow-modal',      desc: 'overlays' },
]

const icons = [
  { icon: ArrowRight,   label: 'ArrowRight' },
  { icon: ExternalLink, label: 'ExternalLink' },
  { icon: FileText,     label: 'FileText' },
  { icon: Wrench,       label: 'Wrench' },
  { icon: Mail,         label: 'Mail' },
  { icon: Code2,        label: 'Code2' },
  { icon: Briefcase,    label: 'Briefcase' },
  { icon: Tag,          label: 'Tag' },
  { icon: Calendar,     label: 'Calendar' },
  { icon: X,            label: 'X' },
  { icon: Menu,         label: 'Menu' },
]

const iconSizes = [14, 16, 20, 24, 40] as const
</script>

<template>
  <div class="min-h-screen bg-neutral-50 font-sans">

    <!-- Demo sticky header -->
    <div class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200 px-8 py-3 flex items-center justify-between">
      <span class="text-sm font-semibold text-neutral-900 tracking-tight">Design System · Preview</span>
      <nav class="flex items-center gap-6 text-xs text-neutral-400">
        <a v-for="id in ['colors','typography','radius','elevation','animation','icons','components']"
           :key="id" :href="`#${id}`"
           class="hover:text-neutral-700 transition-colors duration-150 capitalize">
          {{ id }}
        </a>
      </nav>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-16 space-y-24">

      <!-- ─── COLORS ─── -->
      <section id="colors">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">Colors</h2>

        <div class="space-y-8">
          <!-- Neutral -->
          <div>
            <p class="text-xs text-neutral-500 mb-3 font-medium">Neutral — warm gray</p>
            <div class="flex gap-2">
              <div v-for="c in neutralPalette" :key="c.label" class="flex-1">
                <div :class="[c.cls, 'h-12 rounded-md']" />
                <p class="text-xs text-neutral-600 mt-1 font-medium">{{ c.label }}</p>
                <p class="text-xs text-neutral-400 font-mono">{{ c.hex }}</p>
              </div>
            </div>
          </div>

          <!-- Accent -->
          <div>
            <p class="text-xs text-neutral-500 mb-3 font-medium">Accent — Indigo</p>
            <div class="flex gap-2">
              <div v-for="c in accentPalette" :key="c.label" class="flex-1">
                <div :class="[c.cls, 'h-12 rounded-md']" />
                <p class="text-xs text-neutral-600 mt-1 font-medium">{{ c.label }}</p>
                <p class="text-xs text-neutral-400 font-mono">{{ c.hex }}</p>
              </div>
            </div>
          </div>

          <!-- Semantic -->
          <div>
            <p class="text-xs text-neutral-500 mb-3 font-medium">Semantic</p>
            <div class="flex gap-4">
              <div v-for="[cls, label, hex] in [
                ['bg-success', 'Success', '#10B981'],
                ['bg-warning', 'Warning', '#F59E0B'],
                ['bg-error',   'Error',   '#EF4444'],
              ]" :key="label">
                <div :class="[cls, 'w-24 h-12 rounded-md']" />
                <p class="text-xs text-neutral-600 mt-1 font-medium">{{ label }}</p>
                <p class="text-xs text-neutral-400 font-mono">{{ hex }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── TYPOGRAPHY ─── -->
      <section id="typography">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">Typography</h2>

        <div class="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100">
          <div v-for="t in typeScale" :key="t.label"
               class="flex items-baseline gap-6 px-8 py-5">
            <span class="w-64 shrink-0 text-xs text-neutral-400 font-mono leading-snug">{{ t.label }}</span>
            <span :class="t.cls">Lauren Wang</span>
          </div>
        </div>
      </section>

      <!-- ─── RADIUS & ELEVATION ─── -->
      <section id="radius">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">Radius</h2>
        <div class="bg-white rounded-xl border border-neutral-200 p-8">
          <div class="flex flex-wrap gap-6 items-end">
            <div v-for="r in radiusScale" :key="r.label" class="text-center">
              <div :class="[r.cls, 'w-16 h-16 bg-accent-100 border-2 border-accent-300']" />
              <p class="text-xs text-neutral-400 mt-2 whitespace-nowrap">{{ r.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── ELEVATION ─── -->
      <section id="elevation">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">Elevation</h2>
        <div class="bg-neutral-100 rounded-xl p-8">
          <div class="flex flex-wrap gap-10 items-end">
            <div v-for="s in shadowScale" :key="s.label" class="text-center">
              <div :class="[s.cls, 'w-20 h-20 bg-white rounded-xl']" />
              <p class="text-xs text-neutral-600 mt-3 font-mono font-medium">{{ s.label }}</p>
              <p class="text-xs text-neutral-400">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── ANIMATION ─── -->
      <section id="animation">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">Animation — hover each box</h2>
        <div class="grid grid-cols-2 gap-4">

          <div class="bg-white border border-neutral-200 rounded-xl p-6">
            <p class="text-xs font-mono text-neutral-400 mb-4">ease-default · 150ms · color</p>
            <div class="h-14 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center
                        text-sm font-medium text-neutral-600 cursor-default
                        transition-colors duration-150 ease-in-out
                        hover:bg-accent-600 hover:text-white hover:border-transparent">
              Hover — color transition
            </div>
          </div>

          <div class="bg-white border border-neutral-200 rounded-xl p-6">
            <p class="text-xs font-mono text-neutral-400 mb-4">ease-spring · 200ms · scale</p>
            <div class="h-14 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center
                        text-sm font-medium text-neutral-600 cursor-default
                        transition-transform duration-200 ease-spring
                        hover:scale-105">
              Hover — spring scale
            </div>
          </div>

          <div class="bg-white border border-neutral-200 rounded-xl p-6">
            <p class="text-xs font-mono text-neutral-400 mb-4">ease-default · 200ms · shadow</p>
            <div class="h-14 rounded-lg border border-neutral-200 bg-white flex items-center justify-center
                        text-sm font-medium text-neutral-600 cursor-default
                        transition-shadow duration-200 ease-in-out
                        shadow-card hover:shadow-card-hover">
              Hover — shadow lift
            </div>
          </div>

          <div class="bg-white border border-neutral-200 rounded-xl p-6">
            <p class="text-xs font-mono text-neutral-400 mb-4">ease-out-expo · 300ms · translate</p>
            <div class="h-14 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-center
                        text-sm font-medium text-neutral-600 cursor-default
                        transition-transform duration-300 ease-out-expo
                        hover:-translate-y-1.5">
              Hover — float up
            </div>
          </div>

        </div>
      </section>

      <!-- ─── ICONS ─── -->
      <section id="icons">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-8">Icons — @lucide/vue · stroke 1.5</h2>
        <div class="bg-white rounded-xl border border-neutral-200 p-8 space-y-10">

          <!-- Grid -->
          <div class="grid grid-cols-6 gap-6">
            <div v-for="i in icons" :key="i.label"
                 class="flex flex-col items-center gap-2">
              <div class="w-11 h-11 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-700 border border-neutral-100">
                <component :is="i.icon" :size="20" :stroke-width="1.5" />
              </div>
              <p class="text-xs text-neutral-400 text-center leading-tight">{{ i.label }}</p>
            </div>
          </div>

          <!-- Size scale -->
          <div class="pt-6 border-t border-neutral-100">
            <p class="text-xs text-neutral-400 mb-5">Size scale</p>
            <div class="flex items-end gap-10">
              <div v-for="sz in iconSizes" :key="sz"
                   class="flex flex-col items-center gap-2">
                <component :is="Mail" :size="sz" :stroke-width="1.5" class="text-neutral-600" />
                <p class="text-xs text-neutral-400">{{ sz }}px</p>
                <p class="text-xs text-neutral-300">{{ ['inline','UI','button','standalone','empty'][iconSizes.indexOf(sz)] }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── COMPONENTS ─── -->
      <section id="components" class="space-y-12">
        <h2 class="text-xs font-medium tracking-widest uppercase text-neutral-400">Components</h2>

        <!-- Buttons -->
        <div>
          <p class="text-sm font-semibold text-neutral-900 mb-4">Buttons</p>
          <div class="bg-white rounded-xl border border-neutral-200 p-8 space-y-6">

            <div class="flex items-center gap-4 flex-wrap">
              <span class="w-24 text-xs text-neutral-400 shrink-0">Primary</span>
              <button class="h-9 px-4 bg-accent-600 text-white text-xs font-semibold rounded-md
                             transition-colors duration-150 ease-in-out
                             hover:bg-accent-700 active:scale-[.98]">Small</button>
              <button class="h-11 px-6 bg-accent-600 text-white text-sm font-semibold rounded-md
                             transition-colors duration-150 ease-in-out
                             hover:bg-accent-700 active:scale-[.98]">Default</button>
              <button class="h-13 px-8 bg-accent-600 text-white text-sm font-semibold rounded-md
                             transition-colors duration-150 ease-in-out
                             hover:bg-accent-700 active:scale-[.98]">Large</button>
              <button disabled class="h-11 px-6 bg-accent-600/40 text-white/60 text-sm font-semibold rounded-md cursor-not-allowed">Disabled</button>
            </div>

            <div class="flex items-center gap-4 flex-wrap">
              <span class="w-24 text-xs text-neutral-400 shrink-0">Secondary</span>
              <button class="h-9 px-4 bg-white border border-neutral-300 text-neutral-700 text-xs font-semibold rounded-md
                             transition-colors duration-150 hover:border-neutral-400 hover:text-neutral-900">Small</button>
              <button class="h-11 px-6 bg-white border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-md
                             transition-colors duration-150 hover:border-neutral-400 hover:text-neutral-900">Default</button>
            </div>

            <div class="flex items-center gap-4 flex-wrap">
              <span class="w-24 text-xs text-neutral-400 shrink-0">Ghost</span>
              <button class="h-11 px-6 text-neutral-600 text-sm font-semibold rounded-md
                             transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900">Default</button>
            </div>

            <div class="flex items-center gap-4 flex-wrap pt-2 border-t border-neutral-100">
              <span class="w-24 text-xs text-neutral-400 shrink-0">With icon</span>
              <button class="h-11 px-6 bg-accent-600 text-white text-sm font-semibold rounded-md flex items-center gap-2
                             transition-colors duration-150 hover:bg-accent-700">
                View Work
                <ArrowRight :size="16" :stroke-width="1.5" />
              </button>
              <button class="h-11 px-6 bg-white border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-md
                             flex items-center gap-2 transition-colors duration-150 hover:border-neutral-400">
                <ExternalLink :size="16" :stroke-width="1.5" />
                Open Link
              </button>
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div>
          <p class="text-sm font-semibold text-neutral-900 mb-4">Cards</p>
          <div class="grid grid-cols-3 gap-4">

            <!-- At rest -->
            <div class="bg-white border border-neutral-200 rounded-xl p-6 shadow-card">
              <p class="text-xs text-neutral-300 mb-4 font-mono">At rest</p>
              <h3 class="text-base font-semibold text-neutral-900 mb-1">Card Title</h3>
              <p class="text-sm text-neutral-500 leading-relaxed">Short description of the card content goes here.</p>
              <div class="flex gap-2 mt-4">
                <span class="px-2.5 py-0.5 text-xs font-medium bg-accent-50 text-accent-600 rounded-full">Vue</span>
                <span class="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-500 rounded-full">Design</span>
              </div>
            </div>

            <!-- Hover (frozen) -->
            <div class="bg-white border border-accent-300 rounded-xl p-6 shadow-card-hover scale-[1.01]">
              <p class="text-xs text-neutral-300 mb-4 font-mono">Hover (frozen)</p>
              <h3 class="text-base font-semibold text-accent-600 mb-1">Card Title</h3>
              <p class="text-sm text-neutral-500 leading-relaxed">Short description of the card content goes here.</p>
              <div class="flex gap-2 mt-4">
                <span class="px-2.5 py-0.5 text-xs font-medium bg-accent-50 text-accent-600 rounded-full">Vue</span>
                <span class="px-2.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-500 rounded-full">Design</span>
              </div>
            </div>

            <!-- Interactive -->
            <div
              class="bg-white rounded-xl p-6 cursor-pointer
                     transition-all duration-200 ease-in-out"
              :class="hoveredCard
                ? 'border border-accent-300 shadow-card-hover scale-[1.01]'
                : 'border border-neutral-200 shadow-card'"
              @mouseenter="hoveredCard = true"
              @mouseleave="hoveredCard = false"
            >
              <p class="text-xs text-neutral-300 mb-4 font-mono">↑ Hover me</p>
              <h3 class="text-base font-semibold mb-1 transition-colors duration-150"
                  :class="hoveredCard ? 'text-accent-600' : 'text-neutral-900'">
                Card Title
              </h3>
              <p class="text-sm text-neutral-500 leading-relaxed">Hover to see transition.</p>
            </div>

          </div>
        </div>

        <!-- Inputs -->
        <div>
          <p class="text-sm font-semibold text-neutral-900 mb-4">Inputs</p>
          <div class="bg-neutral-100 rounded-xl border border-neutral-200 p-10 space-y-8">

            <div class="grid grid-cols-2 gap-10">
              <div>
                <label class="block text-xs tracking-widest uppercase text-neutral-500 mb-3">Name</label>
                <input type="text" placeholder="Your name"
                       class="w-full bg-transparent border-b border-neutral-300 pb-2.5 text-sm
                              text-neutral-900 placeholder:text-neutral-400 outline-none
                              transition-colors duration-150 hover:border-neutral-500" />
              </div>
              <div>
                <label class="block text-xs tracking-widest uppercase text-neutral-500 mb-3">Email</label>
                <input type="email" placeholder="your@email.com"
                       class="w-full bg-transparent border-b border-neutral-300 pb-2.5 text-sm
                              text-neutral-900 placeholder:text-neutral-400 outline-none
                              transition-colors duration-150 hover:border-neutral-500" />
              </div>
            </div>

            <div>
              <label class="block text-xs tracking-widest uppercase text-neutral-500 mb-3">Message</label>
              <textarea rows="3" placeholder="What's on your mind?"
                        class="w-full bg-transparent border-b border-neutral-300 pb-2.5 text-sm
                               text-neutral-900 placeholder:text-neutral-400 outline-none resize-none
                               transition-colors duration-150 hover:border-neutral-500" />
            </div>

          </div>
        </div>

        <!-- Tags -->
        <div>
          <p class="text-sm font-semibold text-neutral-900 mb-4">Tags & Chips</p>
          <div class="bg-white rounded-xl border border-neutral-200 p-8 space-y-4">

            <div class="flex flex-wrap gap-3 items-center">
              <p class="text-xs text-neutral-400 w-20 shrink-0">Accent</p>
              <PillTag variant="accent">Vue 3</PillTag>
              <PillTag variant="accent">TypeScript</PillTag>
              <PillTag variant="accent">Design Systems</PillTag>
            </div>

            <div class="flex flex-wrap gap-3 items-center">
              <p class="text-xs text-neutral-400 w-20 shrink-0">Neutral</p>
              <PillTag variant="neutral">CSS</PillTag>
              <PillTag variant="neutral">Canvas</PillTag>
            </div>

            <div class="flex flex-wrap gap-3 items-center">
              <p class="text-xs text-neutral-400 w-20 shrink-0">Semantic</p>
              <PillTag variant="success">HackMD</PillTag>
              <PillTag variant="warning">Draft</PillTag>
            </div>

            <div class="flex flex-wrap gap-3 items-center pt-3 border-t border-neutral-100">
              <p class="text-xs text-neutral-400 w-20 shrink-0">Filter pills</p>
              <FilterPill
                v-for="f in filters"
                :key="f"
                :label="f"
                :active="activeFilter === f"
                @click="activeFilter = f"
              />
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <p class="text-sm font-semibold text-neutral-900 mb-4">Navigation</p>
          <div class="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div class="px-8 h-16 flex items-center justify-between border-b border-neutral-200">
              <span class="text-sm font-semibold text-neutral-900">Lauren Wang</span>
              <nav class="flex items-center gap-8">
                <span class="text-sm font-medium text-neutral-900">Visuals</span>
                <span class="text-sm font-medium text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors duration-150">Notes</span>
                <span class="text-sm font-medium text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors duration-150">Contact</span>
              </nav>
            </div>
            <div class="px-8 py-4 flex gap-8 text-xs text-neutral-400 font-mono">
              <span>active → <span class="text-neutral-700">text-neutral-900 font-medium</span></span>
              <span>inactive → <span class="text-neutral-700">text-neutral-400</span></span>
              <span>hover → <span class="text-neutral-700">text-neutral-900 · 150ms</span></span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div>
          <p class="text-sm font-semibold text-neutral-900 mb-4">Empty State</p>
          <div class="bg-white rounded-xl border border-neutral-200">
            <div class="py-24 flex flex-col items-center gap-3">
              <Wrench :size="40" :stroke-width="1.5" class="text-neutral-300" />
              <p class="text-lg font-semibold text-neutral-400">Tools coming soon</p>
              <p class="text-sm text-neutral-400">Check back later.</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>
