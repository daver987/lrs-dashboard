<template>
  <q-form class="bg-white row q-gutter-md" flat @submit="accounts.addAccount">
    <!-- column one -->
    <q-card flat class="col" bordered>
      <q-list class="space-y-2">
        <q-expansion-item
          group="account_info"
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
                  v-model="accounts.selectedAccountType"
                  :options="prefs.accountType"
                  color="primary"
                  inline
                  dense
                />
              </div>
            </q-card-section>
            <BusinessEntry
              v-if="accounts.selectedAccountType === 'coprorate'"
            />
            <IndividualEntry
              v-if="accounts.selectedAccountType === 'individual'"
            />
            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="accounts.accountNotes"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Account Notes"
                name="account_notes"
                for="account_notes"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="account_info"
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
            <!-- Financial Entry -->
            <FinancialEntry />
            <q-card-section>
              <q-btn label="Save Account" class="bg-primary" type="submit" />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- second column -->
    <q-card flat class="col">
      <q-list class="space-y-2"
        ><q-expansion-item
          group="account_financial"
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
                    >-{{ prefs.subAccountNumber }}</span
                  >
                </div>
              </div>
              <!-- <div class="col">
                <q-option-group
                  name="accepted_genres"
                  v-model="accounts.selectedSubAccountType"
                  :options="prefs.subAccountType"
                  type="checkbox"
                  color="primary"
                  inline
                  dense
                />
              </div> -->
              <div class="flex col justify-end">
                <q-toggle
                  v-model="addFinancial"
                  label="Add Financial"
                  left-label
                  class="place-self-end"
                />
              </div>
            </q-card-section>
            <IndividualEntry />

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="accounts.accountNotes"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Contact Notes"
                name="contact_notes"
                for="contact_notes"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          v-if="addFinancial"
          group="account_financial"
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
            <!-- Pickup Location -->
            <FinancialEntry />
            <q-card-section>
              <q-btn label="Save Account" class="bg-primary" type="submit" />
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
import IndividualEntry from '../components/forms/IndividualEntry.vue'
import BusinessEntry from '../components/forms/BusinessEntry.vue'
import FinancialEntry from '../components/forms/FinancialEntry.vue'

const accounts = useAccounts()
const prefs = usePrefs()
const addFinancial = $ref(false)
</script>
