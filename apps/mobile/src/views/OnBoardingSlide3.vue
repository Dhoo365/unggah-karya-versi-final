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

          <span class="badge-last-step">
            <ion-icon :icon="checkmarkCircleOutline" />
            <span>Langkah Terakhir</span>
          </span>
        </header>

        <main class="main">

          <!-- Kartu Ilustrasi Sertifikat & Skor Juri -->
          <section class="illustration-card" aria-hidden="true">
            <div class="illustration-card__top">
              <span class="bsre-label">
                <ion-icon :icon="shieldCheckmark" />
                <span>BSrE • BSSN Tersertifikasi</span>
              </span>
              <span class="sk-num">SK No. 420/Dikda/IX/24</span>
            </div>

            <!-- Kartu Piagam Penghargaan -->
            <div class="cert-preview">
              <div class="cert-preview__head">
                <span class="medal-tile">
                  <ion-icon :icon="medalOutline" />
                </span>

                <div class="cert-preview__title">
                  <small>PIAGAM PENGHARGAAN RESMI</small>
                  <strong>Juara 1 FLS2N Tingkat Provinsi</strong>
                </div>

                <span class="ribbon-seal">
                  <ion-icon :icon="ribbonOutline" />
                </span>
              </div>

              <!-- Box Skor Juri -->
              <div class="score-box">
                <span class="score-box__icon">
                  <ion-icon :icon="checkboxOutline" />
                </span>

                <div class="score-box__text">
                  <strong>Skor Juri: 94.5 <small>/100</small></strong>
                  <span>3 Kurator Independen Disahkan</span>
                </div>

                <span class="pill-valid">
                  LOLOS<br />VALIDASI
                </span>
              </div>
            </div>
          </section>

          <!-- Step Pill Badge -->
          <div class="step-pill">
            <span class="dot-navy"></span>
            <span>Langkah 3 dari 3 • Prestasi &amp; Pengakuan</span>
          </div>

          <!-- Judul & Deskripsi Utama -->
          <section class="hero-copy">
            <h1>Penilaian Adil &amp; Sertifikat Resmi Ber-Barcode</h1>
            <p>
              Dapatkan evaluasi langsung dari dewan juri kurator kredibel serta e-sertifikat
              bertanda tangan elektronik sah untuk portofolio dan seleksi prestasi.
            </p>
          </section>

          <!-- 2 Kartu Fitur Bersebelahan -->
          <section class="feature-grid">
            <div class="feature-card">
              <span class="feature-card__icon feature-card__icon--blue">
                <ion-icon :icon="listOutline" />
              </span>
              <strong>Rubrik Skor Terbuka</strong>
              <p>Ulasan poin juri obyektif &amp; dapat diaudit.</p>
            </div>

            <div class="feature-card">
              <span class="feature-card__icon feature-card__icon--amber">
                <ion-icon :icon="shieldCheckmark" />
              </span>
              <strong>Sah TTE Kedinasan</strong>
              <p>Barcode QR resmi pengakuan Dikda Sulut.</p>
            </div>
          </section>

          <!-- Indikator Slide / Pagination Dots -->
          <div class="slide-dots" role="tablist" aria-label="Indikator Slide">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot dot--active" aria-current="true"></span>
          </div>

          <!-- Tombol Aksi CTA -->
          <div class="nav-actions">
            <button type="button" class="btn-primary" @click="daftarAkun">
              <span>Mulai Sekarang / Daftar Akun</span>
              <ion-icon :icon="arrowForward" />
            </button>

            <button type="button" class="btn-outline" @click="masukPortal">
              <ion-icon :icon="logInOutline" />
              <span>Sudah Punya Akun? Masuk Portal</span>
            </button>

            <button type="button" class="btn-guest" @click="masukTamu">
              Masuk sebagai Tamu / Cek Juknis Lomba
            </button>
          </div>

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
  checkmarkCircleOutline,
  shieldCheckmark,
  medalOutline,
  ribbonOutline,
  checkboxOutline,
  listOutline,
  arrowForward,
  logInOutline
} from 'ionicons/icons';

const router = useRouter();

function daftarAkun() {
  router.push('/register');
}

function masukPortal() {
  router.push('/login');
}

function masukTamu() {
  router.push('/beranda');
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

.badge-last-step {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 11px;
  border-radius: 999px;
  background: #dce8fc;
  color: #003178;
  font-size: 11px;
  font-weight: 700;
}

.badge-last-step ion-icon {
  font-size: 15px;
  color: #003178;
}

/* ---------- Main Container ---------- */

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 6px 18px calc(env(safe-area-inset-bottom, 0px) + 22px);
}

/* ---------- Illustration Mockup Card ---------- */

.illustration-card {
  padding: 14px;
  border-radius: 20px;
  background: linear-gradient(180deg, #edf3fb 0%, #f6f8fc 100%);
  border: 1px solid #dde3ee;
  box-shadow: 0 4px 14px rgba(0, 49, 120, 0.06);
}

.illustration-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.bsre-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  font-weight: 800;
  color: #003178;
}

.bsre-label ion-icon {
  font-size: 14px;
  color: #003178;
}

.sk-num {
  font-size: 9.5px;
  font-weight: 600;
  color: #606572;
}

/* Certificate Preview Card */

.cert-preview {
  padding: 12px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #e2e7f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cert-preview__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.medal-tile {
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #fef5df;
  border: 1px solid #f7e1a8;
  color: #9a6700;
}

.medal-tile ion-icon {
  font-size: 18px;
}

.cert-preview__title {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.cert-preview__title small {
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: #9a6700;
}

.cert-preview__title strong {
  font-size: 12.5px;
  font-weight: 800;
  line-height: 17px;
  color: #191c1e;
}

.ribbon-seal {
  width: 26px;
  height: 26px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fce8b2;
  color: #8a5a00;
}

.ribbon-seal ion-icon {
  font-size: 14px;
}

/* Score Box inside Certificate */

.score-box {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 10px;
  border-radius: 12px;
  background: #f4f6fa;
  border: 1px solid #e5e9f2;
}

.score-box__icon {
  width: 32px;
  height: 32px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #003178;
  color: #fff;
}

.score-box__icon ion-icon {
  font-size: 17px;
}

.score-box__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.score-box__text strong {
  font-size: 12px;
  font-weight: 800;
  color: #003178;
}

.score-box__text strong small {
  font-size: 10.5px;
  font-weight: 600;
  color: #606572;
}

.score-box__text span {
  font-size: 9.5px;
  line-height: 13px;
  color: #50545d;
}

.pill-valid {
  flex: none;
  padding: 4px 10px;
  border-radius: 12px;
  background: #d5e5ff;
  color: #003178;
  font-size: 8.5px;
  font-weight: 800;
  line-height: 11px;
  text-align: center;
}

/* ---------- Step Pill ---------- */

.step-pill {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border-radius: 999px;
  background: #e3ecfc;
  color: #003178;
  font-size: 11px;
  font-weight: 700;
}

.dot-navy {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #003178;
}

/* ---------- Hero Copy ---------- */

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero-copy h1 {
  font-size: 22px;
  line-height: 29px;
  font-weight: 800;
  color: #191c1e;
  letter-spacing: -0.3px;
}

.hero-copy p {
  font-size: 12.5px;
  line-height: 19px;
  color: #50545d;
}

/* ---------- 2 Feature Cards ---------- */

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  padding: 13px 12px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe4ee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
}

.feature-card__icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
}

.feature-card__icon ion-icon {
  font-size: 18px;
}

.feature-card__icon--blue {
  background: #dce8fc;
  color: #003178;
}

.feature-card__icon--amber {
  background: #fce8b2;
  color: #8a5a00;
}

.feature-card strong {
  font-size: 12.5px;
  font-weight: 800;
  line-height: 17px;
  color: #191c1e;
  margin-bottom: 4px;
}

.feature-card p {
  font-size: 11px;
  line-height: 15px;
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
  gap: 10px;
  margin-top: auto;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  border-radius: 14px;
  background: #003178;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 49, 120, 0.25);
}

.btn-primary ion-icon {
  font-size: 19px;
}

.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  border-radius: 14px;
  background: #fff;
  border: 1.5px solid #003178;
  color: #003178;
  font-size: 13.5px;
  font-weight: 800;
}

.btn-outline ion-icon {
  font-size: 19px;
}

.btn-guest {
  margin-top: 2px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #50545d;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>