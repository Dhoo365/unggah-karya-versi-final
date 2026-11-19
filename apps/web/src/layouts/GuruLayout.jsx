import {
  IoBookOutline,
  IoCallOutline,
  IoCloudUploadOutline,
  IoFolderOpenOutline,
  IoHomeOutline,
  IoIdCardOutline,
  IoKeyOutline,
  IoMegaphoneOutline,
  IoPersonCircleOutline,
  IoRibbonOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { notifikasi } from '../data/notifikasi.js';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import { guruProfil } from '../data/guru.js';

// Menu sidebar portal Guru Pembimbing (versi mobile: GuruTabbar + menu di Beranda/Profil)
const sections = [
  {
    label: 'Pembimbingan',
    items: [
      { to: '/guru', end: true, label: 'Beranda', icon: IoHomeOutline, title: 'Dashboard Pembimbing', subtitle: 'Portal Guru Terpadu 2025/2026' },
      { to: '/guru/siswa', label: 'Data Siswa', icon: IoIdCardOutline, title: 'Data Siswa Bimbingan', subtitle: 'Data terisolasi khusus ' + guruProfil.org },
      { to: '/guru/karya', label: 'Karya Siswa', icon: IoFolderOpenOutline, title: 'Karya Siswa Sekolah', subtitle: 'Status pengajuan & penilaian karya' },
      { to: '/guru/unggah', label: 'Unggah Karya', icon: IoCloudUploadOutline, title: 'Unggah Karya Siswa', subtitle: guruProfil.org + ' • ' + guruProfil.cabdin },
    ],
  },
  {
    label: 'Informasi',
    items: [
      { to: '/guru/lomba', label: 'Katalog Lomba', icon: IoTrophyOutline, title: 'Katalog Lomba Aktif', subtitle: 'Portal Resmi Dikda Prov. Sulut' },
      { to: '/guru/pengumuman', label: 'Pengumuman', icon: IoMegaphoneOutline, title: 'Pengumuman & Surat Edaran', subtitle: 'Portal Resmi Dinas Pendidikan Sulut', dot: true },
      { to: '/guru/panduan', label: 'Buku Saku Guru', icon: IoBookOutline, title: 'Panduan Guru (Buku Saku)', subtitle: 'Regulasi & instrumen lomba' },
    ],
  },
  {
    label: 'Akun',
    items: [
      { to: '/guru/profil', label: 'Profil Guru', icon: IoPersonCircleOutline, title: 'Profil Guru Pembimbing', subtitle: 'Portal Pengesahan & Portofolio Prestasi' },
      { to: '/guru/kontak', label: 'Kontak Dapodik', icon: IoCallOutline, title: 'Informasi Kontak Dapodik', subtitle: 'SIKARYA Dikda Sulut • Akun Pendidik' },
      { to: '/guru/kata-sandi', label: 'Kata Sandi', icon: IoKeyOutline, title: 'Keamanan & Kata Sandi', subtitle: 'Ubah kata sandi portal guru' },
    ],
  },
];

export default function GuruLayout() {
  return (
    <DashboardLayout
      brand={{ icon: IoRibbonOutline, title: 'SIKARYA Guru', subtitle: 'Portal Pembimbing Kontingen' }}
      sections={sections}
      profile={guruProfil}
      footnote={{ left: guruProfil.org, right: 'Pendidik Aktif' }}
      notifications={notifikasi.guru}
      profilePath="/guru/profil"
    />
  );
}
