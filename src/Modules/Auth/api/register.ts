import router from '@/router'

const registerUrl = 'http://127.0.0.1:8080/api/v1/register'
export async function Register(email: string, password: string) {
  try {
    const response = await fetch(registerUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    const { error } = await response.json()
    if (error) {
      throw new Error('Error on registering')
    }
    router.push('/auth/login')
  } catch (err) {
    console.log(err)
  }
}
