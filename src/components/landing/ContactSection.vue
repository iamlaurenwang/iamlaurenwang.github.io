<script lang="ts" setup>
import { Flower2 } from '@lucide/vue'
import { useContactForm } from '@/composables/useContactForm'

const { fields, errors, isSubmitted, submit } = useContactForm()
</script>

<template>
  <section class="relative overflow-hidden bg-neutral-200">
    <div class="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
      <!-- Copy -->
      <div class="flex flex-col">
        <h2 class="font-serif text-3xl leading-snug font-light text-neutral-700 md:text-5xl">
          LET'S BUILD SOMETHING TOGETHER
        </h2>
        <p class="mt-8 max-w-md font-sans text-sm leading-relaxed text-neutral-600">
          Have a project in mind, or need help preparing for GEPT or TOEIC? Fill out the form
          and tell me all about it — I'd love to hear from you!
        </p>
        <Flower2 :size="28" class="mt-10 text-accent-400" />
      </div>

      <!-- Form card -->
      <div class="bg-neutral-50/80 p-8 shadow-card backdrop-blur-sm md:p-10">
        <form v-if="!isSubmitted" class="space-y-5" novalidate @submit.prevent="submit">
          <div>
            <label for="cf-name" class="mb-1.5 block font-sans text-xs text-neutral-600">
              Name
            </label>
            <input
              id="cf-name"
              v-model="fields.name"
              type="text"
              class="w-full border border-neutral-300 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-700 transition-colors outline-none focus:border-accent-400"
            />
            <p v-if="errors.name" class="mt-1 font-sans text-xs text-error">{{ errors.name }}</p>
          </div>

          <div>
            <label for="cf-email" class="mb-1.5 block font-sans text-xs text-neutral-600">
              Email
            </label>
            <input
              id="cf-email"
              v-model="fields.email"
              type="email"
              class="w-full border border-neutral-300 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-700 transition-colors outline-none focus:border-accent-400"
            />
            <p v-if="errors.email" class="mt-1 font-sans text-xs text-error">{{ errors.email }}</p>
          </div>

          <div>
            <label for="cf-message" class="mb-1.5 block font-sans text-xs text-neutral-600">
              Message
            </label>
            <textarea
              id="cf-message"
              v-model="fields.message"
              rows="4"
              class="w-full resize-none border border-neutral-300 bg-neutral-50 px-3 py-2.5 font-sans text-sm text-neutral-700 transition-colors outline-none focus:border-accent-400"
            />
            <p v-if="errors.message" class="mt-1 font-sans text-xs text-error">
              {{ errors.message }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-accent-300 py-3 font-sans text-xs tracking-[0.2em] text-neutral-800 uppercase transition-colors duration-200 hover:bg-accent-400"
          >
            Send
          </button>
          <p class="text-center font-sans text-[0.65rem] text-neutral-400">
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
  </section>
</template>
