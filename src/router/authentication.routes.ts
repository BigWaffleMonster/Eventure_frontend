import type { RouteRecordRaw } from 'vue-router'

export const authenticationRoutes = [
  {
    path: '/login',
    name: 'authentication/login',
    component: () => import('@/views/Authentication/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'authentication/registration',
    component: () => import('@/views/Authentication/RegistrationView.vue'),
  },
] satisfies RouteRecordRaw[]
