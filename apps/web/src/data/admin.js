/*
  DATA CONTOH portal Admin (sama dengan versi mobile).
  Nanti ganti dengan data dari backend: buat endpoint di apps/api,
  lalu ambil lewat src/services/api.js.
*/
import {
  IoCheckmarkCircleOutline,
  IoCheckmarkDoneOutline,
  IoBulbOutline,
  IoBrushOutline,
  IoClipboardOutline,
  IoColorPaletteOutline,
  IoCreateOutline,
  IoDocumentTextOutline,
  IoFileTrayFullOutline,
  IoFlaskOutline,
  IoFolderOutline,
  IoHammerOutline,
  IoIdCardOutline,
  IoMedalOutline,
  IoMegaphoneOutline,
  IoMusicalNoteOutline,
  IoMusicalNotesOutline,
  IoPeopleOutline,
  IoRemoveCircleOutline,
  IoRibbonOutline,
  IoShieldCheckmarkOutline,
  IoShieldOutline,
  IoTrophyOutline,
} from 'react-icons/io5';

export const adminProfile = {
  initials: 'SU',
  name: 'Admin Disdikbud Manado',
  role: 'Verifikator Utama',
  org: 'Dinas Pendidikan & Kebudayaan Kota Manado',
  email: 'disdikbud@kotamanado.go.id',
};

/* ---------------- Beranda (Lomba) ---------------- */

export const jenjangFilters = ['Semua Jenjang', 'SMA / MA', 'SMK Vokasi', 'SMP / MTs', 'SLB / Khusus'];

export const berandaStats = [
  { value: 12, label: 'Lomba Aktif', icon: IoTrophyOutline, tone: 'blue' },
  { value: 348, label: 'Siswa Terdaftar', icon: IoPeopleOutline, tone: 'sky' },
  { value: 18, label: 'Dewan Juri Aktif', icon: IoHammerOutline, tone: 'amber' },
  { value: 156, label: 'Sertifikat Valid', icon: IoCheckmarkCircleOutline, tone: 'green' },
];

export const lombaList = [
  {
    level: 'SMA / MA',
    levelTone: 'blue',
    status: 'Pendaftaran Buka',
    statusTone: 'green',
    title: 'FLS2N Seni Budaya & Tari Kreasi 2026',
    meta: 'Tingkat Kota Manado • Seleksi Tahap I',
    quota: { label: 'Kuota Sub-rayon (Malalayang, Tikala, Wenang, Sario)', value: '84 / 100 Peserta', pct: 84, tone: 'blue' },
    foot: { icon: IoDocumentTextOutline, text: 'Juknis_FLS2N_Manado_2026.pdf', tone: 'blue', btn: 'Detail Kuota' },
  },
  {
    level: 'SMK Vokasi',
    levelTone: 'sky',
    status: 'Tahap Penjurian',
    statusTone: 'amber',
    title: 'Festival Inovasi Teknologi Rekayasa Vokasi',
    meta: 'Tingkat Kota Manado • Bidang IoT & Rekayasa Terapan',
    quota: { label: 'Kuota Terisi', value: '42 / 50 Tim Sekolah', pct: 84, tone: 'sky' },
    foot: { icon: IoCheckmarkCircleOutline, text: 'Rubrik Penilaian Terkunci', tone: 'green', btn: 'Lihat Portofolio' },
  },
  {
    level: 'SMP / MTs',
    levelTone: 'gray',
    status: 'Validasi Berkas',
    statusTone: 'gray',
    title: 'O2SN Olahraga Atletik & Bulu Tangkis',
    meta: 'Tingkat Kota Manado • Seleksi Kontingen 11 Kecamatan Kota Manado',
    quota: null,
    verified: '112 Atlet',
  },
];

export const juriAvatars = [
  { initials: 'DR', tone: 'blue' },
  { initials: 'MK', tone: 'sky' },
  { initials: 'AL', tone: 'amber' },
];

export const kriteriaRingkas = [
  { title: 'Kreativitas & Orisinalitas Kearifan Lokal', pct: 35, tone: 'blue', desc: 'Skala penilaian 10 - 100 poin (Kunci Juri: Min. 70)' },
  { title: 'Kesesuaian Teknis & Portofolio Karya', pct: 40, tone: 'sky', desc: 'Standar kesesuaian dokumen juknis resmi Disdikbud Kota Manado' },
  { title: 'Presentasi & Penguasaan Materi', pct: 25, tone: 'amber', desc: 'Sesi tanya jawab panelis dewan juri daerah' },
];

export const pengumuman = [
  { title: 'Juara FLS2N Seni Tari Tingkat Kota Manado', sub: 'Diterbitkan • 26 Feb 2026', badge: 'Diterbitkan', icon: IoMegaphoneOutline, tone: 'green', dashed: false },
  { title: 'Hasil Seleksi Portofolio Vokasi IoT', sub: 'Menunggu TTD Kadis Pendidikan Kota Manado', badge: 'Draft SK', icon: IoCreateOutline, tone: 'amber', dashed: true },
];

/* ---------------- Peserta ---------------- */

export const pesertaStats = [
  { label: 'Menunggu', value: 24 },
  { label: 'Tervalidasi', value: 382 },
  { label: 'E-Sertifikat', value: 116 },
];

export const topTalenta = {
  rank: 1,
  nama: 'Álvaro G. Rumambi',
  info: 'SMAN 9 Binsus Manado • Robotika Maritim',
  skor: 98.4,
};

export const pesertaList = [
  {
    id: 'kw',
    initial: 'KW',
    avatarTone: 'purple',
    nama: 'Kezia Wenas',
    asal: 'SMK N 1 Manado',
    nisn: '0064829104',
    lomba: 'Lomba Cipta Animasi Budaya Manado',
    waktu: 'Diajukan: 2 jam lalu',
    judul: 'Eksplorasi Legenda Waraney dalam Animasi 3D Sinematik',
    files: [
      { nama: 'Video Karya (MP4, 4K)', size: '184 MB', icon: IoFileTrayFullOutline },
      { nama: 'Proposal & Naskah', size: '2 MB', icon: IoDocumentTextOutline },
    ],
  },
  {
    id: 'jm',
    initial: 'JM',
    avatarTone: 'blue',
    nama: 'Jonathan Mandey',
    asal: 'SMK N 2 Manado',
    nisn: '0064829152',
    lomba: 'Karya Ilmiah Remaja (KIR) – Konservasi Pesisir Teluk Manado',
    waktu: 'Diajukan: Kemarin',
    judul: 'Pemanfaatan Potensi Panas Bumi Danau Linow untuk Ketahanan Energi Desa',
    files: [
      { nama: 'Jurnal_Lengkap_Final.pdf', size: '12 MB', icon: IoDocumentTextOutline },
      { nama: 'Lembar Pengesahan', size: '1 MB', icon: IoDocumentTextOutline },
    ],
  },
];

export const pesertaTervalidasi = {
  initial: 'CS',
  avatarTone: 'amber',
  nama: 'Clarissa',
  asal: 'SMAN 1 Manado',
  lomba: 'FLS2N Solo Vocal Putri Kota Manado 2025',
  judul: 'Lagu Wajib Daerah: "O Ina Ni Keke" & Vokal Klasik Nusantara',
};

/* ---------------- Dewan Juri ---------------- */

export const juriFilters = ['Semua (18)', 'Seni Tari (6)', 'Kriya & Vokasi (5)', 'KIR (4)'];

export const juriStats = [
  { label: 'Juri Terdaftar', value: 18, unit: 'Personil', icon: IoIdCardOutline, tone: 'blue', note: '100% Terverifikasi' },
  { label: 'Juri Bertugas', value: 14, unit: 'Aktif', icon: IoHammerOutline, tone: 'sky', note: 'Mencakup 5 Kategori' },
  { label: 'Juri Cadangan', value: 4, unit: 'Siap Tugas', icon: IoShieldOutline, tone: 'gray', note: 'Standby Disdikbud' },
  { label: 'Pakta Integritas', value: '100%', unit: 'Valid', icon: IoShieldCheckmarkOutline, tone: 'green', note: 'TTE BSrE Lengkap', noteIcon: IoCheckmarkCircleOutline },
];

export const juriList = [
  {
    initial: 'RS',
    avatarTone: 'blue',
    name: 'Dr. Ronald Sumendap, M.Sn',
    role: 'Ketua Dewan Juri Seni Budaya',
    meta: 'NIP: 197805142003121002 • Instansi: UNIMA Manado',
    chips: [
      { label: 'Aktif Menilai', tone: 'green', icon: IoCheckmarkCircleOutline },
      { label: 'FLS2N Seni Tari 2026', tone: 'blue', icon: IoRibbonOutline },
    ],
    sk: 'Penugasan SK: No. 421/Dikbud/142',
  },
  {
    initial: 'MK',
    avatarTone: 'blue',
    name: 'Dra. Merry Korompis, S.Pd',
    role: 'Juri FLS2N Musik & Vokal Tradisi',
    meta: 'NIP: 198203112006042011 • Praktisi Budaya Minahasa',
    chips: [
      { label: 'SK Kadis Terbit', tone: 'blue', icon: IoDocumentTextOutline },
      { label: 'Vokal Solo & Tradisi Minahasa', tone: 'gray', icon: IoMusicalNoteOutline },
    ],
    sk: 'SK Kadis: No. 800/Dikbud-Mdo/55',
  },
  {
    initial: 'AL',
    avatarTone: 'amber',
    name: 'Andreas Lengkong, M.Si',
    role: 'Juri Inovasi Kriya & Desain',
    meta: 'Praktisi Industri Kreatif Manado',
    chips: [
      { label: 'Menunggu Konfirmasi Pakta', tone: 'amber', icon: IoRemoveCircleOutline },
      { label: 'Kriya Anyaman & Kayu', tone: 'gray', icon: IoColorPaletteOutline },
    ],
    warning: 'Tautan Pakta Terkirim via WA',
    sk: 'Menunggu TTE Digital',
  },
  {
    initial: 'FT',
    avatarTone: 'blue',
    name: 'Dr. Fransisca Tulung, M.Pd',
    role: 'Juri Karya Ilmiah Remaja (KIR)',
    meta: 'Akademisi Unsrat Manado',
    chips: [
      { label: 'Aktif Menilai', tone: 'green', icon: IoCheckmarkCircleOutline },
      { label: 'KIR Sains Terapan & Lingkungan', tone: 'blue', icon: IoFlaskOutline },
    ],
    sk: 'SK Kadis: No. 421/Dikbud/148',
  },
];

/* ---------------- Kriteria & Rubrik ---------------- */

export const kriteriaList = [
  {
    no: '01',
    weight: 35,
    min: 70,
    tone: 'blue',
    short: 'Orisinalitas Lokal',
    title: 'Kreativitas & Orisinalitas Kearifan Lokal',
    indicator:
      'Keaslian koreografi dan nilai budaya khas Minahasa / Manado, keutuhan pesan folklorik daerah, serta unsur eksplorasi artistik otentik.',
  },
  {
    no: '02',
    weight: 40,
    min: 75,
    tone: 'sky',
    short: 'Kesesuaian Teknis',
    title: 'Kesesuaian Teknis & Portofolio',
    indicator:
      'Harmonisasi irama musik dan ketepatan wiraga (sikap badan, dinamika tempo tarian kolosal/tunggal), teknik dasar gerakan, dan stabilitas panggung.',
  },
  {
    no: '03',
    weight: 25,
    min: 70,
    tone: 'amber',
    short: 'Tata Rias Budaya',
    title: 'Tata Rias & Properti Adat',
    indicator:
      'Kesopanan busana daerah, kepatutan ornamen kostum adat suku Minahasa, estetika tata rias panggung, dan etika pementasan santun.',
  },
];

/* ---------------- Kurasi Talenta ---------------- */

export const talentaFilters = ['Semua Talenta (42)', 'Seni & Budaya (18)', 'Sains & KIR (12)'];

export const talentaStats = [
  { label: 'Siswa Unggulan', value: '42', note: 'Terkurasi Valid', icon: IoPeopleOutline, tone: 'blue' },
  { label: 'Rekomendasi', value: '15', note: 'Tiket Prov. Sulut', icon: IoCheckmarkCircleOutline, tone: 'sky' },
  { label: 'Medali Emas', value: '8', note: 'Juara 1 Daerah', icon: IoTrophyOutline, tone: 'amber' },
  { label: 'Status Arsip', value: '100%', note: 'Tervalidasi LPMP', icon: IoClipboardOutline, tone: 'green' },
];

export const talentaList = [
  {
    rank: 1, rankTone: 'gold', name: 'Alvaro G. Rumambi', school: 'SMAN 9 Binsus Manado', score: '98.4',
    nameIcon: IoTrophyOutline, icon: IoFlaskOutline, bidang: 'Bidang Robotika & Sains Maritim',
    badge: 'Rekomendasi Kontingen Provinsi', badgeTone: 'green', badgeIcon: IoCheckmarkCircleOutline,
  },
  {
    rank: 2, rankTone: 'silver', name: 'Clarissa Sompotan', school: 'SMAN 1 Manado', score: '96.2',
    nameIcon: IoMedalOutline, icon: IoMusicalNotesOutline, bidang: 'Bidang Seni Tari Tradisi (FLS2N)',
    badge: 'Siap Seleksi Provinsi', badgeTone: 'blue', badgeIcon: IoCheckmarkDoneOutline,
  },
  {
    rank: 3, rankTone: 'bronze', name: 'Kezia Wenas', school: 'SMKN 1 Manado', score: '94.8',
    nameIcon: IoTrophyOutline, icon: IoColorPaletteOutline, bidang: 'Bidang Desain Animasi Budaya & Vokasi',
    badge: 'Karya Terbaik Manado', badgeTone: 'amber', badgeIcon: IoBulbOutline,
  },
  {
    rank: 4, rankTone: 'plain', name: 'Jonathan Mandey', school: 'SMKN 2 Manado', score: '92.5',
    nameIcon: null, icon: IoBrushOutline, bidang: 'Bidang Kriya Tradisional Anyaman',
    badge: 'Koleksi Kurasi Kota', badgeTone: 'gray', badgeIcon: IoFolderOutline,
  },
];
