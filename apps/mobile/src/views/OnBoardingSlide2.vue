<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <!-- Header Top Bar -->
        <header class="bar">
          <div class="brand">
            <span class="brand__logo">
              <ion-icon :icon="ribbon" />
            </span>
            <div class="brand__text">
              <strong>SIKARYA</strong>
              <span>DIKDA SULUT</span>
            </div>
          </div>

          <button type="button" class="btn-skip" @click="lewatiOnboarding">
            Lewati
          </button>
        </header>

        <main class="main">

          <!-- Step Pill Badge -->
          <div class="step-pill">
            <ion-icon :icon="checkmarkCircle" />
            <span>Langkah 2 dari 3 • Kurasi &amp; Validasi</span>
          </div>

          <!-- Kartu Ilustrasi Mockup Unggah & Pembimbing -->
          <section class="illustration-card" aria-hidden="true">
            <!-- Baris Format Berkas & Enkripsi -->
            <div class="format-row">
              <div class="format-badge format-badge--blue">
                <strong>MP4</strong>
                <span>VIDEO</span>
              </div>

              <div class="format-badge format-badge--teal">
                <strong>PDF</strong>
                <span>NASKAH</span>
              </div>

              <div class="format-badge format-badge--gray">
                <strong>ZIP</strong>
                <span>DATA</span>
              </div>

              <div class="ssl-pill">
                <ion-icon :icon="cloudDone" />
                <span>Enkripsi<br />SSL</span>
              </div>
            </div>

            <!-- Kartu Profil Pembimbing di dalam Mockup -->
            <div class="mentor-preview">
              <span class="mentor-preview__avatar">
                <ion-icon :icon="personCircleOutline" />
              </span>

              <div class="mentor-preview__info">
                <strong>Drs. Jan Warouw, M.Pd</strong>
                <small>Guru Pembimbing • SMAN 1</small>
              </div>

              <div class="mentor-preview__status">
                <ion-icon :icon="checkmarkCircle" class="verified-icon" />
                <span class="nuptk-pill">NUPTK Sah</span>
              </div>
            </div>
          </section>

          <!-- Judul & Deskripsi Utama -->
          <section class="hero-copy">
            <h1>Unggah Karya Praktis Bersama Pembimbing</h1>
            <p>
              Kirim video sinopsis, naskah inovasi, dan portofolio dengan supervisi guru Anda.
              Berkas otomatis terverifikasi sebelum masuk ke meja dewan juri Dikda Sulut.
            </p>
          </section>

          <!-- Daftar Fitur Unggulan -->
          <section class="feature-list">
            <div class="feature-item">
              <span class="feature-item__icon">
                <ion-icon :icon="shieldCheckmarkOutline" />
              </span>
              <div class="feature-item__text">
                <strong>Validasi Otomatis Pra-Submit</strong>
                <p>
                  Mencegah kesalahan format berkas, kuota file, atau legalitas yang tidak lengkap.
                </p>
              </div>
            </div>

            <div class="feature-item">
              <span class="feature-item__icon">
                <ion-icon :icon="laptopOutline" />
              </span>
              <div class="feature-item__text">
                <strong>Status &amp; Catatan Revisi Real-Time</strong>
                <p>
                  Dapatkan arahan perbaikan langsung dari pembimbing via notifikasi sistem.
                </p>
              </div>
            </div>
          </section>

          <!-- Indikator Slide / Pagination Dots -->
          <div class="slide-dots" role="tablist" aria-label="Indikator Slide">
            <span class="dot"></span>
            <span class="dot dot--active" aria-current="true"></span>
            <span class="dot"></span>
          </div>

          <!-- Tombol Navigasi Slide -->
          <div class="nav-actions">
            <button type="button" class="btn-next" @click="lanjutSlide">
              <span>Lanjut (2/3)</span>
              <ion-icon :icon="arrowForward" />
            </button>

            <button type="button" class="btn-prev" @click="kembaliSlide">
              <ion-icon :icon="arrowBack" />
              <span>Kembali ke Slide 1</span>
            </button>
          </div>

          <!-- Catatan Keamanan Footer -->
          <footer class="security-footer">
            <ion-icon :icon="lockClosed" />
            <span>Data karya terlindungi enkripsi kedinasan Dikda Sulut</span>
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  ribbon,
  checkmarkCircle,
  cloudDone,
  personCircleOutline,
  shieldCheckmarkOutline,
  laptopOutline,
  arrowForward,
  arrowBack,
  lockClosed
} from 'ionicons/icons';

const router = useRouter();

function lewatiOnboarding() {
  router.push('/beranda');
}

function lanjutSlide() {
  router.push('/onboarding-3');
}

function kembaliSlide() {
  router.back();
}
</script>

<style scoped>
.peserta-content {
  --background: #f7f9fb;
}

.page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
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
}

h1,
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
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 16px 10px;
  background: transparent;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__logo {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #dce7ff 0%, #bfd6ff 100%);
  color: #003178;
  box-shadow: 0 2px 5px rgba(0, 49, 120, 0.12);
}

.brand__logo ion-icon {
  font-size: 20px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 14px;
  line-height: 18px;
  font-weight: 800;
  color: #003178;
  letter-spacing: 0.2px;
}

.brand__text span {
  font-size: 9.5px;
  line-height: 13px;
  font-weight: 700;
  color: #606572;
  letter-spacing: 0.4px;
}

.btn-skip {
  padding: 6px 8px;
  font-size: 13px;
  font-weight: 700;
  color: #50545d;
}

/* ---------- Main Container ---------- */

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 6px 18px calc(env(safe-area-inset-bottom, 0px) + 22px);
}

/* ---------- Step Pill ---------- */

.step-pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e6effd;
  border: 1px solid #cde0fc;
  color: #003178;
  font-size: 11.5px;
  font-weight: 700;
}

.step-pill ion-icon {
  font-size: 15px;
  color: #003178;
}

/* ---------- Illustration Mockup Card ---------- */

.illustration-card {
  position: relative;
  padding: 14px 14px 0;
  border-radius: 20px;
  background: linear-gradient(180deg, #eef3fa 0%, #f4f7fc 100%);
  border: 1px solid #dde3ee;
  box-shadow: 0 4px 14px rgba(0, 49, 120, 0.06);
  overflow: hidden;
}

.format-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 1.25fr;
  gap: 7px;
  align-items: center;
  margin-bottom: 14px;
}

.format-badge {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7px 8px;
  border-radius: 9px;
  line-height: 1.2;
}

.format-badge strong {
  font-size: 11px;
  font-weight: 800;
}

.format-badge span {
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  opacity: 0.9;
}

.format-badge--blue {
  background: #1d4ed8;
  color: #fff;
}

.format-badge--teal {
  background: #005b8f;
  color: #fff;
}

.format-badge--gray {
  background: #e5e9f0;
  color: #50545d;
}

.ssl-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 9px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #dfe5f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  font-size: 9px;
  font-weight: 800;
  line-height: 11px;
  color: #191c1e;
}

.ssl-pill ion-icon {
  font-size: 15px;
  color: #0b4fa6;
}

/* Mentor Preview Inside Card */

.mentor-preview {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px 14px;
  border-radius: 16px 16px 0 0;
  background: #fff;
  border: 1px solid #e2e7f0;
  border-bottom: 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
}

.mentor-preview__avatar {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #e3eeff;
  color: #0b4fa6;
}

.mentor-preview__avatar ion-icon {
  font-size: 22px;
}

.mentor-preview__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.mentor-preview__info strong {
  font-size: 12.5px;
  font-weight: 800;
  line-height: 17px;
  color: #191c1e;
}

.mentor-preview__info small {
  font-size: 10.5px;
  color: #606572;
}

.mentor-preview__status {
  display: flex;
  align-items: center;
  gap: 5px;
  flex: none;
}

.verified-icon {
  font-size: 17px;
  color: #003178;
}

.nuptk-pill {
  padding: 3px 8px;
  border-radius: 999px;
  background: #d9f4e4;
  color: #0b5f3a;
  font-size: 10px;
  font-weight: 800;
}

/* ---------- Hero Copy ---------- */

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 2px;
}

.hero-copy h1 {
  font-size: 23px;
  line-height: 30px;
  font-weight: 800;
  color: #003178;
  letter-spacing: -0.3px;
}

.hero-copy p {
  font-size: 13px;
  line-height: 20px;
  color: #50545d;
}

/* ---------- Feature List ---------- */

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 14px;
  border-radius: 14px;
  background: #eef2f7;
  border: 1px solid #e1e6ef;
}

.feature-item__icon {
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fff;
  color: #003178;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.feature-item__icon ion-icon {
  font-size: 18px;
}

.feature-item__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.feature-item__text strong {
  font-size: 13px;
  font-weight: 800;
  color: #191c1e;
}

.feature-item__text p {
  font-size: 11.5px;
  line-height: 16px;
  color: #50545d;
}

/* ---------- Slide Indicator Dots ---------- */

.slide-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 2px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #cfd5e1;
  transition: all 0.2s ease;
}

.dot--active {
  width: 24px;
  background: #003178;
}

/* ---------- Navigation Actions ---------- */

.nav-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.btn-next {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  border-radius: 14px;
  background: #003178;
  color: #fff;
  font-size: 14.5px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 49, 120, 0.25);
}

.btn-next ion-icon {
  font-size: 19px;
}

.btn-prev {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  color: #50545d;
}

.btn-prev ion-icon {
  font-size: 16px;
}

/* ---------- Security Footer ---------- */

.security-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #606572;
  text-align: center;
}

.security-footer ion-icon {
  font-size: 13px;
  color: #003178;
}
</style>