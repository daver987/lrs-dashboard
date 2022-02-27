<template>
  <q-dialog v-model="myAlert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Saved Quote!</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ message }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '',
    required: true,
  },
  myAlert: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>
