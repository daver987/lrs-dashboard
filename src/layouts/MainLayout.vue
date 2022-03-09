<script setup>
import { supabase } from '@/services/supabase'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { usePrefs } from '@/stores/usePrefs'
import { storeToRefs } from 'pinia'
import { usePriceCalculator } from '@/stores/usePriceCalculator'
import { useAccounts } from '@/stores/useAccounts'
import { useUserStore } from '@/stores/useUserStore'
import { ref } from 'vue'
import { menu } from '@/data/menu'

const prefs = usePrefs()
const { accountNumber, quoteNumber } = storeToRefs(prefs)
const price = usePriceCalculator()
const accounts = useAccounts()
const user = useUserStore()
const menuItems = menu()

const src = ref('')
const path = ref('')

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}
onMounted(() => {
  downloadImage()
})

const leftDrawerOpen = ref(true)
const miniMode = ref(false)

function toggleLeftDrawer() {
  miniMode.value = !miniMode.value
}

// const menuItems = [
//   {
//     name: 'My Office',
//     to: '/dashboard',
//     icon: 'inbox',
//     id: 1,
//   },
//   {
//     name: 'Accounts',
//     to: '/accounts',
//     icon: 'groups',
//     id: 2,
//   },
//   {
//     name: 'Quotes',
//     to: '/quotes',
//     icon: 'request_quote',
//     id: 3,
//   },
//   {
//     name: 'Reservations',
//     to: '/reservations',
//     icon: 'calendar_month',
//     id: 4,
//   },
//   {
//     name: 'My Profile',
//     to: '/profile',
//     icon: 'group',
//     id: 5,
//   },
// ]
</script>

<template>
  <q-layout view="lHh lpR fFf">
    <q-header reveal class="bg-black text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title></q-toolbar-title>
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
      :mini="miniMode"
    >
      <q-item class="bg-grey-3">
        <q-item-section avatar>
          <q-avatar>
            <img :src="src" alt="avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>My Dashboard</q-item-section>
      </q-item>
      <q-list padding class="bg-white text-black">
        <q-item
          v-for="item in menuItems"
          :key="item.id"
          class="q-mb-sm q-mr-md rounded-r-full"
          clickable
          v-ripple
          :to="item.to"
          :tabindex="item.id"
          exact-active-class="bg-primary/20 text-primary"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section> {{ item.name }}</q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item
          clickable
          v-ripple
          @click="user.signOut"
          exact-active-class="bg-primary/20 text-primary"
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> Log Out</q-item-section>
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
  </q-layout>
</template>
