<template>
  <q-markup-table flat square
    ><thead class="bg-grey-5">
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
        <td class="text-center">{{ row.pickup_time }}</td>
        <td class="text-center">{{ row.service_type }}</td>
        <td class="text-center">{{ row.pickup_address }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script setup>
//Todo: Migrate to q-table, fix firebase keys for quotes and accounts and customers
import { ref, onValue } from 'firebase/database'

import { db } from '../firebase'
const columns = [
  {
    name: 'quote_number',
    required: true,
    align: 'left',
    label: 'Quote Number',
    field: 'Quote Number',
    sortable: true,
  },
  {
    name: 'pickup_day',
    align: 'left',
    label: 'PU Date',
    field: 'PU Date',
    sortable: true,
  },
  {
    name: 'pickup_time',
    align: 'left',
    label: 'Pickup Time',
    field: 'Pickup Time',
    sortable: true,
  },
  {
    name: 'passenger_name',
    align: 'left',
    label: 'Passenger Name',
    field: 'Passenger Name',
    sortable: true,
  },
  {
    name: 'service_type',
    align: 'left',
    label: 'Service Type',
    field: 'Service Type',
    sortable: true,
  },
  {
    name: 'pickup_address',
    align: 'left',
    label: 'Pickup Address',
    field: 'pickup_address',
    sortable: true,
  },
]

const data = $ref(null)
const rows = $ref(null)
onValue(ref(db, '/quotes/quote_number'), (snapshot) => {
  data = snapshot.val()
  rows = data
  console.log(data)
})
</script>
