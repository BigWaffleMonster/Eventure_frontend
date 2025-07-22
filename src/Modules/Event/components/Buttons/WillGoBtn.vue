<script setup lang="ts">
import { Button } from '@/UI/shadcn/components/ui/button'

defineProps<{
  status: boolean
}>()
</script>

<template>
  <Button v-if="!status">Пойду</Button>
  <Button v-else>Отказаться</Button>
</template>

<style scoped></style>
