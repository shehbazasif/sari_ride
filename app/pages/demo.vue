<script setup lang="ts">
useSeoMeta({
  title: 'Interactive Product Demo | Fero Ferto',
  description: 'Explore the Fero Ferto workforce intelligence platform: riders, smart matching, analytics, forecasting and an AI assistant — all on fictional demo data.'
})

const tabs = [
  { label: 'Overview', icon: 'i-lucide-layout-dashboard', value: 'overview' },
  { label: 'Rider management', icon: 'i-lucide-users', value: 'riders' },
  { label: 'Smart matching', icon: 'i-lucide-git-merge', value: 'matching' },
  { label: 'Intelligence', icon: 'i-lucide-brain-circuit', value: 'intelligence' },
  { label: 'Forecasting', icon: 'i-lucide-chart-line', value: 'forecast' },
  { label: 'AI assistant', icon: 'i-lucide-message-circle-question', value: 'assistant' }
] as const

type TabValue = typeof tabs[number]['value']

const active = ref<TabValue>('overview')

function switchTab(v: TabValue) {
  active.value = v
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="relative">
    <div class="grid-bg absolute inset-x-0 top-0 h-[26rem] -z-0 pointer-events-none" />

    <section class="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
      <!-- Demo banner: marks this as a simulated product demo -->
      <div class="panel p-4 sm:p-5 flex flex-wrap items-center gap-4 border-primary/40">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <span class="relative flex size-3">
            <span class="absolute inline-flex size-full rounded-full bg-primary animate-ping opacity-60" />
            <span class="relative inline-flex size-3 rounded-full bg-primary" />
          </span>
          <div>
            <p class="font-mono text-[11px] uppercase tracking-widest text-primary">
              Interactive product demo
            </p>
            <p class="text-sm text-muted mt-0.5">
              Everything here runs on fictional demonstration data — no live company operations, no sign-up, no API keys.
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <UButton
            to="/contact"
            color="neutral"
            variant="outline"
            label="Request a business demo"
            size="sm"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>

      <header class="mt-8">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight glow-text">
          Fero Ferto Workforce Console
        </h1>
        <p class="mt-2 text-muted max-w-2xl">
          The centralized dashboard demo for our manpower network: delivery companies hire and monitor riders,
          riders get matched to companies and opportunities — all at a glance.
        </p>
      </header>

      <!-- Tabs -->
      <nav class="mt-6 mb-2 overflow-x-auto -mx-4 px-4">
        <div class="flex gap-1 min-w-max sm:min-w-0">
          <button
            v-for="t in tabs"
            :key="t.value"
            class="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wide border transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            :class="active === t.value ? 'bg-primary/10 border-primary/50 text-primary' : 'border-default text-muted hover:text-default hover:border-default/80'"
            :aria-current="active === t.value ? 'page' : undefined"
            @click="switchTab(t.value)"
          >
            <UIcon
              :name="t.icon"
              class="size-4"
            />
            {{ t.label }}
          </button>
        </div>
      </nav>
    </section>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <DemoOverview v-if="active === 'overview'" />
      <DemoRiders v-else-if="active === 'riders'" />
      <DemoMatching v-else-if="active === 'matching'" />
      <DemoIntelligence v-else-if="active === 'intelligence'" />
      <DemoForecast v-else-if="active === 'forecast'" />
      <DemoAssistant v-else />
    </main>
  </div>
</template>
