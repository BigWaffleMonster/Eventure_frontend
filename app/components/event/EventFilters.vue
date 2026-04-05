<script setup lang="ts">
import type { Filter } from './types/eventTypes'
import { ref } from 'vue'

const filters = ref<Filter>()
</script>

<template>
  <div class="w-full">
    <slot
      name="list"
      :filters="filters"
    ></slot>
  </div>
</template>

<style scoped></style>
