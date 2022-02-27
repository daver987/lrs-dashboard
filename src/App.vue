<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const leftDrawerOpen = ref(true)
const miniMode = ref(false)

function toggleLeftDrawer() {
  miniMode.value = !miniMode.value
}

const seamless = ref(false)
function openQuote() {
  seamless.value = !seamless.value
}
</script>

<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal bordered class="bg-black text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> LRS Dashboard </q-toolbar-title>
        <q-btn label="Quick Quote" class="bg-black" @click="openQuote" />
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
              <q-icon name="send" />
            </q-item-section>
            <q-item-section> Resources </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="quotes">
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>
            <q-item-section> Quotes </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="reservations">
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>
            <q-item-section> Reservations </q-item-section>
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
      <RouterView />
    </q-page-container>
    <q-dialog v-model="seamless" position="bottom" full-width>
      <BookingForm />
    </q-dialog>
  </q-layout>
</template>
