import MainLayout from '@/Layouts/MainLayout.vue'
import Q from '@/Pages/q/q.vue'
import type { RouteRecordRaw } from 'vue-router'

export const mainRoutes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'q',
        name: 'q',
        component: Q,
        meta: { title: 'q' },
      },
    ],
  },
] satisfies RouteRecordRaw[]
