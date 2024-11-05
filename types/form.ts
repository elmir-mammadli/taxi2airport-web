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

export type FormDataVariables = {
  [Key in FormDataAttributes]: string
} & {
  checked: boolean
  paymentMethod: string
  finalPrice: number
  step?: string
  coordinates: Coordinates
};
export interface Coordinates {
  fromCoordinates: Array<number> | null
  toCoordinates: Array<number> | null
};

export interface Details {
  img: string
  name: string
  person: number
  luggage: number
  initialPrice: number
  extraPrice: number
};
