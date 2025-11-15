interface LoginResponse {
  accessToken: string
  refreshToken: string
}

interface LoginData {
  email: string
  password: string
}

export async function Login(email: string, password: string) {
  try {
    const response = await useApi<LoginData, LoginResponse>({
      method: 'POST',
      url: '/login',
      data: { email, password },
    })

    const data = response?.data
    const { accessToken, refreshToken } = data || {}
    if (!accessToken || !refreshToken) {
      throw new Error('No tokens provided by backend')
    }

    sessionStorage.setItem('token', accessToken)
    sessionStorage.setItem('refresh', refreshToken)

    return data
  } catch (err) {
    console.log(err)
  }
}
