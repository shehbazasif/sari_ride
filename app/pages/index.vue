<script setup lang="ts">
const stats = [
  { value: '40–50', label: 'delivery riders in our network' },
  { value: '3', label: 'delivery companies our riders work with in Greece' },
  { value: '2', label: 'regions served: Europe and the GCC' }
]

const partners = [
  { name: 'BOX NOW', logo: '/partners/boxnow.svg', imgClass: 'h-14' },
  { name: 'efood', logo: '/partners/efood.svg', imgClass: 'h-10' },
  { name: 'BSK Group', logo: '/partners/bsk.png', imgClass: 'h-14' }
]

const companySide = [
  'Tell us the zone, the shifts and how many riders you need.',
  'Get riders matched on availability, area, vehicle and track record.',
  'Sign one service agreement. Fero Ferto holds the rider contracts.',
  'See check-ins, hours and performance in one dashboard.'
]

const riderSide = [
  'Set the days, hours and areas you can work.',
  'Get offers from companies that fit your schedule.',
  'One clear contract with Fero Ferto, whichever company you ride for.',
  'See your shifts, hours and earnings in one place.'
]

const reasons = [
  { n: '01', title: 'One contract in the middle', text: 'Riders and companies each sign with Fero Ferto. Neither side has to manage the other\'s paperwork, and both know who to call.' },
  { n: '02', title: 'Matches that hold up on a Friday night', text: 'Matching looks at when riders really work, where, on what vehicle and how reliably. Not just who happens to be free.' },
  { n: '03', title: 'Built inside real delivery work', text: 'Our riders already deliver for BOX NOW, efood and BSK Group. The platform is shaped by that daily work.' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-24 lg:pb-28">
      <div>
        <p
          class="rise eyebrow"
          style="--d:.05s"
        >
          Registered staffing intermediary · Greece
        </p>
        <h1
          class="rise mt-5 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-highlighted sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]"
          style="--d:.15s"
        >
          Riders find work.<br>
          Companies find riders.<br>
          <span class="text-muted">We hold the contract.</span>
        </h1>
        <p
          class="rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
          style="--d:.3s"
        >
          Fero Ferto sits between delivery riders and delivery companies. Our AI matches each rider to work that fits, each company to riders it can rely on, and we manage the agreement for both sides.
        </p>
        <div
          class="rise mt-9 flex flex-wrap items-center gap-3"
          style="--d:.45s"
        >
          <UButton
            to="/businesses"
            size="xl"
            label="I need riders"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            to="/riders"
            size="xl"
            label="I want to ride"
            color="neutral"
            variant="outline"
          />
          <ULink
            to="/demo"
            class="ml-1 text-sm text-muted underline-offset-4 hover:text-highlighted hover:underline"
          >
            or open the live demo
          </ULink>
        </div>
      </div>
      <div
        class="rise"
        style="--d:.35s"
      >
        <HeroMatch />
      </div>
    </section>

    <!-- Proof -->
    <section class="border-y border-default bg-muted/60">
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <p
          v-reveal
          class="eyebrow text-center"
        >
          Our riders work with
        </p>
        <ul class="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <li
            v-for="(p, i) in partners"
            :key="p.name"
            v-reveal="i * 80"
            class="flex h-24 items-center justify-center rounded-2xl border border-default bg-default px-8 transition-shadow hover:shadow-sm"
          >
            <img
              v-if="p.logo"
              :src="p.logo"
              :alt="p.name"
              :class="p.imgClass"
              class="w-auto object-contain"
              loading="lazy"
            >
            <span
              v-else
              class="text-2xl font-bold tracking-tight text-highlighted"
            >{{ p.name }}</span>
          </li>
        </ul>
        <dl class="mx-auto mt-12 grid max-w-4xl grid-cols-1 divide-y divide-default border-t border-default sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div
            v-for="(s, i) in stats"
            :key="s.label"
            v-reveal="i * 100"
            class="px-6 pt-6 pb-2 text-center"
          >
            <dt class="sr-only">
              {{ s.label }}
            </dt>
            <dd class="text-4xl font-semibold tracking-tight text-highlighted">
              {{ s.value }}
            </dd>
            <dd class="mx-auto mt-2 max-w-[14rem] text-sm leading-snug text-muted">
              {{ s.label }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Workflow -->
    <section
      id="workflow"
      class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32"
    >
      <div class="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div v-reveal>
          <p class="eyebrow">
            How a placement works
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-5xl">
            One request, followed from both sides.
          </h2>
        </div>
        <p
          v-reveal="120"
          class="max-w-lg text-muted lg:justify-self-end"
        >
          Watch how a company's request and a rider's availability meet. Every step runs through Fero Ferto, so both sides always know where they stand.
        </p>
      </div>
      <div
        v-reveal="150"
        class="mt-12"
      >
        <PlacementWorkflow />
      </div>
    </section>

    <!-- Two sides -->
    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
      <div class="grid gap-4 lg:grid-cols-2">
        <div
          v-reveal
          class="panel flex flex-col p-7 sm:p-9"
        >
          <p class="flex items-center gap-2 text-sm font-medium">
            <span class="size-2 rounded-full bg-secondary" /> For delivery companies
          </p>
          <h3 class="mt-4 text-2xl font-semibold tracking-tight text-highlighted">
            Reliable riders without the hiring.
          </h3>
          <ol class="mt-6 flex-1 space-y-4">
            <li
              v-for="(t, i) in companySide"
              :key="t"
              class="flex gap-4"
            >
              <span class="pt-0.5 font-mono text-xs text-dimmed">0{{ i + 1 }}</span>
              <span class="text-muted">{{ t }}</span>
            </li>
          </ol>
          <UButton
            to="/businesses"
            label="For companies"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-arrow-right"
            class="mt-8 self-start"
          />
        </div>
        <div
          v-reveal="120"
          class="panel flex flex-col p-7 sm:p-9"
        >
          <p class="flex items-center gap-2 text-sm font-medium">
            <span class="size-2 rounded-full bg-primary" /> For riders
          </p>
          <h3 class="mt-4 text-2xl font-semibold tracking-tight text-highlighted">
            Steady work that fits your week.
          </h3>
          <ol class="mt-6 flex-1 space-y-4">
            <li
              v-for="(t, i) in riderSide"
              :key="t"
              class="flex gap-4"
            >
              <span class="pt-0.5 font-mono text-xs text-dimmed">0{{ i + 1 }}</span>
              <span class="text-muted">{{ t }}</span>
            </li>
          </ol>
          <UButton
            to="/riders"
            label="For riders"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-arrow-right"
            class="mt-8 self-start"
          />
        </div>
      </div>
    </section>

    <!-- Why a middle party -->
    <section class="border-t border-default">
      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div v-reveal>
            <p class="eyebrow">
              Why Fero Ferto
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              Why it works better with someone in the middle.
            </h2>
          </div>
          <div class="divide-y divide-default border-y border-default">
            <div
              v-for="(r, i) in reasons"
              :key="r.n"
              v-reveal="i * 100"
              class="grid gap-2 py-7 sm:grid-cols-[4rem_1fr]"
            >
              <span class="font-mono text-sm text-primary">{{ r.n }}</span>
              <div>
                <h3 class="text-lg font-semibold text-highlighted">
                  {{ r.title }}
                </h3>
                <p class="mt-1.5 max-w-xl text-muted">
                  {{ r.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Regions -->
    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-reveal
          class="rounded-2xl border border-default p-7"
        >
          <p class="eyebrow">
            Europe · Home market
          </p>
          <p class="mt-3 text-muted">
            Based in Greece, where our riders already work with BOX NOW, efood and BSK Group.
          </p>
        </div>
        <div
          v-reveal="100"
          class="rounded-2xl border border-default p-7"
        >
          <p class="eyebrow">
            GCC · Growing
          </p>
          <p class="mt-3 text-muted">
            Expanding across the Gulf, starting with Qatar, with AI planning for local delivery companies.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div
        v-reveal
        class="overflow-hidden rounded-3xl bg-inverted px-7 py-14 text-inverted sm:px-14 sm:py-20"
      >
        <div class="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h2 class="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Tell us what you need this week.
            </h2>
            <p class="mt-4 max-w-lg opacity-70">
              Short on riders for the weekend, or looking for steady shifts? Send us a message and we will come back with a match.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 lg:justify-end">
            <UButton
              to="/contact?as=company"
              size="xl"
              label="Request riders"
              trailing-icon="i-lucide-arrow-right"
            />
            <UButton
              to="/contact?as=rider"
              size="xl"
              label="Apply as a rider"
              color="neutral"
              variant="subtle"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
