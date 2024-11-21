import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import ExclusiveContentView from '../views/ExclusiveContentView.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: AuthenticationView,
    },
    {
      path: '/exclusiveContent',
      name: 'exclusiveContent',
      component: ExclusiveContentView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next({ name: 'authentication' })
        }
      },
    },
  ],
})

export default router
