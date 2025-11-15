<script setup lang="ts">
// import { GetEventList } from './api/event'
import type { Event, Filter } from './types/eventTypes'
import { onMounted, ref } from 'vue'

const { filters } = defineProps<{ filters: Filter }>()

const events = ref<Event[]>([])

async function GetEventList(filters: Filter) {
  // !TODO filters
  // console.log(filters)
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget egestas ligula.
      Quisque luctus nisi lectus, vel pellentesque ipsum luctus eget. Donec pharetra dolor vitae
      accumsan maximus. Duis scelerisque risus a magna tristique, vel dictum nisl varius. Ut
      dignissim gravida justo et finibus. Donec vehicula scelerisque nisl, nec hendrerit ipsum
      sagittis vitae. Nullam at ipsum in velit congue aliquam. Vivamus vel viverra massa. Aenean non
      arcu sed augue tincidunt mattis nec vitae orci. Proin dapibus neque sit amet turpis laoreet,
      in sagittis lacus scelerisque.`
  const Event = {
    id: String(Math.random()),
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

  return [Event, Event, Event]
}

onMounted(async () => {
  try {
    events.value = await GetEventList(filters)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div
    class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center"
  >
    <EventCard v-for="e in events" :key="e.id" :data="e" />
  </div>
</template>

<style scoped></style>
