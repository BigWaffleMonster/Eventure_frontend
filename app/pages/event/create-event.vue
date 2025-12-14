<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const Event = {
  id: '',
  title: 'Test title',
  author: 'John Doe',
  hashtag: '#walk',
  quantity: {
    participants: 3,
    capacity: 10,
  },
  description: '',
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
  <EventForm />
</template>
