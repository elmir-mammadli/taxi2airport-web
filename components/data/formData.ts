export type FormDataAttributes = 'from' | 'to' | 'formattedDate' | 'formatTime' | 'passengers' | 'luggage' | 'selectedCar' | 'email' | 'firstName' | 'lastName' | 'phoneNumber' | 'flightNumber'

export type FormDataVariables = {
    [Key in FormDataAttributes]: string   
} & {
    checked: boolean
    coordinates: Coordinates
}
export type Coordinates = {
    fromCoordinates: Array<number> | null
    toCoordinates: Array<number> | null
}

export const formData: FormDataVariables = {
    from: '',
    to: '',
    formattedDate: '',
    formatTime: '',
    passengers: '',
    luggage: '',
    selectedCar: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    flightNumber: '',
    checked: false,
    coordinates: {
        fromCoordinates: [],
        toCoordinates: []
    }
  }