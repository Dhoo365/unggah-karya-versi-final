import { IoCheckboxOutline, IoClipboardOutline, IoHammerOutline, IoPersonOutline, IoPlayCircleOutline } from 'react-icons/io5';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import { juriProfile } from '../data/juri.js';

// Menu sidebar portal Juri (= tab bar bawah versi mobile).
const sections = [
  {
    label: 'Penjurian',
    items: [
      { to: '/juri', end: true, label: 'Lomba Tugas', icon: IoClipboardOutline, title: 'Lomba Tugas', subtitle: 'Portal Penjurian Resmi Dikda Sulut' },
      { to: '/juri/antrean', label: 'Antrean Karya', icon: IoPlayCircleOutline, dot: true, title: 'Antrean Karya Peserta' },
      { to: '/juri/riwayat', label: 'Riwayat Penilaian', icon: IoCheckboxOutline, title: 'Riwayat Penilaian' },
      { to: '/juri/profil', label: 'Profil Juri', icon: IoPersonOutline, title: 'Profil Juri' },
    ],
  },
];

export default function JuriLayout() {
  return (
    <DashboardLayout
      brand={{ icon: IoHammerOutline, title: 'SIKARYA Manado', subtitle: 'Portal Penjurian' }}
      sections={sections}
      profile={{
        initials: juriProfile.initials,
        name: juriProfile.shortName,
        role: 'Ketua Dewan Juri',
        org: juriProfile.org,
      }}
      notifications={3}
    />
  );
}
