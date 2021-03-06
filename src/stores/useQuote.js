import { defineStore, acceptHMRUpdate } from 'pinia'
import { useMap } from './useMap'
import { useCounterStore } from '../stores/counter'
import { saveData } from '../firebase'

export const useQuote = defineStore({
  id: 'quote',

  state: () => ({}),

  actions: {
    async addQuote() {
      const getQuote = useMap()
      const counter = useCounterStore()
      const quotes = 'quotes/quote_number/' + counter.quoteNumber

      const myQuote = {
        quote_number: counter.quoteNumber,
        service_type: getQuote.selectedServiceType,
        pickup_day: getQuote.date,
        pickup_time: getQuote.date,
        pickup_address: getQuote.selectedOriginAddress,
        drop_off_address: getQuote.selectedDestinationAddress,
        pax_count: getQuote.selectedPassengerCount,
        lug_count: getQuote.selectedLuggageCount,
        route_distance: getQuote.routeDistance,
        route_duration: getQuote.routeDuration,
      }
      saveData(quotes, myQuote)
      counter.quoteNumber++
      getQuote.openDialog()
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuote, import.meta.hot))
}
