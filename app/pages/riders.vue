<script setup lang="ts">
useSeoMeta({ title: 'For riders | Fero Ferto' })

const benefits = [
  { icon: 'i-lucide-clock', title: 'Flexible work', description: 'Work when it suits you, full time or part time.' },
  { icon: 'i-lucide-map', title: 'Smart orders', description: 'Get orders close to you, so less time is wasted.' },
  { icon: 'i-lucide-graduation-cap', title: 'Free training', description: 'Learn how to deliver safely, politely and quickly.' },
  { icon: 'i-lucide-wallet', title: 'Clear earnings', description: 'See what you earn for every delivery.' }
]

const requirements = [
  'Valid ID and driving licence',
  'Your own vehicle (bike, scooter or car)',
  'A smartphone',
  'Friendly, on time and responsible'
]
</script>

<template>
  <div>
    <UPageHero
      title="Ride with Fero Ferto"
      description="Join our network and get matched to delivery companies that fit your schedule."
      :links="[{ label: 'Apply now', to: '/contact', trailingIcon: 'i-lucide-arrow-right', size: 'xl' }]"
    />

    <UPageSection title="Why ride with us" :features="benefits" />

    <UPageSection title="What you need" description="Simple requirements to get started.">
      <ul class="max-w-md mx-auto space-y-3">
        <li v-for="item in requirements" :key="item" class="flex items-center gap-3">
          <UIcon name="i-lucide-circle-check" class="size-5 text-primary shrink-0" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Ready to start?"
        description="Send us your details and we will contact you."
        variant="subtle"
        :links="[{ label: 'Apply as a rider', to: '/contact', trailingIcon: 'i-lucide-arrow-right', color: 'neutral' }]"
      />
    </UPageSection>
  </div>
</template>
