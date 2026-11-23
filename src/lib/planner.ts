import type { Destination, DestinationCategory } from './destinations';

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'duration-asc';
export type AccommodationTier = 'standard' | 'boutique' | 'private';

export interface FilterQuery {
  search?: string;
  category?: DestinationCategory | 'Semua';
  maxBudgetIDR?: number;
  sort?: SortOption;
}

export interface TripEstimateInput {
  destination: Destination;
  travelers: number;
  tier: AccommodationTier;
  includeLocalGuide: boolean;
  includeAirportTransfer: boolean;
  includeDocumentation: boolean;
}

export interface TripEstimateBreakdown {
  travelers: number;
  tier: AccommodationTier;
  tierMultiplier: number;
  baseSubtotal: number;
  discountRate: number;
  discountAmount: number;
  addOnsTotal: number;
  grandTotal: number;
  perPerson: number;
}

export interface BookingRequestInput {
  destinationSlug: string;
  fullName: string;
  email: string;
  phone: string;
  departureDate: string;
  travelers: number;
  tier: AccommodationTier;
  includeLocalGuide?: boolean;
  includeAirportTransfer?: boolean;
  includeDocumentation?: boolean;
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: string[];
}

const TIER_MULTIPLIERS: Record<AccommodationTier, number> = {
  standard: 1.0,
  boutique: 1.35,
  private: 1.75,
};

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function filterDestinations(
  destinations: Destination[],
  query: FilterQuery
): Destination[] {
  const normalizedSearch = (query.search || '').trim().toLowerCase();
  const category = query.category || 'Semua';
  const maxBudget = query.maxBudgetIDR;

  const filtered = destinations.filter((dest) => {
    if (category !== 'Semua' && dest.category !== category) {
      return false;
    }

    if (typeof maxBudget === 'number' && maxBudget > 0 && dest.basePriceIDR > maxBudget) {
      return false;
    }

    if (normalizedSearch.length > 0) {
      const searchable = [
        dest.name,
        dest.province,
        dest.region,
        dest.category,
        dest.summary,
        ...dest.highlights,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(normalizedSearch)) {
        return false;
      }
    }

    return true;
  });

  const sort = query.sort || 'recommended';
  const sorted = [...filtered];

  if (sort === 'price-asc') {
    sorted.sort((a, b) => a.basePriceIDR - b.basePriceIDR);
  } else if (sort === 'price-desc') {
    sorted.sort((a, b) => b.basePriceIDR - a.basePriceIDR);
  } else if (sort === 'duration-asc') {
    sorted.sort((a, b) => a.durationDays - b.durationDays);
  } else {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  return sorted;
}

export function calculateTripEstimate(input: TripEstimateInput): TripEstimateBreakdown {
  const travelers = Math.max(1, Math.min(20, Math.floor(input.travelers)));
  const tierMultiplier = TIER_MULTIPLIERS[input.tier] ?? 1.0;

  const baseSubtotal = Math.round(input.destination.basePriceIDR * travelers * tierMultiplier);

  let discountRate = 0;
  if (travelers >= 8) {
    discountRate = 0.1;
  } else if (travelers >= 4) {
    discountRate = 0.05;
  }

  const discountAmount = Math.round(baseSubtotal * discountRate);

  let addOnsTotal = 0;
  if (input.includeLocalGuide) {
    addOnsTotal += 350000 * input.destination.durationDays;
  }
  if (input.includeAirportTransfer) {
    addOnsTotal += 450000;
  }
  if (input.includeDocumentation) {
    addOnsTotal += 600000;
  }

  const grandTotal = baseSubtotal - discountAmount + addOnsTotal;
  const perPerson = Math.round(grandTotal / travelers);

  return {
    travelers,
    tier: input.tier,
    tierMultiplier,
    baseSubtotal,
    discountRate,
    discountAmount,
    addOnsTotal,
    grandTotal,
    perPerson,
  };
}

export function validateBookingRequest(
  payload: Partial<BookingRequestInput>,
  referenceDate: Date = new Date()
): BookingValidationResult {
  const errors: string[] = [];

  if (!payload.destinationSlug || payload.destinationSlug.trim().length < 2) {
    errors.push('Destinasi wajib dipilih.');
  }

  if (!payload.fullName || payload.fullName.trim().length < 3) {
    errors.push('Nama lengkap minimal 3 karakter.');
  }

  const email = (payload.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Alamat email tidak valid.');
  }

  const phone = (payload.phone || '').replace(/[\s-]/g, '');
  if (!/^(\+62|62|0)[0-9]{8,13}$/.test(phone)) {
    errors.push('Nomor WhatsApp/telepon Indonesia tidak valid.');
  }

  if (!payload.departureDate || !/^\d{4}-\d{2}-\d{2}$/.test(payload.departureDate)) {
    errors.push('Tanggal keberangkatan harus berformat YYYY-MM-DD.');
  } else {
    const dep = new Date(`${payload.departureDate}T00:00:00Z`);
    const refDay = new Date(
      Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate())
    );
    if (Number.isNaN(dep.getTime()) || dep <= refDay) {
      errors.push('Tanggal keberangkatan harus setelah hari ini.');
    }
  }

  if (
    typeof payload.travelers !== 'number' ||
    !Number.isInteger(payload.travelers) ||
    payload.travelers < 1 ||
    payload.travelers > 20
  ) {
    errors.push('Jumlah peserta harus antara 1 sampai 20 orang.');
  }

  if (!payload.tier || !['standard', 'boutique', 'private'].includes(payload.tier)) {
    errors.push('Pilihan kelas akomodasi tidak valid.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function generateBookingCode(slug: string, departureDate: string): string {
  const datePart = departureDate.replaceAll('-', '').slice(2, 8);
  const hashSource = `${slug}:${departureDate}:${Date.now()}`;
  let acc = 0;
  for (let i = 0; i < hashSource.length; i++) {
    acc = (acc * 31 + hashSource.charCodeAt(i)) % 10000;
  }
  const suffix = String(acc).padStart(4, '0');
  return `LN-${datePart}-${suffix}`;
}
