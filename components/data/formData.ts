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
  | 'flightNumber';
export type ReservationDataTypes = {};

export type FormDataVariables = {
  [Key in FormDataAttributes]: string;
} & {
  checked: boolean
  paymentMethod: string
  step?: string;
  coordinates: Coordinates;
};
export type Coordinates = {
  fromCoordinates: Array<number> | null;
  toCoordinates: Array<number> | null;
};

export type Details = {
  img: string;
  name: string;
  person: number;
  luggage: number;
  initialPrice: number;
  extraPrice: number;
};

export const useReservationData = () => {
  const { $t } = useLanguage()
  return [
    {
      step: $t('reservation.step-1')
    },
    {
      step: $t('reservation.step-2')
    },
    {
      step: $t('reservation.step-3')
    },
    {
      step: $t('reservation.step-4')
    }
  ]
}

export const details: Details[] = [
  {
    img: '/images/sedan.png',
    name: 'Economy Sedan',
    person: 4,
    luggage: 3,
    initialPrice: 590,
    extraPrice: 0
  },
  {
    img: '/images/minivan.png',
    name: 'Economy Minivan',
    person: 8,
    luggage: 7,
    initialPrice: 990,
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
  checked: '',
  coordinates: {
    fromCoordinates: [],
    toCoordinates: []
  }
}
