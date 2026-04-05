<script setup lang="ts">
import InfinityScroll from '../InfinityScroll.vue'
import { GetEventList } from './api/eventAPI'
import type { Event, Filter } from './types/eventTypes'
import { ref } from 'vue'

const { filters } = defineProps<{ filters: Filter | undefined }>()

const events = ref<Event[]>([])
const limit = ref(20)
const offset = ref(0)

if (filters) {
  limit.value = filters.limit
  offset.value = filters.offset
}

const { data, isLoading } = GetEventList({ limit, offset })

watch(data, (d) => {
  if (d) events.value.push(...d.data.events)
})

const loadMore = (step: number) => {
  offset.value += step
}
</script>

<template>
  <div class="w-full">
    <InfinityScroll
      :isLoading="isLoading"
      :total="data?.data.total"
      :limit="limit"
      :offset="offset"
      @loadMore="loadMore"
    >
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center"
      >
        <EventCard
          v-for="e in events"
          :key="e.id"
          :data="e"
        />
      </div>
    </InfinityScroll>
  </div>
</template>

<style scoped></style>
