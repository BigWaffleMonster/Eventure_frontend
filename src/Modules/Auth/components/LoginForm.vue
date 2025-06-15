<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { Button } from '@/UI/shadcn/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/UI/shadcn/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/UI/shadcn/components/ui/card'
import { Input } from '@/UI/shadcn/components/ui/input'
import { useAuthStore } from '../store/authStore'
import { Login } from '../api/login'

const { setUser } = useAuthStore()

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
  const data = await Login(values.email, values.password)
  console.log(data)

  const user = {
    id: '1231231',
    email: '123123@qweqwe.2',
    nickName: 'qeqwedsdsQQQ!',
    tokens: {
      accessToken: '1122334',
      refreshToken: '44556677',
    },
  }
  setUser(user)
  // setUser({ id: data.id, nickName: data?.nickName ? data.nickName : data.email })
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $route.meta.title }}</CardTitle>
    </CardHeader>

    <CardContent>
      <form @submit="handleSubmit" class="w-full flex flex-col gap-4">
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
        <Button class="cursor-pointer" type="submit"> Войти </Button>
      </form>
    </CardContent>
  </Card>
</template>
