<script setup lang="ts">
// Hero visual: one placement card. Rider, Fero Ferto and the company sit on one vertical
// line, so it reads top to bottom: who rides, who holds the contract, who gets the rider.
const pairs = [
  { rider: { i: 'NP', name: 'Nikos P.', meta: 'Scooter · Piraeus · Mon – Sat evenings' }, company: { name: 'Restaurant group', meta: 'Kallithea · 6 riders · Fri – Sun' }, fit: 94 },
  { rider: { i: 'EK', name: 'Eleni K.', meta: 'E-bike · Marousi · Weekday lunches' }, company: { name: 'Grocery delivery', meta: 'Marousi · 4 riders · Mon – Fri' }, fit: 91 },
  { rider: { i: 'GM', name: 'Giorgos M.', meta: 'Car · Glyfada · Weekends' }, company: { name: 'Courier service', meta: 'Glyfada · 3 drivers · Sat – Sun' }, fit: 89 }
]

const idx = ref(0)
const pair = computed(() => pairs[idx.value]!)
let t: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  t = setInterval(() => {
    idx.value = (idx.value + 1) % pairs.length
  }, 4500)
})
onBeforeUnmount(() => clearInterval(t))
</script>

<template>
  <div class="panel mx-auto w-full max-w-md overflow-hidden" aria-hidden="true">
    <div class="flex items-center justify-between border-b border-default px-6 py-4">
      <p class="eyebrow">
        New placement
      </p>
      <Transition name="swap" mode="out-in">
        <span :key="idx" class="rounded-full bg-emerald-500/12 px-2.5 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400">
          {{ pair.fit }}% fit
        </span>
      </Transition>
    </div>

    <Transition name="swap" mode="out-in">
      <ol :key="idx" class="relative px-6 py-6">
        <!-- the line that ties the three parties together -->
        <span class="hero-line absolute top-12 bottom-12 left-[2.75rem] w-px bg-[var(--ui-border-accented)]" />

        <li class="pop relative flex items-center gap-4" style="--d:.05s">
          <span class="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-primary-50 text-sm font-semibold text-primary ring-4 ring-[var(--ui-bg-elevated)] dark:bg-primary-950">
            {{ pair.rider.i }}
          </span>
          <div class="min-w-0">
            <p class="flex items-center gap-2 text-xs text-muted">
              <span class="size-1.5 rounded-full bg-primary" />Rider
            </p>
            <p class="font-semibold text-highlighted">
              {{ pair.rider.name }}
            </p>
            <p class="truncate text-sm text-muted">
              {{ pair.rider.meta }}
            </p>
          </div>
        </li>

        <li class="pop relative my-5 flex items-center gap-4" style="--d:.25s">
          <span class="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl bg-inverted text-inverted ring-4 ring-[var(--ui-bg-elevated)]">
            <UIcon name="i-lucide-file-signature" class="size-[18px]" />
          </span>
          <div class="flex-1 rounded-xl bg-muted px-4 py-3">
            <p class="text-sm font-semibold text-highlighted">
              Fero Ferto holds the contract
            </p>
            <p class="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
              <UIcon name="i-lucide-check" class="size-3.5 text-emerald-600 dark:text-emerald-400" />
              Signed by rider and company
            </p>
          </div>
        </li>

        <li class="pop relative flex items-center gap-4" style="--d:.45s">
          <span class="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-secondary-50 text-secondary ring-4 ring-[var(--ui-bg-elevated)] dark:bg-secondary-950">
            <UIcon name="i-lucide-building-2" class="size-[18px]" />
          </span>
          <div class="min-w-0">
            <p class="flex items-center gap-2 text-xs text-muted">
              <span class="size-1.5 rounded-full bg-secondary" />Delivery company
            </p>
            <p class="font-semibold text-highlighted">
              {{ pair.company.name }}
            </p>
            <p class="truncate text-sm text-muted">
              {{ pair.company.meta }}
            </p>
          </div>
        </li>
      </ol>
    </Transition>

    <div class="flex items-center justify-between border-t border-default px-6 py-3.5">
      <p class="text-xs text-dimmed">
        Example placement
      </p>
      <div class="flex gap-1.5">
        <span
          v-for="(p, i) in pairs"
          :key="i"
          class="h-1 rounded-full transition-all duration-500"
          :class="i === idx ? 'w-6 bg-inverted' : 'w-1.5 bg-accented'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-line { transform-origin: top; animation: line-in .9s cubic-bezier(.2, .7, .2, 1) both; }
@keyframes line-in { from { transform: scaleY(0); } }
@media (prefers-reduced-motion: reduce) { .hero-line { animation: none; } }
</style>
