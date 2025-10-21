<script setup lang="ts">
import { Button } from '@/ui/shadcn/components/ui/button'
import { Heart } from 'lucide-vue-next'

defineProps<{
  status: boolean
}>()
</script>

<template>
  <Button v-if="!status">
    <Heart />
  </Button>
  <Button v-else> Убрать из избранного </Button>
</template>

<style scoped></style>
