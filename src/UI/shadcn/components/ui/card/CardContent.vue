<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/UI/shadcn/lib/utils.ts'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', props.class)"
  >
    <slot />
  </div>
</template>
