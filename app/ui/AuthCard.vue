<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/ui/shadcn/components/ui/card'
import { cn } from '@/ui/shadcn/lib/utils'
import { Button } from '@/ui/shadcn/components/ui/button'

defineProps<{ title: string; btnName: string }>()
const emit = defineEmits(['submit-form'])
const submitBtn = useTemplateRef('submit-btn')

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit-form')
}

const clickSubmit = () => {
  console.log(submitBtn.value, 'EEEOEOE')
  submitBtn.value!.click()
}
</script>

<template>
  <Card :class="cn('w-[380px]', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center">
        {{ title }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <form
        ref="auth-form"
        class="w-full flex flex-col gap-4"
        @submit.prevent="handleSubmit"
      >
        <slot />
        <button
          v-show="false"
          ref="submit-btn"
          type="submit"
          @click="handleSubmit"
        />
      </form>
    </CardContent>
    <CardFooter class="">
      <Button
        class="cursor-pointer w-full"
        @click="clickSubmit"
      >
        {{ btnName }}
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
