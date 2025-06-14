<script lang="ts" setup>
defineProps<{
  title: string
}>()

import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex flex-col justify-center mx-auto max-w-72 h-dvh min-h-[700px] w-full gap-4">
    <!-- <h1>{{ $route.meta.title }}</h1> -->

    <RouterView />
  </main>
</template>
