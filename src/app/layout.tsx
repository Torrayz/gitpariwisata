import type { Metadata } from 'next';
import './globals.css';
import { SavedTripsProvider } from '@/components/SavedTripsContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LokaNusa — Perencana Perjalanan & Pariwisata Nusantara',
  description:
    'Direktori destinasi wisata Indonesia dengan itinerary terstruktur, kalkulator estimasi biaya transparan, dan simulasi pemesanan perjalanan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <SavedTripsProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SavedTripsProvider>
      </body>
    </html>
  );
}
