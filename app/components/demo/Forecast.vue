<script setup lang="ts">
// Demand forecasting demo — SIMULATED. Clearly labelled as demo predictions.
import { DEMAND_FORECAST } from '../../utils/demo-data'
import { workforceStats } from '../../utils/demo-analytics'

const stats = workforceStats()

const labels = DEMAND_FORECAST.map(d => d.label)
const demand = DEMAND_FORECAST.map(d => d.demand)
const capacity = DEMAND_FORECAST.map(d => d.capacity)
const gapSeries = DEMAND_FORECAST.map(d => Math.max(0, d.demand - d.capacity))

const worst = [...DEMAND_FORECAST].sort((a, b) => (b.demand - b.capacity) - (a.demand - a.capacity))[0]!

const horizons = ref<'days' | 'hours'>('days')
const hourSlots = [
  { label: '10–12h', value: 5 },
  { label: '12–14h', value: 15 },
  { label: '14–16h', value: 9 },
  { label: '16–18h', value: 11 },
  { label: '18–20h', value: 17 },
  { label: '20–22h', value: 22 },
  { label: '22–24h', value: 13 },
  { label: '00–02h', value: 6 }
]
const suggested = computed(() => hourSlots.map(h => ({ label: h.label, value: h.value + Math.round(h.value * 0.15) })))
</script>

<template>
  <section class="space-y-5">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
          <UIcon
            name="i-lucide-chart-line"
            class="text-primary"
          />Demand forecasting
        </h2>
        <p class="text-muted text-sm mt-1">
          How many riders each delivery company will need, before the rush starts. Simulated demo predictions — not live production forecasts.
        </p>
      </div>
      <UBadge
        color="warning"
        variant="subtle"
        icon="i-lucide-flask-conical"
      >
        Demo prediction · simulated data
      </UBadge>
    </header>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DemoStatCard
        label="7-day peak demand"
        :value="Math.max(...demand) + ' riders'"
        icon="i-lucide-arrow-up-right"
        sub="next Saturday evening"
      />
      <DemoStatCard
        label="Largest day gap"
        :value="`−${worst.demand - worst.capacity}`"
        icon="i-lucide-triangle-alert"
        accent="text-amber-400"
        :sub="`on ${worst.day}`"
      />
      <DemoStatCard
        label="Weekend uplift"
        value="+30%"
        icon="i-lucide-trending-up"
        sub="vs weekday baseline"
      />
      <DemoStatCard
        label="Confidence"
        value="Medium"
        icon="i-lucide-sigma"
        sub="demo model on synthetic history"
      />
    </div>

    <div class="panel p-5">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p class="font-semibold">
          Riders needed vs riders available
        </p>
        <div class="inline-flex rounded-lg border border-default p-0.5">
          <button
            class="px-3 py-1.5 rounded-md text-xs font-mono"
            :class="horizons === 'days' ? 'bg-primary/15 text-primary' : 'text-muted hover:text-default'"
            @click="horizons = 'days'"
          >
            NEXT 7 DAYS
          </button>
          <button
            class="px-3 py-1.5 rounded-md text-xs font-mono"
            :class="horizons === 'hours' ? 'bg-primary/15 text-primary' : 'text-muted hover:text-default'"
            @click="horizons = 'hours'"
          >
            BY HOUR SLOT
          </button>
        </div>
      </div>

      <template v-if="horizons === 'days'">
        <DemoChartLine
          :labels="labels"
          :series="[
            { name: 'Riders needed (all companies)', data: demand, color: '#22d3ee', area: true },
            { name: 'Riders available in network', data: capacity, color: '#8b5cf6' },
            { name: 'Gap', data: gapSeries, color: '#f59e0b', dashed: true }
          ]"
        />
        <div class="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="d in DEMAND_FORECAST"
            :key="d.day"
            class="rounded-lg border p-3 text-sm"
            :class="d.demand > d.capacity ? 'border-amber-400/30' : 'border-default'"
          >
            <div class="flex items-center justify-between">
              <p class="font-semibold">
                {{ d.day }} <span class="text-muted font-normal text-xs">({{ d.label }})</span>
              </p>
              <span
                v-if="d.demand > d.capacity"
                class="text-[10px] font-mono text-amber-300 uppercase"
              >shortage</span>
              <span
                v-else
                class="text-[10px] font-mono text-green-300 uppercase"
              >covered</span>
            </div>
            <p class="mt-1 text-xs text-muted">
              need <strong class="text-cyan-300">{{ d.demand }}</strong> · available <strong class="text-violet-300">{{ d.capacity }}</strong>
              <span
                v-if="d.demand > d.capacity"
                class="text-amber-300"
              > · gap {{ d.demand - d.capacity }}</span>
            </p>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <p class="text-sm text-muted mb-2">
              Demand (riders needed, demo)
            </p>
            <DemoChartBars
              :items="hourSlots"
              :height="160"
            />
          </div>
          <div>
            <p class="text-sm text-muted mb-2">
              With the suggested staffing plan (red zone = extra riders from the network)
            </p>
            <DemoChartBars
              :items="suggested"
              :height="160"
            />
          </div>
        </div>
        <p class="mt-3 text-xs text-muted">
          Hour-slot view is a demo projection for the coming weekend: staffing 15% above predicted demand covers the 20:00–22:00 dinner peak.
        </p>
      </template>
    </div>

    <div class="panel p-5 border border-primary/25">
      <p class="font-semibold mb-1 flex items-center gap-2">
        <UIcon
          name="i-lucide-lightbulb"
          class="text-primary"
        />Recommended action
      </p>
      <p class="text-sm text-muted">
        Activate {{ Math.max(0, worst.demand - worst.capacity) }} additional riders for <strong class="text-default">{{ worst.day }}</strong> in the
        <strong class="text-default">South Coast</strong> and <strong class="text-default">Athens Center</strong> zones — contact the {{ stats.newThisWeek.length }} under-booked riders flagged in the Overview tab by {{ worst.label }} noon.
      </p>
      <p class="mt-2 text-[11px] text-muted font-mono">
        Generated from simulated demo data. In production this becomes an automated staffing suggestion built on live shift history.
      </p>
    </div>
  </section>
</template>
