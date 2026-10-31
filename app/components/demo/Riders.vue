<script setup lang="ts">
// Rider Management: fictional profiles, search + filters + detail drawer.
import { LOCATIONS, RIDERS, type DemoRider, type RiderStatus } from '../../utils/demo-data'

const search = ref('')
const statusFilter = ref<'all' | RiderStatus>('all')
const locationFilter = ref<'all' | string>('all')
const skillFilter = ref<'all' | string>('all')
const sort = ref<'name' | 'rating' | 'hours'>('name')

const STATUS_LABEL: Record<RiderStatus, string> = {
  available: 'Available',
  assigned: 'On shift',
  unavailable: 'Off duty'
}
const STATUS_COLOR: Record<RiderStatus, 'success' | 'warning' | 'neutral'> = {
  available: 'success',
  assigned: 'warning',
  unavailable: 'neutral'
}

const statusItems = [
  { label: 'All statuses', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'On shift', value: 'assigned' },
  { label: 'Off duty', value: 'unavailable' }
]
const locationItems = [{ label: 'All areas', value: 'all' }, ...LOCATIONS.map(l => ({ label: l, value: l }))]
const skillItems = [
  { label: 'All skills', value: 'all' },
  { label: 'Food', value: 'food' },
  { label: 'Parcels', value: 'parcels' },
  { label: 'Groceries', value: 'groceries' },
  { label: 'Business (B2B)', value: 'b2b' }
]

const filtered = computed(() => {
  let list = [...RIDERS]
  const q = search.value.trim().toLowerCase()
  if (q) list = list.filter(r => r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q))
  if (statusFilter.value !== 'all') list = list.filter(r => r.status === statusFilter.value)
  if (locationFilter.value !== 'all') list = list.filter(r => r.location === locationFilter.value)
  if (skillFilter.value !== 'all') list = list.filter(r => r.skills.includes(skillFilter.value))
  if (sort.value === 'rating') list.sort((a, b) => b.rating - a.rating)
  else if (sort.value === 'hours') list.sort((a, b) => b.hoursThisWeek - a.hoursThisWeek)
  else list.sort((a, b) => a.name.localeCompare(b.name))
  return list
})

const selected = ref<DemoRider | null>(null)

function open(r: DemoRider) {
  selected.value = r
}

function bar(r: DemoRider) {
  return Math.min(100, Math.round((r.hoursThisWeek / r.maxHoursPerWeek) * 100))
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
        <UIcon
          name="i-lucide-users"
          class="text-primary"
        />Rider management
      </h2>
      <p class="text-muted text-sm mt-1">
        Fictional rider profiles. Search, filter and open a profile to see availability, workload and performance.
      </p>
    </header>

    <div class="panel p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search rider or area"
      />
      <USelect
        v-model="statusFilter"
        :items="statusItems"
        option-attribute="label"
        value-attribute="value"
      />
      <USelect
        v-model="locationFilter"
        :items="locationItems"
        option-attribute="label"
        value-attribute="value"
      />
      <USelect
        v-model="skillFilter"
        :items="skillItems"
        option-attribute="label"
        value-attribute="value"
      />
      <USelect
        v-model="sort"
        :items="[
          { label: 'Sort: Name A–Z', value: 'name' },
          { label: 'Sort: Rating', value: 'rating' },
          { label: 'Sort: Hours booked', value: 'hours' }
        ]"
        option-attribute="label"
        value-attribute="value"
      />
    </div>

    <p class="text-xs font-mono text-muted">
      {{ filtered.length }} riders shown
    </p>

    <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <button
        v-for="r in filtered"
        :key="r.id"
        class="panel p-4 text-left transition hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer"
        @click="open(r)"
      >
        <div class="flex items-start gap-3">
          <DemoRiderAvatar
            :name="r.name"
            :status="r.status"
            size="md"
          />
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
              <p class="font-semibold truncate">
                {{ r.name }}
              </p>
              <UBadge
                :color="STATUS_COLOR[r.status]"
                size="sm"
                variant="subtle"
              >
                {{ STATUS_LABEL[r.status] }}
              </UBadge>
            </div>
            <p class="text-xs text-muted mt-0.5 truncate">
              <UIcon
                name="i-lucide-map-pin"
                class="inline size-3 align-[-1px]"
              /> {{ r.location }} · <UIcon
                name="i-lucide-bike"
                class="inline size-3 align-[-1px]"
              /> {{ r.vehicle }} ·
              <span
                v-if="r.currentCompany"
                class="text-violet-300"
              >{{ r.currentCompany }}</span>
              <span
                v-else
                class="text-cyan-300"
              >open to offers</span>
            </p>
          </div>
        </div>
        <div class="mt-3 flex flex-wrap gap-1">
          <span
            v-for="s in r.skills"
            :key="s"
            class="text-[10px] font-mono px-1.5 py-0.5 rounded border border-default text-muted uppercase"
          >{{ s }}</span>
        </div>
        <div class="mt-3 space-y-1.5">
          <div class="flex justify-between text-xs text-muted">
            <span>{{ r.hoursThisWeek }}h / {{ r.maxHoursPerWeek }}h booked</span>
            <span>{{ r.assignmentsMonth }} assignments</span>
          </div>
          <div class="h-1.5 rounded-full bg-elevated overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
              :style="{ width: bar(r) + '%' }"
            />
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs">
          <span class="text-muted flex items-center gap-1"><UIcon
            name="i-lucide-star"
            class="size-3.5 text-yellow-400"
          />{{ r.rating }}</span>
          <span class="text-muted flex items-center gap-1"><UIcon
            name="i-lucide-timer"
            class="size-3.5 text-primary"
          />{{ r.onTimePct }}% on time</span>
        </div>
      </button>
    </div>

    <div
      v-if="selected"
      class="fixed inset-0 z-50 flex justify-end"
    >
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="selected = null"
      />
      <aside class="relative h-full w-full max-w-md bg-[#0a0f1c] border-l border-default overflow-y-auto p-6 space-y-5">
        <button
          class="absolute top-4 right-4 text-muted hover:text-default cursor-pointer"
          aria-label="Close profile"
          @click="selected = null"
        >
          <UIcon
            name="i-lucide-x"
            class="size-5"
          />
        </button>
        <div class="flex items-center gap-4">
          <DemoRiderAvatar
            :name="selected.name"
            size="lg"
          />
          <div>
            <p class="text-xl font-bold">
              {{ selected.name }}
            </p>
            <p class="text-sm text-muted">
              {{ selected.zone }} · {{ selected.location }}
            </p>
            <UBadge
              :color="STATUS_COLOR[selected.status]"
              class="mt-2"
              size="sm"
              variant="subtle"
            >
              {{ STATUS_LABEL[selected.status] }}
            </UBadge>
          </div>
        </div>

        <div class="rounded-lg border border-default p-3">
          <p class="text-[10px] font-mono text-muted uppercase">
            Current employer (via Fero Ferto)
          </p>
          <p
            class="font-semibold"
            :class="selected.currentCompany ? 'text-violet-300' : 'text-cyan-300'"
          >
            {{ selected.currentCompany || 'Open to new opportunities' }}
          </p>
          <div
            v-if="selected.experience.length"
            class="mt-2 flex flex-wrap gap-1"
          >
            <span
              v-for="c in selected.experience"
              :key="c"
              class="text-[10px] font-mono px-1.5 py-0.5 rounded border border-default text-muted"
            >has worked with {{ c }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-lg border border-default p-3">
            <p class="text-[10px] font-mono text-muted uppercase">
              Vehicle
            </p>
            <p class="font-semibold capitalize">
              {{ selected.vehicle }}
            </p>
          </div>
          <div class="rounded-lg border border-default p-3">
            <p class="text-[10px] font-mono text-muted uppercase">
              Rating
            </p>
            <p class="font-semibold">
              <UIcon
                name="i-lucide-star"
                class="inline size-4 text-yellow-400"
              /> {{ selected.rating }}
            </p>
          </div>
          <div class="rounded-lg border border-default p-3">
            <p class="text-[10px] font-mono text-muted uppercase">
              On-time
            </p>
            <p class="font-semibold text-primary">
              {{ selected.onTimePct }}%
            </p>
          </div>
          <div class="rounded-lg border border-default p-3">
            <p class="text-[10px] font-mono text-muted uppercase">
              Assignments
            </p>
            <p class="font-semibold">
              {{ selected.assignmentsMonth }} <span class="text-muted text-xs">this month</span>
            </p>
          </div>
        </div>

        <div>
          <p class="text-xs font-mono text-muted uppercase mb-2">
            Shifts open today
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-if="selected.shifts.length === 0"
              class="text-muted text-sm"
            >No shift today</span>
            <span
              v-for="([a, b], i) in selected.shifts"
              :key="i"
              class="font-mono text-xs px-2 py-1 rounded border border-primary/30 text-primary"
            >
              {{ String(a).padStart(2, '0') }}:00 – {{ String(b).padStart(2, '0') }}:00
            </span>
          </div>
          <p class="text-xs text-muted mt-2">
            {{ selected.availability }}
          </p>
        </div>

        <div>
          <p class="text-xs font-mono text-muted uppercase mb-2">
            Skills
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="s in selected.skills"
              :key="s"
              class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize"
            >{{ s }}</span>
          </div>
        </div>

        <div>
          <p class="text-xs font-mono text-muted uppercase mb-2">
            Workload this week
          </p>
          <div class="h-2 rounded-full bg-elevated overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
              :style="{ width: bar(selected) + '%' }"
            />
          </div>
          <p class="text-xs text-muted mt-1">
            {{ selected.hoursThisWeek }} of {{ selected.maxHoursPerWeek }} contracted hours ({{ bar(selected) }}%)
          </p>
        </div>

        <p class="text-[10px] text-muted border-t border-default pt-3">
          Profile is fully fictional demo data — not a real person or contract.
        </p>
      </aside>
    </div>
  </section>
</template>
