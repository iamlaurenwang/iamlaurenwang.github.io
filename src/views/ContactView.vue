<script lang="ts" setup>
import { ExternalLink, Flower2 } from '@lucide/vue'
import { useContactForm } from '@/composables/useContactForm'
import { socialLinks } from '@/data/contact'

const { fields, errors, isSubmitted, isLoading, submitError, submit } = useContactForm()
</script>

<template>
  <!-- Hero -->
  <div class="bg-neutral-800">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <h1 class="font-serif text-4xl text-white">Contact</h1>
      <p class="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/60">
        歡迎來聊聊任何事 — 合作提案、家教諮詢、或只是想打聲招呼，都很歡迎。
      </p>
    </div>
  </div>

  <!-- Content -->
  <div class="bg-neutral-50">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <div class="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16 md:items-start">

        <!-- Left: social links -->
        <div>
          <p class="mb-6 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
            Find me at
          </p>
          <div class="flex flex-col gap-3">
            <a
              v-for="s in socialLinks"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover"
            >
              <div :class="s.iconClass" class="shrink-0 rounded-lg p-2.5">
                <component :is="s.icon" :size="18" />
              </div>
              <div class="min-w-0">
                <div class="font-sans text-xs text-neutral-400">{{ s.label }}</div>
                <div class="truncate font-sans text-sm text-neutral-700">{{ s.value }}</div>
              </div>
              <ExternalLink
                :size="14"
                class="ml-auto shrink-0 text-neutral-300 transition-colors duration-150 group-hover:text-neutral-500"
              />
            </a>
          </div>
        </div>

        <!-- Right: form -->
        <div>
          <p class="mb-6 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
            Send a message
          </p>

          <form v-if="!isSubmitted" class="space-y-5" novalidate @submit.prevent="submit">
            <div>
              <label for="cv-name" class="mb-1.5 block font-sans text-xs text-neutral-600">
                Name
              </label>
              <input
                id="cv-name"
                v-model="fields.name"
                type="text"
                class="w-full border border-neutral-300 bg-white px-3 py-2.5 font-sans text-sm text-neutral-700 outline-none transition-colors focus:border-accent-400"
              />
              <p v-if="errors.name" class="mt-1 font-sans text-xs text-error">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="cv-email" class="mb-1.5 block font-sans text-xs text-neutral-600">
                Email
              </label>
              <input
                id="cv-email"
                v-model="fields.email"
                type="email"
                class="w-full border border-neutral-300 bg-white px-3 py-2.5 font-sans text-sm text-neutral-700 outline-none transition-colors focus:border-accent-400"
              />
              <p v-if="errors.email" class="mt-1 font-sans text-xs text-error">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="cv-message" class="mb-1.5 block font-sans text-xs text-neutral-600">
                Message
              </label>
              <textarea
                id="cv-message"
                v-model="fields.message"
                rows="5"
                class="w-full resize-none border border-neutral-300 bg-white px-3 py-2.5 font-sans text-sm text-neutral-700 outline-none transition-colors focus:border-accent-400"
              />
              <p v-if="errors.message" class="mt-1 font-sans text-xs text-error">
                {{ errors.message }}
              </p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-accent-500 py-3 font-sans text-xs tracking-[0.2em] text-white uppercase transition-colors duration-200 hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{ isLoading ? 'Sending…' : 'Send' }}
            </button>
            <p v-if="submitError" class="text-center font-sans text-xs text-error">
              {{ submitError }}
            </p>
            <p v-else class="text-center font-sans text-[0.65rem] text-neutral-400">
              Your information will never be shared. Never submit passwords.
            </p>
          </form>

          <!-- Submitted state -->
          <div v-else class="flex flex-col items-center gap-4 py-10 text-center">
            <Flower2 :size="32" class="text-accent-400" />
            <p class="font-serif text-2xl font-light text-neutral-700">Thank you.</p>
            <p class="max-w-xs font-sans text-sm text-neutral-500">
              Your message has been received. I'll be in touch soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
