<script lang="ts" setup>
import { useId } from 'reka-ui'
import { type HTMLAttributes, provide } from 'vue'
import { cn } from '@/UI/shadcn/lib/utils.ts'
import { FORM_ITEM_INJECTION_KEY } from './injectionKeys'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>

<template>
  <div
    data-slot="form-item"
    :class="cn('grid gap-2', props.class)"
  >
    <slot />
  </div>
</template>
