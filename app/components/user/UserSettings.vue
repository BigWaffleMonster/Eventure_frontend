<script setup lang="ts">
import { ChevronRight, User } from 'lucide-vue-next'
</script>

<template>
  <div
    class="flex flex-col justify-start items-center mx-auto max-w-96 h-fit w-full gap-7 rounded-xl p-4"
  >
    <div class="w-full flex flex-col justify-between items-center gap-4">
      <!-- Центрированное изображение в круге -->
      <div
        v-if="false"
        class="flex justify-center items-center rounded-full border-2 border-border h-20 w-20 overflow-hidden"
      >
        <img
          class="w-full h-full object-cover"
          src=""
          alt="Profile picture"
        >
      </div>
      <div
        v-else
        class="flex justify-center items-center rounded-full border-2 border-border h-20 w-20 overflow-hidden bg-muted"
      >
        <User class="h-10 w-10 text-muted-foreground" />
      </div>
      <p class="text-xl font-semibold">
        NickName
      </p>
    </div>

    <div class="w-full flex flex-col justify-between items-center gap-2.5">
      <button
        class="w-full flex justify-between items-center rounded-lg p-3 bg-muted transition-all duration-200 ease-in-out hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring active:scale-[0.98] cursor-pointer"
        @click="() => console.log('Profile clicked')"
      >
        <div class="flex items-center w-fit">
          <User class="h-5 w-5" />
          <p class="pl-3 font-medium">
            Profile
          </p>
        </div>
        <ChevronRight class="h-4 w-4" />
      </button>

      <button
        class="w-full flex justify-between items-center rounded-lg p-3 bg-muted transition-all duration-200 ease-in-out hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring active:scale-[0.98] cursor-pointer"
        @click="() => console.log('Subscribes clicked')"
      >
        <div class="flex items-center w-fit">
          <User class="h-5 w-5" />
          <p class="pl-3 font-medium">
            Subscribes
          </p>
        </div>
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
