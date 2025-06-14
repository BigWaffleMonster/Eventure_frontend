import AuthLayout from '@/Layouts/AuthLayout.vue'
import { LoginPage } from '@/Pages/LoginPage'
import { RegistrationPage } from '@/Pages/RegistrationPage'
import type { RouteRecordRaw } from 'vue-router'

export const authenticationRoutes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'authentication/login',
        component: LoginPage,
        meta: { title: 'Вход' },
      },
      {
        path: 'register',
        name: 'authentication/registration',
        component: RegistrationPage,
        meta: { title: 'Регистрация' },
      },
    ],
  },
] satisfies RouteRecordRaw[]
