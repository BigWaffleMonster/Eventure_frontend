export async function Login(email: string, password: string) {
  const { $axios } = useNuxtApp()

  const response = await $axios.post('/login', { email, password })

  const data = response?.data
  const { accessToken, refreshToken } = data || {}
  if (!accessToken || !refreshToken) {
    throw new Error('No tokens provided by backend')
  }

  const { accessTokenCookie, refreshTokenCookie } = useAuthCookies()

  accessTokenCookie.value = accessToken
  refreshTokenCookie.value = refreshToken

  return data
}
