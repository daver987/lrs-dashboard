<template>
  <q-page>
    <QuoteCard
      v-for="quotes in data"
      :key="quotes.quote_number"
      :quoteNumber="quotes.quote_number"
      :originAddress="quotes.pickup_address"
      :destinationAddress="quotes.drop_off_address"
      :passengerCount="quotes.passenger_count"
      :luggageCount="quotes.luggage_count"
      :routeDistance="quotes.route_distance"
      :routeDuration="quotes.route_duration"
      :date="quotes.pickup_time"
      :selectedServiceType="quotes.service_type"
    />
  </q-page>
</template>

<script setup>
import { ref, onValue } from 'firebase/database'
import { ref as myRef } from 'vue'
import { db } from '../firebase'

const data = myRef(null)
const quoteRef = ref(db, '/quotes/quote_number')
onValue(quoteRef, (snapshot) => {
  data.value = snapshot.val()
  console.log(data.value)
})
</script>
