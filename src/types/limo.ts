export type ServiceType = 'distance' | 'hourly' | 'flat_rate';

export type VehicleCategory = 'ALL' | 'SUV_VIP' | 'EXECUTIVE' | 'ELECTRIC';

export interface VehicleDetailSection {
  titleEn: string;
  titleFr: string;
  contentEn: string;
  contentFr: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  categoryLabelEn: string;
  categoryLabelFr: string;
  hourlyRate?: number;
  dailyRate?: number;
  flatAirportRate?: number;
  passengers: number;
  luggage: number;
  color: string;
  image: string; // Transparent PNG showcase
  galleryImages: string[]; // Interior & exterior real client photos
  taglineEn: string;
  taglineFr: string;
  overviewEn: string;
  overviewFr: string;
  featuresEn: string[];
  featuresFr: string[];
  detailSections: VehicleDetailSection[];
  servicesOfferedEn: string[];
  servicesOfferedFr: string[];
  popularForEn: string;
  popularForFr: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleFr: string;
  subtitleEn: string;
  subtitleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  image: string;
  featuresEn: string[];
  featuresFr: string[];
}

export interface CityDestination {
  id: string;
  name: string;
  region: string;
  country: string;
  airportCode: string;
  popularRoutesEn: string[];
  popularRoutesFr: string[];
  image: string;
  descriptionEn: string;
  descriptionFr: string;
}

export interface BookingState {
  serviceType: ServiceType;
  pickupAddress: string;
  dropoffAddress: string;
  hours?: number;
  tripType: 'one_way' | 'round_trip';
  date: string;
  timeHour: string;
  timeMinute: string;
  timePeriod: 'AM' | 'PM';
  selectedVehicleId: string;
  passengers: number;
  luggage: number;
}
