export async function GetEventList(filters: null) {
  try {
    // !TODO filters
    console.log(filters)
    const { $axios } = useNuxtApp()
    const response = await $axios.get('/event')

    const data = response?.data

    return data
  } catch (err) {
    console.log(err)
  }
}

export async function GetEvent(id: string) {
  try {
    const { $axios } = useNuxtApp()
    const response = await $axios.get('/event', { params: { id } })

    const data = response?.data

    return data
  } catch (err) {
    console.log(err)
  }
}
