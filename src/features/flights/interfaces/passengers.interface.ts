export interface IPassengers {
  adults: number;
  children: number;
  infants: number;
}

export type TypePassenger = 'adults' | 'children' | 'infants';

export type TypePassengerCountOperation = 'increment' | 'decrement';
