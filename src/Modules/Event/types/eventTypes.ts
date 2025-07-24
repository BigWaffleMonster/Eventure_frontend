export type Event = {
  title: string
  author: string
  hashtag: string[]
  quantity: {
    participants: number
    capacity: number
  }
  description: string
  location?: string
  startDate?: Date
  endDate?: Date
}
