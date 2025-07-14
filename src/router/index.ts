import { createRouter, createWebHistory } from 'vue-router'
import { authenticationRoutes } from './authentication.routes'
import { mainRoutes } from './main.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    ...authenticationRoutes,
    ...mainRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
