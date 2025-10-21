import { useGlobalState } from '@/utils/globalState'

const { getAxios } = useGlobalState()
const $http = getAxios()

export async function GetEventList(filters: null) {
  try {
    // !TODO filters
    console.log(filters)
    const response = await $http?.get('/event')

    const data = response?.data

    return data
  } catch (err) {
    console.log(err)
  }
}

export async function GetEvent(id: string) {
  try {
    const response = await $http?.get('/event', {
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
