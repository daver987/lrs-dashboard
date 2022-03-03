<template>
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
      :options="['Mr', 'Mrs', 'Ms']" />
    <q-input
      v-model="firstName"
      bg-color="white"
      class="col"
      outlined
      dense
      type="text"
      label="First Name"
      name="contact_first_name"
      for="contact_first_name" />
    <q-input
      v-model="lastName"
      bg-color="white"
      class="col"
      outlined
      dense
      type="text"
      label="Last Name"
      name="contact_last_name"
      for="contact_last_name"
  /></q-card-section>

  <q-card-section class="row q-gutter-md">
    <q-input
      v-model="phone"
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
      v-model="email"
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
defineProps({
  namePrefix: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
})
</script>
