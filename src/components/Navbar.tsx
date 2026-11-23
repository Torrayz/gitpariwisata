'use client';

import Link from 'next/link';
import { Compass, BookmarkCheck } from 'lucide-react';
import { useSavedTrips } from './SavedTripsContext';

export function Navbar() {
  const { savedSlugs } = useSavedTrips();

  return (
    <header className="sticky top-0 z-40 border-b border-[#e3dfd6] bg-[#f7f5f0]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[#141c18]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#141c18] text-[#f7f5f0]">
            <Compass className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">LokaNusa</span>
            <span className="block text-[11px] text-[#54615a]">Jelajah Nusantara</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/#eksplorasi"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#35423b] transition hover:bg-[#ebe7dd] hover:text-[#141c18]"
          >
            Destinasi
          </Link>
          <Link
            href="/rencana"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#141c18] px-3.5 py-1.5 text-sm font-medium text-[#f7f5f0] transition hover:bg-[#24322b]"
          >
            <BookmarkCheck className="h-4 w-4 text-emerald-300" />
            <span>Rencana</span>
            <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-xs font-semibold">
              {savedSlugs.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
