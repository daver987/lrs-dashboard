<template>
  <q-card-section class="row q-gutter-md">
    <q-select
      v-model="accounts.selectedNamePrefix"
      bg-color="white"
      class="col-2"
      outlined
      dense
      type="select"
      label="Prefix"
      name="name_prefix"
      for="name_prefix"
      :options="prefs.namePrefix" />
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
      class="col-3"
      outlined
      dense
      type="tel"
      label="Contact Phone"
      name="contact_phone"
      for="contact_phone" />
    <q-input
      v-model="accounts.bookingEmail"
      mask="email"
      bg-color="white"
      class="col"
      outlined
      dense
      type="email"
      label="Contact Email"
      name="contact_email"
      for="contact_email"
  /></q-card-section>
</template>

<script setup>
import { useAccounts } from '../../stores/useAccounts'
import { usePrefs } from '../../stores/usePrefs'

const accounts = useAccounts()
const prefs = usePrefs()
</script>
