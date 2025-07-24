import router from '@/router'
import { useGlobalState } from '@/store/globalState'

const { getAxios } = useGlobalState()
const $http = getAxios()

export async function Register(email: string, password: string) {
  try {
    const response = await $http?.post('/register', {
      email,
      password,
    })

    const { error } = response?.data
    if (error) {
      throw new Error('Error on registering')
    }
    router.push('/auth/login')
  } catch (err) {
    console.log(err)
  }
}
