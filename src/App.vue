<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { db } from './firebase'
import { ref, onValue } from 'firebase/database'
import { usePrefs } from './stores/usePrefs'
import { storeToRefs } from 'pinia'
import { usePriceCalculator } from './stores/usePriceCalculator'
import { useAccounts } from './stores/useAccounts'

const prefs = usePrefs()
const { accountNumber, quoteNumber, contactAccountNumber } = storeToRefs(prefs)
const price = usePriceCalculator()
const accounts = useAccounts()

onMounted(() => {
  const quoteCount = ref(db, 'prefs/quote_number')
  const accNum = ref(db, 'prefs/account_number/')
  const contactAccNum = ref(db, 'prefs/contact_account_number/')
  onValue(quoteCount, (snapshot) => {
    quoteNumber.value = snapshot.val()
  })
  onValue(accNum, (snapshot) => {
    accountNumber.value = snapshot.val()
  })
  onValue(contactAccNum, (snapshot) => {
    contactAccountNumber.value = snapshot.val()
  })
})

let leftDrawerOpen = $ref(true)
let miniMode = $ref(false)

function toggleLeftDrawer() {
  miniMode = !miniMode
}

let seamless = $ref(false)
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal bordered class="bg-black text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> LRS Dashboard </q-toolbar-title>
        <span
          class="text-lg text-primary text-bold tracking-widest uppercase"
          >{{ $route.name }}</span
        >
        <q-space />
        <q-btn label="Quick Quote" class="bg-black" to="/quick-quote" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="200"
      class="bg-grey-3"
      :mini="miniMode"
    >
      <q-list padding>
        <q-item clickable v-ripple to="/" class="bg-grey-3">
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>
          <q-item-section> My Office </q-item-section>
        </q-item>

        <q-expansion-item
          group="accounts"
          icon="groups"
          label="Accounts"
          header-class="text-black bg-grey-3"
          to="/accounts"
          class="bg-white"
        >
          <q-item clickable v-ripple to="/accounts">
            <q-item-section avatar> </q-item-section>
            <q-item-section> At A Glance </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/account-entry">
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>
            <q-item-section> Account Entry </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          group="quotes"
          icon="request_quote"
          label="Quotes"
          header-class="text-black bg-grey-3"
          to="/quotes"
          class="bg-white"
        >
          <q-item clickable v-ripple to="quotes">
            <q-item-section avatar>
              <q-icon name="request_quote" />
            </q-item-section>
            <q-item-section> At A Glance </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/quick-quote">
            <q-item-section avatar>
              <q-icon name="attach_money" />
            </q-item-section>
            <q-item-section> Quick Quote </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          group="reservations"
          icon="calendar_month"
          label="Reservations"
          header-class="text-black bg-grey-3"
          to="/reservations"
          class="bg-white"
        >
          <q-item clickable v-ripple to="/reservations">
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>
            <q-item-section> At A Glance </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/bookings">
            <q-item-section avatar>
              <q-icon name="attach_money" />
            </q-item-section>
            <q-item-section> Booking Form </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-item clickable v-ripple to="/resources" class="bg-grey-3">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section> Resources </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-grey-2" bordered>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          v-if="$route.name === 'Account Entry'"
          label="Save Account"
          class="bg-primary"
          @click="accounts.addAccount"
        />
        <q-btn
          v-if="$route.name === 'Quick Quote'"
          @click="price.priceCalculator"
          color="primary"
          label="Get Rate"
          class="q-mr-lg"
        />
      </q-toolbar>
    </q-footer>
    <q-dialog v-model="seamless" position="bottom" full-width>
      <QuoteForm />
    </q-dialog>
  </q-layout>
</template>
