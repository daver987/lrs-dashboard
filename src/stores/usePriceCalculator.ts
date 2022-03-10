import { defineStore, acceptHMRUpdate } from 'pinia'
import { useMap } from '@/stores/useMap'
import { data } from '@/data/useData'

export const usePriceCalculator = defineStore({
  id: 'priceCalculator',

  state: () => ({
    sedDistTotal: 0,
    suvDistTotal: 0,
    sedTimeTotal: 0,
    suvTimeTotal: 0,
    premSedanDistTotal: 0,
    premSedanTimeTotal: 0,
    premSuvDistTotal: 0,
    premSuvTimeTotal: 0,
    distance: 0,
    time: 0,
    isOpen: false,
    isClosed: true,
  }),

  actions: {
    priceCalculator() {
      const prefs = data()
      const mapStore = useMap()

      this.distance = mapStore.routeDistance.match(/[+-]?\d+(\.\d+)?/g)
      this.time = mapStore.routeDuration.match(/\d+/)

      if (this.distance < 25) {
        this.sedDistTotal = prefs.hourlyCost.sedan
      } else {
        this.sedDistTotal =
          prefs.kmCost.sedan * this.distance - 25 + prefs.hourlyCost.sedan
      }
      if (60 / this.time > 1) {
        this.sedTimeTotal = prefs.hourlyCost.sedan * 2
      } else {
        this.sedTimeTotal = (prefs.hourlyCost.sedan * this.time) / 60
      }
      if (this.distance < 30) {
        this.suvDistTotal = prefs.hourlyCost.suv
      } else {
        this.suvDistTotal =
          prefs.kmCost.suv * this.distance - 30 + prefs.hourlyCost.suv
      }
      if (60 / this.time > 1) {
        this.suvTimeTotal = prefs.hourlyCost.suv * 2
      } else {
        this.suvTimeTotal = (prefs.hourlyCost.suv * this.time) / 60
      }
      if (this.distance < 25) {
        this.premSedanDistTotal = prefs.hourlyCost.premSedan
      } else {
        this.premSedanDistTotal =
          prefs.kmCost.premSedan * this.distance -
          25 +
          prefs.hourlyCost.premSedan
      }
      if (60 / this.time > 1) {
        this.premSedanTimeTotal = prefs.hourlyCost.premSedan * 2
      } else {
        this.premSedanTimeTotal = (prefs.hourlyCost.premSedan * this.time) / 60
      }
      if (this.distance < 29) {
        this.premSuvDistTotal = prefs.hourlyCost.premSuv
      } else {
        this.premSuvDistTotal =
          prefs.kmCost.premSuv * this.distance - 29 + prefs.hourlyCost.premSuv
      }
      if (60 / this.time > 1) {
        this.premSuvTimeTotal = prefs.hourlyCost.premSuv * 2
      } else {
        this.premSuvTimeTotal = (prefs.hourlyCost.premSuv * this.time) / 60
      }
      this.isOpen = true
      this.isClosed = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePriceCalculator, import.meta.hot))
}
