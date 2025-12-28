<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/ui/select'
import type { AcceptableValue } from 'reka-ui'

const props = defineProps<{
  modelValue?: string

  items: { value: string; name: string }[]

  label: string
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const setItem = (d: AcceptableValue) => {
  emit('update:modelValue', d as string)
}
</script>

<template>
  <Select @update:model-value="setItem">
    <SelectTrigger class="border-(--color-border) w-full">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ label }}</SelectLabel>
        <SelectItem v-for="v in items" :value="v.value" :key="v.value">{{ v.name }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
