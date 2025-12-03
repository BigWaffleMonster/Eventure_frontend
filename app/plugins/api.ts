// plugins/axiosHttpOnly.js (For Option 2 - Pure Cookie Strategy)
import axios from 'axios'
import { defineNuxtPlugin, navigateTo } from '#app'

const RetrySymbol = Symbol('retry')

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiUrl

  const axios_instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    withCredentials: true,
  })

  axios_instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && originalRequest && !originalRequest[RetrySymbol]) {
        originalRequest[RetrySymbol] = true

        try {
          await axios_instance.post('/auth/refresh')
          return axios_instance(originalRequest)
        } catch (e) {
          console.error('Token refresh failed:', e)
          await navigateTo('/auth/login')
          throw new Error('User not authorized')
        }
      }

      return Promise.reject(error)
    }
  )

  return {
    provide: {
      axios: axios_instance,
    },
  }
})
