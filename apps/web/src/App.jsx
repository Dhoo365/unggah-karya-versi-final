import { Route, Routes } from 'react-router-dom';
import {
  IoCheckboxOutline,
  IoCheckmarkCircleOutline,
  IoPersonOutline,
  IoPlayCircleOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
} from 'react-icons/io5';

import AdminLayout from './layouts/AdminLayout.jsx';
import JuriLayout from './layouts/JuriLayout.jsx';
import DemoLayout from './layouts/DemoLayout.jsx';

import LandingPage from './pages/landing/LandingPage.jsx';
import OnboardingPage from './pages/onboarding/OnboardingPage.jsx';
import BerandaPage from './pages/admin/BerandaPage.jsx';
import PesertaPage from './pages/admin/PesertaPage.jsx';
import JuriPage from './pages/admin/JuriPage.jsx';
import KriteriaPage from './pages/admin/KriteriaPage.jsx';
import TalentaPage from './pages/admin/TalentaPage.jsx';
import LombaTugasPage from './pages/juri/LombaTugasPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

/*
  Daftar alamat halaman website:

  /                    -> landing page (halaman depan publik)
  /onboarding          -> halaman pengenalan (2 langkah)
  /admin               -> portal Admin (Lomba, Peserta, Juri, Kriteria, Talenta)
  /juri                -> portal Juri (Lomba Tugas)
  /demo, /about        -> contoh koneksi ke backend Express
*/
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Portal Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<BerandaPage />} />
        <Route path="peserta" element={<PesertaPage />} />
        <Route path="juri" element={<JuriPage />} />
        <Route path="kriteria" element={<KriteriaPage />} />
        <Route path="talenta" element={<TalentaPage />} />
        <Route path="sertifikat" element={<ComingSoonPage icon={IoCheckmarkCircleOutline} title="Sertifikat & Validasi" />} />
        <Route path="laporan" element={<ComingSoonPage icon={IoStatsChartOutline} title="Laporan Rekapitulasi" />} />
        <Route path="pengaturan" element={<ComingSoonPage icon={IoSettingsOutline} title="Pengaturan Akun Dinas" />} />
      </Route>

      {/* Portal Juri */}
      <Route path="/juri" element={<JuriLayout />}>
        <Route index element={<LombaTugasPage />} />
        <Route path="antrean" element={<ComingSoonPage icon={IoPlayCircleOutline} title="Antrean Karya Peserta" />} />
        <Route path="riwayat" element={<ComingSoonPage icon={IoCheckboxOutline} title="Riwayat Penilaian" />} />
        <Route path="profil" element={<ComingSoonPage icon={IoPersonOutline} title="Profil Juri" />} />
      </Route>

      {/* Contoh koneksi ke backend */}
      <Route element={<DemoLayout />}>
        <Route path="/demo" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
