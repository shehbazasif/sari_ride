<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/images/logo.png' }
  ],
  htmlAttrs: { lang: 'en' }
})

const title = 'Fero Ferto | Delivery workforce, managed'
const description = 'Fero Ferto is a registered staffing intermediary in Greece that connects delivery riders with delivery companies. Our AI matches riders to jobs and companies to compatible riders, and we manage the contract between them.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})

const route = useRoute()

const footerColumns = [
  {
    label: 'Companies',
    links: [
      { label: 'For businesses', to: '/businesses' },
      { label: 'Request riders', to: '/contact?as=company' },
      { label: 'Live demo', to: '/demo' }
    ]
  },
  {
    label: 'Riders',
    links: [
      { label: 'Ride with us', to: '/riders' },
      { label: 'Apply as a rider', to: '/contact?as=rider' },
      { label: 'Van rental & drivers', to: '/van-rental' }
    ]
  },
  {
    label: 'Fero Ferto',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Contact', to: '/contact' }
    ]
  }
]

const items = computed(() => [
  { label: 'Home', to: '/', active: route.path === '/' },
  { label: 'How it works', to: '/how-it-works', active: route.path.startsWith('/how-it-works') },
  { label: 'For businesses', to: '/businesses', active: route.path.startsWith('/businesses') },
  { label: 'For riders', to: '/riders', active: route.path.startsWith('/riders') },
  { label: 'Van rental', to: '/van-rental', active: route.path.startsWith('/van-rental') },
  { label: 'Live demo', to: '/demo', active: route.path.startsWith('/demo') },
  { label: 'About', to: '/about', active: route.path.startsWith('/about') },
  { label: 'Contact', to: '/contact', active: route.path.startsWith('/contact') }
])
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          aria-label="Fero Ferto home"
        >
          <AppLogo />
        </NuxtLink>
      </template>

      <UNavigationMenu
        :items="items"
        variant="link"
      />

      <template #right>
        <UColorModeButton />
        <UButton
          to="/demo"
          label="Request a demo"
          class="hidden sm:inline-flex"
          trailing-icon="i-lucide-arrow-right"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter :ui="{ top: 'border-b border-default' }">
      <template #top>
        <UContainer class="grid gap-10 py-14 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div class="max-w-sm">
            <NuxtLink
              to="/"
              aria-label="Fero Ferto home"
            >
              <AppLogo />
            </NuxtLink>
            <p class="mt-4 text-sm leading-relaxed text-muted">
              A registered staffing intermediary in Greece. We match delivery riders with delivery companies and hold the contract for both sides.
            </p>
            <a
              href="mailto:info@feroferto.com"
              class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-highlighted underline-offset-4 hover:underline"
            >
              <UIcon
                name="i-lucide-mail"
                class="size-4 text-primary"
              />
              info@feroferto.com
            </a>
          </div>

          <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div
              v-for="col in footerColumns"
              :key="col.label"
            >
              <p class="eyebrow">
                {{ col.label }}
              </p>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="link in col.links"
                  :key="link.label"
                >
                  <ULink
                    :to="link.to"
                    class="text-sm text-muted transition-colors hover:text-highlighted"
                  >
                    {{ link.label }}
                  </ULink>
                </li>
              </ul>
            </div>
          </div>
        </UContainer>
      </template>

      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} Fero Ferto. All rights reserved.
        </p>
      </template>

      <p class="flex items-center gap-2 text-sm text-muted">
        <span class="size-1.5 rounded-full bg-primary" />
        Greece · Europe and the GCC
      </p>

      <template #right>
        <UColorModeButton />
        <UButton
          to="mailto:info@feroferto.com"
          icon="i-lucide-mail"
          aria-label="Email Fero Ferto"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
