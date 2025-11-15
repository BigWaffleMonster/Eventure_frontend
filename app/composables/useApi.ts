import type { NuxtApp } from '#app'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'

interface ApiRequestConfig<TData = any> extends Omit<AxiosRequestConfig<TData>, 'method'> {
  method: HttpMethod // Override the 'method' property with our specific type
  url: string // Ensure URL is required
  // You can add other fields here if you want to enforce them as required for your composable
}

interface NuxtAppAxios extends NuxtApp {
  $axios: AxiosInstance
}

export const useApi = async <TData = any, TResponse = any>(
  config: ApiRequestConfig<TData>
): Promise<AxiosResponse<TResponse>> => {
  // Inject the instance provided by your plugin
  const { $axios } = useNuxtApp() as NuxtAppAxios

  if (!$axios) {
    throw new Error(
      'useAxios: $axios instance not found. Ensure the api.client.ts plugin is registered.'
    )
  }

  try {
    const response: AxiosResponse<TResponse> = await $axios(config)
    return response // Return the full response object
  } catch (error: any) {
    console.error('API Error:', error)
    throw error
  }
}
