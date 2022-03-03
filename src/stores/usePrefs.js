import { defineStore, acceptHMRUpdate } from 'pinia'
import { readData } from '../firebase'

export const usePrefs = defineStore({
  id: 'prefs',
  state: () => ({
    accountNumber: null,
    accountType: [
      {
        label: 'Coprorate',
        value: 'coprorate',
      },
      {
        label: 'Individual',
        value: 'individual',
      },
      {
        label: 'Sub Account',
        value: 'sub account',
      },
    ],
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
    hourlyCost: {
      sedan: 80,
      suv: 105,
      premSedan: 95,
      premSuv: 125,
    },
    kmCost: { sedan: 1.7, suv: 2.75, premSedan: 1.85, premSuv: 3 },
    namePrefix: ['Mr', 'Mrs', 'Ms'],
    paymentMethod: [
      'Cash',
      'Credit Card',
      'Debit Card',
      'Paypal',
      'E-Transfer',
    ],
    paymentTerms: ['On Completion', 'Net 15', 'Net 30', 'Net 60', 'Net 90'],
    tripType: ['In House', 'Farm In', 'Farm Out'],
  }),
  actions: {
    getAccountNumber() {
      const data = readData('account_number')
      this.accountNumber = data
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePrefs, import.meta.hot))
}
