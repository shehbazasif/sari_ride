<script setup lang="ts">
// Hero visual for the riders page: the rider app. New offers that match the rider's
// schedule slide in at the top; the best one gets accepted, then the feed moves on.
interface Offer { id: number, who: string, zone: string, when: string, fit: number }

const pool: Omit<Offer, 'id'>[] = [
  { who: 'Restaurant group', zone: 'Kallithea', when: 'Fri – Sun · 18:00 – 23:00', fit: 94 },
  { who: 'Grocery delivery', zone: 'Piraeus', when: 'Mon – Wed · 12:00 – 16:00', fit: 90 },
  { who: 'Courier service', zone: 'Nea Smyrni', when: 'Sat · 10:00 – 18:00', fit: 86 },
  { who: 'Coffee chain', zone: 'Kallithea', when: 'Weekdays · 08:00 – 12:00', fit: 88 },
  { who: 'Pharmacy delivery', zone: 'Piraeus', when: 'Thu – Fri · 17:00 – 22:00', fit: 92 }
]

let next = 0
let uid = 0
const take = (): Offer => ({ ...pool[next++ % pool.length]!, id: uid++ })

const offers = ref<Offer[]>([take(), take()])
const accepted = ref<number | null>(null)
let t: ReturnType<typeof setTimeout> | undefined

function loop() {
  // 1. a new offer arrives
  offers.value = [take(), ...offers.value].slice(0, 3)
  accepted.value = null
  // 2. the rider accepts it a moment later
  t = setTimeout(() => {
    accepted.value = offers.value[0]!.id
    t = setTimeout(loop, 2600)
  }, 1700)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    accepted.value = offers.value[0]!.id
    return
  }
  t = setTimeout(loop, 1200)
})
onBeforeUnmount(() => clearTimeout(t))

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const on = [true, true, false, true, true, true, false]
</script>

<template>
  <div
    class="relative mx-auto w-[300px] sm:w-[320px]"
    aria-hidden="true"
  >
    <!-- soft backdrop shapes -->
    <div class="absolute -inset-x-10 top-10 bottom-10 -z-10 rounded-[3rem] bg-primary-100/60 dark:bg-primary-950/40" />

    <div class="rounded-[2.4rem] border border-default bg-default p-2.5 shadow-[0_30px_60px_-30px_rgba(20,18,12,.35)]">
      <div class="h-[560px] overflow-hidden rounded-[1.9rem] border border-muted bg-elevated">
        <!-- status bar -->
        <div class="flex items-center justify-between px-6 pt-4 font-mono text-[11px] text-muted">
          <span>17:42</span>
          <span class="h-5 w-20 rounded-full bg-inverted" />
          <span>5G</span>
        </div>

        <div class="px-5 pt-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-muted">
                Kalispera,
              </p>
              <p class="text-lg font-semibold text-highlighted">
                Nikos
              </p>
            </div>
            <span class="flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              <span class="size-1.5 rounded-full bg-emerald-500" />Available
            </span>
          </div>

          <!-- availability strip -->
          <div class="mt-4 rounded-2xl bg-muted p-3">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-muted">This week</span>
              <span class="font-medium">Evenings · Scooter</span>
            </div>
            <div class="mt-2.5 flex justify-between">
              <span
                v-for="(d, i) in days"
                :key="i"
                class="grid size-7 place-items-center rounded-full text-[11px] font-medium"
                :class="on[i] ? 'bg-primary text-white' : 'bg-default text-dimmed'"
              >{{ d }}</span>
            </div>
          </div>

          <div class="mt-5 flex items-center justify-between">
            <p class="text-sm font-semibold text-highlighted">
              Offers for you
            </p>
            <span class="font-mono text-[10px] text-dimmed">Matched to your week</span>
          </div>

          <TransitionGroup
            tag="ul"
            name="offer"
            class="relative mt-3 space-y-2.5"
          >
            <li
              v-for="o in offers"
              :key="o.id"
              class="offer-item"
            >
              <div
                class="rounded-2xl border bg-default p-3.5 transition-colors duration-500"
                :class="accepted === o.id ? 'border-primary/50' : 'border-default'"
              >
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-highlighted">
                      {{ o.who }}
                    </p>
                    <p class="truncate text-[11px] text-muted">
                      {{ o.zone }} · {{ o.when }}
                    </p>
                  </div>
                  <span class="shrink-0 rounded-full bg-muted px-2 py-0.5 font-mono text-[10px]">{{ o.fit }}%</span>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-[10px] text-dimmed">Contract with Fero Ferto</span>
                  <span
                    class="flex h-7 items-center gap-1 rounded-full px-3 text-[11px] font-medium transition-all duration-500"
                    :class="accepted === o.id ? 'bg-primary text-white' : 'border border-default text-default'"
                  >
                    <UIcon
                      v-if="accepted === o.id"
                      name="i-lucide-check"
                      class="size-3.5"
                    />
                    {{ accepted === o.id ? 'Accepted' : 'View offer' }}
                  </span>
                </div>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <!-- floating hours chip -->
    <div class="panel absolute -left-16 bottom-16 hidden px-3.5 py-2.5 lg:block">
      <p class="text-[10px] text-muted">
        Hours this week
      </p>
      <p class="font-mono text-lg font-semibold text-highlighted">
        22h
      </p>
    </div>
  </div>
</template>

<style scoped>
.offer-enter-active { transition: opacity .5s cubic-bezier(.2, .7, .2, 1), transform .5s cubic-bezier(.2, .7, .2, 1); }
.offer-leave-active { transition: opacity .35s ease; position: absolute; left: 0; right: 0; }
.offer-move { transition: transform .5s cubic-bezier(.2, .7, .2, 1); }
.offer-enter-from { opacity: 0; transform: translateY(-14px) scale(.97); }
.offer-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .offer-enter-active, .offer-leave-active, .offer-move { transition: none; }
}
</style>
