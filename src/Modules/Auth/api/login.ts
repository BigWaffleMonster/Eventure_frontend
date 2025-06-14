const loginUrl = 'http://127.0.0.1:8080/api/v1/login'
export async function Login(email: string, password: string) {
  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
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
