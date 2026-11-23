import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e3dfd6] bg-[#efeae0]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-[#141c18]">LokaNusa — Platform Wisata Nusantara</p>
          <p className="mt-1 text-xs text-[#54615a]">
            Direktori destinasi, perencana itinerary, dan kalkulator estimasi perjalanan berbasis Next.js &amp; TypeScript.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#35423b]">
          <Link href="/" className="hover:text-[#0f766e]">
            Katalog Destinasi
          </Link>
          <Link href="/rencana" className="hover:text-[#0f766e]">
            Rencana Tersimpan
          </Link>
          <a href="/api/destinations" className="hover:text-[#0f766e]">
            API JSON
          </a>
        </div>
      </div>
    </footer>
  );
}
