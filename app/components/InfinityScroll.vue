<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  isLoading: boolean
  total: number | undefined
  limit: number
  offset: number
}>()
const emit = defineEmits<{
  (e: 'loadMore', limit: number): void
}>()

const sentinel = useTemplateRef<HTMLDivElement>('sentinel')

const hasMore = ref(true)

useIntersectionObserver(
  sentinel,
  ([entry]) => {
    console.log(props.limit)
    if (entry?.isIntersecting && !props.isLoading) {
      if (props?.total && props.total > props.offset + props.limit) {
        if (!hasMore.value) hasMore.value = true
        emit('loadMore', props.limit)
      } else {
        if (hasMore.value) hasMore.value = false
      }
    }
  },
  { threshold: 0.1 }
)
</script>

<template>
  <div class="list-container">
    <slot></slot>

    <div
      ref="sentinel"
      class="sentinel"
      :class="isLoading ? 'h-6' : 'h-px'"
    >
      <Transition name="fade">
        <p
          v-if="isLoading"
          class="text-center text-gray-500 py-2 text-sm"
        >
          Загрузка...
        </p>
        <!-- <p
          v-else-if="!hasMore"
          class="text-center text-gray-400 mt-6"
        >
          Больше нет данных
        </p> -->
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
