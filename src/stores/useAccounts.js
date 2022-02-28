import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAccounts = defineStore({
  id: 'accounts',
  state: () => ({
    accountNumber: '',
    companyName: '',
    billingContact: '',
    passengerFirstName: '',
    passengerLastName: '',
    passengerEmail: '',
    passengerPhoneNumber: '',
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccounts, import.meta.hot))
}
