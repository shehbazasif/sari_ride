<script setup lang="ts">
// Workforce Intelligence: working patterns, workload distribution,
// utilization by zone and performance trends. All fictional demo data.
import { PERFORMANCE_TREND } from '../../utils/demo-data'
import { weeklyPattern, zoneStats } from '../../utils/demo-analytics'

const pattern = weeklyPattern()

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const patternHourStart = 10

const maxPattern = computed(() => Math.max(...pattern.map(c => c.value), 1))

const pat = (i: number) => pattern[i]!

function cell(c: { day: number, hour: number, value: number }) {
  const t = c.value / maxPattern.value
  if (t === 0) return { background: 'rgba(148,163,184,.08)' }
  return { background: t > 0.66 ? 'rgba(139,92,246,.85)' : t > 0.33 ? `rgba(34,211,238,${0.45 + t * 0.3})` : `rgba(34,211,238,${0.12 + t * 0.3})` }
}

// Workload distribution histogram: weekly booked hours buckets
const buckets = computed(() => {
  const defs = [
    { label: '0–16h', min: 0, max: 16 },
    { label: '16–24h', min: 17, max: 24 },
    { label: '24–32h', min: 25, max: 32 },
    { label: '32–38h', min: 33, max: 38 },
    { label: '38–40h', min: 39, max: 40 }
  ]
  return defs.map(d => ({
    label: d.label,
    value: RIDERS.filter(r => r.hoursThisWeek >= d.min && r.hoursThisWeek <= d.max).length
  }))
})

const zones = computed(() => [...zoneStats(RIDERS)].sort((a, b) => b.utilization - a.utilization))

const heatLegend = [
  { label: 'Low', color: 'rgba(34,211,238,.2)' },
  { label: 'Medium', color: 'rgba(34,211,238,.6)' },
  { label: 'High', color: 'rgba(139,92,246,.85)' }
]
</script>

<template>
  <section class="space-y-5">
    <header>
      <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
        <UIcon
          name="i-lucide-brain-circuit"
          class="text-primary"
        />Workforce intelligence
      </h2>
      <p class="text-muted text-sm mt-1">
        How the rider network actually works: patterns, workload spread, utilization and performance — derived from the fictional demo dataset.
      </p>
    </header>

    <div class="panel p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <p class="font-semibold">
          Working patterns — delivery pressure by weekday & hour
        </p>
        <div class="flex items-center gap-2 text-[10px] font-mono text-muted">
          <span>LOW</span>
          <span
            v-for="l in heatLegend"
            :key="l.label"
            class="size-3 rounded"
            :style="{ background: l.color }"
          />
          <span>HIGH</span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="min-w-[560px]">
          <div
            class="grid gap-[3px]"
            style="grid-template-columns: 2.5rem repeat(14, 1fr)"
          >
            <span />
            <span
              v-for="h in 14"
              :key="h"
              class="text-[10px] font-mono text-muted text-center"
            >{{ String(patternHourStart + h - 1).padStart(2, '0') }}</span>
            <template
              v-for="(d, day) in DAYS"
              :key="d"
            >
              <span class="text-[10px] font-mono text-muted self-center pr-2 text-right">{{ d }}</span>
              <div
                v-for="h in 14"
                :key="d + h"
                class="h-6 rounded-sm transition hover:ring-1 hover:ring-white/40"
                :style="cell(pat(day * 14 + h - 1))"
                :title="`${d} ${patternHourStart + h - 1}:00 — intensity ${pat(day * 14 + h - 1).value}`"
              />
            </template>
          </div>
        </div>
      </div>
      <p class="mt-3 text-xs text-muted">
        Two peaks per day (lunch ~13:00, dinner ~20:00) with the weekend evenings visibly hotter than weekdays. Counts are demand-intensity units from the demo pattern, not real orders.
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
      <div class="panel p-5">
        <p class="font-semibold mb-4">
          Workload distribution
        </p>
        <DemoChartBars
          :items="buckets"
          :height="150"
        />
        <p class="mt-3 text-xs text-muted">
          Riders per weekly-hours bucket. The biggest group sits at 38–40h — useful to spot who is nearly saturated before adding shifts.
        </p>
      </div>

      <div class="panel p-5">
        <p class="font-semibold mb-4">
          Utilization by zone
        </p>
        <div class="space-y-3">
          <div
            v-for="z in zones"
            :key="z.zone"
          >
            <div class="flex justify-between text-sm mb-1">
              <span>{{ z.zone }}</span>
              <span class="font-mono text-muted">{{ z.utilization }}% · {{ z.available }}/{{ z.riders }} free</span>
            </div>
            <div class="h-2.5 rounded-full bg-elevated overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                :style="{ width: z.utilization + '%' }"
              />
            </div>
          </div>
          <p class="text-xs text-muted pt-1">
            Sunday gap estimate (demo forecast): {{ zones.map(z => `${z.zone.split(' ')[0]} +${z.gapNextWeekend}`).join(' · ') }} riders.
          </p>
        </div>
      </div>
    </div>

    <div class="panel p-5">
      <p class="font-semibold mb-4">
        Performance trend — last 8 weeks
      </p>
      <DemoChartLine
        :labels="PERFORMANCE_TREND.map(w => w.week)"
        :series="[
          { name: 'On-time deliveries %', data: PERFORMANCE_TREND.map(w => w.onTime), color: '#22d3ee', area: true },
          { name: 'Workforce utilization %', data: PERFORMANCE_TREND.map(w => w.utilization), color: '#8b5cf6' }
        ]"
      />
      <p class="mt-3 text-xs text-muted">
        Utilization has grown ~15 points in two months while on-time rate improved alongside it — the demo narrative that better matching keeps quality high.
      </p>
    </div>
  </section>
</template>
