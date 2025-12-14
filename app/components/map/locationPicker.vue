<!-- src/components/LocationPicker.vue -->
<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import type { LocationData } from './types'

// 🔹 Типизация
// 🔹 Props
const props = defineProps<{
  initialLat?: number
  initialLng?: number
}>()

const modelValue = defineModel<LocationData | null>({
  default: null,
})

// 🔹 Состояние d
const mapContainer = ref<HTMLElement | null>(null)
const map = shallowRef<any>(null) // L.Map
const marker = shallowRef<any>(null) // L.Marker
const internalLocation = ref<LocationData | null>(null)

let L: typeof import('leaflet') | null = null

// Обновление локации (с плавным flyTo)
async function updateLocation(lat: number, lng: number, address?: string, shouldPan = true) {
  internalLocation.value = { lat, lng, address }

  // Обновляем/создаём маркер
  if (marker.value) {
    marker.value.setLatLng([lat, lng])
  } else if (L && map.value) {
    marker.value = L.marker([lat, lng]).addTo(map.value)
  }

  // Плавное перемещение карты
  if (shouldPan && map.value) {
    map.value.flyTo([lat, lng], map.value.getZoom(), {
      animate: true,
      duration: 1.0, // 1 сек — плавно
      easeLinearity: 0.25, // естественное ускорение/торможение
      noMoveStart: true, // предотвращает зацикливание
    })
  }

  // Reverse geocoding — только если адрес не задан
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

// Инициализация карты
onMounted(async () => {
  L = (await import('leaflet')).default

  if (!mapContainer.value) return

  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  // Создаём карту
  map.value = L.map(mapContainer.value, {
    attributionControl: false,
    zoomControl: true,
  }).setView([props.initialLat ?? 55.7512, props.initialLng ?? 37.6184], 13)

  // Тайлы OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)

  // Клик по карте
  map.value.on('click', (e: any) => {
    const { lat, lng } = e.latlng
    updateLocation(lat, lng)
  })

  // Инициализация из modelValue
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
watch(modelValue, (newVal) => {
  if (!newVal || !map.value) return

  let lat: number | undefined, lng: number | undefined, addr: string | undefined

  lat = newVal.lat
  lng = newVal.lng
  addr = newVal.address

  if (lat !== undefined && lng !== undefined) {
    updateLocation(lat, lng, addr, false)
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

    <!-- Карта -->
    <div ref="mapContainer" class="w-full rounded border border-input" style="height: 400px" />

    <p class="text-xs text-muted-foreground mt-1">
      Кликните на карту, чтобы выбрать местоположение
    </p>
  </div>
</template>

<style>
/* Обязательно: без scoped — иначе стили Leaflet не применятся */
@import 'leaflet/dist/leaflet.css';

/* Убедимся, что карта заполняет контейнер */
:deep(.leaflet-container) {
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
