<template>
  <q-table
    :rows='rows'
    :columns='columns'
    row-key='name'
    table-header-class='bg-grey-5'
    flat
    square
    :pagination='pagination'

  />
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuth'

onMounted(() => {
  getRows()
  console.log(getRows())
})
const rows = ref([{
  id: null,
  company_email: '',
  company_name: '',
  company_phone: '',
  company_address: '',
}])
const { supabase } = useAuthStore()
const store = reactive({
  user: {},
})
const loading = ref(true)

async function getRows() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('accounts')
      .select(`id, company_name, company_address, company_phone, company_email`)
      .eq('user_id', store.user.id)
    // .single()

    if (error && status !== 406) throw error

    if (data) {
      rows.value = data
      // companyInfo.value.company_address = data.company_address
      // companyInfo.value.company_phone = data.company_phone
      // companyInfo.value.company_email = data.company_email
      console.log(rows.value)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

// const rows = ref([])


const pagination = {
  rowsPerPage: 10,
}
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Account Number',
    align: 'left',
    field: 'id',
    // field: (row) => row.name,
    // format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'Company Name',
    align: 'left',
    label: 'Company Name',
    field: 'company_name',
    sortable: true,
  },
  {
    name: 'Company Address',
    align: 'left',
    label: 'Company Address',
    field: 'company_address',
    sortable: true,
  },
  {
    name: 'Company Phone',
    align: 'center',
    label: 'Company Phone',
    field: 'company_phone',
    sortable: true,
  },
  {
    name: 'Company Email',
    align: 'center',
    label: 'Company Email',
    field: 'company_email',
    sortable: true,
  },
]

// const rows = [
//   {
//     name: 1001,
//     business_name: 'Sephora',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   // {
//   //   user_id: id,
//   //   company_account_number: 1004,
//   //   company_name: this.companyName,
//   //   company_address: this.companyAddress,
//   //   company_phone: this.companyPhone,
//   //   company_email: this.companyEmail,
//   // },
//   {
//     name: 1002,
//     business_name: 'Naylor Business Solutions',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1003,
//     business_name: 'North Leaf Capital',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1004,
//     business_name: 'Cognizant',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1005,
//     business_name: 'Rosedale Livery',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1006,
//     business_name: "John's Coffee Shop",
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1007,
//     business_name: 'E & J',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1008,
//     business_name: '23 Accounting',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1009,
//     business_name: 'High Park Livery',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
//   {
//     name: 1010,
//     business_name: 'Frank & Oak',
//     business_address: '1278 Sixth Line, Oakville On L6J 1W3',
//     booking_contact: 'John Smith',
//     booking_phone: '555-123-4567',
//     booking_email: 'info@me.com',
//   },
// ]
</script>
