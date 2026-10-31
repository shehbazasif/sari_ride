<script setup lang="ts">
const props = defineProps<{
  segments: { label: string, value: number, color: string }[]
  size?: number
}>()

const total = computed(() => props.segments.reduce((s, x) => s + x.value, 0) || 1)
const R = 15.915 // radius so circumference ≈ 100

const donut = computed(() => props.segments.map(s => ({ ...s, pct: Math.round((s.value / total.value) * 100) })))

// build stroke-dasharray segments around a 100-length circle
const circles = computed(() => {
  let offset = 25 // start at 12 o'clock
  return donut.value.map((s) => {
    const dash = `${s.pct} ${100 - s.pct}`
    const o = offset
    offset -= s.pct
    return { ...s, dash, offset: o, id: 'dg' + s.label.replace(/\W/g, '') }
  })
})
</script>

<template>
  <div class="flex items-center gap-5">
    <svg
      :viewBox="'0 0 42 42'"
      :style="{ width: (size || 130) + 'px' }"
      class="shrink-0"
      role="img"
      aria-label="status breakdown"
    >
      <circle
        v-for="(c, i) in circles"
        :key="c.id"
        cx="21"
        cy="21"
        :r="R"
        fill="none"
        :stroke="c.color"
        stroke-width="5"
        :stroke-dasharray="c.dash"
        :stroke-dashoffset="c.offset"
        :opacity="0.95 - i * 0.05"
        stroke-linecap="butt"
      />
    </svg>
    <ul class="space-y-1.5 text-sm">
      <li
        v-for="c in circles"
        :key="'l' + c.id"
        class="flex items-center gap-2"
      >
        <span
          class="size-2.5 rounded-full shrink-0"
          :style="{ background: c.color }"
        />
        <span class="text-muted">{{ c.label }}</span>
        <span class="ml-auto font-mono">{{ c.value }} · {{ c.pct }}%</span>
      </li>
    </ul>
  </div>
</template>
