<script setup lang="ts">
useSeoMeta({ title: 'How it works | Fero Ferto' })

const business = [
  { icon: 'i-lucide-user-plus', title: 'Sign up', description: 'Tell us about your business and how many deliveries you expect.' },
  { icon: 'i-lucide-plug', title: 'Send orders', description: 'Add orders in our dashboard. Connecting your own system comes later.' },
  { icon: 'i-lucide-eye', title: 'Track everything', description: 'Watch each delivery live and see simple reports at the end of the day.' }
]

const rider = [
  { icon: 'i-lucide-file-check', title: 'Apply', description: 'Share your details and the vehicle you use.' },
  { icon: 'i-lucide-graduation-cap', title: 'Get trained', description: 'Short training on safe, polite and fast delivery.' },
  { icon: 'i-lucide-wallet', title: 'Start earning', description: 'Accept orders in the app and deliver.' }
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
        <UPageCard icon="i-lucide-crosshair" title="Picks the best rider" description="Looks at who is closest, who is free and who is best suited for the order." />
        <UPageCard icon="i-lucide-route" title="Finds a good route" description="Suggests a faster path so the food arrives hot and the parcel arrives on time." />
        <UPageCard icon="i-lucide-calendar-clock" title="Plans for busy times" description="Learns when orders go up, so enough riders are ready." />
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
