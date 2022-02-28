<template>
  <q-markup-table
    flat
    square><thead class="bg-grey-5">
      <tr>
        <th v-for="col in columns" :key="col.name" class="text-center">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.quote_number">
        <td class="text-center">{{ row.quote_number }}</td>
        <td class="text-center">{{ row.pickup_time }}</td>
        <td class="text-center">{{ row.pickup_time }}</td>
        <td class="text-center">{{ row.service_type }}</td>
        <td class="text-center">{{ row.pickup_time }}</td>
        <td class="text-center">{{ row.pickup_time }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script setup>
//Todo: Migrate to q-table, fix firebase keys for quotes and accounts and customers
import { getDatabase, ref, onValue } from 'firebase/database'
import { ref as myRef } from 'vue'
const columns = [
  {
    name: 'quote_number',
    required: true,
    align: 'center',
    label: 'Quote Number',
    field: 'Quote Number',
    sortable: true,
  },
  {
    name: 'pickup_day',
    align: 'center',
    label: 'PU Date',
    field: 'PU Date',
    sortable: true,
  },
  {
    name: 'pickup_day',
    align: 'center',
    label: 'Pickup Time',
    field: 'Pickup Time',
    sortable: true,
  },
  {
    name: 'passenger_name',
    align: 'center',
    label: 'Passenger Name',
    field: 'Passenger Name',
    sortable: true,
  },
  {
    name: 'service_type',
    align: 'center',
    label: 'Vehicle Type',
    field: 'Vehicle Type',
    sortable: true,
  },
  {
    name: 'route_duration',
    align: 'center',
    label: 'Quote Amount',
    field: 'Quote Amount',
    sortable: true,
  },
]
const data = myRef(null)
const db = getDatabase()
const quoteRef = ref(db, '/quotes/quote_number')
onValue(quoteRef, (snapshot) => {
  data.value = snapshot.val()
  console.log(data.value)
})
const rows = data.value
</script>
