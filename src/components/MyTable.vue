<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="font-semibold text-xl text-gray-900">Accounts</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all accounts including their name, title, email and role.
        </p>
      </div>
      <div class="mt-4 sm:flex-none sm:mt-0 sm:ml-16">
        <button
          type="button"
          class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-sm text-white py-2 px-4 inline-flex items-center justify-center sm:w-auto hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add user
        </button>
      </div>
    </div>
    <div class="flex flex-col mt-8">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 inline-block align-middle md:px-6 lg:px-8">
          <div
            class="shadow ring-black ring-1 ring-opacity-5 overflow-hidden md:rounded-lg"
          >
            <table class="divide-y min-w-full divide-gray-300">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 pr-3 pl-4 text-gray-900 sm:pl-6"
                  >
                    Account
                  </th>
                  <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900"
                  >
                    Details
                  </th>
                  <!-- <th
                    scope="col"
                    class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900"
                  >
                    Actions
                  </th> -->
                  <th scope="col" class="py-3.5 pr-4 pl-3 relative sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y bg-white divide-gray-200">
                <tr v-for="items in accounts.rows" :key="items.id">
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="font-bold text-red-500">
                      {{ items.company_account_number }}
                    </div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="text-gray-900">{{ items.company_name }}</div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="text-gray-900">{{ items.company_address }}</div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="text-gray-900">{{ items.company_phone }}</div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="text-gray-900">{{ items.company_email }}</div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="flex flex-row place-items-center">
                      <q-btn
                        icon="pageview_outline"
                        color="teal-6"
                        size="sm"
                        fab-mini
                        class="self-center"
                      />
                    </div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="row q-gutter-sm">
                      <q-btn icon="edit_outline" fab-mini color="info" /><q-btn
                        icon="delete"
                        fab-mini
                        color="negative"
                      />
                    </div>
                  </td>
                  <!-- <td
                    class="font-medium text-right text-sm py-4 pr-4 pl-3 relative whitespace-nowrap sm:pr-6"
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit<span class="sr-only">, {{ person.name }}</span></a
                    >
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuth'
import { useAccounts } from '@/stores/useAccounts'

// const isGrid = ref(false)
// function setGrid() {
//   isGrid.value = !isGrid.value
// }

// const isOpen = ref(false)

// const isFullscreen = ref(false)

// function setFullscreen() {
//   isFullscreen.value = !isFullscreen.value
//   console.log('setFullscreen')
// }

onMounted(() => {
  getRows()
  console.log(getRows())
})

const { supabase } = useAuthStore()
const store = reactive({
  user: {},
})
const loading = ref(false)

const accounts = useAccounts()

async function getRows() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('accounts')
      .select(
        `id, company_name, company_address, company_phone, company_email, company_account_number`
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

// const pagination = {
//   rowsPerPage: 10,
// }

const columns = [
  {
    name: 'account_number',
    required: true,
    label: 'Account Number',
    align: 'left',
    field: 'company_account_number',
    // field: (row) => row.name,
    format: (val) => `${val}`,
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
  {
    name: 'details',
    align: 'center',
    label: 'Details',
    field: 'details',
    sortable: false,
  },
]
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]
</script>
