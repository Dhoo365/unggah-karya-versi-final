<template>
  <ion-page>
    <ion-content :fullscreen="true" class="beranda-content">
      <div class="beranda">
        <header class="topbar">
          <div class="topbar__brand">
            <button class="topbar__btn" type="button" aria-label="Menu"><ion-icon :icon="menuOutline" /></button>
            <div class="topbar__logo"><ion-icon :icon="shieldCheckmarkOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">SIKARYA Dikda Sulut</h1>
              <p class="topbar__subtitle">Portal Pembimbing Kontingen</p>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <b class="topbar__count">3</b>
            </button>
            <button class="topbar__btn topbar__btn--gray" type="button" aria-label="Bantuan"><ion-icon :icon="helpCircleOutline" /></button>
          </div>
        </header>

        <div class="body">
          <!-- Profil guru -->
          <section class="profile">
            <div class="profile__top">
              <div class="profile__avatar"><ion-icon :icon="personOutline" /></div>
              <div class="profile__info">
                <h2 class="profile__name">{{ guru.name }}</h2>
                <p class="profile__nip">NIP: {{ guru.nip }}</p>
                <div class="profile__tags">
                  <span class="profile__school"><ion-icon :icon="schoolOutline" /> {{ guru.school }}</span>
                  <span class="profile__role">{{ guru.role }}</span>
                </div>
              </div>
            </div>
            <div class="profile__access">
              <ion-icon :icon="lockClosedOutline" />
              <p>
                <span>Hak Akses Terbatas:</span> Pengelolaan &amp; isolasi data khusus siswa
                <b>{{ guru.school }}</b> yang terverifikasi.
              </p>
            </div>
          </section>

          <!-- Hero -->
          <section class="hero">
            <ion-icon class="hero__mark" :icon="qrCodeOutline" />
            <span class="hero__eyebrow">Portal Guru Terpadu 2025/2026</span>
            <ion-icon class="hero__badge" :icon="shieldCheckmark" />
            <h2 class="hero__title">Dashboard Pembimbing</h2>
            <p class="hero__text">
              Kelola kelengkapan data siswa, pengajuan karya kompetisi, serta monitoring status penilaian tingkat dinas.
            </p>
            <div class="hero__actions">
              <button class="hero__btn hero__btn--white" type="button">
                <ion-icon :icon="documentOutline" /> + Upload Karya Siswa
              </button>
              <button class="hero__btn hero__btn--glass" type="button">
                <ion-icon :icon="peopleOutline" /> Kelola Status
              </button>
            </div>
          </section>

          <!-- Metrik -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Metrik Siswa &amp; Karya Sekolah</h2>
              <span class="section-head__note">SMPN 1 Manado</span>
            </div>
            <div class="metrics">
              <div v-for="m in metrics" :key="m.label" class="metric">
                <span class="metric__label">{{ m.label }}</span>
                <b class="metric__value">{{ m.value }}</b>
                <small class="metric__note">{{ m.note }}</small>
              </div>
            </div>
            <div class="metrics metrics--status">
              <div v-for="s in statuses" :key="s.label" class="metric metric--status" :class="'metric--' + s.tone">
                <span class="metric__head">
                  <span class="metric__label metric__label--bold">{{ s.label }}</span>
                  <i class="metric__dot"></i>
                </span>
                <b class="metric__value">{{ s.value }}</b>
                <small class="metric__note">{{ s.note }}</small>
              </div>
            </div>
          </section>

          <!-- Menu utama -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Menu Utama Guru</h2>
              <span class="section-head__note">Fitur Manajemen</span>
            </div>
            <div class="menu">
              <button v-for="m in menu" :key="m.title" class="menu__item" type="button">
                <span class="menu__icon" :class="'menu__icon--' + m.tone"><ion-icon :icon="m.icon" /></span>
                <b class="menu__title">{{ m.title }}</b>
                <small class="menu__desc">{{ m.desc }}</small>
              </button>
            </div>
          </section>

          <!-- Feed -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Feed Aktivitas &amp; Audit Trail Terkini</h2>
              <a class="section-head__link" href="#">Riwayat Lengkap</a>
            </div>
            <div class="feed">
              <article v-for="f in feed" :key="f.title" class="feed__item" :class="'feed__item--' + f.tone">
                <div class="feed__top">
                  <span class="feed__tag" :class="'feed__tag--' + f.tone"><ion-icon :icon="f.icon" /> {{ f.tag }}</span>
                  <small class="feed__time">{{ f.time }}</small>
                </div>
                <h3 class="feed__title">{{ f.title }}</h3>
                <p class="feed__desc">{{ f.desc }}</p>
              </article>
            </div>
          </section>

          <!-- Administrasi -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Administrasi &amp; Validasi Pra-Submit</h2>
            </div>
            <div class="admin">
              <div class="admin__icon"><ion-icon :icon="clipboardOutline" /></div>
              <div>
                <b class="admin__title">Validasi Otomatis Pra-Submit</b>
                <p class="admin__desc">Cek plagiasi &amp; kelengkapan otomatis</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end" class="fab">
        <button class="fab__btn" type="button"><ion-icon :icon="addCircleOutline" /> Upload Karya</button>
      </ion-fab>
    </ion-content>

    <GuruTabbar />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonFab, IonIcon } from '@ionic/vue';
import {
  menuOutline,
  shieldCheckmarkOutline,
  shieldCheckmark,
  notificationsOutline,
  helpCircleOutline,
  personOutline,
  schoolOutline,
  lockClosedOutline,
  qrCodeOutline,
  documentOutline,
  peopleOutline,
  idCardOutline,
  folderOutline,
  trophyOutline,
  megaphoneOutline,
  hourglassOutline,
  swapHorizontalOutline,
  clipboardOutline,
  addCircleOutline,
} from 'ionicons/icons';

import GuruTabbar from './GuruTabbar.vue';

const guru = {
  name: 'Ahmad Fauzi, S.Pd.',
  nip: '198204152008011009',
  school: 'SMP Negeri 1 Manado',
  role: 'Guru Pembimbing',
};

const metrics = [
  { label: 'Total Siswa', value: 120, note: 'Bimbingan' },
  { label: 'Siswa Aktif', value: 105, note: 'Terdaftar' },
  { label: 'Siswa Lolos', value: 15, note: 'Alumni' },
];

const statuses = [
  { label: 'Menunggu', value: 8, note: 'Perlu Verifikasi', tone: 'amber' },
  { label: 'Diterima', value: 25, note: 'Lolos Seleksi', tone: 'green' },
  { label: 'Ditolak', value: 2, note: 'Butuh Revisi', tone: 'red' },
];

const menu = [
  { title: 'Data Siswa', desc: 'Status aktif, lulus & riwayat audit', icon: idCardOutline, tone: 'blue' },
  { title: 'Karya Siswa', desc: 'Diajukan, diterima, ditolak & revisi', icon: folderOutline, tone: 'blue' },
  { title: 'Lomba', desc: 'Jadwal & periode lomba aktif', icon: trophyOutline, tone: 'amber' },
  { title: 'Pengumuman', desc: 'Edaran resmi Dispen Dikda Sulut', icon: megaphoneOutline, tone: 'sky' },
];

const feed = [
  {
    tag: 'Audit Status', icon: swapHorizontalOutline, tone: 'blue', time: '15 Juni 2026',
    title: 'Status Budi diubah dari Aktif ke Lulus oleh Guru Ahmad',
    desc: 'Perubahan terverifikasi & tercatat pada sistem log SMP Negeri 1 Manado.',
  },
  {
    tag: 'Verifikasi Dispen', icon: hourglassOutline, tone: 'amber', time: 'Baru saja',
    title: 'Karya Video Kreatif Budi menunggu verifikasi Dispen',
    desc: 'Kategori FLS2N Sinematografi SMP • Berkas pra-submit lengkap.',
  },
];
</script>

<style scoped>
.beranda-content {
  --background: #f7f9fb;
}

.beranda {
  min-height: 100%;
  padding-bottom: 80px;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.beranda ion-icon {
  flex-shrink: 0;
}

.beranda button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.beranda h1,
.beranda h2,
.beranda h3,
.beranda p {
  margin: 0;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 16px 10px;
  background: #fff;
  border-bottom: 1px solid #e0e3e5;
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 10px;
  background: #e8f0fe;
  font-size: 22px;
  color: #003178;
}

.topbar__title {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  font-size: 11px;
  line-height: 14px;
  color: #434652;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 26px;
  color: #003178;
}

.topbar__btn--gray {
  color: #737783;
}

.topbar__count {
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #ba1a1a;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px;
}

/* Profil */
.profile {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 18px;
  background: #fff;
}

.profile__top {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.profile__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  flex: none;
  border-radius: 16px;
  background: #003178;
  font-size: 32px;
  color: #fff;
}

.profile__name {
  font-size: 19px;
  line-height: 24px;
  font-weight: 800;
}

.profile__nip {
  font-size: 12px;
  color: #737783;
}

.profile__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}

.profile__school {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 8px;
  background: #d9e2ff;
  font-size: 12px;
  font-weight: 600;
  color: #003178;
}

.profile__school ion-icon {
  font-size: 15px;
}

.profile__role {
  font-size: 12px;
  color: #737783;
}

.profile__access {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.profile__access ion-icon {
  margin-top: 2px;
  font-size: 18px;
  color: #003178;
}

.profile__access p {
  font-size: 12px;
  line-height: 18px;
  color: #434652;
}

.profile__access span {
  color: #737783;
}

.profile__access b {
  color: #003178;
}

/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0d47a1 0%, #003178 100%);
  color: #fff;
}

.hero__mark {
  position: absolute;
  right: -10px;
  bottom: -14px;
  font-size: 130px;
  color: rgba(255, 255, 255, 0.07);
}

.hero__eyebrow {
  position: relative;
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #d9e2ff;
}

.hero__badge {
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 26px;
  color: #ffba38;
}

.hero__title {
  position: relative;
  margin-top: 8px !important;
  font-size: 22px;
  line-height: 28px;
  font-weight: 800;
}

.hero__text {
  position: relative;
  margin-top: 8px !important;
  font-size: 12px;
  line-height: 18px;
  color: #d9e2ff;
}

.hero__actions {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 10px;
  margin-top: 14px;
}

.hero__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
}

.hero__btn ion-icon {
  font-size: 18px;
}

.hero__btn--white {
  background: #fff !important;
  color: #003178 !important;
}

.hero__btn--glass {
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  background: rgba(255, 255, 255, 0.12) !important;
  color: #fff !important;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-head__title {
  font-size: 15px;
  font-weight: 800;
}

.section-head__note {
  font-size: 12px;
  font-weight: 600;
  color: #003178;
}

.section-head__link {
  font-size: 12px;
  font-weight: 600;
  color: #003178;
  text-decoration: none;
}

/* Metrik */
.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.metrics--status {
  margin-top: 10px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.metric__label {
  font-size: 12px;
  color: #434652;
}

.metric__label--bold {
  font-weight: 700;
  color: #191c1e;
}

.metric__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.metric__value {
  font-size: 28px;
  line-height: 1.1;
  font-weight: 800;
  color: #003178;
}

.metric__note {
  font-size: 11px;
  color: #737783;
}

.metric__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.metric--amber {
  border-color: #f3d98a;
  background: #fffbea;
}

.metric--amber .metric__dot {
  background: #f59e0b;
}

.metric--amber .metric__value,
.metric--amber .metric__note {
  color: #7a3e00;
}

.metric--green {
  border-color: #b8e6cb;
  background: #effaf4;
}

.metric--green .metric__dot {
  background: #10b981;
}

.metric--green .metric__value,
.metric--green .metric__note {
  color: #047857;
}

.metric--red {
  border-color: #f4b6b0;
  background: #fff1ef;
}

.metric--red .metric__dot {
  background: #ba1a1a;
}

.metric--red .metric__value,
.metric--red .metric__note {
  color: #ba1a1a;
}

/* Menu */
.menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.menu__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 14px;
  border: 1px solid #e0e3e5 !important;
  border-radius: 14px;
  background: #fff !important;
  text-align: left;
}

.menu__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 20px;
}

.menu__icon--blue {
  background: #d9e2ff;
  color: #003178;
}

.menu__icon--amber {
  background: #ffe9b8;
  color: #92400e;
}

.menu__icon--sky {
  background: #e3f2fd;
  color: #00639a;
}

.menu__title {
  font-size: 15px;
}

.menu__desc {
  font-size: 12px;
  line-height: 17px;
  color: #737783;
}

/* Feed */
.feed {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feed__item {
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.feed__item--amber {
  border-color: #f3d98a;
  background: #fffbea;
}

.feed__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feed__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.feed__tag ion-icon {
  font-size: 14px;
}

.feed__tag--blue {
  background: #d9e2ff;
  color: #003178;
}

.feed__tag--amber {
  background: #ffe9b8;
  color: #7a3e00;
}

.feed__time {
  font-size: 12px;
  color: #737783;
}

.feed__title {
  margin-top: 10px !important;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
}

.feed__desc {
  margin-top: 8px !important;
  font-size: 12px;
  line-height: 18px;
  color: #737783;
}

/* Administrasi */
.admin {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.admin__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 12px;
  background: #e6e8ea;
  font-size: 24px;
  color: #003178;
}

.admin__title {
  display: block;
  font-size: 15px;
}

.admin__desc {
  font-size: 12px;
  color: #737783;
}

/* Tombol melayang */
.fab {
  margin: 0 16px 16px 0;
}

.fab__btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 999px;
  background: #003178 !important;
  box-shadow: 0 6px 16px rgba(0, 49, 120, 0.35);
  font-size: 15px;
  font-weight: 700;
  color: #fff !important;
}

.fab__btn ion-icon {
  font-size: 24px;
}
</style>