<template>
  <div class="row py-2 q-px-md justify-between items-center">
    <div>
      <span class="text-bold">Quote Number # </span
      ><span class="text-bold text-red-700">{{ prefs.quoteNumber }}</span>
    </div>
    <q-btn
      label="New Rate"
      type="reset"
      size="md"
      color="primary"
      flat
      @click="store.$reset()"
    />
  </div>
  <q-form
    @submit.prevent="store.$reset()"
    @reset="store.$reset()"
    class="row q-gutter-md q-pa-md"
  >
    <q-card class="bg-white col" flat>
      <q-list class="bg-white space-y-2">
        <q-expansion-item
          group="tripDetails"
          icon="explore"
          label="Trip Details"
          default-opened
          header-class="text-black bg-grey-5"
        >
          <q-card bordered flat class="bg-grey-3 q-pa-sm">
            <q-card-section
              ><span class="text-bold text-lg"
                >Trip Details</span
              ></q-card-section
            >
            <q-card-section class="row q-gutter-sm">
              <q-select
                label="Service Type"
                :options="prefs.serviceType"
                v-model="selectedServiceType"
                outlined
                bg-color="white"
                class="col"
                dense
              >
              </q-select>

              <q-input
                v-model="date"
                bg-color="white"
                class="col"
                outlined
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
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
            <q-card-section>
              <q-input
                name="origin-input"
                type="text"
                for="origin-input"
                outlined
                bg-color="white"
                class="col"
                v-model="selectedOriginAddress"
                label="Pickup Address"
                hint="Enter in the name or address of the pickup location"
                dense
              />
            </q-card-section>
            <q-card-section v-if="selectedServiceType !== 'Hourly'">
              <q-input
                name="destination-input"
                type="text"
                for="destination-input"
                outlined
                bg-color="white"
                class="col"
                v-model="selectedDestinationAddress"
                label="Drop-Off Address"
                hint="Enter in the name or address of the drop-off location"
                dense
              />
            </q-card-section>
            <q-card-section v-if="selectedServiceType === 'Hourly'">
              <span class="mr-8">Number Of Hours</span>
              <q-btn
                round
                color="black"
                icon="remove"
                @click="counter.decrementHour"
              />
              <span class="text-lg p-2">{{ counter.hourCount }}</span>
              <q-btn
                round
                color="black"
                icon="add"
                @click="counter.incrementHour"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          group="tripDetails"
          icon="perm_identity"
          label="Contact Information"
          header-class="text-black bg-grey-5"
        >
          <q-card flat bordered class="bg-grey-3 q-pa-sm">
            <q-card-section
              ><span class="text-bold text-lg"
                >Passenger Information</span
              ></q-card-section
            >
            <q-card-section class="row q-gutter-md">
              <q-input
                bg-color="white"
                class="col"
                outlined
                label="First Name"
                v-model="firstName"
                dense
              />
              <q-input
                bg-color="white"
                class="col"
                outlined
                label="Last Name"
                v-model="lastName"
                dense
              />
            </q-card-section>
            <q-card-section class="row q-gutter-md">
              <q-input
                bg-color="white"
                class="col"
                outlined
                label="Email"
                type="email"
                v-model="email"
                dense
              />
              <q-input
                bg-color="white"
                class="col"
                outlined
                label="Phone Number"
                type="tel"
                v-model="phone"
                dense
                mask="(###) ### - ####"
                fill-mask
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          group="tripDetails"
          icon="more"
          label="Additional Information"
          header-class="text-black bg-grey-5"
        >
          <q-card flat bordered class="bg-grey-3 q-pa-sm">
            <q-card-section
              ><span class="text-bold text-lg"
                >Additional Information</span
              ></q-card-section
            >
            <q-card-section>
              <div class="row q-gutter-sm">
                <q-select
                  v-model="passengerCount"
                  label="Passenger Count"
                  :options="prefs.selectNumbers"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                />

                <q-select
                  v-model="luggageCount"
                  label="Luggage Count"
                  :options="prefs.selectNumbers"
                  bg-color="white"
                  class="col"
                  outlined
                  dense
                />
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn
                @click="quote.addQuote"
                size="md"
                color="primary"
                label="Save Booking"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>

    <!-- Column Two -->
    <q-card class="bg-white col" flat>
      <q-list class="bg-white space-y-2">
        <q-expansion-item
          group="summary"
          icon="event"
          label="Booking Summary"
          header-class="text-black bg-grey-5"
          v-model="isClosed"
        >
          <q-card class="bg-grey-3" bordered>
            <q-card-section>
              <div v-show="true" class="h-64 w-full" id="map" ref="myMap"></div>
            </q-card-section>
            <q-card-section v-if="selectedDestinationAddress">
              <div class="row">
                <p class="col">
                  Service Type:
                  <span class="text-bold">{{ selectedServiceType }}</span>
                </p>
                <p class="col">
                  Time & Distance:
                  <span class="text-bold"
                    >{{ routeDuration }} / {{ routeDistance }}</span
                  >
                </p>
              </div>
              <p>
                Pickup Location:
                <span class="text-bold">{{ selectedOriginAddress }}</span>
              </p>
              <p>
                Drop-Off Location:
                <span class="text-bold">{{ selectedDestinationAddress }}</span>
              </p>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          group="summary"
          icon="paid"
          label="Cost Summary"
          header-class="text-black bg-grey-5"
          v-model="isOpen"
        >
          <q-card class="bg-grey-3 col" bordered>
            <q-card-section>
              <q-list>
                <q-item
                  v-if="store.selectedServiceType === 'Hourly'"
                  tag="label"
                  v-for="option in options"
                  :key="option.id"
                >
                  <q-item-section avatar>
                    <q-radio
                      v-model="vehicle"
                      :val="option.value"
                      color="primary"
                      :name="option.value"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                    <q-item-label caption>{{ option.caption }}</q-item-label>
                  </q-item-section>
                  <q-item-section side class="text-bold"
                    >$ {{ option.hourlyCost.toFixed(2) }}</q-item-section
                  >
                </q-item>
                <q-item
                  v-if="store.selectedServiceType !== 'Hourly'"
                  tag="label"
                  v-for="option in options"
                  :key="option.id"
                >
                  <q-item-section avatar>
                    <q-radio
                      v-model="vehicle"
                      :val="option.value"
                      color="primary"
                      :name="option.value"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                    <q-item-label caption>{{ option.caption }}</q-item-label>
                  </q-item-section>
                  <q-item-section side class="text-bold"
                    >$ {{ option.cost.toFixed(2) }}</q-item-section
                  >
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-form>

  <Alert message="Your Quote Has Been Saved" :myAlert="store.myAlert" />
</template>

<script setup>
import { Loader } from '@googlemaps/js-api-loader'
import { useMap } from '../stores/useMap'
import { storeToRefs } from 'pinia'
import { useQuote } from '../stores/useQuote'
import { useCounterStore } from '../stores/counter'
import { usePriceCalculator } from '../stores/usePriceCalculator'
import { usePrefs } from '../stores/usePrefs'

//TODO: Add price calculation function possible composable, add enable and disable buttons

const total = usePriceCalculator()
const counter = useCounterStore()
const quote = useQuote()
const store = useMap()
const prefs = usePrefs()

const {
  sedDistTotal,
  suvDistTotal,
  premSedanDistTotal,
  premSuvDistTotal,
  isOpen,
  isClosed,
  sedTimeTotal,
  suvTimeTotal,
  premSedanTimeTotal,
  premSuvTimeTotal,
} = storeToRefs(total)

const vehicle = $ref('sedan')

const options = $ref([
  {
    label: 'Sedan',
    value: 'sedan',
    id: 1,
    caption: 'Vehicles include Cadillac XTS or similar',
    cost: sedDistTotal,
    hourlyCost: sedTimeTotal,
    kmCost: 1.7,
    timeCost: 80,
    minKm: 25,
  },
  {
    label: 'SUV',
    value: 'suv',
    id: 2,
    caption: 'Vehicles include Chevy Suburban or similar',
    cost: suvDistTotal,
    hourlyCost: suvTimeTotal,
    kmCost: 2.75,
    timeCost: 105,
    minKm: 30,
  },
  {
    label: 'Premium Sedan',
    value: 'premium_sedan',
    id: 3,
    caption: 'Vehicles include Lincoln Continental or similar',
    cost: premSedanDistTotal,
    hourlyCost: premSedanTimeTotal,
    kmCost: 1.85,
    timeCost: 95,
    minKm: 25,
  },
  {
    label: 'Premium SUV',
    value: 'premium_suv',
    id: 4,
    caption: 'Vehicles include Lincoln Navigator or similar',
    cost: premSuvDistTotal,
    hourlyCost: premSuvTimeTotal,
    kmCost: 3,
    timeCost: 125,
    minKm: 29,
  },
  {
    label: '12 Van',
    value: 'van',
    id: 5,
    caption: 'Vehicles include Ford Transit or similar',
    cost: 0,
    hourlyCost: 0,
    kmCost: 0,
    timeCost: 0,
    minKm: 0,
  },
])

const loader = new Loader({
  apiKey: 'AIzaSyAHssosELrwwDVsFJUwVchowi-Asv65pow',
  libraries: ['places'],
  version: 'weekly',
  region: 'ca',
})
const myMap = $ref(null)
loader.load().then(() => {
  const map = new google.maps.Map(myMap, {
    mapTypeControl: false,
    center: { lat: 43.65107, lng: -79.347015 },
    zoom: 9,
  })

  new AutocompleteDirectionsHandler(map)
})

class AutocompleteDirectionsHandler {
  map
  originPlaceId
  destinationPlaceId
  travelMode
  directionsService
  directionsRenderer

  constructor(map) {
    this.map = map
    this.originPlaceId = ''
    this.destinationPlaceId = ''
    this.travelMode = google.maps.TravelMode.DRIVING
    this.directionsService = new google.maps.DirectionsService()
    this.directionsRenderer = new google.maps.DirectionsRenderer()
    this.directionsRenderer.setMap(map)

    originInput.value = document.getElementById('origin-input')
    originAutocomplete.value = new google.maps.places.Autocomplete(
      originInput.value
    )
    // Specify just the place data fields that you need.
    originAutocomplete.value.setFields(['all'])
    this.setupPlaceChangedListener(originAutocomplete.value, 'ORIG')

    destinationInput.value = document.getElementById('destination-input')
    destinationAutocomplete.value = new google.maps.places.Autocomplete(
      destinationInput.value
    )
    // Specify just the place data fields that you need.
    destinationAutocomplete.value.setFields(['all'])
    this.setupPlaceChangedListener(destinationAutocomplete.value, 'DEST')
  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo('bounds', this.map)
    autocomplete.addListener('place_changed', () => {
      place.value = autocomplete.getPlace()

      if (!place.value.place_id) {
        window.alert('Please select an option from the dropdown list.')
        return
      }

      if (mode === 'ORIG') {
        this.originPlaceId = place.value.place_id
      } else {
        this.destinationPlaceId = place.value.place_id
      }
      this.route()
    })
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return
    }

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response)
          routeDistance.value = response.routes[0].legs[0].distance.text
          routeDuration.value = response.routes[0].legs[0].duration.text
          selectedOriginAddress.value = response.routes[0].legs[0].start_address
          selectedDestinationAddress.value =
            response.routes[0].legs[0].end_address
          console.log(response.routes)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      }
    )
  }
}

const {
  luggageCount,
  passengerCount,
  date,
  selectedServiceType,
  selectedOriginAddress,
  selectedDestinationAddress,
  originInput,
  destinationInput,
  originAutocomplete,
  destinationAutocomplete,
  place,
  routeDistance,
  routeDuration,
  firstName,
  lastName,
  email,
  phone,
} = storeToRefs(store)
</script>
