<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Input } from '@/ui/shadcn/components/ui/input' // 👈 импорт shadcn Input

const props = defineProps<{
  modelValue?: string
  initValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const minuteEl = useTemplateRef<InstanceType<typeof Input>>('minuteEl')

const hour = ref('')
const minute = ref('')

watch(
  () => [props.modelValue, props.initValue] as const,
  ([modelVal, initVal]) => {
    const valueToUse = modelVal || initVal
    if (valueToUse && /^\d{1,2}:\d{1,2}$/.test(valueToUse)) {
      const [h, m] = valueToUse.split(':')
      if (h && m) {
        hour.value = h
        minute.value = m
      }
    }
  },
  { immediate: true }
)

const timeToMinutes = (time: string): number => {
  if (!/^\d{1,2}:\d{1,2}$/.test(time)) return -1
  const [h, m] = time.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

const clampHour = (value: string): number => {
  return Math.min(23, Math.max(0, parseInt(value) || 0))
}

const clampMinute = (value: string): number => {
  return Math.min(59, Math.max(0, parseInt(value) || 0))
}

const handleHourInput = (e: Event) => {
  const el = e.target as HTMLInputElement
  let value = el.value.replace(/\D/g, '').slice(0, 2)

  if (value.length === 2 && parseInt(value) > 23) {
    value = '23'
  }

  el.value = value
  hour.value = value

  if (value.length === 2) {
    minuteEl.value?.$el?.focus()
  }
}

const applyMinTimeConstraint = (h: string, m: string): { hour: string; minute: string } => {
  if (!props.initValue || !/^\d{1,2}:\d{1,2}$/.test(props.initValue)) {
    return {
      hour: String(clampHour(h)).padStart(2, '0'),
      minute: String(clampMinute(m)).padStart(2, '0')
    }
  }

  const currentTotal = clampHour(h) * 60 + clampMinute(m)
  const initTotal = timeToMinutes(props.initValue)

  if (initTotal !== -1 && currentTotal <= initTotal) {
    const [initH, initM] = props.initValue.split(':')
    const t = Number(initM) + 1
    return {
      hour: String(initH).padStart(2, '0'),
      minute: String(t).padStart(2, '0')
    }
  }

  return {
    hour: String(clampHour(h)).padStart(2, '0'),
    minute: String(clampMinute(m)).padStart(2, '0')
  }
}

const handleMinuteInput = (e: Event) => {
  const el = e.target as HTMLInputElement
  let value = el.value.replace(/\D/g, '').slice(0, 2)

  if (value.length === 2 && parseInt(value) > 59) {
    value = '59'
  }

  el.value = value
  minute.value = value
}

const handleHourBlur = () => {
  if (hour.value) {
    const h = clampHour(hour.value)
    hour.value = String(h).padStart(2, '0')
  }

  const m = minute.value ? String(clampMinute(minute.value)).padStart(2, '0') : ''
  emit('update:modelValue', `${hour.value}:${m}`)
}

const handleMinuteBlur = () => {
  const constrained = applyMinTimeConstraint(hour.value, minute.value)
  hour.value = constrained.hour
  minute.value = constrained.minute
  emit('update:modelValue', `${constrained.hour}:${constrained.minute}`)
}
</script>

<template>
  <div class="flex items-center gap-1">
    <Input
      ref="hourEl"
      class="w-12 text-center font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-(--color-border)"
      type="text"
      placeholder="00"
      inputmode="numeric"
      maxlength="2"
      :value="hour"
      @input="handleHourInput"
      @blur="handleHourBlur"
    />
    <span class="text-muted-foreground">:</span>
    <Input
      ref="minuteEl"
      class="w-12 text-center font-mono [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-(--color-border)"
      type="text"
      placeholder="00"
      inputmode="numeric"
      maxlength="2"
      :value="minute"
      @input="handleMinuteInput"
      @blur="handleMinuteBlur"
    />
  </div>
</template>
