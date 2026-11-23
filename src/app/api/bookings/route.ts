import { NextRequest, NextResponse } from 'next/server';
import { getDestinationBySlug } from '@/lib/destinations';
import {
  calculateTripEstimate,
  generateBookingCode,
  validateBookingRequest,
  type BookingRequestInput,
} from '@/lib/planner';

export async function POST(request: NextRequest) {
  let body: Partial<BookingRequestInput>;
  try {
    body = (await request.json()) as Partial<BookingRequestInput>;
  } catch {
    return NextResponse.json({ errors: ['Format JSON tidak valid.'] }, { status: 400 });
  }

  const validation = validateBookingRequest(body);
  if (!validation.valid) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const destination = getDestinationBySlug(body.destinationSlug!);
  if (!destination) {
    return NextResponse.json({ errors: ['Destinasi tidak ditemukan.'] }, { status: 404 });
  }

  const estimate = calculateTripEstimate({
    destination,
    travelers: body.travelers!,
    tier: body.tier!,
    includeLocalGuide: Boolean(body.includeLocalGuide),
    includeAirportTransfer: Boolean(body.includeAirportTransfer),
    includeDocumentation: Boolean(body.includeDocumentation),
  });

  const bookingCode = generateBookingCode(destination.slug, body.departureDate!);

  return NextResponse.json(
    {
      bookingCode,
      destinationSlug: destination.slug,
      destinationName: destination.name,
      departureDate: body.departureDate,
      travelers: estimate.travelers,
      tier: estimate.tier,
      estimate,
      status: 'pending_confirmation',
    },
    { status: 201 }
  );
}
