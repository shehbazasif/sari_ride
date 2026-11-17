<script setup lang="ts">
const props = defineProps<{
  name: string
  status?: 'available' | 'assigned' | 'unavailable'
  size?: 'sm' | 'md' | 'lg'
}>()

const gradients = [
  'bg-primary/15 text-primary-700 dark:text-primary-300',
  'bg-secondary/15 text-secondary-700 dark:text-secondary-300',
  'bg-amber-500/15 text-amber-800 dark:text-amber-300',
  'bg-accented text-default'
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
      class="rounded-full grid place-items-center font-semibold"
      :class="[grad, sizeCls]"
    >{{ initials }}</span>
    <span
      v-if="status"
      class="absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-[var(--ui-bg-elevated)]"
      :class="dot"
    />
  </span>
</template>
