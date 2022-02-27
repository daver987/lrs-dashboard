import { createRouter, createWebHistory } from 'vue-router'
import MyOffice from '../pages/MyOffice.vue'
import Quotes from '../pages/Quotes.vue'
import Reservations from '../pages/Reservations.vue'
import Accounts from '../pages/Accounts.vue'
import Pricing from '../pages/Pricing.vue'
import Resources from '../pages/Resources.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyOffice',
      component: MyOffice,
    },
    {
      path: '/quotes',
      name: 'quotes',
      component: Quotes,
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts,
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservations,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../pages/About.vue'),
    },
  ],
})

export default router
