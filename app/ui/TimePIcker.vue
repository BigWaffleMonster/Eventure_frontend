<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const hourEl = useTemplateRef<HTMLInputElement>('hourEl')
const minuteEl = useTemplateRef<HTMLInputElement>('minuteEl')

const hour = ref('')
const minute = ref('')

// Инициализация
if (props.modelValue && /^\d{1,2}:\d{1,2}$/.test(props.modelValue)) {
  const [h, m] = props.modelValue.split(':')
  hour.value = h
  minute.value = m
}

const handleBlur = () => {
  let h = Math.min(23, Math.max(0, parseInt(hour.value) || 0))
  let m = Math.min(59, Math.max(0, parseInt(minute.value) || 0))
  const result = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  emit('update:modelValue', result)
  hour.value = String(h).padStart(2, '0')
  minute.value = String(m).padStart(2, '0')
}

const handleHourInput = (e: Event) => {
  console.log(hour.value)
  if (hour.value.length === 2) {
    console.log(hour.value)
    hour.value = ''
    // el.value = ''
  }
  const el = e.target as HTMLInputElement

  console.log(el, 'asdasd')
  el.value = el.value.replace(/\D/g, '').slice(0, 2)
  hour.value = el.value
  if (el.value.length === 2) {
    minuteEl.value?.focus()
  }
}

const handleMinuteInput = (e: Event) => {
  const el = e.target as HTMLInputElement
  el.value = el.value.replace(/\D/g, '').slice(0, 2)
  minute.value = el.value
}
</script>

<template>
  <div class="flex items-center gap-1">
    <!-- ⚠️ Нативный input, но со стилями ShadCN -->
    <input
      ref="hourEl"
      type="text"
      inputmode="numeric"
      maxlength="2"
      :value="hour"
      @input="handleHourInput"
      @blur="handleBlur"
      placeholder="00"
      class="flex h-9 w-12 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-center font-mono"
    />
    <span class="text-muted-foreground">:</span>
    <input
      ref="minuteEl"
      type="text"
      inputmode="numeric"
      maxlength="2"
      :value="minute"
      @input="handleMinuteInput"
      @blur="handleBlur"
      placeholder="00"
      class="flex h-9 w-12 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-center font-mono"
    />
  </div>
</template>
