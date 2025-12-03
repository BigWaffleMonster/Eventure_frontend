<script setup lang="ts">
import { Login } from '~/components/auth/api/login'
import { Button } from '~/ui/shadcn/components/ui/button'

definePageMeta({
  layout: 'main',
})
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
      <div class="pt-3 pb-3 flex justify-center items-center h-full">
        <EventList :filters="{ allowedForMe: false, category: 'qwe', limit: 22, offset: 2 }" />
      </div>
    </div>

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
