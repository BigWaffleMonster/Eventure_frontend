<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/UI/shadcn/components/ui/card'
import { cn } from '@/UI/shadcn/lib/utils'

defineProps<{ title: string; author: string; hastags: string[] }>()
</script>

<template>
  <Card :class="cn('w-[320px] h-[380px] gap-2 flex justify-between', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center">{{ title }}</CardTitle>
      <CardDescription class="border-b-2">Author #event</CardDescription>
      <CardDescription class="w-full text-right">0 / 100</CardDescription>
    </CardHeader>
    <CardContent class="w-full h-fit leading-[23px] content">
      <slot name="content"></slot>
    </CardContent>
    <div class="flex flex-col justify-between items-center h-[100px] w-full">
      <CardHeader class="w-full">
        <CardDescription class="w-full border-t-2">Location: Orisona 5 street</CardDescription>
        <CardDescription class="w-full border-b-2 flex justify-between items-center"
          ><div>19.09.2009</div>
          <div>10.09.2010</div>
        </CardDescription>
      </CardHeader>
      <CardFooter class="w-full flex justify-between px-6">
        <slot name="btns"></slot>
      </CardFooter>
    </div>
  </Card>
</template>

<style scoped>
.content {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: justify;
}
</style>
