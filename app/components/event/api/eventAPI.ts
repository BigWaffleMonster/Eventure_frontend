import { useMutation, useQuery, type UseQueryReturnType } from '@tanstack/vue-query'
import type { EventResponse } from '../types/eventTypes'
import type { ApiError, ApiResponse } from '~/components/types/apiResponse'

export interface EventListParams {
  limit: MaybeRef<number>
  offset: MaybeRef<number>
}

export function GetEventList(
  params: EventListParams
): UseQueryReturnType<ApiResponse<EventResponse>, Error> {
  const { $axios } = useNuxtApp()

  const getEvents = async () => {
    const response = await $axios.get('/event/list', {
      params: {
        limit: unref(params.limit),
        offset: unref(params.offset)
      }
    })
    return response?.data
  }

  return useQuery({
    queryKey: ['event_list', () => unref(params.limit), () => unref(params.offset)],
    queryFn: getEvents,
    staleTime: 1000 * 60 * 5, // данные считаются свежими 5 минут
    retry: 1 // количество повторных попыток при ошибке
  })
}

export async function GetEvent(id: string) {
  try {
    const { $axios } = useNuxtApp()
    const response = await $axios.get('/event', { params: { id } })

    const data = response?.data

    return data
  } catch (err) {
    console.log(err)
  }
}

export function UseCreateEvent() {
  const { $axios } = useNuxtApp()

  const createEvent = async (event: FormData) => {
    const resp = await $axios.post('/event/create', event)
    return resp.data as ApiResponse<Event>
  }

  return useMutation<ApiResponse<Event>, ApiError, FormData>({
    mutationKey: ['create_event'],
    mutationFn: createEvent
  })
}
