export interface LocationData {
  lat: number
  lng: number
  place_id: number
  address?: string
}

export interface NominatimSearchResult {
  place_id: number
  licence: string
  osm_type: 'node' | 'way' | 'relation'
  osm_id: number
  boundingbox: [string, string, string, string] // [minLat, maxLat, minLon, maxLon]
  lat: string // Nominatim возвращает координаты как строки!
  lon: string
  display_name: string
  class: string
  type: string
  importance: number

  // опционально — если используете addressdetails=1:
  address?: {
    road?: string
    house_number?: string
    city?: string
    town?: string
    village?: string
    state?: string
    postcode?: string
    country?: string
    country_code?: string
  }
}
