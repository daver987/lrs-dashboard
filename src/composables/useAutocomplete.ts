import { Loader } from '@googlemaps/js-api-loader'

const useAutocomplete = async ({
  myMap,
  originInput,
  destinationInput,
  selectedOriginAddress,
  selectedDestinationAddress,
}: {
  myMap: HTMLElement
  originInput: string
  destinationInput: string
  selectedOriginAddress: string
  selectedDestinationAddress: string
}) => {
  const loader = new Loader({
    apiKey: 'AIzaSyAHssosELrwwDVsFJUwVchowi-Asv65pow',
    libraries: ['places'],
    version: 'weekly',
    region: 'ca',
  })

  loader.load().then(() => {
    const map = new google.maps.Map(myMap, {
      mapTypeControl: false,
      center: { lat: 43.65107, lng: -79.347015 },
      zoom: 9,
    })

    new AutocompleteDirectionsHandler(map)
  })

  class AutocompleteDirectionsHandler {
    map
    place
    originPlaceId
    destinationPlaceId
    travelMode
    directionsService
    directionsRenderer
    originInput
    originAutocomplete
    results
    destinationInput
    destinationAutocomplete
    private routeDistance: string
    private routeDuration: string

    constructor(map) {
      this.map = map
      this.originPlaceId = ''
      this.destinationPlaceId = ''
      this.travelMode = google.maps.TravelMode.DRIVING
      this.directionsService = new google.maps.DirectionsService()
      this.directionsRenderer = new google.maps.DirectionsRenderer()
      this.directionsRenderer.setMap(map)

      this.originInput = document.getElementById(originInput)
      this.originAutocomplete = new google.maps.places.Autocomplete(
        this.originInput
      )
      // Specify just the place data fields that you need.
      this.originAutocomplete.setFields(['all'])
      this.setupPlaceChangedListener(this.originAutocomplete, 'ORIG')

      // this.setupPlaceChangedListener(this.originAutocomplete, 'ORIG')

      this.destinationInput = document.getElementById(destinationInput)
      this.destinationAutocomplete = new google.maps.places.Autocomplete(
        this.destinationInput
      )
      // Specify just the place data fields that you need.
      this.destinationAutocomplete.setFields(['all'])
      this.setupPlaceChangedListener(this.destinationAutocomplete, 'DEST')
    }

    setupPlaceChangedListener(autocomplete, mode) {
      autocomplete.bindTo('bounds', this.map)
      autocomplete.addListener('place_changed', () => {
        this.place = autocomplete.getPlace()

        if (!this.place.place_id) {
          window.alert('Please select an option from the dropdown list.')
          return
        }

        if (mode === 'ORIG') {
          this.originPlaceId = this.place.place_id
        } else {
          this.destinationPlaceId = this.place.place_id
        }
        this.route()
      })
    }

    route() {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return
      }

      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response)
            this.routeDistance = response.routes[0].legs[0].distance.text
            this.routeDuration = response.routes[0].legs[0].duration.text
            selectedOriginAddress = response.routes[0].legs[0].start_address
            selectedDestinationAddress = response.routes[0].legs[0].end_address
            console.log(response.routes)
          } else {
            window.alert('Directions request failed due to ' + status)
          }
          return (this.results = response)
        }
      )
    }
  }
}

export { useAutocomplete }
