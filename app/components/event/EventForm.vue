<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/ui/card'
import { Input } from '@/ui/shadcn/components/ui/input'
import { Label } from '@/ui/shadcn/components/ui/label'
import { Button } from '@/ui/shadcn/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/components/ui/form'

import { cn } from '@/ui/shadcn/lib/utils'
import type { LocationData } from '../map/types'

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
    title: z.string().min(1, 'Длина должна быть больше 1').optional(),
    description: z.string(),
    // cover: z.string(),
    location: z.string(),
    hashtag: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    capacity: z.number(),
    coverFilename: z.string().optional(), // e.g. "event.jpg"
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    location: '',
    hashtag: '',
    capacity: 0,
  },
})

const eventCover = useTemplateRef<HTMLInputElement>('event-cover')
const coverSrc = ref<string | undefined>(undefined)
const coverFile = ref<File | null>(null)

// {
//   lat: 55.750690087043814,
//   lng: 31.6029396057129,
//   address:
//     'Д. Ф. Устинову, 19, улица Знаменка, 35, район Арба…ва, Центральный федеральный округ, 119019, Россия',
// }
const eventLocation = ref<LocationData | null>(null)

const dropLocation = () => {
  eventLocation.value = null
}

// const formData = new FormData()
// formData.append('title', form.values.title)
// formData.append('description', form.values.description)
// formData.append('cover', selectedFile.value, selectedFile.value.name)
watch(coverFile, (newFile, oldFile) => {
  if (coverSrc.value) {
    URL.revokeObjectURL(coverSrc.value)
    coverSrc.value = undefined
  }
  if (newFile) {
    coverSrc.value = URL.createObjectURL(newFile)
  }
})

async function selectCover() {
  eventCover.value?.click()
  const r = await form.validate()
  console.log(r)
}

function coverChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    coverSrc.value = URL.createObjectURL(file)

    form.setValues({
      ...form.values,
      coverFilename: file.name,
    })
  }
}

function createEvent() {
  console.log(eventLocation.value)
}

onUnmounted(() => {
  if (coverSrc.value) {
    URL.revokeObjectURL(coverSrc.value)
    coverSrc.value = undefined
  }
})
</script>

<template>
  <Card :class="cn('w-[380px]', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle class="text-center"> Создать событие </CardTitle>
    </CardHeader>

    <CardContent>
      <form ref="auth-form" class="w-full flex flex-col gap-4">
        <!--  -->
        <FormField v-slot="{ componentField }" name="title">
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
        <FormField v-slot="{ componentField }" name="hastag">
          <FormItem class="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <!-- select instead of input -->
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
        <FormField v-slot="{ componentField }" name="description">
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
        <FormField v-slot="{ componentField }" name="dateStart">
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
        <FormField v-slot="{ componentField }" name="dateEnd">
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
        <FormField v-slot="{ componentField }" name="capacity">
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
        <FormField v-slot="{ componentField }" name="location">
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
        <FormField v-slot="{ componentField }" name="cover">
          <FormItem class="w-full">
            <FormLabel>Cover</FormLabel>
            <FormControl>
              <div class="p-2 border-1 rounded-md">
                <!-- <Label for="cover">Picture</Label> -->
                <img :src="coverSrc" alt="Нажмите чтобы загрузить..." @click="selectCover" />
                <input
                  id="cover"
                  type="file"
                  hidden="true"
                  ref="event-cover"
                  @change="coverChange"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!--  -->
      </form>
    </CardContent>
    <CardFooter class="">
      <Button class="cursor-pointer w-full" @click="createEvent"> Создать </Button>
      <Button class="cursor-pointer w-full" @click="dropLocation"> Удалить локацию </Button>
    </CardFooter>
    <ClientOnly>
      <LocationPicker class="test" v-model="eventLocation" />
    </ClientOnly>
  </Card>
</template>

<style lang="css" scoped>
.test {
  width: 600px;
  height: 600px;
}
</style>
