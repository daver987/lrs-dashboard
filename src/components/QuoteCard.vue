<template>
  <q-card class="col p-4">
    <q-card-section class="full-width">
      <p>Quote Number: {{ quoteNumber }}</p>
    </q-card-section>
    <q-card-section>
      <p class="text-weight-bold text-body1">
        Pickup Date and Time: {{ date }}
      </p>
      <p class="text-weight-bold text-body1">
        Service Type: {{ selectedServiceType }}
      </p>
      <p class="text-weight-bold text-body1">
        Pickup Address: {{ originAddress }}
      </p>
      <p class="text-weight-bold text-body1">
        Drop-Off Address: {{ destinationAddress }}
      </p>
      <p class="text-weight-bold text-body1">
        Passenger Count: {{ passengerCount }}
      </p>
      <p class="text-weight-bold text-body1">
        Luggage Count: {{ luggageCount }}
      </p>
      <p class="text-weight-bold text-body1">Distance: {{ routeDistance }}</p>
      <p class="text-weight-bold text-body1">Time: {{ routeDuration }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  quoteNumber: {
    type: Number,
    default: 0,
  },
  originAddress: {
    type: String,
    default: '',
  },
  destinationAddress: {
    type: String,
    default: '',
  },
  passengerCount: {
    type: Number,
    default: 1,
  },
  luggageCount: {
    type: Number,
    default: 1,
  },
  routeDistance: {
    type: String,
    default: '',
  },
  routeDuration: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '',
  },
  selectedServiceType: {
    type: String,
    default: '',
  },
})
</script>
