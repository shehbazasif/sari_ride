<script setup lang="ts">
useSeoMeta({
  title: 'For riders | Fero Ferto',
  description: 'Ride with Fero Ferto: set your own days and areas, get offers from delivery companies that fit, and work under one clear contract with Fero Ferto.'
})

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// rows: lunch, afternoon, evening
const slots = [
  { label: 'Lunch', on: [true, true, false, true, true, false, false] },
  { label: 'Afternoon', on: [false, false, false, false, false, true, true] },
  { label: 'Evening', on: [true, true, false, true, true, true, false] }
]

const offers = [
  { who: 'Restaurant group', zone: 'Kallithea', when: 'Fri – Sun, evenings', fit: 94, reason: 'Matches your evenings and zone' },
  { who: 'Grocery delivery', zone: 'Piraeus', when: 'Mon – Tue, lunch', fit: 90, reason: 'Close to home, scooter friendly' },
  { who: 'Courier service', zone: 'Nea Smyrni', when: 'Sat, afternoon', fit: 86, reason: 'Fits your weekend slot' }
]

const hours = [
  { d: 'Mon', h: 5 },
  { d: 'Tue', h: 4 },
  { d: 'Wed', h: 0 },
  { d: 'Thu', h: 5 },
  { d: 'Fri', h: 6 },
  { d: 'Sat', h: 2 },
  { d: 'Sun', h: 0 }
]
const maxH = 6

const requirements = [
  { icon: 'i-lucide-id-card', text: 'Valid ID and driving licence' },
  { icon: 'i-lucide-bike', text: 'Your own vehicle: bike, scooter or car' },
  { icon: 'i-lucide-smartphone', text: 'A smartphone' },
  { icon: 'i-lucide-smile', text: 'Friendly, on time and responsible' }
]

const steps = [
  { title: 'Apply', text: 'Send your details, vehicle and the areas you can work.' },
  { title: 'Short onboarding', text: 'Free training on safe, polite and fast delivery.' },
  { title: 'Set your week', text: 'Choose the days and hours you want to ride.' },
  { title: 'Start riding', text: 'Accept offers that fit and check in to your shifts.' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-20 lg:pb-28">
      <div>
        <p
          class="rise eyebrow flex items-center gap-2"
          style="--d:.05s"
        >
          <span class="size-1.5 rounded-full bg-primary" />For riders
        </p>
        <h1
          class="rise mt-5 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-highlighted sm:text-6xl lg:text-[3.6rem]"
          style="--d:.15s"
        >
          Delivery work that fits your week.<br>
          <span class="text-muted">Not the other way round.</span>
        </h1>
        <p
          class="rise mt-6 max-w-lg text-lg leading-relaxed text-muted"
          style="--d:.3s"
        >
          Tell us when and where you can ride. We match you with delivery companies that need exactly that, and you work under one clear contract with Fero Ferto.
        </p>
        <div
          class="rise mt-9 flex flex-wrap gap-3"
          style="--d:.45s"
        >
          <UButton
            to="/contact?as=rider"
            size="xl"
            label="Apply as a rider"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            to="/how-it-works"
            size="xl"
            label="How it works"
            color="neutral"
            variant="outline"
          />
        </div>
        <dl
          class="rise mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-default pt-6"
          style="--d:.55s"
        >
          <div>
            <dt class="text-xs text-muted">
              Riders in network
            </dt>
            <dd class="mt-1 text-xl font-semibold text-highlighted">
              40–50
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">
              Platforms they ride for
            </dt>
            <dd class="mt-1 text-xl font-semibold text-highlighted">
              3
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">
              Training
            </dt>
            <dd class="mt-1 text-xl font-semibold text-highlighted">
              Free
            </dd>
          </div>
        </dl>
      </div>
      <div
        class="rise"
        style="--d:.35s"
      >
        <RiderPhone />
      </div>
    </section>

    <!-- Features -->
    <section class="border-t border-default">
      <div class="mx-auto max-w-7xl space-y-24 px-4 py-24 sm:px-6 lg:space-y-32 lg:py-32">
        <!-- 1. Availability -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div v-reveal>
            <p class="eyebrow">
              01 · Your schedule
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              You choose the days and hours.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Full time, part time, weekends only. Set your week in the app and change it whenever life changes. Offers only come for the times you picked.
            </p>
          </div>
          <div
            v-reveal="120"
            class="panel p-6"
          >
            <div class="flex items-center justify-between">
              <p class="font-medium text-highlighted">
                My availability
              </p>
              <span class="font-mono text-[11px] text-dimmed">Tap to change</span>
            </div>
            <div class="mt-5 grid grid-cols-[4.5rem_repeat(7,minmax(0,1fr))] gap-1.5 text-center">
              <span />
              <span
                v-for="d in days"
                :key="d"
                class="font-mono text-[10px] text-dimmed"
              >{{ d }}</span>
              <template
                v-for="(s, r) in slots"
                :key="s.label"
              >
                <span class="self-center text-left text-xs text-muted">{{ s.label }}</span>
                <span
                  v-for="(o, c) in s.on"
                  :key="c"
                  class="pop h-9 rounded-lg"
                  :class="o ? 'bg-primary' : 'bg-muted'"
                  :style="{ '--d': 0.15 + (r * 7 + c) * 0.03 + 's' }"
                />
              </template>
            </div>
            <p class="mt-5 flex items-center gap-2 text-xs text-muted">
              <UIcon
                name="i-lucide-map-pin"
                class="size-4 text-primary"
              />Piraeus, Kallithea · Scooter
            </p>
          </div>
        </div>

        <!-- 2. Offers -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div
            v-reveal
            class="lg:order-2"
          >
            <p class="eyebrow">
              02 · Matched offers
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              Offers that fit you, with the reason why.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Our AI compares your week, areas and vehicle with what companies need. You see each offer with how well it fits, and you decide.
            </p>
          </div>
          <div
            v-reveal="120"
            class="space-y-3 lg:order-1"
          >
            <div
              v-for="(o, i) in offers"
              :key="o.who"
              class="pop panel flex items-center gap-4 p-4"
              :style="{ '--d': 0.2 + i * 0.18 + 's', 'margin-left': i * 1.25 + 'rem', 'margin-right': (2 - i) * 1.25 + 'rem' }"
            >
              <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/10">
                <UIcon
                  name="i-lucide-building-2"
                  class="size-5 text-secondary"
                />
              </span>
              <div class="min-w-0 flex-1">
                <p class="truncate font-semibold text-highlighted">
                  {{ o.who }} <span class="font-normal text-muted">· {{ o.zone }}</span>
                </p>
                <p class="truncate text-xs text-muted">
                  {{ o.when }} · {{ o.reason }}
                </p>
              </div>
              <span class="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs font-medium text-primary">{{ o.fit }}%</span>
            </div>
          </div>
        </div>

        <!-- 3. Contract -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div v-reveal>
            <p class="eyebrow">
              03 · One contract
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              Your contract is with Fero Ferto.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Whichever company you ride for, you have one agreement with clear terms, and one team to talk to when something comes up.
            </p>
          </div>
          <div
            v-reveal="120"
            class="relative mx-auto w-full max-w-md"
          >
            <!-- three companies feeding into one contract -->
            <div class="flex justify-between gap-2">
              <span
                v-for="(c, i) in ['Restaurant', 'Grocery', 'Courier']"
                :key="c"
                class="pop rounded-full border border-default bg-elevated px-3 py-1.5 text-xs text-muted"
                :style="{ '--d': 0.1 + i * 0.1 + 's' }"
              >
                {{ c }}
              </span>
            </div>
            <svg
              viewBox="0 0 300 56"
              class="h-14 w-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M40 0 C40 30 150 26 150 56 M150 0 V56 M260 0 C260 30 150 26 150 56"
                stroke="var(--ui-border-accented)"
                stroke-width="1.5"
                stroke-dasharray="4 5"
                vector-effect="non-scaling-stroke"
              />
            </svg>
            <div class="panel p-6">
              <div class="flex items-center gap-3">
                <span class="grid size-10 place-items-center rounded-xl bg-inverted text-inverted">
                  <UIcon
                    name="i-lucide-file-signature"
                    class="size-5"
                  />
                </span>
                <div>
                  <p class="font-semibold text-highlighted">
                    Rider contract
                  </p>
                  <p class="text-xs text-muted">
                    Nikos P. × Fero Ferto
                  </p>
                </div>
                <span
                  class="pop ml-auto flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                  style="--d:.8s"
                >
                  <UIcon
                    name="i-lucide-check"
                    class="size-3.5"
                  />Signed
                </span>
              </div>
              <ul class="mt-5 space-y-2 text-sm text-muted">
                <li class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 text-primary"
                  />One agreement for every company
                </li>
                <li class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 text-primary"
                  />Clear terms before you start
                </li>
                <li class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-check"
                    class="size-4 text-primary"
                  />One team to contact
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 4. Hours -->
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div
            v-reveal
            class="lg:order-2"
          >
            <p class="eyebrow">
              04 · Clear hours
            </p>
            <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
              Every hour recorded, in one place.
            </h2>
            <p class="mt-4 max-w-md text-muted">
              Check in to start a shift. Your hours, shifts and earnings are recorded once and shown in the app, so there is nothing to argue about.
            </p>
          </div>
          <div
            v-reveal="120"
            class="panel p-6 lg:order-1"
          >
            <div class="flex items-baseline justify-between">
              <p class="font-medium text-highlighted">
                This week
              </p>
              <p class="font-mono text-2xl font-semibold text-highlighted">
                22h
              </p>
            </div>
            <div class="mt-6 flex h-40 items-end gap-3">
              <div
                v-for="(d, i) in hours"
                :key="d.d"
                class="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span class="font-mono text-[10px] text-muted">{{ d.h ? d.h + 'h' : '' }}</span>
                <span
                  class="bar-up w-full rounded-t-md"
                  :class="d.h ? 'bg-primary' : 'bg-muted'"
                  :style="{ 'height': Math.max(d.h / maxH * 100, 4) + '%', '--d': 0.2 + i * 0.07 + 's' }"
                />
                <span class="font-mono text-[10px] text-dimmed">{{ d.d }}</span>
              </div>
            </div>
            <div class="mt-5 grid grid-cols-3 gap-2 text-center">
              <div class="rounded-xl bg-muted py-2.5">
                <p class="font-semibold">
                  5
                </p><p class="text-[11px] text-muted">
                  Shifts
                </p>
              </div>
              <div class="rounded-xl bg-muted py-2.5">
                <p class="font-semibold">
                  100%
                </p><p class="text-[11px] text-muted">
                  On time
                </p>
              </div>
              <div class="rounded-xl bg-muted py-2.5">
                <p class="font-semibold">
                  4.9
                </p><p class="text-[11px] text-muted">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Getting started -->
    <section class="border-t border-default bg-muted/50">
      <div class="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div v-reveal>
          <p class="eyebrow">
            Getting started
          </p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-highlighted sm:text-4xl">
            Four steps to your first shift.
          </h2>
          <ol class="relative mt-10 space-y-7 pl-12">
            <span class="absolute top-4 bottom-4 left-[15px] w-px bg-[var(--ui-border-accented)]" />
            <li
              v-for="(s, i) in steps"
              :key="s.title"
              v-reveal="i * 100"
              class="relative"
            >
              <span class="absolute -left-12 top-0 grid size-8 place-items-center rounded-full bg-primary font-mono text-xs text-white ring-4 ring-[var(--ui-bg)]">{{ i + 1 }}</span>
              <p class="font-semibold text-highlighted">
                {{ s.title }}
              </p>
              <p class="mt-1 text-sm text-muted">
                {{ s.text }}
              </p>
            </li>
          </ol>
        </div>

        <div
          v-reveal="150"
          class="self-start"
        >
          <div class="panel p-7">
            <p class="eyebrow">
              What you need
            </p>
            <ul class="mt-5 divide-y divide-default">
              <li
                v-for="r in requirements"
                :key="r.text"
                class="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <UIcon
                    :name="r.icon"
                    class="size-5 text-primary"
                  />
                </span>
                <span class="text-highlighted">{{ r.text }}</span>
              </li>
            </ul>
            <UButton
              to="/contact?as=rider"
              size="lg"
              block
              label="Apply as a rider"
              trailing-icon="i-lucide-arrow-right"
              class="mt-7"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div
        v-reveal
        class="flex flex-col gap-6 rounded-3xl bg-inverted px-7 py-12 text-inverted sm:flex-row sm:items-center sm:justify-between sm:px-12"
      >
        <div>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to ride?
          </h2>
          <p class="mt-2 opacity-70">
            Send us your details and we will get in touch about onboarding.
          </p>
        </div>
        <UButton
          to="/contact?as=rider"
          size="lg"
          label="Apply as a rider"
          trailing-icon="i-lucide-arrow-right"
          class="self-start sm:self-auto"
        />
      </div>
    </section>
  </div>
</template>
