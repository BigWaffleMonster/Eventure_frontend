import { useGlobalState } from '@/store/globalState'

const { getAxios } = useGlobalState()
const $http = getAxios()

export async function Login(email: string, password: string) {
  try {
    const response = await $http?.post('/login', {
      email,
      password,
    })

    const data = response?.data
    const { tokens } = data || {}
    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new Error('No tokens provided by backend')
    }

    localStorage.setItem('token', tokens.accessToken)
    localStorage.setItem('refresh', tokens.refreshToken)

    return data
  } catch (err) {
    console.log(err)
  }
}
