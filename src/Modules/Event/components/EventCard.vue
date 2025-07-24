<script setup lang="ts">
import WillGoBtn from './Buttons/WillGoBtn.vue'
import ToFavoruteBtn from './Buttons/ToFavoruteBtn.vue'
import { cn } from '@/UI/shadcn/lib/utils'
import { Event } from '@/Modules/Event/types/EventTypes'

defineProps<Event>()
</script>

<template>
  <Card :class="cn('w-[320px] h-[380px] gap-2 flex justify-between', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center">{{ title }}</CardTitle>
      <CardDescription class="border-b-2">{{ author }} {{ hashtag }}</CardDescription>
      <CardDescription class="w-full text-right"
        >{{ quantity.participants }} / {{ quantity.capacity }}</CardDescription
      >
    </CardHeader>
    <CardContent class="w-full h-fit leading-[23px] content">
      {{ description }}
    </CardContent>
    <div class="flex flex-col justify-between items-center h-[100px] w-full">
      <CardHeader class="w-full">
        <CardDescription class="w-full border-t-2">Location: {{ location }}</CardDescription>
        <CardDescription class="w-full border-b-2 flex justify-between items-center"
          ><div>{{ startDate }}</div>
          <div>{{ endDate }}</div>
        </CardDescription>
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

<!--
 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget egestas ligula.
      Quisque luctus nisi lectus, vel pellentesque ipsum luctus eget. Donec pharetra dolor vitae
      accumsan maximus. Duis scelerisque risus a magna tristique, vel dictum nisl varius. Ut
      dignissim gravida justo et finibus. Donec vehicula scelerisque nisl, nec hendrerit ipsum
      sagittis vitae. Nullam at ipsum in velit congue aliquam. Vivamus vel viverra massa. Aenean non
      arcu sed augue tincidunt mattis nec vitae orci. Proin dapibus neque sit amet turpis laoreet,
      in sagittis lacus scelerisque. -->
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
