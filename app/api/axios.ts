import axios from 'axios'

const baseURL = 'http://127.0.0.1:8080/api/v1/'
// const baseURL = 'https://jsonplaceholder.typicode.com/'

export const axios_instance = axios.create({
  baseURL,
  timeout: 1000,
})

axios_instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axios_instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401
      && error.config
      && !error.config?._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${baseURL}refresh`, {
          // withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        return axios_instance.request(originalRequest)
      }
      catch (e) {
        console.error(e)
        navigateTo('/auth/login')
        throw new Error('User not authorized')
      }
    }

    return Promise.reject(error)
  },
)
