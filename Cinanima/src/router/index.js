import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthenticationView from '../views/AuthenticationView.vue'
import ExclusiveContentView from '../views/ExclusiveContentView.vue'
import ArtistProfileView from '../views/ArtistProfileView.vue'
import EventCalendarView from '../views/EventCalendarView.vue'
import TicketView from '../views/TicketView.vue'
import EventView from '../views/EventView.vue'
import UserProfileView from '../views/UserProfileView.vue'

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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/artistProfile',
      name: 'artistProfile',
      component: ArtistProfileView,
    },
    {
      path: '/eventCalendar',
      name: 'eventCalendar',
      component: EventCalendarView,
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView,
    },
    {
      path: '/event',
      name: 'event',
      component: EventView,
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      component: UserProfileView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/partners',
      name: 'partners',
      component: () => import('../views/PartnersView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/authentication', query: { from: to.fullPath  } })
  } else {
    next()
  }
})

export default router
