<template>
  <q-table
    :rows="rows"
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
        @click="addAccount"
        outline
        color="blue-4"
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
  <q-dialog v-model="isOpen">
    <AddAccountModal />
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuth'

const isGrid = ref(false)
function setGrid(value) {
  isGrid.value = !isGrid.value
}

const isOpen = ref(false)
function addAccount() {
  isOpen.value = !isOpen.value
  console.log('addAccount')
}
const isFullscreen = ref(false)
function setFullscreen() {
  isFullscreen.value = !isFullscreen.value
  console.log('setFullscreen')
}

onMounted(() => {
  getRows()
  console.log(getRows())
})
const rows = ref([
  {
    id: null,
    company_email: '',
    company_name: '',
    company_phone: '',
    company_address: '',
  },
])
const { supabase } = useAuthStore()
const store = reactive({
  user: {},
})
const loading = ref(true)
// const selection = ref([])

async function getRows() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('accounts')
      .select(`id, company_name, company_address, company_phone, company_email`)
      .eq('user_id', store.user.id)

    if (error && status !== 406) throw error

    if (data) {
      rows.value = data
      console.log(rows.value)
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
</script>
