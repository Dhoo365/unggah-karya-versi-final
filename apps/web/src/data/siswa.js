/*
  DATA CONTOH portal Siswa (sama dengan versi mobile). Ganti dengan data dari API.
*/
import {
  IoDesktopOutline,
  IoFitnessOutline,
  IoFlaskOutline,
  IoHappyOutline,
} from 'react-icons/io5';

export const siswaProfil = {
  initials: 'KP',
  name: 'Kevin Pangkey',
  role: 'Peserta • SMA',
  org: 'SMA Negeri 1 Manado',
  email: 'kevin.pangkey@gmail.com',
  nisn: '0064821901',
};

/* ---------------- Beranda ---------------- */
export const sorotanLomba = {
  label: 'FLS2N Sulut 2025',
  judul: 'Festival & Lomba Seni Siswa Nasional',
  sub: 'Tingkat Provinsi Sulawesi Utara • Ajang Seleksi Bakat Menuju Nasional',
  // tenggat pendaftaran untuk hitung mundur
  tenggat: '2026-12-31T23:59:00+08:00',
};

export const jenjangFilter = [
  { id: 'semua', label: 'Semua Jenjang' },
  { id: 'sma', label: 'SMA' },
  { id: 'smk', label: 'SMK' },
  { id: 'slb', label: 'SLB' },
];

export const statBeranda = [
  { label: 'Lomba Aktif', value: '18', unit: 'Cabang' },
  { label: 'Kab/Kota Terdaftar', value: '15', unit: 'Wilayah' },
  { label: 'Total Peserta', value: '1.240', unit: 'Karya' },
];

// jenjang: dipakai untuk filter
export const lombaAktif = [
  { id: 'lks', jenjangTag: 'SMK', jenjang: ['smk'], tone: 'blue', bidang: 'Bidang Vokasi & Keahlian', icon: IoDesktopOutline, judul: 'LKS SMK Kejuruan (Teknologi & Desain)', deskripsi: 'Desain Web Komersial, Cloud Computing, dan Teknologi Rekayasa.', tenggat: '15 Juli 2025', kuota: '3 Peserta/Sekolah' },
  { id: 'fls2n', jenjangTag: 'SMA / SMK', jenjang: ['sma', 'smk'], tone: 'amber', bidang: 'Kearifan Lokal Sulut', icon: IoHappyOutline, judul: 'FLS2N: Tari Kreasi Daerah & Seni Monolog', deskripsi: 'Eksplorasi cerita rakyat Minahasa, Bolaang Mongondow, dan Sangihe.', tenggat: '20 Juli 2025', kuota: '1 Tim/Cabang' },
  { id: 'o2sn', jenjangTag: 'SMA / SLB', jenjang: ['sma', 'slb'], tone: 'sky', bidang: 'Olahraga & Kebugaran', icon: IoFitnessOutline, judul: 'O2SN: Cabang Atletik & Renang Pelajar', deskripsi: 'Kompetisi fisik putra/putri, rekor waktu sprint dan renang gaya bebas.', tenggat: '25 Juli 2025', kuota: '2 Atlet/Nomor' },
  { id: 'osd', jenjangTag: 'SMA / MA', jenjang: ['sma'], tone: 'purple', bidang: 'Sains & Matematika', icon: IoFlaskOutline, judul: 'Olimpiade Sains Daerah (OSD) Sulut', deskripsi: 'Fisika Terapan, Matematika Komputasi, dan Biologi Kelautan.', tenggat: '30 Juli 2025', kuota: 'Terbuka' },
];

/* ---------------- Unggah Karya ---------------- */
export const lombaUnggah = {
  kategori: 'FLS2N SMA TINGKAT PROVINSI',
  judul: 'Lomba Film Pendek & Dokumenter Budaya Sulawesi Utara',
  batas: '28 Oktober 2025 • 23:59 WITA',
};

export const formUnggahAwal = {
  namaTim: 'CineMapalus SMAN 1',
  asalSekolah: 'SMAN 1 Manado (Kota Manado)',
  namaGuru: 'Dra. Vonny Pangemanan, M.Pd',
  nipGuru: '19780412 200501 2 008',
  tautanVideo: 'https://youtu.be/wP7_sulut_karya_202',
  sinopsis:
    'Dokumenter ini merekam kearifan tradisi Mapalus di pedalaman Minahasa Tenggara sebagai cerminan gotong royong luhur yang kini bertransformasi di kalangan generasi muda digital. Melalui sudut pandang seniman muda, film ini menunjukkan bagaimana nilai kebersamaan tetap hidup di tengah perubahan zaman.',
};

export const berkasSyarat = [
  { nama: 'Kartu Pelajar Tim (Kolektif)', status: 'LENGKAP', tone: 'green', info: 'Terunggah (PDF 1.4 MB) • 24 Okt 2025' },
  { nama: 'Surat Pengantar Cabang Dinas', status: 'TERVERIFIKASI', tone: 'blue', info: 'Terunggah (PDF 1.4 MB) • No: 421/CADIS-MDO/89' },
  { nama: 'Surat Orisinalitas Bermaterai', status: 'MATERAI 10K', tone: 'amber', info: 'Terunggah (PDF 1.4 MB) • Telah ditandatangani' },
];

export const thumbnailKarya = { judul: 'Kain Penghubung Zaman: Mapalus Masa Kini', resolusi: '1920×1080 (HD)' };

/* ---------------- Hasil Lomba ---------------- */
// status: 'diumumkan' | 'penjurian'
export const prestasi = [
  {
    id: 1, status: 'diumumkan', medali: 'gold', badge: 'Juara 1 Tingkat Provinsi', meta: 'FLS2N • 2024',
    judul: 'FLS2N 2024 – Cipta Lagu & Musikalisasi Puisi', sub: 'Bidang Seni Pertunjukan Vokasi & SMA Sulawesi Utara',
    nilaiLabel: 'Nilai Akhir Dewan Juri', nilai: '94.8', quote: 'Komposisi harmoni vokal dan penghayatan syair sangat luar biasa.',
    aksi: ['Lihat SK Pemenang', 'Unduh E-Sertifikat'],
  },
  {
    id: 2, status: 'diumumkan', medali: 'blue', badge: 'Finalis Top 10 Provinsi', meta: 'LKS SMK • 2024',
    judul: 'Lomba Desain Aplikasi Mobile Vokasi Sulut 2024', sub: 'Dinas Pendidikan Daerah Prov. Sulawesi Utara',
    nilaiLabel: 'Nilai Sidang Panelis', nilai: '86.5', aksi: ['Unduh Sertifikat Partisipasi (PDF)'],
  },
  {
    id: 3, status: 'penjurian', medali: 'gray', badge: 'Penjurian Tahap 2', meta: 'OSN-R • 2025',
    judul: 'Olimpiade Sains & Riset Maritim Sulut 2025', sub: 'Kategori: Biologi & Biosfer Kelautan',
    jadwal: '28 Februari 2025 (Pukul 14.00 WITA)',
  },
];
