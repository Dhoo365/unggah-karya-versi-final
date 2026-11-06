import {
  IoCheckmarkCircleOutline,
  IoClipboardOutline,
  IoHammerOutline,
  IoPeopleOutline,
  IoRibbonOutline,
  IoSettingsOutline,
  IoShieldCheckmarkOutline,
  IoStatsChartOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import { adminProfile } from '../data/admin.js';

// Menu sidebar portal Admin.
// Menu "Utama" = tab bar bawah versi mobile, "Lainnya" = menu laci (drawer) versi mobile.
const sections = [
  {
    label: 'Menu Utama',
    items: [
      { to: '/admin', end: true, label: 'Lomba', icon: IoTrophyOutline, title: 'Dashboard Lomba', subtitle: 'Admin Disdikbud Kota Manado' },
      { to: '/admin/peserta', label: 'Peserta', icon: IoPeopleOutline, title: 'Manajemen Peserta & Validasi Prestasi', subtitle: 'Sistem Kurasi Talenta Kota Manado' },
      { to: '/admin/juri', label: 'Dewan Juri', icon: IoHammerOutline, title: 'Kelola Dewan Juri', subtitle: 'Dinas Pendidikan & Kebudayaan Kota Manado' },
      { to: '/admin/kriteria', label: 'Kriteria & Rubrik', icon: IoClipboardOutline, title: 'Kriteria & Rubrik Nilai', subtitle: 'Standar Disdikbud Kota Manado' },
      { to: '/admin/talenta', label: 'Kurasi Talenta', icon: IoRibbonOutline, title: 'Kurasi Talenta Daerah', subtitle: 'Pusat Prestasi Disdikbud Kota Manado' },
    ],
  },
  {
    label: 'Lainnya',
    items: [
      { to: '/admin/sertifikat', label: 'Sertifikat & Validasi', icon: IoCheckmarkCircleOutline },
      { to: '/admin/laporan', label: 'Laporan Rekapitulasi', icon: IoStatsChartOutline },
      { to: '/admin/pengaturan', label: 'Pengaturan Akun Dinas', icon: IoSettingsOutline },
    ],
  },
];

export default function AdminLayout() {
  return (
    <DashboardLayout
      brand={{ icon: IoShieldCheckmarkOutline, title: 'Admin SIKARYA', subtitle: 'Sulut Talenta Berdaya' }}
      sections={sections}
      profile={adminProfile}
      footnote={{ left: 'Wilayah: Rayon Kota Manado', right: 'Ver. 3.4.1' }}
      notifications={24}
    />
  );
}
