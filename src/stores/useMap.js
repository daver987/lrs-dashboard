import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMap = defineStore({
  id: 'map',
  state: () => {
    return {
      selectedServiceType: '',

      selectedVehicleType: '',

      luggageCount: 1,
      selectedLuggageCount: null,

      passengerCount: 1,
      selectedPassengerCount: null,

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

      routeDistance: null,
      routeDuration: null,
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
    incrementPax() {
      this.passengerCount++
    },
    openDialog() {
      this.myAlert = !this.myAlert
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMap, import.meta.hot))
}
