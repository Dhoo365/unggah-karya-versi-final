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
            <div class="brand__logo-text">
              <span class="brand__icon-badge"><ion-icon :icon="ribbonOutline" /></span>
              <strong>SIKARYA Dikda Sulut</strong>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Kartu Profil Pengguna -->
          <section class="profile-hero">
            <div class="profile-hero__avatar-wrap">
              <div class="profile-hero__avatar">KP</div>
              <span class="profile-hero__status-dot"></span>
            </div>

            <div class="badge-dapodik">
              <ion-icon :icon="checkmarkCircle" />
              Siswa Terdaftar Dapodik
            </div>

            <h2>Kevin Pangkey</h2>
            <p class="profile-hero__school">
              <ion-icon :icon="schoolOutline" />
              SMP Negeri 1 Manado
            </p>
            <p class="profile-hero__nisn">
              NISN: <strong>0064821901</strong> • NIK: 717104******0002
            </p>
            <span class="profile-hero__chip">Kelas IX-A • Jalur Prestasi</span>

            <!-- Statistik Singkat -->
            <div class="profile-stats">
              <div class="stat-box">
                <strong>3</strong>
                <small>Prestasi Kota Terverifikasi</small>
              </div>
              <div class="stat-box">
                <strong>2</strong>
                <small>Karya Diajukan</small>
              </div>
              <div class="stat-box">
                <strong>1</strong>
                <small>Lomba Sedang Diikuti</small>
              </div>
            </div>
          </section>

          <!-- 1. Akun & Biodata -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="personOutline" />
                Akun &amp; Biodata
              </h3>
              <span class="sync-status">
                <ion-icon :icon="syncOutline" />
                Tersinkron Dapodik
              </span>
            </div>

            <!-- Card Biodata Dapodik Siswa -->
            <div class="card-detail">
              <div class="card-detail__top">
                <span class="card-detail__tile">
                  <ion-icon :icon="idCardOutline" />
                </span>
                <div class="card-detail__text">
                  <div class="title-row">
                    <strong>Biodata Dapodik Siswa</strong>
                    <span class="status-pill status-pill--blue">Terkunci</span>
                  </div>
                  <small>Nama, NISN, Tempat/Tgl Lahir, Nama Ibu Kandung</small>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="chevron" />
              </div>

              <div class="card-detail__body">
                <p><strong>Tempat, Tgl Lahir:</strong> Manado, 14 Mei 2009</p>
                <p><strong>Ibu Kandung:</strong> Maria Sumampouw</p>
                <div class="verified-badge">
                  <ion-icon :icon="lockClosedOutline" />
                  Data resmi terverifikasi Pusdatin Kemendikbudristek
                </div>
              </div>
            </div>

            <!-- Card Guru Pembimbing Terhubung -->
            <div class="card-detail">
              <div class="card-detail__top">
                <span class="card-detail__tile card-detail__tile--green">
                  <ion-icon :icon="peopleOutline" />
                </span>
                <div class="card-detail__text">
                  <div class="title-row">
                    <strong>Guru Pembimbing Terhubung</strong>
                    <span class="status-pill status-pill--green">Aktif</span>
                  </div>
                  <p class="teacher-name">Dra. Johanis Runtuwene, M.Pd</p>
                  <small>NIP. 197405121999031004 • Pembimbing Prestasi SMPN 1</small>
                </div>
                <button type="button" class="chat-btn" aria-label="Chat guru">
                  <ion-icon :icon="chatbubbleEllipsesOutline" />
                </button>
              </div>
            </div>
          </section>

          <!-- 2. Portofolio & Prestasi -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="ribbonOutline" />
                Portofolio &amp; Prestasi
              </h3>
              <small class="header-sub">Disdikbud Kota Manado</small>
            </div>

            <!-- Card Sertifikat & Prestasi Terkumpul -->
            <div class="card-action" @click="bukaSertifikat">
              <div class="card-action__icon">
                <ion-icon :icon="trophyOutline" />
              </div>
              <div class="card-action__text">
                <div class="title-row">
                  <strong>Sertifikat &amp; Prestasi Terkumpul</strong>
                  <span class="count-badge">3 Piagam</span>
                </div>
                <small>Juara 1 FLS2N Seni Lukis • O2SN Renang • KSN IPA</small>
              </div>
              <ion-icon :icon="chevronForwardOutline" class="chevron" />
            </div>

            <!-- Card Cetak E-Portofolio Lengkap -->
            <div class="card-download">
              <div class="card-download__content">
                <span class="card-download__tile">
                  <ion-icon :icon="documentTextOutline" />
                </span>
                <div class="card-download__text">
                  <div class="title-row">
                    <strong>Cetak E-Portofolio Lengkap</strong>
                    <span class="bsre-badge">BSrE</span>
                  </div>
                  <p>Dokumen PDF resmi ber-barcode verifikasi Disdikbud Manado.</p>
                </div>
              </div>

              <button type="button" class="btn-primary" @click="unduhPdf">
                <ion-icon :icon="cloudDownloadOutline" />
                Unduh PDF
              </button>
            </div>
          </section>

          <!-- 3. Pusat Bantuan & Pengaturan -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="settingsOutline" />
                Pusat Bantuan &amp; Pengaturan
              </h3>
            </div>

            <div class="menu-list">
              <button type="button" class="menu-item" @click="bukaKeamanan">
                <span class="menu-item__icon"><ion-icon :icon="shieldCheckmarkOutline" /></span>
                <div class="menu-item__text">
                  <strong>Keamanan &amp; Ubah Kata Sandi</strong>
                  <small>Kata sandi akun portal siswa dan verifikasi dua faktor</small>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="chevron" />
              </button>

              <button type="button" class="menu-item" @click="bukaPusatBantuan">
                <span class="menu-item__icon"><ion-icon :icon="helpCircleOutline" /></span>
                <div class="menu-item__text">
                  <strong>Pusat Bantuan &amp; Panduan Siswa</strong>
                  <small>Tata cara pengunggahan berkas karya dan juknis lomba</small>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="chevron" />
              </button>

              <button type="button" class="menu-item" @click="hubungiAdmin">
                <span class="menu-item__icon"><ion-icon :icon="headsetOutline" /></span>
                <div class="menu-item__text">
                  <strong>Hubungi Admin / Operator Sekolah</strong>
                  <small>Layanan bantuan data Dapodik SMPN 1 Manado</small>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="chevron" />
              </button>
            </div>
          </section>

          <!-- Tombol Keluar / Logout -->
          <button type="button" class="btn-logout" @click="keluarAkun">
            <ion-icon :icon="logOutOutline" />
            Keluar dari Akun SIKARYA
          </button>

          <footer class="app-footer">
            <small>SIKARYA Dikda Sulut • Versi 2.4.1 (Build Manado-2025)</small>
          </footer>

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
          <ion-icon :icon="folder" />
        </span>
        <small>Karya Saya</small>
      </button>

      <button type="button" class="bottom-nav__item bottom-nav__item--active" aria-current="page">
        <span class="bottom-nav__pill">
          <ion-icon :icon="person" />
        </span>
        <small>Profil</small>
      </button>
    </nav>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  menuOutline,
  ribbonOutline,
  notificationsOutline,
  checkmarkCircle,
  schoolOutline,
  personOutline,
  syncOutline,
  idCardOutline,
  chevronForwardOutline,
  lockClosedOutline,
  peopleOutline,
  chatbubbleEllipsesOutline,
  trophyOutline,
  documentTextOutline,
  cloudDownloadOutline,
  settingsOutline,
  shieldCheckmarkOutline,
  helpCircleOutline,
  headsetOutline,
  logOutOutline,
  cloudUploadOutline,
  folder,
  person
} from 'ionicons/icons';

const router = useRouter();

function bukaSertifikat() {
  console.log('Buka daftar sertifikat & prestasi');
}

function unduhPdf() {
  console.log('Unduh E-Portofolio PDF');
}

function bukaKeamanan() {
  console.log('Pengaturan keamanan & kata sandi');
}

function bukaPusatBantuan() {
  console.log('Buka pusat bantuan & panduan');
}

function hubungiAdmin() {
  console.log('Hubungi admin / operator sekolah');
}

function keluarAkun() {
  console.log('Keluar dari akun SIKARYA');
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

.brand__logo-text {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand__icon-badge {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #dce7ff;
  color: #003178;
}

.brand__icon-badge ion-icon {
  font-size: 16px;
}

.brand__logo-text strong {
  font-size: 15px;
  font-weight: 800;
  color: #003178;
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
  gap: 16px;
  padding: 14px 14px 28px;
}

/* ---------- Profile Hero Card ---------- */

.profile-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.profile-hero__avatar-wrap {
  position: relative;
  margin-bottom: 10px;
}

.profile-hero__avatar {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: linear-gradient(135deg, #002256 0%, #0b4fa6 100%);
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(11, 79, 166, 0.25);
}

.profile-hero__status-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #10b981;
  border: 2px solid #fff;
}

.badge-dapodik {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  background: #d9f4e4;
  color: #0b5f3a;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 10px;
}

.badge-dapodik ion-icon {
  font-size: 14px;
  color: #0b5f3a;
}

.profile-hero h2 {
  font-size: 18px;
  font-weight: 800;
  color: #191c1e;
  margin-bottom: 3px;
}

.profile-hero__school {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  font-weight: 700;
  color: #0b4fa6;
  margin-bottom: 4px;
}

.profile-hero__school ion-icon {
  font-size: 15px;
}

.profile-hero__nisn {
  font-size: 11.5px;
  color: #50545d;
  margin-bottom: 8px;
}

.profile-hero__chip {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  background: #f0f4f8;
  color: #3d4452;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 16px;
}

/* Statistik dalam profil */
.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
  padding-top: 14px;
  border-top: 1px solid #eef0f4;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  border-radius: 10px;
  background: #f7f9fb;
  border: 1px solid #e2e7ef;
}

.stat-box strong {
  font-size: 16px;
  font-weight: 800;
  color: #003178;
  margin-bottom: 2px;
}

.stat-box small {
  font-size: 10px;
  line-height: 13px;
  color: #50545d;
  text-align: center;
}

/* ---------- Section Groups ---------- */

.section-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}

.section-header h3 {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 800;
  color: #003178;
}

.section-header h3 ion-icon {
  font-size: 18px;
}

.sync-status,
.header-sub {
  font-size: 11.5px;
  font-weight: 700;
  color: #0b4fa6;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.sync-status ion-icon {
  font-size: 14px;
}

/* ---------- Cards Styling ---------- */

.card-detail,
.card-action,
.card-download {
  padding: 14px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.card-detail__top,
.card-action {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-action {
  cursor: pointer;
  transition: background 0.15s ease;
}

.card-action:hover {
  background: #fafbfc;
}

.card-detail__tile {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #e8f1fd;
  color: #0b4fa6;
}

.card-detail__tile--green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.card-action__icon {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fff3cd;
  color: #8a5a00;
  font-size: 20px;
}

.card-detail__text,
.card-action__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}

.title-row strong {
  font-size: 13px;
  font-weight: 700;
  color: #191c1e;
}

.card-detail__text small,
.card-action__text small {
  color: #50545d;
  font-size: 11px;
}

.teacher-name {
  font-size: 12.5px;
  font-weight: 700;
  color: #191c1e;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 700;
}

.status-pill--blue {
  background: #dce7ff;
  color: #003178;
}

.status-pill--green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.count-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  background: #fff3cd;
  color: #8a5a00;
  font-size: 10.5px;
  font-weight: 800;
}

.chevron {
  font-size: 18px;
  color: #747985;
  flex: none;
}

.chat-btn {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eef5ff;
  color: #0b4fa6;
}

.chat-btn ion-icon {
  font-size: 18px;
}

/* Card Detail Expanded Body */
.card-detail__body {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eceef2;
  font-size: 11.5px;
  color: #3d4452;
}

.card-detail__body p + p {
  margin-top: 3px;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f0f4f8;
  color: #50545d;
  font-size: 10.5px;
  font-weight: 600;
}

.verified-badge ion-icon {
  font-size: 13px;
  color: #0b4fa6;
}

/* Card Download E-Portofolio */
.card-download {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, #f7faff 0%, #eef5ff 100%);
  border: 1px solid #c5dbf8;
}

.card-download__content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-download__tile {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #003178;
  color: #fff;
  font-size: 20px;
}

.card-download__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.bsre-badge {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  background: #0b4fa6;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.card-download__text p {
  font-size: 11.5px;
  color: #3d4452;
  line-height: 15px;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  border-radius: 10px;
  background: #0b4fa6;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(11, 79, 166, 0.2);
}

.btn-primary ion-icon {
  font-size: 18px;
}

/* ---------- Menu List (Bantuan & Pengaturan) ---------- */

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.menu-item__icon {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #eef0f4;
  color: #3d4452;
  font-size: 18px;
}

.menu-item__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  text-align: left;
}

.menu-item__text strong {
  font-size: 12.5px;
  font-weight: 700;
  color: #191c1e;
  margin-bottom: 2px;
}

.menu-item__text small {
  color: #50545d;
  font-size: 11px;
}

/* ---------- Tombol Logout / Keluar ---------- */

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #f7c6c6;
  color: #ba1a1a;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(186, 26, 26, 0.05);
}

.btn-logout ion-icon {
  font-size: 20px;
}

.app-footer {
  text-align: center;
  padding: 4px 0;
}

.app-footer small {
  color: #747985;
  font-size: 10.5px;
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