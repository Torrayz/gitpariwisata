'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShieldCheck } from 'lucide-react';
import type { Destination } from '@/lib/destinations';
import {
  calculateTripEstimate,
  formatIDR,
  type AccommodationTier,
} from '@/lib/planner';

interface BookingResponse {
  bookingCode: string;
  destinationName: string;
  departureDate: string;
  estimate: {
    grandTotal: number;
    perPerson: number;
  };
}

const TIER_OPTIONS: Array<{ id: AccommodationTier; label: string; hint: string }> = [
  { id: 'standard', label: 'Standard', hint: '1.0x · Homestay / Hotel 3★' },
  { id: 'boutique', label: 'Boutique', hint: '1.35x · Resort / Kabin Pilihan' },
  { id: 'private', label: 'Private', hint: '1.75x · Privat Penuh' },
];

export function TripEstimator({ destination }: { destination: Destination }) {
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState<AccommodationTier>('standard');
  const [includeLocalGuide, setIncludeLocalGuide] = useState(false);
  const [includeAirportTransfer, setIncludeAirportTransfer] = useState(true);
  const [includeDocumentation, setIncludeDocumentation] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState<BookingResponse | null>(null);

  const estimate = useMemo(
    () =>
      calculateTripEstimate({
        destination,
        travelers,
        tier,
        includeLocalGuide,
        includeAirportTransfer,
        includeDocumentation,
      }),
    [destination, travelers, tier, includeLocalGuide, includeAirportTransfer, includeDocumentation]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationSlug: destination.slug,
          fullName,
          email,
          phone,
          departureDate,
          travelers,
          tier,
          includeLocalGuide,
          includeAirportTransfer,
          includeDocumentation,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors(Array.isArray(data.errors) ? data.errors : ['Gagal memproses permintaan.']);
      } else {
        setConfirmed(data);
      }
    } catch {
      setErrors(['Terjadi gangguan jaringan saat mengirim permintaan booking.']);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <aside className="rounded-2xl border border-[#dcd7cc] bg-white p-5 shadow-xs sm:p-6">
      <div className="flex items-center justify-between border-b border-[#efeae0] pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0f766e]">
            Kalkulator &amp; Booking
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#141c18]">Estimasi Biaya Perjalanan</h2>
        </div>
      </div>

      {/* Travelers */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#141c18]">Jumlah Peserta</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTravelers((v) => Math.max(1, v - 1))}
              aria-label="Kurangi peserta"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dcd7cc] hover:bg-[#f4f1ea]"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold">{travelers}</span>
            <button
              type="button"
              onClick={() => setTravelers((v) => Math.min(20, v + 1))}
              aria-label="Tambah peserta"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#dcd7cc] hover:bg-[#f4f1ea]"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        {travelers >= 4 && (
          <p className="mt-1.5 text-xs font-medium text-[#0f766e]">
            Diskon grup {Math.round(estimate.discountRate * 100)}% aktif otomatis!
          </p>
        )}
      </div>

      {/* Accommodation Tier */}
      <div className="mt-5">
        <span className="block text-sm font-medium text-[#141c18]">Kelas Perjalanan</span>
        <div className="mt-2 grid gap-2">
          {TIER_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTier(item.id)}
              className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition ${
                tier === item.id
                  ? 'border-[#0f766e] bg-[#f0fdfa] text-[#141c18]'
                  : 'border-[#e3dfd6] bg-[#faf9f6] text-[#4a5750] hover:border-[#c8c1b4]'
              }`}
            >
              <span className="text-xs font-bold">{item.label}</span>
              <span className="text-[11px]">{item.hint}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="mt-5 space-y-2.5">
        <span className="block text-sm font-medium text-[#141c18]">Opsi Tambahan</span>
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e3dfd6] px-3 py-2 text-xs">
          <span>Antar-jemput bandara/stasiun</span>
          <input
            type="checkbox"
            checked={includeAirportTransfer}
            onChange={(e) => setIncludeAirportTransfer(e.target.checked)}
            className="h-4 w-4 accent-[#0f766e]"
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e3dfd6] px-3 py-2 text-xs">
          <span>Pemandu khusus berbahasa Inggris/ID</span>
          <input
            type="checkbox"
            checked={includeLocalGuide}
            onChange={(e) => setIncludeLocalGuide(e.target.checked)}
            className="h-4 w-4 accent-[#0f766e]"
          />
        </label>
        <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e3dfd6] px-3 py-2 text-xs">
          <span>Dokumentasi foto &amp; drone</span>
          <input
            type="checkbox"
            checked={includeDocumentation}
            onChange={(e) => setIncludeDocumentation(e.target.checked)}
            className="h-4 w-4 accent-[#0f766e]"
          />
        </label>
      </div>

      {/* Breakdown */}
      <div className="mt-5 space-y-2 rounded-xl bg-[#f7f5f0] p-4 text-xs text-[#4a5750]">
        <div className="flex justify-between">
          <span>Paket dasar ({travelers} org)</span>
          <span className="font-medium text-[#141c18]">{formatIDR(estimate.baseSubtotal)}</span>
        </div>
        {estimate.discountAmount > 0 && (
          <div className="flex justify-between text-[#0f766e]">
            <span>Diskon grup ({Math.round(estimate.discountRate * 100)}%)</span>
            <span>-{formatIDR(estimate.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Tambahan layanan</span>
          <span className="font-medium text-[#141c18]">{formatIDR(estimate.addOnsTotal)}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-[#ded9cd] pt-2.5 text-sm font-bold text-[#141c18]">
          <span>Total Estimasi</span>
          <span className="text-base text-[#0f766e]">{formatIDR(estimate.grandTotal)}</span>
        </div>
        <p className="text-right text-[11px] text-[#64736b]">
          ≈ {formatIDR(estimate.perPerson)} / peserta
        </p>
      </div>

      {confirmed ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Permintaan Booking Tercatat
          </div>
          <p className="mt-2 text-xs leading-relaxed">
            Kode referensi: <strong className="font-mono">{confirmed.bookingCode}</strong>
            <br />
            Destinasi: {confirmed.destinationName}
            <br />
            Keberangkatan: {confirmed.departureDate}
            <br />
            Total terverifikasi server: <strong>{formatIDR(confirmed.estimate.grandTotal)}</strong>
          </p>
          <button
            type="button"
            onClick={() => setConfirmed(null)}
            className="mt-3 text-xs font-semibold text-emerald-800 underline"
          >
            Buat simulasi baru
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3 border-t border-[#efeae0] pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#54615a]">
            Ajukan Jadwal Perjalanan
          </p>

          {errors.length > 0 && (
            <ul className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 space-y-1">
              {errors.map((err) => (
                <li key={err}>• {err}</li>
              ))}
            </ul>
          )}

          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nama lengkap pemesan"
            className="w-full rounded-xl border border-[#dcd7cc] px-3 py-2 text-sm focus:border-[#0f766e] focus:outline-none"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email aktif"
            className="w-full rounded-xl border border-[#dcd7cc] px-3 py-2 text-sm focus:border-[#0f766e] focus:outline-none"
          />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nomor WhatsApp (cth: 08123456789)"
            className="w-full rounded-xl border border-[#dcd7cc] px-3 py-2 text-sm focus:border-[#0f766e] focus:outline-none"
          />
          <div>
            <label className="mb-1 block text-xs text-[#54615a]">Tanggal Keberangkatan</label>
            <input
              type="date"
              required
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full rounded-xl border border-[#dcd7cc] px-3 py-2 text-sm focus:border-[#0f766e] focus:outline-none"
            />
          </div>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Catatan khusus (opsional, misal preferensi diet / titik jemput)"
            className="w-full rounded-xl border border-[#dcd7cc] px-3 py-2 text-sm focus:border-[#0f766e] focus:outline-none"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#141c18] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f766e] disabled:opacity-60"
          >
            {submitting ? 'Memverifikasi...' : 'Kirim Permintaan Booking'}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#64736b]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0f766e]" />
            Kalkulasi harga diverifikasi ulang di sisi server
          </p>
        </form>
      )}
    </aside>
  );
}
