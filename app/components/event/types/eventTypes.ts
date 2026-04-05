import type { UUID } from 'crypto'

type LocationType = {
  lat: number
  lng: number
  place_id: number
  address?: string | undefined
}

export type Event = {
  id: UUID

  Owner: Owner
  Category: Category

  title: 'test event form web'
  description: string

  capacity: number
  max_capacity: number | undefined

  location: LocationType

  start_date: Date
  end_date: Date

  date_created: Date
  date_updated: Date
}

export type EventResponse = {
  events: Event[]
  total: number
}

export type CreateEventType = {
  description: string
  title: string
  category: string
  maxCapacity: number
  startDate: Date
  endDate: Date
  location: LocationType
  coverFilename?: string | undefined
}

export type Filter = {
  category: string // new, popular, etc
  limit: number
  offset: number
  allowedForMe: boolean
}

export type Owner = {
  id: UUID
  login: string
  email: string
}

export type Category = {
  id: UUID
  title: string
}
