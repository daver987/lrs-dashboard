<template>
  <q-card class="max-w-xl q-pa-md">
    <q-form @submit.prevent="useUser.updateProfile">
      <Avatar
        v-model:path="useUser.userAvatarUrl"
        @upload="useUser.updateProfile"
      />

      <q-input
        id="email"
        type="text"
        v-model="user.email"
        disable
        label="Email"
        flat
        borderless
      />

      <q-input
        name="username"
        type="text"
        label="Username"
        v-model="userUserName"
        flat
        borderless
      />

      <q-input
        name="company_name"
        type="text"
        label="Company Name"
        v-model="userCompanyName"
        flat
        borderless
      />
      <q-input
        name="company_address"
        type="text"
        label="Company Address"
        v-model="userCompanyAddress"
        flat
        borderless
      />
      <q-input
        name="company_phone"
        type="text"
        label="Company Phone"
        v-model="userCompanyPhone"
        flat
        borderless
      />
      <q-input
        name="company_email"
        type="text"
        label="Company Email"
        v-model="userCompanyEmail"
        flat
        borderless
      />
      <q-input
        name="company_website"
        type="text"
        label="Company Website"
        v-model="userCompanyWebsite"
        flat
        borderless
      />
      <q-btn
        type="submit"
        :disabled="loading"
        :label="loading ? 'Loading ...' : 'Update'"
        color="primary"
      />
    </q-form>
  </q-card>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const useUser = useUserStore()
const {
  user,
  loading,
  userCompanyWebsite,
  userUserName,
  userCompanyName,
  userCompanyAddress,
  userCompanyPhone,
  userCompanyEmail,
} = storeToRefs(useUser)

onMounted(() => {
  useUser.getProfile()
})

function updateModel(val) {
  profileInputs.value.model = val
}
const profileInputs = ref([
  {
    id: 1,
    name: 'username',
    model: useUser.userUserName,
    label: 'Username',
    type: 'text',
    required: false,
    disabled: false,
  },
  {
    id: 2,
    name: 'company_name',
    model: useUser.userCompanyName,
    label: 'Company Name',
    type: 'text',
    required: false,
    disabled: false,
  },
  {
    id: 3,
    name: 'company_address',
    model: userCompanyAddress.value,
    label: 'Company Address',
    type: 'text',
    required: false,
    disabled: false,
  },
  {
    id: 4,
    name: 'company_phone',
    model: userCompanyPhone.value,
    label: 'Company Phone',
    type: 'text',
    required: false,
    disabled: false,
  },
  {
    id: 5,
    name: 'company_website',
    model: userCompanyWebsite.value,
    label: 'Company Website',
    type: 'text',
    required: false,
    disabled: false,
  },
])
</script>
