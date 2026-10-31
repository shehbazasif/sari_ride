<template>
  <div class="panel p-5">
    <div class="flex items-center gap-2 text-muted">
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-4"
      />
      <p class="text-xs font-mono uppercase tracking-wider">
        {{ label }}
      </p>
    </div>
    <p
      class="mt-2 text-3xl font-bold"
      :class="accent || 'text-default'"
    >
      {{ value }}
    </p>
    <p
      v-if="sub"
      class="mt-1 text-sm text-muted"
    >
      {{ sub }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  icon?: string
  sub?: string
  accent?: string
}>()
</script>
