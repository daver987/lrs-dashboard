<script setup>
import { RouterView } from 'vue-router'
import { usePrefs } from '@/stores/usePrefs'
import { storeToRefs } from 'pinia'
import { usePriceCalculator } from '@/stores/usePriceCalculator'
import { useAccounts } from '@/stores/useAccounts'
import { supabase } from '@/services/supabase'

const prefs = usePrefs()
const { accountNumber, quoteNumber } = storeToRefs(prefs)
const price = usePriceCalculator()
const accounts = useAccounts()


let leftDrawerOpen = $ref(true)
let miniMode = $ref(false)

function toggleLeftDrawer() {
  miniMode = !miniMode
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) alert(error.message)
}
</script>

<template>
  <q-layout view='lHh lpR fFf'>
    <q-header reveal class='bg-black text-white'>
      <q-toolbar>
        <q-btn dense flat round icon='menu' @click='toggleLeftDrawer' />
        <q-toolbar-title></q-toolbar-title>
        <span
          class='text-lg text-primary text-bold tracking-widest uppercase'
        >{{ $route.name }}</span
        >
        <q-space />
        <q-btn label='Quick Quote' class='bg-black' to='/quick-quote' />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model='leftDrawerOpen'
      side='left'
      bordered
      :width='200'
      :mini='miniMode'
    >
      <q-item class='bg-grey-3'>
        <q-item-section avatar>
          <q-avatar>
            <img src='https://cdn.quasar.dev/img/boy-avatar.png' alt='avatar' />
          </q-avatar>
        </q-item-section>
        <q-item-section>My Dashboard</q-item-section>
      </q-item>
      <q-list padding class='bg-white text-black'>
        <q-item
          clickable
          v-ripple
          to='/dashboard'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='inbox' />
          </q-item-section>
          <q-item-section> My Office</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to='/accounts'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='groups' />
          </q-item-section>
          <q-item-section> Accounts</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to='/account-entry'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='groups' />
          </q-item-section>
          <q-item-section> Account Entry</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to='quotes'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='request_quote' />
          </q-item-section>
          <q-item-section> Quotes</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to='/quick-quote'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='attach_money' />
          </q-item-section>
          <q-item-section> Quick Quote</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to='/reservations'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='calendar_month' />
          </q-item-section>
          <q-item-section> Reservations</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to='/bookings'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='attach_money' />
          </q-item-section>
          <q-item-section> Booking Form</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          to='/profile'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='group' />
          </q-item-section>
          <q-item-section> My Profile</q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item
          clickable
          v-ripple
          @click='signOut'
          exact-active-class='bg-primary/20 text-primary'
        >
          <q-item-section avatar>
            <q-icon name='logout' />
          </q-item-section>
          <q-item-section> Log Out </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class='bg-grey-2' bordered>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          v-if="$route.name === 'Account Entry'"
          label='Save Account'
          class='bg-primary'
          @click='accounts.addAccount'
        />
        <q-btn
          v-if="$route.name === 'Quick Quote'"
          @click='price.priceCalculator'
          color='primary'
          label='Get Rate'
          class='q-mr-lg'
        />

      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

