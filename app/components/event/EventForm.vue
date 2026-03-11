<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { format, toDate } from 'date-fns'

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

import { Popover, PopoverTrigger, PopoverContent } from '@/ui/shadcn/components/ui/popover'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/shadcn/components/ui/form'

import type { LocationData } from '../map/types'
import { Separator } from '@/ui/shadcn/components/ui/separator'
import { Calendar } from '@/ui/shadcn/components/ui/calendar'
import {
  CalendarDate,
  getLocalTimeZone,
  toCalendar,
  toCalendarDate,
  today,
} from '@internationalized/date'
import { cn } from '@/ui/shadcn/lib/utils'
import { CalendarIcon } from 'lucide-vue-next'
import TimePIcker from '~/ui/TimePIcker.vue'
import ItemSelect from '~/ui/ItemSelect.vue'

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/ui/shadcn/components/ui/form'
// import { Input } from '@/ui/shadcn/components/ui/input'

const calendarDateSchema = z.custom<CalendarDate>((val) => {
  return val instanceof CalendarDate
}, 'Дата не выбрана')

const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  place_id: z.number(),
  address: z.string().optional(),
}) satisfies z.ZodType<LocationData>

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Длина должна быть больше 1'),
    description: z.string(),
    category: z.string().min(1, 'Категория не выбрана'),

    dateStart: calendarDateSchema,
    timeStart: z.string(),
    // .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Формат времени: ЧЧ:ММ'),

    dateEnd: calendarDateSchema,

    timeEnd: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Формат времени: ЧЧ:ММ'),

    maxCapacity: z.number(),
    minCapacity: z.number(),

    location: locationSchema.refine(
      (data) => {
        console.log(typeof data)
        return data != null
      },
      {
        message: 'Укажите место проведения',
        path: ['location'],
      },
    ),

    coverFilename: z.string().optional(), // e.g. "event.jpg"
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',

    dateStart: '',
    timeStart: '',

    dateEnd: '',
    timeEnd: '',

    location: undefined,
    category: '',

    maxCapacity: 0,
    minCapacity: 0,
  },
})

const items = [
  {
    value: 'A',
    name: 'a',
  },

  { value: 'B', name: 'b' },
  { value: 'C', name: 'c' },
]

const eventCover = useTemplateRef<HTMLInputElement>('event-cover')
const coverSrc = ref<string | undefined>(undefined)
const coverFile = ref<File | null>(null)

const minDateEnd = computed(() => {
  const startDate = form.values.dateStart
  if (startDate?.year && startDate?.month && startDate?.day) {
    return new CalendarDate(startDate.year, startDate.month, startDate.day)
  }
  return today(getLocalTimeZone())
})

const { isPreview = false } = defineProps<{
  isPreview?: boolean
}>()

// {
//   lat: 55.750690087043814,
//   lng: 31.6029396057129,
//   address:
//     'Д. Ф. Устинову, 19, улица Знаменка, 35, район Арба…ва, Центральный федеральный округ, 119019, Россия',
// }

const defaultPlaceholder = today(getLocalTimeZone())

const dropLocation = () => {
  form.values.location = undefined
  // eventLocation.value = null
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

const createEvent = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
  console.log(values.dateStart.toDate(getLocalTimeZone()))
})

onUnmounted(() => {
  if (coverSrc.value) {
    URL.revokeObjectURL(coverSrc.value)
    coverSrc.value = undefined
  }
})
</script>

<template>
  <Card class="w-3xl">
    <form ref="auth-form" class="w-full flex flex-col gap-4" @submit.prevent="createEvent">
      <CardHeader>
        <CardTitle class="text-center"> Создать событие </CardTitle>
      </CardHeader>

      <CardContent>
        <div class="mb-3">
          <CardTitle>Основаня информация</CardTitle>
          <Separator class="my-3" />

          <div>
            <FormField v-slot="{ componentField }" name="title">
              <FormItem class="w-full pb-3">
                <FormLabel>Название события*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder=""
                    v-bind="componentField"
                    class="border-(--color-border)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField, value, handleChange }" name="category">
              <FormItem class="w-full pb-3">
                <FormLabel>Категория*</FormLabel>
                <FormControl>
                  <ItemSelect
                    class="w-full"
                    label="Категория"
                    placeholder="Выбрите категорию"
                    v-bind="componentField"
                    :items="items"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="description">
              <FormItem class="w-full pb-3">
                <FormLabel>Описание события*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Расскажите участникам, что их ждет на мероприятии"
                    v-bind="componentField"
                    class="border-(--color-border)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="mb-3">
          <CardTitle>Дата и время</CardTitle>
          <Separator class="my-3" />

          <div>
            <div class="flex justify-between items-center">
              <FormField v-slot="{ componentField, value, handleChange }" name="dateStart">
                <FormItem class="pb-3">
                  <FormLabel>Дата начала</FormLabel>
                  <FormControl>
                    <Popover v-slot="{ close }">
                      <PopoverTrigger as-child>
                        <Button
                          variant="secondary"
                          :class="
                            cn(
                              'w-[160px] justify-between text-left font-normal flex-row-reverse',
                              !value && 'text-muted-foreground',
                            )
                          "
                        >
                          <CalendarIcon class="h-4 w-4" />
                          {{ value ? format(toDate(value), 'dd.MM.yyyy') : 'Pick a date' }}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent class="w-auto p-0">
                        <Calendar
                          :model-value="value"
                          :initial-focus="true"
                          :default-placeholder="defaultPlaceholder"
                          :min-value="today(getLocalTimeZone())"
                          layout="month-and-year"
                          @update:model-value="
                            (d) => {
                              ;(handleChange(d), close())
                            }
                          "
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="timeStart">
                <FormItem class="pb-3">
                  <FormLabel>Время начала</FormLabel>
                  <FormControl>
                    <TimePIcker v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="flex justify-between items-center">
              <FormField v-slot="{ value, handleChange }" name="dateEnd">
                <FormItem class="pb-3">
                  <FormLabel>Дата конца</FormLabel>
                  <FormControl>
                    <Popover v-slot="{ close }">
                      <PopoverTrigger as-child>
                        <Button
                          variant="secondary"
                          :class="
                            cn(
                              'w-[160px] justify-between text-left font-normal flex-row-reverse',
                              !value && 'text-muted-foreground',
                            )
                          "
                        >
                          <CalendarIcon class="h-4 w-4" />
                          {{ value ? format(toDate(value), 'dd.MM.yyyy') : 'Pick a date' }}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent class="w-auto p-0">
                        <Calendar
                          :model-value="value"
                          :initial-focus="true"
                          :default-placeholder="defaultPlaceholder"
                          :min-value="minDateEnd"
                          layout="month-and-year"
                          @update:model-value="
                            (d) => {
                              ;(handleChange(d), close())
                            }
                          "
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="timeEnd">
                <FormItem class="pb-3">
                  <FormLabel>Время конца</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder=""
                      v-bind="componentField"
                      class="border-(--color-border)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <CardTitle>Участники</CardTitle>
          <Separator class="my-3" />

          <div>
            <FormField v-slot="{ componentField }" name="maxCapacity">
              <FormItem class="w-full pb-3">
                <FormLabel>
                  Максимальное количество участников (0 - неограниченное количество )
                </FormLabel>
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
            <FormField v-slot="{ componentField }" name="minCapacity">
              <FormItem class="w-full pb-3">
                <FormLabel>Минимальное количество участников</FormLabel>
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
          </div>
        </div>

        <div class="mb-3">
          <CardTitle>Место проведения</CardTitle>
          <Separator class="my-3" />

          <div>
            <FormField v-slot="{ componentField, value, handleChange }" name="location">
              <FormItem class="w-full pb-3">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <AddressSearchBox
                    :disabled="!isPreview"
                    :model-value="value"
                    @update:model-value="handleChange"
                  />
                  <FormMessage />
                  <ClientOnly>
                    <LocationPicker
                      class="w-full h-auto"
                      :model-value="value"
                      @update:model-value="handleChange"
                    />
                  </ClientOnly>
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="mb-3">
          <CardTitle>Дополнительные настройки</CardTitle>
          <Separator class="my-3" />

          <FormField v-slot="{ componentField }" name="cover">
            <FormItem class="w-full pb-3">
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <div class="p-2 border-1 rounded-md">
                  <!-- <Label for="cover">Picture</Label> -->
                  <img :src="coverSrc" alt="Нажмите чтобы загрузить..." @click="selectCover" />
                  <input
                    id="cover"
                    ref="event-cover"
                    type="file"
                    hidden="true"
                    @change="coverChange"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
      </CardContent>
      <CardFooter class="">
        <Button aria-label="Submit" class="cursor-pointer w-full" as-child>
          <button type="submit">Сoздать</button>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>

<style lang="css" scoped></style>
