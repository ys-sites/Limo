import { Vehicle, ServiceItem, CityDestination } from '../types/limo';

// High-resolution photography and transparent vehicle assets
import heroImage from '../assets/images/hero_luxury_limo_cadillac_1791294116681.webp';
import serviceCorporateTravel from '../assets/images/service_corporate_travel_1791294137972.webp';
import serviceAirportTransfer from '../assets/images/service_airport_transfer_1791294128362.webp';
import serviceSpecialEvents from '../assets/images/service_special_events_1791294148674.webp';

// Transparent PNG cutout vehicle showcases
import carEscalade from '../assets/images/cadillac_escalade_esv.webp';
import carYukon from '../assets/images/gmc_yukon_denali_xl.webp';
import carSuburban from '../assets/images/chevrolet_suburban_premier.webp';
import carXt6 from '../assets/images/cadillac_xt6_sport.webp';
import carLyriq from '../assets/images/cadillac_lyriq_electric.webp';

// Local Canadian regional destination postcards
import cityMontreal from '../assets/images/city_montreal.webp';
import cityLaval from '../assets/images/city_laval.webp';
import cityTremblant from '../assets/images/city_tremblant.webp';
import cityQuebec from '../assets/images/city_quebec.webp';
import cityOttawa from '../assets/images/city_ottawa.webp';

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
    id: 'airport-service',
    titleEn: 'AIRPORT SERVICE',
    titleFr: 'SERVICE AÉROPORT',
    subtitleEn: 'Montreal-Trudeau YUL & Regional Hubs',
    subtitleFr: 'Aéroport Montréal-Trudeau YUL & Régions',
    descriptionEn: 'Arrive smoothly with real-time flight tracking, 60 minutes complimentary wait time, terminal meet-and-greet with personalized tablet signage, and full luggage assistance.',
    descriptionFr: 'Voyagez sans stress avec suivi des vols en temps réel, 60 minutes d\'attente offerte, accueil personnalisé à l\'intérieur du terminal avec tablette et prise en charge intégrale des bagages.',
    image: '/images/service_airport_transfer_1791294128362.webp',
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
    id: 'long-distance',
    titleEn: 'LONG DISTANCE',
    titleFr: 'LONGUE DISTANCE',
    subtitleEn: 'Intercity Canada & USA Corridors',
    subtitleFr: 'Liaisons interurbaines Canada & USA',
    descriptionEn: 'Avoid crowded airports and train stations. Travel between Montreal, Mont-Tremblant, Quebec City, Ottawa, Toronto, and US destinations (Boston, New York, Burlington, Plattsburgh) in pristine comfort.',
    descriptionFr: 'Évitez les gares et aéroports bondés. Voyagez en toute sérénité entre Montréal, Mont-Tremblant, Québec, Ottawa, Toronto et vers les États-Unis (New York, Boston, Plattsburgh, Burlington).',
    image: '/images/service_corporate_travel_1791294137972.webp',
    featuresEn: [
      'Fixed flat-rate intercity pricing with zero hidden fees',
      'Private door-to-door transit between major cities',
      'Spacious reclining captain seats for work or rest',
      'Cross-border US travel authorization & expertise'
    ],
    featuresFr: [
      'Tarification forfaitaire claire sans frais cachés',
      'Liaison privée porte-à-porte d\'un centre à l\'autre',
      'Sièges capitaines inclinables grand confort',
      'Chauffeurs certifiés pour voyages transfrontaliers USA'
    ]
  },
  {
    id: 'hourly-limo',
    titleEn: 'HOURLY LIMO',
    titleFr: 'SERVICE À L\'HEURE',
    subtitleEn: 'Flexible By-The-Hour Chauffeur',
    subtitleFr: 'Mise à disposition avec chauffeur privé',
    descriptionEn: 'Reserve a dedicated chauffeur from 2 to 24 hours. They will be on standby for your meetings, shopping trips, or multi-destination schedules with maximum flexibility.',
    descriptionFr: 'Mise à disposition avec chauffeur privé à l\'heure pour vos rendez-vous d\'affaires, réunions ou journées shopping de prestige. Chauffeur dédié en attente continue.',
    image: '/images/about_discretion_vip.webp',
    featuresEn: [
      'Confidential cabin environment with tinted privacy',
      'High-speed Wi-Fi & device charging ports',
      'Dedicated bilingual chauffeur on standby',
      'Flexible multi-stop itinerary management'
    ],
    featuresFr: [
      'Environnement de cabine confidentiel et vitres teintées',
      'Wi-Fi haut débit & prises de recharge pour téléphones',
      'Chauffeur bilingue dédié en attente continue',
      'Gestion flexible des arrêts et réunions multiples'
    ]
  },
  {
    id: 'wedding',
    titleEn: 'WEDDING',
    titleFr: 'MARIAGE',
    subtitleEn: 'Prestigious Transport for Your Special Day',
    subtitleFr: 'Transport de prestige pour votre grand jour',
    descriptionEn: 'Sublime the most beautiful day of your life with exceptional VIP transportation. Impeccable vehicles, white-glove etiquette, red carpet and chilled champagne on request.',
    descriptionFr: 'Sublimez le plus beau jour de votre vie avec un transport d\'exception. Véhicules immaculés, service attentionné, tapis rouge et élégance absolue.',
    image: '/images/service_special_events_1791294148674.webp',
    featuresEn: [
      'Pristine showroom vehicle styling inside & out',
      'Red carpet arrival & chilled champagne service',
      'Uniformed white-glove professional chauffeur',
      'Photo shoot standby & custom route planning'
    ],
    featuresFr: [
      'Véhicules immaculés intérieur comme extérieur',
      'Service tapis rouge & champagne sur demande',
      'Chauffeur professionnel en costume d\'apparat',
      'Disponibilité pour séances photo & itinéraire sur mesure'
    ]
  },
  {
    id: 'city-tour-limo',
    titleEn: 'CITY TOUR LIMO',
    titleFr: 'CIRCUIT TOURISTIQUE',
    subtitleEn: 'Discover Montreal & The Laurentians in Luxury',
    subtitleFr: 'Montréal, Vieux-Port & Laurentides en luxe',
    descriptionEn: 'Discover Montreal, the Old Port, Mont-Royal, and the Laurentians in absolute luxury with an expert local chauffeur knowledgeable of the best panoramic spots and dining.',
    descriptionFr: 'Découvrez Montréal, le Vieux-Port et les Laurentides dans un confort absolu avec un chauffeur expert de la région et des meilleures adresses gastronomiques.',
    image: '/images/about_chauffeur_vip.webp',
    featuresEn: [
      'Custom panoramic sightseeing itineraries',
      'Local bilingual chauffeur recommendations',
      'Panoramic glass roofs & comfortable leather seating',
      'Flexible photo and tasting stops anytime'
    ],
    featuresFr: [
      'Itinéraires panoramiques personnalisés',
      'Recommandations exclusives par chauffeur bilingue',
      'Toits panoramiques & sièges en cuir luxueux',
      'Arrêts photos et dégustations à votre rythme'
    ]
  },
  {
    id: 'party',
    titleEn: 'PARTY & EVENTS',
    titleFr: 'SOIRÉES & ÉVÉNEMENTS',
    subtitleEn: 'Galas, VIP Nights & Safe Return',
    subtitleFr: 'Galas, soirées VIP & retour en sécurité',
    descriptionEn: 'Arrive in majestic style at galas, concerts, VIP nights, Grand Prix F1 Montreal, and milestone celebrations. Enjoy your evening with total peace of mind and safe return home.',
    descriptionFr: 'Arrivez avec style lors de vos galas, soirées VIP, concerts, Grand Prix F1 de Montréal ou événements corporatifs. Profitez de votre soirée avec un retour chez vous en toute sécurité.',
    image: '/images/service_special_events_1791294148674.webp',
    featuresEn: [
      'VIP club & venue red-carpet drop-off',
      'Night-long standby chauffeur availability',
      'Premium sound systems with custom playlist connectivity',
      'Safe, reliable chauffeur return home anytime'
    ],
    featuresFr: [
      'Arrivée VIP devant les clubs et salles de gala',
      'Chauffeur en attente toute la nuit',
      'Système audio haute fidélité pour votre musique',
      'Retour sécurisé à votre domicile sans souci'
    ]
  }
];

export const FLEET: Vehicle[] = [
  {
    id: 'gmc-yukon-denali',
    slug: 'gmc-yukon-denali',
    name: 'GMC Yukon Denali XL',
    category: 'SUV_VIP',
    categoryLabelEn: 'VIP Executive SUV',
    categoryLabelFr: 'VUS Exécutif VIP',
    passengers: 6,
    luggage: 5,
    color: 'Noir / Jet Black',
    image: carYukon,
    galleryImages: [
      '/client_assets/1-slide-gmc-yukon-limo-0.jpg',
      '/client_assets/4-slide-gmc-yukon-limo.jpg',
      '/client_assets/3-slide-gmc-yukon-limo-1.jpg',
      '/client_assets/2-slide-gmc-yukon-limo-1.jpg',
      '/client_assets/background-gmc-yukon-denali.jpg'
    ],
    taglineEn: 'The GMC Yukon Denali XL is a spacious and versatile luxury SUV that offers a premium travel experience.',
    taglineFr: 'Le GMC Yukon Denali XL est un VUS de luxe spacieux et polyvalent offrant une expérience de voyage haut de gamme.',
    overviewEn: 'The GMC Yukon Denali XL delivers a commanding presence on the road with an imposing chrome grille, refined black leather interior, generous passenger space for up to 6 guests, and high-end multimedia options like headrest entertainment screens and integrated Wi-Fi.',
    overviewFr: 'Le GMC Yukon Denali XL offre une présence imposante sur la route avec sa calandre chromée distinctive, un intérieur raffiné en cuir noir pouvant accueillir confortablement jusqu\'à 6 passagers, et des équipements multimédias haut de gamme tels que des écrans tactiles intégrés aux appuie-tête et le Wi-Fi intégré.',
    featuresEn: [
      '6 Passengers · 5 Large Luggage pieces',
      'Signature Denali chrome grille & 22-inch alloy wheels',
      'Rear dual-screen entertainment system in headrests',
      'Heated & ventilated executive leather captain chairs',
      'Integrated high-speed on-board Wi-Fi connectivity'
    ],
    featuresFr: [
      '6 Passagers · 5 Grands bagages',
      'Calandre chromée emblématique Denali & jantes alliage 22 pouces',
      'Système de divertissement arrière à doubles écrans tactiles',
      'Fauteuils capitaines en cuir chauffants et ventilés',
      'Wi-Fi haut débit embarqué pour une connectivité continue'
    ],
    detailSections: [
      {
        titleEn: 'Exterior Presence',
        titleFr: 'Design Extérieur',
        contentEn: 'The Yukon Denali XL features a rugged and imposing design with a distinctive chrome grille and elegant lines. It is equipped with advanced LED headlights and 22-inch alloy wheels for smooth road stability.',
        contentFr: 'Le Yukon Denali XL affiche un design robuste et imposant, doté d\'une calandre exclusive et de lignes élancées. Il est équipé de projecteurs DEL haute performance et de jantes en alliage de 22 pouces assurant une tenue de route irréprochable.'
      },
      {
        titleEn: 'Interior Refinement',
        titleFr: 'Raffinement Intérieur',
        contentEn: 'Inside, the Yukon Denali XL offers a serene sanctuary accommodating up to 6 passengers in absolute luxury. Features heated and ventilated leather captain chairs, generous legroom, and multi-zone climate control.',
        contentFr: 'À l\'intérieur, le Yukon Denali XL propose un habitacle feutré accueillant jusqu\'à 6 passagers. Sièges en cuir ventilés et chauffants, dégagement généreux pour les jambes et contrôle thermique multizone indépendant.'
      },
      {
        titleEn: 'Cavernous Cargo Capacity',
        titleFr: 'Espace Bagages Étendu',
        contentEn: 'With extended XL wheelbase cargo dimensions, it easily accommodates 5 to 6 large travel suitcases plus carry-on bags, perfect for YUL airport transfers and corporate travel.',
        contentFr: 'Grâce à son châssis allongé XL, il transporte facilement 5 à 6 grandes valises d\'aéroport et bagages cabine, convenant parfaitement aux navettes aéroportuaires et voyages longue distance.'
      },
      {
        titleEn: 'Technology & Rear Entertainment',
        titleFr: 'Technologie & Divertissement',
        contentEn: 'Equipped with dual rear touchscreens integrated into front seat headrests for movies or presentations, Bose premium audio, integrated Wi-Fi, and multiple high-speed USB-C charging stations.',
        contentFr: 'Muni d\'écrans tactiles arrière intégrés aux appuie-tête pour le visionnement de médias, d\'un système audio Bose ambiophonique, du Wi-Fi intégré et de prises de recharge rapide.'
      }
    ],
    servicesOfferedEn: [
      'Montréal-Trudeau Airport (YUL) Meet & Greet',
      'As-Directed Hourly Chauffeur Service',
      'Corporate Travel & VIP Roadshows',
      'Long-Distance (Mont-Tremblant, Québec, Ottawa, USA)'
    ],
    servicesOfferedFr: [
      'Transferts Aéroport Montréal-Trudeau (YUL) avec accueil en terminal',
      'Service de chauffeur privé à l\'heure (As-Directed)',
      'Déplacements corporatifs et délégations d\'affaires',
      'Longue distance (Mont-Tremblant, Québec, Ottawa, USA)'
    ],
    popularForEn: 'YUL Airport VIP transfers, corporate delegations & ski resort transit to Mont-Tremblant',
    popularForFr: 'Transferts VIP aéroport YUL, délégations d\'affaires & séjours à Mont-Tremblant'
  },
  {
    id: 'cadillac-escalade',
    slug: 'cadillac-escalade',
    name: 'Cadillac Escalade ESV',
    category: 'SUV_VIP',
    categoryLabelEn: 'VIP Luxury SUV',
    categoryLabelFr: 'VUS de Luxe VIP',
    passengers: 6,
    luggage: 5,
    color: 'Noir / Jet Black',
    image: carEscalade,
    galleryImages: [
      '/client_assets/1-slide-escalade.jpg',
      '/client_assets/cadillac-escalade-interior.jpg',
      '/client_assets/escalade-interior-3-1.jpg',
      '/client_assets/escalade-interior-2-1.jpg',
      '/client_assets/background-escalade-limo.jpg'
    ],
    taglineEn: 'The flagship American luxury SUV with presidential presence and ultra-quiet cabin.',
    taglineFr: 'Le porte-étendard du luxe avec une prestance imposante et un habitacle ultra silencieux.',
    overviewEn: 'The Cadillac Escalade ESV combines majestic presidential styling with whisper-quiet ride comfort. Its extended ESV wheelbase offers unparalleled luggage capacity, plush hand-crafted leather captain chairs, and cutting-edge curved OLED technology.',
    overviewFr: 'Le Cadillac Escalade ESV incarne le sommet du prestige avec sa silhouette sculpturale et son habitacle d\'un silence absolu. Son empattement allongé ESV offre un volume de coffre hors pair, de somptueux fauteuils en cuir et un affichage incurvé haute résolution.',
    featuresEn: [
      '6 Passengers · 5 Large Luggage pieces',
      'Jet Black presentation with chrome architectural accents',
      'AKG Studio 36-speaker reference immersive audio',
      'Curved 38-inch total OLED instrument & infotainment display',
      'Ultra-quiet acoustic laminated glass and suspension'
    ],
    featuresFr: [
      '6 Passagers · 5 Grands bagages',
      'Présentation noir étincelant avec accents chromés soignés',
      'Système audio immersif AKG Studio 36 haut-parleurs',
      'Affichage panoramique incurvé OLED de 38 pouces',
      'Insonorisation acoustique poussée et roulement feutré'
    ],
    detailSections: [
      {
        titleEn: 'Presidential Exterior',
        titleFr: 'Prestance Présidentielle',
        contentEn: 'The imposing chrome grille, vertical signature LED light blades, and sleek proportion give the Escalade ESV an unmistakable authority and distinction at hotel entrances and VIP red carpets.',
        contentFr: 'La calandre chromée emblématique, les optiques verticales à DEL et les lignes fluides confèrent à l\'Escalade ESV une distinction immédiate à l\'arrivée des hôtels de prestige et événements VIP.'
      },
      {
        titleEn: 'Hand-Crafted Cabin Comfort',
        titleFr: 'Confort de Première Classe',
        contentEn: 'Sumptuous leather captain seating with heating, ventilation, and custom lumbar contours. Genuine wood and brushed aluminum accents create an executive mobile boardroom.',
        contentFr: 'Somptueux fauteuils capitaines en cuir chauffants et ventilés avec soutien ergonomique. Les boiseries nobles et garnitures d\'aluminium créent un salon d\'affaires mobile.'
      },
      {
        titleEn: 'Extended ESV Luggage Trunk',
        titleFr: 'Capacité de Bagages Maximale',
        contentEn: 'The extended ESV rear storage ensures all 6 passengers can travel with full-sized international baggage without sacrificing legroom or cabin comfort.',
        contentFr: 'Le coffre allongé ESV permet à tous les passagers de voyager avec de grandes valises internationales sans aucun compromis sur l\'espace intérieur.'
      },
      {
        titleEn: 'Entertainment & Acoustics',
        titleFr: 'Multimédia & Insonorisation',
        contentEn: 'Equipped with dual rear seat multimedia monitors, studio-grade AKG surround acoustic engineering, and on-board power points for laptops and mobile devices.',
        contentFr: 'Équipé de moniteurs multimédias arrière, d\'une acoustique signée AKG et de prises haute tension pour ordinateurs et téléphones.'
      }
    ],
    servicesOfferedEn: [
      'Executive Airport Arrivals & Departures YUL',
      'Diplomatic & VIP Dignitary Transportation',
      'Luxury Weddings & Black-Tie Galas',
      'Private As-Directed Chauffeur Hire'
    ],
    servicesOfferedFr: [
      'Arrivées et départs d\'affaires à l\'Aéroport YUL',
      'Transport diplomatique et délégations protocolaires',
      'Mariages de prestige & galas mondains',
      'Location de chauffeur privé sur mesure'
    ],
    popularForEn: 'YUL Airport VIP transfers, diplomatic delegations, luxury weddings & executive roadshows',
    popularForFr: 'Transferts VIP aéroport YUL, délégations diplomatiques, mariages de prestige & galas'
  },
  {
    id: 'cadillac-xt6',
    slug: 'cadillac-xt6',
    name: 'Cadillac XT6 Sport',
    category: 'EXECUTIVE',
    categoryLabelEn: 'Midsize Luxury SUV',
    categoryLabelFr: 'VUS Sport & Luxe',
    passengers: 4,
    luggage: 4,
    color: 'Noir / Jet Black',
    image: carXt6,
    galleryImages: [
      '/client_assets/xt6-interior2.jpg',
      '/client_assets/Cadillac-xt6-interior5.jpg',
      '/client_assets/xt6-interior3.jpg',
      '/client_assets/xt6-interior4-1.jpg',
      '/client_assets/background-cadillac-xt6.jpg'
    ],
    taglineEn: 'Agile urban luxury with sleek aerodynamic styling and tailored executive cabin.',
    taglineFr: 'Luxe urbain agile avec des lignes aérodynamiques épurées et un habitacle feutré.',
    overviewEn: 'The Cadillac XT6 Sport is a versatile luxury SUV that offers an elegant and modern design inside and out. Its sleek lines, sport-tuned all-wheel drive, and tailored cabin make it ideal for executive city commutes and fine dining evenings.',
    overviewFr: 'Le Cadillac XT6 Sport est un VUS de luxe polyvalent offrant un design moderne et racé. Ses lignes épurées, sa traction intégrale sportive et son habitacle raffiné en font le choix idéal pour les rendez-vous d\'affaires urbains et les soirées montréalaises.',
    featuresEn: [
      '4-6 Passengers · 4 Luggage pieces',
      'Jet Black Sport trim with gloss-black exterior package',
      'Bose Performance 14-speaker surround sound system',
      'Intelligent AWD engineered for Quebec winter conditions',
      'Apple CarPlay, Android Auto, and wireless charging'
    ],
    featuresFr: [
      '4-6 Passagers · 4 Bagages',
      'Finition Sport noire avec ensemble extérieur noir lustré',
      'Système audio ambiophonique Bose Performance 14 haut-parleurs',
      'Traction intégrale intelligente parée pour l\'hiver québécois',
      'Apple CarPlay, Android Auto et recharge sans fil'
    ],
    detailSections: [
      {
        titleEn: 'Athletic Styling',
        titleFr: 'Allure Athlétique',
        contentEn: 'Featuring sleek dynamic lines, dark gloss mesh grille, and slim LED headlights that deliver an agile, sophisticated silhouette throughout downtown Montreal.',
        contentFr: 'Arborant des lignes dynamiques épurées, une grille noire maillée et des phares DEL effilés lui conférant une allure sportive et élégante au centre-ville.'
      },
      {
        titleEn: 'Refined Sport Cabin',
        titleFr: 'Habitacle Sport Élégant',
        contentEn: 'Carbon-fiber weave trim accents, supple black leather upholstery, and panoramic dual-pane sunroof that fills the interior with natural ambiance.',
        contentFr: 'Garnitures en fibre de carbone, cuir noir capitonné et grand toit ouvrant panoramique inondant l\'habitacle de clarté.'
      },
      {
        titleEn: 'Versatile Cargo',
        titleFr: 'Modularité du Coffre',
        contentEn: 'Power folding seating configurations accommodate up to 4 large suitcases or presentation display cases with ease.',
        contentFr: 'Sièges rabattables électriquement permettant de loger facilement 4 valises ou du matériel de présentation corporatif.'
      },
      {
        titleEn: 'Winter-Ready Performance',
        titleFr: 'Sérénité Hivernale',
        contentEn: 'Equipped with twin-clutch Sport all-wheel drive and real-time dampening suspension for smooth, safe transit through all Quebec weather.',
        contentFr: 'Doté d\'une traction intégrale sportive à double embrayage et d\'une suspension adaptative garantissant une sécurité totale en toute saison.'
      }
    ],
    servicesOfferedEn: [
      'Executive City Transfers & Financial District Meetings',
      'YUL Airport Rapid Terminal Pickups',
      'Evening Chauffeur for Montreal Restos & Bell Centre',
      'Hourly As-Directed Chauffeur Service'
    ],
    servicesOfferedFr: [
      'Rendez-vous corporatifs au centre-ville de Montréal',
      'Navettes express aéroport Montréal-Trudeau (YUL)',
      'Soirées gastronomiques et événements au Centre Bell',
      'Mise à disposition avec chauffeur à l\'heure'
    ],
    popularForEn: 'Dinner engagements, city meetings, Bell Centre events & private tours',
    popularForFr: 'Dîners gastronomiques, rendez-vous d\'affaires, Centre Bell & sorties privées'
  },
  {
    id: 'chevrolet-suburban',
    slug: 'chevrolet-suburban',
    name: 'Chevrolet Suburban Premier',
    category: 'EXECUTIVE',
    categoryLabelEn: 'Full-Size Luxury SUV',
    categoryLabelFr: 'VUS Pleine Grandeur',
    passengers: 7,
    luggage: 6,
    color: 'Noir / Jet Black',
    image: carSuburban,
    galleryImages: [
      '/images/fleet_png/chevrolet_suburban_premier.webp',
      '/client_assets/service-limo.webp',
      '/client_assets/chauffeur-voiture-de-luxe.webp'
    ],
    taglineEn: 'The benchmark of space and smooth riding comfort for groups, delegations, and heavy baggage.',
    taglineFr: 'La référence de l\'espace et du confort feutré pour groupes et bagages volumineux.',
    overviewEn: 'The Chevrolet Suburban Premier is the undisputed titan of passenger space. Offering comfortable seating for up to 7 passengers with expansive third-row legroom and class-leading cargo capacity behind the third row.',
    overviewFr: 'Le Chevrolet Suburban Premier est la référence absolue pour le transport de groupe de prestige. Il accueille jusqu\'à 7 passagers avec un dégagement impressionnant à la troisième rangée et un coffre volumineux.',
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
    detailSections: [
      {
        titleEn: 'Maximum Group Capacity',
        titleFr: 'Capacité de Groupe Maximale',
        contentEn: 'Seating for up to 7 adult passengers with full individual legroom, ensuring executive delegations travel together seamlessly.',
        contentFr: 'Accueille jusqu\'à 7 adultes avec un confort individuel complet, idéal pour déplacer des équipes sans scinder le groupe.'
      },
      {
        titleEn: 'Magnetic Ride Control',
        titleFr: 'Douceur de Roulement',
        contentEn: 'Advanced Magnetic Ride Control dampers read the road every millisecond, insulating passengers from potholes and rough winter roads.',
        contentFr: 'La suspension magnétique analyse la chaussée chaque milliseconde pour neutraliser les imperfections de la route.'
      },
      {
        titleEn: 'Massive Cargo Space',
        titleFr: 'Coffre Gigantesque',
        contentEn: 'Accommodates up to 6 to 7 large luggage bags even with all rows occupied, making it the top choice for ski trips and international flights.',
        contentFr: 'Loge jusqu\'à 6 ou 7 valises grand format même avec tous les sièges occupés, parfait pour les séjours de ski et vols longs courriers.'
      },
      {
        titleEn: 'Executive Amenities',
        titleFr: 'Commodités à Bord',
        contentEn: 'Full 120V and USB-C connectivity throughout the vehicle, quiet acoustic isolation, and privacy tinted glass.',
        contentFr: 'Prises USB-C et 120V à chaque rangée, insonorisation soignée et vitres teintées protégeant votre intimité.'
      }
    ],
    servicesOfferedEn: [
      'Group Airport Transfers for Executive Teams',
      'Mont-Tremblant & Charlevoix Ski Resort Transfers',
      'Sports Delegations & Film Production Shuttles',
      'Intercity Long-Distance Travel'
    ],
    servicesOfferedFr: [
      'Navettes aéroportuaires pour délégations et familles',
      'Transferts vers les stations de ski de Mont-Tremblant et Charlevoix',
      'Transports pour équipes sportives et productions cinématographiques',
      'Voyages interurbains et longue distance'
    ],
    popularForEn: 'Group airport transfers, executive teams & international sports delegations',
    popularForFr: 'Navettes aéroport de groupe, équipes de direction & délégations sportives'
  },
  {
    id: 'cadillac-lyriq',
    slug: 'cadillac-lyriq',
    name: 'Cadillac Lyriq EV',
    category: 'ELECTRIC',
    categoryLabelEn: '100% Electric Luxury',
    categoryLabelFr: '100% Électrique de Luxe',
    passengers: 3,
    luggage: 3,
    color: 'Noir / Jet Black',
    image: carLyriq,
    galleryImages: [
      '/images/fleet_png/cadillac_lyriq_electric.webp',
      '/client_assets/wordwide-768x576-1.jpg'
    ],
    taglineEn: 'Zero-emission next-generation luxury with whisper-quiet electric drive and 33-inch LED display.',
    taglineFr: 'Le luxe zéro émission de nouvelle génération au silence absolu et écran LED 33 pouces.',
    overviewEn: 'The Cadillac Lyriq EV represents the forward-thinking future of luxury transport. Silent electric propulsion, a luminous black crystal grille, and next-generation active road noise cancellation create an unprecedented serene environment.',
    overviewFr: 'Le Cadillac Lyriq EV incarne l\'avant-garde du luxe écoresponsable. Une motorisation électrique silencieuse, une calandre illuminée en cristal noir et un système antibruit actif créent un havre de quiétude absolue.',
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
    detailSections: [
      {
        titleEn: 'Zero-Emission Distinction',
        titleFr: 'Distinction Zéro Émission',
        contentEn: 'Travel with a clean environmental footprint while upholding the highest standards of luxury and refined chauffeur presentation.',
        contentFr: 'Déplacez-vous avec une empreinte carbone neutre tout en profitant des standards d\'excellence d\'un service avec chauffeur privé.'
      },
      {
        titleEn: 'Acoustic Sanctuary',
        titleFr: 'Sanctuaire Acoustique',
        contentEn: 'The absence of combustion noise combined with active road noise cancellation creates the quietest passenger cabin in its class.',
        contentFr: 'L\'absence de bruit de moteur combinée à l\'insonorisation active procure une quiétude absolue propice à la détente et au travail.'
      },
      {
        titleEn: 'Next-Gen Display Technology',
        titleFr: 'Technologie d\'Avant-Garde',
        contentEn: 'Features a panoramic 33-inch curved LED screen capable of emitting 1 billion colors, illuminating the modern interior.',
        contentFr: 'Une dalle LED incurvée de 33 pouces capable de reproduire un milliard de nuances de couleurs sublime la planche de bord.'
      },
      {
        titleEn: 'Tailored Comfort',
        titleFr: 'Confort Personnalisé',
        contentEn: 'Sculpted leather seating with multi-color ambient lighting and premium dual-zone climate filtration.',
        contentFr: 'Sellerie en cuir au galbe ergonomique, éclairage d\'ambiance personnalisable et filtration d\'air supérieure.'
      }
    ],
    servicesOfferedEn: [
      'Eco-Conscious Executive Transfers to YUL',
      'Clean VIP Transportation for Tech & ESG Conferences',
      'Corporate Roadshows in Greater Montreal',
      'Private As-Directed Electric Limousine'
    ],
    servicesOfferedFr: [
      'Transferts corporatifs écoresponsables vers l\'Aéroport YUL',
      'Transport VIP pour sommets technologiques et événements ESG',
      'Déplacements professionnels dans le Grand Montréal',
      'Chauffeur privé électrique à disposition'
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
