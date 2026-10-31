<script setup lang="ts">
const props = defineProps<{
  labels: string[]
  series: { name: string, data: number[], color: string, area?: boolean, dashed?: boolean }[]
  /** Keep Y scale 0-based so comparisons between charts stay honest */
  baseline?: number
}>()

const W = 460
const H = 170
const PAD = 10

const allValues = computed(() => props.series.flatMap(s => s.data))
const maxV = computed(() => {
  const m = Math.max(...allValues.value, props.baseline ?? 0)
  return Math.ceil(m / 5) * 5 || 5
})

function x(i: number) {
  const n = props.labels.length
  return PAD + (n <= 1 ? 0 : (i * (W - PAD * 2)) / (n - 1))
}
function y(v: number) {
  return H - PAD - (v / maxV.value) * (H - PAD * 2)
}

const paths = computed(() => props.series.map((s, si) => {
  const d = s.data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  return {
    name: s.name,
    color: s.color,
    line: d,
    area: s.area ? `${d} L${x(s.data.length - 1).toFixed(1)} ${H - PAD} L${x(0)} ${H - PAD} Z` : '',
    dashed: s.dashed,
    id: `sg${si}-${s.name.replace(/\W/g, '')}`
  }
}))
</script>

<template>
  <div>
    <svg
      :viewBox="`0 0 ${W} ${H}`"
      class="w-full h-auto"
      role="img"
      aria-label="line chart"
    >
      <defs>
        <linearGradient
          v-for="p in paths"
          :id="'grad-' + p.id"
          :key="'g' + p.id"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0"
            :stop-color="p.color"
            stop-opacity=".3"
          />
          <stop
            offset="1"
            :stop-color="p.color"
            stop-opacity="0"
          />
        </linearGradient>
      </defs>
      <path
        d="M0 42 H460 M0 85 H460 M0 128 H460"
        stroke="#16213f"
      />
      <path
        v-for="p in paths"
        :key="'a' + p.id"
        :d="p.area"
        :fill="`url(#grad-${p.id})`"
      />
      <path
        v-for="p in paths"
        :key="'l' + p.id"
        :d="p.line"
        fill="none"
        :stroke="p.color"
        stroke-width="2.5"
        :stroke-dasharray="p.dashed ? '6 5' : 'none'"
        class="draw"
      />
    </svg>
    <div class="mt-1 flex flex-wrap gap-x-4 gap-y-1 justify-center">
      <span
        v-for="p in paths"
        :key="'k' + p.id"
        class="inline-flex items-center gap-1.5 text-xs text-muted"
      >
        <span
          class="size-2.5 rounded-full"
          :style="{ background: p.color }"
        />{{ p.name }}
      </span>
    </div>
  </div>
</template>
