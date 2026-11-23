export type DestinationCategory =
  | 'Alam & Gunung'
  | 'Bahari & Pulau'
  | 'Budaya & Sejarah'
  | 'Eksplorasi';

export type ArtworkTheme =
  | 'volcanic'
  | 'archipelago'
  | 'heritage'
  | 'highland'
  | 'lake'
  | 'coast';

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Destination {
  slug: string;
  name: string;
  province: string;
  region: 'Jawa' | 'Sumatera' | 'Nusa Tenggara' | 'Papua' | 'Kalimantan';
  category: DestinationCategory;
  durationDays: number;
  basePriceIDR: number;
  bestSeason: string;
  difficulty: 'Santai' | 'Menengah' | 'Petualang';
  rating: number;
  summary: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  theme: ArtworkTheme;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: 'bromo-ijen-overland',
    name: 'Bromo & Kawah Ijen Overland',
    province: 'Jawa Timur',
    region: 'Jawa',
    category: 'Alam & Gunung',
    durationDays: 3,
    basePriceIDR: 2450000,
    bestSeason: 'Mei – Oktober',
    difficulty: 'Menengah',
    rating: 4.9,
    summary:
      'Perjalanan lintas kaldera Tengger menuju kawah belerang Ijen dengan rute subuh terencana dan jeda istirahat yang realistis.',
    highlights: [
      'Sunrise dari titik pandang King Kong Hill',
      'Lintas lautan pasir dengan 4x4 Jeep lokal',
      'Pendakian dini hari ke Kawah Ijen & fenomena api biru',
    ],
    included: [
      'Transportasi AC dari Surabaya / Malang',
      '4x4 Jeep Bromo & tiket masuk Taman Nasional',
      'Akomodasi 2 malam + sarapan',
      'Masker respirator & pemandu lokal berlisensi',
    ],
    excluded: [
      'Tiket pesawat/kereta menuju titik temu',
      'Makan siang & makan malam di luar jadwal',
      'Asuransi perjalanan pribadi',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Surabaya → Kawasan Tengger',
        activities: [
          'Penjemputan pagi di stasiun/bandara Surabaya atau Malang',
          'Check-in penginapan di Cemoro Lawang & briefing rute subuh',
          'Eksplorasi sore di Bukit Mentigen',
        ],
      },
      {
        day: 2,
        title: 'Sunrise Bromo → Banyuwangi',
        activities: [
          'Berangkat 03.00 WIB dengan Jeep menuju titik pandang matahari terbit',
          'Trekking ringan ke bibir Kawah Bromo & Savana Teletubbies',
          'Perjalanan darat menuju Banyuwangi dan istirahat',
        ],
      },
      {
        day: 3,
        title: 'Kawah Ijen → Pengantaran',
        activities: [
          'Pendakian dari Paltuding pukul 01.30 WIB dengan pemandu lokal',
          'Menikmati lanskap danau asam Kawah Ijen saat fajar',
          'Kembali ke penginapan & pengantaran ke stasiun/pelabuhan Ketapang',
        ],
      },
    ],
    theme: 'volcanic',
  },
  {
    slug: 'labuan-bajo-komodo-sailing',
    name: 'Komodo & Padar Liveaboard',
    province: 'Nusa Tenggara Timur',
    region: 'Nusa Tenggara',
    category: 'Bahari & Pulau',
    durationDays: 3,
    basePriceIDR: 4200000,
    bestSeason: 'April – November',
    difficulty: 'Santai',
    rating: 4.9,
    summary:
      'Pelayaran 3 hari di Taman Nasional Komodo menyusuri Pulau Padar, Pink Beach, dan spot snorkeling arus tenang.',
    highlights: [
      'Trekking fajar di punggung bukit Pulau Padar',
      'Pengamatan komodo bersama ranger resmi di Pulau Rinca',
      'Snorkeling di Manta Point & Taka Makassar',
    ],
    included: [
      'Kabin kapal pinisi ber-AC selama 3 hari 2 malam',
      'Makan penuh selama pelayaran + air minum isi ulang',
      'Peralatan snorkeling & dokumentasi dasar',
    ],
    excluded: [
      'Tiket pesawat menuju Bandara Komodo (LBJ)',
      'Retribusi tiket masuk Taman Nasional Komodo',
      'Pengeluaran pribadi di Labuan Bajo',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Labuan Bajo → Pulau Kelor & Kalong',
        activities: [
          'Boarding di pelabuhan Labuan Bajo pukul 10.00 WITA',
          'Trekking singkat di Pulau Kelor & snorkeling di Manjarite',
          'Menyaksikan ribuan kelelawar senja di Pulau Kalong',
        ],
      },
      {
        day: 2,
        title: 'Pulau Padar → Pink Beach → Manta Point',
        activities: [
          'Pendakian subuh ke puncak Pulau Padar',
          'Berhenti di Pink Beach & pengamatan satwa di Loh Buaya',
          'Snorkeling sore di Taka Makassar dan Manta Point',
        ],
      },
      {
        day: 3,
        title: 'Pulau Kanawa → Kembali ke Pelabuhan',
        activities: [
          'Snorkeling pagi di terumbu dangkal Pulau Kanawa',
          'Makan siang di atas kapal & kembali ke Labuan Bajo',
        ],
      },
    ],
    theme: 'archipelago',
  },
  {
    slug: 'yogyakarta-heritage-craft',
    name: 'Yogyakarta Living Heritage',
    province: 'DI Yogyakarta & Jawa Tengah',
    region: 'Jawa',
    category: 'Budaya & Sejarah',
    durationDays: 3,
    basePriceIDR: 1850000,
    bestSeason: 'Sepanjang Tahun',
    difficulty: 'Santai',
    rating: 4.8,
    summary:
      'Eksplorasi arsitektur candi klasik, lokakarya batik tulis di Imogiri, dan tur kuliner malam pasar tradisional.',
    highlights: [
      'Kunjungan pagi ke kawasan Candi Borobudur & Prambanan',
      'Kelas membatik tulis langsung bersama perajin Giriloyo',
      'Jelajah Kotagede & kuliner Pasar Ngasem',
    ],
    included: [
      'Transportasi lokal privat + driver berpengalaman',
      'Hotel butik 2 malam di area pusat kota',
      'Tiket masuk situs budaya & bahan workshop batik',
    ],
    excluded: [
      'Tiket kereta/pesawat ke Yogyakarta',
      'Makan malam hari ke-2 (bebas eksplorasi)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Kotagede & Kerajinan Perak',
        activities: [
          'Penjemputan di Stasiun Tugu atau Bandara YIA',
          'Jalan kaki menyusuri gang bersejarah Kotagede',
          'Sesi malam mencicipi kuliner khas di Pasar Ngasem & Prawirotaman',
        ],
      },
      {
        day: 2,
        title: 'Borobudur Pagi & Giriloyo',
        activities: [
          'Kunjungan pagi ke kawasan Borobudur & museum sekitar',
          'Workshop membatik tulis dengan pewarna alami di Desa Giriloyo',
          'Menikmati senja di pelataran Candi Ratu Boko',
        ],
      },
      {
        day: 3,
        title: 'Prambanan & Kepulangan',
        activities: [
          'Tur arsitektur Candi Prambanan dan Candi Plaosan',
          'Belanja kopi/oleh-oleh lokal sebelum pengantaran pulang',
        ],
      },
    ],
    theme: 'heritage',
  },
  {
    slug: 'wae-rebo-flores-highlands',
    name: 'Wae Rebo & Pegunungan Flores',
    province: 'Nusa Tenggara Timur',
    region: 'Nusa Tenggara',
    category: 'Eksplorasi',
    durationDays: 4,
    basePriceIDR: 3650000,
    bestSeason: 'Mei – September',
    difficulty: 'Petualang',
    rating: 4.9,
    summary:
      'Pendakian hutan pegunungan Flores menuju kampung adat Mbaru Niang dan persawahan jaring laba-laba Cancar.',
    highlights: [
      'Menginap satu malam di rumah adat kerucut Mbaru Niang',
      'Ritual penyambutan adat Wae Luu bersama tetua kampung',
      'Menyaksikan sawah Lingko Cancar & kopi arabika Manggarai',
    ],
    included: [
      'Mobil 4WD rute Flores + pemandu lokal Manggarai',
      'Donasi adat, akomodasi rumah adat & 2 malam hotel',
      'Makan sesuai itinerary selama di pegunungan',
    ],
    excluded: [
      'Tiket penerbangan ke Labuan Bajo / Ruteng',
      'Porter pribadi selama jalur pendakian Denge–Wae Rebo',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Labuan Bajo → Denge',
        activities: [
          'Perjalanan lintas pesisir selatan menuju Desa Denge',
          'Berhenti di Cancar melihat sawah Lingko dari bukit',
          'Istirahat di homestay Denge',
        ],
      },
      {
        day: 2,
        title: 'Trekking Menuju Wae Rebo',
        activities: [
          'Pendakian ±3 jam melewati hutan hujan pegunungan',
          'Upacara penyambutan di rumah utama & interaksi bersama warga',
          'Makan malam hangat dan bermalam di Mbaru Niang',
        ],
      },
      {
        day: 3,
        title: 'Pagi di Kabut Wae Rebo → Ruteng',
        activities: [
          'Menikmati kopi Manggarai di tengah kabut lembah',
          'Turun kembali ke Denge dan lanjut menuju kota Ruteng',
        ],
      },
      {
        day: 4,
        title: 'Ruteng → Labuan Bajo',
        activities: [
          'Kunjungan ke Gua Liang Bua sebelum kembali ke Labuan Bajo',
          'Pengantaran ke bandara atau hotel',
        ],
      },
    ],
    theme: 'highland',
  },
  {
    slug: 'danau-toba-samosir-loop',
    name: 'Danau Toba & Samosir Loop',
    province: 'Sumatera Utara',
    region: 'Sumatera',
    category: 'Alam & Gunung',
    durationDays: 4,
    basePriceIDR: 2950000,
    bestSeason: 'Februari – Oktober',
    difficulty: 'Santai',
    rating: 4.7,
    summary:
      'Rute melingkar menyusuri kaldera Toba, Bukit Holbung, air terjun Sipiso-piso, dan desa tenun Ulos di Samosir.',
    highlights: [
      'Panorama kaldera dari Bukit Holbung & Menara Pandang Tele',
      'Menyusuri peninggalan batu Huta Siallagan di Tomok',
      'Berburu kopi Gayo & Sidikalang di dataran tinggi Karo',
    ],
    included: [
      'Transportasi privat + tiket penyeberangan feri ke Samosir',
      'Akomodasi 3 malam di tepi danau & Berastagi',
      'Sarapan harian & tiket masuk seluruh objek wisata',
    ],
    excluded: [
      'Tiket pesawat ke Bandara Kualanamu / Silangit',
      'Makan siang & makan malam pilihan pribadi',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Silangit / Medan → Samosir',
        activities: [
          'Penjemputan & perjalanan menuju Parapat atau Tele',
          'Menyeberang ke Pulau Samosir dan check-in tepi danau',
        ],
      },
      {
        day: 2,
        title: 'Budaya Batak & Bukit Holbung',
        activities: [
          'Mengunjungi Huta Siallagan & sentra tenun Ulos tradisional',
          'Sore di punggung Bukit Holbung untuk menikmati panorama danau',
        ],
      },
      {
        day: 3,
        title: 'Sipiso-piso → Berastagi',
        activities: [
          'Singgah di Air Terjun Sipiso-piso di sisi utara kaldera',
          'Menjelajah pasar buah dan dataran tinggi Berastagi',
        ],
      },
      {
        day: 4,
        title: 'Berastagi → Kualanamu',
        activities: [
          'Pendakian ringan pagi ke Bukit Gundaling',
          'Pengantaran kembali menuju bandara',
        ],
      },
    ],
    theme: 'lake',
  },
  {
    slug: 'belitung-granite-hopping',
    name: 'Belitung Granite Island Hopping',
    province: 'Bangka Belitung',
    region: 'Sumatera',
    category: 'Bahari & Pulau',
    durationDays: 3,
    basePriceIDR: 2150000,
    bestSeason: 'Maret – Oktober',
    difficulty: 'Santai',
    rating: 4.8,
    summary:
      'Jelajah gugusan batu granit Tanjung Tinggi, mercusuar abad ke-19 di Pulau Lengkuas, dan danau kaolin biru.',
    highlights: [
      'Island hopping perahu tradisional ke Pulau Lengkuas & Batu Berlayar',
      'Snorkeling air jernih di Pulau Kepayang',
      'Kopi lokal khas Manggar & lanskap Danau Kaolin',
    ],
    included: [
      'Transportasi darat + sewa perahu island hopping',
      'Hotel 2 malam di area Tanjung Pandan',
      'Perlengkapan snorkeling, pelampung & makan siang piknik pulau',
    ],
    excluded: [
      'Tiket pesawat menuju Bandara H.A.S. Hanandjoeddin (TJQ)',
      'Makan malam & belanja suvenir pribadi',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Belitung Timur & Pantai Tanjung Tinggi',
        activities: [
          'Eksplorasi Belitung Timur, Museum Kata, dan kedai kopi Manggar',
          'Menikmati senja di antara formasi granit Tanjung Tinggi',
        ],
      },
      {
        day: 2,
        title: 'Island Hopping Pulau Lengkuas',
        activities: [
          'Berlayar dari Tanjung Kelayang menuju Pulau Pasir & Batu Berlayar',
          'Snorkeling dan naik ke area mercusuar Pulau Lengkuas',
        ],
      },
      {
        day: 3,
        title: 'Danau Kaolin & Kepulangan',
        activities: [
          'Persinggahan pagi di Danau Kaolin',
          'Pengantaran menuju bandara sesuai jadwal penerbangan',
        ],
      },
    ],
    theme: 'coast',
  },
  {
    slug: 'raja-ampat-misool-wayag',
    name: 'Raja Ampat Piaynemo & Teluk Kabui',
    province: 'Papua Barat Daya',
    region: 'Papua',
    category: 'Bahari & Pulau',
    durationDays: 4,
    basePriceIDR: 6900000,
    bestSeason: 'Oktober – April',
    difficulty: 'Menengah',
    rating: 5.0,
    summary:
      'Ekspedisi bahari terstruktur menyusuri gugusan karst Piaynemo, laguna Teluk Kabui, dan desa wisata Arborek.',
    highlights: [
      'Panorama puncak karst Piaynemo & Telaga Bintang',
      'Snorkeling terumbu karang sehat di Yenbuba & Sauwandarek',
      'Interaksi komunitas di Desa Wisata Arborek',
    ],
    included: [
      'Speedboat charter + tiket kapal cepat Sorong–Waisai PP',
      'Homestay tepi laut 3 malam & makan 3 kali sehari',
      'Pemandu bahari lokal & dokumentasi bawah air',
    ],
    excluded: [
      'Tiket pesawat ke Bandara Domine Eduard Osok (SOQ)',
      'Kartu Jasa Lingkungan Raja Ampat (PIN konservasi)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Sorong → Waisai → Friwen',
        activities: [
          'Penyeberangan pagi menuju Waisai',
          'Check-in homestay & snorkeling sore di Friwen Wall',
        ],
      },
      {
        day: 2,
        title: 'Piaynemo & Telaga Bintang',
        activities: [
          'Pelayaran menuju gugusan karst Piaynemo dan puncak Telaga Bintang',
          'Makan siang dan snorkeling di Yenbuba Jetty',
        ],
      },
      {
        day: 3,
        title: 'Arborek → Teluk Kabui → Pasir Timbul',
        activities: [
          'Berkunjung ke Desa Arborek & Sauwandarek',
          'Menyusuri tebing karst Teluk Kabui & Batu Pensil',
        ],
      },
      {
        day: 4,
        title: 'Waisai → Sorong',
        activities: [
          'Kapal cepat pagi kembali ke Sorong dan pengantaran bandara',
        ],
      },
    ],
    theme: 'archipelago',
  },
  {
    slug: 'derawan-kakaban-maratua',
    name: 'Derawan, Kakaban & Maratua',
    province: 'Kalimantan Timur',
    region: 'Kalimantan',
    category: 'Eksplorasi',
    durationDays: 4,
    basePriceIDR: 4100000,
    bestSeason: 'April – Oktober',
    difficulty: 'Santai',
    rating: 4.8,
    summary:
      'Perjalanan pulau terpencil Kalimantan Timur mengunjungi danau ubur-ubur tak menyengat di Kakaban dan atol Maratua.',
    highlights: [
      'Berenang di Danau Kakaban bersama ubur-ubur tanpa sengat',
      'Pengamatan penyu hijau di Pulau Sangalaki',
      'Laguna biru jernih Goa Haji Mangku di Maratua',
    ],
    included: [
      'Penjemputan Bandara Berau + transfer speedboat ke Derawan',
      'Penginapan water cottage 3 malam + makan sesuai jadwal',
      'Sewa alat snorkeling & pemandu pulau',
    ],
    excluded: [
      'Tiket penerbangan menuju Berau (BEJ)',
      'Alat selam (opsional bagi penyelam berlisensi)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Berau → Tanjung Batu → Derawan',
        activities: [
          'Perjalanan darat ke pelabuhan Tanjung Batu',
          'Menyeberang dengan speedboat ke Pulau Derawan',
        ],
      },
      {
        day: 2,
        title: 'Maratua & Goa Haji Mangku',
        activities: [
          'Menuju laguna Maratua & Gua Haji Mangku',
          'Snorkeling di sekitar atol luar',
        ],
      },
      {
        day: 3,
        title: 'Kakaban & Sangalaki',
        activities: [
          'Berenang di Danau Kakaban & trekking singkat hutan bakau',
          'Melihat tukik penyu di Pulau Sangalaki',
        ],
      },
      {
        day: 4,
        title: 'Derawan → Berau',
        activities: [
          'Kembali ke Berau untuk penerbangan pulang',
        ],
      },
    ],
    theme: 'coast',
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((item) => item.slug === slug);
}
