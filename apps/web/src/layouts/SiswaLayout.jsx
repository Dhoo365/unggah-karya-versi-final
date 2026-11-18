import {
  IoBookOutline,
  IoCloudUploadOutline,
  IoHomeOutline,
  IoKeyOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import { siswaProfil } from '../data/siswa.js';

// Menu sidebar portal Siswa (versi mobile: tab bawah Beranda / Unggah Karya / Karya Saya / Profil)
const sections = [
  {
    label: 'Lomba',
    items: [
      { to: '/siswa', end: true, label: 'Beranda', icon: IoHomeOutline, title: 'Portal Kurasi Talenta Prestasi Pelajar', subtitle: 'Dinas Pendidikan Daerah Provinsi Sulut' },
      { to: '/siswa/unggah', label: 'Unggah Karya', icon: IoCloudUploadOutline, title: 'Unggah Berkas & Karya', subtitle: 'Tahapan pengiriman karya lomba' },
      { to: '/siswa/hasil', label: 'Hasil & Prestasi', icon: IoRibbonOutline, title: 'Hasil Lomba & Prestasi', subtitle: 'Capaian yang tervalidasi Dikda Sulut' },
      { to: '/siswa/sertifikat', label: 'Validasi Sertifikat', icon: IoShieldCheckmarkOutline, title: 'Validasi Sertifikat', subtitle: 'Ajukan sertifikat prestasi untuk disahkan' },
      { to: '/siswa/panduan', label: 'Panduan', icon: IoBookOutline, title: 'Panduan Peserta', subtitle: 'Langkah, ketentuan berkas & bantuan' },
    ],
  },
  {
    label: 'Akun',
    items: [
      { to: '/siswa/profil', label: 'Profil Saya', icon: IoPersonOutline, title: 'Profil Siswa', subtitle: 'Data peserta terverifikasi Dapodik' },
      { to: '/siswa/ubah-sandi', label: 'Ubah Kata Sandi', icon: IoKeyOutline, title: 'Ubah Kata Sandi', subtitle: 'Keamanan akun siswa' },
    ],
  },
];

export default function SiswaLayout() {
  return (
    <DashboardLayout
      brand={{ icon: IoSchoolOutline, title: 'SIKARYA Siswa', subtitle: 'Portal Peserta Lomba' }}
      sections={sections}
      profile={siswaProfil}
      footnote={{ left: 'NISN ' + siswaProfil.nisn, right: 'Akun Aktif' }}
      notifications={2}
    />
  );
}
