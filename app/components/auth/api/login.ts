import { useMutation } from '@tanstack/vue-query'

export function UseLogin() {
  const { $axios } = useNuxtApp()

  const login = async ({ email, password }: { email: string; password: string }) => {
    console.log('TRYY!!!!!!!!')
    const respo = await $axios.post('/auth/sign-in', { login: email, password })
    return respo.data
  }

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login
  })
}
