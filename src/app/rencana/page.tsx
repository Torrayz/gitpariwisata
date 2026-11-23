'use client';

import Link from 'next/link';
import { Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { DESTINATIONS } from '@/lib/destinations';
import { formatIDR } from '@/lib/planner';
import { useSavedTrips } from '@/components/SavedTripsContext';
import { DestinationArtwork } from '@/components/DestinationArtwork';

export default function SavedPlanPage() {
  const { savedSlugs, toggleSaved, clearSaved } = useSavedTrips();

  const savedDestinations = DESTINATIONS.filter((d) => savedSlugs.includes(d.slug));
  const combinedBaseBudget = savedDestinations.reduce((sum, d) => sum + d.basePriceIDR, 0);
  const totalDays = savedDestinations.reduce((sum, d) => sum + d.durationDays, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e3dfd6] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0f766e]">
            Ruang Rencana Pribadi
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#141c18] sm:text-3xl">
            Destinasi Tersimpan ({savedDestinations.length})
          </h1>
        </div>

        {savedDestinations.length > 0 && (
          <button
            type="button"
            onClick={clearSaved}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#dcd7cc] bg-white px-3.5 py-2 text-xs font-semibold text-[#54615a] hover:border-red-300 hover:text-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Kosongkan Daftar
          </button>
        )}
      </div>

      {savedDestinations.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-[#d5cfc3] bg-white p-10 text-center">
          <Bookmark className="mx-auto h-8 w-8 text-[#0f766e]" />
          <h2 className="mt-3 text-base font-bold text-[#141c18]">Belum ada destinasi disimpan</h2>
          <p className="mt-1 text-sm text-[#54615a]">
            Tandai destinasi dari katalog utama untuk membandingkan durasi dan estimasi anggaran di sini.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#141c18] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0f766e]"
          >
            Jelajahi Destinasi
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
              <span className="text-xs text-[#6a7770]">Akumulasi Durasi Rute</span>
              <p className="mt-1 text-2xl font-bold text-[#141c18]">{totalDays} Hari</p>
            </div>
            <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
              <span className="text-xs text-[#6a7770]">Estimasi Total Dasar (1 orang/paket)</span>
              <p className="mt-1 text-2xl font-bold text-[#0f766e]">
                {formatIDR(combinedBaseBudget)}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {savedDestinations.map((dest) => (
              <div
                key={dest.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#e3dfd6] bg-white sm:flex-row"
              >
                <DestinationArtwork
                  theme={dest.theme}
                  label={dest.name}
                  className="h-36 w-full sm:h-auto sm:w-52 shrink-0"
                />
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#0f766e]">{dest.province}</span>
                      <span className="text-xs text-[#54615a]">{dest.durationDays} Hari</span>
                    </div>
                    <h2 className="mt-1 text-lg font-bold text-[#141c18]">{dest.name}</h2>
                    <p className="mt-1 text-xs text-[#54615a]">{dest.summary}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#efeae0] pt-3">
                    <span className="text-sm font-bold text-[#141c18]">
                      {formatIDR(dest.basePriceIDR)} <span className="text-xs font-normal text-[#6a7770]">/ org</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSaved(dest.slug)}
                        className="rounded-lg border border-[#dcd7cc] px-3 py-1.5 text-xs font-medium text-[#54615a] hover:border-red-300 hover:text-red-700"
                      >
                        Hapus
                      </button>
                      <Link
                        href={`/destinasi/${dest.slug}`}
                        className="rounded-lg bg-[#141c18] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0f766e]"
                      >
                        Hitung &amp; Booking
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
