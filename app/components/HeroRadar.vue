<script setup lang="ts">
const riders = [
  { x: 190, y: 150, d: 0 }, { x: 330, y: 120, d: 0.5 }, { x: 150, y: 290, d: 1 },
  { x: 360, y: 300, d: 1.5 }, { x: 250, y: 200, d: 2 }, { x: 300, y: 380, d: 0.8 }, { x: 210, y: 390, d: 1.8 }
]
const hubs = [
  { x: 70, y: 90, label: 'eFOOD' }, { x: 450, y: 170, label: 'BOX' }, { x: 410, y: 430, label: 'Wolt' }
]
const links = [
  [0, 0], [2, 0], [1, 1], [3, 1], [4, 1], [5, 2], [6, 2]
]
</script>

<template>
  <svg viewBox="0 0 520 520" class="w-full h-auto float" role="img" aria-label="Riders being matched to delivery companies">
    <defs>
      <radialGradient id="wedge" cx="260" cy="260" r="240" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#22d3ee" stop-opacity=".45" />
        <stop offset="1" stop-color="#22d3ee" stop-opacity="0" />
      </radialGradient>
    </defs>
    <circle cx="260" cy="260" r="240" fill="rgba(10,15,28,.6)" stroke="#1e2b4d" />
    <circle cx="260" cy="260" r="180" fill="none" stroke="#1e2b4d" />
    <circle cx="260" cy="260" r="120" fill="none" stroke="#1e2b4d" />
    <circle cx="260" cy="260" r="60" fill="none" stroke="#1e2b4d" />
    <path d="M260 20 V500 M20 260 H500" stroke="#16213f" />
    <g class="sweep">
      <path d="M260 260 L260 20 A240 240 0 0 1 430 90 Z" fill="url(#wedge)" />
      <line x1="260" y1="260" x2="260" y2="20" stroke="#22d3ee" stroke-width="1.5" />
    </g>

    <line
      v-for="(l, i) in links" :key="'l' + i"
      :x1="riders[l[0]].x" :y1="riders[l[0]].y" :x2="hubs[l[1]].x" :y2="hubs[l[1]].y"
      stroke="#8b5cf6" stroke-width="1.2" opacity=".7" class="flow"
    />

    <g v-for="(r, i) in riders" :key="'r' + i">
      <circle :cx="r.x" :cy="r.y" r="5" fill="none" stroke="#22d3ee" class="ping" :style="{ '--d': r.d + 's' }" />
      <circle :cx="r.x" :cy="r.y" r="4.5" fill="#22d3ee" />
    </g>

    <g v-for="h in hubs" :key="h.label">
      <rect :x="h.x - 36" :y="h.y - 14" width="72" height="28" rx="14" fill="#0d1426" stroke="#8b5cf6" />
      <text :x="h.x" :y="h.y + 5" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="600">{{ h.label }}</text>
    </g>

    <circle cx="260" cy="260" r="6" fill="#fff" />
  </svg>
</template>
