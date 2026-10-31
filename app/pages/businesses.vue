<script setup lang="ts">
useSeoMeta({ title: 'For businesses | Fero Ferto' })

const benefits = [
  { icon: 'i-lucide-utensils', title: 'Restaurants and cafes', description: 'Fast delivery that keeps food fresh and customers happy.' },
  { icon: 'i-lucide-shopping-bag', title: 'Online shops', description: 'Same-day delivery without building your own team.' },
  { icon: 'i-lucide-truck', title: 'B2B and wholesale', description: 'Regular deliveries to your business customers, on schedule.' },
  { icon: 'i-lucide-calendar-range', title: 'Seasonal peaks', description: 'Add riders for holidays and events, then scale back.' },
  { icon: 'i-lucide-banknote', title: 'Lower hassle and cost', description: 'No hiring, no training, no managing riders every day.' },
  { icon: 'i-lucide-shield-check', title: 'Reliable and clear', description: 'Know who is delivering and where the order is, always.' }
]
</script>

<template>
  <div>
    <UPageHero
      title="Built for delivery and logistics companies"
      description="Know your riders, match them faster and plan for busy periods with data."
      :links="[{ label: 'Request a demo', to: '/contact', trailingIcon: 'i-lucide-arrow-right', size: 'xl' }]"
    />

    <UPageSection title="Who it is for" description="Any business that needs deliveries done well." :features="benefits" />

    <UPageSection>
      <UPageCTA
        title="Tell us what you deliver"
        description="We will suggest the simplest setup for your business."
        variant="subtle"
        :links="[{ label: 'Talk to us', to: '/contact', trailingIcon: 'i-lucide-arrow-right', color: 'neutral' }]"
      />
    </UPageSection>
  </div>
</template>
