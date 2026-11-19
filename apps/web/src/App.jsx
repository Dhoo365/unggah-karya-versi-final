import { Route, Routes } from 'react-router-dom';
import { FeedbackProvider } from './components/feedback/index.js';
import { IoCheckmarkCircleOutline, IoSettingsOutline, IoStatsChartOutline } from 'react-icons/io5';

import AdminLayout from './layouts/AdminLayout.jsx';
import JuriLayout from './layouts/JuriLayout.jsx';
import SiswaLayout from './layouts/SiswaLayout.jsx';
import GuruLayout from './layouts/GuruLayout.jsx';
import DemoLayout from './layouts/DemoLayout.jsx';

import LandingPage from './pages/landing/LandingPage.jsx';
import OnboardingPage from './pages/onboarding/OnboardingPage.jsx';
import BerandaPage from './pages/admin/BerandaPage.jsx';
import PesertaPage from './pages/admin/PesertaPage.jsx';
import JuriPage from './pages/admin/JuriPage.jsx';
import KriteriaPage from './pages/admin/KriteriaPage.jsx';
import TalentaPage from './pages/admin/TalentaPage.jsx';
import LombaTugasPage from './pages/juri/LombaTugasPage.jsx';
import AntreanPage from './pages/juri/AntreanPage.jsx';
import RiwayatPage from './pages/juri/RiwayatPage.jsx';
import JuriProfilPage from './pages/juri/ProfilPage.jsx';
// Portal Siswa
import SiswaBerandaPage from './pages/siswa/BerandaPage.jsx';
import SiswaUnggahPage from './pages/siswa/UnggahPage.jsx';
import SiswaHasilPage from './pages/siswa/HasilPage.jsx';
import SiswaSertifikatPage from './pages/siswa/SertifikatPage.jsx';
import SiswaPanduanPage from './pages/siswa/PanduanPage.jsx';
import SiswaProfilPage from './pages/siswa/ProfilPage.jsx';
import SiswaUbahSandiPage from './pages/siswa/UbahSandiPage.jsx';
import SiswaDaftarPage from './pages/siswa/akun/DaftarPage.jsx';
import SiswaVerifikasiPage from './pages/siswa/akun/VerifikasiPage.jsx';
import SiswaStatusPage from './pages/siswa/akun/StatusPage.jsx';
import SiswaPerbaikanPage from './pages/siswa/akun/PerbaikanPage.jsx';
import SiswaDitolakPage from './pages/siswa/akun/DitolakPage.jsx';
// Portal Guru Pembimbing
import GuruBerandaPage from './pages/guru/BerandaPage.jsx';
import GuruDataSiswaPage from './pages/guru/DataSiswaPage.jsx';
import GuruRiwayatSiswaPage from './pages/guru/RiwayatSiswaPage.jsx';
import GuruKelolaStatusPage from './pages/guru/KelolaStatusPage.jsx';
import GuruKaryaSiswaPage from './pages/guru/KaryaSiswaPage.jsx';
import GuruUnggahKaryaPage from './pages/guru/UnggahKaryaPage.jsx';
import GuruKatalogLombaPage from './pages/guru/KatalogLombaPage.jsx';
import GuruPengumumanPage from './pages/guru/PengumumanPage.jsx';
import GuruPanduanPage from './pages/guru/PanduanPage.jsx';
import GuruProfilPage from './pages/guru/ProfilPage.jsx';
import GuruKontakPage from './pages/guru/KontakPage.jsx';
import GuruKataSandiPage from './pages/guru/KataSandiPage.jsx';
import GuruDaftarPage from './pages/guru/akun/DaftarPage.jsx';
import GuruStatusPage from './pages/guru/akun/StatusPage.jsx';
import GuruPerbaikanPage from './pages/guru/akun/PerbaikanPage.jsx';
import GuruDitolakPage from './pages/guru/akun/DitolakPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

/*
  Daftar alamat halaman website:

  /                    -> landing page (halaman depan publik)
  /onboarding          -> halaman pengenalan (2 langkah)
  /admin               -> portal Admin (Lomba, Peserta, Juri, Kriteria, Talenta)
  /juri                -> portal Juri (Lomba Tugas, Antrean, Riwayat, Profil)
  /siswa               -> portal Siswa (Beranda, Unggah, Hasil, Sertifikat, Panduan, Profil, Sandi)
  /guru                -> portal Guru Pembimbing (Beranda, Data Siswa, Karya, Unggah, Lomba, ...)
  /daftar/siswa/...    -> alur akun siswa: daftar → verifikasi OTP → status / perbaikan / ditolak
  /daftar/guru/...     -> alur akun guru: daftar → status / perbaikan / ditolak
  /demo, /about        -> contoh koneksi ke backend Express
*/
export default function App() {
  return (
    // FeedbackProvider: toast, dialog konfirmasi, dan pratinjau dokumen untuk semua halaman
    <FeedbackProvider>
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
        <Route path="antrean" element={<AntreanPage />} />
        <Route path="riwayat" element={<RiwayatPage />} />
        <Route path="profil" element={<JuriProfilPage />} />
      </Route>

      {/* Portal Siswa */}
      <Route path="/siswa" element={<SiswaLayout />}>
        <Route index element={<SiswaBerandaPage />} />
        <Route path="unggah" element={<SiswaUnggahPage />} />
        <Route path="hasil" element={<SiswaHasilPage />} />
        <Route path="sertifikat" element={<SiswaSertifikatPage />} />
        <Route path="panduan" element={<SiswaPanduanPage />} />
        <Route path="profil" element={<SiswaProfilPage />} />
        <Route path="ubah-sandi" element={<SiswaUbahSandiPage />} />
      </Route>

      {/* Portal Guru Pembimbing */}
      <Route path="/guru" element={<GuruLayout />}>
        <Route index element={<GuruBerandaPage />} />
        <Route path="siswa" element={<GuruDataSiswaPage />} />
        <Route path="siswa/:nisn" element={<GuruRiwayatSiswaPage />} />
        <Route path="siswa/:nisn/status" element={<GuruKelolaStatusPage />} />
        <Route path="karya" element={<GuruKaryaSiswaPage />} />
        <Route path="unggah" element={<GuruUnggahKaryaPage />} />
        <Route path="lomba" element={<GuruKatalogLombaPage />} />
        <Route path="pengumuman" element={<GuruPengumumanPage />} />
        <Route path="panduan" element={<GuruPanduanPage />} />
        <Route path="profil" element={<GuruProfilPage />} />
        <Route path="kontak" element={<GuruKontakPage />} />
        <Route path="kata-sandi" element={<GuruKataSandiPage />} />
      </Route>

      {/* Alur akun (tanpa sidebar) */}
      <Route path="/daftar/siswa" element={<SiswaDaftarPage />} />
      <Route path="/daftar/siswa/verifikasi" element={<SiswaVerifikasiPage />} />
      <Route path="/daftar/siswa/status" element={<SiswaStatusPage />} />
      <Route path="/daftar/siswa/perbaikan" element={<SiswaPerbaikanPage />} />
      <Route path="/daftar/siswa/ditolak" element={<SiswaDitolakPage />} />
      <Route path="/daftar/guru" element={<GuruDaftarPage />} />
      <Route path="/daftar/guru/status" element={<GuruStatusPage />} />
      <Route path="/daftar/guru/perbaikan" element={<GuruPerbaikanPage />} />
      <Route path="/daftar/guru/ditolak" element={<GuruDitolakPage />} />

      {/* Contoh koneksi ke backend */}
      <Route element={<DemoLayout />}>
        <Route path="/demo" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </FeedbackProvider>
  );
}
