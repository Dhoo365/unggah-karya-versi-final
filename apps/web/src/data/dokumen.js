/*
  CONTOH ISI DOKUMEN untuk tombol "Lihat" & "Unduh".
  Selama berkas asli belum ada di server, setiap dokumen dibuat dari pola di bawah.
  Nanti ganti dengan URL berkas asli dari API.
*/

const hariIni = () => new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// Isi baku per jenis dokumen
const pola = {
  juknis: (j) => [
    { judul: 'A. Latar Belakang', isi: `Petunjuk teknis ini menjadi acuan pelaksanaan ${j} bagi satuan pendidikan, guru pembimbing, peserta didik, dan dewan juri di lingkungan Dinas Pendidikan Daerah Provinsi Sulawesi Utara.` },
    { judul: 'B. Ketentuan Peserta', isi: ['Peserta adalah siswa aktif yang terdaftar di Dapodik.', 'Setiap peserta didampingi guru pembimbing yang memiliki SK penugasan.', 'Karya merupakan hasil orisinal dan belum pernah dilombakan.'] },
    { judul: 'C. Ketentuan Berkas', isi: ['Berkas utama karya berformat PDF/PNG, maksimal 25 MB.', 'Surat orisinalitas bermaterai Rp10.000.', 'Surat rekomendasi kepala sekolah.'] },
    { judul: 'D. Penilaian', isi: 'Penilaian dilakukan oleh dewan juri provinsi menggunakan rubrik terstandar: orisinalitas, kesesuaian tema, teknik, dan presentasi.' },
  ],
  sk: (j) => [
    { judul: 'Menimbang', isi: `Bahwa dalam rangka kelancaran pelaksanaan kegiatan, perlu ditetapkan ${j}.` },
    { judul: 'Mengingat', isi: ['Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional.', 'Peraturan Gubernur Sulawesi Utara tentang Penyelenggaraan Pendidikan.'] },
    { judul: 'Memutuskan', isi: 'Menetapkan nama-nama yang tercantum dalam lampiran keputusan ini untuk melaksanakan tugas sesuai ketentuan yang berlaku. Keputusan ini berlaku sejak tanggal ditetapkan.' },
  ],
  sertifikat: (j) => [
    { judul: 'Diberikan kepada', isi: 'Peserta yang namanya tercantum di atas, atas capaian dan partisipasinya.' },
    { judul: 'Keterangan', isi: `${j}. Sertifikat ini sah dan dapat diverifikasi melalui kode QR BSrE.` },
  ],
  nilai: (j) => [
    { judul: 'Ringkasan Penilaian', isi: `${j} disusun berdasarkan rubrik penilaian resmi dewan juri provinsi.` },
    { judul: 'Komponen', isi: ['Orisinalitas & kebaruan ide (30%)', 'Kesesuaian tema (25%)', 'Teknik & eksekusi (30%)', 'Presentasi (15%)'] },
  ],
  surat: (j) => [
    { isi: `Sehubungan dengan pelaksanaan kegiatan lomba tahun 2026, bersama ini kami sampaikan ${j}. Mohon menjadi perhatian dan dilaksanakan sebagaimana mestinya.` },
    { judul: 'Hal yang perlu diperhatikan', isi: ['Batas sinkronisasi data Dapodik: 30 Juni 2026 pukul 23.59 WITA.', 'Berkas yang tidak lengkap tidak akan diproses.', 'Pertanyaan dapat disampaikan melalui Helpdesk SIKARYA.'] },
  ],
  rekap: (j) => [
    { judul: 'Ringkasan', isi: `${j} per tanggal ${hariIni()}.` },
    { judul: 'Catatan', isi: 'Data bersumber dari SIKARYA dan tersinkron dengan Dapodik. Angka dapat berubah sampai tahap penetapan akhir.' },
  ],
};

/*
  dokumen('Juknis FLS2N 2026', { jenis: 'juknis', nomor, penerbit, baris })
  Hasilnya dipakai ui.lihat(...) atau ui.unduh(...).
*/
export function dokumen(judul, { jenis = 'surat', label, nomor, penerbit = 'Dinas Pendidikan Daerah Prov. Sulut', baris, bagian, ukuran, namaFile } = {}) {
  return {
    judul,
    jenis: label ?? { juknis: 'Petunjuk Teknis', sk: 'Surat Keputusan', sertifikat: 'E-Sertifikat', nilai: 'Lembar Nilai', surat: 'Surat Edaran', rekap: 'Rekapitulasi' }[jenis],
    nomor,
    penerbit,
    tanggal: hariIni(),
    ukuran,
    baris,
    bagian: bagian ?? (pola[jenis] ?? pola.surat)(judul),
    namaFile,
  };
}
