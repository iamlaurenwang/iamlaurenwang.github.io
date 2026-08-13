<script setup lang="ts">
import { GraduationCap } from "@lucide/vue";
import { experiences, education } from "@/data/experience";
import ExperienceCard from "@/components/resume/ExperienceCard.vue";
import SectionHeading from "@/components/SectionHeading.vue";
</script>

<template>
  <section id="experience" class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading number="02" title="Experience" />

      <div class="mt-10">
        <ExperienceCard
          v-for="(exp, i) in experiences"
          :key="exp.company + exp.period.start"
          :experience="exp"
          :is-last="i === experiences.length - 1"
        />

        <!-- Education -->
        <div class="mt-4 border-t border-neutral-200 pt-10">
          <p class="mb-5 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
            Education
          </p>
          <div class="rounded-xl bg-neutral-100 p-5">
            <div class="flex items-start gap-4">
              <GraduationCap :size="20" class="mt-0.5 shrink-0 text-neutral-400" />
              <div>
                <h3 class="font-serif text-xl text-neutral-800">{{ education.degree }}</h3>
                <p class="mt-0.5 font-sans text-sm text-neutral-500">
                  {{ education.school }} {{ education.schoolEn }} · {{ education.location }}
                </p>
                <p class="mt-0.5 font-sans text-xs text-neutral-400">
                  {{ education.period.start }} – {{ education.period.end }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
