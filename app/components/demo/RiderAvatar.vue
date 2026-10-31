<script setup lang="ts">
const props = defineProps<{
  name: string
  status?: 'available' | 'assigned' | 'unavailable'
  size?: 'sm' | 'md' | 'lg'
}>()

const gradients = [
  'from-cyan-400 to-violet-500',
  'from-violet-500 to-fuchsia-500',
  'from-cyan-300 to-sky-500',
  'from-sky-500 to-violet-500'
]
const initials = computed(() => props.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase())
const grad = computed(() => gradients[(props.name.length + props.name.charCodeAt(0)) % gradients.length])
const sizeCls = computed(() => ({ sm: 'size-8 text-[11px]', md: 'size-10 text-xs', lg: 'size-14 text-base' }[props.size || 'md']))

const dot = computed(() => ({
  available: 'bg-green-400',
  assigned: 'bg-amber-400',
  unavailable: 'bg-zinc-500'
}[props.status || 'available']))
</script>

<template>
  <span class="relative inline-flex shrink-0">
    <span
      class="rounded-full bg-gradient-to-br grid place-items-center font-bold text-[#05070d]"
      :class="[grad, sizeCls]"
    >{{ initials }}</span>
    <span
      v-if="status"
      class="absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-[#05070d]"
      :class="dot"
    />
  </span>
</template>
