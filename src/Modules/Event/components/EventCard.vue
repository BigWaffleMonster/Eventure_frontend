<script setup lang="ts">
import TextCard from '@/UI/Card/TextCard.vue'
import WillGoBtn from './Buttons/WillGoBtn.vue'
import ToFavorute from './Buttons/ToFavorute.vue'

//need event type
defineProps<{ title: string; status: boolean }>()
</script>

<template>
  <TextCard :title="title">
    <template #content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget egestas ligula.
      Quisque luctus nisi lectus, vel pellentesque ipsum luctus eget. Donec pharetra dolor vitae
      accumsan maximus. Duis scelerisque risus a magna tristique, vel dictum nisl varius. Ut
      dignissim gravida justo et finibus. Donec vehicula scelerisque nisl, nec hendrerit ipsum
      sagittis vitae. Nullam at ipsum in velit congue aliquam. Vivamus vel viverra massa. Aenean non
      arcu sed augue tincidunt mattis nec vitae orci. Proin dapibus neque sit amet turpis laoreet,
      in sagittis lacus scelerisque.
    </template>
    <template #btns>
      <ToFavorute :status="status" />
      <WillGoBtn :status="status" />
    </template>
  </TextCard>
</template>

<style scoped></style>
