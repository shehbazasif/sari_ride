<script setup lang="ts">
// Smart Rider Matching: transparent, deterministic demo scoring.
// Weights — location 40, availability overlap 30, skill 15, workload headroom 15.
import { COMPANIES, zoneOf, type DemoRider } from '../../utils/demo-data'
import { MATCH_OPTIONS, SHIFT_OPTIONS, matchRiders, type MatchResult } from '../../utils/demo-analytics'

const form = reactive({
  company: 'eFOOD' as string,
  location: 'Monastiraki',
  count: 4,
  shift: 1, // index into SHIFT_OPTIONS — default Midday (12–18)
  skill: 'food'
})

const shiftOptions = SHIFT_OPTIONS.map((s, i) => ({ label: s.label, value: i }))
const companyItems: string[] = [...COMPANIES]
const preferredFrom = ref(12)
const preferredTo = ref(19)

const hourItems = Array.from({ length: 24 }, (_, h) => ({ label: `${String(h).padStart(2, '0')}:00`, value: h }))

const searchRan = ref(false)
const results = ref<MatchResult[]>([])

function runMatch() {
  const to = Math.max(preferredTo.value, preferredFrom.value + 1)
  results.value = matchRiders({
    location: form.location,
    count: form.count,
    from: preferredFrom.value,
    to,
    skill: form.skill,
    company: form.company
  })
  searchRan.value = true
}

const recommended = computed(() => results.value.filter(r => r.eligible).slice(0, form.count))

function triggerRecompute() {
  if (searchRan.value) runMatch()
}

watch(form, triggerRecompute)
watch([preferredFrom, preferredTo], triggerRecompute)

function zoneBadge(r: DemoRider) {
  return r.location === form.location ? 'text-primary border-primary/40' : zoneOf[r.location] === zoneOf[form.location] ? 'text-violet-300 border-violet-500/40' : 'text-muted border-default'
}
</script>

<template>
  <section class="space-y-5">
    <header>
      <h2 class="text-2xl font-bold tracking-tight flex items-center gap-2">
        <UIcon
          name="i-lucide-git-merge"
          class="text-primary"
        />Smart rider matching
      </h2>
      <p class="text-muted text-sm mt-1">
        Hire from the Fero Ferto network: your company states a staffing requirement and the demo recommends riders with a clear, explainable score — a transparent demo algorithm, not a live AI model.
      </p>
    </header>

    <form
      class="panel p-5 grid gap-4 lg:grid-cols-[1fr_2fr_1fr_2fr_1.5fr_auto] items-end"
      @submit.prevent="runMatch"
    >
      <UFormField
        label="Your company"
        name="company"
      >
        <USelect
          v-model="form.company"
          :items="companyItems"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Delivery location"
        name="location"
      >
        <USelect
          v-model="form.location"
          :items="MATCH_OPTIONS.locations"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Number of riders"
        name="count"
      >
        <UInputNumber
          v-model="form.count"
          :min="1"
          :max="8"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Required availability (shift window)"
        name="shift"
      >
        <USelect
          v-model="form.shift"
          :items="shiftOptions"
          option-attribute="label"
          value-attribute="value"
          class="w-full"
        />
      </UFormField>
      <UFormField
        label="Preferred working hours"
        name="hours"
      >
        <div class="flex gap-2">
          <USelect
            v-model="preferredFrom"
            :items="hourItems"
            option-attribute="label"
            value-attribute="value"
          />
          <USelect
            v-model="preferredTo"
            :items="hourItems"
            option-attribute="label"
            value-attribute="value"
          />
        </div>
      </UFormField>
      <UButton
        type="submit"
        icon="i-lucide-zap"
        label="Match riders"
        size="lg"
      />
    </form>

    <div
      v-if="!searchRan"
      class="panel p-10 text-center"
    >
      <UIcon
        name="i-lucide-crosshair"
        class="size-10 text-primary mx-auto"
      />
      <p class="mt-4 text-muted max-w-md mx-auto">
        Choose your company, the area, how many riders you need and the hours, then press
        <strong class="text-default">Match riders</strong>. Every result shows exactly why it was recommended — including whether the rider already knows your operations.
      </p>
    </div>

    <template v-else>
      <div class="flex flex-wrap items-center gap-3">
        <UBadge
          color="primary"
          variant="subtle"
          icon="i-lucide-list-check"
        >
          {{ recommended.length }} of {{ form.count }} riders fully cover {{ String(preferredFrom).padStart(2, '0') }}:00–{{ String(Math.max(preferredTo, preferredFrom + 1)).padStart(2, '0') }}:00 in {{ form.location }}
        </UBadge>
        <UBadge
          color="neutral"
          variant="subtle"
          icon="i-lucide-briefcase"
        >
          Hiring for {{ form.company }}
        </UBadge>
        <UBadge
          color="neutral"
          variant="subtle"
          icon="i-lucide-package"
        >
          {{ form.skill }} deliveries
        </UBadge>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <TransitionGroup
          name="pop"
          tag="div"
          class="contents"
        >
          <article
            v-for="(res, i) in results.slice(0, 8)"
            :key="res.rider.id"
            class="panel p-4"
            :class="i < form.count && recommended.includes(res) ? 'border-primary/45' : ''"
          >
            <div class="flex items-center gap-3">
              <DemoRiderAvatar
                :name="res.rider.name"
                :status="res.rider.status"
              />
              <div class="min-w-0 flex-1">
                <p class="font-semibold truncate">
                  {{ res.rider.name }}
                </p>
                <p class="text-xs text-muted">
                  {{ res.rider.location }} · {{ res.rider.vehicle }} · {{ res.rider.rating }}★
                  <span
                    v-if="res.rider.currentCompany"
                    class="text-violet-300"
                  >·{{ res.rider.currentCompany }}</span>
                  <span
                    v-else
                    class="text-cyan-300"
                  >·open to offers</span>
                </p>
              </div>
              <div class="text-right">
                <p
                  class="font-mono text-2xl font-bold"
                  :class="res.score >= 70 ? 'text-primary' : res.score >= 45 ? 'text-default' : 'text-muted'"
                >
                  {{ res.score }}
                </p>
                <p class="text-[10px] font-mono text-muted uppercase">
                  match
                </p>
              </div>
            </div>
            <div class="mt-2 h-1.5 rounded-full overflow-hidden bg-elevated">
              <div
                class="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-500"
                :style="{ width: res.score + '%' }"
              />
            </div>
            <div class="mt-2 flex flex-wrap gap-1">
              <span
                class="text-[10px] px-1.5 py-0.5 rounded border"
                :class="zoneBadge(res.rider)"
              >
                {{ res.rider.location === form.location ? 'Exact area' : zoneOf[res.rider.location] === zoneOf[form.location] ? 'Same zone' : 'Other zone' }}
              </span>
              <span
                class="text-[10px] px-1.5 py-0.5 rounded border"
                :class="res.eligible ? 'text-green-300 border-green-400/40' : 'text-amber-300 border-amber-400/40'"
              >
                {{ res.eligible ? 'Full shift cover' : 'Partial cover' }}
              </span>
            </div>
            <ul class="mt-2 space-y-1">
              <li
                v-for="(why, j) in res.reasons"
                :key="j"
                class="text-xs text-muted flex gap-1.5"
              >
                <UIcon
                  :name="j === 0 ? 'i-lucide-check-circle-2' : j < 3 ? 'i-lucide-minus' : 'i-lucide-alert-triangle'"
                  class="size-3.5 shrink-0 mt-0.5"
                  :class="j < 3 ? 'text-primary/70' : 'text-amber-400/80'"
                />
                <span>{{ why }}</span>
              </li>
            </ul>
          </article>
        </TransitionGroup>
      </div>

      <div class="panel p-5">
        <p class="text-sm font-semibold mb-1">
          Why these scores?
        </p>
        <p class="text-xs text-muted leading-relaxed">
          The demo algorithm is fully deterministic and explainable: <strong class="text-default">40</strong> points location
          (exact area 40 / same zone 22 / other zone 8), <strong class="text-default">30</strong> availability overlap with the
          preferred hours, <strong class="text-default">15</strong> skill fit on the delivery type and
          <strong class="text-default">15</strong> weekly workload headroom — plus a small bonus for riders who already worked with {{ form.company }}. Eligible = rider's shift fully covers the window and they are not off duty.
        </p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.pop-enter-active { transition: all .4s cubic-bezier(.2, .7, .2, 1); }
.pop-enter-from { opacity: 0; transform: translateY(10px); }
.pop-enter-active:nth-child(2) { transition-delay: .05s; }
</style>
