<template>
  <q-table
    :rows="accounts.rows"
    :columns="columns"
    row-key="name"
    table-header-class="bg-grey-5"
    flat
    square
    :pagination="pagination"
    title="Accounts"
    :row-key="(row) => row.id"
    v-model:fullscreen="isFullscreen"
    v-model:grid="isGrid"
    ><template v-slot:top>
      <q-btn
        :disable="loading"
        label="Add New"
        @click="isOpen = !isOpen"
        outline
        color="primary"
      />
      <q-space />
      <q-btn
        flat
        :disable="loading"
        :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="setFullscreen"
      />
      <q-btn
        flat
        :disable="loading"
        :icon="isGrid ? 'view_list' : 'grid_view'"
        @click="setGrid"
      /> </template
  ></q-table>
  <AddAccountModal :icon="isOpen" />
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/useAuth'
import { useAccounts } from '@/stores/useAccounts'
// import { storeToRefs } from 'pinia'

const isGrid = ref(false)
function setGrid() {
  isGrid.value = !isGrid.value
}

const isOpen = ref(false)

const isFullscreen = ref(false)
function setFullscreen() {
  isFullscreen.value = !isFullscreen.value
  console.log('setFullscreen')
}

onMounted(() => {
  getRows()
  console.log(getRows())
})
// const rows = ref([
//   {
//     id: null,
//     company_email: '',
//     company_name: '',
//     company_phone: '',
//     company_address: '',
//   },
// ])
const { supabase } = useAuthStore()
const store = reactive({
  user: {},
})
const loading = ref(true)

// const selection = ref([])

// async function getAccountNumber() {
//   try {
//     loading.value = true
//     store.user = supabase.auth.user()
//
//     let { data, error, status } = await supabase
//       .from('profiles')
//       .select(`account_number`)
//       .eq('user_id', store.user.id)
//
//     if (error && status !== 406) {
//       console.log(error)
//       return
//     }
//
//     if (data) {
//       accNumber.value = data
//       console.log(rows.value)
//     }
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }
const accounts = useAccounts()

async function getRows() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('accounts')
      .select(
        `company_name, company_address, company_phone, company_email, company_account_number`
      )
      .eq('user_id', store.user.id)

    if (error && status !== 406) {
      console.log(error)
      return
    }

    if (data) {
      accounts.rows = data
      console.log(accounts.rows)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const pagination = {
  rowsPerPage: 10,
}
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Account Number',
    align: 'left',
    field: 'company_account_number',
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
</script>
