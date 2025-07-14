<script lang="ts" setup>
defineProps<{
  title: string
}>()

import { Navbar } from '@/Components/Navbar'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="">
    <Navbar />
    <div class="w-full p-2">
      <RouterView />
    </div>
  </main>
</template>
