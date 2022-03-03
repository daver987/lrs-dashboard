<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="name"
    table-header-class="bg-grey-5"
    flat
    square
    :pagination="pagination"
  />
</template>

<script setup>
import { db } from '../firebase'
import { ref, onValue } from 'firebase/database'
import { onMounted } from 'vue'
import { usePrefs } from '../stores/usePrefs'

const prefs = usePrefs()
onMounted(() => {
  const accountsRef = ref(db, '/')
  onValue(accountsRef, (snapshot) => {
    prefs.testData = snapshot.val()
  })
})

const pagination = {
  rowsPerPage: 10,
}
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Customer Number',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'Business Name',
    align: 'left',
    label: 'Business Name',
    field: 'business_name',
    sortable: true,
  },
  {
    name: 'Business Address',
    align: 'left',
    label: 'Business Address',
    field: 'business_address',
    sortable: true,
  },
  {
    name: 'Booking Contact',
    align: 'left',
    label: 'Booking Contact',
    field: 'booking_contact',
    sortable: true,
  },
  {
    name: 'Booking Phone',
    align: 'center',
    label: 'Booking Phone',
    field: 'booking_phone',
    sortable: true,
  },
  {
    name: 'Booking Email',
    align: 'center',
    label: 'Booking Email',
    field: 'booking_email',
    sortable: true,
  },
]

const rows = [
  {
    name: 1001,
    business_name: 'Sephora',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1002,
    business_name: 'Naylor Business Solutions',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1003,
    business_name: 'North Leaf Capital',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1004,
    business_name: 'Cognizant',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1005,
    business_name: 'Rosedale Livery',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1006,
    business_name: "John's Coffee Shop",
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1007,
    business_name: 'E & J',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1008,
    business_name: '23 Accounting',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1009,
    business_name: 'High Park Livery',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
  {
    name: 1010,
    business_name: 'Frank & Oak',
    business_address: '1278 Sixth Line, Oakville On L6J 1W3',
    booking_contact: 'John Smith',
    booking_phone: '555-123-4567',
    booking_email: 'info@me.com',
  },
]
</script>
