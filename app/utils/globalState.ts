import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from '@/components/auth/store/authStore'

export const useGlobalState = defineStore('global', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  return { user }
})
