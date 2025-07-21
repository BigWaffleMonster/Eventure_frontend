<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/UI/shadcn/components/ui/card'
import { cn } from '@/UI/shadcn/lib/utils'
import { Button } from '@/UI/shadcn/components/ui/button'

defineProps<{ title: unknown; btnName: string }>()
</script>

<template>
  <Card :class="cn('w-[380px]', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center">{{ title }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form ref="auth-form" class="w-full flex flex-col gap-4">
        <slot></slot>
      </form>
    </CardContent>
    <CardFooter class="">
      <Button class="cursor-pointer w-full" @click="() => $emit('submitForm')">
        {{ btnName }}</Button
      >
    </CardFooter>
  </Card>
</template>

<style scoped></style>
