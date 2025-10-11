<script setup lang="ts">
// import { EventList } from '@/components/event'
import EventCard from '~/components/event/EventCard.vue'

definePageMeta({
  layout: 'main',
})

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget egestas ligula.
      Quisque luctus nisi lectus, vel pellentesque ipsum luctus eget. Donec pharetra dolor vitae
      accumsan maximus. Duis scelerisque risus a magna tristique, vel dictum nisl varius. Ut
      dignissim gravida justo et finibus. Donec vehicula scelerisque nisl, nec hendrerit ipsum
      sagittis vitae. Nullam at ipsum in velit congue aliquam. Vivamus vel viverra massa. Aenean non
      arcu sed augue tincidunt mattis nec vitae orci. Proin dapibus neque sit amet turpis laoreet,
      in sagittis lacus scelerisque.`
const Event = {
  title: 'Test title',
  author: 'John Doe',
  hashtag: '#walk',
  quantity: {
    participants: 3,
    capacity: 10,
  },
  description: text,
  location: 'My home dude',
  startDate:
    new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) ?? '',
  endDate:
    new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) ?? '',
}
</script>

<template>
  <div>
    <!-- !TODO remove all EcentCard mocks -->
    <EventCard :data="Event" />
  </div>
</template>
