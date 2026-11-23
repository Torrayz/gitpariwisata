import { DESTINATIONS } from '@/lib/destinations';
import { DestinationExplorer } from '@/components/DestinationExplorer';

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-[#e3dfd6] bg-[#efeae0]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#d6cfc1] bg-white px-3 py-1 text-xs font-semibold text-[#0f766e]">
              Platform Eksplorasi &amp; Estimasi Perjalanan Nusantara
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#141c18] sm:text-5xl">
              Rencanakan perjalanan Nusantara dengan rute jelas dan biaya transparan.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#4a5750] sm:text-lg">
              Telusuri 8 paket destinasi pilihan dari Sumatra hingga Papua, simpan ke daftar rencana perjalanan, dan hitung simulasi anggaran secara instan sebelum berangkat.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dcd6c9] bg-white/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0f766e]">
                01 / Terkurasi
              </p>
              <p className="mt-1 text-sm font-bold text-[#141c18]">Itinerary Hari-per-Hari</p>
              <p className="mt-1 text-xs text-[#54615a]">
                Jadwal realistis lengkap dengan musim terbaik serta daftar fasilitas termasuk &amp; tidak termasuk.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dcd6c9] bg-white/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0f766e]">
                02 / Transparan
              </p>
              <p className="mt-1 text-sm font-bold text-[#141c18]">Kalkulator Biaya Dinamis</p>
              <p className="mt-1 text-xs text-[#54615a]">
                Sesuaikan jumlah peserta, kelas akomodasi, diskon grup, dan add-on dengan verifikasi server.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dcd6c9] bg-white/85 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0f766e]">
                03 / Terstruktur
              </p>
              <p className="mt-1 text-sm font-bold text-[#141c18]">Simpan &amp; Bandingkan Rute</p>
              <p className="mt-1 text-xs text-[#54615a]">
                Tandai destinasi favorit ke ruang rencana untuk membandingkan durasi dan estimasi per orang.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DestinationExplorer destinations={DESTINATIONS} />
    </div>
  );
}
