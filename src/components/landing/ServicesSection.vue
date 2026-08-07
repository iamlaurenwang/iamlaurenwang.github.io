<script lang="ts" setup>
const services = [
  {
    title: 'Frontend Engineering',
    description:
      'Precise, accessible interfaces with Vue.js, TypeScript, and Tailwind CSS. Hands-on experience with Quasar, Element Plus, Nuxt UI, and Bootstrap — and a track record of cross-functional team delivery.',
    tags: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Quasar', 'Element Plus'],
  },
  {
    title: 'Full-Stack Development',
    description:
      'Backend to infrastructure: C#, Java, SQL, Entity Framework, Docker, and CI/CD pipelines. Comfortable owning the full system when the project calls for it.',
    tags: ['C#', 'Java', 'SQL', 'Docker', 'CI/CD'],
  },
  {
    title: 'English Teaching & Exam Prep',
    description:
      'GEPT and TOEIC preparation, writing composition, and conversational English coaching. Teaching across all ages and levels since 2019 — with a TOEIC 935/990 of my own.',
    tags: ['GEPT', 'TOEIC', 'Writing', 'Composition'],
  },
]
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-5xl px-6 py-20">
      <p class="mb-10 font-sans text-xs font-medium uppercase tracking-widest text-neutral-400">
        What I do
      </p>
      <div class="divide-y divide-neutral-200">
        <div
          v-for="svc in services"
          :key="svc.title"
          class="group py-8 first:pt-0 last:pb-0"
        >
          <div class="flex flex-col gap-4 md:flex-row md:gap-16">
            <h3
              class="font-serif text-2xl font-light text-neutral-800 transition-colors duration-150 group-hover:text-accent-600 md:w-64 md:shrink-0"
            >
              {{ svc.title }}
            </h3>
            <div class="md:flex-1">
              <p class="font-sans text-sm leading-relaxed text-neutral-500">
                {{ svc.description }}
              </p>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in svc.tags"
                  :key="tag"
                  class="border border-neutral-200 px-2 py-0.5 font-sans text-xs text-neutral-400"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
