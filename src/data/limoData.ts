import { Vehicle, ServiceItem, CityDestination } from '../types/limo';

// High-resolution photography and transparent vehicle assets
import heroImage from '../assets/images/hero_luxury_limo_cadillac_1791294116681.jpg';
import serviceCorporateTravel from '../assets/images/service_corporate_travel_1791294137972.jpg';
import serviceAirportTransfer from '../assets/images/service_airport_transfer_1791294128362.jpg';
import serviceSpecialEvents from '../assets/images/service_special_events_1791294148674.jpg';

// Transparent PNG cutout vehicle showcases
import carEscalade from '../assets/images/cadillac_escalade_esv.png';
import carYukon from '../assets/images/gmc_yukon_denali_xl.png';
import carSuburban from '../assets/images/chevrolet_suburban_premier.png';
import carXt6 from '../assets/images/cadillac_xt6_sport.png';
import carLyriq from '../assets/images/cadillac_lyriq_electric.png';

// Local Canadian regional destination postcards
import cityMontreal from '../assets/images/city_montreal.jpg';
import cityLaval from '../assets/images/city_laval.jpg';
import cityTremblant from '../assets/images/city_tremblant.jpg';
import cityQuebec from '../assets/images/city_quebec.jpg';
import cityOttawa from '../assets/images/city_ottawa.jpg';

export const HERO_IMAGE = heroImage;

// Client contact details
export const CLIENT_INFO = {
  brandName: 'LIMO RAF',
  taglineEn: 'Ride with elegance',
  taglineFr: 'Voyagez avec élégance',
  phone: '(+1) 514-243-8141',
  phoneRaw: '+15142438141',
  email: 'info@limoraf.com',
  address: '2340 Rue de Nevers, Terrebonne, QC J6Y 1T7',
  availabilityEn: '24/7 Everyday · VIP Chauffeur Service',
  availabilityFr: '24/7 Tous les jours · Service de Chauffeur VIP',
  whatsappUrl: 'https://api.whatsapp.com/send/?phone=15142438141&text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20trajet%20avec%20Limo%20Raf.',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100092709458328',
  instagramUrl: 'https://www.instagram.com/montreal_limoraf/',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'airport-transfers',
    titleEn: 'Airport transfers',
    titleFr: 'Transferts aéroport YUL',
    subtitleEn: 'Montréal-Trudeau YUL & Regional Terminals',
    subtitleFr: 'Aéroport Montréal-Trudeau YUL & Régions',
    descriptionEn: 'Arrive smoothly with real-time flight tracking, 60 minutes complimentary wait time, terminal meet-and-greet with personalized tablet signage, and full luggage assistance.',
    descriptionFr: 'Voyagez sans stress avec suivi des vols en temps réel, 60 minutes d\'attente offerte, accueil personnalisé à l\'intérieur du terminal avec tablette et prise en charge intégrale des bagages.',
    image: serviceAirportTransfer,
    featuresEn: [
      'Real-time flight status sync (YUL, YHU, YMX)',
      'Terminal meet & greet with executive tablet',
      'Luggage handling & VIP curb priority',
      'Door-to-door luxury transfer across Quebec'
    ],
    featuresFr: [
      'Synchronisation des vols en direct (YUL, YHU, YMX)',
      'Accueil personnalisé avec tablette au terminal',
      'Prise en charge des bagages & accès VIP prioritaire',
      'Liaison porte-à-porte de luxe partout au Québec'
    ]
  },
  {
    id: 'corporate-travel',
    titleEn: 'Corporate travel',
    titleFr: 'Service corporatif & affaires',
    subtitleEn: 'Executive Business Transport',
    subtitleFr: 'Transport d\'affaires exécutif',
    descriptionEn: 'Discreet, punctual chauffeured transportation tailored for C-suite executives, financial roadshows, and board meetings. Equipped with high-speed Wi-Fi and quiet, acoustic cabins.',
    descriptionFr: 'Transport avec chauffeur discret et ponctuel, taillé sur mesure pour cadres de direction, conférences et roadshows financiers. Équipé du Wi-Fi haute vitesse et d\'un habitacle insonorisé.',
    image: serviceCorporateTravel,
    featuresEn: [
      'Confidential cabin environment with tinted privacy',
      'High-speed Wi-Fi & laptop fast charging docks',
      'Dedicated bilingual chauffeur on standby',
      'Flexible itinerary & multi-stop management'
    ],
    featuresFr: [
      'Environnement de cabine confidentiel et vitres teintées',
      'Wi-Fi haut débit & prises de recharge pour ordinateurs',
      'Chauffeur bilingue dédié en attente continue',
      'Gestion flexible des arrêts et réunions multiples'
    ]
  },
  {
    id: 'special-events',
    titleEn: 'Special events & weddings',
    titleFr: 'Mariage & événements VIP',
    subtitleEn: 'Galas, Weddings & VIP Occasions',
    subtitleFr: 'Mariages, Galas & Cérémonies Prestigieuses',
    descriptionEn: 'Arrive in majestic style at galas, red carpet premieres, weddings, Grand Prix F1 Montreal, and milestone celebrations with white-glove chauffeur etiquette.',
    descriptionFr: 'Faites une entrée remarquée lors de votre mariage, du Grand Prix F1 de Montréal, d\'un gala ou d\'une soirée VIP avec un protocole de courtoisie digne des plus hauts standards.',
    image: serviceSpecialEvents,
    featuresEn: [
      'Pristine showroom vehicle styling inside & out',
      'Red carpet arrival & chilled champagne service',
      'Uniformed white-glove professional chauffeur',
      'Photo shoot standby & custom route planning'
    ],
    featuresFr: [
      'Véhicules immaculés intérieur comme extérieur',
      'Service tapis rouge & champagne sur demande',
      'Chauffeur professionnel en tenue d\'apparat',
      'Disponibilité pour séances photo & itinéraire sur mesure'
    ]
  },
  {
    id: 'long-distance',
    titleEn: 'Long distance travel',
    titleFr: 'Longue distance Canada & USA',
    subtitleEn: 'Intercity Doorway Luxury',
    subtitleFr: 'Liaisons interurbaines de luxe',
    descriptionEn: 'Avoid crowded airports and train stations. Travel between Montreal, Mont-Tremblant, Quebec City, Ottawa, Toronto, and US cities (Boston, New York, Burlington, Plattsburgh) in total comfort.',
    descriptionFr: 'Évitez les gares et aéroports bondés. Voyagez en tout confort entre Montréal, Mont-Tremblant, Québec, Ottawa, Toronto et vers les États-Unis (New York, Boston, Plattsburgh, Burlington).',
    image: serviceCorporateTravel,
    featuresEn: [
      'Fixed flat-rate intercity pricing with zero hidden fees',
      'Private door-to-door transit between major hubs',
      'Spacious reclining captain seats for work or rest',
      'Cross-border US travel authorization & expertise'
    ],
    featuresFr: [
      'Tarification forfaitaire claire sans frais cachés',
      'Liaison privée porte-à-porte d\'un centre à l\'autre',
      'Sièges capitaines inclinables grand confort',
      'Chauffeurs certifiés pour voyages transfrontaliers USA'
    ]
  }
];

export const FLEET: Vehicle[] = [
  {
    id: 'cadillac-escalade',
    name: 'Cadillac Escalade ESV',
    category: 'SUV_VIP',
    categoryLabelEn: 'VIP Luxury SUV',
    categoryLabelFr: 'VUS de Luxe VIP',
    hourlyRate: 140,
    dailyRate: 750,
    flatAirportRate: 195,
    passengers: 6,
    luggage: 5,
    color: 'Noir / Jet Black',
    image: carEscalade,
    taglineEn: 'The flagship American luxury SUV with presidential presence and ultra-quiet cabin.',
    taglineFr: 'Le porte-étendard du luxe avec une prestance imposante et un habitacle ultra silencieux.',
    featuresEn: [
      '6 Passengers · 5 Large Luggage pieces',
      'Jet Black interior & exterior presentation',
      'AKG Studio Reference 36-speaker premium audio',
      'Panoramic sunroof & heated leather captain chairs',
      'Extended ESV cargo space for maximum luggage'
    ],
    featuresFr: [
      '6 Passagers · 5 Grands bagages',
      'Intérieur et extérieur noir étincelant',
      'Système audio haute fidélité AKG Studio Reference 36 haut-parleurs',
      'Toit panoramique & fauteuils capitaines en cuir chauffants',
      'Coffre allongé ESV pour une capacité de bagages optimale'
    ],
    popularForEn: 'YUL Airport VIP transfers, corporate delegations, weddings & VIP arrivals',
    popularForFr: 'Transferts VIP aéroport YUL, délégations d\'affaires, mariages & arrivées de prestige'
  },
  {
    id: 'gmc-yukon-denali',
    name: 'GMC Yukon Denali XL',
    category: 'SUV_VIP',
    categoryLabelEn: 'VIP Executive SUV',
    categoryLabelFr: 'VUS Exécutif VIP',
    hourlyRate: 135,
    dailyRate: 720,
    flatAirportRate: 185,
    passengers: 6,
    luggage: 5,
    color: 'Noir / Jet Black',
    image: carYukon,
    taglineEn: 'Commanding executive refinement with distinctive Denali chrome presence and cavernous comfort.',
    taglineFr: 'Raffinement exécutif puissant avec la signature Denali et un confort d\'exception.',
    featuresEn: [
      '6 Passengers · 5 Large Luggage pieces',
      'Signature Denali chrome grille and exterior styling',
      'Bose Performance Series surround sound system',
      'Independent rear executive climate controls',
      'Quiet acoustic laminated glass'
    ],
    featuresFr: [
      '6 Passagers · 5 Grands bagages',
      'Grille chromée exclusive Denali et finition impeccable',
      'Système ambiophonique Bose Performance Series',
      'Climatisation arrière indépendante multizone',
      'Vitrage acoustique insonorisant de pointe'
    ],
    popularForEn: 'Corporate roadshows, long-distance intercity trips & ski resort transit',
    popularForFr: 'Tournées d\'affaires, trajets longue distance & séjours à Mont-Tremblant'
  },
  {
    id: 'chevrolet-suburban',
    name: 'Chevrolet Suburban Premier',
    category: 'EXECUTIVE',
    categoryLabelEn: 'Full-Size Luxury SUV',
    categoryLabelFr: 'VUS Pleine Grandeur',
    hourlyRate: 130,
    dailyRate: 700,
    flatAirportRate: 180,
    passengers: 7,
    luggage: 6,
    color: 'Noir / Jet Black',
    image: carSuburban,
    taglineEn: 'The benchmark of space and smooth riding comfort for groups, delegations, and heavy baggage.',
    taglineFr: 'La référence de l\'espace et du confort feutré pour groupes et bagages volumineux.',
    featuresEn: [
      '7 Passengers · 6 Large Luggage pieces',
      'Jet Black executive exterior and leather interior',
      'Maximum third-row passenger legroom in class',
      'Smooth Magnetic Ride Control suspension',
      'Integrated charging ports for all seat rows'
    ],
    featuresFr: [
      '7 Passagers · 6 Grands bagages',
      'Finition noire exécutive et cuir haut de gamme',
      'Dégagement pour les jambes inégalé en 3e rangée',
      'Suspension magnétique garantissant une douceur de roulement',
      'Ports de recharge intégrés à chaque rangée'
    ],
    popularForEn: 'Group airport transfers, executive teams & international sports delegations',
    popularForFr: 'Navettes aéroport de groupe, équipes de direction & délégations sportives'
  },
  {
    id: 'cadillac-xt6',
    name: 'Cadillac XT6 Sport',
    category: 'EXECUTIVE',
    categoryLabelEn: 'Midsize Luxury SUV',
    categoryLabelFr: 'VUS Sport & Luxe',
    hourlyRate: 110,
    dailyRate: 600,
    flatAirportRate: 150,
    passengers: 4,
    luggage: 4,
    color: 'Noir / Jet Black',
    image: carXt6,
    taglineEn: 'Agile urban luxury with sleek aerodynamic styling and tailored executive cabin.',
    taglineFr: 'Luxe urbain agile avec des lignes aérodynamiques épurées et un habitacle feutré.',
    featuresEn: [
      '4-6 Passengers · 4 Luggage pieces',
      'Jet Black Sport trim with carbon-accented cabin',
      'Bose Performance 14-speaker sound system',
      'Intelligent all-wheel drive for Quebec winter security',
      'Bilingual chauffeur dedicated to your schedule'
    ],
    featuresFr: [
      '4-6 Passagers · 4 Bagages',
      'Finition Sport noire avec accents fibre de carbone',
      'Système audio Bose Performance 14 haut-parleurs',
      'Traction intégrale intelligente parée pour l\'hiver québécois',
      'Chauffeur bilingue dévoué à votre itinéraire'
    ],
    popularForEn: 'Dinner engagements, city meetings, Bell Centre events & private tours',
    popularForFr: 'Dîners gastronomiques, rendez-vous d\'affaires, Centre Bell & sorties privées'
  },
  {
    id: 'cadillac-lyriq',
    name: 'Cadillac Lyriq EV',
    category: 'ELECTRIC',
    categoryLabelEn: '100% Electric Luxury',
    categoryLabelFr: '100% Électrique de Luxe',
    hourlyRate: 125,
    dailyRate: 650,
    flatAirportRate: 165,
    passengers: 3,
    luggage: 3,
    color: 'Noir / Jet Black',
    image: carLyriq,
    taglineEn: 'Zero-emission next-generation luxury with whisper-quiet electric drive and 33-inch LED display.',
    taglineFr: 'Le luxe zéro émission de nouvelle génération au silence absolu et écran LED 33 pouces.',
    featuresEn: [
      '3 Passengers · 3 Luggage pieces',
      '100% All-electric zero emission VIP transport',
      'Whisper-quiet electric powertrain with next-gen sound insulation',
      '33-inch diagonal advanced curved LED cockpit display',
      'Next-generation active noise cancellation'
    ],
    featuresFr: [
      '3 Passagers · 3 Bagages',
      'Transport VIP 100% électrique à zéro émission',
      'Motorisation électrique ultra silencieuse',
      'Écran incurvé haute résolution 33 pouces',
      'Annulation active des bruits de roulement'
    ],
    popularForEn: 'Eco-conscious executive travel, corporate VIP transit & tech conferences',
    popularForFr: 'Déplacements corporatifs écoresponsables & sommets technologiques'
  }
];

export const TOP_CITIES: CityDestination[] = [
  {
    id: 'montreal',
    name: 'Montréal',
    region: 'Grand Montréal',
    country: 'Canada',
    airportCode: 'YUL · YHU · YMX',
    popularRoutesEn: ['YUL Airport to Downtown', 'Old Montreal to Mont-Royal', 'Downtown to Casino de Montréal'],
    popularRoutesFr: ['Aéroport YUL vers Centre-Ville', 'Vieux-Montréal vers Mont-Royal', 'Centre-Ville vers Casino de Montréal'],
    image: cityMontreal,
    descriptionEn: 'The cultural capital of Quebec: world-renowned gastronomy, Old Montreal cobblestone elegance, and international festivals.',
    descriptionFr: 'La métropole culturelle : gastronomie de renommée mondiale, charme historique du Vieux-Montréal et festivals d\'envergure.'
  },
  {
    id: 'laval',
    name: 'Laval',
    region: 'Rive-Nord',
    country: 'Canada',
    airportCode: 'Laval VIP',
    popularRoutesEn: ['Centropolis to YUL Airport', 'Carrefour Laval to Downtown Montreal', 'Sainte-Dorothée Executive Transit'],
    popularRoutesFr: ['Centropolis vers Aéroport YUL', 'Carrefour Laval vers Centre-Ville Montréal', 'Navette exécutive Sainte-Dorothée'],
    image: cityLaval,
    descriptionEn: 'The dynamic commercial and culinary hub of the North Shore, Centropolis nightlife, and thriving corporate headquarters.',
    descriptionFr: 'Le pôle d\'affaires et de divertissement dynamique de la Rive-Nord, l\'animation du Centropolis et ses sièges corporatifs.'
  },
  {
    id: 'mont-tremblant',
    name: 'Mont-Tremblant',
    region: 'Laurentides',
    country: 'Canada',
    airportCode: 'YTM · Tremblant',
    popularRoutesEn: ['YUL Airport to Tremblant Resort', 'Montreal Downtown to Ski Chalets', 'Tremblant to Ottawa'],
    popularRoutesFr: ['Aéroport YUL vers Station Tremblant', 'Montréal Centre-Ville vers Chalets de Ski', 'Tremblant vers Ottawa'],
    image: cityTremblant,
    descriptionEn: 'World-class Laurentian alpine ski resort, luxury private chalets, championship golf courses, and picturesque mountain escapes.',
    descriptionFr: 'La prestigieuse station de ski des Laurentides, ses chalets privés d\'exception, parcours de golf et paysages alpins grandioses.'
  },
  {
    id: 'quebec-city',
    name: 'Québec',
    region: 'Capitale-Nationale',
    country: 'Canada',
    airportCode: 'YQB',
    popularRoutesEn: ['Montreal to Château Frontenac', 'YQB Airport to Old Quebec', 'Parliament Hill to Grand Allée'],
    popularRoutesFr: ['Montréal vers Château Frontenac', 'Aéroport YQB vers Vieux-Québec', 'Colline Parlementaire vers Grande Allée'],
    image: cityQuebec,
    descriptionEn: 'UNESCO World Heritage jewel, iconic Château Frontenac overlooking the St. Lawrence River, and timeless European grandeur.',
    descriptionFr: 'Joyau du patrimoine mondial de l\'UNESCO, le majestueux Château Frontenac surplombant le fleuve Saint-Laurent et son cachet européen.'
  },
  {
    id: 'ottawa',
    name: 'Ottawa',
    region: 'Capitale Nationale',
    country: 'Canada',
    airportCode: 'YOW',
    popularRoutesEn: ['Montreal to Parliament Hill', 'Ottawa to YUL International', 'Downtown Ottawa to Gatineau'],
    popularRoutesFr: ['Montréal vers Colline du Parlement', 'Ottawa vers YUL International', 'Centre-Ville Ottawa vers Gatineau'],
    image: cityOttawa,
    descriptionEn: 'Canada’s stately federal capital, Parliament Hill, diplomatic embassies, and corporate headquarters along the Rideau Canal.',
    descriptionFr: 'La capitale fédérale du Canada, la colline parlementaire, les ambassades diplomatiques et les institutions nationales.'
  }
];

export const POPULAR_LOCATIONS = [
  'Aéroport International Montréal-Trudeau (YUL - Zone VIP Chauffeur)',
  'Hôtel Ritz-Carlton, 1228 Rue Sherbrooke O, Montréal',
  'Four Seasons Hotel Montréal, 1440 Rue de la Montagne',
  'Hôtel William Gray / Place d\'Armes, Vieux-Montréal',
  'Centre Bell (Zone VIP / Loges corporatives), Montréal',
  'Casino de Montréal, 1 Avenue du Casino, Montréal',
  'Centropolis, 1799 Avenue Pierre-Péladeau, Laval',
  'Carrefour Laval (Zone Exécutive), Laval',
  'Station Mont-Tremblant (Fairmont Tremblant / Chalets VIP)',
  'Fairmont Le Château Frontenac, 1 Rue des Carrières, Québec',
  'Colline du Parlement, Wellington St, Ottawa, ON'
];

export const SPECIAL_OFFER_FEATURES = [
  'Flotte exclusive de SUV noirs de prestige',
  'Chauffeurs professionnels bilingues & courtois',
  'Suivi des vols en direct avec 60 min d\'attente gratuite',
  'Bouteilles d\'eau, lingettes rafraîchissantes & chargeurs à bord',
  'Vitres teintées avec insonorisation acoustique',
  'Réservation instantanée 24/7 par téléphone ou WhatsApp',
  'Service porte-à-porte ponctuel et garanti',
  'Tarifs fixes transparents sans mauvaise surprise'
];
