interface RegisterResponse {
  error: string
}

interface RegisterData {
  email: string
  password: string
}

export async function Register(email: string, password: string) {
  try {
    const response = await useApi<RegisterData, RegisterResponse>({
      method: 'POST',
      url: '/login',
      data: { email, password },
    })

    const { error } = response?.data || null
    if (error) {
      throw new Error('Error on registering')
    }
    navigateTo('/auth/login')
  } catch (err) {
    // need to throw error
    console.log(err, 'AHAHAHAHAHA')
  }
}
