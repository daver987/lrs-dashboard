import { createRouter, createWebHistory } from 'vue-router'
import MyOffice from '../pages/MyOffice.vue'
import Quotes from '../pages/Quotes.vue'
import Reservations from '../pages/Reservations.vue'
import Accounts from '../pages/Accounts.vue'
import Bookings from '../pages/Bookings.vue'
import Resources from '../pages/Resources.vue'
import AccountsEntry from '../pages/AccountsEntry.vue'
import QuickQuote from '../pages/QuickQuote.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'My Office',
      component: MyOffice,
    },
    {
      path: '/quotes',
      name: 'Quotes',
      component: Quotes,
    },
    {
      path: '/quick-quote',
      name: 'Quick Quote',
      component: QuickQuote,
    },

    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts,
    },
    {
      path: '/accounts-entry',
      name: 'Account Entry',
      component: AccountsEntry,
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings,
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources,
    },
    {
      path: '/reservations',
      name: 'Reservations',
      component: Reservations,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../pages/About.vue'),
    },
  ],
})

export default router
