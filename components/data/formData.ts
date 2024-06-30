/* eslint-disable no-use-before-define */

export type FormDataAttributes =
  | 'from'
  | 'to'
  | 'formattedDate'
  | 'formatTime'
  | 'passengers'
  | 'luggage'
  | 'selectedCar'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'phoneNumber'
  | 'flightNumber'
export type ReservationDataTypes = {}

export type FormDataVariables = {
  [Key in FormDataAttributes]: string
} & {
  checked: boolean
  paymentMethod: string
  finalPrice: number
  step?: string
  coordinates: Coordinates
};
export type Coordinates = {
  fromCoordinates: Array<number> | null
  toCoordinates: Array<number> | null
};

export type Details = {
  img: string
  name: string
  person: number
  luggage: number
  initialPrice: number
  extraPrice: number
};

export const logos: {
  logo: string;
}[] = [
  {
    logo: 'ri:visa-line'
  },
  {
    logo: 'ri:mastercard-fill'
  },
  {
    logo: 'simple-icons:applepay'
  },
  {
    logo: 'cib:google-pay'
  }
]

export const reservationsData: {
  step: string;
}[] = [
  {
    step: 'reservation.step-1'
  },
  {
    step: 'reservation.step-2'
  },
  {
    step: 'reservation.step-3'
  },
  {
    step: 'reservation.step-4'
  }
]

export const details: Details[] = [
  {
    img: '/images/sedan.png',
    name: 'Economy Sedan',
    person: 4,
    luggage: 3,
    initialPrice: 35,
    extraPrice: 0
  },
  {
    img: '/images/minivan.png',
    name: 'Economy Minivan',
    person: 8,
    luggage: 7,
    initialPrice: 45,
    extraPrice: 0
  }
]

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
  paymentMethod: '',
  finalPrice: 0,
  checked: false,
  coordinates: {
    fromCoordinates: [],
    toCoordinates: []
  }
}
