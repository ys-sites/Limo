export type ServiceType = 'distance' | 'hourly' | 'flat_rate';

export type VehicleCategory = 'ALL' | 'SEDAN' | 'LUXURY' | 'LIMOUSINE' | 'SUV';

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  hourlyRate: number;
  dailyRate: number;
  flatAirportRate: number;
  passengers: number;
  luggage: number;
  image: string;
  tagline: string;
  features: string[];
  popularFor: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}

export interface CityDestination {
  id: string;
  name: string;
  country: string;
  airportCode: string;
  popularRoutes: string[];
  image: string;
  description: string;
}

export interface BookingState {
  serviceType: ServiceType;
  pickupAddress: string;
  dropoffAddress: string;
  hours: number;
  tripType: 'one_way' | 'round_trip';
  date: string;
  timeHour: string;
  timeMinute: string;
  timePeriod: 'AM' | 'PM';
  selectedVehicleId: string | null;
  passengers: number;
  luggage: number;
  flightNumber?: string;
  specialRequests?: string;
  passengerName?: string;
  passengerEmail?: string;
  passengerPhone?: string;
  promoApplied?: boolean;
}
