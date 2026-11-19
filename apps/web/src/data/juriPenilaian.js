/*
  DATA CONTOH halaman Antrean, Riwayat, dan Profil Juri (sama dengan versi mobile).
*/
import {
  IoArchiveOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
  IoColorPaletteOutline,
  IoCreateOutline,
  IoDocumentLockOutline,
  IoDocumentTextOutline,
  IoImageOutline,
  IoPlayCircleOutline,
  IoPlayForwardOutline,
  IoRadioButtonOnOutline,
  IoReaderOutline,
  IoRibbonOutline,
  IoTrophyOutline,
} from 'react-icons/io5';

/* ---------------- Antrean ---------------- */
export const antreanFilters = ['Semua Antrean (6)', 'FLS2N Tari (4)', 'Kriya Vokasi (2)'];

export const beban = [
  { label: 'Menunggu Dinilai', value: 6, unit: 'Karya', tone: 'amber' },
  { label: 'Draf Berjalan', value: 2, unit: 'Belum Final', tone: 'blue' },
];

// status: 'wait' (menunggu) | 'draft' (draf tersimpan) | 'idle' (belum dimulai)
export const antrean = [
  {
    no: '01', lomba: 'FLS2N Tari Kreasi', tagIcon: IoPlayForwardOutline, status: 'wait', statusLabel: 'Menunggu Juri',
    title: 'Tari Kreasi Nuansa Mapalus Minahasa', name: 'Kevin Pangkey', school: 'SMP Negeri 1 Manado',
    files: [
      { label: 'Video MP4 (8 Menit)', icon: IoPlayCircleOutline },
      { label: 'Naskah PDF', icon: IoDocumentTextOutline },
    ],
    time: '14.20 WITA', cta: 'Mulai Menilai Sekarang', ctaIcon: IoArrowForwardOutline,
  },
  {
    no: '02', lomba: 'FLS2N Tari Kreasi', tagIcon: IoRadioButtonOnOutline, status: 'draft', statusLabel: 'Draf Tersimpan',
    title: 'Harmoni Danau Tondano & Teluk Manado', name: 'Kezia Wenas', school: 'SMKN 1 Manado',
    nilai: { Wiraga: 82, Wirama: 78, Wirasa: 76 }, // nilai draf yang sudah diisi
    progress: {
      filled: 3, total: 4, score: '63.20',
      criteria: [
        { name: 'Wiraga', done: true },
        { name: 'Wirama', done: true },
        { name: 'Wirasa', done: true },
        { name: 'Kreativitas', done: false },
      ],
    },
    cta: 'Lanjutkan Penilaian', ctaIcon: IoCreateOutline,
  },
  {
    no: '03', lomba: 'Festival Kriya', tagIcon: IoColorPaletteOutline, status: 'idle', statusLabel: 'Belum Dimulai',
    title: 'Kerajinan Anyaman Bambu Minahasa Modern', name: 'Jonathan Mandey', school: 'SMKN 2 Manado',
    files: [
      { label: 'Foto Portofolio HD (6 File)', icon: IoImageOutline },
      { label: 'Proposal PDF', icon: IoDocumentTextOutline },
    ],
    cta: 'Buka Lembar Penilaian', ctaIcon: IoReaderOutline,
  },
];

/* ---------------- Riwayat ---------------- */
export const riwayatFilters = ['Semua Lomba (18)', 'FLS2N Seni Tari (10)', 'Kriya Vokasi (8)'];

export const riwayat = [
  {
    code: '#TR-FINAL-08', lomba: 'FLS2N Seni Tari', lock: 'ttd', lockLabel: 'Skor Terkunci • TTE Terverifikasi',
    title: 'Eksplorasi Tari Kabasaran Kontemporer', name: 'Clarissa Sompotan', school: 'SMA Negeri 1 Manado',
    score: '88.50', grade: 'Grade A (Sangat Baik)',
    breakdown: [
      { k: 'K1', name: 'Wiraga', value: '31.50', weight: 35 },
      { k: 'K2', name: 'Wirama', value: '35.00', weight: 40 },
      { k: 'K3', name: 'Wirasa', value: '22.00', weight: 25 },
    ],
  },
  {
    code: '#TR-FINAL-05', lomba: 'FLS2N Seni Tari', lock: 'locked', lockLabel: 'Skor Terkunci',
    title: 'Tari Kolintang Waraney Remaja', name: 'Alvaro Rumambi', school: 'SMP Kristen Eben Haezar',
    score: '82.25', grade: 'Grade A (Sangat Baik)',
    quote: 'Koreografi dinamis dan artikulasi gerak selaras dengan ritme kolintang live. Pertahankan ketajaman ekspresi mimik.',
  },
  {
    code: '#KR-FINAL-02', lomba: 'Kriya Vokasi Sulut', lock: 'locked', lockLabel: 'Skor Terkunci',
    title: 'Desain Busana Tenun Bentenan Modern', name: 'Michelle Pangemanan', school: 'SMKN 1 Manado',
    score: '91.00', grade: 'Grade A+ (Istimewa)',
    tags: [
      { label: 'Top Skor Kriya Manado', icon: IoTrophyOutline },
      { label: 'Dokumentasi Fisik Lengkap', icon: IoArchiveOutline },
    ],
  },
];

/* ---------------- Profil ---------------- */
export const profilStats = [
  { value: '48', label: 'Karya Dinilai', tone: 'blue' },
  { value: '6', label: 'Antrean Lomba', tone: 'sky' },
  { value: '100%', label: 'Validasi TTE', tone: 'amber' },
];

export const dokumenJuri = [
  { title: 'SK Kadis Pendidikan Kota Manado', desc: 'No. 420/Disdik-Mdo/SK-JURI/2026', mono: true, icon: IoDocumentTextOutline, tone: 'blue', action: 'Lihat SK' },
  { title: 'Sertifikat Sertifikasi Juri', desc: 'Bidang Seni Budaya • Disdikbud Sulut', icon: IoRibbonOutline, tone: 'sky', badge: 'Valid', badgeTone: 'green' },
  { title: 'Pakta Integritas Penjurian', desc: 'Penilaian Objektif & Netral 2026', icon: IoDocumentLockOutline, tone: 'amber', badge: 'Digital', badgeTone: 'blue', badgeIcon: IoCheckmarkCircle },
];
