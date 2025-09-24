<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui/shadcn/components/ui/form'
import { Input } from '@/ui/shadcn/components/ui/input'
import { useAuthStore } from './store/authStore'
import { Login } from './api/login'
import AuthCard from '@/ui/AuthCard.vue'

const { setUser } = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Должно быть валидной почтой'),
    password: z
      .string()
      .min(8, 'Длина пароля минимум 8 символов')
      .max(64, 'Длина пароля максимум 64 символа')
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const handleSubmit = form.handleSubmit(async (values) => {
  const data = await Login(values.email, values.password)
  console.log(data)

  const user = {
    id: '1231231',
    email: '123123@qweqwe.2',
    nickName: 'qeqwedsdsQQQ!',
    tokens: {
      accessToken: '1122334',
      refreshToken: '44556677'
    }
  }
  console.log(values, user)
  setUser(user)
})
</script>

<template>
  <AuthCard
    title="Вход"
    btn-name="Войти"
    @submitForm="handleSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="email"
    >
      <FormItem class="w-full">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="email@email"
            v-bind="componentField"
            class="border-(--color-border)"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="password"
    >
      <FormItem>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
            class="border-(--color-border)"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </AuthCard>
</template>
