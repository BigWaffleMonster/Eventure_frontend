import type { AxiosInstance } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { axios_instance } from './axios'

export const useApiStore = defineStore('api', () => {
  // const _$http = ref<AxiosInstance | null>(null)

  const _$http = ref<AxiosInstance>(axios_instance)
  // const setAxios = (inst: AxiosInstance) => {
  //   _$http.value = inst
  // }

  function getAxios() {
    return _$http.value
  }

  return {
    // setAxios,
    getAxios
  }
})
