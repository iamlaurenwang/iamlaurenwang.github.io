<script lang="ts" setup>
import PageHeader from '@/components/PageHeader.vue'
import PillTag from '@/components/PillTag.vue'
import BankAccountDemo from '@/components/visuals/js/BankAccountDemo.vue'
import CountdownDemo from '@/components/visuals/js/CountdownDemo.vue'
import FontSizeDemo from '@/components/visuals/js/FontSizeDemo.vue'
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-16 px-6 py-12">
    <PageHeader
      title="JavaScript Concepts"
      description="Hands-on demos for JavaScript language features. First up: closures — a function remembers the scope it was created in, even after that scope has finished running. Three faces of the same idea below."
    />

    <!-- 1. Private state -->
    <section>
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <PageHeader level="h2" size="section" title="Private state" />
        <PillTag variant="accent" size="sm">closure</PillTag>
      </div>
      <p class="mb-6 max-w-3xl font-sans text-sm leading-relaxed text-neutral-500">
        <code class="font-mono text-neutral-700">balance</code> lives inside the factory and is
        unreachable from outside — only the returned <code class="font-mono">deposit</code> /
        <code class="font-mono">withdraw</code> can touch it. Every call builds an independent
        scope, so accounts A, B and C never leak into each other.
      </p>
      <BankAccountDemo />
    </section>

    <hr class="border-neutral-200" />

    <!-- 2. State in async callbacks -->
    <section>
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <PageHeader level="h2" size="section" title="State across async" />
        <PillTag variant="accent" size="sm">closure + setInterval</PillTag>
      </div>
      <p class="mb-6 max-w-3xl font-sans text-sm leading-relaxed text-neutral-500">
        <code class="font-mono text-neutral-700">sendCode()</code> returns a
        <code class="font-mono">counter</code> that still remembers
        <code class="font-mono">count</code>, and the interval callback remembers
        <code class="font-mono">timer</code> so it can stop itself. The state stays alive long after
        the outer function has returned.
      </p>
      <CountdownDemo />
    </section>

    <hr class="border-neutral-200" />

    <!-- 3. Shared state / module pattern -->
    <section>
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <PageHeader level="h2" size="section" title="Shared state" />
        <PillTag variant="accent" size="sm">module pattern</PillTag>
      </div>
      <p class="mb-6 max-w-3xl font-sans text-sm leading-relaxed text-neutral-500">
        One private <code class="font-mono text-neutral-700">size</code>, two methods closing over
        the <em>same</em> variable. The returned object is the only interface to a protected piece
        of state — the revealing module pattern in miniature.
      </p>
      <FontSizeDemo />
    </section>
  </div>
</template>
