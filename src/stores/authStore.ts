import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const loginUrl = 'http://127.0.0.1:8080/api/v1/login'
const registerUrl = 'http://127.0.0.1:8080/api/v1/register'
const refreshUrl = 'http://127.0.0.1:8080/api/v1/refresh'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const _refresh = ref(localStorage.getItem('refresh'))

  async function login(email: string, password: string) {
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      const { tokens } = data || {}
      const { accessToken, refreshToken } = tokens || {}
      if (!accessToken || !refreshToken) {
        throw new Error('No tokens provided by backend')
      }
      token.value = accessToken
      _refresh.value = refreshToken
    } catch (err) {
      console.log(err)
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const { error } = await response.json()
      if (error) {
        throw new Error('Error on registering')
      }
      router.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  async function refresh() {
    try {
      const response = await fetch(refreshUrl, {
        method: 'post',
        body: JSON.stringify({ refresh_token: _refresh.value }),
      })
      const data = await response.json()
      const { tokens } = data || {}
      const { accessToken, refreshToken } = tokens || {}
      if (!accessToken || !refreshToken) {
        throw new Error('No tokens provided by backend')
      }
      token.value = accessToken
      _refresh.value = refreshToken
    } catch (err) {
      console.log(err)
    }
  }

  function logout() {
    token.value = null
    _refresh.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    router.push('/login')
  }

  return { token, login, refresh, logout, register }
})
