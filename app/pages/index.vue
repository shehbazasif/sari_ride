<script setup lang="ts">
const stats = [
  { value: '40-50', label: 'delivery professionals in our network' },
  { value: '3', label: 'major delivery companies served in Greece: eFOOD, BOX Delivery, Wolt' },
  { value: '2', label: 'regions: Europe and the GCC' }
]

const features = [
  { icon: 'i-lucide-radar', title: 'Know who is available', description: 'See which riders can work, when, and on what vehicle, before you need them.' },
  { icon: 'i-lucide-activity', title: 'Understand working patterns', description: 'Learn when riders work best and how much workload they can handle.' },
  { icon: 'i-lucide-git-merge', title: 'Match riders to companies', description: 'AI pairs each rider with the delivery company where they fit best.' },
  { icon: 'i-lucide-chart-no-axes-combined', title: 'Plan ahead with forecasts', description: 'Predict busy hours and seasons, so the right number of riders is ready.' }
]

const steps = [
  { icon: 'i-lucide-database', title: '1. Collect', description: 'We gather availability, shifts and workload from our rider network.' },
  { icon: 'i-lucide-scan-search', title: '2. Understand', description: 'AI finds patterns in when and how riders work.' },
  { icon: 'i-lucide-git-merge', title: '3. Match', description: 'Riders are matched to the companies that need them.' },
  { icon: 'i-lucide-calendar-clock', title: '4. Plan', description: 'Forecasts tell you how many riders to line up next.' }
]
</script>

<template>
  <div class="relative">
    <div class="grid-bg absolute inset-x-0 top-0 h-[44rem] -z-0 pointer-events-none" />

    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <p class="rise inline-flex items-center gap-2 text-sm font-mono text-primary border border-primary/30 rounded-full px-3 py-1" style="--d:.05s">
          <span class="size-2 rounded-full bg-primary animate-pulse" />
          Delivery workforce intelligence
        </p>
        <h1 class="rise mt-6 text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight glow-text" style="--d:.2s">
          Know your delivery workforce before the orders arrive.
        </h1>
        <p class="rise mt-6 text-lg text-muted max-w-xl" style="--d:.4s">
          Fero Ferto is building an AI platform that shows delivery and logistics companies who is available, how riders work and how much demand is coming, so riders are matched and planned smarter.
        </p>
        <div class="rise mt-8 flex flex-wrap gap-3" style="--d:.6s">
          <UButton to="/demo" size="xl" label="Open the live demo" trailing-icon="i-lucide-arrow-right" />
          <UButton to="/how-it-works" size="xl" label="See how it works" color="neutral" variant="outline" />
        </div>
      </div>
      <div class="rise" style="--d:.5s">
        <HeroRadar />
      </div>
    </section>

    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div class="panel grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-default">
        <div v-for="s in stats" :key="s.label" class="p-6">
          <p class="text-4xl font-bold text-primary">{{ s.value }}</p>
          <p class="mt-2 text-sm text-muted">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <UPageSection
      title="One platform for availability, matching and planning"
      description="Built on real delivery operations in Greece, not guesses."
      :features="features"
    />

    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">See demand and riders on one screen</h2>
        <p class="mt-4 text-muted max-w-lg">
          Today, workforce coordination is done by phone calls and spreadsheets. Fero Ferto turns it into a live view: how many riders you have, when they are free, and when orders will peak.
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="t in ['Fewer missed shifts', 'Faster rider-to-company matching', 'Less time spent on coordination']" :key="t" class="flex items-center gap-3">
            <UIcon name="i-lucide-circle-check" class="size-5 text-primary shrink-0" />{{ t }}
          </li>
        </ul>
      </div>
      <DemandPanel />
    </section>

    <UPageSection title="How it works" description="From raw rider data to a clear plan." :features="steps" />

    <UPageSection
      id="where"
      title="Where we operate"
      description="Fero Ferto serves delivery and logistics companies across Europe and the GCC."
    >
      <UPageGrid class="lg:grid-cols-2 max-w-3xl mx-auto">
        <div class="panel p-6">
          <UIcon name="i-lucide-landmark" class="size-7 text-primary" />
          <h3 class="mt-3 text-xl font-semibold">Europe</h3>
          <p class="mt-2 text-muted">Our home market. Our riders already work with eFOOD, BOX Delivery and Wolt in Greece.</p>
        </div>
        <div class="panel p-6">
          <UIcon name="i-lucide-globe" class="size-7 text-primary" />
          <h3 class="mt-3 text-xl font-semibold">GCC</h3>
          <p class="mt-2 text-muted">Growing across the Gulf, starting with Qatar, with AI planning for local delivery companies.</p>
        </div>
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="See the platform with your own numbers"
        description="Tell us about your delivery operation and we will show you how Fero Ferto can help."
        variant="subtle"
        :links="[
          { label: 'Try the interactive demo', to: '/demo', trailingIcon: 'i-lucide-arrow-right' },
          { label: 'Request a business demo', to: '/contact', color: 'neutral', variant: 'outline' }
        ]"
      />
    </UPageSection>
  </div>
</template>
