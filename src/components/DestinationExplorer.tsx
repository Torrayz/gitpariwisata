'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Bookmark, CalendarDays, MapPin, Search, SlidersHorizontal, Star } from 'lucide-react';
import type { Destination, DestinationCategory } from '@/lib/destinations';
import { filterDestinations, formatIDR, type SortOption } from '@/lib/planner';
import { DestinationArtwork } from './DestinationArtwork';
import { useSavedTrips } from './SavedTripsContext';

const CATEGORIES: Array<DestinationCategory | 'Semua'> = [
  'Semua',
  'Alam & Gunung',
  'Bahari & Pulau',
  'Budaya & Sejarah',
  'Eksplorasi',
];

const BUDGET_PRESETS = [
  { label: 'Semua Harga', value: 0 },
  { label: '≤ Rp 2,5 jt', value: 2500000 },
  { label: '≤ Rp 4,5 jt', value: 4500000 },
];

export function DestinationExplorer({ destinations }: { destinations: Destination[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<DestinationCategory | 'Semua'>('Semua');
  const [maxBudgetIDR, setMaxBudgetIDR] = useState(0);
  const [sort, setSort] = useState<SortOption>('recommended');
  const { isSaved, toggleSaved } = useSavedTrips();

  const results = useMemo(
    () => filterDestinations(destinations, { search, category, maxBudgetIDR, sort }),
    [destinations, search, category, maxBudgetIDR, sort]
  );

  return (
    <section id="eksplorasi" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-[#e3dfd6] bg-white p-4 shadow-xs sm:p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64736b]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari destinasi, provinsi, atau aktivitas (misal: Komodo, batik, Bromo)..."
              className="w-full rounded-xl border border-[#dcd7cc] bg-[#faf9f6] py-2.5 pl-10 pr-4 text-sm text-[#141c18] placeholder:text-[#7c8881] focus:border-[#0f766e] focus:bg-white focus:outline-none"
            />
          </label>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-[#54615a]" />
            <select
              aria-label="Filter batas anggaran"
              value={maxBudgetIDR}
              onChange={(e) => setMaxBudgetIDR(Number(e.target.value))}
              className="rounded-xl border border-[#dcd7cc] bg-[#faf9f6] px-3 py-2.5 text-sm text-[#141c18] focus:border-[#0f766e] focus:outline-none"
            >
              {BUDGET_PRESETS.map((preset) => (
                <option key={preset.label} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          <select
            aria-label="Urutkan destinasi"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-xl border border-[#dcd7cc] bg-[#faf9f6] px-3 py-2.5 text-sm text-[#141c18] focus:border-[#0f766e] focus:outline-none"
          >
            <option value="recommended">Rekomendasi</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="duration-asc">Durasi Tercepat</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#efeae0] pt-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => {
              const active = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                    active
                      ? 'bg-[#141c18] text-[#f7f5f0]'
                      : 'bg-[#f1ede4] text-[#3d4a43] hover:bg-[#e5dfd3]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <p className="text-xs font-medium text-[#54615a]">
            Menampilkan {results.length} dari {destinations.length} paket perjalanan
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[#d5cfc3] bg-white/70 p-10 text-center">
          <p className="text-base font-semibold text-[#141c18]">Tidak ada destinasi yang cocok</p>
          <p className="mt-1 text-sm text-[#54615a]">
            Coba longgarkan kata kunci pencarian atau pilih kategori &ldquo;Semua&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCategory('Semua');
              setMaxBudgetIDR(0);
            }}
            className="mt-4 rounded-xl bg-[#141c18] px-4 py-2 text-xs font-semibold text-white hover:bg-[#24322b]"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((dest) => {
            const saved = isSaved(dest.slug);
            return (
              <article
                key={dest.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e3dfd6] bg-white transition hover:-translate-y-0.5 hover:border-[#c8c1b4] hover:shadow-md"
              >
                <div className="relative overflow-hidden">
                  <DestinationArtwork theme={dest.theme} label={dest.name} className="h-44 w-full" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#141c18]/80 px-2.5 py-1 text-[11px] font-semibold text-[#f7f5f0] backdrop-blur-xs">
                    {dest.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleSaved(dest.slug)}
                    aria-label={saved ? `Hapus ${dest.name} dari rencana` : `Simpan ${dest.name} ke rencana`}
                    className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-xs transition ${
                      saved
                        ? 'bg-[#0f766e] text-white'
                        : 'bg-white/85 text-[#141c18] hover:bg-white'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between text-xs text-[#54615a]">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#0f766e]" />
                      {dest.province}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#141c18]">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
                      {dest.rating.toFixed(1)}
                    </span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold tracking-tight text-[#141c18]">
                    <Link href={`/destinasi/${dest.slug}`} className="hover:text-[#0f766e]">
                      {dest.name}
                    </Link>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4a5750]">
                    {dest.summary}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-[#54615a]">
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#f4f1ea] px-2 py-1 font-medium">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {dest.durationDays} Hari
                    </span>
                    <span className="rounded-md bg-[#f4f1ea] px-2 py-1 font-medium">
                      {dest.difficulty}
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between border-t border-[#efeae0] pt-4">
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider text-[#6a7770]">
                        Mulai dari
                      </span>
                      <span className="text-base font-bold text-[#141c18]">
                        {formatIDR(dest.basePriceIDR)}
                      </span>
                      <span className="text-xs text-[#6a7770]"> / org</span>
                    </div>

                    <Link
                      href={`/destinasi/${dest.slug}`}
                      className="rounded-xl bg-[#141c18] px-3.5 py-2 text-xs font-semibold text-white transition group-hover:bg-[#0f766e]"
                    >
                      Lihat &amp; Hitung
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
