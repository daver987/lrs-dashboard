import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuth'
import { pinia } from '../stores/usePiniaStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: {
        requiresNoAuth: true,
      },
      children: [
        {
          path: '/signin',
          name: 'signIn',
          component: () => import('@/pages/auth/SignIn.vue'),
        },
        {
          path: '/signup',
          name: 'signUp',
          component: () => import('@/pages/auth/SignUp.vue'),
        },
        {
          path: '/forgotpassword',
          name: 'forgotPassword',
          component: () => import('@/pages/auth/ForgotPassword.vue'),
        },
      ],
    },

    {
      path: '/resetpassword',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '/resetpassword',
          name: 'resetPassword',
          component: () => import('@/pages/auth/ResetPassword.vue'),
          beforeEnter: (to) => {
            // only allow navigation to reset password
            // if we actually clicked a proper reset password link
            // which provides the type=recovery hash key
            if (!to.hash.includes('type=recovery')) {
              const { supabase } = useAuthStore()
              if (supabase.auth.user()) return '/'
              return '/signin'
            }
          },
        },
        {
          path: '/callback',
          name: 'callback',
          component: () => import('@/pages/auth/AuthCallback.vue'),
          beforeEnter: (to) => {
            /* Parse the route hash into a dictionary */
            const hashDictionary = {}
            // first remove the actual '#' character
            const hash = to.hash.replace('#', '')
            // split hash into key-value pairs
            hash.split('&').forEach((item) => {
              // split 'key=value' into [key, value]
              const [key, value] = item.split('=')
              // add to results
              hashDictionary[key] = value
            })

            if (
              [
                'access_token',
                'expires_in',
                'provider_token',
                'refresh_token',
                'token_type',
              ].some((key) => !(key in hashDictionary))
            )
              return '/'
          },
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/pages/NotFound.vue'),
        },
      ],
    },

    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/dashboard',
          name: 'My Office',
          component: () => import('@/pages/Dashboard.vue'),
        },
        // {
        //   path: '/profile',
        //   name: 'Profile',
        //   component: () => import('@/pages/ProfileView.vue'),
        // },
        {
          path: '/quotes',
          name: 'Quotes',
          component: () => import('@/pages/Quotes.vue'),
        },
        {
          path: '/quick-quote',
          name: 'Quick Quote',
          component: () => import('@/pages/QuickQuote.vue'),
        },
        {
          path: '/accounts',
          name: 'Accounts',

          component: () => import('@/pages/Accounts.vue'),
        },
        {
          path: '/account-entry',
          name: 'Account Entry',

          component: () => import('@/pages/AccountsEntry.vue'),
        },
        {
          path: '/bookings',
          name: 'Bookings',

          component: () => import('@/pages/Bookings.vue'),
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import('@/pages/Profile.vue'),
        },
        {
          path: '/reservations',
          name: 'Reservations',
          component: () => import('@/pages/Reservations.vue'),
        },
      ],
    },
  ],
})

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import('../pages/About.vue'),

const { supabase } = useAuthStore(pinia)
supabase.auth.onAuthStateChange((event) => {
  console.log(event)
  if (event == 'SIGNED_OUT') return router.push('/signin')
  if (event == 'SIGNED_IN') {
    const routeName = router.currentRoute.value.name
    console.log('routeName', routeName)

    if (routeName == 'callback') {
      setTimeout(() => {
        return router.push({ name: 'home' })
      }, 0)
    }
  }
})

router.beforeEach((to) => {
  const { supabase } = useAuthStore()

  if (to.meta.requiresAuth && !supabase.auth.user()) {
    return {
      path: '/signin',
    }
  }
  if (to.meta.requiresNoAuth && supabase.auth.user()) {
    return {
      path: '/',
    }
  }
})

export default router
