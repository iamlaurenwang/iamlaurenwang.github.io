<script setup lang="ts">
import { ref } from 'vue'
import { GraduationCap } from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import ExperienceCard from '@/components/resume/ExperienceCard.vue'
import ProjectCard from '@/components/resume/ProjectCard.vue'
import { experiences, education } from '@/data/experience'
import { projects } from '@/data/projects'

type Tab = 'experience' | 'projects'
const activeTab = ref<Tab>('experience')

const tabs: { key: Tab; label: string }[] = [
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
]
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-12">
    <PageHeader
      title="Resume"
      description="Frontend engineer with a background in Vue.js, TypeScript, and cross-functional team delivery — and a TOEIC 935 score to boot."
    />

    <!-- Tab bar -->
    <div class="mt-10 flex gap-8 border-b border-neutral-200">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="-mb-px pb-3 font-sans text-sm transition-colors duration-150"
        :class="activeTab === tab.key
          ? 'border-b-2 border-accent-500 font-medium text-neutral-900'
          : 'text-neutral-400 hover:text-neutral-700'"
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
        <p class="mb-5 font-sans text-xs font-medium tracking-widest text-neutral-400 uppercase">
          Education
        </p>
        <div class="flex items-start gap-5">
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

    <!-- Projects tab -->
    <div v-else class="mt-10">
      <div v-if="projects.length" class="grid gap-6 sm:grid-cols-2">
        <ProjectCard
          v-for="proj in projects"
          :key="proj.name"
          :project="proj"
        />
      </div>
      <EmptyState
        v-else
        title="Projects coming soon"
        description="Workplace projects will be listed here."
      />
    </div>
  </div>
</template>
