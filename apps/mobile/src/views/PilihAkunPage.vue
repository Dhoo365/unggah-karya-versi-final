<template>
  <ion-page>
    <ion-content :fullscreen="true" class="akun-content">
      <div class="akun">
        <i class="akun__handle"></i>

        <div class="nav">
          <button class="nav__btn" type="button" aria-label="Kembali" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <span class="nav__step">Tahap 1 dari 2</span>
          <button class="nav__btn" type="button" aria-label="Tutup" @click="close">
            <ion-icon :icon="closeOutline" />
          </button>
        </div>

        <header class="head">
          <div class="head__logo">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 36 L20 8 L26 20 L18 36 Z" fill="#1d4f9c" />
              <path d="M18 36 L26 20 L34 36 Z" fill="#2f7be0" />
              <path d="M22 6 L32 4 L28 14 Z" fill="#f5b800" />
              <circle cx="30" cy="22" r="3" fill="#f5b800" />
            </svg>
          </div>
          <div class="head__text">
            <span class="head__eyebrow">SIKARYA Dikda Sulut</span>
            <h1 class="head__title">Pilih Jenis Akun Pendaftaran</h1>
          </div>
        </header>

        <p class="intro">Silakan pilih peran Anda untuk memulai registrasi akun resmi di SIKARYA Dikda Sulut.</p>

        <!-- Kartu Pendaftaran Utama (Siswa, Guru, Dewan Juri) -->
        <article
          v-for="r in roles"
          :key="r.key"
          class="role"
          :class="{ 'role--muted': r.muted, 'role--selected': selected === r.key }"
          role="button"
          tabindex="0"
          :aria-label="`Daftar sebagai ${r.short}`"
          @click="choose(r)"
          @keydown.enter.prevent="choose(r)"
          @keydown.space.prevent="choose(r)"
        >
          <div class="role__head">
            <div class="role__icon" :class="'role__icon--' + r.tone"><ion-icon :icon="r.icon" /></div>
            <div class="role__title">
              <h2 class="role__name">{{ r.name }}</h2>
              <span class="role__tag" :class="'role__tag--' + r.tone">{{ r.tag }}</span>
            </div>
          </div>

          <p class="role__desc">{{ r.desc }}</p>

          <div class="req">
            <ion-icon class="req__icon" :icon="r.reqIcon" />
            <p class="req__text"><b>Syarat Cepat:</b> {{ r.req }}</p>
          </div>

          <div class="role__foot">
            <b class="role__link" :class="'role__link--' + r.tone">Daftar sebagai {{ r.short }}</b>
            <span class="role__go" :class="'role__go--' + r.tone"><ion-icon :icon="arrowForwardOutline" /></span>
          </div>
        </article>

        <!-- Kartu Portal Khusus (Admin Dikda & Eksekutif Pimpinan) -->
        <article
          v-for="p in specialPortals"
          :key="p.key"
          class="portal-card"
          :class="{ 'role--selected': selected === p.key }"
          role="button"
          tabindex="0"
          :aria-label="p.name"
          @click="choosePortal(p)"
          @keydown.enter.prevent="choosePortal(p)"
          @keydown.space.prevent="choosePortal(p)"
        >
          <div class="portal-card__icon" :class="'portal-card__icon--' + p.tone">
            <ion-icon :icon="p.icon" />
          </div>

          <div class="portal-card__body">
            <div class="portal-card__top">
              <h2 class="portal-card__name">{{ p.name }}</h2>
              <span class="portal-card__tag" :class="'portal-card__tag--' + p.tone">{{ p.tag }}</span>
            </div>
            <p class="portal-card__desc">{{ p.desc }}</p>
          </div>

          <span class="portal-card__go" aria-hidden="true">
            <ion-icon :icon="arrowForwardOutline" />
          </span>
        </article>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <div class="dock">
        <div class="dock__info">
          <ion-icon :icon="informationCircleOutline" />
          <p>Pastikan data Anda sesuai dengan pangkalan data Dapodik Dikda Sulut.</p>
        </div>
        <p class="dock__login">
          Sudah punya akun? <a :href="ROUTES.login" @click.prevent="toLogin">Masuk Portal</a>
        </p>
        <p class="dock__help">
          <ion-icon :icon="helpCircleOutline" /> Butuh bantuan pendaftaran?
          <a :href="HELPDESK_URL" @click.prevent="openHelpdesk">Helpdesk Dikda Sulut</a>
        </p>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonFooter, IonIcon, alertController } from '@ionic/vue';
import { useNav, ROUTES, ROLE_ROUTES } from '../composables/useOnboarding';
import {
  arrowBackOutline,
  closeOutline,
  arrowForwardOutline,
  schoolOutline,
  peopleOutline,
  hammerOutline,
  shieldCheckmarkOutline,
  shieldOutline,
  clipboardOutline,
  informationCircleOutline,
  helpCircleOutline,
} from 'ionicons/icons';

const { go, back, ionRouter } = useNav();

// GANTI dengan kontak helpdesk yang asli (WhatsApp, email, atau halaman bantuan).
const HELPDESK_URL = 'https://wa.me/62XXXXXXXXXX?text=Halo%20Helpdesk%20SIKARYA%2C%20saya%20butuh%20bantuan%20pendaftaran';

type Role = {
  key: string; name: string; short: string; tone: string; icon: string;
  tag: string; desc: string; reqIcon: string; req: string; muted?: boolean;
};

type SpecialPortal = {
  key: string;
  name: string;
  tag: string;
  desc: string;
  tone: 'blue' | 'amber';
  icon: string;
  route: string;
};

const selected = ref<string | null>(null);
let busy = false;

const roles: Role[] = [
  {
    key: 'siswa', name: 'Siswa / Peserta Lomba', short: 'Siswa', tone: 'blue', icon: schoolOutline,
    tag: 'Peserta Mandiri / Tim',
    desc: 'Daftar menggunakan NISN aktif dan data sekolah untuk mengunggah karya dan memantau kurasi lomba FLS2N, O2SN, dll.',
    reqIcon: shieldCheckmarkOutline, req: 'Memerlukan NISN, Nama Sekolah, dan Surat Rekomendasi',
  },
  {
    key: 'guru', name: 'Guru Pembimbing', short: 'Guru', tone: 'amber', icon: peopleOutline,
    tag: 'Verifikator Sekolah',
    desc: 'Daftar menggunakan NUPTK / NIP dan verifikasi sekolah untuk mendampingi, memvalidasi berkas, dan memantau karya siswa.',
    reqIcon: clipboardOutline, req: 'Memerlukan NUPTK/NIP dan SK Penugasan Kepala Sekolah',
  },
  {
    key: 'juri', name: 'Dewan Juri', short: 'Juri', tone: 'sky', icon: hammerOutline,
    tag: 'Penilai & Kurator Lomba',
    desc: 'Aktivasi akun panelis juri independen atau akademisi untuk penilaian karya, rubrik skor, dan kurasi talenta FLS2N/O2SN Kota Manado.',
    reqIcon: shieldCheckmarkOutline, req: 'Memerlukan NIP/NIDN, Pakta Integritas, dan SK Penetapan Kadis',
  },
];

const specialPortals: SpecialPortal[] = [
  {
    key: 'admin',
    name: 'Masuk sebagai Admin Dikda',
    tag: 'Khusus Staf',
    desc: 'Akses portal administrator & verifikator Dinas Dikda',
    tone: 'blue',
    icon: shieldCheckmarkOutline,
    route: ROLE_ROUTES.admin ?? '/login-admin',
  },
  {
    key: 'pimpinan',
    name: 'Portal Eksekutif Pimpinan',
    tag: 'Khusus Pimpinan',
    desc: 'Akses khusus Kepala Balai, Dewan Pengarah & Otorisasi TTE BSrE',
    tone: 'amber',
    icon: shieldOutline,
    route: ROLE_ROUTES.pimpinan ?? '/login-pimpinan',
  },
];

/** Opsi tambahan jika peran tertentu diberi flag muted */
async function confirmMuted(r: Role): Promise<boolean> {
  const alert = await alertController.create({
    header: `Daftar sebagai ${r.short}?`,
    message: `Akun ${r.name} hanya untuk panelis yang sudah ditetapkan. ${r.req}.`,
    buttons: [
      { text: 'Batal', role: 'cancel' },
      { text: 'Lanjutkan', role: 'confirm' },
    ],
  });
  await alert.present();
  const { role } = await alert.onDidDismiss();
  return role === 'confirm';
}

async function choose(r: Role) {
  if (busy) return;
  busy = true;
  selected.value = r.key;
  try {
    if (r.muted && !(await confirmMuted(r))) return;
    await new Promise((res) => setTimeout(res, 120));
    ionRouter.navigate(ROLE_ROUTES[r.key] ?? ROUTES.login, 'forward', 'push');
  } finally {
    selected.value = null;
    busy = false;
  }
}

async function choosePortal(p: SpecialPortal) {
  if (busy) return;
  busy = true;
  selected.value = p.key;
  try {
    await new Promise((res) => setTimeout(res, 120));
    ionRouter.navigate(p.route, 'forward', 'push');
  } finally {
    selected.value = null;
    busy = false;
  }
}

const goBack = () => back(ROUTES.slides[2]);
const close = () => go(ROUTES.login, 'root', 'replace');
const toLogin = () => go(ROUTES.login, 'root', 'replace');
const openHelpdesk = () => window.open(HELPDESK_URL, '_blank', 'noopener');
</script>

<style scoped>
.akun-content {
  --background: #fff;
}

.akun {
  min-height: 100%;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 20px 24px;
  background: #fff;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

.akun__handle {
  display: block;
  width: 56px;
  height: 6px;
  margin: 0 auto 22px;
  border-radius: 3px;
  background: #d5d9e0;
}

.akun h1,
.akun h2,
.akun p {
  margin: 0;
}

/* Navigasi atas */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.nav__btn {
  display: flex;
  padding: 0;
  border: 0;
  background: none;
  font-size: 28px;
  color: #1f2937;
  cursor: pointer;
}

.nav__step {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #0b4a8f;
}

/* Kepala */
.head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.head__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  flex: none;
  border: 1px solid #d5d9e0;
  border-radius: 20px;
  background: #f1f4f9;
}

.head__logo svg {
  width: 46px;
  height: 46px;
}

.head__eyebrow {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #0b4a8f;
}

.head__title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
}

.intro {
  margin-top: 18px !important;
  font-size: 15px;
  line-height: 25px;
  color: #475569;
}

/* Kartu peran utama */
.role {
  padding: 18px;
  margin-top: 18px;
  border: 2px solid #c3c6d4;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.role:active,
.portal-card:active {
  transform: scale(0.99);
}

.role--selected,
.role:focus-visible,
.portal-card:focus-visible {
  border-color: #0b4a8f;
  box-shadow: 0 0 0 3px rgba(11, 74, 143, 0.18);
  outline: none;
}

.nav__btn:focus-visible,
.dock a:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}

.role--muted {
  background: #f9fafc;
}

.role--muted .role__head,
.role--muted .role__desc,
.role--muted .req,
.role--muted .role__foot {
  opacity: 0.62;
}

.role__head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.role__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  flex: none;
  border-radius: 16px;
  font-size: 30px;
}

.role__icon--blue {
  background: #cfe3fb;
  color: #0b3d91;
}

.role__icon--amber {
  background: #f9dcae;
  color: #5b3a00;
}

.role__icon--sky {
  background: #cfe3fb;
  color: #00639a;
}

.role__name {
  font-size: 22px;
  line-height: 28px;
  font-weight: 800;
}

.role__tag {
  display: inline-block;
  margin-top: 4px;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.role__tag--blue,
.role__tag--sky {
  background: #d9e8fb;
  color: #00639a;
}

.role__tag--amber {
  background: #fde6bd;
  color: #7a4f00;
}

.role__desc {
  margin-top: 14px !important;
  font-size: 14px;
  line-height: 24px;
  color: #334155;
}

/* Syarat cepat */
.req {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  margin-top: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f1f4f8;
}

.req__icon {
  flex: none;
  margin-top: 2px;
  font-size: 20px;
  color: #0b4a8f;
}

.req__text {
  font-size: 13px;
  line-height: 19px;
  color: #475569;
}

.req__text b {
  color: #0f172a;
}

/* Footer kartu */
.role__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.role__link {
  font-size: 17px;
  font-weight: 800;
}

.role__link--blue {
  color: #0b3d91;
}

.role__link--amber,
.role__link--sky {
  color: #00639a;
}

.role__go {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 22px;
}

.role__go--blue,
.role__go--amber,
.role__go--sky {
  background: #d7e4fb;
  color: #0b4a8f;
}

/* Kartu Portal Khusus (Admin Dikda & Eksekutif Pimpinan) */
.portal-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  margin-top: 16px;
  border: 1.5px solid #cbd5e1;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.portal-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  flex: none;
  border-radius: 15px;
  font-size: 26px;
}

.portal-card__icon--blue {
  background: #d9e8fb;
  color: #0b3d91;
}

.portal-card__icon--amber {
  background: #fde6bd;
  color: #6b4200;
}

.portal-card__body {
  flex: 1;
  min-width: 0;
}

.portal-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.portal-card__name {
  font-size: 16px;
  line-height: 21px;
  font-weight: 800;
  color: #0f172a;
}

.portal-card__tag {
  flex: none;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
  text-align: center;
}

.portal-card__tag--blue {
  background: #dce7fd;
  color: #163e8c;
}

.portal-card__tag--amber {
  background: #fde6bd;
  color: #6b4200;
}

.portal-card__desc {
  margin-top: 5px !important;
  font-size: 12.5px;
  line-height: 18px;
  color: #475569;
}

.portal-card__go {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  background: #e2ecfc;
  color: #0b4a8f;
  font-size: 18px;
}

/* Dock bawah */
.dock {
  padding: 14px 20px calc(env(safe-area-inset-bottom, 0px) + 14px);
  border-top: 1px solid #e2e8f0;
  background: #fff;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  text-align: center;
}

.dock p {
  margin: 0;
}

.dock__info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f1f4f8;
  text-align: left;
}

.dock__info ion-icon {
  flex: none;
  font-size: 22px;
  color: #0b4a8f;
}

.dock__info p {
  font-size: 13px;
  line-height: 18px;
  color: #334155;
}

.dock__login {
  margin-top: 18px !important;
  font-size: 15px;
  color: #1f2937;
}

.dock__login a {
  font-weight: 800;
  color: #0b3d91;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
}

.dock__help {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 14px !important;
  font-size: 12px;
  color: #64748b;
}

.dock__help ion-icon {
  font-size: 16px;
  color: #94a3b8;
}

.dock__help a {
  font-weight: 700;
  color: #00639a;
  text-decoration: none;
}
</style>