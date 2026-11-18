/*
  DATA CONTOH landing page.
  Jadwal lomba & juara nanti bisa diambil dari backend (data yang sama dengan portal admin).
*/

export const pengumumanAtas = {
  teks: 'tingkat kab/kota ditutup 28 Februari. Juknis sudah bisa diunduh.',
  sorot: 'Pendaftaran FLS2N 2026',
};

export const lombaDibuka = ['FLS2N', 'KIR'];
export const lombaSegera = ['O2SN'];

// status: 'buka' | 'segera'
export const jadwalLomba = [
  { tgl: '14', bln: 'FEB', cabang: 'FLS2N', nama: 'Seni Tari Kreasi & Vokal Solo', jenjang: 'SMA / SMK', persen: 84, kuota: '84/100 kuota', info: 'Ditutup 28 Feb', status: 'buka' },
  { tgl: '20', bln: 'FEB', cabang: 'KIR', nama: 'Karya Ilmiah Remaja: Konservasi Pesisir', jenjang: 'SMA / MA', persen: 46, kuota: '23/50 tim', info: 'Ditutup 10 Mar', status: 'buka' },
  { tgl: '03', bln: 'MAR', cabang: 'O2SN', nama: 'Atletik & Bulu Tangkis', jenjang: 'SMP / MTs', persen: 30, kuota: '112 atlet', info: 'Seleksi kecamatan', status: 'segera' },
  { tgl: '15', bln: 'MAR', cabang: 'LKS', nama: 'Teknologi Rekayasa & IoT', jenjang: 'SMK', persen: 0, kuota: 'Belum dibuka', info: 'Buka 15 Mar', status: 'segera' },
];

// key = nama file ilustrasi di src/assets/landing (v-<key>.svg)
export const alurKarya = [
  { key: 'unggah', judul: 'Unggah bersama pembimbing', isi: 'Video, naskah, atau portofolio dikirim dari akun siswa dan disetujui guru.' },
  { key: 'validasi', judul: 'Dicek otomatis', isi: 'Format, ukuran, dan NISN Dapodik diperiksa sebelum masuk meja juri.' },
  { key: 'nilai', judul: 'Dinilai dewan juri', isi: 'Rubrik dan bobot nilai terbuka, bisa dibaca siapa saja.' },
  { key: 'juara', judul: 'Sertifikat & talenta', isi: 'Juara menerima sertifikat TTE dan masuk Pangkalan Talenta Sulut.' },
];

// Urutan tampil di podium: juara 2, 1, 3 (key = bust-<key>.svg)
export const podium = [
  { key: 'clarissa', rank: 2, nama: 'Clarissa Sompotan', sekolah: 'SMAN 1 Manado', bidang: 'Seni Tari Tradisi', skor: '96,2' },
  { key: 'alvaro', rank: 1, nama: 'Alvaro G. Rumambi', sekolah: 'SMAN 9 Binsus Manado', bidang: 'Robotika Maritim', skor: '98,4' },
  { key: 'kezia', rank: 3, nama: 'Kezia Wenas', sekolah: 'SMKN 1 Manado', bidang: 'Animasi Budaya', skor: '94,8' },
];
export const talentaLainnya = 39;

export const peran = [
  { judul: 'Siswa', poin: ['Cari lomba sesuai jenjang', 'Unggah karya & pantau status', 'Unduh sertifikat'], miring: -2, latar: 'bg-white' },
  { judul: 'Guru Pembimbing', poin: ['Dampingi beberapa siswa', 'Setujui karya sebelum dikirim', 'Terima catatan revisi'], miring: 1.5, latar: 'bg-[#fff7e0]' },
  { judul: 'Dewan Juri', poin: ['Antrean karya per cabang', 'Rubrik penilaian digital', 'Tanda tangan TTE'], miring: -1, latar: 'bg-[#eef3ff]' },
  { judul: 'Admin Dinas', poin: ['Buka lomba & atur kuota', 'Validasi peserta', 'Rilis pengumuman juara'], miring: 2, latar: 'bg-white' },
];

export const faq = [
  { t: 'Siapa yang boleh ikut?', j: 'Siswa SMP, SMA, SMK, dan SLB yang terdaftar di Dapodik pada 15 kabupaten/kota di Sulawesi Utara.' },
  { t: 'Apakah harus didampingi guru?', j: 'Ya. Setiap karya dikirim bersama guru pembimbing yang menyetujuinya sebelum masuk penilaian.' },
  { t: 'Berapa ukuran maksimal berkas?', j: 'Bergantung cabang lomba. Batasnya tertulis di juknis dan dicek otomatis saat unggah.' },
  { t: 'Kapan hasil diumumkan?', j: 'Sesuai jadwal di juknis setiap lomba. Kamu juga mendapat notifikasi saat skor terbit.' },
];

export const navLinks = [
  { href: '#jadwal', label: 'Jadwal Lomba' },
  { href: '#alur', label: 'Alur' },
  { href: '#juara', label: 'Juara' },
  { href: '#faq', label: 'FAQ' },
];
