// TODO maybe add tanstack query but mb it overkill here
export async function Register(email: string, password: string) {
  const { $axios } = useNuxtApp()
  const response = await $axios.post('/auth/sign-up', { email, password })

  const { error } = response?.data || null
  if (error) {
    throw new Error('Error on registering')
  }
  navigateTo('/auth/login')
}
