import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePrefs = defineStore({
  id: 'prefs',
  state: () => ({
    vehicleType: [
      'Sedan',
      'SUV',
      'Premium Sedan',
      'Premium SUV',
      '12 Passenger Van',
    ],
    serviceType: ['To Airport', 'From Airport', 'Point To Point', 'Hourly'],
    selectNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    tripStatus: ['Unasigned', 'Assigned', 'Done'],
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePrefs, import.meta.hot))
}
