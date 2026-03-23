<script setup lang="ts">
import { LoginForm } from '@/components/auth/index'
import guestMiddleware from '~/middleware/guestMiddleware'

definePageMeta({
  layout: 'auth',
  middleware: guestMiddleware
})
</script>

<template>
  <LoginForm />
</template>

<style scoped></style>
