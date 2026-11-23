import { createRouter, createWebHistory } from '@ionic/vue-router';

// Halaman onboarding
import OnboardingPage from '@/views/OnboardingPage.vue';
import OnBoardingSlide2 from '@/views/OnBoardingSlide2.vue';
import OnBoardingSlide3 from '../views/OnBoardingSlide3.vue';

// Halaman admin
import AdminBeranda from '@/views/admin/AdminBeranda.vue';
import AdminPeserta from '@/views/admin/AdminPeserta.vue';
import AdminJuri from '@/views/admin/AdminJuri.vue';
import AdminKriteria from '@/views/admin/AdminKriteria.vue';
import AdminTalenta from '@/views/admin/AdminTalenta.vue';
import AdminLogin from '../views/admin/AdminLogin.vue';

// Halaman juri
import JuriLombaTugas from '@/views/juri/JuriLombaTugas.vue';
import JuriAnteran from '../views/juri/JuriAnteran.vue';
import JuriRiwayat from '../views/juri/JuriRiwayat.vue';
import JuriProfil from '../views/juri/JuriProfil.vue';
import JuriLogin from '../views/juri/JuriLogin.vue';

//Halaman Guru
import GuruBeranda from '../views/Guru/GuruBeranda.vue';
import GuruDataSiswa from '../views/Guru/GuruDataSiswa.vue';
import GuruKaryaSiswa from '../views/Guru/GuruKaryaSiswa.vue';
import GuruKatalogLomba from '../views/Guru/GuruKatalogLomba.vue';
import GuruPengumuman from '../views/Guru/GuruPengumuman.vue';
import GuruProfil from '../views/Guru/GuruProfil.vue';
import GuruKataSandi from '../views/Guru/GuruKataSandi.vue';
import GuruKontakDapodik from '../views/Guru/GuruKontakDapodik.vue';
import GuruPanduan from '../views/Guru/GuruPanduan.vue';
import GuruPendaftaran from '../views/Guru/GuruPendaftaran.vue';
import GuruStatusAkun from '../views/Guru/GuruStatusAkun.vue';
import GuruStatusPerbaikan from '../views/Guru/GuruStatusPerbaikan.vue';
import GuruPengajuanDitolak from '../views/Guru/GuruPengajuanDitolak.vue';
import GuruRiwayatSiswa from '../views/Guru/GuruRiwayatSiswa.vue';
import GuruKelolaStatus from '../views/Guru/GuruKelolaStatus.vue';
import GuruUnggahKarya from '../views/Guru/GuruUnggahKarya.vue';
import GuruLogin from '../views/Guru/GuruLogin.vue';

//Halaman Siswa
import SiswaValidasiSertifikat from '../views/Siswa/SiswaValidasiSertifikat.vue';
import SiswaHasilLomba from '../views/Siswa/SiswaHasilLomba.vue';
import SiswaProfil from '../views/Siswa/SiswaProfil.vue';
import SiswaUbahSandi from '../views/Siswa/SiswaUbahSandi.vue';
import SiswaDaftar from '../views/Siswa/SiswaDaftar.vue';
import SiswaVerifikasi from '../views/Siswa/SiswaVerifikasi.vue';
import SiswaAkunStatus from '../views/Siswa/SiswaAkunStatus.vue';
import SiswaStatusPerbaikan from '../views/Siswa/SiswaStatusPerbaikan.vue';
import SiswaPengajuanDitolak from '../views/Siswa/SiswaPengajuanDitolak.vue';
import SiswaPanduan from '../views/Siswa/SiswaPanduan.vue';
import SiswaUnggah from '../views/Siswa/SiswaUnggah.vue';
import SiswaBeranda from '../views/Siswa/SiswaBeranda.vue';




// Halaman contoh (tersambung ke backend)
import HomePage from '@/views/HomePage.vue';
import SiswaLogin from '../views/Siswa/SiswaLogin.vue';

const routes = [
  { path: '/', redirect: '/onboarding' },

  // onboarding
  { 
    path: '/onboarding',
    name: 'Onboarding', 
    component: OnboardingPage 
  },
  { 
    path: '/onboarding2', 
    name: 'OnboardingSlide2', 
    component: OnBoardingSlide2 
  },
  {
    path: '/onboarding3',
    name: 'OnBoardingSlide3',
    component: OnBoardingSlide3
  },

  // admin
  { 
    path: '/beranda', 
    name: 'Beranda', 
    component: AdminBeranda 
  },
  { 
    path: '/peserta', 
    name: 'Peserta', 
    component: AdminPeserta 
  },
  { 
    path: '/juri', 
    name: 'Juri', 
    component: AdminJuri 
  },
  { 
    path: '/kriteria', 
    name: 'Kriteria', 
    component: AdminKriteria 
  },
  { 
    path: '/talenta', 
    name: 'Talenta', 
    component: AdminTalenta 
  },
  {
    path: '/adminlogin',
    name: 'AdminLogin',
    component: AdminLogin
  },  

  // juri
  { 
    path: '/berandajuri', 
    name: 'BerandaJuri', 
    component: JuriLombaTugas 
  },
  {
    path: '/antreanjuri',
    name: 'AntreanJuri',
    component: JuriAnteran
  },
  {
    path: '/riwayatjuri',
    name: 'RiwayatJuri',
    component: JuriRiwayat
  },
  {
    path: '/profiljuri',
    name: 'ProfilJuri',
    component: JuriProfil
  },
  {
    path: '/jurilogin',
    name: 'JuriLogin',
    component: JuriLogin
  },

  // Guru
 {
  path: '/berandaguru',
  name: 'BerandaGuru',
  component: GuruBeranda
 },
 {
  path: '/datasiswa',
  name: 'DataSiswa',
  component: GuruDataSiswa
 },
 {
  path: '/karyasiswa',
  name: 'KaryaSiswa',
  component: GuruKaryaSiswa
 },
 {
  path: '/kataloglomba',
  name: 'KaryaSiswa',
  component: GuruKatalogLomba
 },
 {
  path: '/gurupengumuman',
  name: 'GuruPengumuman',
  component: GuruPengumuman
 },
 {
  path: '/guruprofil',
  name: 'GuruPengumuman',
  component: GuruProfil
 },
 {
  path: '/gurukatasandi',
  name: 'gurukatasandi',
  component: GuruKataSandi
 },
 {
  path: '/gurudapodik',
  name: 'GuruDapodik',
  component: GuruKontakDapodik
 },
 {
  path: '/gurupanduan',
  name: 'GuruPanduan',
  component: GuruPanduan
 },
 {
  path: '/gurupendaftaran',
  name: 'GuruPendaftaran',
  component: GuruPendaftaran
 },
 {
  path: '/gurustatusakun',
  name: 'GuruStatusAkun',
  component: GuruStatusAkun
 },
 {
  path: '/gurustatusperbaikan',
  name: 'GuruStatusPerbaikan',
  component: GuruStatusPerbaikan
 },
 {
  path:'/guruditolak',
  name: 'guruditolak',
  component: GuruPengajuanDitolak
 },
 {
  path: '/gururiwayatsiswa',
  name: 'GuruRiwayatSiswa',
  component: GuruRiwayatSiswa
 },
 {
  path: '/gurukelolastatus',
  name: 'GuruKelolaStatus',
  component: GuruKelolaStatus
 },
 {
  path: '/guruunggahkarya',
  name: 'GuruUnggahKarya',
  component: GuruUnggahKarya
 },
 {
  path: '/gurulogin',
  name: 'GuruLogin',
  component: GuruLogin
 },


 //Siswa
 {
  path: '/siswavalidasi',
  name: 'SiswaValidasi',
  component: SiswaValidasiSertifikat
 },
 {
  path: '/siswahasil',
  name: 'SiswaHasil',
  component: SiswaHasilLomba
 },
 {
  path: '/siswaprofil',
  name: 'SiswaProfil',
  component: SiswaProfil
 },
 {
  path: '/siswaubahsandi',
  name: 'SiswaUbahSandi',
  component: SiswaUbahSandi
 },
 {
  path: '/siswadaftar',
  name: 'SiswaDaftar',
  component: SiswaDaftar
 },
 {
  path: '/siswaverifikasi',
  name: 'SiswaVerifikasi',
  component: SiswaVerifikasi
 },
 {
  path: '/siswastatus',
  name: 'SiswaStatus',
  component: SiswaAkunStatus
 },
 {
  path: '/siswastatusperbaikan',
  name: 'SiswaStatusPerbaikan',
  component: SiswaStatusPerbaikan
 },
 {
  path: '/siswaditolak',
  name: 'SiswaDitolak',
  component: SiswaPengajuanDitolak
 },
 {
  path: '/siswapanduan',
  name: 'SiswaPanduan',
  component: SiswaPanduan
 },
 {
  path: '/siswaunggah',
  name: 'SiswaUnggah',
  component: SiswaUnggah
 },
 {
  path: '/siswaberanda',
  name: 'SiswaBeranda',
  component: SiswaBeranda
 },
 {
  path: '/siswalogin',
  name: 'SiswaLogin',
  component: SiswaLogin
 },
 

  // contoh koneksi ke backend
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: () => import('@/views/AboutPage.vue') },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
