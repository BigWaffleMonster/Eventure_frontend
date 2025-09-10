import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from '@/Modules/Auth'
import { useApiStore } from '@/api/apiStore'

export const useGlobalState = defineStore('global', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const apiStore = useApiStore()
  const { getAxios } = apiStore

  return { user, getAxios }
})
