<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { db } from '@/firebase'
import { ref, onValue, set } from 'firebase/database'
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'

const initialCount = useCounterStore()
const { quoteNumber } = storeToRefs(initialCount)

onMounted(() => {
  const originCount = ref(db, 'initial_number/')
  onValue(originCount, (snapshot) => {
    quoteNumber.value = snapshot.val()
  })
})
function updateNumber() {
  quoteNumber.value++
  set(ref(db, 'initial_number/'), quoteNumber.value)
}
let leftDrawerOpen = $ref(true)
let miniMode = $ref(false)

function toggleLeftDrawer() {
  miniMode = !miniMode
}

let seamless = $ref(false)
// function openQuote() {
//   seamless = !seamless
// }
</script>

<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal bordered class="bg-black text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> LRS Dashboard </q-toolbar-title>
        <q-btn label="Quick Quote" class="bg-black" @click="updateNumber" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="200"
      class="bg-grey-1"
      :mini="miniMode"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section> My Office </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/accounts">
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>
            <q-item-section> Accounts </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/resources">
            <q-item-section avatar>
              <q-icon name="category" />
            </q-item-section>
            <q-item-section> Resources </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="reservations">
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>
            <q-item-section> Reservations </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="quotes">
            <q-item-section avatar>
              <q-icon name="request_quote" />
            </q-item-section>
            <q-item-section> Quotes </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="pricing">
            <q-item-section avatar>
              <q-icon name="attach_money" />
            </q-item-section>
            <q-item-section> Pricing </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-dialog v-model="seamless" position="bottom" full-width>
      <QuoteForm />
    </q-dialog>
  </q-layout>
</template>
