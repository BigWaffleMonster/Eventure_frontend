<script setup lang="ts">
import { GetEventList } from '@/Modules/Event/api/event'
import { Event } from '@/Modules/Event/types/EventTypes'
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
