/*
  DATA CONTOH portal Juri (sama dengan versi mobile).
  Nanti ganti dengan data dari backend.
*/
import {
  IoCheckmarkCircleOutline,
  IoClipboardOutline,
  IoColorPaletteOutline,
  IoConstructOutline,
  IoListOutline,
  IoPlayCircleOutline,
  IoRibbonOutline,
  IoSchoolOutline,
  IoTimeOutline,
} from 'react-icons/io5';

export const juriProfile = {
  name: 'Dr. Timothy Mumek, S.T., M.T.',
  shortName: 'Dr. Timothy Mumek',
  role: 'Ketua Dewan Juri Kota Manado',
  nip: '197805142003121002',
  org: 'UNIMA / Disdikbud Kota Manado',
  initials: 'TM',
  photo: '', // isi dengan path foto, misalnya '/assets/juri/timothy.jpg'
};

export const recap = [
  { label: 'Total Karya', value: 24, tag: 'Beban', tone: 'blue', icon: IoClipboardOutline },
  { label: 'Selesai Dinilai', value: 18, tag: '75%', tone: 'green', icon: IoCheckmarkCircleOutline },
  { label: 'Belum Dinilai', value: 6, tag: 'Wajib', tone: 'orange', icon: IoTimeOutline },
];

export const lombaFilters = ['Semua Lomba', 'FLS2N Seni Tari', 'FLS2N Vokal Solo'];

export const lombaTugas = [
  {
    tag: 'FLS2N 2026',
    tagIcon: IoRibbonOutline,
    tone: 'blue',
    status: 'Penjurian Berlangsung',
    title: 'FLS2N Seni Budaya & Tari Kreasi 2026 – Kota Manado',
    lineIcon: IoSchoolOutline,
    line: 'Jenjang SMP & SMA Se-Kota Manado',
    doc: 'SK Kadis No. 420/Disdik-Mdo/2026',
    done: 10,
    total: 14,
    left: 'Sisa 4 karya video tari',
    note: 'Tenggat: 28 Feb',
    noteTone: 'orange',
    ctaIcon: IoPlayCircleOutline,
  },
  {
    tag: 'Kriya & Desain',
    tagIcon: IoColorPaletteOutline,
    tone: 'amber',
    status: 'Penjurian Tahap 1',
    title: 'Festival Inovasi Kriya & Desain Kreatif Pelajar Manado',
    lineIcon: IoConstructOutline,
    line: 'Kategori: SMK Vokasi',
    doc: 'Rubrik: Estetika, Ergonomi, Portofolio PDF',
    done: 8,
    total: 10,
    left: 'Sisa 2 portofolio fisik/desain',
    note: 'Tersedia Berkas',
    noteTone: 'green',
    ctaIcon: IoListOutline,
  },
];
