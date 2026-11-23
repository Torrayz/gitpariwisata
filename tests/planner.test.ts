import test from 'node:test';
import assert from 'node:assert/strict';
import { DESTINATIONS, getDestinationBySlug } from '../src/lib/destinations.ts';
import {
  calculateTripEstimate,
  filterDestinations,
  generateBookingCode,
  validateBookingRequest,
} from '../src/lib/planner.ts';

test('filterDestinations filters by search term and category', () => {
  const results = filterDestinations(DESTINATIONS, {
    search: 'komodo',
    category: 'Bahari & Pulau',
  });
  assert.equal(results.length, 1);
  assert.equal(results[0].slug, 'labuan-bajo-komodo-sailing');
});

test('filterDestinations sorts by lowest price ascending', () => {
  const results = filterDestinations(DESTINATIONS, { sort: 'price-asc' });
  assert.ok(results.length >= 2);
  for (let i = 1; i < results.length; i++) {
    assert.ok(results[i].basePriceIDR >= results[i - 1].basePriceIDR);
  }
});

test('calculateTripEstimate applies tier multiplier, group discount, and add-ons', () => {
  const dest = getDestinationBySlug('yogyakarta-heritage-craft');
  assert.ok(dest);

  const est = calculateTripEstimate({
    destination: dest,
    travelers: 4,
    tier: 'boutique',
    includeLocalGuide: true, // 350_000 * 3 days = 1_050_000
    includeAirportTransfer: true, // 450_000
    includeDocumentation: false,
  });

  const expectedBase = Math.round(dest.basePriceIDR * 4 * 1.35);
  const expectedDiscount = Math.round(expectedBase * 0.05);
  const expectedAddOns = 350000 * dest.durationDays + 450000;

  assert.equal(est.baseSubtotal, expectedBase);
  assert.equal(est.discountRate, 0.05);
  assert.equal(est.discountAmount, expectedDiscount);
  assert.equal(est.addOnsTotal, expectedAddOns);
  assert.equal(est.grandTotal, expectedBase - expectedDiscount + expectedAddOns);
});

test('validateBookingRequest rejects past departure dates and invalid phone numbers', () => {
  const refDate = new Date('2026-11-23T00:00:00Z');
  const res = validateBookingRequest(
    {
      destinationSlug: 'bromo-ijen-overland',
      fullName: 'Tri Puji Antoro',
      email: 'tri@example.com',
      phone: '12345',
      departureDate: '2026-11-20',
      travelers: 2,
      tier: 'standard',
    },
    refDate
  );

  assert.equal(res.valid, false);
  assert.ok(res.errors.some((e) => e.includes('WhatsApp')));
  assert.ok(res.errors.some((e) => e.includes('setelah hari ini')));
});

test('validateBookingRequest accepts valid booking payload and formats booking code', () => {
  const refDate = new Date('2026-11-23T00:00:00Z');
  const res = validateBookingRequest(
    {
      destinationSlug: 'bromo-ijen-overland',
      fullName: 'Tri Puji Antoro',
      email: 'tri@example.com',
      phone: '081234567890',
      departureDate: '2026-12-15',
      travelers: 3,
      tier: 'boutique',
    },
    refDate
  );

  assert.equal(res.valid, true);
  assert.equal(res.errors.length, 0);

  const code = generateBookingCode('bromo-ijen-overland', '2026-12-15');
  assert.match(code, /^LN-261215-\d{4}$/);
});
