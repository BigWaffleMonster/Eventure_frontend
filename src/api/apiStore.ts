import { type AxiosInstance } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApiStore = defineStore('api', () => {
  const _$http = ref<AxiosInstance | null>(null)

  const setAxios = (inst: AxiosInstance) => {
    _$http.value = inst
  }

  function getAxios() {
    return _$http.value
  }

  return { setAxios, getAxios }
})
