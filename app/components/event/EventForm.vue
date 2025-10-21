<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/ui/shadcn/components/ui/form'
// import { Input } from '@/ui/shadcn/components/ui/input'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Должно быть валидной почтой'),
    password: z
      .string()
      .min(8, 'Длина пароля минимум 8 символов')
      .max(64, 'Длина пароля максимум 64 символа'),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const handleSubmit = form.handleSubmit(async (values) => {
  const user = {
    id: '1231231',
    email: '123123@qweqwe.2',
    nickName: 'qeqwedsdsQQQ!',
    tokens: {
      accessToken: '1122334',
      refreshToken: '44556677',
    },
  }
  console.log(values, user)
})
</script>

<template>
  <button :click="handleSubmit"></button>
</template>
