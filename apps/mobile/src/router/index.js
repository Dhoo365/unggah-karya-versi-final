import { createRouter, createWebHistory } from '@ionic/vue-router';

// Halaman onboarding
import OnboardingPage from '@/views/OnboardingPage.vue';
import OnBoardingSlide2 from '@/views/OnBoardingSlide2.vue';

// Halaman admin
import AdminBeranda from '@/views/admin/AdminBeranda.vue';
import AdminPeserta from '@/views/admin/AdminPeserta.vue';
import AdminJuri from '@/views/admin/AdminJuri.vue';
import AdminKriteria from '@/views/admin/AdminKriteria.vue';
import AdminTalenta from '@/views/admin/AdminTalenta.vue';

// Halaman juri
import JuriLombaTugas from '@/views/juri/JuriLombaTugas.vue';

// Halaman contoh (tersambung ke backend)
import HomePage from '@/views/HomePage.vue';

const routes = [
  { path: '/', redirect: '/onboarding' },

  // onboarding
  { path: '/onboarding', name: 'Onboarding', component: OnboardingPage },
  { path: '/onboarding2', name: 'OnboardingSlide2', component: OnBoardingSlide2 },

  // admin
  { path: '/beranda', name: 'Beranda', component: AdminBeranda },
  { path: '/peserta', name: 'Peserta', component: AdminPeserta },
  { path: '/juri', name: 'Juri', component: AdminJuri },
  { path: '/kriteria', name: 'Kriteria', component: AdminKriteria },
  { path: '/talenta', name: 'Talenta', component: AdminTalenta },

  // juri
  { path: '/berandajuri', name: 'BerandaJuri', component: JuriLombaTugas },

  // contoh koneksi ke backend
  { path: '/home', name: 'Home', component: HomePage },
  { path: '/about', name: 'About', component: () => import('@/views/AboutPage.vue') },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
