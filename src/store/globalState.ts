import { defineStore } from 'pinia'
import { useLoginStore } from '@/Modules/Auth'

export const useCounterStore = defineStore('counter', () => {
  const user = useLoginStore()

  return { user }
})
