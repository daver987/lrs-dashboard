<template>
  <q-form class="bg-white row q-gutter-md" flat @submit="accounts.addAccount">
    <!-- column one -->
    <q-card flat class="col">
      <q-list class="space-y-2">
        <!-- Company Entry -->
        <q-expansion-item
          group="account_details"
          icon="groups"
          label="Account Details"
          header-class="text-black bg-grey-5"
          default-opened
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section class="row"
              ><div class="col-5">
                <span class="text-bold text-lg"> Account Number </span
                ><span class="text-bold text-md text-red-700">
                  {{ prefs.accountNumber }}
                </span>
              </div>
              <div class="col-7">
                <q-option-group
                  v-model="selectedAccountType"
                  :options="prefs.accountType"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </q-card-section>

            <template v-if="selectedAccountType === 'coprorate'">
              <q-card-section>
                <q-input
                  v-model="companyName"
                  bg-color="white"
                  outlined
                  dense
                  type="text"
                  label="Company Name"
                  name="company_name"
                  for="company_name"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <q-input
                  v-model="companyAddress"
                  bg-color="white"
                  outlined
                  dense
                  type="text"
                  label="Company Address"
                  name="company_address"
                  for="company_address"
                  :rules="[(val) => !!val || 'Field is required']"
                />
                <div class="row q-gutter-md">
                  <q-input
                    v-model="companyPhone"
                    mask="phone"
                    fill-mask
                    bg-color="white"
                    class="col-3"
                    outlined
                    dense
                    type="tel"
                    label="Company Phone"
                    name="company_phone"
                    for="company_phone"
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
                  />
                </div>
              </q-card-section>
              <q-card-section class="row q-gutter-md">
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
                />
              </q-card-section>
            </template>

            <template v-if="selectedAccountType === 'individual'">
              <q-card-section class="row q-gutter-md">
                <q-select
                  v-model="individualPrefix"
                  bg-color="white"
                  class="col-2"
                  outlined
                  dense
                  type="select"
                  label="Prefix"
                  name="individual_name_prefix"
                  for="individual_name_prefix"
                  :options="prefs.namePrefix" />
                <q-input
                  v-model="individualFirstName"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                  type="text"
                  label="First Name"
                  name="individual_first_name"
                  for="individual_first_name" />
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
              /></q-card-section>

              <q-card-section class="row q-gutter-md">
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
                  for="individual_phone" />
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
              /></q-card-section>
              <q-card-section class="row q-gutter-md">
                <q-input
                  v-model="individualNotes"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                  type="textarea"
                  label="Account Notes"
                  name="individual_notes"
                  for="individual_notes"
                />
              </q-card-section>
            </template>
          </q-card>
        </q-expansion-item>

        <!--Company Financial Entry -->
        <q-expansion-item
          group="account_details"
          icon="attach_money"
          label="Account Financial Details"
          header-class="text-black bg-grey-5"
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg"
                >Financial Details</span
              ></q-card-section
            >

            <q-card-section class="row q-gutter-md">
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

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="companyPaymentInfo"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Payment Info"
                name="company_payment_info"
                for="company_payment_info"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- second column -->
    <q-card flat class="col">
      <q-list class="space-y-2">
        <!-- Contact Entry -->
        <q-expansion-item
          group="contact_details"
          icon="groups"
          label="Contact Details"
          header-class="text-black bg-grey-5"
          default-opened
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section class="row"
              ><div class="flex col justify-start content-center">
                <div>
                  <span class="text-bold text-lg">Account Contact </span>
                  <span class="text-bold text-md text-red-700">
                    {{ prefs.accountNumber }} </span
                  ><span class="text-bold text-md text-red-700"
                    >-{{ prefs.initialContactAccountNumber }}</span
                  >
                </div>
              </div>

              <div class="flex col justify-end">
                <q-toggle
                  v-model="contactAddFinancialDetails"
                  label="Add Financial Details"
                  left-label
                  class="place-self-end"
                />
              </div>
              <div
                class="flex col justify-end"
                v-if="selectedAccountType === 'individual'"
              >
                <q-checkbox
                  v-model="checked"
                  left-label
                  label="Copy From Account"
                />
              </div>
            </q-card-section>

            <!-- Contact Entry -->
            <q-card-section class="row q-gutter-md">
              <q-select
                v-model="selectedContactNamePrefix"
                bg-color="white"
                class="col-2"
                outlined
                dense
                type="select"
                label="Prefix"
                name="contact_name_prefix"
                for="contact_name_prefix"
                :options="prefs.namePrefix" />
              <q-input
                v-model="contactFirstName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="First Name"
                name="contact_first_name"
                for="contact_first_name" />
              <q-input
                v-model="contactLastName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Last Name"
                name="contact_last_name"
                for="contact_last_name"
            /></q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="contactPhone"
                mask="phone"
                fill-mask
                bg-color="white"
                class="col-3"
                outlined
                dense
                type="tel"
                label="Contact Phone"
                name="contact_phone"
                for="contact_phone" />
              <q-input
                v-model="contactEmail"
                mask="email"
                bg-color="white"
                class="col"
                outlined
                dense
                type="email"
                label="Contact Email"
                name="contact_email"
                for="contact_email"
            /></q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="contactNotes"
                bg-color="white"
                class="col-9"
                outlined
                dense
                type="textarea"
                label="Contact Notes"
                name="contact_notes"
                for="contact_notes"
              />
              <div class="col">
                <q-item-label class="text-bold q-mb-sm"
                  >Contact Type</q-item-label
                >
                <q-option-group
                  name="contact_type"
                  v-model="selectedContactType"
                  :options="prefs.contactType"
                  type="checkbox"
                  color="primary"
                  dense
                />
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <!-- Contact Financial Entry -->
        <q-expansion-item
          v-if="contactAddFinancialDetails"
          group="contact_details"
          icon="attach_money"
          label="Individual Financial Details"
          header-class="text-black bg-grey-5"
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg"
                >Financial Details</span
              ></q-card-section
            >

            <q-card-section class="row q-gutter-md">
              <q-select
                v-model="contactPaymentMethod"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Payment Method"
                name="contact_payment_method"
                for="contact_payment_method"
                :options="prefs.paymentMethod"
              />
              <q-select
                v-model="contactPaymentTerms"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Payment Terms"
                name="contact_payment_terms"
                for="contact_payment_terms"
                :options="prefs.paymentTerms"
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="contactPaymentInfo"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Payment Info"
                name="contact_payment_info"
                for="contact_payment_info"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-form>
</template>

<script setup>
import { useAccounts } from '../stores/useAccounts'
import { usePrefs } from '../stores/usePrefs'
import { storeToRefs } from 'pinia'
import { watch, ref } from 'vue'

const accounts = useAccounts()
const prefs = usePrefs()

const checked = ref(false)

watch(checked, (val) => {
  if (val) {
    selectedContactNamePrefix.value = individualPrefix.value
    contactFirstName.value = individualFirstName.value
    contactLastName.value = individualLastName.value
    contactPhone.value = individualPhone.value
    contactEmail.value = individualEmail.value
    contactNotes.value = individualNotes.value
  } else {
    alert('Its Not Copied')
  }
})

const {
  companyName,
  companyAddress,
  companyPhone,
  companyEmail,
  companyNotes,
  companyPaymentMethod,
  companyPaymentTerms,
  companyPaymentInfo,
  contactPaymentMethod,
  individualPrefix,
  individualFirstName,
  individualLastName,
  individualEmail,
  individualPhone,
  individualNotes,
  contactPaymentTerms,
  contactPaymentInfo,
  selectedContactNamePrefix,
  contactFirstName,
  contactLastName,
  contactPhone,
  contactEmail,
  contactNotes,
  contactAddFinancialDetails,
  selectedContactType,
  selectedAccountType,
} = storeToRefs(accounts)
</script>
