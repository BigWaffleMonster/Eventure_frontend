import { useMutation } from '@tanstack/vue-query'
import type { userResponse } from '../types/authType'

export function UseLogin() {
  const { $axios } = useNuxtApp()

  const login = async ({ email, password }: { email: string; password: string }) => {
    const resp = await $axios.post('/auth/sign-in', { login: email, password })
    return resp.data as userResponse
  }

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login
  })
}
