export type Currency = 'czk' | 'eur';
export interface DataPopularDestinationsTypes {
  id: number;
  name: string;
  coordinates: Array<number>;
  finalPrice: Record<Currency, number>;
}
