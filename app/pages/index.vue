<script setup lang="ts">
import EventCard from '~/components/event/EventCard.vue'
import { Button } from '~/ui/shadcn/components/ui/button'

definePageMeta({
  layout: 'main',
})

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget egestas ligula.
      Quisque luctus nisi lectus, vel pellentesque ipsum luctus eget. Donec pharetra dolor vitae
      accumsan maximus. Duis scelerisque risus a magna tristique, vel dictum nisl varius. Ut
      dignissim gravida justo et finibus. Donec vehicula scelerisque nisl, nec hendrerit ipsum
      sagittis vitae. Nullam at ipsum in velit congue aliquam. Vivamus vel viverra massa. Aenean non
      arcu sed augue tincidunt mattis nec vitae orci. Proin dapibus neque sit amet turpis laoreet,
      in sagittis lacus scelerisque.`
const Event = {
  title: 'Test title',
  author: 'John Doe',
  hashtag: '#walk',
  quantity: {
    participants: 3,
    capacity: 10,
  },
  description: text,
  location: 'My home dude',
  startDate:
    new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) ?? '',
  endDate:
    new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) ?? '',
}
</script>

<template>
  <div
    class="flex flex-col justify-start items-center mx-auto max-w-5xl h-[calc(100%-var(--nav-height))] w-full gap-4"
  >
    <h1 class="font-bold text-3xl mt-5 mb-5 w-full text-center">
      Создавайте и участвуйте в событиях
    </h1>

    <div class="popular w-full mb-3">
      <h1 class="text-center font-bold text-2xl pb-2">Популярные события</h1>
      <hr />
      <hr />
      <div class="pt-3 pb-3 flex justify-center items-center">
        <div
          class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-items-center"
        >
          <!-- !TODO remove all EcentCard mocks -->
          <EventCard :data="Event" />
          <EventCard :data="Event" />
          <EventCard :data="Event" />
          <EventCard :data="Event" />
          <EventCard :data="Event" />
        </div>
      </div>
    </div>
    <!-- <div class="last w-full">
      <h1 class="text-center">Последние события</h1>
      <hr />
      <hr />
      <div>карточки</div>
    </div> -->

    <div
      class="w-full p-5 mb-5 bg-muted shadow-2xs border-(--color-border) border-1 rounded-xl h-40 flex justify-between flex-col items-center"
    >
      <h1 class="text-xl font-bold">Не нашли интересующее событие?</h1>
      <p>Посмотрите все доступные события и найдите то, что подходит именно вам.</p>
      <Button class="mt-3">Все события</Button>
    </div>

    <div
      class="w-full p-5 mb-10 bg-muted shadow-2xs border-(--color-border) border-1 rounded-xl h-40 flex justify-between flex-col items-center"
    >
      <h1 class="text-xl font-bold">Хочешь создать событие?</h1>
      <p>
        Поделись идеей — организуй встречу, мероприятие или активность, в которой хотят принять
        участие другие.
      </p>
      <Button class="mt-3"> Создать событие </Button>
    </div>
  </div>
</template>
