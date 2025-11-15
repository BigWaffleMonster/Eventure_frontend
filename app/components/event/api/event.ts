export async function GetEventList(filters: null) {
  try {
    // !TODO filters
    console.log(filters)
    const response = await useApi({ method: 'GET', url: '/event' })

    const data = response?.data

    return data
  } catch (err) {
    console.log(err)
  }
}

export async function GetEvent(id: string) {
  try {
    const response = await useApi({
      method: 'GET',
      url: '/event',
      params: {
        id,
      },
    })

    const data = response?.data

    return data
  } catch (err) {
    console.log(err)
  }
}
