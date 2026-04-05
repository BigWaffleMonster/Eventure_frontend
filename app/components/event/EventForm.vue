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
import { Textarea } from '@/ui/shadcn/components/ui/textarea'
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
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { cn } from '@/ui/shadcn/lib/utils'
import { CalendarIcon, X } from 'lucide-vue-next'
import ItemSelect from '~/ui/ItemSelect.vue'
import { UseCreateEvent } from './api/eventAPI'
import TimePicker from '~/ui/TimePicker.vue'

const { mutate: createEventMutate } = UseCreateEvent()

// TODO error not throwing and not showing
// TODO work with timepicker and validation
// TODO add min and max chars value
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
    description: z.string().min(1),
    category: z.string().min(1, 'Категория не выбрана'),

    startDate: calendarDateSchema,
    timeStart: z.string().refine((data) => {
      const [h, m] = data.split(':')
      if (!h || !m) {
        return false
      } else return true
    }),

    endDate: calendarDateSchema,
    timeEnd: z.string().refine((data) => {
      const [h, m] = data.split(':')
      if (!h || !m) {
        return false
      } else return true
    }),

    maxCapacity: z.number(),

    location: locationSchema.refine(
      (data) => {
        return data != null
      },
      {
        message: 'Укажите место проведения',
        path: ['location'],
      },
    ),

    coverFilename: z.string().optional(),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    maxCapacity: 0,
  },
})

const items = [
  {
    value: '50691118-8eb2-4bea-a625-5bc6b867fea7',
    name: 'test',
  },

  { value: 'B', name: 'b' },
  { value: 'C', name: 'c' },
]

const eventCover = useTemplateRef<HTMLInputElement>('event-cover')
const coverSrc = ref<string | undefined>(undefined)
const coverFile = ref<File | null>(null)

let intervalId: ReturnType<typeof setInterval> | null = null
const currentTime = ref<string>('')

const updateTime = () => {
  const now = new Date()
  currentTime.value =
    String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
}

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 60000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
})

const minDateEnd = computed(() => {
  const startDate = form.values.startDate
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

watch(coverFile, (newFile) => {
  if (coverSrc.value) {
    URL.revokeObjectURL(coverSrc.value)
    coverSrc.value = undefined
  }
  if (newFile) {
    coverSrc.value = URL.createObjectURL(newFile)
  }

  form.validate()
})

const validateFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    return false
  }
  if (file.size > maxSize) {
    return false
  }
  return true
}

async function selectCover() {
  eventCover.value?.click()
}

function coverChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    if (!validateFile(file)) {
      input.value = ''
      return
    }

    if (coverSrc.value) {
      URL.revokeObjectURL(coverSrc.value)
    }

    coverFile.value = file
    coverSrc.value = URL.createObjectURL(file)

    form.setFieldValue('coverFilename', file.name)
  }
}

const clearCover = () => {
  if (coverSrc.value) {
    URL.revokeObjectURL(coverSrc.value)
    coverSrc.value = undefined
  }
  coverFile.value = null
  form.setFieldValue('coverFilename', undefined)

  const input = document.getElementById('cover') as HTMLInputElement
  if (input) input.value = ''
}

const isSameDate = () => {
  if (!form.values.startDate || !form.values.endDate) {
    return true
  }

  const start = form.values.startDate as CalendarDate
  const end = form.values.endDate as CalendarDate
  return start.compare(end) === 0
}

const isTodayDate = () => {
  if (!form.values.startDate) {
    return false
  }

  const start = form.values.startDate as CalendarDate
  const localToday = today(getLocalTimeZone())

  return start.compare(localToday) === 0
}

const createEvent = form.handleSubmit(async (values) => {
  let sDate: Date | undefined
  let eDate: Date | undefined

  if (values.timeStart && values.startDate) {
    const [sH, sM] = values.timeStart.split(':').map(Number)
    sDate = values.startDate.toDate(getLocalTimeZone())
    if (sH && sM) sDate.setHours(sH, sM, 0, 0)
  }

  if (values.timeEnd && values.endDate) {
    const [eH, eM] = values.timeEnd.split(':').map(Number)
    eDate = values.endDate.toDate(getLocalTimeZone())
    if (eH && eM) eDate.setHours(eH, eM, 0, 0)
  }

  const { timeEnd, timeStart, startDate, endDate, coverFilename, ...eventData } = values

  const formData = new FormData()

  const appendNested = (data: object, prefix = '') => {
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) return

      const formKey = prefix ? `${prefix}[${key}]` : key

      if (typeof value === 'object' && !(value instanceof Date) && !(value instanceof File)) {
        appendNested(value, formKey)
      } else if (value instanceof Date) {
        formData.append(formKey, value.toISOString())
      } else {
        formData.append(formKey, String(value))
      }
    })
  }

  appendNested(eventData)

  if (sDate) formData.append('startDate', sDate.toISOString())
  if (eDate) formData.append('endDate', eDate.toISOString())

  if (coverFile.value) {
    formData.append('cover', coverFile.value, coverFile.value.name)
  }

  createEventMutate(formData, {
    onSuccess: (data) => {
      console.log('✅ Событие создано:', data)
      // navigateTo('/')
    },
    onError: (error) => {
      console.error('❌ Ошибка:', error)
      alert(error.message)
    },
  })
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
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="category">
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
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="description">
              <FormItem class="w-full pb-3">
                <FormLabel>Описание события*</FormLabel>
                <FormControl>
                  <!-- TODO set custom text area with allowed symbols and displayed max chars length -->
                  <Textarea
                    v-bind="componentField"
                    maxlength="500"
                    class="border-(--color-border) min-h-[120px] resize-y"
                    placeholder="Расскажите участникам, что их ждет на мероприятии"
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="mb-3">
          <CardTitle>Дата и время</CardTitle>
          <Separator class="my-3" />

          <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-4">
              <FormField v-slot="{ value, handleChange }" name="startDate">
                <FormItem class="pb-3">
                  <FormLabel>Дата начала*</FormLabel>
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
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="timeStart">
                <FormItem class="pb-3">
                  <FormLabel>Время начала*</FormLabel>
                  <FormControl>
                    <TimePicker
                      v-bind="componentField"
                      :init-value="isTodayDate() ? currentTime : ''"
                    />
                  </FormControl>
                </FormItem>
              </FormField>
            </div>
            <div class="flex justify-between items-center gap-4">
              <FormField v-slot="{ value, handleChange }" name="endDate">
                <FormItem class="pb-3">
                  <FormLabel>Дата конца*</FormLabel>
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
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="timeEnd">
                <FormItem class="pb-3">
                  <FormLabel>Время конца*</FormLabel>
                  <FormControl>
                    <TimePicker
                      v-bind="componentField"
                      :init-value="isSameDate() ? form.values.timeStart : ''"
                    />
                  </FormControl>
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
                  Максимальное количество участников (0 - неограниченное количество)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    v-bind="componentField"
                    class="border-(--color-border)"
                  />
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>

        <div class="mb-3">
          <CardTitle>Место проведения</CardTitle>
          <Separator class="my-3" />

          <div>
            <FormField v-slot="{ value, handleChange }" name="location">
              <FormItem class="w-full pb-3">
                <FormLabel>Адрес*</FormLabel>
                <FormControl>
                  <AddressSearchBox
                    :disabled="!isPreview"
                    :model-value="value"
                    @update:model-value="handleChange"
                  />
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

          <FormField name="cover">
            <FormItem class="w-full pb-3">
              <FormLabel>Обложка</FormLabel>
              <FormMessage />
              <FormControl>
                <div class="p-2 border-1 rounded-md relative w-full overflow-hidden bg-secondary">
                  <!-- <Label for="cover">Picture</Label> -->
                  <Button
                    v-if="coverSrc"
                    type="button"
                    variant="destructive"
                    size="icon"
                    class="absolute top-3 right-3 h-6 w-6 z-10"
                    @click.stop="clearCover"
                  >
                    <X class="h-3 w-3" />
                  </Button>

                  <img
                    v-if="coverSrc"
                    :src="coverSrc"
                    alt="Обложка"
                    class="w-full h-full object-cover rounded-md cursor-pointer"
                    @click="selectCover"
                  />

                  <div
                    v-else
                    class="w-full h-full flex flex-col items-center justify-center rounded-md cursor-pointer text-muted-foreground"
                    @click="selectCover"
                  >
                    <span class="text-sm">Нажмите чтобы загрузить...</span>
                  </div>
                  <input
                    id="cover"
                    ref="event-cover"
                    accept="image/png, image/jpeg, image/webp"
                    type="file"
                    hidden="true"
                    @change="coverChange"
                  />
                </div>
              </FormControl>
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
