<template>
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
    <div class="row q-gutter-md">
      <q-input
        v-model="accounts.companyPhone"
        mask="phone"
        fill-mask
        bg-color="white"
        class="col-3"
        outlined
        dense
        type="tel"
        label="Company Phone"
        name="company_phone"
        for="company_phone"
      />
      <q-input
        v-model="accounts.companyEmail"
        mask="email"
        bg-color="white"
        class="col"
        outlined
        dense
        type="email"
        label="Company Email"
        name="company_email"
        for="company_email"
      />
    </div>
  </q-card-section>
</template>

<script setup>
import { useAccounts } from '../../stores/useAccounts'
const accounts = useAccounts()
</script>
