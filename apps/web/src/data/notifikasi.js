/*
  DATA CONTOH notifikasi di ikon lonceng tiap portal. Ganti dengan data dari API.
  tone: blue | green | amber | red | purple
*/
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoHourglassOutline,
  IoMegaphoneOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from 'react-icons/io5';

export const notifikasi = {
  admin: [
    { id: 'a1', icon: IoDocumentTextOutline, tone: 'amber', judul: '24 berkas peserta menunggu validasi', isi: 'Cabang FLS2N & LKS dari 6 Cabdin.', waktu: '5 menit lalu', to: '/admin/peserta' },
    { id: 'a2', icon: IoPeopleOutline, tone: 'blue', judul: '2 juri belum mengonfirmasi penugasan', isi: 'Kirim ulang undangan dari menu Juri.', waktu: '1 jam lalu', to: '/admin/juri' },
    { id: 'a3', icon: IoTrophyOutline, tone: 'green', judul: 'Penilaian O2SN Atletik selesai', isi: 'Siap ditetapkan dan diumumkan.', waktu: 'Kemarin', to: '/admin/talenta' },
  ],
  juri: [
    { id: 'j1', icon: IoHourglassOutline, tone: 'amber', judul: '8 karya baru masuk antrean Anda', isi: 'Batas penilaian 30 Juni 2026.', waktu: '10 menit lalu', to: '/juri/antrean' },
    { id: 'j2', icon: IoMegaphoneOutline, tone: 'blue', judul: 'Rapat pleno dewan juri', isi: 'Jumat, 09.00 WITA via Zoom.', waktu: '2 jam lalu', to: '/juri' },
    { id: 'j3', icon: IoCheckmarkCircleOutline, tone: 'green', judul: 'Rekap nilai Anda diterima sekretariat', isi: 'Cabang Desain Poster Digital.', waktu: 'Kemarin', to: '/juri/riwayat' },
  ],
  siswa: [
    { id: 's1', icon: IoAlertCircleOutline, tone: 'red', judul: 'Sertifikat perlu perbaikan', isi: 'Lampirkan SK penetapan pemenang.', waktu: '1 jam lalu', to: '/siswa/sertifikat' },
    { id: 's2', icon: IoRibbonOutline, tone: 'green', judul: 'Hasil FLS2N 2024 telah diumumkan', isi: 'Selamat! Unduh e-sertifikat Anda.', waktu: 'Kemarin', to: '/siswa/hasil' },
  ],
  guru: [
    { id: 'g1', icon: IoAlertCircleOutline, tone: 'red', judul: 'Karya Andi Pratama perlu revisi', isi: 'Surat orisinalitas belum bermaterai.', waktu: '30 menit lalu', to: '/guru/karya' },
    { id: 'g2', icon: IoMegaphoneOutline, tone: 'blue', judul: 'Surat edaran baru dari Dispen', isi: 'Jadwal verifikasi & batas unggah 2026.', waktu: '3 jam lalu', to: '/guru/pengumuman' },
    { id: 'g3', icon: IoTimeOutline, tone: 'amber', judul: 'FLS2N SMP ditutup 14 hari lagi', isi: 'Sisa kuota sekolah: 1 karya.', waktu: 'Kemarin', to: '/guru/lomba' },
  ],
};
