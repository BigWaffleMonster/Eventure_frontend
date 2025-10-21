export type Event = {
  id: string
  title: string
  author: string
  hashtag: string
  quantity: {
    participants: number
    capacity: number
  }
  description: string
  location?: string
  startDate?: string
  endDate?: string
}

export type Filter = {
  category: string // new, popular, etc
  limit: number
  offset: number
  allowedForMe: boolean
}
