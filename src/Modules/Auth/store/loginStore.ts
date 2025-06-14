import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { authType } from '../types/authType'

export const useLoginStore = defineStore('loginStore', () => {
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

  return { user, setUser }
})
