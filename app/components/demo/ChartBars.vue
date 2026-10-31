<script setup lang="ts">
const props = defineProps<{
  items: { label: string, value: number }[]
  height?: number
  accent?: string
}>()

const max = computed(() => Math.max(...props.items.map(i => i.value), 1))
</script>

<template>
  <div class="space-y-2">
    <div
      class="flex items-end gap-1.5"
      :style="{ height: (height || 120) + 'px' }"
    >
      <div
        v-for="(item, i) in items"
        :key="item.label"
        class="flex-1 flex items-end justify-center h-full"
      >
        <div
          class="w-full rounded-t bg-gradient-to-t from-violet-500 to-cyan-400 grow"
          :style="{ 'height': (item.value / max) * 100 + '%', '--d': 0.3 + i * 0.05 + 's' }"
          :title="`${item.label}: ${item.value}`"
        />
      </div>
    </div>
    <div class="flex gap-1.5">
      <span
        v-for="item in items"
        :key="item.label"
        class="flex-1 text-center text-[10px] font-mono text-muted truncate"
      >{{ item.label }}</span>
    </div>
  </div>
</template>
