/*
  DATA CONTOH alur akun Guru Pembimbing (pendaftaran → status → perbaikan / ditolak).
  Sama dengan versi mobile. Ganti dengan data dari API.
*/
export const cabangDinasList = [
  'Cabang Dinas Wilayah Manado-Tomohon',
  'Cabang Dinas Wilayah Minahasa-Minahasa Utara',
  'Cabang Dinas Wilayah Bolaang Mongondow',
  'Cabang Dinas Wilayah Kepulauan',
];

export const tahapanVerifikasiGuru = [
  { judul: 'Validasi NUPTK di GTK Dapodik', isi: 'Sistem mencocokkan NUPTK/PegID dan NIK dengan pangkalan data GTK Kemendikbudristek.' },
  { judul: 'Pemeriksaan SK oleh Cabdin', isi: 'Verifikator Cabang Dinas memeriksa SK Kepala Sekolah / Surat Tugas pembimbing (1–2 hari kerja).' },
  { judul: 'Akses Portal Guru Aktif', isi: 'Kelola data siswa binaan, unggah karya, dan pantau penilaian dewan juri provinsi.' },
];

export const pengajuanGuru = {
  noReg: 'REG-GURU-2025-0194',
  tahap: 'Admin Cabang Dinas Wilayah I',
  antrean: 14,
  nama: 'Dra. Meiske Lumintang, M.Pd',
  nip: '19740812 199903 2 004',
  sekolah: 'SMA Negeri 1 Manado',
  berkas: { nama: 'SK_Pembimbing_Resmi.pdf', ukuran: '1.2 MB' },
};

export const tiketPerbaikanGuru = {
  id: 'REV-GURU-1984',
  pesan: 'SK Penugasan Guru Pembimbing belum mencantumkan stempel basah kepala sekolah. Silakan perbaiki lampiran SK.',
  batasHari: 3,
  batasTanggal: '24 Okt 2025',
  nomorSk: '800/142/SMAN1–MND/2025',
  berkasLama: { nama: 'SK_Pembimbing_Lama_2025.pdf', ukuran: '980 KB', alasan: 'Ditolak (Tanpa stempel)' },
};

export const keputusanTolakGuru = {
  id: 'VER-8492',
  verifikator: 'Tim Verifikator Cabang Dinas Bitung / Manado',
  jabatan: 'Cabang Dinas Pendidikan Prov. Sulawesi Utara',
  waktu: '24 Okt 2025 • 11:30 WITA',
  alasan:
    'SK Penugasan Kepala Sekolah yang diunggah tidak valid / telah melewati batas masa berlaku tahun berjalan 2024/2025, serta NUPTK belum sinkron dengan Pangkalan Data Master PTK Dikda Sulut.',
  data: { nama: 'Dra. Meiske Lumintang, M.Pd', nuptk: '8439 2019 4820 1948', sekolah: 'SMKN 2 Bitung', dokumen: 'SK_Pembimbing_2023.pdf' },
  langkah: [
    { judul: 'Perbarui SK Penugasan Pembimbing Lomba', isi: 'Pastikan SK ditandatangani Kepala Sekolah dengan stempel basah atau sertifikasi elektronik (BSrE) aktif tahun ajaran 2025.' },
    { judul: 'Sinkronisasi NUPTK di Dapodik / SIMPATIKA', isi: 'Hubungi Operator Satuan Pendidikan untuk memvalidasi keaktifan status kepegawaian Anda di database kementerian.' },
    { judul: 'Klarifikasi Langsung atau Bantuan Helpdesk', isi: 'Apabila terjadi anomali data, lakukan konfirmasi ke Kantor Cabang Dinas Pendidikan setempat atau hubungi saluran resmi SIKARYA.' },
  ],
};
