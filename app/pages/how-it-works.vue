<script setup lang="ts">
useSeoMeta({ title: 'How it works | Fero Ferto' })

const business = [
  { icon: 'i-lucide-user-plus', title: 'Sign up', description: 'Tell us about your delivery operation and how many riders you need.' },
  { icon: 'i-lucide-users', title: 'Hire from the network', description: 'Choose matched, vetted riders from our workforce — no recruiting effort on your side.' },
  { icon: 'i-lucide-gauge', title: 'Track performance', description: 'See who is on shift, hours worked and workforce performance in one dashboard.' }
]

const rider = [
  { icon: 'i-lucide-file-check', title: 'Apply', description: 'Share your details, vehicle and the areas you can work.' },
  { icon: 'i-lucide-graduation-cap', title: 'Get ready', description: 'A short onboarding on safe, polite and fast delivery.' },
  { icon: 'i-lucide-briefcase', title: 'Choose your company', description: 'See open opportunities and pick the company and schedule that fit you.' }
]
</script>

<template>
  <div>
    <UPageHero
      title="How Fero Ferto works"
      description="One platform connects riders and delivery companies with data. Here is the flow, step by step."
    />

    <UPageSection title="For businesses" description="From sign-up to your first delivery." :features="business" />
    <UPageSection title="For riders" description="From application to your first order." :features="rider" />

    <UPageSection title="What the AI does" description="The AI works in the background so nobody has to do it by hand.">
      <UPageGrid class="lg:grid-cols-3">
        <UPageCard icon="i-lucide-git-merge" title="Matches riders to companies" description="Looks at skills, availability and track record to suggest each rider the delivery company where they fit best." />
        <UPageCard icon="i-lucide-handshake" title="Opens new opportunities" description="Riders see which companies need people like them and apply directly — no calls, no waiting." />
        <UPageCard icon="i-lucide-calendar-clock" title="Plans staffing for busy times" description="Learns when each company gets busy, so the right number of riders is lined up in advance." />
      </UPageGrid>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        title="Want to see it live?"
        description="Book a short demo and we will walk you through it."
        variant="subtle"
        :links="[{ label: 'Request a demo', to: '/contact', trailingIcon: 'i-lucide-arrow-right', color: 'neutral' }]"
      />
    </UPageSection>
  </div>
</template>
