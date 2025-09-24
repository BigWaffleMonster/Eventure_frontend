<script setup lang="ts">
import { GetEventList } from './api/event'
import type { Event } from './types/eventTypes'
import { onMounted, ref } from 'vue'

const events = ref<Event[]>([])

onMounted(async () => {
  try {
    events.value = await GetEventList()
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div>HELLO</div>
</template>

<style scoped></style>
