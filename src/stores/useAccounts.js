import { defineStore, acceptHMRUpdate } from 'pinia'
import { saveData } from '../firebase'
import { usePrefs } from './usePrefs'
// import { addDoc, getDocs } from 'firebase/firestore'

export const useAccounts = defineStore({
  id: 'accounts',
  state: () => ({
    selectedAccountType: 'coprorate',
    combinedContactAccountNumber: null,
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
    individualAddress: '',
    individualEmail: '',
    individualPhone: '',
    individualNotes: '',
    individualCompanyName: '',

    selectedContactType: [],
    selectedContactNamePrefix: '',
    contactFirstName: '',
    contactLastName: '',
    contactPhone: '',
    contactEmail: '',
    contactNotes: '',
    contactPaymentMethod: '',
    contactPaymentTerms: '',
    contactPaymentInfo: '',
    contactAddFinancialDetails: false,
    billingContact: '',
    accountInfo: {},
    contactInfo: {},
  }),
  actions: {
    addAccount() {
      const prefs = usePrefs()
      const accountPath = 'accounts/' + prefs.accountNumber
      const contactPath =
        'accounts/' +
        prefs.accountNumber +
        '/contacts/' +
        prefs.contactAccountNumber

      if (this.selectedAccountType === 'coprorate') {
        this.accountInfo = {
          account_type: this.selectedAccountType,
          company_account_number: prefs.accountNumber,
          company_name: this.companyName,
          company_address: this.companyAddress,
          company_phone: this.companyPhone,
          company_email: this.companyEmail,
          company_notes: this.companyNotes,
          company_payment_method: this.companyPaymentMethod,
          company_payment_terms: this.companyPaymentTerms,
          company_payment_info: this.companyPaymentInfo,
        }
        this.combinedContactAccountNumber =
          prefs.contactAccountNumber + '-' + prefs.accountNumber
        this.contactInfo = {
          contact_account_number: prefs.contactAccountNumber,
          contact_type: this.selectedContactType,
          contact_name_prefix: this.selectedContactNamePrefix,
          contact_first_name: this.contactFirstName,
          contact_last_name: this.contactLastName,
          contact_phone: this.contactPhone,
          contact_email: this.contactEmail,
          contact_notes: this.contactNotes,
        }
        saveData(accountPath, this.accountInfo)
        saveData(contactPath, this.contactInfo)
        prefs.accountNumber++
        prefs.contactAccountNumber++
        saveData('prefs/account_number/', prefs.accountNumber)
        saveData('prefs/contact_account_number/', prefs.accountNumber)
        this.$reset()
      } else {
        this.individualCompanyName =
          this.individualPrefix +
          ' ' +
          this.individualFirstName +
          ' ' +
          this.individualLastName
        this.accountInfo = {
          account_type: this.selectedAccountType,
          company_name: this.individualCompanyName,
          company_address: this.individualAddress,
          company_phone: this.individualPhone,
          company_email: this.individualEmail,
          company_notes: this.individualNotes,
          company_payment_method: this.companyPaymentMethod,
          company_payment_terms: this.companyPaymentTerms,
          company_payment_info: this.companyPaymentInfo,
        }
        this.combinedContactAccountNumber =
          prefs.contactAccountNumber + '-' + prefs.accountNumber
        this.contactInfo = {
          contact_account_number: prefs.contactAccountNumber,
          contact_type: this.selectedContactType,
          contact_name_prefix: this.individualPrefix,
          contact_first_name: this.individualFirstName,
          contact_last_name: this.individualLastName,
          contact_phone: this.individualPhone,
          contact_email: this.individualEmail,
          contact_notes: this.individualNotes,
        }
        saveData(accountPath, this.accountInfo, this.contactInfo)
        prefs.accountNumber++
        prefs.contactAccountNumber++
        saveData('prefs/account_number/', prefs.accountNumber)
        saveData('prefs/contact_account_number/', prefs.contactAccountNumber)
        this.$reset()
      }
    },

    deleteAccount() {},

    updateAccount() {},

    getAccount() {},
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccounts, import.meta.hot))
}
