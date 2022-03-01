import { ref } from 'vue'

const distTotal = ref(0)
const timeTotal = ref(0)
export function usePricing(
  hourlyCost,
  distanceCost,
  time,
  distance,
  minDistance
) {
  if (distance < minDistance) {
    distTotal = hourlyCost
  } else {
    distTotal = distanceCost * distance - minDistance + hourlyCost
  }
  if (60 / time > 1) {
    timeTotal = hourlyCost * 2
  } else {
    timeTotal = (hourlyCost * time) / 60
  }
  return {
    distTotal,
    timeTotal,
  }
}
