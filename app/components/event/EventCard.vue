<script setup lang="ts">
import WillGoBtn from "./buttons/WillGoBtn.vue";
import ToFavoruteBtn from "./buttons/ToFavoruteBtn.vue";
import { cn } from "@/ui/shadcn/lib/utils";
import type { Event } from "./types/eventTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/components/ui/card";

defineProps<{ data: Event }>();
</script>

<template>
  <Card :class="cn('w-[320px] h-[380px] gap-2 flex justify-between', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center">{{ data.title }}</CardTitle>
      <CardDescription class="border-b-2">{{ data.author }}</CardDescription>
      <div class="w-full flex justify-between items-center">
        <CardDescription> {{ data.hashtag }} </CardDescription
        ><CardDescription>
          {{ data.quantity.participants }} / {{ data.quantity.capacity }}
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="w-full h-fit leading-[23px] content">
      {{ data.description }}
    </CardContent>
    <div class="flex flex-col justify-between items-center h-[100px] w-full">
      <CardHeader class="w-full">
        <CardDescription class="w-full border-t-2">Location: {{ data.location }}</CardDescription>
        <div class="w-full border-b-2 flex justify-between items-center">
          <CardDescription>{{ data.startDate }} </CardDescription>
          <CardDescription>
            {{ data.endDate }}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter class="w-full flex justify-between px-6">
        <slot name="btns">
          <ToFavoruteBtn :status="false" />
          <WillGoBtn :status="false" />
        </slot>
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
