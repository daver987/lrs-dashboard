<template>
  <q-card-section class="row q-gutter-md">
    <q-select
      v-model="accounts.paymentMethod"
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
      v-model="accounts.paymentTerms"
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
      v-model="accounts.paymentInfo"
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
</template>

<script setup>
import { useAccounts } from '../../stores/useAccounts'
import { usePrefs } from '../../stores/usePrefs'
const prefs = usePrefs()
const accounts = useAccounts()
</script>
