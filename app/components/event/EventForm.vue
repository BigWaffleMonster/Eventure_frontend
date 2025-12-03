<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Card } from '~/ui/shadcn/components/ui/card'

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
    title: z.string().email('Должно быть валидной почтой'),
    description: z
      .string()
      .min(8, 'Длина пароля минимум 8 символов')
      .max(64, 'Длина пароля максимум 64 символа'),
    cover: z.string(),
    location: z.string(),
    hashtag: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    capacity: z.number(),
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    cover: '',
    location: '',
    hashtag: '',
    capacity: 0,
  },
})
</script>

<template>
  <Card class="w-full max-w-sm">
    <!-- <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription> Enter your email below to login to your account </CardDescription>
      <CardAction>
        <Button variant="link"> Sign Up </Button>
      </CardAction>
    </CardHeader> -->
    <CardContent>
      <form>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
            </div>
            <Input id="password" type="password" />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex flex-col gap-2">
      <Button class="w-full"> Login </Button>
      <Button variant="outline" class="w-full"> Login with Google </Button>
    </CardFooter>
  </Card>
</template>
