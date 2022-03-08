<template>
  <q-dialog v-model="icon" @update:model-value="icon">
    <q-layout view="hHh lpR fFf" container class="h-2xl bg-white">
      <q-page-container>
        <q-page>
          <q-card flat class="col q-pa-sm bg-white">
            <q-list class="space-y-2">
              <!-- Company Entry -->

              <q-card-section class="row">
                <div class="col">
                  <span class="text-bold text-lg"> Account Number </span
                  ><span class="text-bold text-md text-red-700">
                    {{ companyAccountNumber }}
                  </span>
                </div>
                <div class="col">
                  <q-option-group
                    v-model="selectedAccountType"
                    :options="prefs.accountType"
                    color="primary"
                    inline
                    dense
                  />
                </div>
                <q-btn
                  icon="close"
                  @click="icon = false"
                  flat
                  round
                  dense
                  v-close-popup
                />
              </q-card-section>

              <q-form @reset="onReset" @submit="onSubmit">
                <template v-if="selectedAccountType === 'corporate'">
                  <q-card-section class="col q-gutter-md">
                    <q-input
                      v-model="companyName"
                      bg-color="white"
                      outlined
                      dense
                      class="row"
                      type="text"
                      label="Company Name"
                      name="company_name"
                      for="company_name"
                      hide-bottom-space
                    />
                    <q-input
                      v-model="companyAddress"
                      bg-color="white"
                      outlined
                      dense
                      class="row"
                      type="text"
                      label="Company Address"
                      name="company_address"
                      for="company_address"
                      hide-bottom-space
                    />
                    <div class="row gap-2">
                      <q-input
                        v-model="companyPhone"
                        mask="phone"
                        fill-mask
                        bg-color="white"
                        class="col-4"
                        outlined
                        dense
                        type="tel"
                        label="Company Phone"
                        name="company_phone"
                        for="company_phone"
                        hide-bottom-space
                      />
                      <q-input
                        v-model="companyEmail"
                        mask="email"
                        bg-color="white"
                        class="col"
                        outlined
                        dense
                        type="email"
                        label="Company Email"
                        name="company_email"
                        for="company_email"
                        hide-bottom-space
                      />
                    </div>
                  </q-card-section>
                </template>

                <template v-if="selectedAccountType === 'individual'">
                  <q-card-section class="col q-gutter-md">
                    <div class="row gap-2">
                      <q-select
                        v-model="individualPrefix"
                        bg-color="white"
                        class="col-3"
                        outlined
                        dense
                        type="select"
                        label="Prefix"
                        name="individual_name_prefix"
                        for="individual_name_prefix"
                        :options="prefs.namePrefix"
                      />
                      <q-input
                        v-model="individualFirstName"
                        bg-color="white"
                        class="col"
                        outlined
                        dense
                        type="text"
                        label="First Name"
                        name="individual_first_name"
                        for="individual_first_name"
                        hide-bottom-space
                      />
                      <q-input
                        v-model="individualLastName"
                        bg-color="white"
                        class="col"
                        outlined
                        dense
                        type="text"
                        label="Last Name"
                        name="individual_last_name"
                        for="individual_last_name"
                        hide-bottom-space
                      />
                    </div>

                    <q-input
                      v-model="individualAddress"
                      bg-color="white"
                      outlined
                      dense
                      class="row"
                      type="text"
                      label="Address"
                      name="individual_address"
                      for="individual_address"
                      hide-bottom-space
                      :rules="[(val) => !!val || 'Field is required']"
                    />
                    <div class="row gap-2">
                      <q-input
                        v-model="individualPhone"
                        mask="phone"
                        fill-mask
                        bg-color="white"
                        class="col-3"
                        outlined
                        dense
                        type="tel"
                        label="Contact Phone"
                        name="individual_phone"
                        for="individual_phone"
                        hide-bottom-space
                      />
                      <q-input
                        v-model="individualEmail"
                        mask="email"
                        bg-color="white"
                        class="col"
                        outlined
                        dense
                        type="email"
                        label="Contact Email"
                        name="individual_email"
                        for="individual_email"
                        hide-bottom-space
                      />
                    </div>
                  </q-card-section>
                </template>

                <!--Company Financial Entry -->

                <q-card-section class="row q-gutter-sm">
                  <q-select
                    v-model="companyPaymentMethod"
                    bg-color="white"
                    class="col"
                    outlined
                    dense
                    type="text"
                    label="Payment Method"
                    name="company_payment_method"
                    for="company_payment_method"
                    :options="prefs.paymentMethod"
                  />
                  <q-select
                    v-model="companyPaymentTerms"
                    bg-color="white"
                    class="col"
                    outlined
                    dense
                    type="text"
                    label="Payment Terms"
                    name="company_payment_terms"
                    for="company_payment_terms"
                    :options="prefs.paymentTerms"
                  />
                </q-card-section>

                <q-card-section class="row q-gutter-sm">
                  <q-input
                    v-model="companyNotes"
                    bg-color="white"
                    class="col"
                    outlined
                    dense
                    type="textarea"
                    label="Account Notes"
                    name="company_notes"
                    for="company_notes"
                    hide-bottom-space
                  />
                </q-card-section>

                <q-card-section>
                  <q-btn
                    outline
                    color="primary"
                    label="Save Account"
                    type="submit"
                  />
                  <q-btn outline color="primary" label="Reset" type="reset" />
                </q-card-section>
              </q-form>
            </q-list>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup>
import { supabase } from '@/services/supabase'
import { useAccounts } from '@/stores/useAccounts'
import { storeToRefs } from 'pinia'
import { data } from '@/data/useData'
import { onMounted, ref } from 'vue'

const props = defineProps({
  icon: {
    default: false,
    type: Boolean,
  },
})

// const hides = (evt) => {
//   if (evt) {
//     props.icon = false
//   }
// }

const onSubmit = () => {
  accounts.saveAccount()
  onReset()
}
const onReset = () => {
  accounts.$reset()
}
const accounts = useAccounts()
const prefs = data()
const {
  companyName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyNotes,
  companyPaymentMethod,
  companyPaymentTerms,
  companyAccountNumber,
  individualPrefix,
  individualFirstName,
  individualLastName,
  individualEmail,
  individualPhone,
  individualAddress,
  selectedAccountType,
} = storeToRefs(accounts)

const loading = ref(true)
const user = ref({})
async function getAccountNumber() {
  try {
    loading.value = true
    user.value = supabase.auth.user()
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`account_number`)
      .eq('user_id', user.value.id)
      .single()

    if (error && status !== 406) {
      console.log(error)
      return
    }

    if (data) {
      const { account_number } = data
      companyAccountNumber.value = account_number
      console.log(account_number)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getAccountNumber()
})
</script>
