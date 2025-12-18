<!-- src/components/LocationPicker.vue -->
<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import type { LocationData } from './types'

interface NominatimSearchResult {
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

const {
  editable = true,
  initialLat,
  initialLng,
} = defineProps<{
  initialLat?: number //define here with geo api. Need to get user location
  initialLng?: number //define here with geo api. Need to get user location
  editable?: boolean
}>()

const modelValue = defineModel<LocationData | null>({
  default: null,
})

const mapContainer = ref<HTMLElement | null>(null)
const map = shallowRef<any>(null)
const marker = shallowRef<any>(null)
const internalLocation = ref<LocationData | null>(null)

const searchQuery = ref<string>('')
const searchResults = ref<NominatimSearchResult[]>([])

let L: typeof import('leaflet') | null = null

async function updateLocation(lat: number, lng: number, address?: string, shouldPan = true) {
  internalLocation.value = { lat, lng, address }

  if (marker.value) {
    marker.value.setLatLng([lat, lng])
  } else if (L && map.value) {
    marker.value = L.marker([lat, lng]).addTo(map.value)
  }

  if (shouldPan && map.value) {
    map.value.flyTo([lat, lng], map.value.getZoom(), {
      animate: true,
      duration: 1.0,
      easeLinearity: 0.25,
      noMoveStart: true,
    })
  }

  if (!address) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`,
        { signal: controller.signal }
      )
      clearTimeout(timeoutId)

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      internalLocation.value.address = address
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.warn('Reverse geocoding failed:', err)
      }
      address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    }
  }

  modelValue.value = { lat, lng, address }
}

async function searchAddress() {
  if (!searchQuery.value.trim()) return

  try {
    const url = new URL('https://nominatim.openstreetmap.org/search')
    url.searchParams.append('q', searchQuery.value)
    url.searchParams.append('format', 'json')
    url.searchParams.append('limit', '7')
    url.searchParams.append('polygon_geojson', '0')

    const response = await fetch(url.toString(), {
      headers: {
        // 'User-Agent': 'MapSearchApp/0.1 (mailto:dev@example.com)', // Обязательно для Nominatim!
      },
    })

    const data = await response.json()
    searchResults.value = data

    // Очистим предыдущие маркеры (если были)
  } catch (error) {
    console.error('Ошибка поиска:', error)
  }
}

async function selectResult(result: NominatimSearchResult) {
  const lat = parseFloat(result.lat)
  const lon = parseFloat(result.lon)

  await updateLocation(lat, lon)
}

onMounted(async () => {
  L = (await import('leaflet')).default

  if (!mapContainer.value) return

  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  if (modelValue.value?.lat && modelValue.value?.lng) {
    map.value = L.map(mapContainer.value, {
      attributionControl: false,
      zoomControl: true,
    }).setView([modelValue.value.lat, modelValue.value?.lng], 13)
  } else {
    map.value = L.map(mapContainer.value, {
      attributionControl: false,
      zoomControl: true,
    }).setView([initialLat ?? 55.7512, initialLng ?? 37.6184], 13)
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)

  map.value.on('click', (e: any) => {
    const { lat, lng } = e.latlng
    updateLocation(lat, lng)
  })

  if (modelValue.value) {
    let lat: number | undefined, lng: number | undefined, addr: string | undefined

    lat = modelValue.value.lat
    lng = modelValue.value.lng
    addr = modelValue.value.address

    if (lat !== undefined && lng !== undefined) {
      updateLocation(lat, lng, addr, false)
    }
  }
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
})

// 🔁 Отслеживаем внешние изменения (например, сброс формы)
watch(modelValue, (newVal, oldVal) => {
  if (newVal === null) {
    marker.value.remove()
    marker.value = null
    internalLocation.value = null
  }
})
</script>

<template>
  <div class="space-y-2">
    <!-- Выбранное место -->
    <div v-if="internalLocation" class="p-2 bg-muted rounded text-sm">
      <span class="font-medium">📍 Выбрано:</span>
      <span class="ml-1">
        {{
          internalLocation.address ||
          `${internalLocation.lat.toFixed(5)}, ${internalLocation.lng.toFixed(5)}`
        }}
      </span>
    </div>

    <div class="search-box">
      <input
        v-model="searchQuery"
        @keyup.enter="searchAddress"
        placeholder="Введите адрес..."
        type="text"
      />
      <button @click="searchAddress">Найти</button>
    </div>

    <ul v-if="searchResults.length" class="results">
      <li v-for="result in searchResults" :key="result.place_id" @click="selectResult(result)">
        {{ result.display_name }}
      </li>
    </ul>

    <!-- Карта -->
    <div ref="mapContainer" class="w-full rounded border border-input" style="height: 400px" />

    <p v-if="editable" class="text-xs text-muted-foreground mt-1">
      Кликните на карту, чтобы выбрать местоположение
    </p>
  </div>
</template>

<style>
/* Обязательно: без scoped — иначе стили Leaflet не применятся */
@import 'leaflet/dist/leaflet.css';

:deep(.leaflet-container) {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
