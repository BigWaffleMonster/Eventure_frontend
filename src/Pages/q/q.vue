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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/UI/shadcn/components/ui/card'
import { Input } from '@/UI/shadcn/components/ui/input'
import { cn } from '@/UI/shadcn/lib/utils'
import CardDescription from '@/UI/shadcn/components/ui/card/CardDescription.vue'
import EventCard from '@/Modules/Event/components/EventCard.vue'

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
  // setUser({ id: data.id, nickName: data?.nickName ? data.nickName : data.email })
})
</script>

<template>
  <div>
    <div>
      <Card :class="cn('w-[380px] h-[400px]', $attrs.class ?? '')">
        <CardHeader>
          <CardTitle class="text-center">{{ $route.meta.title }}</CardTitle>
          <CardDescription>#event</CardDescription>
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
            <!-- <Button class="cursor-pointer" type="submit"> Войти </Button> -->
          </form>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button class="cursor-pointer" type="submit"> Логин </Button>
          <Button class="cursor-pointer" type="submit"> Войти </Button>
        </CardFooter>
      </Card>
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
    </div>
  </div>
</template>
