<script setup lang="ts">
import { cn } from '@/UI/shadcn/lib/utils'
</script>

<template>
  <Card :class="cn('w-[380px]', $attrs.class ?? '')">
    <CardHeader>
      <CardTitle>{{ $route.meta.title }}</CardTitle>
      <CardDescription>#event</CardDescription>
    </CardHeader>

    <CardContent>
      <form class="w-full flex flex-col gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="w-full">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="email@email"
                v-bind="componentField"
                class="border-(--color-border)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" class="border-(--color-border)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <!-- <Button class="cursor-pointer" type="submit"> Войти </Button> -->
      </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button class="cursor-pointer" type="submit"> Логин </Button>
      <Button class="cursor-pointer" type="submit"> Войти </Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
