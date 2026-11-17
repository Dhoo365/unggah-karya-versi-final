/*
  DATA CONTOH portal Guru Pembimbing (sama dengan versi mobile). Ganti dengan data dari API.
  Catatan: di versi mobile nama guru berbeda-beda per halaman; di web disatukan jadi satu akun.
*/
import {
  IoBrushOutline,
  IoBulbOutline,
  IoClipboardOutline,
  IoColorPaletteOutline,
  IoCheckboxOutline,
  IoDocumentTextOutline,
  IoFilmOutline,
  IoFitnessOutline,
  IoFolderOutline,
  IoHardwareChipOutline,
  IoHourglassOutline,
  IoIdCardOutline,
  IoLayersOutline,
  IoMedalOutline,
  IoMegaphoneOutline,
  IoMicOutline,
  IoMusicalNotesOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoSwapHorizontalOutline,
  IoTrophyOutline,
} from 'react-icons/io5';

export const guruProfil = {
  initials: 'AF',
  name: 'Ahmad Fauzi, S.Pd.',
  role: 'Guru Pembimbing',
  peran: 'Guru Pembimbing Kontingen • Pembina OSIS & TIK',
  org: 'SMP Negeri 1 Manado',
  cabdin: 'Cabdin Wilayah Manado-Tomohon',
  kota: 'Kota Manado',
  email: 'ahmad.fauzi@guru.smp.belajar.id',
  telepon: '+62 812-3456-7890',
  alamat: 'Jl. Sam Ratulangi No. 45, Wenang Utara, Kec. Wenang, Kota Manado, Sulawesi Utara 95111',
  nip: '19820415 2008011 009',
  nuptk: '198204152008011009',
  bidang: 'Pembimbing Seni & TIK',
};

/* ---------------- Beranda ---------------- */
export const metrikSiswa = [
  { label: 'Total Siswa', value: 120, note: 'Bimbingan', icon: IoPeopleOutline, tone: 'blue' },
  { label: 'Siswa Aktif', value: 105, note: 'Terdaftar', icon: IoSchoolOutline, tone: 'sky' },
  { label: 'Siswa Lolos', value: 15, note: 'Alumni', icon: IoRibbonOutline, tone: 'purple' },
];
export const metrikKarya = [
  { label: 'Menunggu', value: 8, note: 'Perlu Verifikasi', tone: 'amber' },
  { label: 'Diterima', value: 25, note: 'Lolos Seleksi', tone: 'green' },
  { label: 'Ditolak', value: 2, note: 'Butuh Revisi', tone: 'red' },
];
export const menuGuru = [
  { to: '/guru/siswa', title: 'Data Siswa', desc: 'Status aktif, lulus & riwayat audit', icon: IoIdCardOutline, tone: 'blue' },
  { to: '/guru/karya', title: 'Karya Siswa', desc: 'Diajukan, diterima, ditolak & revisi', icon: IoFolderOutline, tone: 'sky' },
  { to: '/guru/lomba', title: 'Katalog Lomba', desc: 'Jadwal & periode lomba aktif', icon: IoTrophyOutline, tone: 'amber' },
  { to: '/guru/pengumuman', title: 'Pengumuman', desc: 'Edaran resmi Dispen Dikda Sulut', icon: IoMegaphoneOutline, tone: 'purple' },
];
export const feedAktivitas = [
  { tag: 'Audit Status', icon: IoSwapHorizontalOutline, tone: 'blue', time: '15 Juni 2026', title: 'Status Budi diubah dari Aktif ke Lulus oleh Guru Ahmad', desc: 'Perubahan terverifikasi & tercatat pada sistem log SMP Negeri 1 Manado.' },
  { tag: 'Verifikasi Dispen', icon: IoHourglassOutline, tone: 'amber', time: 'Baru saja', title: 'Karya Video Kreatif Budi menunggu verifikasi Dispen', desc: 'Kategori FLS2N Sinematografi SMP • Berkas pra-submit lengkap.' },
];

/* ---------------- Data siswa ---------------- */
// status: aktif | lulus | nonaktif | ditangguhkan
export const siswaBinaan = [
  { id: '123456', initial: 'AP', name: 'Andi Pratama', nisn: '123456', kelas: 'IX-A', status: 'aktif', note: '2 Karya Kompetisi Dikda', noteIcon: IoTrophyOutline },
  { id: '123457', initial: 'BS', name: 'Budi Santoso', nisn: '123457', kelas: 'IX-B', status: 'aktif', note: '1 Karya menunggu verifikasi', noteIcon: IoHourglassOutline },
  { id: '123458', initial: 'CW', name: 'Citra Wenas', nisn: '123458', kelas: 'VIII-C', status: 'aktif', note: '1 Proposal Inovasi', noteIcon: IoFolderOutline },
  { id: '0072918239', initial: 'EP', name: 'Evelyn Pangemanan', nisn: '0072918239', kelas: 'IX-A', status: 'aktif', note: 'Belum ada karya', noteIcon: IoFolderOutline },
  { id: '123459', initial: 'DP', name: 'Dimas Pangemanan', nisn: '123459', kelas: 'IX-A', status: 'lulus', note: 'Alumni TP 2025/2026', noteIcon: IoSchoolOutline },
];
export const statusSiswa = {
  aktif: { label: 'Aktif', tone: 'green', desc: 'Dapat didaftarkan lomba, mengunggah karya, dan diverifikasi tim juri.' },
  lulus: { label: 'Lulus', tone: 'blue', desc: 'Telah menyelesaikan masa pendidikan resmi di SMPN 1 Manado (Alumni).' },
  nonaktif: { label: 'Pindah / Non-Aktif', tone: 'gray', desc: 'Mutasi ke satuan pendidikan lain di luar/dalam wilayah atau data non-aktif.' },
  ditangguhkan: { label: 'Ditangguhkan', tone: 'red', peringatan: true, desc: 'Sementara tidak dapat diikutsertakan lomba atau submisi karya baru.' },
};

// Log audit status per siswa (dipakai halaman Riwayat & Kelola Status)
export const logAudit = [
  { tanggal: '15 Januari 2026', jam: '09:42 WITA', label: 'Aktif', tone: 'green', isi: 'Pendaftaran semester genap & verifikasi kelayakan kompetisi saintek.', oleh: 'Ahmad Fauzi, S.Pd.' },
  { tanggal: '10 Juli 2025', jam: '08:15 WITA', label: 'Aktif', tone: 'blue', isi: 'Status Aktif (Kenaikan Kelas IX).', oleh: 'Sistem Otomatis Dapodik Sulut' },
  { tanggal: '12 Juli 2024', jam: '09:00 WITA', label: 'Registrasi Baru', tone: 'gray', isi: 'Status Aktif (Pendaftaran Siswa Baru SMP).', oleh: 'Admin PPDB SMP Negeri 1 Manado' },
];

/* ---------------- Riwayat portofolio siswa ---------------- */
export const portofolioSiswa = {
  peminatan: 'Peminatan Seni Kriya & Riset Vokasi',
  lomba: [
    { id: 1, tipe: 'proses', icon: IoColorPaletteOutline, kompetisi: 'FLS2N 2025 • Seni Kriya Nusantara', label: 'Tahap 2: Verifikasi Cabdin', judul: 'Miniatur Rumah Adat Minahasa Berbahan Bambu Daur Ulang', tanggal: '12 Okt 2025', skor: '88.5', catatan: 'Berkas portofolio lengkap & orisinalitas terverifikasi.' },
    { id: 2, tipe: 'juara', icon: IoBulbOutline, kompetisi: 'Olimpiade Kreativitas Remaja', label: 'Juara 2 Tingkat Provinsi', judul: 'Aplikasi Edukasi Konservasi Terumbu Karang Bunaken', tanggal: '24 Nov 2024', skor: '94.2', noReg: 'SIK-2024–MND-091' },
  ],
  catatanGuru: {
    isi: 'Siswa menunjukkan konsistensi tinggi dalam bidang kerajinan & teknologi lokal. Direkomendasikan untuk seleksi FLS2N tingkat nasional.',
    nama: 'Ahmad Fauzi, S.Pd.',
    tanggal: '15 Okt 2025',
  },
};

/* ---------------- Karya siswa ---------------- */
// status: menunggu | revisi | dinilai
export const karyaSiswa = [
  { id: 1, status: 'menunggu', judul: 'Video Animasi Edukasi Bahari Bunaken', siswa: 'Budi Santoso', kelas: 'IX-B', kategori: 'FLS2N Sinematografi & Seni Video', kategoriIcon: IoFilmOutline, tanggal: '14 Jun 2026', file: 'MP4_Bunaken_FLS2N_BudiS.mp4', ukuran: '148 MB' },
  { id: 2, status: 'revisi', judul: 'Robot Pemilah Sampah Pesisir Pantai Malalayang', siswa: 'Andi Pratama', kelas: 'IX-A', kategori: 'LKS Karya Teknologi & Inovasi', kategoriIcon: IoHardwareChipOutline, batas: '18 Jun 2026', alasan: 'Surat pernyataan orisinalitas belum dibubuhi meterai Rp10.000 dan tanda tangan Kepala Sekolah.' },
  { id: 3, status: 'dinilai', judul: 'Kriya Anyam Bambu Khas Minahasa', siswa: 'Citra Wenas', kelas: 'VIII-C', kategori: 'FLS2N Kriya Seni SMP', kategoriIcon: IoColorPaletteOutline, skor: 88.5, juriSelesai: 2, juriTotal: 3 },
];

/* ---------------- Katalog lomba ---------------- */
export const jenjangLomba = [
  { key: 'smp', label: 'Jenjang SMP (Terfilter Sekolah)' },
  { key: 'smasmk', label: 'Jenjang SMA/SMK' },
];
export const katalogLomba = [
  {
    id: 1, jenjang: 'smp', status: 'dibuka', unggulan: true, tag: 'Provinsi Sulut 2026', tagIcon: IoTrophyOutline, tagTone: 'amber',
    judul: 'Lomba FLS2N SMP Tingkat Provinsi 2026', deskripsi: 'Festival & Lomba Seni Siswa Nasional - Seleksi Berjenjang',
    cabang: [
      { nama: 'Tari Kreasi Tradisional', icon: IoColorPaletteOutline },
      { nama: 'Menyanyi Solo', icon: IoMicOutline },
      { nama: 'Desain Ilustrasi Digital', icon: IoBrushOutline },
      { nama: 'Sinematografi', icon: IoFilmOutline },
    ],
    batasLabel: 'Batas Akhir', batas: '28 Juni 2026', sisaHari: '14 Hari Lagi', kuota: '2 Karya/Cabang', sisaKuota: '1 Siswa / Karya', ukuranJuknis: '2.4 MB',
  },
  { id: 2, jenjang: 'smp', status: 'dibuka', tag: 'Olahraga', tagIcon: IoFitnessOutline, tagTone: 'sky', judul: 'O2SN SMP Cabang Pencak Silat & Atletik', deskripsi: 'Olimpiade Olahraga Siswa Nasional - Tingkat Kabupaten/Provinsi', batasLabel: 'Batas Registrasi', batas: '10 Juli 2026', ukuranJuknis: '1.6 MB' },
  { id: 3, jenjang: 'smp', status: 'dibuka', tag: 'Riset Pelajar', tagIcon: IoBulbOutline, tagTone: 'purple', judul: 'Lomba Kreativitas & Inovasi Pelajar SMP Sulut', deskripsi: 'Karya Ilmiah Remaja • Teknologi Tepat Guna', batasLabel: 'Batas Pengumpulan', batas: '15 Juli 2026', ukuranJuknis: '1.1 MB' },
  { id: 4, jenjang: 'smp', status: 'segera', tag: 'Budaya Daerah', tagIcon: IoMusicalNotesOutline, tagTone: 'gray', judul: 'Lomba Musik Kolintang Pelajar', deskripsi: 'Pelestarian alat musik tradisional khas Minahasa & Sulawesi Utara tingkat satuan pendidikan.', petunjuk: 'Petunjuk Teknis sedang disiapkan Panitia Provinsi.' },
];

/* ---------------- Pengumuman ---------------- */
export const kategoriPengumuman = [
  { key: 'semua', label: 'Semua' },
  { key: 'edaran', label: 'Edaran Resmi' },
  { key: 'jadwal', label: 'Jadwal Seleksi' },
  { key: 'teknis', label: 'Update Teknis' },
  { key: 'hasil', label: 'Hasil Kurasi' },
];
export const pengumuman = [
  {
    id: 1, tipe: 'edaran', kategori: ['edaran', 'jadwal'], tersemat: true, tone: 'blue', badge: 'Tersemat', tanggal: '12 Juni 2026',
    nomor: 'Surat Edaran No: 420/DISDIK/VI/2026', judul: 'Jadwal Verifikasi & Batas Pengunggahan Karya FLS2N dan LKS Tahun 2026', instansi: 'Cabang Dinas Pendidikan Manado-Tomohon',
    sorotan: { awal: 'Diberitahukan kepada seluruh Kepala Satuan Pendidikan dan Guru Pembimbing bahwa sinkronisasi data Dapodik untuk kepesertaan ditutup pada', merah: '30 Juni 2026 pukul 23.59 WITA' },
    berkas: { nama: 'Surat_Edaran_Kadis_Sulut.pdf', ukuran: '1.2 MB' },
  },
  { id: 2, tipe: 'wajib', kategori: ['edaran'], tone: 'red', badge: 'Wajib Dibaca Pembimbing', tanggal: '10 Juni 2026', judul: 'Panduan Penulisan Sinopsis & Surat Pernyataan Orisinalitas Bermeterai', isi: 'Seluruh naskah sinopsis karya wajib memuat lembar pengesahan berstempel basah sekolah asal dan meterai Rp10.000 sesuai format baku Dispen Dikda Sulut.' },
  { id: 3, tipe: 'teknis', kategori: ['teknis'], tone: 'gray', badge: 'Update Teknis', tanggal: '8 Juni 2026', judul: 'Sosialisasi Daring Pembimbingan Teknis Juri & Kurator Tingkat Provinsi', isi: 'Penyelarasan rubrik penilaian 5 cabang lomba vokasi dan seni budaya dengan dewan kurator akademisi Sulut.' },
  { id: 4, tipe: 'hasil', kategori: ['hasil'], tone: 'amber', badge: 'Hasil Kurasi Tahap 1', tanggal: '1 Juni 2026', judul: 'Daftar Nominasi Awal Karya Unggulan SMP/SMA Se-Sulawesi Utara', isi: 'Rangkuman 120 karya inovasi dan kriya seni terbaik yang lolos ke tahap pembimbingan intensif dewan juri daerah.', avatar: [{ i: 'MN', tone: 'blue' }, { i: 'TM', tone: 'amber' }, { i: 'BT', tone: 'purple' }], wilayah: '15 Kab/Kota' },
];

/* ---------------- Profil ---------------- */
export const statistikGuru = [
  { label: 'Total Bimbingan', value: 120, unit: 'Siswa', icon: IoPeopleOutline, tone: 'blue' },
  { label: 'Karya Dikurasi', value: 35, unit: 'Karya', icon: IoLayersOutline, tone: 'sky' },
  { label: 'Siswa Juara', value: 12, unit: 'Prestasi', icon: IoTrophyOutline, tone: 'amber' },
  { label: 'Sertifikat Resmi', value: 4, unit: 'Berkas', icon: IoMedalOutline, tone: 'purple' },
];
export const sertifikatGuru = [
  { judul: 'Pembimbing Terbaik FLS2N Kategori Sinematografi 2025', penerbit: 'Dinas Pendidikan Daerah Prov. Sulawesi Utara', icon: IoRibbonOutline, tone: 'amber' },
  { judul: 'Sertifikat Bimtek Kurasi Karya Inovasi & Budaya 2026', penerbit: 'Balai Penjaminan Mutu Pendidikan (BPMP)', icon: IoSchoolOutline, tone: 'blue' },
];

/* ---------------- Panduan ---------------- */
export const dokumenPanduan = [
  { id: 1, tone: 'blue', icon: IoDocumentTextOutline, tag: 'Juknis Resmi', format: 'PDF', ukuran: '2.8 MB', judul: 'Juknis FLS2N Jenjang Dikmen & Diksus Sulut 2025', deskripsi: 'Petunjuk pelaksanaan festival dan lomba seni siswa nasional tingkat provinsi.' },
  { id: 2, tone: 'amber', icon: IoClipboardOutline, tag: 'Dokumen Wajib', format: 'DOCX/PDF', ukuran: '1.1 MB', judul: 'Format Pakta Integritas Orisinalitas Karya & Bebas Plagiarisme', deskripsi: 'Surat pernyataan bermeterai wajib diunggah bersama berkas karya siswa.' },
  { id: 3, tone: 'purple', icon: IoCheckboxOutline, tag: 'Standar Juri', format: 'PDF', ukuran: '3.4 MB', judul: 'Pedoman Penilaian & Rubrik Skor Dewan Juri Provinsi', deskripsi: 'Kriteria pembobotan teknis, kebaruan ide, dan orisinalitas karya.' },
];

/* ---------------- Unggah karya ---------------- */
export const cabangUnggah = { nama: 'FLS2N 2025 – Desain Poster Digital Kreatif', batas: '15 Nov 2025', tag: 'FLS2N 2025' };
