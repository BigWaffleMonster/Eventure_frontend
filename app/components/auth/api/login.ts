import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'

export function Login(email: string, password: string): UseQueryReturnType<any, Error> {
  const { $axios } = useNuxtApp()

  const login = async () => {
    const respo = await $axios.post('/login', { email, password })
    return respo.data
  }

  const response = useQuery({
    queryKey: ['login'],
    queryFn: login,
  })

  return response
}
