import { createRouter, createWebHistory } from 'vue-router'
import { authenticationRoutes } from './authentication.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    ...authenticationRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
