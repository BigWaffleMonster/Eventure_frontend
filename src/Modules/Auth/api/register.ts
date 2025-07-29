import router from '@/router'
import { useGlobalState } from '@/store/globalState'

export async function Register(email: string, password: string) {
  const { getAxios } = useGlobalState()
  const $http = getAxios()
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
    //need to throw error
    console.log(err, 'AHAHAHAHAHA')
  }
}
