<script setup lang="ts">
useSeoMeta({
  title: 'For delivery companies | Fero Ferto',
  description: 'Get matched delivery riders for your zone and shifts. Fero Ferto holds the rider contracts, so you sign one agreement and see every shift live.'
})

const shortlist = [
  { i: 'NP', name: 'Nikos P.', meta: 'Scooter · 4 km away', fit: 94 },
  { i: 'EK', name: 'Eleni K.', meta: 'Scooter · 6 km away', fit: 91 },
  { i: 'GM', name: 'Giorgos M.', meta: 'Car · 3 km away', fit: 87 },
  { i: 'MT', name: 'Maria T.', meta: 'E-bike · 5 km away', fit: 84 }
]

const week = [
  { d: 'Mon', need: 42, have: 46 },
  { d: 'Tue', need: 46, have: 50 },
  { d: 'Wed', need: 50, have: 52 },
  { d: 'Thu', need: 58, have: 60 },
  { d: 'Fri', need: 84, have: 70 },
  { d: 'Sat', need: 96, have: 74 },
  { d: 'Sun', need: 80, have: 72 }
]

const roster = [
  { i: 'NP', t: '17:52' },
  { i: 'EK', t: '17:55' },
  { i: 'GM', t: '17:58' },
  { i: 'MT', t: '18:01' }
]

const useCases = [
  { icon: 'i-lucide-utensils', title: 'Restaurants and cafes', text: 'Riders for lunch and dinner peaks.' },
  { icon: 'i-lucide-shopping-bag', title: 'Online shops', text: 'Same-day delivery without your own team.' },
  { icon: 'i-lucide-truck', title: 'B2B and wholesale', text: 'Regular routes, on schedule.' },
  { icon: 'i-lucide-calendar-range', title: 'Seasonal peaks', text: 'More riders for holidays and events.' },
  { icon: 'i-lucide-bike', title: 'Delivery platforms', text: 'Extra riders for busy zones and hours.' },
  { icon: 'i-lucide-package', title: 'Couriers', text: 'Drivers and riders for parcel rounds.' }
]

const demoTabs = [
  { icon: 'i-lucide-layout-dashboard', label: 'Overview' },
  { icon: 'i-lucide-users', label: 'Rider management' },
  { icon: 'i-lucide-git-merge', label: 'Smart matching' },
  { icon: 'i-lucide-brain-circuit', label: 'Intelligence' },
  { icon: 'i-lucide-chart-line', label: 'Forecasting' },
  { icon: 'i-lucide-message-circle-question', label: 'AI assistant' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:pt-20 lg:pb-28">
      <div>
        <p
          class="rise eyebrow flex items-center gap-2"
          style="--d:.05s"
        >
          <span class="size-1.5 rounded-full bg-secondary" />For delivery companies
        </p>
        <h1
          class="rise mt-5 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-highlighted sm:text-6xl lg:text-[3.5rem]"
          style="--d:.15s"
        >
          Riders when you need them.<br>
          <span class="text-muted">Contracts handled by us.</span>
        </h1>
        <p
          class="rise mt-6 max-w-lg text-lg leading-relaxed text-muted"
          style="--d:.3s"
        >
          Tell us your zone and shifts. We match riders who fit, hold their contracts, and show you every shift live, in one console.
        </p>
        <div
          class="rise mt-9 flex flex-wrap gap-3"
          style="--d:.45s"
        >
          <UButton
            to="/contact?as=company"
            size="xl"
            label="Request riders"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            to="/demo"
            size="xl"
            label="Open the live demo"
            color="neutral"
            variant="outline"
          />
        </div>
      </div>
      <div
        class="rise"
        style="--d:.35s"
      >
        <BizConsole />
      </div>
    </section>

    <!-- Features with visuals -->
    <section class="border-t border-default">
      <div class="mx-auto max-w-7xl space-y-24 px-4 py-24 sm:px-6 lg:space-y-32 lg:py-32">
        <!-- 1. Matching -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div v-reveal>
            <p class="eyebrow">
              01 · Matching
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              Riders who fit your shifts, not just anyone free.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Send the zone, days and hours. We shortlist riders by availability, area, vehicle and track record, and you see why each one fits.
            </p>
          </div>
          <div
            v-reveal="120"
            class="panel p-6"
          >
            <div class="flex items-center justify-between">
              <p class="font-medium text-highlighted">
                Shortlist · Kallithea, Fri – Sun
              </p>
              <span class="font-mono text-[11px] text-dimmed">4 of 14</span>
            </div>
            <ul class="mt-5 space-y-4">
              <li
                v-for="(r, i) in shortlist"
                :key="r.i"
                class="flex items-center gap-3"
              >
                <span class="grid size-9 place-items-center rounded-full bg-accented text-xs font-semibold">{{ r.i }}</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-baseline justify-between text-sm">
                    <span class="font-medium text-highlighted">{{ r.name }} <span class="font-normal text-dimmed">· {{ r.meta }}</span></span>
                    <span class="font-mono text-xs">{{ r.fit }}%</span>
                  </div>
                  <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      class="fill-x h-full rounded-full bg-secondary"
                      :style="{ 'width': r.fit + '%', '--d': 0.2 + i * 0.15 + 's' }"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 2. Contract -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div
            v-reveal
            class="lg:order-2"
          >
            <p class="eyebrow">
              02 · Contracts
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              One agreement with Fero Ferto.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              You sign a service agreement with us. We hold the contracts with the riders, so you don't hire, onboard or manage rider paperwork.
            </p>
          </div>
          <div
            v-reveal="120"
            class="relative lg:order-1"
          >
            <div class="panel relative mx-auto max-w-md p-7">
              <div class="flex items-start justify-between">
                <div>
                  <p class="eyebrow">
                    Service agreement
                  </p>
                  <p class="mt-2 text-lg font-semibold text-highlighted">
                    Your company × Fero Ferto
                  </p>
                </div>
                <UIcon
                  name="i-lucide-file-signature"
                  class="size-6 text-secondary"
                />
              </div>
              <dl class="mt-6 space-y-2.5 text-sm">
                <div class="flex justify-between border-b border-dashed border-default pb-2.5">
                  <dt class="text-muted">
                    Riders
                  </dt><dd class="font-medium">
                    6
                  </dd>
                </div>
                <div class="flex justify-between border-b border-dashed border-default pb-2.5">
                  <dt class="text-muted">
                    Zone
                  </dt><dd class="font-medium">
                    Kallithea
                  </dd>
                </div>
                <div class="flex justify-between border-b border-dashed border-default pb-2.5">
                  <dt class="text-muted">
                    Schedule
                  </dt><dd class="font-medium">
                    Fri – Sun, 18:00 – 23:00
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted">
                    Rider contracts
                  </dt><dd class="font-medium">
                    Held by Fero Ferto
                  </dd>
                </div>
              </dl>
              <div class="mt-6 grid grid-cols-2 gap-3">
                <div class="rounded-xl border border-default p-3">
                  <p class="text-[11px] text-muted">
                    Your company
                  </p>
                  <p
                    class="pop mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                    style="--d:.6s"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="size-4"
                    />Signed
                  </p>
                </div>
                <div class="rounded-xl border border-default p-3">
                  <p class="text-[11px] text-muted">
                    Fero Ferto
                  </p>
                  <p
                    class="pop mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                    style="--d:1s"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="size-4"
                    />Signed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Live shifts -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div v-reveal>
            <p class="eyebrow">
              03 · Live shifts
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              See who is on shift, as it happens.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Riders check in from their phone. You see the roster fill up, hours worked and punctuality, without a single phone call.
            </p>
          </div>
          <div
            v-reveal="120"
            class="panel p-6"
          >
            <div class="flex items-baseline justify-between">
              <p class="font-medium text-highlighted">
                Friday · 18:00 shift
              </p>
              <p class="font-mono text-xs text-muted">
                4/4 checked in
              </p>
            </div>
            <ol class="relative mt-6 space-y-4 pl-8">
              <span class="absolute top-2 bottom-2 left-[11px] w-px bg-[var(--ui-border-accented)]" />
              <li
                v-for="(r, i) in roster"
                :key="r.i"
                class="pop relative flex items-center gap-3"
                :style="{ '--d': 0.3 + i * 0.3 + 's' }"
              >
                <span class="absolute -left-8 top-1/2 grid size-[23px] -translate-y-1/2 place-items-center rounded-full bg-emerald-500 ring-4 ring-[var(--ui-bg-elevated)]">
                  <UIcon
                    name="i-lucide-check"
                    class="size-3 text-white"
                  />
                </span>
                <span class="grid size-8 place-items-center rounded-full bg-accented text-[10px] font-semibold">{{ r.i }}</span>
                <span class="flex-1 text-sm">Checked in at Kallithea hub</span>
                <span class="font-mono text-xs text-muted">{{ r.t }}</span>
              </li>
            </ol>
          </div>
        </div>

        <!-- 4. Planning -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div
            v-reveal
            class="lg:order-2"
          >
            <p class="eyebrow">
              04 · Planning
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              Get ready for busy nights before they arrive.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              We learn when your orders peak and compare it with riders available, so gaps show up days ahead, not on Friday at 19:00.
            </p>
          </div>
          <div
            v-reveal="120"
            class="panel p-6 lg:order-1"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <p class="font-medium text-highlighted">
                Next week · riders needed vs available
              </p>
              <div class="flex gap-3 text-[11px] text-muted">
                <span class="flex items-center gap-1.5"><span class="size-2 rounded-sm bg-secondary-300 dark:bg-secondary-700" />Needed</span>
                <span class="flex items-center gap-1.5"><span class="size-2 rounded-sm bg-primary" />Available</span>
              </div>
            </div>
            <div class="mt-6 flex h-44 items-end gap-3">
              <div
                v-for="(d, i) in week"
                :key="d.d"
                class="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div class="relative flex h-full w-full items-end justify-center gap-1">
                  <span
                    class="bar-up w-1/2 rounded-t bg-secondary-300 dark:bg-secondary-700"
                    :style="{ 'height': d.need + '%', '--d': 0.2 + i * 0.07 + 's' }"
                  />
                  <span
                    class="bar-up w-1/2 rounded-t bg-primary"
                    :style="{ 'height': d.have + '%', '--d': 0.3 + i * 0.07 + 's' }"
                  />
                  <span
                    v-if="d.need > d.have"
                    class="pop absolute -top-1 left-1/2 -translate-x-1/2 rounded bg-inverted px-1 font-mono text-[9px] text-inverted"
                    :style="{ '--d': 1.2 + i * 0.05 + 's' }"
                  >−{{ Math.round((d.need - d.have) / 4) }}</span>
                </div>
                <span class="font-mono text-[10px] text-dimmed">{{ d.d }}</span>
              </div>
            </div>
            <p class="mt-4 text-xs text-muted">
              Weekend gap flagged. Fero Ferto lines up extra riders from the network.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use cases -->
    <section class="border-t border-default bg-muted/50">
      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div
          v-reveal
          class="max-w-2xl"
        >
          <p class="eyebrow">
            Who it is for
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            Any business that needs deliveries done well.
          </h2>
        </div>
        <div class="mt-12 grid gap-px overflow-hidden rounded-2xl border border-default bg-[var(--ui-border)] sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(u, i) in useCases"
            :key="u.title"
            v-reveal="i * 60"
            class="flex items-start gap-4 bg-default p-6"
          >
            <UIcon
              :name="u.icon"
              class="mt-0.5 size-5 shrink-0 text-secondary"
            />
            <div>
              <p class="font-semibold text-highlighted">
                {{ u.title }}
              </p>
              <p class="mt-1 text-sm text-muted">
                {{ u.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo band -->
    <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div
        v-reveal
        class="grid gap-10 rounded-3xl border border-default p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center"
      >
        <div>
          <p class="eyebrow">
            Live demo
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            Try the company console yourself.
          </h2>
          <p class="mt-4 max-w-md text-muted">
            No sign-up. The demo runs in your browser on example data, so you can click through everything a company sees.
          </p>
          <UButton
            to="/demo"
            size="lg"
            label="Open the live demo"
            trailing-icon="i-lucide-arrow-right"
            class="mt-7"
          />
        </div>
        <ul class="grid grid-cols-2 gap-3">
          <li
            v-for="(t, i) in demoTabs"
            :key="t.label"
            v-reveal="i * 70"
          >
            <NuxtLink
              to="/demo"
              class="group flex items-center gap-3 rounded-xl border border-default bg-elevated px-4 py-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-accented hover:shadow-sm"
            >
              <UIcon
                :name="t.icon"
                class="size-[18px] text-muted transition-colors group-hover:text-primary"
              />
              <span class="font-medium text-highlighted">{{ t.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div
        v-reveal
        class="flex flex-col gap-6 rounded-3xl bg-inverted px-7 py-12 text-inverted sm:flex-row sm:items-center sm:justify-between sm:px-12"
      >
        <div>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            Short on riders this week?
          </h2>
          <p class="mt-2 opacity-70">
            Tell us the zone and the shifts. We will come back with a match.
          </p>
        </div>
        <UButton
          to="/contact?as=company"
          size="lg"
          label="Request riders"
          trailing-icon="i-lucide-arrow-right"
          class="self-start sm:self-auto"
        />
      </div>
    </section>
  </div>
</template>
