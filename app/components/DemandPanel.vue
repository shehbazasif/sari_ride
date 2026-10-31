<script setup lang="ts">
const bars = [38, 52, 44, 70, 88, 76, 94, 60, 48]
const hours = ['10', '11', '12', '13', '18', '19', '20', '21', '22']
</script>

<template>
  <div class="panel p-5 sm:p-6 space-y-5">
    <div class="flex items-center justify-between">
      <p class="font-semibold">Tomorrow's rider demand</p>
      <span class="text-xs font-mono px-2 py-1 rounded-full border border-primary/40 text-primary">Sample data</span>
    </div>

    <svg viewBox="0 0 400 140" class="w-full h-auto" role="img" aria-label="Forecast line chart of demand">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#22d3ee" stop-opacity=".35" /><stop offset="1" stop-color="#22d3ee" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 30 H400 M0 70 H400 M0 110 H400" stroke="#16213f" />
      <path d="M0 110 C40 100 60 90 100 92 S160 60 200 52 S260 20 300 26 S360 70 400 80 V140 H0 Z" fill="url(#area)" />
      <path d="M0 110 C40 100 60 90 100 92 S160 60 200 52 S260 20 300 26 S360 70 400 80" fill="none" stroke="#22d3ee" stroke-width="2.5" class="draw" />
    </svg>

    <div>
      <p class="text-sm text-muted mb-2">Riders available by hour</p>
      <div class="flex items-end gap-2 h-24">
        <div v-for="(b, i) in bars" :key="i" class="flex-1 flex flex-col items-center justify-end h-full gap-1">
          <div class="w-full rounded-t bg-gradient-to-t from-violet-500 to-cyan-400 grow" :style="{ height: b + '%', '--d': 0.5 + i * 0.08 + 's' }" />
          <span class="text-[10px] font-mono text-muted">{{ hours[i] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
