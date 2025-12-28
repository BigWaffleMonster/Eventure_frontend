<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import type { LocationData, NominatimSearchResult } from './types'

const searchQuery = ref<string>('')
const searchResults = ref<NominatimSearchResult[]>([])
const isLoading = ref(false)
const abortController = ref<AbortController | null>(null)
const isFocused = ref(false) // Флаг фокуса на поле ввода
const hasSelected = ref(false) // Флаг выбора адреса

const modelValue = defineModel<LocationData | null>({
  default: null,
})

// Дебаунс функция
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = window.setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }
}

// Автоматический поиск с дебаунсом (300ms задержка)
const debouncedSearch = debounce(async () => {
  if (searchQuery.value.trim().length >= 3 && isFocused.value) {
    await searchAddress()
  } else if (searchQuery.value.trim().length < 3) {
    searchResults.value = []
  }
}, 300)

async function searchAddress() {
  if (!searchQuery.value.trim() || !isFocused.value) return

  // Отменяем предыдущий запрос если есть
  abortController.value?.abort()
  abortController.value = new AbortController()

  isLoading.value = true

  try {
    const url = new URL('https://nominatim.openstreetmap.org/search')
    url.searchParams.append('q', searchQuery.value.trim())
    url.searchParams.append('format', 'json')
    url.searchParams.append('limit', '5')
    url.searchParams.append('polygon_geojson', '0')
    url.searchParams.append('accept-language', 'ru')

    const response = await fetch(url.toString(), {
      signal: abortController.value.signal,
      headers: {
        'User-Agent': 'YourApp/1.0 (your.email@example.com)', // Обязательно для Nominatim
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    searchResults.value = Array.isArray(data) ? data : []
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Ошибка поиска:', error)
      searchResults.value = []
    }
  } finally {
    isLoading.value = false
  }
}

// При внешнем изменении modelValue
watch(modelValue, (val) => {
  if (val) {
    hasSelected.value = true
    searchQuery.value = val.address || `${val.lat.toFixed(5)}, ${val.lng.toFixed(5)}`
  } else {
    searchQuery.value = ''
    hasSelected.value = false
    searchResults.value = []
  }
})

function handleInput(e: Event) {
  const event = e.target as HTMLInputElement
  searchQuery.value = event.value
  hasSelected.value = false // Сбрасываем флаг выбора при ручном вводе

  // Запускаем поиск только если есть фокус и достаточно символов
  if (isFocused.value && searchQuery.value.trim().length >= 3) {
    debouncedSearch()
  } else if (searchQuery.value.trim().length < 3) {
    searchResults.value = []
  }
}

function handleFocus() {
  isFocused.value = true
  // Если есть сохраненные результаты и запрос достаточной длины - показываем их
  if (searchResults.value.length > 0 && searchQuery.value.trim().length >= 3) {
    return
  }
  // Иначе запускаем поиск заново
  if (searchQuery.value.trim().length >= 3 && !hasSelected.value) {
    searchAddress()
  }
}

function handleBlur() {
  // Небольшая задержка для возможности клика по результатам
  setTimeout(() => {
    isFocused.value = false
  }, 200)
}

function selectResult(result: NominatimSearchResult) {
  const lat = parseFloat(result.lat)
  const lng = parseFloat(result.lon)

  modelValue.value = {
    address: result.display_name,
    lat,
    lng,
    place_id: result.place_id,
  }

  hasSelected.value = true
  // Не очищаем searchResults.value - просто скрываем список при потере фокуса
}

function clearSearch() {
  searchQuery.value = ''
  modelValue.value = null
  searchResults.value = []
  hasSelected.value = false
}
</script>

<template>
  <div class="address-search">
    <div class="search-box relative">
      <input
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :value="searchQuery"
        placeholder="Введите адрес..."
        type="text"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
      />
      <button
        @click="clearSearch"
        v-if="searchQuery"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label="Очистить поиск"
      >
        ✕
      </button>
    </div>

    <!-- Раскрывающийся список с результатами или лоадером -->
    <div v-if="isFocused && searchQuery.trim().length >= 3" class="results-container mt-1">
      <ul class="results max-h-60 overflow-y-auto border rounded-lg shadow-lg bg-white z-10">
        <!-- Лоадер во время загрузки -->
        <li v-if="isLoading" class="p-3 text-center text-gray-500">
          <div class="flex justify-center items-center gap-2">
            <div
              class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
            ></div>
            <span>Ищем адрес...</span>
          </div>
        </li>

        <!-- Сообщение когда ничего не найдено -->
        <li
          v-else-if="searchResults.length === 0 && !isLoading"
          class="p-3 text-center text-gray-500"
        >
          <span>Ничего не найдено</span>
        </li>

        <!-- Результаты поиска -->
        <li
          v-for="result in searchResults"
          :key="result.place_id"
          @click="selectResult(result)"
          class="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition"
        >
          {{ result.display_name }}
        </li>
      </ul>
    </div>

    <!-- Подсказка для пользователя -->
    <p
      v-if="searchQuery.trim().length > 0 && searchQuery.trim().length < 3 && isFocused"
      class="text-sm text-gray-500 mt-1"
    >
      Введите минимум 3 символа для поиска
    </p>
  </div>
</template>

<style scoped>
.address-search {
  position: relative;
  width: 100%;
}

.results {
  position: absolute;
  width: 100%;
  max-width: 100%;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  z-index: 1;
  display: block;
}

/* Анимация спиннера */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Стили для контейнера результатов */
.results-container {
  position: relative;
}

/* Позиционирование кнопки очистки */
.search-box {
  position: relative;
}
</style>
