<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, watch } from 'vue'
import type { LocationData } from './types'
import type { LatLngExpression } from 'leaflet'

const {
  isPreview = true,
  initialLat,
  initialLng,
} = defineProps<{
  initialLat?: number
  initialLng?: number
  isPreview?: boolean
}>()

const modelValue = defineModel<LocationData | null>({
  default: null,
})

const mapContainer = ref<HTMLElement | null>(null)
const map = shallowRef<any>(null)
const marker = shallowRef<any>(null)
const isInternalUpdate = ref(false) // Флаг для отслеживания внутренних обновлений
const abortController = ref<AbortController | null>(null) // Для отмены запросов

let L: typeof import('leaflet') | null = null

async function updateLocation(
  lat: number,
  lng: number,
  address?: string,
  place_id: number = 0,
  shouldPan = true
) {
  // Отменяем предыдущий запрос
  if (abortController.value) {
    abortController.value.abort()
  }

  const controller = new AbortController()
  abortController.value = controller

  isInternalUpdate.value = true // Помечаем как внутреннее обновление

  try {
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ru`,
          { signal: controller.signal }
        )

        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
        place_id = data.place_id
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.warn('Reverse geocoding failed:', err)
        }
        address = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
      }
    }

    modelValue.value = { lat, lng, address, place_id }
  } finally {
    isInternalUpdate.value = false
    abortController.value = null
  }
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

  const defaultCenter = [initialLat ?? 55.7512, initialLng ?? 37.6184]
  const initialView =
    modelValue.value?.lat && modelValue.value?.lng
      ? [modelValue.value.lat, modelValue.value.lng]
      : defaultCenter

  map.value = L.map(mapContainer.value, {
    attributionControl: false,
    zoomControl: true,
  }).setView(initialView as LatLngExpression, 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)

  // Добавляем дебаунсинг для кликов
  let clickTimeout: number | null = null
  map.value.on('click', (e: any) => {
    if (clickTimeout) clearTimeout(clickTimeout)
    clickTimeout = window.setTimeout(() => {
      const { lat, lng } = e.latlng
      updateLocation(lat, lng)
    }, 300) // 300ms задержка для предотвращения двойных кликов
  })

  if (modelValue.value?.lat && modelValue.value?.lng) {
    updateLocation(
      modelValue.value.lat,
      modelValue.value.lng,
      modelValue.value.address,
      modelValue.value.place_id,
      false
    )
  }
})

onUnmounted(() => {
  if (abortController.value) {
    abortController.value.abort()
  }

  if (map.value) {
    map.value.off('click') // Отписываемся от событий
    map.value.remove()
    map.value = null
  }
})

// Отслеживаем внешние изменения, но игнорируем внутренние
watch(modelValue, (newVal, oldVal) => {
  if (isInternalUpdate.value) return // Игнорируем внутренние обновления

  if (newVal === null) {
    if (marker.value) {
      marker.value.remove()
      marker.value = null
    }
    return
  }

  if (oldVal?.place_id !== newVal?.place_id && newVal?.lat && newVal?.lng) {
    updateLocation(newVal.lat, newVal.lng, newVal.address, newVal.place_id)
  }
})
</script>

<template>
  <div class="space-y-2">
    <!-- Выбранное место -->
    <div v-if="modelValue" class="p-2 bg-muted rounded text-sm">
      <span class="font-medium">📍 Выбрано:</span>
      <span class="ml-1">
        {{ modelValue?.address || `${modelValue.lat.toFixed(5)}, ${modelValue.lng.toFixed(5)}` }}
      </span>
    </div>

    <!-- Карта -->
    <div ref="mapContainer" class="w-full rounded border border-input" style="height: 400px" />

    <p v-if="isPreview" class="text-xs text-muted-foreground mt-1">
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
