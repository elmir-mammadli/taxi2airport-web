export interface DataPopularDestinationsTypes {
    id: number;
    name: string;
    coordinates: Array<number>
    finalPrice: number
}

export const popularDestinations: DataPopularDestinationsTypes[] = [
  {
    id: 1,
    name: 'Ceske Budějovice',
    coordinates: [14.4826, 48.973],
    finalPrice: 4100
  },
  {
    id: 2,
    name: 'Cesky Krumlov',
    coordinates: [14.3155, 48.8114],
    finalPrice: 4800
  },
  {
    id: 3,
    name: 'Karlovy Vary',
    coordinates: [12.8814, 50.2246],
    finalPrice: 3700
  },
  {
    id: 4,
    name: 'Karlstejn',
    coordinates: [14.1871, 49.9391],
    finalPrice: 1300
  },
  {
    id: 5,
    name: 'Konopiste',
    coordinates: [14.6548, 49.7755],
    finalPrice: 1450
  },
  {
    id: 6,
    name: 'Kutna Hora',
    coordinates: [15.2632, 49.9481],
    finalPrice: 2700
  },
  {
    id: 7,
    name: 'Spindleruv Mlyn',
    coordinates: [15.6082, 50.7257],
    finalPrice: 4350
  },
  {
    id: 8,
    name: 'Terezin',
    coordinates: [14.1507, 50.5144],
    finalPrice: 2100
  },
  {
    id: 9,
    name: 'Vienna',
    coordinates: [16.3766, 48.1852],
    finalPrice: 8600
  }
]
