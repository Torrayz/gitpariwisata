import { NextRequest, NextResponse } from 'next/server';
import { DESTINATIONS, type DestinationCategory } from '@/lib/destinations';
import { filterDestinations, type SortOption } from '@/lib/planner';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('q') || '';
  const category = (searchParams.get('category') || 'Semua') as DestinationCategory | 'Semua';
  const maxBudgetParam = Number(searchParams.get('maxBudget') || 0);
  const sort = (searchParams.get('sort') || 'recommended') as SortOption;

  const items = filterDestinations(DESTINATIONS, {
    search,
    category,
    maxBudgetIDR: Number.isFinite(maxBudgetParam) ? maxBudgetParam : 0,
    sort,
  });

  return NextResponse.json({
    total: items.length,
    destinations: items,
  });
}
