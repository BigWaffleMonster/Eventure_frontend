<script setup lang="ts">
import { RegistrationForm } from '@/components/auth/index'
import guestMiddleware from '~/middleware/guestMiddleware'

definePageMeta({
  layout: 'auth',
  middleware: guestMiddleware
})
</script>

<template>
  <RegistrationForm />
</template>

<style scoped></style>
