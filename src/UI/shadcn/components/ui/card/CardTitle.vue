<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/UI/shadcn/lib/utils.ts'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3
    data-slot="card-title"
    :class="cn('leading-none font-semibold', props.class)"
  >
    <slot />
  </h3>
</template>
