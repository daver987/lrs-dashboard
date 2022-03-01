import { addDoc, collection } from 'firebase/firestore'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useMap } from './useMap'
import { useCounterStore } from '../stores/counter'
import { db } from '../firebase'
import { ref, set } from 'firebase/database'

export const useQuote = defineStore({
  id: 'quote',
  state: () => ({}),

  actions: {
    async addQuote() {
      const getQuote = useMap()
      const counter = useCounterStore()
      const myQuote = {
        quote_number: counter.quoteNumber,
        service_type: getQuote.selectedServiceType,
        pickup_day: getQuote.date,
        pickup_time: getQuote.date,
        pickup_address: getQuote.selectedOriginAddress,
        drop_off_address: getQuote.selectedDestinationAddress,
        pax_count: getQuote.passengerCount,
        lug_count: getQuote.luggageCount,
        route_distance: getQuote.routeDistance,
        route_duration: getQuote.routeDuration,
      }
      try {
        const docRef = await addDoc(collection(db, 'quotes'), myQuote)
        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    },
    async getQuote() {
      // const docRef = collection(db, 'quotes')
      const q = query(collection(db, 'quotes'))
      const querySnapshot = await getDocs(q)
      // querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(querySnapshot)
      // })
      // if (docSnap.exists()) {
      //   console.log('Document data:', docSnap.data())
      // } else {
      //   // doc.data() will be undefined in this case
      //   console.log('No such document!')
      // }
    },
    async writeUserData() {
      const database = db
      const getQuote = useMap()
      const counter = useCounterStore()
      const myQuote = {
        quote_number: getQuote.quoteNumber,
        service_type: getQuote.selectedServiceType,
        pickup_day: getQuote.date,
        pickup_time: getQuote.date,
        pickup_address: getQuote.selectedOriginAddress,
        drop_off_address: getQuote.selectedDestinationAddress,
        pax_count: getQuote.passengerCount,
        lug_count: getQuote.luggageCount,
        route_distance: getQuote.routeDistance,
        route_duration: getQuote.routeDuration,
      }
      await set(
        ref(database, 'quotes/quote_number/' + getQuote.quoteNumber),
        myQuote
      )
      counter.quoteNumber++
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuote, import.meta.hot))
}
