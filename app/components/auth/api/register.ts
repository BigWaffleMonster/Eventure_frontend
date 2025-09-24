import { useGlobalState } from '@/utils/globalState'
// const router = useRouter()

export async function Register(email: string, password: string) {
  const { getAxios } = useGlobalState()
  const $http = getAxios()

  try {
    const response = await $http?.post('/register', {
      email,
      password
    })

    const { error } = response?.data || null
    if (error) {
      throw new Error('Error on registering')
    }
    navigateTo('/auth/login')
    // router.push('/auth/login')
  } catch (err) {
    //need to throw error
    console.log(err, 'AHAHAHAHAHA')
  }
}
