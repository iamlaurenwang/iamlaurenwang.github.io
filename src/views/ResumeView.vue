<script setup lang="ts">
import { ref } from "vue";
import { GraduationCap } from "@lucide/vue";
import EmptyState from "@/components/EmptyState.vue";
import ExperienceCard from "@/components/resume/ExperienceCard.vue";
import ProjectCard from "@/components/resume/ProjectCard.vue";
import { experiences, education } from "@/data/experience";
import { projects } from "@/data/projects";

type Tab = "experience" | "projects";
const activeTab = ref<Tab>("experience");

const tabs: { key: Tab; label: string }[] = [
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
];
</script>

<template>
  <!-- header band -->
  <div class="bg-neutral-100">
    <div class="mx-auto max-w-5xl px-6 py-16">
      <h1 class="font-serif text-4xl text-dark/60">Resume</h1>
      <p class="mt-3 min-h-[2.85rem] max-w-2xl font-sans text-sm leading-relaxed text-dark/60">
        Frontend engineer with a background in Vue.js, TypeScript, and cross-functional team
        delivery — and a TOEIC 935 score to boot.
      </p>
    </div>
  </div>
  <!-- Content area -->
  <div class="mx-auto max-w-5xl px-6 py-10">
    <!-- Tab bar -->
    <div class="flex gap-8 border-b border-neutral-200">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="-mb-px pb-3 font-sans text-sm transition-colors duration-150"
        :class="
          activeTab === tab.key
            ? 'border-b-2 border-accent-500 font-medium text-accent-700'
            : 'text-neutral-400 hover:text-neutral-700'
        "
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Experience tab -->
    <div v-if="activeTab === 'experience'" class="mt-10">
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

    <!-- Projects tab -->
    <div v-else class="mt-10">
      <div v-if="projects.length" class="grid gap-6 sm:grid-cols-2">
        <ProjectCard v-for="proj in projects" :key="proj.name" :project="proj" />
      </div>
      <EmptyState
        v-else
        title="Projects coming soon"
        description="Workplace projects will be listed here."
      />
    </div>
  </div>
</template>
