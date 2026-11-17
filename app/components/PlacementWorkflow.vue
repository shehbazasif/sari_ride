<script setup lang="ts">
// One placement, followed from request to report. Rider on the left, company on the right,
// Fero Ferto in the middle. Steps auto-advance while in view; hover, focus or the pause
// button stop it, and reduced-motion users step through by hand.
type Dir = 'fwd' | 'rev' | 'both' | null

interface Step {
  title: string
  text: string
  hub: string
  left: Dir
  right: Dir
  leftLabel?: string
  rightLabel?: string
}

const steps: Step[] = [
  { title: 'Company requests riders', text: 'A delivery company tells Fero Ferto the zone, the shifts and how many riders it needs. One request, no job ads.', hub: 'Request received', left: null, right: 'rev', rightLabel: 'Request' },
  { title: 'Riders share availability', text: 'Riders in our network set the days, hours, areas and vehicle they can work with, from their phone.', hub: 'Checking rider profiles', left: 'fwd', right: null, leftLabel: 'Availability' },
  { title: 'AI finds the best fit', text: 'Each rider is scored on availability, area, vehicle and track record. The company gets a shortlist, the rider gets an offer that fits.', hub: 'Matching', left: null, right: null },
  { title: 'Fero Ferto holds the contract', text: 'The rider and the company each sign with Fero Ferto. We sit in the middle of the agreement, so neither side manages the other\'s paperwork.', hub: 'Contracts issued', left: 'rev', right: 'fwd', leftLabel: 'Contract', rightLabel: 'Agreement' },
  { title: 'Shifts run every day', text: 'Riders get their schedule and check in. The company sees who is on shift, live, without a single phone call.', hub: 'Shifts scheduled', left: 'rev', right: 'fwd', leftLabel: 'Schedule', rightLabel: 'Live roster' },
  { title: 'Hours, pay and feedback', text: 'Hours are recorded once and shared with both sides. Riders see their earnings, the company gets one clear weekly report.', hub: 'Hours recorded', left: 'both', right: 'both', leftLabel: 'Earnings', rightLabel: 'Report' }
]

const STEP_MS = 5600
const active = ref(0)
const cycle = ref(0)
const step = computed(() => steps[active.value]!)

const root = ref<HTMLElement>()
const inView = ref(false)
const hover = ref(false)
const userPaused = ref(false)
const reduce = ref(false)
const paused = computed(() => reduce.value || userPaused.value || hover.value || !inView.value)

function go(i: number) {
  active.value = (i + steps.length) % steps.length
  cycle.value++
}
function next() {
  go(active.value + 1)
}

let io: IntersectionObserver | undefined
onMounted(() => {
  reduce.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(([e]) => {
    inView.value = !!e?.isIntersecting
  }, { threshold: 0.35 })
  if (root.value) io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const shortlist = [
  { i: 'NP', name: 'Nikos P.', meta: 'Scooter · Kallithea', fit: 94 },
  { i: 'EK', name: 'Eleni K.', meta: 'Scooter · Piraeus', fit: 91 },
  { i: 'GM', name: 'Giorgos M.', meta: 'Car · Kallithea', fit: 87 }
]
const roster = ['NP', 'EK', 'GM', 'MT', 'KD', 'DA']
</script>

<template>
  <div
    ref="root"
    class="relative flex flex-col gap-6"
    @focusin="hover = true"
    @focusout="hover = false"
  >
    <!-- Stage (below the steps on phones, so the explanation is read first) -->
    <div
      class="panel relative order-2 overflow-hidden p-4 sm:p-6 lg:order-1 lg:p-8"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <span class="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-widest text-dimmed">Example data</span>

      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(56px,110px)_auto_minmax(56px,110px)_minmax(0,1fr)] items-center gap-0 lg:gap-0">
        <!-- Rider -->
        <div class="mx-auto w-full max-w-[290px]">
          <p class="mb-3 flex items-center gap-2 text-sm font-medium">
            <span class="size-2 rounded-full bg-primary" /> Rider
          </p>
          <div class="rounded-[26px] border border-default bg-default p-2 shadow-sm">
            <div class="rounded-[20px] bg-elevated border border-muted px-4 pt-3 pb-4 h-[268px] overflow-hidden">
              <div class="flex items-center justify-between text-[11px] text-muted font-mono">
                <span>Fero Ferto</span><span>18:02</span>
              </div>
              <Transition
                name="swap"
                mode="out-in"
              >
                <div
                  :key="active"
                  class="mt-4 text-sm"
                >
                  <template v-if="active === 0">
                    <div class="flex items-center gap-3">
                      <span class="grid size-10 place-items-center rounded-full bg-primary/12 text-primary font-semibold">NP</span>
                      <div>
                        <p class="font-semibold">
                          Nikos P.
                        </p>
                        <p class="text-xs text-muted">
                          Scooter · Piraeus, Kallithea
                        </p>
                      </div>
                    </div>
                    <div class="mt-5 flex items-center justify-between rounded-xl bg-muted px-3 py-2.5">
                      <span>Open to offers</span>
                      <span class="relative h-5 w-9 rounded-full bg-primary"><span class="absolute right-0.5 top-0.5 size-4 rounded-full bg-white" /></span>
                    </div>
                    <p class="mt-5 text-xs text-muted">
                      No new offers yet. We will let you know when a company in your area needs riders.
                    </p>
                  </template>

                  <template v-else-if="active === 1">
                    <p class="font-semibold">
                      Your availability
                    </p>
                    <div class="mt-3 flex gap-1.5">
                      <span
                        v-for="(d, i) in days"
                        :key="i"
                        class="pop grid size-7 place-items-center rounded-full text-xs"
                        :class="i < 6 ? 'bg-primary text-white' : 'bg-muted text-muted'"
                        :style="{ '--d': 0.15 + i * 0.08 + 's' }"
                      >{{ d }}</span>
                    </div>
                    <div class="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div class="rounded-lg bg-muted px-2.5 py-2">
                        <p class="text-muted">
                          Hours
                        </p><p class="font-medium">
                          18:00 – 23:00
                        </p>
                      </div>
                      <div class="rounded-lg bg-muted px-2.5 py-2">
                        <p class="text-muted">
                          Vehicle
                        </p><p class="font-medium">
                          Scooter
                        </p>
                      </div>
                    </div>
                    <div class="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <span class="rounded-full border border-default px-2 py-0.5">Piraeus</span>
                      <span class="rounded-full border border-default px-2 py-0.5">Kallithea</span>
                    </div>
                    <p
                      class="pop mt-4 flex items-center gap-1.5 text-xs font-medium text-primary"
                      style="--d:1s"
                    >
                      <UIcon
                        name="i-lucide-check"
                        class="size-4"
                      /> Shared with Fero Ferto
                    </p>
                  </template>

                  <template v-else-if="active === 2">
                    <p class="font-semibold">
                      Finding your best fit
                    </p>
                    <p class="mt-1 text-xs text-muted">
                      Comparing your schedule with open requests near you.
                    </p>
                    <div class="mt-5 space-y-2.5">
                      <div class="shimmer h-10 rounded-xl" />
                      <div
                        class="shimmer h-10 rounded-xl"
                        style="animation-delay:.15s"
                      />
                      <div
                        class="shimmer h-10 w-2/3 rounded-xl"
                        style="animation-delay:.3s"
                      />
                    </div>
                  </template>

                  <template v-else-if="active === 3">
                    <p class="text-xs font-medium text-primary">
                      New offer
                    </p>
                    <p class="mt-1 font-semibold">
                      Evening shifts · Kallithea
                    </p>
                    <ul class="mt-3 space-y-1.5 text-xs text-muted">
                      <li class="flex justify-between">
                        <span>Days</span><span class="text-default">Fri – Sun</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Hours</span><span class="text-default">18:00 – 23:00</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Contract with</span><span class="text-default">Fero Ferto</span>
                      </li>
                    </ul>
                    <div class="relative mt-5 h-10 overflow-hidden rounded-xl bg-primary text-white">
                      <span class="absolute inset-0 grid place-items-center text-sm font-medium">Review and sign</span>
                      <span
                        class="pop absolute inset-0 flex items-center justify-center gap-1.5 bg-primary-700 text-sm font-medium"
                        style="--d:1.6s"
                      >
                        <UIcon
                          name="i-lucide-check"
                          class="size-4"
                        /> Signed
                      </span>
                    </div>
                  </template>

                  <template v-else-if="active === 4">
                    <p class="text-xs text-muted">
                      Tonight
                    </p>
                    <p class="font-semibold">
                      18:00 – 23:00 · Kallithea
                    </p>
                    <div class="mt-4 rounded-xl border border-default p-3 text-xs">
                      <div class="flex items-center gap-2">
                        <span class="size-1.5 rounded-full bg-primary" />Start at Kallithea hub
                      </div>
                      <div class="ml-[2.5px] my-1 h-4 border-l border-dashed border-accented" />
                      <div class="flex items-center gap-2 text-muted">
                        <span class="size-1.5 rounded-full bg-accented" />Orders assigned on shift
                      </div>
                    </div>
                    <div class="relative mt-4 h-10 overflow-hidden rounded-xl bg-muted">
                      <span class="absolute inset-0 grid place-items-center text-sm font-medium">Check in</span>
                      <span
                        class="pop absolute inset-0 flex items-center justify-center gap-1.5 bg-emerald-600 text-sm font-medium text-white"
                        style="--d:1.2s"
                      >
                        <UIcon
                          name="i-lucide-check"
                          class="size-4"
                        /> Checked in 17:56
                      </span>
                    </div>
                  </template>

                  <template v-else>
                    <p class="font-semibold">
                      This week
                    </p>
                    <div class="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div
                        class="pop rounded-xl bg-muted py-2.5"
                        style="--d:.1s"
                      >
                        <p class="text-lg font-semibold">
                          22h
                        </p><p class="text-[11px] text-muted">
                          Hours
                        </p>
                      </div>
                      <div
                        class="pop rounded-xl bg-muted py-2.5"
                        style="--d:.2s"
                      >
                        <p class="text-lg font-semibold">
                          5
                        </p><p class="text-[11px] text-muted">
                          Shifts
                        </p>
                      </div>
                      <div
                        class="pop rounded-xl bg-muted py-2.5"
                        style="--d:.3s"
                      >
                        <p class="text-lg font-semibold">
                          4.9
                        </p><p class="text-[11px] text-muted">
                          Rating
                        </p>
                      </div>
                    </div>
                    <div
                      class="pop mt-4 flex items-center gap-2 rounded-xl border border-default px-3 py-2.5 text-xs"
                      style="--d:.6s"
                    >
                      <UIcon
                        name="i-lucide-receipt-text"
                        class="size-4 text-primary"
                      />
                      Earnings statement ready
                    </div>
                  </template>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Rider ↔ Fero Ferto -->
        <div
          class="wf-track"
          :class="{ 'is-on': step.left }"
        >
          <span class="wf-line" />
          <template v-if="step.left">
            <span
              v-if="step.left !== 'rev'"
              :key="'lf' + cycle"
              class="wf-packet bg-primary"
            />
            <span
              v-if="step.left !== 'fwd'"
              :key="'lr' + cycle"
              class="wf-packet wf-rev bg-primary"
              :class="{ 'wf-late': step.left === 'both' }"
            />
          </template>
          <Transition
            name="swap"
            mode="out-in"
          >
            <span
              v-if="step.leftLabel"
              :key="'ll' + active"
              class="wf-label"
            >{{ step.leftLabel }}</span>
          </Transition>
        </div>

        <!-- Fero Ferto -->
        <div class="flex flex-col items-center gap-3 px-2">
          <div class="relative grid size-24 place-items-center">
            <span class="pulse-ring absolute inset-0 rounded-full border border-accented" />
            <span
              class="absolute inset-1 rounded-full border border-dashed transition-colors duration-500"
              :class="active === 2 ? 'border-primary spin-slow' : 'border-accented'"
            />
            <span class="relative grid size-16 place-items-center rounded-2xl bg-inverted text-inverted shadow-lg">
              <svg
                width="30"
                height="18"
                viewBox="0 0 34 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 10H29"
                  stroke="currentColor"
                  stroke-width="1.5"
                  opacity=".35"
                />
                <circle
                  cx="5"
                  cy="10"
                  r="4"
                  class="fill-primary"
                />
                <rect
                  x="11"
                  y="4"
                  width="12"
                  height="12"
                  rx="3.5"
                  fill="currentColor"
                />
                <circle
                  cx="29"
                  cy="10"
                  r="4"
                  class="fill-secondary-400"
                />
              </svg>
            </span>
          </div>
          <div class="text-center">
            <p class="text-sm font-semibold">
              Fero Ferto
            </p>
            <Transition
              name="swap"
              mode="out-in"
            >
              <p
                :key="active"
                class="mt-0.5 font-mono text-[11px] text-muted"
              >
                {{ step.hub }}
              </p>
            </Transition>
          </div>
          <Transition name="swap">
            <div
              v-if="active === 2"
              class="hidden lg:flex flex-col gap-1 text-[11px] text-muted"
            >
              <span
                v-for="(f, i) in ['Availability', 'Area', 'Vehicle', 'Track record']"
                :key="f"
                class="pop flex items-center gap-1.5"
                :style="{ '--d': 0.2 + i * 0.25 + 's' }"
              >
                <UIcon
                  name="i-lucide-check"
                  class="size-3 text-primary"
                />{{ f }}
              </span>
            </div>
          </Transition>
        </div>

        <!-- Fero Ferto ↔ Company -->
        <div
          class="wf-track"
          :class="{ 'is-on': step.right }"
        >
          <span class="wf-line" />
          <template v-if="step.right">
            <span
              v-if="step.right !== 'rev'"
              :key="'rf' + cycle"
              class="wf-packet bg-secondary"
            />
            <span
              v-if="step.right !== 'fwd'"
              :key="'rr' + cycle"
              class="wf-packet wf-rev bg-secondary"
              :class="{ 'wf-late': step.right === 'both' }"
            />
          </template>
          <Transition
            name="swap"
            mode="out-in"
          >
            <span
              v-if="step.rightLabel"
              :key="'rl' + active"
              class="wf-label"
            >{{ step.rightLabel }}</span>
          </Transition>
        </div>

        <!-- Company -->
        <div class="mx-auto w-full max-w-[320px]">
          <p class="mb-3 flex items-center gap-2 text-sm font-medium">
            <span class="size-2 rounded-full bg-secondary" /> Delivery company
          </p>
          <div class="rounded-2xl border border-default bg-elevated shadow-sm h-[284px] overflow-hidden">
            <div class="flex items-center justify-between border-b border-default px-4 py-2.5 text-[11px] text-muted font-mono">
              <span>Dispatch · Kallithea</span>
              <span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full bg-emerald-500" />Live</span>
            </div>
            <Transition
              name="swap"
              mode="out-in"
            >
              <div
                :key="active"
                class="p-4 text-sm"
              >
                <template v-if="active === 0">
                  <p class="font-semibold">
                    New rider request
                  </p>
                  <div class="mt-3 space-y-2 text-xs">
                    <div class="flex justify-between rounded-lg bg-muted px-3 py-2">
                      <span class="text-muted">Zone</span><span class="font-medium">Kallithea</span>
                    </div>
                    <div class="flex justify-between rounded-lg bg-muted px-3 py-2">
                      <span class="text-muted">Riders</span><span class="font-medium">6</span>
                    </div>
                    <div class="flex justify-between rounded-lg bg-muted px-3 py-2">
                      <span class="text-muted">Shifts</span><span class="font-medium">Fri – Sun, 18:00 – 23:00</span>
                    </div>
                  </div>
                  <div class="relative mt-4 h-9 overflow-hidden rounded-lg bg-secondary text-white">
                    <span class="absolute inset-0 grid place-items-center text-sm font-medium">Send request</span>
                    <span
                      class="pop absolute inset-0 flex items-center justify-center gap-1.5 bg-secondary-800 text-sm font-medium"
                      style="--d:1.2s"
                    >
                      <UIcon
                        name="i-lucide-check"
                        class="size-4"
                      /> Sent to Fero Ferto
                    </span>
                  </div>
                </template>

                <template v-else-if="active === 1">
                  <p class="font-semibold">
                    Request open
                  </p>
                  <p class="mt-1 text-xs text-muted">
                    Fero Ferto is checking riders who work in your zone.
                  </p>
                  <div class="mt-5">
                    <div class="flex justify-between text-xs">
                      <span class="text-muted">Available riders found</span><span class="font-medium">14</span>
                    </div>
                    <div class="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        class="fill-x h-full w-[70%] rounded-full bg-secondary"
                        style="--d:.3s"
                      />
                    </div>
                  </div>
                  <div class="mt-5 flex -space-x-2">
                    <span
                      v-for="(r, i) in ['NP', 'EK', 'GM', 'MT', 'KD']"
                      :key="r"
                      class="pop grid size-8 place-items-center rounded-full border-2 border-[var(--ui-bg-elevated)] bg-accented text-[10px] font-semibold"
                      :style="{ '--d': 0.4 + i * 0.12 + 's' }"
                    >{{ r }}</span>
                    <span
                      class="pop grid size-8 place-items-center rounded-full border-2 border-[var(--ui-bg-elevated)] bg-muted text-[10px] text-muted"
                      style="--d:1s"
                    >+9</span>
                  </div>
                </template>

                <template v-else-if="active === 2">
                  <p class="font-semibold">
                    Shortlist
                  </p>
                  <ul class="mt-3 space-y-3">
                    <li
                      v-for="(r, i) in shortlist"
                      :key="r.i"
                      class="text-xs"
                    >
                      <div class="flex items-center gap-2.5">
                        <span class="grid size-7 place-items-center rounded-full bg-accented text-[10px] font-semibold">{{ r.i }}</span>
                        <div class="min-w-0 flex-1">
                          <div class="flex justify-between">
                            <span class="font-medium">{{ r.name }}</span><span class="font-mono">{{ r.fit }}%</span>
                          </div>
                          <div class="mt-1 h-1 rounded-full bg-muted overflow-hidden">
                            <div
                              class="fill-x h-full rounded-full bg-secondary"
                              :style="{ 'width': r.fit + '%', '--d': 0.3 + i * 0.2 + 's' }"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <p class="mt-3 text-[11px] text-muted">
                    +3 more matched
                  </p>
                </template>

                <template v-else-if="active === 3">
                  <div class="rounded-xl border border-default p-3">
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-file-signature"
                        class="size-5 text-secondary"
                      />
                      <div>
                        <p class="font-semibold leading-tight">
                          Service agreement
                        </p>
                        <p class="text-[11px] text-muted">
                          with Fero Ferto
                        </p>
                      </div>
                    </div>
                    <ul class="mt-3 space-y-1.5 text-xs text-muted">
                      <li class="flex justify-between">
                        <span>Riders</span><span class="text-default">6</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Schedule</span><span class="text-default">Fri – Sun, evenings</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Rider contracts</span><span class="text-default">Held by Fero Ferto</span>
                      </li>
                    </ul>
                  </div>
                  <p
                    class="pop mt-4 flex items-center gap-1.5 text-xs font-medium text-secondary"
                    style="--d:1.6s"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="size-4"
                    /> Signed. Riders confirmed.
                  </p>
                </template>

                <template v-else-if="active === 4">
                  <div class="flex items-baseline justify-between">
                    <p class="font-semibold">
                      Tonight's roster
                    </p>
                    <p class="font-mono text-xs">
                      <span class="text-emerald-600 dark:text-emerald-400">6</span>/6 in
                    </p>
                  </div>
                  <ul class="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <li
                      v-for="(r, i) in roster"
                      :key="r"
                      class="flex items-center gap-2 rounded-lg bg-muted px-2.5 py-2"
                    >
                      <span class="grid size-6 place-items-center rounded-full bg-accented text-[9px] font-semibold">{{ r }}</span>
                      <span class="flex-1">Rider</span>
                      <span
                        class="pop size-2 rounded-full bg-emerald-500"
                        :style="{ '--d': 0.4 + i * 0.22 + 's' }"
                      />
                    </li>
                  </ul>
                </template>

                <template v-else>
                  <p class="font-semibold">
                    Weekly report
                  </p>
                  <div class="mt-3 grid grid-cols-2 gap-2">
                    <div
                      class="pop rounded-xl bg-muted p-3"
                      style="--d:.1s"
                    >
                      <p class="text-[11px] text-muted">
                        On time
                      </p><p class="text-xl font-semibold">
                        97%
                      </p>
                    </div>
                    <div
                      class="pop rounded-xl bg-muted p-3"
                      style="--d:.2s"
                    >
                      <p class="text-[11px] text-muted">
                        Rider hours
                      </p><p class="text-xl font-semibold">
                        132
                      </p>
                    </div>
                  </div>
                  <div
                    class="pop mt-3 flex items-center gap-2 rounded-xl border border-default px-3 py-2.5 text-xs"
                    style="--d:.5s"
                  >
                    <UIcon
                      name="i-lucide-file-text"
                      class="size-4 text-secondary"
                    />
                    One invoice from Fero Ferto
                  </div>
                </template>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Steps -->
    <div class="order-1 grid gap-6 lg:order-2 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-start">
      <ol
        class="grid grid-cols-6 gap-2 sm:gap-3"
        aria-label="Placement steps"
      >
        <li
          v-for="(s, i) in steps"
          :key="s.title"
        >
          <button
            type="button"
            class="group w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
            :aria-current="i === active ? 'step' : undefined"
            @click="go(i)"
          >
            <span class="block h-[3px] overflow-hidden rounded-full bg-accented">
              <span
                v-if="i === active"
                :key="cycle"
                class="wf-progress block h-full bg-inverted"
                :class="{ 'is-paused': paused, 'is-static': reduce }"
                :style="{ animationDuration: STEP_MS + 'ms' }"
                @animationend="next"
              />
              <span
                v-else-if="i < active"
                class="block h-full bg-inverted/30"
              />
            </span>
            <span
              class="mt-2 block font-mono text-[11px] transition-colors"
              :class="i === active ? 'text-highlighted' : 'text-dimmed group-hover:text-muted'"
            >0{{ i + 1 }}</span>
            <span
              class="mt-0.5 hidden text-sm leading-snug transition-colors md:block"
              :class="i === active ? 'text-highlighted font-medium' : 'text-muted group-hover:text-default'"
            >{{ s.title }}</span>
          </button>
        </li>
      </ol>

      <div class="flex gap-4">
        <Transition
          name="swap"
          mode="out-in"
        >
          <div
            :key="active"
            class="min-h-[6.5rem] flex-1"
            aria-live="polite"
          >
            <p class="font-semibold md:hidden">
              {{ step.title }}
            </p>
            <p class="text-muted md:text-[15px] leading-relaxed">
              {{ step.text }}
            </p>
          </div>
        </Transition>
        <UButton
          :icon="userPaused || reduce ? 'i-lucide-play' : 'i-lucide-pause'"
          :aria-label="userPaused || reduce ? 'Play walkthrough' : 'Pause walkthrough'"
          color="neutral"
          variant="outline"
          size="sm"
          class="shrink-0 self-start rounded-full"
          @click="reduce ? next() : (userPaused = !userPaused)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wf-track {
  position: relative;
  height: 72px;
  width: 100%;
}
.wf-line {
  position: absolute;
  left: 50%;
  top: 8px;
  bottom: 8px;
  border-left: 1.5px dashed var(--ui-border-accented);
  transition: border-color .4s;
}
.wf-track.is-on .wf-line { border-color: var(--ui-text-muted); }
.wf-packet {
  position: absolute;
  left: calc(50% - 4.5px);
  width: 10px;
  height: 10px;
  border-radius: 999px;
  box-shadow: 0 0 0 4px var(--ui-bg-elevated);
  animation: wf-y 1.8s var(--ease-out-soft) infinite;
}
.wf-rev { animation-direction: reverse; }
.wf-late { animation-delay: .9s; }
.wf-label {
  position: absolute;
  left: calc(50% + 14px);
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--ui-text-muted);
  white-space: nowrap;
}
@keyframes wf-y {
  0% { top: 4px; opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { top: calc(100% - 14px); opacity: 0; }
}

@media (min-width: 1024px) {
  .wf-track { height: 40px; }
  .wf-line { left: 6px; right: 6px; top: 50%; bottom: auto; border-left: 0; border-top: 1.5px dashed var(--ui-border-accented); }
  .wf-track.is-on .wf-line { border-color: var(--ui-text-muted); }
  .wf-packet { top: calc(50% - 4.25px); animation-name: wf-x; }
  .wf-label { left: 50%; top: auto; bottom: calc(50% + 10px); transform: translateX(-50%); }
  @keyframes wf-x {
    0% { left: 0; opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { left: calc(100% - 10px); opacity: 0; }
  }
}

.wf-progress { transform-origin: left; animation-name: wf-progress; animation-timing-function: linear; animation-fill-mode: forwards; }
.wf-progress.is-paused { animation-play-state: paused; }
.wf-progress.is-static { animation: none; }
@keyframes wf-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

@media (prefers-reduced-motion: reduce) {
  .wf-packet { animation: none; top: calc(50% - 5px); opacity: 1; }
}
</style>
