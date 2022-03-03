<template>
  <q-card-section class="row q-gutter-md">
    <q-select
      v-model="selectedPaymentMethod"
      bg-color="white"
      class="col"
      outlined
      dense
      type="text"
      label="Payment Method"
      name="payment_method"
      for="payment_method"
      :options="['Cash', 'Credit Card', 'Debit Card', 'Paypal', 'E-Transfer']"
    />
    <q-select
      v-model="selectedPaymentTerms"
      bg-color="white"
      class="col"
      outlined
      dense
      type="text"
      label="Payment Terms"
      name="payment_terms"
      for="payment_terms"
      :options="['On Completion', 'Net 15', 'Net 30', 'Net 60', 'Net 90']"
    />
  </q-card-section>

  <q-card-section class="row q-gutter-md">
    <q-input
      v-model="paymentInfo"
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
defineProps({
  selectedPaymentMethod: '',
  selectedPaymentTerms: '',
  paymentInfo: '',
})
</script>
