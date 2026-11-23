import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Check, MapPin, Mountain, Sun, X } from 'lucide-react';
import { DESTINATIONS, getDestinationBySlug } from '@/lib/destinations';
import { DestinationArtwork } from '@/components/DestinationArtwork';
import { TripEstimator } from '@/components/TripEstimator';

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#54615a] hover:text-[#141c18]"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke katalog destinasi
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.45fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl border border-[#e3dfd6] bg-white">
            <DestinationArtwork theme={destination.theme} label={destination.name} className="h-64 w-full" />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-[#141c18] px-3 py-1 font-semibold text-white">
                  {destination.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f1ea] px-3 py-1 font-medium text-[#35423b]">
                  <MapPin className="h-3.5 w-3.5 text-[#0f766e]" />
                  {destination.province}
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#141c18] sm:text-3xl">
                {destination.name}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#4a5750]">{destination.summary}</p>

              <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-[#f7f5f0] p-4 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#0f766e]" />
                  <div>
                    <span className="block text-[#6a7770]">Durasi</span>
                    <strong className="text-[#141c18]">{destination.durationDays} Hari</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-600" />
                  <div>
                    <span className="block text-[#6a7770]">Musim Terbaik</span>
                    <strong className="text-[#141c18]">{destination.bestSeason}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mountain className="h-4 w-4 text-[#0f766e]" />
                  <div>
                    <span className="block text-[#6a7770]">Level Rute</span>
                    <strong className="text-[#141c18]">{destination.difficulty}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <section className="mt-6 rounded-2xl border border-[#e3dfd6] bg-white p-6">
            <h2 className="text-lg font-bold text-[#141c18]">Sorotan Perjalanan</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#4a5750]">
              {destination.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0f766e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Itinerary */}
          <section className="mt-6 rounded-2xl border border-[#e3dfd6] bg-white p-6">
            <h2 className="text-lg font-bold text-[#141c18]">Rencana Harian</h2>
            <div className="mt-4 space-y-4">
              {destination.itinerary.map((day) => (
                <div key={day.day} className="rounded-xl border border-[#efeae0] bg-[#faf9f6] p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0f766e]">
                    Hari {day.day}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-[#141c18]">{day.title}</h3>
                  <ul className="mt-2 space-y-1 text-xs leading-relaxed text-[#4a5750]">
                    {day.activities.map((act) => (
                      <li key={act}>• {act}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Included / Excluded */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
              <h3 className="text-sm font-bold text-[#141c18]">Termasuk dalam Paket</h3>
              <ul className="mt-3 space-y-2 text-xs text-[#4a5750]">
                {destination.included.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
              <h3 className="text-sm font-bold text-[#141c18]">Belum Termasuk</h3>
              <ul className="mt-3 space-y-2 text-xs text-[#4a5750]">
                {destination.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <TripEstimator destination={destination} />
        </div>
      </div>
    </div>
  );
}
