export type Event = {
  id: string
  title: string
  author: string
  category: string

  quantity: {
    participants: number
    maxCapacity: number
    minCapacity?: number
  }

  description: string
  location?: string

  startDate: string
  timeStart?: string

  endDate: string
  timeEnd?: string
}

export type Filter = {
  category: string // new, popular, etc
  limit: number
  offset: number
  allowedForMe: boolean
}
