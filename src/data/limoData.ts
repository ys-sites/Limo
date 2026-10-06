import { Vehicle, ServiceItem, CityDestination } from '../types/limo';

// Generated authentic high-fidelity assets
export const HERO_IMAGE = '/src/assets/images/hero_luxury_limo_cadillac_1791294116681.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'corporate-travel',
    title: 'Corporate travel',
    subtitle: 'Executive Business Transport',
    description: 'Discreet, punctual chauffeured transportation tailored for C-suite executives, financial roadshows, and board meetings. Equipped with high-speed Wi-Fi and quiet cabins.',
    image: '/src/assets/images/service_corporate_travel_1791294137972.jpg',
    features: ['Flight & itinerary monitoring', 'Confidential cabin environment', 'Dedicated chauffeur on standby', 'Bottled water & charging docks']
  },
  {
    id: 'airport-transfers',
    title: 'Airport transfers',
    subtitle: 'Commercial & FBO Aviation',
    description: 'With real-time flight tracking, 60 minutes complimentary wait time, and terminal meet-and-greet assistance with luggage, airport transfers are effortless and stress-free.',
    image: '/src/assets/images/service_airport_transfer_1791294128362.jpg',
    features: ['Real-time flight status sync', 'Terminal meet & greet with tablet', 'Luggage handling service', 'Zero cancellation fee up to 2h']
  },
  {
    id: 'special-events',
    title: 'Special events',
    subtitle: 'Galas, Weddings & VIP Occasions',
    description: 'Arrive in majestic style at galas, red carpet premieres, weddings, and milestone celebrations. Enjoy fiber optic starlight headliners, champagne bar service, and white-glove etiquette.',
    image: '/src/assets/images/service_special_events_1791294148674.jpg',
    features: ['Starlight panoramic ambiance', 'Chilled champagne bar setup', 'Red carpet arrival option', 'Custom route styling']
  },
  {
    id: 'intercity-trips',
    title: 'Intercity trips',
    subtitle: 'City-to-City Doorway Luxury',
    description: 'Avoid crowded train stations and security lines. Travel between major metropolitan hubs in uninterrupted comfort, working or resting throughout the journey.',
    image: '/src/assets/images/service_corporate_travel_1791294137972.jpg',
    features: ['Fixed flat-rate pricing', 'Private door-to-door transit', 'Spacious executive seating', 'Flexible rest stops']
  }
];

export const FLEET: Vehicle[] = [
  {
    id: 'cadillac-escalade',
    name: 'Cadillac Escalade ESV',
    category: 'SUV',
    hourlyRate: 140,
    dailyRate: 750,
    flatAirportRate: 195,
    passengers: 8,
    luggage: 6,
    image: '/src/assets/images/fleet_cadillac_escalade_1791294159140.jpg',
    tagline: 'The pinnacle of American luxury presence and spacious capability.',
    features: [
      'AKG Studio Reference 36-speaker sound',
      'Rear seat entertainment displays',
      'Ultra-quiet acoustic laminated glass',
      'Panoramic sunroof & heated leather captain chairs',
      'Extended cargo trunk space'
    ],
    popularFor: 'VIP groups, airport baggage runs & executive delegations'
  },
  {
    id: 'mercedes-s-class',
    name: 'Mercedes-Benz S-Class',
    category: 'SEDAN',
    hourlyRate: 70,
    dailyRate: 520,
    flatAirportRate: 145,
    passengers: 3,
    luggage: 3,
    image: '/src/assets/images/fleet_mercedes_sclass_1791294176150.jpg',
    tagline: 'The undisputed worldwide standard for presidential chauffeur refinement.',
    features: [
      'Executive reclining rear seats with calf rests',
      'Burmester High-End 4D Surround Sound',
      'Active ambient lighting & scent ionization',
      'Rear wireless device charging pads',
      'Rear privacy motorized window shades'
    ],
    popularFor: 'Corporate leaders, private diners & airport transit'
  },
  {
    id: 'mercedes-v-class',
    name: 'Mercedes-Benz V-Class VIP',
    category: 'LIMOUSINE',
    hourlyRate: 85,
    dailyRate: 600,
    flatAirportRate: 165,
    passengers: 6,
    luggage: 4,
    image: '/src/assets/images/fleet_mercedes_vclass_1791294185528.jpg',
    tagline: 'First-class mobile boardroom on wheels with conference seating.',
    features: [
      'Face-to-face conference leather seats',
      'Fold-out center conference table',
      'Privacy partition & tinted acoustic windows',
      'Apple TV & HDMI connectivity screens',
      'Integrated refrigerator & bar compartments'
    ],
    popularFor: 'Boardroad shows, production crews & family luxury travel'
  },
  {
    id: 'audi-a8-lwb',
    name: 'Audi A8 LWB Quattro',
    category: 'LUXURY',
    hourlyRate: 75,
    dailyRate: 540,
    flatAirportRate: 150,
    passengers: 3,
    luggage: 2,
    image: '/src/assets/images/fleet_mercedes_sclass_1791294176150.jpg',
    tagline: 'Understated high-tech elegance with whisper-quiet ride comfort.',
    features: [
      'Bang & Olufsen 3D Advanced Sound',
      'Valcona leather with diamond stitching',
      'Rear seat remote touch control',
      'Matrix LED reading lights',
      'Adaptive air suspension'
    ],
    popularFor: 'Diplomats, high-profile executives & nightlife arrivals'
  },
  {
    id: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    category: 'LUXURY',
    hourlyRate: 180,
    dailyRate: 1200,
    flatAirportRate: 320,
    passengers: 3,
    luggage: 3,
    image: '/src/assets/images/fleet_mercedes_sclass_1791294176150.jpg',
    tagline: 'Pure automotive majesty and bespoke handcrafted serenity.',
    features: [
      'Starlight shooting star fiber-optic headliner',
      'Effortless power-assisted coach doors',
      'Lambswool floor mats & hand-stitched leather',
      'Champagne cooler with crystal flutes',
      'Whisper acoustic floor engineering'
    ],
    popularFor: 'Weddings, red carpets & signature galas'
  }
];

export const TOP_CITIES: CityDestination[] = [
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    airportCode: 'JFK · LGA · EWR',
    popularRoutes: ['JFK to Manhattan Midtown', 'Wall St to Greenwich, CT', 'Manhattan to East Hampton'],
    image: '/src/assets/images/city_new_york_1791294196270.jpg',
    description: 'From 5th Avenue penthouses to Wall Street boardrooms and Hamptons retreats.'
  },
  {
    id: 'atlanta',
    name: 'Atlanta',
    country: 'United States',
    airportCode: 'ATL',
    popularRoutes: ['Hartsfield-Jackson to Buckhead', 'Downtown to Alpharetta', 'Midtown to Reynolds Plantation'],
    image: '/src/assets/images/city_atlanta_1791294808227.jpg',
    description: 'Executive mobility through the busiest international air hub and Buckhead finance.'
  },
  {
    id: 'boston',
    name: 'Boston',
    country: 'United States',
    airportCode: 'BOS',
    popularRoutes: ['Logan Airport to Back Bay', 'Cambridge to Cape Cod', 'Beacon Hill to Route 128 Biotech'],
    image: '/src/assets/images/city_boston_1791294828512.jpg',
    description: 'Connecting academic institutions, Cambridge biotech labs, and coastal escapes.'
  },
  {
    id: 'chicago',
    name: 'Chicago',
    country: 'United States',
    airportCode: 'ORD · MDW',
    popularRoutes: ['O\'Hare to The Loop', 'Magnificent Mile to Lake Forest', 'Midway to Gold Coast'],
    image: '/src/assets/images/city_chicago_1791294206511.jpg',
    description: 'Premier transit across the Loop, Magnificent Mile, and luxury lakefront estates.'
  },
  {
    id: 'houston',
    name: 'Houston',
    country: 'United States',
    airportCode: 'IAH · HOU',
    popularRoutes: ['Bush Intercontinental to Downtown', 'Galleria to Energy Corridor', 'River Oaks to The Woodlands'],
    image: '/src/assets/images/city_houston_1791294840878.jpg',
    description: 'Energy sector executive transfers with heavy-duty comfort and swift dispatch.'
  }
];

export const POPULAR_LOCATIONS = [
  'JFK International Airport (Terminal 4 / VIP Lounge)',
  'LaGuardia Airport (LGA Terminal B)',
  'Newark Liberty International Airport (EWR)',
  'The Plaza Hotel, 768 5th Ave, New York',
  'The Carlyle, A Rosewood Hotel, 35 E 76th St',
  'Wall Street Financial District, Manhattan',
  'Hudson Yards, 500 W 33rd St, New York',
  'East Hampton Main Beach, NY',
  'O\'Hare International Airport (ORD), Chicago',
  'Heathrow Airport (LHR Terminal 5 VIP), London'
];

export const SPECIAL_OFFER_FEATURES = [
  'For Upto 8 Passengers',
  'Incredible Sound System',
  'Fiber Optic Lights',
  'Bar Area With Fridge',
  'Tinted Windows',
  'Divider With Premium Style',
  'Multipurpose Designed Limo',
  'Chill Air Conditioning'
];
