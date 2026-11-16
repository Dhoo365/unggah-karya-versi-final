<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <!-- Header -->
        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <div class="brand__text">
              <strong>Hasil Lomba &amp; Prestasi</strong>
              <span>SIKARYA Dikda Sulut</span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Dokumen">
              <ion-icon :icon="documentTextOutline" />
            </button>
            <button class="icon-btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Kartu Profil Siswa -->
          <section class="profile-card">
            <div class="profile-card__head">
              <span class="profile-card__avatar">{{ inisial(siswa.nama) }}</span>
              <div class="profile-card__info">
                <strong>{{ siswa.nama }}</strong>
                <small>NISN: {{ siswa.nisn }} • {{ siswa.sekolah }}</small>
              </div>
            </div>

            <div class="profile-card__stats">
              <div class="stat-box">
                <span class="stat-box__label">Total Capaian</span>
                <div class="stat-box__val">
                  <strong>3</strong> <small>Prestasi Sah</small>
                </div>
              </div>

              <div class="stat-box">
                <span class="stat-box__label">Sebaran Wilayah</span>
                <div class="stat-box__val">
                  <strong>1 Nas.</strong> <small>• 2 Prov.</small>
                </div>
              </div>
            </div>

            <div class="profile-card__footer">
              <span>Terverifikasi TTE BSrE Dikda</span>
              <span class="badge-dapodik">
                <ion-icon :icon="checkmarkCircle" />
                Sinkron Dapodik
              </span>
            </div>
          </section>

          <!-- Filter Tab -->
          <div class="filter-tabs" role="tablist" aria-label="Filter Lomba">
            <button
              type="button"
              role="tab"
              class="filter-btn"
              :class="{ 'filter-btn--active': filterAktif === 'semua' }"
              :aria-selected="filterAktif === 'semua'"
              @click="filterAktif = 'semua'"
            >
              <ion-icon :icon="checkmark" />
              Semua Lomba
            </button>

            <button
              type="button"
              role="tab"
              class="filter-btn"
              :class="{ 'filter-btn--active': filterAktif === 'diumumkan' }"
              :aria-selected="filterAktif === 'diumumkan'"
              @click="filterAktif = 'diumumkan'"
            >
              Diumumkan <span class="filter-badge">2</span>
            </button>

            <button
              type="button"
              role="tab"
              class="filter-btn"
              :class="{ 'filter-btn--active': filterAktif === 'penjurian' }"
              :aria-selected="filterAktif === 'penjurian'"
              @click="filterAktif = 'penjurian'"
            >
              Dalam Penjurian
            </button>
          </div>

          <!-- Daftar Kartu Hasil Lomba -->
          <div class="achievement-list">

            <!-- Lomba 1: Juara 1 (Highlight Border Gold) -->
            <article class="ach-card ach-card--gold">
              <div class="ach-card__top">
                <span class="status status-amber">
                  <ion-icon :icon="ribbonOutline" />
                  Juara 1 Tingkat Provinsi
                </span>
                <small class="ach-card__meta-top">FLS2N • 2024</small>
              </div>

              <h3>FLS2N 2024 – Cipta Lagu &amp; Musikalisasi Puisi</h3>
              <p class="ach-card__desc">Bidang Seni Pertunjukan Vokasi &amp; SMA Sulawesi Utara</p>

              <div class="score-box">
                <span class="score-box__label">Nilai Akhir Dewan Juri</span>
                <strong class="score-box__val">94.8 <small>/ 100</small></strong>
              </div>

              <blockquote class="quote-box">
                <ion-icon :icon="chatboxEllipsesOutline" />
                <p>"Komposisi harmoni vokal dan penghayatan syair sangat luar biasa."</p>
              </blockquote>

              <div class="ach-card__actions">
                <button type="button" class="btn-outline" @click="lihatSk('fls2n')">
                  <ion-icon :icon="documentTextOutline" />
                  Lihat SK Pemena...
                </button>
                <button type="button" class="btn-primary-sm" @click="unduhSertifikat('fls2n')">
                  <ion-icon :icon="cloudDownloadOutline" />
                  Unduh E-Sertifikat
                </button>
              </div>
            </article>

            <!-- Lomba 2: Finalis Top 10 -->
            <article class="ach-card">
              <div class="ach-card__top">
                <span class="status status-blue">
                  <ion-icon :icon="medalOutline" />
                  Finalis Top 10 Provinsi
                </span>
                <small class="ach-card__meta-top">LKS SMK • 2024</small>
              </div>

              <h3>Lomba Desain Aplikasi Mobile Vokasi Sulut 2024</h3>
              <p class="ach-card__desc">Dinas Pendidikan Daerah Prov. Sulawesi Utara</p>

              <div class="score-box">
                <span class="score-box__label">Nilai Sidang Panelis</span>
                <strong class="score-box__val">86.5 <small>/ 100</small></strong>
              </div>

              <div class="ach-card__actions ach-card__actions--single">
                <button type="button" class="btn-light-blue" @click="unduhPartisipasi('lks')">
                  <ion-icon :icon="documentAttachOutline" />
                  Unduh Sertifikat Partisipasi (PDF)
                </button>
              </div>
            </article>

            <!-- Lomba 3: Penjurian Tahap 2 -->
            <article class="ach-card">
              <div class="ach-card__top">
                <span class="status status-amber-light">
                  <ion-icon :icon="timeOutline" />
                  Penjurian Tahap 2
                </span>
                <small class="ach-card__meta-top">OSN-R • 2025</small>
              </div>

              <h3>Olimpiade Sains &amp; Riset Maritim Sulut 2025</h3>
              <p class="ach-card__desc">Kategori: Biologi &amp; Biosfer Kelautan</p>

              <div class="schedule-box">
                <div class="schedule-box__icon">
                  <ion-icon :icon="calendarOutline" />
                </div>
                <div class="schedule-box__text">
                  <strong>Pengumuman Dijadwalkan:</strong>
                  <span>28 Februari 2025 (Pukul 14.00 WITA)</span>
                </div>
              </div>

              <div class="pending-notice">
                <ion-icon :icon="hourglassOutline" />
                <span>Hasil dan sertifikat belum dirilis dewan juri</span>
              </div>
            </article>

          </div>

          <!-- Banner SNBP & Beasiswa -->
          <section class="snbp-banner">
            <div class="snbp-banner__icon">
              <ion-icon :icon="schoolOutline" />
            </div>

            <div class="snbp-banner__text">
              <strong>Kebutuhan SNBP &amp; Beasiswa</strong>
              <p>
                Seluruh sertifikat telah dibubuhi QR Code Verifikasi BSrE sah dari Dinas Pendidikan
                Daerah Provinsi Sulawesi Utara.
              </p>
            </div>
          </section>

          <!-- Tombol Cetak Portofolio -->
          <button type="button" class="btn-cta-gold" @click="cetakPortofolio">
            <ion-icon :icon="printOutline" />
            <span>Cetak Portofolio Prestasi Resmi (PDF)</span>
          </button>

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

      <button type="button" class="bottom-nav__item bottom-nav__item--active" aria-current="page">
        <span class="bottom-nav__pill">
          <ion-icon :icon="folder" />
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
  arrowBack,
  documentTextOutline,
  notificationsOutline,
  checkmarkCircle,
  checkmark,
  ribbonOutline,
  medalOutline,
  chatboxEllipsesOutline,
  cloudDownloadOutline,
  documentAttachOutline,
  timeOutline,
  calendarOutline,
  hourglassOutline,
  schoolOutline,
  printOutline,
  cloudUploadOutline,
  folder,
  personOutline
} from 'ionicons/icons';

const router = useRouter();
const filterAktif = ref<'semua' | 'diumumkan' | 'penjurian'>('semua');

const siswa = {
  nama: 'Kevin Pangkey',
  nisn: '0064821901',
  sekolah: 'SMA Negeri 1 Manado'
};

function inisial(nama: string) {
  return nama
    .split(' ')
    .map((k) => k[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function lihatSk(id: string) {
  console.log('Lihat SK:', id);
}

function unduhSertifikat(id: string) {
  console.log('Unduh Sertifikat:', id);
}

function unduhPartisipasi(id: string) {
  console.log('Unduh Partisipasi:', id);
}

function cetakPortofolio() {
  console.log('Cetak portofolio prestasi resmi (PDF)');
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

.brand__text span {
  font-size: 11px;
  line-height: 14px;
  color: #50545d;
}

.bar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 22px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 28px;
}

/* ---------- Profile Card ---------- */

.profile-card {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #002256 0%, #0b4fa6 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 49, 120, 0.2);
}

.profile-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.profile-card__avatar {
  width: 44px;
  height: 44px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.profile-card__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.profile-card__info strong {
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
}

.profile-card__info small {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
}

.profile-card__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.stat-box {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.stat-box__label {
  display: block;
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2px;
}

.stat-box__val {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-box__val strong {
  font-size: 16px;
  font-weight: 800;
}

.stat-box__val small {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
}

.profile-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
}

.badge-dapodik {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
}

.badge-dapodik ion-icon {
  font-size: 13px;
  color: #72efb2;
}

/* ---------- Filter Tabs ---------- */

.filter-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 38px;
  padding: 4px 6px;
  border-radius: 9px;
  font-size: 11.5px;
  font-weight: 700;
  color: #50545d;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.filter-btn ion-icon {
  font-size: 15px;
}

.filter-btn--active {
  background: #003178;
  color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #dce7ff;
  color: #003178;
  font-size: 9.5px;
  font-weight: 800;
}

.filter-btn--active .filter-badge {
  background: #fff;
  color: #003178;
}

/* ---------- Achievement List & Cards ---------- */

.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ach-card {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.ach-card--gold {
  border: 1.5px solid #f6d060;
  box-shadow: 0 2px 8px rgba(246, 208, 96, 0.2);
}

.ach-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.ach-card__meta-top {
  font-weight: 600;
  color: #606572;
}

.ach-card h3 {
  font-size: 15px;
  line-height: 21px;
  font-weight: 800;
  color: #191c1e;
  margin-bottom: 4px;
}

.ach-card__desc {
  font-size: 11.5px;
  line-height: 16px;
  color: #50545d;
}

/* Status Pills */

.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
}

.status ion-icon {
  font-size: 13px;
}

.status-amber {
  background: #fff3cd;
  color: #8a5a00;
}

.status-blue {
  background: #cfe3fb;
  color: #0b4fa6;
}

.status-amber-light {
  background: #fff8e1;
  color: #9c6500;
}

/* Score Box */

.score-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f4f6fa;
  border: 1px solid #e1e5ed;
}

.score-box__label {
  font-size: 11.5px;
  font-weight: 600;
  color: #50545d;
}

.score-box__val {
  font-size: 18px;
  font-weight: 800;
  color: #003178;
}

.score-box__val small {
  font-size: 11px;
  font-weight: 600;
  color: #606572;
}

/* Quote Box */

.quote-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fafbfc;
  border-left: 3px solid #0b4fa6;
}

.quote-box ion-icon {
  font-size: 16px;
  color: #0b4fa6;
  margin-top: 1px;
}

.quote-box p {
  font-size: 11.5px;
  line-height: 16px;
  font-style: italic;
  color: #3d4452;
}

/* Schedule Box */

.schedule-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff9e6;
  border: 1px solid #fce8b2;
}

.schedule-box__icon {
  width: 32px;
  height: 32px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #ffe89e;
  color: #8a5a00;
}

.schedule-box__icon ion-icon {
  font-size: 17px;
}

.schedule-box__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.schedule-box__text strong {
  font-size: 11px;
  font-weight: 700;
  color: #8a5a00;
}

.schedule-box__text span {
  font-size: 11.5px;
  font-weight: 600;
  color: #3d4452;
}

.pending-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px;
  border-radius: 8px;
  background: #f2f4f8;
  color: #606572;
  font-size: 11px;
  font-weight: 600;
}

.pending-notice ion-icon {
  font-size: 15px;
  color: #747985;
}

/* Card Actions */

.ach-card__actions {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 8px;
  margin-top: 12px;
}

.ach-card__actions--single {
  grid-template-columns: 1fr;
}

.btn-outline,
.btn-primary-sm,
.btn-light-blue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 11.5px;
  font-weight: 700;
}

.btn-outline {
  background: #fff;
  border: 1px solid #aeb4c1;
  color: #003178;
}

.btn-primary-sm {
  background: #003178;
  color: #fff;
}

.btn-light-blue {
  background: #e8f1fd;
  border: 1px solid #c5dbf8;
  color: #0b4fa6;
}

.btn-outline ion-icon,
.btn-primary-sm ion-icon,
.btn-light-blue ion-icon {
  font-size: 16px;
}

/* ---------- SNBP Banner ---------- */

.snbp-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 16px;
  background: #eef5ff;
  border: 1px solid #cfe3fb;
}

.snbp-banner__icon {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #003178;
  color: #fff;
}

.snbp-banner__icon ion-icon {
  font-size: 20px;
}

.snbp-banner__text strong {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #003178;
  margin-bottom: 3px;
}

.snbp-banner__text p {
  font-size: 11.5px;
  line-height: 17px;
  color: #3d4452;
}

/* ---------- CTA Gold Button ---------- */

.btn-cta-gold {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  padding: 0 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f6d060 0%, #e5b323 100%);
  color: #382600;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 3px 8px rgba(229, 179, 35, 0.3);
}

.btn-cta-gold ion-icon {
  font-size: 20px;
  color: #382600;
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

.bottom-nav__item--active {
  color: #003178;
}

.bottom-nav__item--active .bottom-nav__pill {
  background: #38a3f1;
  color: #fff;
}

.bottom-nav__item--active small {
  font-weight: 800;
}
</style>
```[cite: 3]