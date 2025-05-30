<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import Layout from './Layout.vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { Button } from '@/components/shadcn/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'

const { login } = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Должно быть валидной почтой'),
    password: z
      .string()
      .min(8, 'Длина пароля минимум 8 символов')
      .max(64, 'Длина пароля максимум 64 символа'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const handleSubmit = form.handleSubmit(async (values) => {
  login(values.email, values.password)
})
</script>

<template>
  <Layout title="Вход">
    <form @submit="handleSubmit" class="w-full flex flex-col gap-4">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="w-full">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="email@email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit"> Войти </Button>
    </form>
  </Layout>
</template>
