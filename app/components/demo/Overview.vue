<script setup lang="ts">
// Overview Dashboard: totals, utilization, daily & weekly operational view.
import { RIDERS } from '../../utils/demo-data'
import { ridersOnAtHour, workforceStats } from '../../utils/demo-analytics'

const stats = workforceStats(RIDERS)

// Availability by hour. Deterministic demo expansion so weekday/weekend
// shapes stay stable without random data.
const dayBoost = [0.75, 0.85, 0.9, 0.95, 1.15, 1.25, 1.1]
const peak = 28
const currentHour = new Date().getHours()

const hours = Array.from({ length: 16 }, (_, i) => 8 + i)
const todayItems = computed(() => hours.map((h) => {
  const lunch = Math.exp(-Math.pow(h - 13, 2) / 3.5)
  const dinner = Math.exp(-Math.pow(h - 20, 2) / 3)
  const base = ridersOnAtHour(RIDERS, h)
  return {
    label: h === currentHour ? 'NOW' : String(h).padStart(2, '0'),
    value: h === currentHour ? base : Math.round(Math.max(base, (lunch * 10 + dinner * 16) * (peak / 40))),
    isCurrent: h === currentHour
  }
}))

const weekItems = computed(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, day) => ({
  label: d,
  value: Math.round(peak * (dayBoost[day] || 1))
})))

const dailyView = ref<'today' | 'week'>('today')

const statusDonut = computed(() => [
  { label: 'Available', value: stats.available, color: '#22d3ee' },
  { label: 'On shift', value: stats.assigned, color: '#8b5cf6' },
  { label: 'Off duty', value: stats.unavailable, color: '#52525b' }
])

const busyNow = computed(() => ridersOnAtHour(RIDERS, currentHour))

const glanceRows = [
  { title: 'Morning shift', hour: 11, note: '11:00' },
  { title: 'Lunch peak', hour: 13, note: '13:00' },
  { title: 'Dinner peak', hour: 20, note: '20:00' }
]
</script>

<template>
  <section class="space-y-6">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
          <UIcon
            name="i-lucide-layout-dashboard"
            class="text-primary"
          />Overview
        </h2>
        <p class="text-muted text-sm mt-1">
          Whole-workforce snapshot, built on fictional demo data.
        </p>
      </div>
      <UBadge
        variant="subtle"
        color="neutral"
        icon="i-lucide-clock"
      >
        Updated just now
      </UBadge>
    </header>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <DemoStatCard
        label="Registered riders"
        :value="stats.total"
        icon="i-lucide-users"
        sub="across 16 neighbourhoods"
      />
      <DemoStatCard
        label="Available now"
        :value="stats.available"
        icon="i-lucide-user-round-check"
        accent="text-primary"
        sub="ready for dispatch"
      />
      <DemoStatCard
        label="On shift"
        :value="stats.assigned"
        icon="i-lucide-bike"
        sub="currently delivering"
      />
      <DemoStatCard
        label="Off duty"
        :value="stats.unavailable"
        icon="i-lucide-user-round-minus"
        sub="leave or day off"
      />
      <DemoStatCard
        label="Utilization"
        :value="stats.utilization + '%'"
        icon="i-lucide-gauge"
        accent="text-primary"
        sub="of contracted weekly hours"
      />
    </div>

    <div class="grid lg:grid-cols-3 gap-4">
      <div class="panel p-5 lg:col-span-2">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p class="font-semibold">
            Riders on the road
          </p>
          <div class="inline-flex rounded-lg border border-default p-0.5">
            <button
              class="px-3 py-1.5 rounded-md text-xs font-mono"
              :class="dailyView === 'today' ? 'bg-primary/15 text-primary' : 'text-muted hover:text-default'"
              @click="dailyView = 'today'"
            >
              TODAY
            </button>
            <button
              class="px-3 py-1.5 rounded-md text-xs font-mono"
              :class="dailyView === 'week' ? 'bg-primary/15 text-primary' : 'text-muted hover:text-default'"
              @click="dailyView = 'week'"
            >
              WEEK
            </button>
          </div>
        </div>
        <DemoChartBars
          :items="dailyView === 'today' ? todayItems : weekItems"
          :height="150"
        />
        <p class="mt-3 text-xs text-muted">
          <span v-if="dailyView === 'today'">"NOW" marks the current hour — <strong>{{ busyNow }}</strong> riders on shift right now.</span>
          <span v-else>Demo weekly view: Thursday–Saturday evenings carry the highest load.</span>
        </p>
      </div>

      <div class="space-y-4">
        <div class="panel p-5">
          <p class="font-semibold mb-4">
            Workforce status
          </p>
          <DemoChartDonut
            :segments="statusDonut"
            :size="120"
          />
        </div>
        <div class="panel p-5 space-y-3">
          <p class="font-semibold">
            Operational pulse
          </p>
          <div class="flex items-baseline gap-3">
            <span class="font-mono text-2xl text-primary">{{ Math.round((busyNow / Math.max(1, stats.total)) * 100) }}%</span>
            <span class="text-sm text-muted">of the roster working at this hour</span>
          </div>
          <div class="flex items-baseline gap-3">
            <span class="font-mono text-2xl text-primary">{{ stats.avgRating }}</span>
            <span class="text-sm text-muted">average rider rating</span>
          </div>
          <div class="flex items-baseline gap-3">
            <span class="font-mono text-2xl text-amber-400">{{ stats.overloaded.length }}</span>
            <span class="text-sm text-muted">riders near their hour limit</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel p-5">
      <p class="font-semibold mb-3">
        Today at a glance
      </p>
      <div class="grid sm:grid-cols-3 gap-4 text-sm">
        <div
          v-for="row in glanceRows"
          :key="row.title"
          class="rounded-lg border border-default p-3"
        >
          <p class="text-muted text-xs font-mono uppercase">
            {{ row.title }}
          </p>
          <p class="mt-1">
            <span class="text-primary font-semibold">{{ ridersOnAtHour(RIDERS, row.hour) }}</span>
            riders on the road at {{ row.note }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
