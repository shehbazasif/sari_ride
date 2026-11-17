<script setup lang="ts">
useSeoMeta({ title: 'How it works | Fero Ferto' })

const side = ref<'company' | 'rider'>('company')

const flows = {
  company: [
    { title: 'Send a request', text: 'Tell us the zone, the days and hours, and how many riders you need. It takes a few minutes.', icon: 'i-lucide-send' },
    { title: 'Review your shortlist', text: 'We match riders on availability, area, vehicle and track record, and show you the best fit.', icon: 'i-lucide-list-checks' },
    { title: 'Sign one agreement', text: 'You sign a service agreement with Fero Ferto. We hold the contracts with the riders.', icon: 'i-lucide-file-signature' },
    { title: 'Run your shifts', text: 'See who is checked in, live. If a rider drops out, we look for a replacement from the network.', icon: 'i-lucide-radio' },
    { title: 'Get one report', text: 'Hours, punctuality and performance in one weekly report, with one invoice from Fero Ferto.', icon: 'i-lucide-file-text' }
  ],
  rider: [
    { title: 'Apply', text: 'Share your details, your vehicle and the areas you can work. We check your documents.', icon: 'i-lucide-user-round-plus' },
    { title: 'Set your availability', text: 'Choose the days and hours you want to ride. Change them any time from your phone.', icon: 'i-lucide-calendar-days' },
    { title: 'Get matched offers', text: 'Receive offers from companies that need riders in your areas, at the times you chose.', icon: 'i-lucide-bell-ring' },
    { title: 'Sign with Fero Ferto', text: 'Your contract is with Fero Ferto, whichever company you ride for. One agreement, clear terms.', icon: 'i-lucide-file-signature' },
    { title: 'Ride and get paid', text: 'Check in to your shifts, ride, and see your hours and earnings in one place.', icon: 'i-lucide-wallet' }
  ]
}

const factors = [
  { title: 'Availability', text: 'The days and hours a rider has set, compared with the shifts the company needs.' },
  { title: 'Area', text: 'Where the rider lives and likes to work, compared with the delivery zone.' },
  { title: 'Vehicle', text: 'Bike, scooter or car, matched to the type and distance of the orders.' },
  { title: 'Track record', text: 'Punctuality, completed shifts and feedback from earlier work.' }
]
</script>

<template>
  <div>
    <section class="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:pt-24">
      <p
        class="rise eyebrow"
        style="--d:.05s"
      >
        How it works
      </p>
      <h1
        class="rise mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-highlighted sm:text-6xl"
        style="--d:.15s"
      >
        Three parties, one flow. Here is every step.
      </h1>
      <p
        class="rise mt-6 max-w-2xl text-lg text-muted"
        style="--d:.3s"
      >
        Delivery companies tell us what they need. Riders tell us when and where they can work. Fero Ferto matches them, holds the contract and keeps both sides informed.
      </p>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div v-reveal="200">
        <PlacementWorkflow />
      </div>
    </section>

    <!-- Side-by-side detail -->
    <section class="border-t border-default bg-muted/50">
      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div v-reveal>
            <p class="eyebrow">
              Step by step
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              What happens on your side
            </h2>
          </div>
          <div
            v-reveal="100"
            class="inline-flex self-start rounded-full border border-default bg-elevated p-1"
            role="tablist"
            aria-label="Choose your side"
          >
            <button
              v-for="s in [{ v: 'company', l: 'Delivery company', c: 'bg-secondary' }, { v: 'rider', l: 'Rider', c: 'bg-primary' }] as const"
              :key="s.v"
              type="button"
              role="tab"
              :aria-selected="side === s.v"
              class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
              :class="side === s.v ? 'bg-inverted text-inverted' : 'text-muted hover:text-highlighted'"
              @click="side = s.v"
            >
              <span
                class="size-2 rounded-full"
                :class="s.c"
              />{{ s.l }}
            </button>
          </div>
        </div>

        <Transition
          name="swap"
          mode="out-in"
        >
          <ol
            :key="side"
            class="relative mt-12 grid gap-4 md:grid-cols-5"
          >
            <li
              v-for="(f, i) in flows[side]"
              :key="f.title"
              class="pop relative rounded-2xl border border-default bg-elevated p-5"
              :style="{ '--d': i * 0.08 + 's' }"
            >
              <div class="flex items-center justify-between">
                <span
                  class="grid size-9 place-items-center rounded-xl"
                  :class="side === 'company' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'"
                >
                  <UIcon
                    :name="f.icon"
                    class="size-[18px]"
                  />
                </span>
                <span class="font-mono text-xs text-dimmed">0{{ i + 1 }}</span>
              </div>
              <h3 class="mt-5 font-semibold text-highlighted">
                {{ f.title }}
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-muted">
                {{ f.text }}
              </p>
            </li>
          </ol>
        </Transition>
      </div>
    </section>

    <!-- Matching -->
    <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div v-reveal>
          <p class="eyebrow">
            The matching
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            What our AI looks at
          </h2>
          <p class="mt-4 max-w-md text-muted">
            The AI suggests. People at Fero Ferto confirm every placement before contracts go out.
          </p>
        </div>
        <dl class="grid gap-px overflow-hidden rounded-2xl border border-default bg-[var(--ui-border)] sm:grid-cols-2">
          <div
            v-for="(f, i) in factors"
            :key="f.title"
            v-reveal="i * 80"
            class="bg-default p-6"
          >
            <dt class="flex items-center gap-2 font-semibold text-highlighted">
              <span class="font-mono text-xs text-primary">0{{ i + 1 }}</span>{{ f.title }}
            </dt>
            <dd class="mt-2 text-sm text-muted">
              {{ f.text }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div
        v-reveal
        class="flex flex-col gap-6 rounded-3xl bg-inverted px-7 py-12 text-inverted sm:flex-row sm:items-center sm:justify-between sm:px-12"
      >
        <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
          Want to see it with your own numbers?
        </h2>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="/contact"
            size="lg"
            label="Talk to us"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            to="/demo"
            size="lg"
            label="Open the live demo"
            color="neutral"
            variant="subtle"
          />
        </div>
      </div>
    </section>
  </div>
</template>
