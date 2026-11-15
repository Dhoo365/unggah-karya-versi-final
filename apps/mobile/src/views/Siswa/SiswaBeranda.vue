<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <!-- Header -->
        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Menu">
              <ion-icon :icon="menuOutline" />
            </button>
            <div class="brand__text">
              <strong>SIKARYA Dikda Sulut</strong>
              <span class="brand__sub">
                <span class="dot-amber"></span>
                Pemerintah Provinsi Sulawesi Utara
              </span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn icon-btn--notif" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <span class="notif-dot"></span>
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Portal Info Banner -->
          <section class="portal-card">
            <span class="portal-card__icon">
              <ion-icon :icon="ribbonOutline" />
            </span>
            <div class="portal-card__text">
              <strong>Portal Kurasi Talenta Prestasi Pelajar</strong>
              <small>Dinas Pendidikan Daerah Provinsi Sulut</small>
            </div>
            <span class="portal-card__year">Tahun<br />2025</span>
          </section>

          <!-- Hero Banner FLS2N -->
          <section class="hero-card">
            <div class="hero-card__top">
              <span class="hero-badge-left">
                <ion-icon :icon="trophyOutline" />
                FLS2N Sulut 2025
              </span>
              <span class="hero-badge-right">
                <ion-icon :icon="timeOutline" />
                Sisa 12 Hari
              </span>
            </div>

            <h1>Festival &amp; Lomba Seni Siswa Nasional</h1>
            <p class="hero-card__sub">
              Tingkat Provinsi Sulawesi Utara • Ajang Seleksi Bakat Menuju Nasional
            </p>

            <!-- Countdown Timer -->
            <div class="countdown-grid">
              <div class="cd-box">
                <strong>12</strong>
                <span>HARI</span>
              </div>
              <div class="cd-box">
                <strong>18</strong>
                <span>JAM</span>
              </div>
              <div class="cd-box">
                <strong>42</strong>
                <span>MENIT</span>
              </div>
              <div class="cd-box">
                <strong>09</strong>
                <span>DETIK</span>
              </div>
            </div>

            <!-- Hero Actions -->
            <button type="button" class="btn-hero-gold" @click="daftarSekarang">
              <span>Daftar Sekarang</span>
              <ion-icon :icon="arrowForward" />
            </button>

            <button type="button" class="btn-hero-glass" @click="unduhJuknis">
              <ion-icon :icon="cloudDownloadOutline" />
              <span>Unduh Juknis Resmi</span>
            </button>
          </section>

          <!-- Kategori Jenjang -->
          <section class="section-group">
            <div class="section-header">
              <h2>Kategori Jenjang</h2>
              <button type="button" class="link-btn" @click="lihatSyarat">Lihat Syarat</button>
            </div>

            <div class="jenjang-scroll" role="tablist" aria-label="Filter Jenjang">
              <button
                v-for="j in daftarJenjang"
                :key="j.id"
                type="button"
                role="tab"
                class="jenjang-chip"
                :class="{ 'jenjang-chip--active': jenjangAktif === j.id }"
                :aria-selected="jenjangAktif === j.id"
                @click="jenjangAktif = j.id"
              >
                <ion-icon v-if="jenjangAktif === j.id" :icon="checkmark" />
                <span>{{ j.label }}</span>
              </button>
            </div>

            <!-- 3 Mini Stat Cards -->
            <div class="stats-grid">
              <div class="stat-card">
                <small class="stat-card__label">Lomba Aktif</small>
                <div class="stat-card__val">
                  <strong>18</strong> <span>Cabang</span>
                </div>
              </div>

              <div class="stat-card">
                <small class="stat-card__label">Kab/Kota Terdaftar</small>
                <div class="stat-card__val">
                  <strong>15</strong> <span>Wilayah</span>
                </div>
              </div>

              <div class="stat-card">
                <small class="stat-card__label">Total Peserta</small>
                <div class="stat-card__val">
                  <strong>1.240</strong> <span>Karya</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Kategori Lomba Aktif -->
          <section class="section-group">
            <div class="section-header section-header--align-start">
              <div>
                <h2>Kategori Lomba Aktif</h2>
                <p class="section-sub">Pilih cabang kejuaraan dan unggah berkas karya siswa</p>
              </div>
              <button type="button" class="filter-icon-btn" aria-label="Filter Lomba">
                <ion-icon :icon="optionsOutline" />
              </button>
            </div>

            <div class="comp-list">
              <article v-for="lomba in daftarLomba" :key="lomba.id" class="comp-card">
                <div class="comp-card__top">
                  <div class="comp-card__tags">
                    <span class="tag-jenjang" :class="`tag-jenjang--${lomba.tagColor}`">
                      {{ lomba.jenjangTag }}
                    </span>
                    <small class="comp-card__bidang">{{ lomba.bidang }}</small>
                  </div>

                  <span class="status-buka">
                    <span class="dot-green"></span>
                    Buka
                  </span>
                </div>

                <div class="comp-card__body">
                  <span class="comp-card__tile">
                    <ion-icon :icon="lomba.icon" />
                  </span>
                  <div class="comp-card__info">
                    <h3>{{ lomba.judul }}</h3>
                    <p>{{ lomba.deskripsi }}</p>
                  </div>
                </div>

                <div class="comp-card__meta">
                  <span class="meta-item">
                    <ion-icon :icon="calendarOutline" />
                    Tenggat: <strong>{{ lomba.tenggat }}</strong>
                  </span>
                  <span class="meta-item">
                    <ion-icon :icon="peopleOutline" />
                    Kuota: <strong>{{ lomba.kuota }}</strong>
                  </span>
                </div>

                <div class="comp-card__footer">
                  <button type="button" class="btn-juknis" @click="bukaJuknis(lomba)">
                    <ion-icon :icon="bookOutline" />
                    <span>Pedoman Juknis</span>
                  </button>

                  <button type="button" class="btn-detail" @click="detailKirim(lomba)">
                    <span>Detail &amp; Kirim</span>
                    <ion-icon :icon="chevronForwardOutline" />
                  </button>
                </div>
              </article>
            </div>
          </section>

          <!-- Banner Butuh Panduan Pendaftaran -->
          <section class="help-card">
            <span class="help-card__icon">
              <ion-icon :icon="helpCircleOutline" />
            </span>
            <div class="help-card__text">
              <strong>Butuh Panduan Pendaftaran?</strong>
              <small>Hubungi Helpdesk Teknis Dinas Dikda Sulut</small>
            </div>
            <button type="button" class="btn-help" @click="router.push('/bantuan')">
              Bantuan
            </button>
          </section>

        </main>
      </div>
    </ion-content>

    <!-- Bottom Tab Navigation -->
    <nav class="bottom-nav" aria-label="Navigasi Utama">
      <button type="button" class="bottom-nav__item" @click="router.push('/unggah-karya')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="cloudUploadOutline" />
        </span>
        <small>Unggah Karya</small>
      </button>

      <button type="button" class="bottom-nav__item" @click="router.push('/karya-saya')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="folderOutline" />
        </span>
        <small>Karya Saya</small>
      </button>

      <button type="button" class="bottom-nav__item" @click="router.push('/profil')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="personOutline" />
        </span>
        <small>Profil</small>
      </button>
    </nav>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  menuOutline,
  notificationsOutline,
  ribbonOutline,
  trophyOutline,
  timeOutline,
  arrowForward,
  cloudDownloadOutline,
  checkmark,
  optionsOutline,
  desktopOutline,
  happyOutline,
  fitnessOutline,
  flaskOutline,
  calendarOutline,
  peopleOutline,
  bookOutline,
  chevronForwardOutline,
  helpCircleOutline,
  cloudUploadOutline,
  folderOutline,
  personOutline
} from 'ionicons/icons';

const router = useRouter();
const jenjangAktif = ref('semua');

const daftarJenjang = [
  { id: 'semua', label: 'Semua Jenjang' },
  { id: 'sma', label: 'SMA' },
  { id: 'smk', label: 'SMK' },
  { id: 'slb', label: 'SLB' }
];

interface LombaItem {
  id: string;
  jenjangTag: string;
  tagColor: 'blue' | 'amber' | 'cyan' | 'indigo';
  bidang: string;
  icon: string;
  judul: string;
  deskripsi: string;
  tenggat: string;
  kuota: string;
}

const daftarLomba: LombaItem[] = [
  {
    id: 'lks',
    jenjangTag: 'SMK',
    tagColor: 'blue',
    bidang: 'Bidang Vokasi & Keahlian',
    icon: desktopOutline,
    judul: 'LKS SMK Kejuruan (Teknologi & Desain)',
    deskripsi: 'Desain Web Komersial, Cloud Computing, da...',
    tenggat: '15 Juli 2025',
    kuota: '3 Peserta/Sekolah'
  },
  {
    id: 'fls2n',
    jenjangTag: 'SMA / SMK',
    tagColor: 'amber',
    bidang: 'Kearifan Lokal Sulut',
    icon: happyOutline,
    judul: 'FLS2N: Tari Kreasi Daerah & Seni Monolog',
    deskripsi: 'Eksplorasi cerita rakyat Minahasa, Bolaang...',
    tenggat: '20 Juli 2025',
    kuota: '1 Tim/Cabang'
  },
  {
    id: 'o2sn',
    jenjangTag: 'SMA / SLB',
    tagColor: 'cyan',
    bidang: 'Olahraga & Kebugaran',
    icon: fitnessOutline,
    judul: 'O2SN: Cabang Atletik & Renang Pelajar',
    deskripsi: 'Kompetisi fisik putra/putri, rekor waktu sprint...',
    tenggat: '25 Juli 2025',
    kuota: '2 Atlet/Nomor'
  },
  {
    id: 'osd',
    jenjangTag: 'SMA / MA',
    tagColor: 'indigo',
    bidang: 'Sains & Matematika',
    icon: flaskOutline,
    judul: 'Olimpiade Sains Daerah (OSD) Sulut',
    deskripsi: 'Fisika Terapan, Matematika Komputasi...',
    tenggat: '30 Juli 2025',
    kuota: 'Terbuka'
  }
];

function daftarSekarang() {
  router.push('/unggah-karya');
}

function unduhJuknis() {
  console.log('Unduh Juknis Resmi FLS2N 2025');
}

function lihatSyarat() {
  console.log('Lihat syarat kategori jenjang');
}

function bukaJuknis(lomba: LombaItem) {
  console.log('Buka pedoman juknis:', lomba.judul);
}

function detailKirim(lomba: LombaItem) {
  router.push('/unggah-karya');
}
</script>

<style scoped>
.peserta-content {
  --background: #f7f9fb;
}

.page {
  min-height: 100%;
  background: #f7f9fb;
  color: #191c1e;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

ion-icon {
  flex: none;
  font-size: 20px;
}

button {
  border: 0;
  background: none;
  padding: 0;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

h1,
h2,
h3,
p {
  margin: 0;
}

small {
  font-size: 11px;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 12px 10px;
  background: #fff;
  border-bottom: 1px solid #d7dbe5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand__text strong {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  color: #003178;
}

.brand__sub {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  line-height: 14px;
  color: #50545d;
}

.dot-amber {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e5b323;
  flex: none;
}

.icon-btn {
  position: relative;
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 22px;
}

.notif-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ba1a1a;
  border: 1.5px solid #fff;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 28px;
}

/* ---------- Portal Info Card ---------- */

.portal-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.portal-card__icon {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eef5ff;
  color: #003178;
}

.portal-card__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.portal-card__text strong {
  font-size: 12px;
  font-weight: 800;
  line-height: 16px;
  color: #003178;
}

.portal-card__text small {
  font-size: 10.5px;
  line-height: 14px;
  color: #50545d;
}

.portal-card__year {
  flex: none;
  padding: 5px 10px;
  border-radius: 8px;
  background: #dce7ff;
  color: #003178;
  font-size: 10px;
  font-weight: 800;
  line-height: 13px;
  text-align: center;
}

/* ---------- Hero Card FLS2N ---------- */

.hero-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(145deg, #002256 0%, #0b4fa6 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(0, 49, 120, 0.25);
}

.hero-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.hero-badge-left,
.hero-badge-right {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10.5px;
  font-weight: 700;
}

.hero-badge-left {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.hero-badge-right {
  background: #fff3cd;
  color: #8a5a00;
}

.hero-badge-left ion-icon,
.hero-badge-right ion-icon {
  font-size: 13px;
}

.hero-card h1 {
  font-size: 20px;
  line-height: 26px;
  font-weight: 800;
  margin-bottom: 6px;
}

.hero-card__sub {
  font-size: 11.5px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 14px;
}

/* Countdown Timer */

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.cd-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.cd-box strong {
  font-size: 17px;
  font-weight: 800;
  line-height: 22px;
}

.cd-box span {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: rgba(255, 255, 255, 0.8);
}

/* Hero Buttons */

.btn-hero-gold,
.btn-hero-glass {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
}

.btn-hero-gold {
  background: linear-gradient(135deg, #f6d060 0%, #e5b323 100%);
  color: #382600;
  margin-bottom: 8px;
  box-shadow: 0 2px 6px rgba(229, 179, 35, 0.3);
}

.btn-hero-gold ion-icon {
  font-size: 17px;
  color: #382600;
}

.btn-hero-glass {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-weight: 700;
}

.btn-hero-glass ion-icon {
  font-size: 18px;
}

/* ---------- Section Headers ---------- */

.section-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.section-header--align-start {
  align-items: flex-start;
}

.section-header h2 {
  font-size: 15px;
  font-weight: 800;
  color: #191c1e;
}

.section-sub {
  margin-top: 2px;
  font-size: 11px;
  color: #50545d;
}

.link-btn {
  font-size: 11.5px;
  font-weight: 700;
  color: #0b4fa6;
}

.filter-icon-btn {
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #eef0f4;
  color: #003178;
}

/* ---------- Jenjang Chips ---------- */

.jenjang-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.jenjang-scroll::-webkit-scrollbar {
  display: none;
}

.jenjang-chip {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #d2d7e2;
  font-size: 12px;
  font-weight: 700;
  color: #3d4452;
}

.jenjang-chip ion-icon {
  font-size: 15px;
}

.jenjang-chip--active {
  background: #003178;
  border-color: #003178;
  color: #fff;
}

/* ---------- 3 Mini Stat Cards ---------- */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat-card {
  padding: 10px 10px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #dfe2e8;
}

.stat-card__label {
  display: block;
  font-size: 10px;
  line-height: 13px;
  color: #606572;
  margin-bottom: 4px;
}

.stat-card__val {
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.stat-card__val strong {
  font-size: 16px;
  font-weight: 800;
  color: #003178;
}

.stat-card__val span {
  font-size: 10px;
  font-weight: 600;
  color: #0b4fa6;
}

/* ---------- Competition Cards ---------- */

.comp-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comp-card {
  padding: 14px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.comp-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.comp-card__tags {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.tag-jenjang {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.tag-jenjang--blue {
  background: #dce7ff;
  color: #003178;
}

.tag-jenjang--amber {
  background: #fff3cd;
  color: #8a5a00;
}

.tag-jenjang--cyan {
  background: #d8f3fc;
  color: #005b7f;
}

.tag-jenjang--indigo {
  background: #e5e7ff;
  color: #2f3590;
}

.comp-card__bidang {
  font-size: 10.5px;
  color: #606572;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-buka {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 20px;
  background: #d9f4e4;
  color: #0b5f3a;
  font-size: 10.5px;
  font-weight: 700;
  flex: none;
}

.dot-green {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.comp-card__body {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.comp-card__tile {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #eef5ff;
  color: #003178;
}

.comp-card__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.comp-card__info h3 {
  font-size: 14px;
  line-height: 19px;
  font-weight: 800;
  color: #191c1e;
  margin-bottom: 3px;
}

.comp-card__info p {
  font-size: 11px;
  line-height: 15px;
  color: #606572;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comp-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid #eef0f4;
  border-bottom: 1px solid #eef0f4;
  margin-bottom: 10px;
  font-size: 10.5px;
  color: #50545d;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.meta-item ion-icon {
  font-size: 14px;
  color: #0b4fa6;
}

.meta-item strong {
  color: #191c1e;
}

.comp-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.btn-juknis {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  font-weight: 700;
  color: #0b4fa6;
}

.btn-juknis ion-icon {
  font-size: 15px;
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  background: #003178;
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
}

.btn-detail ion-icon {
  font-size: 15px;
}

/* ---------- Help Card ---------- */

.help-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border-radius: 16px;
  background: #eef5ff;
  border: 1px solid #cfe3fb;
}

.help-card__icon {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #dce7ff;
  color: #003178;
}

.help-card__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.help-card__text strong {
  font-size: 12.5px;
  font-weight: 800;
  color: #003178;
}

.help-card__text small {
  font-size: 10.5px;
  line-height: 14px;
  color: #50545d;
}

.btn-help {
  flex: none;
  padding: 7px 12px;
  border-radius: 9px;
  background: #fff;
  border: 1px solid #aeb4c1;
  font-size: 11.5px;
  font-weight: 700;
  color: #003178;
}

/* ---------- Bottom Navigation Bar ---------- */

.bottom-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px 12px calc(env(safe-area-inset-bottom, 0px) + 8px);
  background: #fff;
  border-top: 1px solid #dfe2e8;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
}

.bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #50545d;
}

.bottom-nav__pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 30px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}

.bottom-nav__pill ion-icon {
  font-size: 20px;
}

.bottom-nav__item small {
  font-size: 11px;
  font-weight: 600;
}
</style>