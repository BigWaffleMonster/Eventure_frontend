<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/UI/shadcn/components/ui/form'
import { Input } from '@/UI/shadcn/components/ui/input'
import { Register } from '../api/register'
import AuthCard from '@/UI/Card/AuthCard.vue'

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().email('Должно быть валидной почтой'),
      password: z
        .string()
        .min(8, 'Длина пароля минимум 8 символов')
        .max(64, 'Длина пароля максимум 64 символа'),
      repeatPassword: z
        .string()
        .min(8, 'Длина пароля минимум 8 символов')
        .max(64, 'Длина пароля максимум 64 символа'),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: 'Пароли не совпадают',
      path: ['repeatPassword'],
    }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
    repeatPassword: '',
  },
})

const handleSubmit = form.handleSubmit(async (values) => {
  console.log(values)
  await Register(values.email, values.password)
})
</script>

<template>
  <AuthCard :title="$route.meta.title" btn-name="Зарегистрироваться" @submitForm="handleSubmit">
    <FormField v-slot="{ componentField }" name="email">
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
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Пароль</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" class="border-(--color-border)" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="repeatPassword">
      <FormItem>
        <FormLabel>Повторите пароль</FormLabel>
        <FormControl>
          <Input type="password" v-bind="componentField" class="border-(--color-border)" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </AuthCard>
</template>
