import axios from 'axios'

const RetrySymbol = Symbol('retry')

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiUrl

  const { accessTokenCookie, refreshTokenCookie } = useAuthCookies()

  const axios_instance = axios.create({
    // baseURL,
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    // fetchOptions: {}
  })

  // if (import.meta.client) {
  axios_instance.interceptors.request.use((config) => {
    // const token = sessionStorage.getItem('token')
    if (accessTokenCookie.value) {
      config.headers.Authorization = `Bearer ${accessTokenCookie.value}`
    }

    return config
  })

  axios_instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && originalRequest && !originalRequest[RetrySymbol]) {
        originalRequest[RetrySymbol] = true
        try {
          const response = await axios_instance.post(`/refresh`, {
            refreshToken: refreshTokenCookie.value,
          })

          const newAccessToken = response.data.accessToken
          const newRefreshToken = response.data.refreshToken

          accessTokenCookie.value = newAccessToken
          refreshTokenCookie.value = newRefreshToken

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          return axios_instance.request(originalRequest)
        } catch (e) {
          console.error(e)
          await navigateTo('/auth/login')
          throw new Error('User not authorized')
        }
      }

      return Promise.reject(error)
    }
  )
  // }
  // nuxtApp.provide('axios', axios_instance)
  return {
    provide: {
      axios: axios_instance,
    },
  }
})
