<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' }
})

const title = 'Fero Ferto | Delivery workforce, managed'
const description = 'Fero Ferto is the manpower company that connects trained delivery riders with delivery companies — riders find new opportunities, companies hire and track workforce performance in one dashboard.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const route = useRoute()

const items = computed(() => [
  { label: 'Home', to: '/', active: route.path === '/' },
  { label: 'How it works', to: '/how-it-works', active: route.path.startsWith('/how-it-works') },
  { label: 'For businesses', to: '/businesses', active: route.path.startsWith('/businesses') },
  { label: 'For riders', to: '/riders', active: route.path.startsWith('/riders') },
  { label: 'Live demo', to: '/demo', active: route.path.startsWith('/demo') },
  { label: 'Contact', to: '/contact', active: route.path.startsWith('/contact') }
])
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" aria-label="Fero Ferto home">
          <AppLogo />
        </NuxtLink>
      </template>

      <UNavigationMenu :items="items" variant="link" />

      <template #right>
        <UColorModeButton />
        <UButton to="/demo" label="Request a demo" class="hidden sm:inline-flex" trailing-icon="i-lucide-arrow-right" />
      </template>

      <template #body>
        <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} Fero Ferto. All rights reserved.
        </p>
      </template>

      <UNavigationMenu :items="items" variant="link" />

      <template #right>
        <UButton
          to="mailto:hello@feroferto.gr"
          icon="i-lucide-mail"
          aria-label="Email Fero Ferto"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
