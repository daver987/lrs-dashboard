import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMap = defineStore({
  id: 'map',
  state: () => {
    return {
      serviceType: ['To Airport', 'From Airport', 'Point To Point', 'Hourly'],
      selectedServiceType: '',

      vehicleType: [
        'Sedan',
        'SUV',
        'Premium Sedan',
        'Premium SUV',
        '12 Passenger Van',
      ],
      selectedVehicleType: '',

      selectNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      selectedLuggageCount: '',
      selectedPassengerCount: '',
      selectedHourCount: '',

      tripStatus: ['Unasigned', 'Assigned', 'Done'],
      selectedTripStatus: '',

      selectedOriginAddress: '',
      selectedDestinationAddress: '',
      destinationAutocomplete: null,
      passengerCount: 1,
      luggageCount: 1,
      date: null,
      pickupAddress: '',
      originInput: '',
      originAutocomplete: null,
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
