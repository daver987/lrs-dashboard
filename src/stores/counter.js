import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    quoteNumber: null,
    accountNumber: '',
    hourCount: 1,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.quoteNumber++
    },
    incrementHour() {
      this.hourCount++
    },
    decrementHour() {
      this.hourCount--
    },
  },
})
