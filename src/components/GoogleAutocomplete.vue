<template>
  <q-form
    @submit.prevent="total.priceCalculator"
    @reset="onReset"
    class="row q-gutter-md q-pa-sm"
  >
    <q-expansion-item
      group="tripDetails"
      icon="explore"
      label="Trip Details"
      default-opened
      header-class="text-black bg-grey-5"
      class="col"
      dense-toggle
    >
      <q-card bordered flat class="bg-grey-3 q-pa-sm">
        <q-card-section class="row q-gutter-sm">
          <q-select
            label="Service Type"
            :options="prefs.serviceType"
            v-model="selectedServiceType"
            outlined
            bg-color="white"
            class="col"
            dense
            hide-bottom-space
          >
          </q-select>

          <q-input
            v-model="date"
            bg-color="white"
            class="col"
            outlined
            hide-bottom-space
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section class="row q-gutter-sm">
          <q-input
            bg-color="white"
            class="col"
            outlined
            label="Client Name"
            v-model="firstName"
            dense
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section class="row q-gutter-sm">
          <label for="origin-input" class="sr-only">Pickup Address</label>
          <input
            ref="origin-input"
            name="origin-input"
            type="text"
            id="origin-input"
            class="rounded-md border-gray-300 shadow-sm w-full p-2 block sm:text-sm focus:border-gray-500 focus:ring-gray-500"
            autocomplete="address"
            v-model="selectedOriginAddress"
          />
        </q-card-section>
        <q-card-section
          class="row q-gutter-sm"
          v-show="selectedServiceType !== 'Hourly'"
        >
          <label for="destination-input" class="sr-only"
            >Drop-Off Address</label
          >
          <input
            name="destination-input"
            type="text"
            id="destination-input"
            class="rounded-md border-gray-300 shadow-sm w-full p-2 block sm:text-sm focus:border-gray-500 focus:ring-gray-500"
            v-model="selectedDestinationAddress"
            autocomplete="address"
          />
        </q-card-section>

        <q-card-section
          class="row q-gutter-sm"
          v-if="selectedServiceType === 'Hourly'"
        >
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
        <q-card-section class="row q-gutter-sm">
          <q-select
            v-model="passengerCount"
            label="Passenger Count"
            :options="prefs.selectNumbers"
            bg-color="white"
            class="col"
            outlined
            dense
            hide-bottom-space
          />

          <q-select
            v-model="luggageCount"
            label="Luggage Count"
            :options="prefs.selectNumbers"
            bg-color="white"
            class="col"
            outlined
            dense
            hide-bottom-space
          />
        </q-card-section>
        <q-card-section class="row q-gutter-sm">
          <q-input
            name="trip-notes"
            type="textarea"
            for="trip-notes"
            outlined
            bg-color="white"
            class="col"
            v-model="tripNotes"
            label="Trip Notes"
            dense
            hide-bottom-space
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- Column Two -->

    <q-expansion-item
      group="summary"
      icon="event"
      label="Booking Summary"
      header-class="text-black bg-grey-5"
      v-model="isClosed"
      class="col"
      dense-toggle
    >
      <q-card class="bg-grey-3" bordered>
        <q-card-section class="row q-gutter-sm">
          <div v-show="true" class="h-48 w-full" id="map" ref="myMap"></div>
        </q-card-section>
        <q-card-section
          class="flex-center py-0"
          v-if="selectedDestinationAddress"
        >
          <div class="w-full row">
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

        <q-card-section>
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
            <q-item-section dense avatar>
              <q-radio
                v-model="vehicle"
                :val="option.value"
                color="primary"
                :name="option.value"
                dense
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
        </q-card-section>
        <div class="row q-pa-md q-gutter-md">
          <q-btn
            unelevated
            label="Get Rate"
            type="submit"
            size="md"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            size="md"
            color="primary"
            outline
            @click="store.$reset()"
          />
        </div>
      </q-card>
    </q-expansion-item>
  </q-form>

  <Alert message="Your Quote Has Been Saved" :myAlert="store.myAlert" />
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { useMap } from '@/stores/useMap'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { usePriceCalculator } from '@/stores/usePriceCalculator'
import { data } from '@/data/useData'
import { ref } from 'vue'

//TODO: Add price calculation function possible composable, add enable and disable buttons

const total = usePriceCalculator()
const counter = useCounterStore()
const store = useMap()
const prefs = data()
const onReset = () => {
  total.$reset()
  store.$reset()
}

const {
  sedDistTotal,
  suvDistTotal,
  premSedanDistTotal,
  premSuvDistTotal,
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
    minKm: 25,
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
    minKm: 25,
  },
])

const {
  originInput,
  originAutocomplete,
  destinationAutocomplete,
  destinationInput,
  luggageCount,
  passengerCount,
  date,
  selectedServiceType,
  selectedOriginAddress,
  selectedDestinationAddress,
  place,
  routeDistance,
  routeDuration,
  firstName,
  tripNotes,
} = storeToRefs(store)

const myMap = ref<HTMLElement>(null)
const mapKey: string = import.meta.env.VITE_MAPS_KEY as string
const loader = new Loader({
  apiKey: mapKey,
  libraries: ['places'],
  version: 'weekly',
  region: 'ca',
})
loader.load().then(() => {
  const map = new google.maps.Map(myMap.value, {
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
      originInput.value as HTMLInputElement
    )
    // Specify just the place data fields that you need.
    originAutocomplete.value.setFields(['all'])
    this.setupPlaceChangedListener(originAutocomplete.value, 'ORIG')

    destinationInput.value = document.getElementById('destination-input')
    destinationAutocomplete.value = new google.maps.places.Autocomplete(
      destinationInput.value as HTMLInputElement
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
</script>
