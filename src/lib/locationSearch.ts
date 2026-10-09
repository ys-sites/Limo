/**
 * Address autocomplete backed by real map data.
 *
 * Primary source: Google Places API (New) — `AutocompleteSuggestion` for live
 * predictions, then a Place Details lookup on selection so the field receives
 * Google's official formatted address (street, city, province, postal code).
 * Requires VITE_GOOGLE_MAPS_API_KEY with "Maps JavaScript API" + "Places API (New)".
 *
 * Fallback (no key, or Google unreachable): Photon / OpenStreetMap, restricted
 * to Canada and the US and filtered so numbered queries only return real
 * civic addresses.
 */

export interface LocationSuggestion {
  id: string;
  title: string;
  subtitle: string;
  city?: string;
  postcode?: string;
  category: 'airport' | 'hotel' | 'train' | 'landmark' | 'address';
  fullAddress: string;
  isAirport?: boolean;
  source: 'google' | 'osm';
  /** Google prediction handle, used to fetch full details on selection */
  googlePrediction?: any;
}

/** Minimum characters typed before any suggestions are fetched */
export const MIN_QUERY_LENGTH = 3;

const GOOGLE_API_KEY: string = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';

// Greater Montréal — used to bias results toward the service area
const MONTREAL = { lat: 45.5017, lng: -73.5673 };

let placesLibPromise: Promise<any | null> | null = null;
let sessionToken: any = null;

/** Load the Maps JavaScript API (Places library only, no map rendered) */
function loadPlacesLibrary(): Promise<any | null> {
  if (typeof window === 'undefined' || !GOOGLE_API_KEY) return Promise.resolve(null);
  if (placesLibPromise) return placesLibPromise;

  placesLibPromise = new Promise<any | null>((resolve) => {
    const w = window as any;
    const finish = async () => {
      try {
        resolve(await w.google.maps.importLibrary('places'));
      } catch {
        resolve(null);
      }
    };

    if (w.google?.maps?.importLibrary) {
      finish();
      return;
    }

    const callbackName = '__limoMapsReady';
    w[callbackName] = finish;
    const script = document.createElement('script');
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_API_KEY)}` +
      `&v=weekly&loading=async&region=CA&callback=${callbackName}`;
    script.async = true;
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  }).then((lib) => {
    // Allow a retry later if loading failed (e.g. offline)
    if (!lib) placesLibPromise = null;
    return lib;
  });

  return placesLibPromise;
}

function categorize(text: string, types: string[] = []): LocationSuggestion['category'] {
  if (isAirportLocation(text) || types.includes('airport')) return 'airport';
  if (types.includes('lodging') || /h[ôo]tel|resort|\binn\b/i.test(text)) return 'hotel';
  if (types.some((t) => /train_station|transit_station|subway_station/.test(t)) || /\bgare\b|station/i.test(text)) {
    return 'train';
  }
  if (types.includes('street_address') || types.includes('premise') || types.includes('route')) return 'address';
  if (types.includes('establishment') || types.includes('point_of_interest')) return 'landmark';
  return 'address';
}

async function searchGoogle(query: string, isFr: boolean): Promise<LocationSuggestion[] | null> {
  const places = await loadPlacesLibrary();
  if (!places?.AutocompleteSuggestion) return null;

  if (!sessionToken) sessionToken = new places.AutocompleteSessionToken();

  const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input: query,
    sessionToken,
    language: isFr ? 'fr-CA' : 'en-CA',
    region: 'ca',
    includedRegionCodes: ['ca', 'us'],
    locationBias: { center: MONTREAL, radius: 50000 },
    origin: MONTREAL,
  });

  return (suggestions || [])
    .map((s: any) => s.placePrediction)
    .filter(Boolean)
    .slice(0, 6)
    .map((p: any): LocationSuggestion => {
      const title = p.mainText?.text || p.text?.text || '';
      const subtitle = p.secondaryText?.text || '';
      const full = p.text?.text || [title, subtitle].filter(Boolean).join(', ');
      const category = categorize(full, p.types || []);
      return {
        id: p.placeId,
        title,
        subtitle,
        city: subtitle.split(',')[0]?.trim() || undefined,
        category,
        fullAddress: full,
        isAirport: category === 'airport',
        source: 'google',
        googlePrediction: p,
      };
    });
}

async function searchPhoton(query: string, isFr: boolean): Promise<LocationSuggestion[]> {
  // Bounding box: southern Ontario → Atlantic, down to New York
  const url =
    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}` +
    `&limit=12&lat=${MONTREAL.lat}&lon=${MONTREAL.lng}&bbox=-84,40,-59,53` +
    `&lang=${isFr ? 'fr' : 'en'}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return [];
    const data = await res.json();

    // If the user typed a civic number, only keep results that have one
    const typedNumber = query.match(/^\s*(\d+[a-z]?)\b/i)?.[1]?.toLowerCase();
    const results: LocationSuggestion[] = [];
    const seen = new Set<string>();

    for (const f of data?.features || []) {
      const p = f.properties || {};
      const cc = (p.countrycode || '').toLowerCase();
      if (cc !== 'ca' && cc !== 'us') continue;

      const houseNumber = (p.housenumber || '').toString();
      if (typedNumber && houseNumber.toLowerCase() !== typedNumber) continue;

      const street = p.street || '';
      const title = houseNumber && street ? `${houseNumber} ${street}` : p.name || street;
      if (!title) continue;

      const city = p.city || p.town || p.village || p.district || p.county || '';
      const region = [p.state, p.postcode].filter(Boolean).join(' ');
      const subtitle = [city, region, p.country].filter(Boolean).join(', ');
      const fullAddress = [title, subtitle].filter(Boolean).join(', ');
      if (seen.has(fullAddress.toLowerCase())) continue;
      seen.add(fullAddress.toLowerCase());

      const category = categorize(fullAddress, [p.osm_value || '']);
      results.push({
        id: `osm-${p.osm_type}-${p.osm_id}`,
        title,
        subtitle,
        city: city || undefined,
        postcode: p.postcode || undefined,
        category,
        fullAddress,
        isAirport: category === 'airport',
        source: 'osm',
      });
      if (results.length >= 6) break;
    }
    return results;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/** Live suggestions for a typed query. Returns [] for queries shorter than MIN_QUERY_LENGTH. */
export async function searchLocations(query: string, isFr = true): Promise<LocationSuggestion[]> {
  const clean = query.trim();
  if (clean.length < MIN_QUERY_LENGTH) return [];

  if (GOOGLE_API_KEY) {
    try {
      const google = await searchGoogle(clean, isFr);
      if (google) return google;
    } catch {
      // fall through to OSM
    }
  }
  return searchPhoton(clean, isFr);
}

/**
 * Resolve a picked suggestion to its complete, official address.
 * For Google results this fetches Place Details (formatted address incl. postal code)
 * and closes the billing session.
 */
export async function resolveLocation(s: LocationSuggestion): Promise<LocationSuggestion> {
  if (s.source !== 'google' || !s.googlePrediction) return s;
  try {
    const place = s.googlePrediction.toPlace();
    await place.fetchFields({ fields: ['displayName', 'formattedAddress', 'addressComponents', 'types'] });
    sessionToken = null;

    const comps: any[] = place.addressComponents || [];
    const postcode = comps.find((c) => c.types?.includes('postal_code'))?.longText;
    const city = comps.find((c) => c.types?.includes('locality'))?.longText || s.city;
    const formatted: string = place.formattedAddress || s.fullAddress;
    const name: string = place.displayName || '';
    const types: string[] = place.types || [];

    // For businesses (airport, hotel, FBO…) keep the name in front of the street address
    const isBusiness = !types.includes('street_address') && !types.includes('premise') && name && !formatted.startsWith(name);
    const fullAddress = isBusiness ? `${name}, ${formatted}` : formatted;
    const category = categorize(fullAddress, types);

    return { ...s, fullAddress, postcode, city, category, isAirport: category === 'airport' };
  } catch {
    sessionToken = null;
    return s;
  }
}

/** Check if text looks like an airport */
export function isAirportLocation(text: string): boolean {
  if (!text) return false;
  return /a[ée]roport|airport|\b(yul|yhu|yqb|yow|yyz|pbg|jfk|ewr|lga)\b|\bfbo\b|aviation/i.test(text);
}
