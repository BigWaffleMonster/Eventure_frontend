<script setup lang="ts">
import EventFilters from '~/components/event/EventFilters.vue'

definePageMeta({
  layout: 'main'
})
</script>

<template>
  <div class="w-full flex justify-center content-center">
    <EventFilters>
      <template #list="{ filters }">
        <EventList :filters="filters" />
      </template>
    </EventFilters>
  </div>
</template>
