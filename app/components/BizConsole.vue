<script setup lang="ts">
// Hero visual for the business page: a small, live-feeling company console.
// Riders check in one by one, then the loop restarts.
const roster = [
  { i: 'NP', name: 'Nikos P.', vehicle: 'Scooter' },
  { i: 'EK', name: 'Eleni K.', vehicle: 'Scooter' },
  { i: 'GM', name: 'Giorgos M.', vehicle: 'Car' },
  { i: 'MT', name: 'Maria T.', vehicle: 'E-bike' },
  { i: 'KD', name: 'Kostas D.', vehicle: 'Scooter' },
  { i: 'DA', name: 'Dimitra A.', vehicle: 'Scooter' }
]

// riders needed vs riders lined up, 17:00 to 23:00
const hours = [
  { h: '17', need: 30, have: 34 },
  { h: '18', need: 52, have: 56 },
  { h: '19', need: 78, have: 80 },
  { h: '20', need: 96, have: 96 },
  { h: '21', need: 84, have: 88 },
  { h: '22', need: 58, have: 60 },
  { h: '23', need: 34, have: 38 }
]

const checked = ref(0)
let t: ReturnType<typeof setTimeout> | undefined

function tick() {
  if (checked.value < roster.length) {
    checked.value++
    t = setTimeout(tick, 850)
  } else {
    t = setTimeout(() => {
      checked.value = 0
      t = setTimeout(tick, 600)
    }, 3200)
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    checked.value = roster.length
    return
  }
  t = setTimeout(tick, 900)
})
onBeforeUnmount(() => clearTimeout(t))
</script>

<template>
  <div
    class="panel overflow-hidden"
    aria-hidden="true"
  >
    <div class="flex items-center justify-between border-b border-default px-5 py-3">
      <div class="flex items-center gap-2.5">
        <span class="size-2 rounded-full bg-secondary" />
        <span class="text-sm font-medium text-highlighted">Company console</span>
        <span class="hidden font-mono text-[11px] text-dimmed sm:inline">· Kallithea</span>
      </div>
      <span class="flex items-center gap-1.5 font-mono text-[11px] text-muted">
        <span class="relative flex size-1.5">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span class="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
        Live · Tonight
      </span>
    </div>

    <!-- KPIs -->
    <div class="grid grid-cols-3 divide-x divide-default border-b border-default">
      <div class="px-5 py-4">
        <p class="text-[11px] text-muted">
          On shift
        </p>
        <p class="mt-1 font-mono text-2xl font-semibold text-highlighted tabular-nums">
          {{ checked }}<span class="text-dimmed">/6</span>
        </p>
      </div>
      <div class="px-5 py-4">
        <p class="text-[11px] text-muted">
          On time
        </p>
        <p class="mt-1 font-mono text-2xl font-semibold text-highlighted">
          97%
        </p>
      </div>
      <div class="px-5 py-4">
        <p class="text-[11px] text-muted">
          Open requests
        </p>
        <p class="mt-1 font-mono text-2xl font-semibold text-highlighted">
          1
        </p>
      </div>
    </div>

    <div class="grid sm:grid-cols-[1.15fr_1fr]">
      <!-- Demand vs riders -->
      <div class="border-b border-default p-5 sm:border-r sm:border-b-0">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium text-highlighted">
            Riders needed vs lined up
          </p>
        </div>
        <div class="mt-2 flex gap-3 text-[11px] text-muted">
          <span class="flex items-center gap-1.5"><span class="size-2 rounded-sm bg-secondary-300 dark:bg-secondary-700" />Needed</span>
          <span class="flex items-center gap-1.5"><span class="size-2 rounded-sm bg-primary" />Lined up</span>
        </div>
        <div class="mt-4 flex h-36 items-end gap-2">
          <div
            v-for="(b, i) in hours"
            :key="b.h"
            class="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
          >
            <div class="flex h-full w-full items-end justify-center gap-[3px]">
              <span
                class="bar-up w-1/2 rounded-t-sm bg-secondary-300 dark:bg-secondary-700"
                :style="{ 'height': b.need + '%', '--d': 0.2 + i * 0.06 + 's' }"
              />
              <span
                class="bar-up w-1/2 rounded-t-sm bg-primary"
                :style="{ 'height': b.have + '%', '--d': 0.35 + i * 0.06 + 's' }"
              />
            </div>
            <span class="font-mono text-[10px] text-dimmed">{{ b.h }}</span>
          </div>
        </div>
      </div>

      <!-- Roster -->
      <div class="p-5">
        <p class="text-sm font-medium text-highlighted">
          Tonight's riders
        </p>
        <ul class="mt-3 space-y-1.5">
          <li
            v-for="(r, i) in roster"
            :key="r.i"
            class="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-500"
            :class="i < checked ? 'bg-muted' : ''"
          >
            <span class="grid size-6 place-items-center rounded-full bg-accented text-[9px] font-semibold">{{ r.i }}</span>
            <span class="min-w-0 flex-1 truncate text-xs">{{ r.name }} <span class="text-dimmed">· {{ r.vehicle }}</span></span>
            <span
              class="text-[10px] font-medium transition-all duration-500"
              :class="i < checked ? 'text-emerald-600 dark:text-emerald-400' : 'text-dimmed'"
            >{{ i < checked ? 'Checked in' : 'Due 18:00' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
