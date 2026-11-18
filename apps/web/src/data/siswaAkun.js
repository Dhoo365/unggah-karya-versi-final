/*
  DATA CONTOH alur akun Siswa: daftar → verifikasi OTP → menunggu verifikasi guru
  → (perlu perbaikan | ditolak). Ganti dengan data dari API.
*/

export const jenjangSiswa = [
  { key: 'sma', label: 'SMA', desc: 'Menengah Atas' },
  { key: 'smk', label: 'SMK', desc: 'Kejuruan' },
  { key: 'slb', label: 'SLB', desc: 'Luar Biasa' },
];

// TODO: ganti dengan daftar resmi Cabang Dinas Wilayah Sulawesi Utara
export const cabdinList = [
  'Cabang Dinas Wilayah Manado-Tomohon',
  'Cabang Dinas Wilayah Minahasa-Minahasa Utara',
  'Cabang Dinas Wilayah Bolaang Mongondow',
  'Cabang Dinas Wilayah Kepulauan',
];

export const siswaTerdaftar = {
  nama: 'Christian Tatengkeng',
  nisn: '0064829102',
  sekolah: 'SMAN 1 Manado',
  email: 'c.tatengkeng@gmail.com',
  telepon: '+62 812-44••-8921',
};

export const tahapanVerifikasi = [
  { judul: 'Input Kode OTP 6 Digit', isi: 'Pastikan kode yang diterima sesuai dengan email atau pesan WhatsApp resmi Dikda.' },
  { judul: 'Sinkronisasi Otomatis Dapodik', isi: 'Sistem memvalidasi rekam data akademik sekolah wilayah Sulawesi Utara secara real-time.' },
  { judul: 'Akses Portofolio & Lomba', isi: 'Siap mendaftar dan mengunggah berkas karya FLS2N, LKS SMK, O2SN, atau apresiasi GTK.' },
];

export const pengajuanSiswa = {
  tiket: 'REG-SISWA-2025-0842',
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  sekolah: 'SMA Negeri 1 Manado',
  guru: 'Dra. Meiske Lumintang, M.Pd',
};

export const tiketPerbaikan = {
  id: 'REV-SISWA-4920',
  sisaWaktu: '2 hari 18 jam',
  verifikator: 'Dra. Meiske Lumintang, M.Pd',
  pesan: 'Mohon sesuaikan pilihan rombel kelas Anda dan unggah ulang scan Kartu Pelajar yang terbaca jelas.',
  berkasLama: { nama: 'KPS_KevinPangkey_Lama.jpg', alasan: 'File buram & tidak terbaca' },
};

export const rombelList = ['Kelas XII MIPA 1', 'Kelas XII MIPA 2', 'Kelas XII MIPA 3', 'Kelas XII IPS 1', 'Kelas XII IPS 2'];

export const keputusanTolak = {
  id: 'REG-SISWA-4920',
  guru: 'Dra. Meiske Lumintang, M.Pd',
  jabatan: 'Guru Pembimbing SMAN 1 Manado',
  waktu: '24 Okt 2025 • 11:45 WITA',
  alasan:
    'Data NISN (0078 4920 11) dan berkas Kartu Pelajar yang diunggah tidak terdaftar dalam pangkalan data siswa aktif semester berjalan di SMAN 1 Manado. Ditemukan ketidaksesuaian identitas dengan arsip buku induk sekolah.',
  data: { nama: 'Kevin Pangkey', nisn: '0078 4920 11', rombel: 'XII IPA 1', sekolah: 'SMAN 1 Manado', berkas: 'Kartu_Pelajar_Scan.pdf' },
  langkah: [
    { isi: 'Konfirmasi ke Bagian Tata Usaha (TU) SMAN 1 Manado untuk memeriksa status keaktifan NISN pada sistem Dapodik sekolah.' },
    { isi: 'Minta Surat Keterangan Siswa Aktif resmi bertanda tangan Kepala Sekolah jika Anda merupakan siswa mutasi baru yang belum tersinkronisasi.' },
    { judul: 'Lakukan Pendaftaran Ulang', isi: 'dengan NISN yang valid serta scan kartu pelajar asli setelah data diperbaiki oleh pihak sekolah.' },
  ],
};
