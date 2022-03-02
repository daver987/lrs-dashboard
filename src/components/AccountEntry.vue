<template>
  <q-form class="bg-white row q-px-md q-gutter-md" flat>
    <!-- column one -->
    <q-card flat class="col">
      <q-list>
        <q-expansion-item
          group="account_info"
          icon="groups"
          label="Account Details"
          header-class="text-black bg-grey-5"
          default-opened
          disable
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg">Account Number </span
              ><span class="text-bold text-md text-red-700">
                10125
              </span></q-card-section
            >

            <q-card-section>
              <q-input
                v-model="accounts.companyName"
                bg-color="white"
                outlined
                dense
                type="text"
                label="Company Name"
                name="company_name"
                for="company_name"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-input
                v-model="accounts.companyAddress"
                bg-color="white"
                outlined
                dense
                type="text"
                label="Company Address"
                name="company_address"
                for="company_address"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>

            <q-card-section
              ><span class="text-bold text-lg"
                >Booking Contact</span
              ></q-card-section
            >

            <q-card-section class="row q-gutter-md">
              <q-select
                v-model="namePrefix"
                bg-color="white"
                class="col-2"
                outlined
                dense
                type="select"
                label="Prefix"
                name="name_prefix"
                for="name_prefix"
                :options="prefs.bookingPrefix" />
              <q-input
                v-model="accounts.bookingFirstName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="First Name"
                name="booking_first_name"
                for="booking_first_name" />
              <q-input
                v-model="accounts.bookingLastName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Last Name"
                name="booking_last_name"
                for="booking_last_name"
            /></q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="accounts.bookingPhone"
                mask="phone"
                fill-mask
                bg-color="white"
                class="col"
                outlined
                dense
                type="tel"
                label="Account Phone"
                name="account_phone"
                for="account_phone" />
              <q-input
                v-model="accounts.bookingEmail"
                mask="email"
                bg-color="white"
                class="col"
                outlined
                dense
                type="email"
                label="Account Email"
                name="account_email"
                for="account_email"
            /></q-card-section>
            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="store.accountNotes"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Account Notes"
                name="account_notes"
                for="account_notes"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- second column -->
    <q-card flat class="col">
      <q-list
        ><q-expansion-item
          group="account_financial"
          icon="attach_money"
          label="Financial Details"
          header-class="text-black bg-grey-5"
          default-opened
          disable
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg"
                >Financial Details</span
              ></q-card-section
            >
            <!-- Pickup Location -->
            <q-card-section class="row q-gutter-md">
              <q-select
                v-model="store.paymentMethod"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Payment Method"
                name="payment_method"
                for="payment_method"
                :options="prefs.paymentMethod"
              />
              <q-select
                v-model="store.paymentTerms"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Payment Terms"
                name="payment_terms"
                for="payment_terms"
                :options="prefs.paymentTerms"
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="store.paymentInfo"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Payment Info"
                name="payment_info"
                for="payment_info"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-form>
</template>

<script setup>
import { useMap } from '../stores/useMap'
import { useAccounts } from '../stores/useAccounts'
import { useCounterStore } from '../stores/counter'
import { usePrefs } from '../stores/usePrefs'

const counterStore = useCounterStore()
const accounts = useAccounts()
const store = useMap()
const prefs = usePrefs()

const fareInfo = $ref([
  {
    itemLabel: 'Flat Rate',
    name: 'flat_rate',
    rate: 0,
    id: 1,
  },

  {
    itemLabel: 'Gratuity',
    name: 'gratuity',
    rate: 0,
    id: 2,
  },
  {
    itemLabel: 'Toll Fees',
    name: 'toll_fees',
    rate: 0,
    id: 3,
  },
  {
    itemLabel: 'HST',
    name: 'hst',
    rate: 0,
    id: 4,
  },
  {
    itemLabel: 'Total',
    name: 'total',
    rate: 0,
    id: 5,
  },
])
</script>
