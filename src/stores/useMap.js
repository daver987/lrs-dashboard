import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMap = defineStore({
  id: 'map',
  state: () => {
    return {
      selectedServiceType: '',

      selectedVehicleType: '',

      luggageCount: 1,
      selectedLuggageCount: '',

      passengerCount: 1,
      selectedPassengerCount: '',

      selectedHourCount: '',

      selectedTripStatus: '',

      pickupDate: '',
      selectedPickupDate: '',

      pickupTime: '',
      selectedPickupTime: '',

      tripNotes: '',

      locationDescription: '',

      pickupAddress: '',
      selectedOriginAddress: '',
      originAutocomplete: null,

      dropOffAddress: '',
      selectedDestinationAddress: '',
      destinationAutocomplete: null,

      date: null,

      originInput: '',

      destinationInput: '',
      place: null,
      results: null,
      routeDistance: null,
      routeDuration: null,
      show: false,
      myAlert: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  },
  actions: {
    formReset() {
      this.passengerCount = 1
      this.luggageCount = 1
    },
    increment() {
      this.quoteNumber++
    },
    incrementPax() {
      this.passengerCount++
    },
    showMap() {
      this.show = !this.show
    },
    openDialog() {
      this.myAlert = !this.myAlert
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMap, import.meta.hot))
}
