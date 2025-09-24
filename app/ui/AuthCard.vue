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
defineEmits(['submit-form'])
</script>

<template>
  <Card :class="cn('w-[380px]', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center">{{ title }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form
        ref="auth-form"
        class="w-full flex flex-col gap-4"
      >
        <slot />
      </form>
    </CardContent>
    <CardFooter class="">
      <Button
        class="cursor-pointer w-full"
        @click="() => $emit('submit-form')"
      >
        {{ btnName }}</Button
      >
    </CardFooter>
  </Card>
</template>

<style scoped></style>
