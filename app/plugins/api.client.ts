import axios from 'axios'

const RetrySymbol = Symbol('retry')

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiUrl

  const axios_instance = axios.create({
    baseURL,
    timeout: 10000,
    // fetchOptions: {}
  })

  axios_instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
          const response = await axios_instance.get(`/refresh`)

          const accessToken = response.data.accessToken

          if (import.meta.client) localStorage.setItem('token', accessToken)

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

  nuxtApp.provide('axios', axios_instance)
})
