import { defineStore, acceptHMRUpdate } from 'pinia'
import { saveData } from '../firebase'
import { usePrefs } from './usePrefs'

export const useAccounts = defineStore({
  id: 'accounts',
  state: () => ({
    selectedAccountType: 'coprorate',
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyNotes: '',
    companyPaymentMethod: '',
    companyPaymentTerms: '',
    companyPaymentInfo: '',

    individualPrefix: '',
    individualFirstName: '',
    individualLastName: '',
    individualEmail: '',
    individualPhone: '',
    individualNotes: '',

    selectedContactType: [],
    selectedContactNamePrefix: '',
    contactFirstName: '',
    contactLastName: '',
    contactPhone: '',
    contactEmail: '',
    contactNotes: '',
    contactAddFinancialDetails: false,
    contactPaymentMethod: '',
    contactPaymentTerms: '',
    contactPaymentInfo: '',
  }),
  actions: {
    addAccount() {
      const prefs = usePrefs()
      const path = 'accounts/account_number/' + prefs.accountNumber
      const accountInfo = {
        company_name: this.companyName,
        company_address: this.companyAddress,
        billing_contact: this.billingContact,
        selected_name_prefix: this.selectedNamePrefix,
        booking_first_name: this.bookingFirstName,
        booking_last_name: this.bookingLastName,
        booking_phone: this.bookingPhone,
        booking_email: this.bookingEmail,
        account_notes: this.accountNotes,
        payment_method: this.paymentMethod,
        payment_terms: this.paymentTerms,
        payment_info: this.paymentInfo,
      }
      saveData(path, accountInfo)
      prefs.accountNumber++
      saveData('account_number', prefs.accountNumber)
      this.$reset()
    },

    deleteAccount() {},

    updateAccount() {},

    getAccount() {},
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccounts, import.meta.hot))
}
