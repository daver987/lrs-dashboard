import { defineStore, acceptHMRUpdate } from 'pinia'
import { useMap } from './useMap'

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
  }),

  actions: {
    priceCalculator() {
      const hourlyCost = {
        sedan: 80,
        suv: 105,
        premSedan: 95,
        premSuv: 125,
      }
      const kmCost = { sedan: 1.7, suv: 2.5, premSedan: 1.8, premSuv: 2.8 }
      const mapStore = useMap()
      this.distance = mapStore.routeDistance.match(/[+-]?\d+(\.\d+)?/g)
      this.time = mapStore.routeDuration.match(/\d+/)

      if (this.distance < 25) {
        this.sedDistTotal = hourlyCost.sedan
      } else {
        this.sedDistTotal = kmCost.sedan * this.distance
      }
      if (60 / this.time > 1) {
        this.sedTimeTotal = hourlyCost.sedan * 2
      } else {
        this.sedTimeTotal = (hourlyCost.sedan * this.time) / 60
      }
      if (this.distance < 25) {
        this.suvDistTotal = hourlyCost.suv
      } else {
        this.suvDistTotal = kmCost.suv * this.distance
      }
      if (60 / this.time > 1) {
        this.suvTimeTotal = hourlyCost.suv * 2
      } else {
        this.suvTimeTotal = (hourlyCost.suv * this.time) / 60
      }
      if (this.distance < 25) {
        this.premSedanDistTotal = hourlyCost.premSedan
      } else {
        this.premSedanDistTotal = kmCost.premSedan * this.distance
      }
      if (60 / this.time > 1) {
        this.premSedanTimeTotal = hourlyCost.premSedan * 2
      } else {
        this.premSedanTimeTotal = (hourlyCost.premSedan * this.time) / 60
      }
      if (this.distance < 25) {
        this.premSuvDistTotal = hourlyCost.premSuv
      } else {
        this.premSuvDistTotal = kmCost.premSuv * this.distance
      }
      if (60 / this.time > 1) {
        this.premSuvTimeTotal = hourlyCost.premSuv * 2
      } else {
        this.premSuvTimeTotal = (hourlyCost.premSuv * this.time) / 60
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePriceCalculator, import.meta.hot))
}
