<script setup lang="ts">
import { Button } from '@/ui/shadcn/components/ui/button'

defineProps<{
  status: boolean
}>()
</script>

<template>
  <Button v-if="!status">
    В избранное
  </Button>
  <Button v-else>
    Убрать из избранного
  </Button>
</template>

<style scoped></style>
