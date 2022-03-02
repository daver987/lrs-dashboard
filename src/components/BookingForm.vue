<template>
  <q-form class="bg-white row q-gutter-md" flat>
    <!-- column one -->
    <q-card flat class="col">
      <q-list>
        <q-expansion-item
          group="accountInfo"
          icon="groups"
          label="Account Information"
          header-class="text-black bg-grey-5"
          default-opened
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg"
                >Customer Details</span
              ></q-card-section
            >
            <q-card-section class="row q-gutter-sm">
              <q-input
                v-model="counterStore.quoteNumber"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Confirmation Number"
                name="confirmation_number"
                for="confirmation_number"
                readonly
              />
              <q-input
                v-model="accounts.accountNumber"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Account Number"
                name="account_number"
                for="account_number"
                readonly
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="accounts.billingContact"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Billing Contact"
                name="billing_contact"
                for="billing_contact"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-input
                v-model="accounts.companyName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Company Name"
                name="company_name"
                for="company_name"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="accounts.passengerFirstName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Passenger First Name"
                name="pax_first_name"
                for="pax_first_name" />
              <q-input
                v-model="accounts.passengerLastName"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Passenger Last Name"
                name="pax_last_name"
                for="pax_last_name"
            /></q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="accounts.passengerPhoneNumber"
                mask="phone"
                fill-mask
                bg-color="white"
                class="col"
                outlined
                dense
                type="tel"
                label="Passenger Phone"
                name="passenger_phone"
                for="passenger_phone" />
              <q-input
                v-model="accounts.passengerEmail"
                mask="email"
                bg-color="white"
                class="col"
                outlined
                dense
                type="email"
                label="Passenger Email"
                name="passenger_email"
                for="passenger_email"
            /></q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- second column -->
    <q-card flat class="col">
      <q-list
        ><q-expansion-item
          group="tripInfo"
          icon="map"
          label="Routing Details"
          header-class="text-black bg-grey-5"
          default-opened
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg"
                >Routing Details</span
              ></q-card-section
            >
            <q-card-section class="row q-gutter-sm">
              <!-- Pickup Date -->
              <q-input
                dense
                v-model="store.pickupDate"
                mask="date"
                :rules="['date']"
                outlined
                name="pickup_date"
                for="pickup_date"
                label="Pickup Date"
                class="col"
                bg-color="white"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="store.pickupDate">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <!-- Pickup Time -->
              <q-input
                dense
                v-model="store.pickupTime"
                mask="time"
                :rules="['time']"
                outlined
                name="pickup_time"
                for="pickup_time"
                label="Pickup Time"
                class="col"
                bg-color="white"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="store.pickupTime">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>

            <!-- Pickup Location -->

            <q-card-section>
              <q-input
                v-model="store.pickupAddress"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Pickup Address"
                name="pickup_address"
                for="pickup_address"
              />
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="store.dropOffAddress"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Drop-Off Address"
                name="drop_off_address"
                for="drop_off_address"
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-select
                v-model="store.selectedHourCount"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Hours"
                name="hour_count"
                for="hour_count"
                :options="prefs.selectNumbers"
              />
              <q-select
                v-model="store.selectedLuggageCount"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Luggage"
                name="luggage_count"
                for="luggage_count"
                :options="prefs.selectNumbers"
              />
              <q-select
                v-model="store.selectedPassengerCount"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Pax #"
                name="passenger_count"
                for="passenger_count"
                :options="prefs.selectNumbers"
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-select
                v-model="store.selectedServiceType"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Service Type"
                name="service_type"
                for="service_type"
                :options="prefs.serviceType"
              />
              <q-select
                v-model="store.selectedVehicleType"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Vehicle Type"
                name="vehicle_type"
                for="vehicle_type"
                :options="prefs.vehicleType"
              />
            </q-card-section>

            <q-card-section class="row q-gutter-md">
              <q-input
                v-model="store.tripNotes"
                bg-color="white"
                class="col"
                outlined
                dense
                type="textarea"
                label="Trip Notes"
                name="trip_notes"
                for="trip_notes"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- third column -->
    <q-card flat class="col">
      <q-list class="bg-white space-y-4">
        <q-expansion-item
          group="extras"
          icon="add_box"
          label="Extras"
          header-class="text-black bg-grey-5"
          default-opened
        >
          <q-card bordered flat class="bg-grey-3">
            <q-card-section
              ><span class="text-bold text-lg"
                >Trip Extras</span
              ></q-card-section
            ><q-card-section>
              <q-select
                v-model="store.selectedTripStatus"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Trip Status"
                name="trip_status"
                for="trip_status"
                :options="prefs.tripStatus"
              />
            </q-card-section>
            <q-card-section>
              <q-select
                v-model="store.tripType"
                bg-color="white"
                class="col"
                outlined
                dense
                type="text"
                label="Trip Type"
                name="trip_type"
                for="trip_type"
                :options="prefs.tripType"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          group="extras"
          icon="attach_money"
          label="Total Cost"
          header-class="text-black bg-grey-5"
        >
          <q-card class="bg-grey-3 col">
            <q-card-section
              ><span class="text-bold text-lg">Total Cost</span></q-card-section
            >
            <q-card-section>
              <q-list>
                <q-item tag="label" v-for="item in fareInfo" :key="item.id">
                  <q-item-section>
                    <q-item-label>{{ item.itemLabel }}</q-item-label>
                    <!-- <q-item-label caption>Label One</q-item-label> -->
                  </q-item-section>
                  <q-item-section side class="text-bold"
                    ><q-input
                      v-model="item.rate"
                      bg-color="white"
                      class="col"
                      outlined
                      dense
                      type="text"
                      :name="item.name"
                      :for="item.name"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-form>
</template>

<script setup>
import { useMap } from '../stores/useMap'
import { useAccounts } from '../stores/useAccounts'
import { useCounterStore } from '../stores/counter'
import { usePrefs } from '../stores/usePrefs'

const counterStore = useCounterStore()
const accounts = useAccounts()
const store = useMap()
const prefs = usePrefs()

const fareInfo = $ref([
  {
    itemLabel: 'Flat Rate',
    name: 'flat_rate',
    rate: 0,
    id: 1,
  },

  {
    itemLabel: 'Gratuity',
    name: 'gratuity',
    rate: 0,
    id: 2,
  },
  {
    itemLabel: 'Toll Fees',
    name: 'toll_fees',
    rate: 0,
    id: 3,
  },
  {
    itemLabel: 'HST',
    name: 'hst',
    rate: 0,
    id: 4,
  },
  {
    itemLabel: 'Total',
    name: 'total',
    rate: 0,
    id: 5,
  },
])
</script>
