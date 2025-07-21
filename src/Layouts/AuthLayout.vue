<script lang="ts" setup>
defineProps<{
  title: string
}>()

import { RouterView } from 'vue-router'
</script>

<template>
  <main
    class="flex flex-col justify-center items-center mx-auto max-w-98 h-dvh min-h-[700px] w-full gap-4"
  >
    <RouterView />
  </main>
</template>
