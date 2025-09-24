import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { authType } from '../types/authType.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<authType>({
    id: null,
    email: null,
    nickName: null,
    tokens: {
      accessToken: null,
      refreshToken: null,
    },
  })
  function setUser(data: authType) {
    user.value = data
  }

  function getUser() {
    return user.value
  }

  return { user, setUser, getUser }
})
