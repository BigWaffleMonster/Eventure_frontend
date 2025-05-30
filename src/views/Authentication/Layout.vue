<script lang="ts" setup>
const { title } = defineProps<{
  title: string
}>()
</script>

<template>
  <main class="flex flex-col justify-center mx-auto max-w-72 h-dvh min-h-[700px] w-full gap-4">
    <h1>{{ title }}</h1>
    <slot />
  </main>
</template>
