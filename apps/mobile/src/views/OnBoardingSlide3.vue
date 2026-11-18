<template>
  <ion-page>
    <ion-content :fullscreen="true" class="onb-content">
      <div class="onb">
        <header class="onb__header">
          <div class="brand">
            <svg class="brand__logo" viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 36 L20 8 L26 20 L18 36 Z" fill="#1d4f9c" />
              <path d="M18 36 L26 20 L34 36 Z" fill="#2f7be0" />
              <path d="M22 6 L32 4 L28 14 Z" fill="#f5b800" />
              <circle cx="30" cy="22" r="3" fill="#f5b800" />
            </svg>
            <div class="brand__text">
              <strong>SIKARYA</strong>
              <span>DIKDA SULUT</span>
            </div>
          </div>
          <span class="onb__last">Langkah Terakhir</span>
        </header>

        <!-- Pratinjau piagam -->
        <section class="preview">
          <div class="preview__top">
            <span class="preview__cert"><ion-icon :icon="shieldCheckmark" /> BSrE • BSSN Tersertifikasi</span>
            <span class="preview__sk">SK No. 420/Dikda/IX/24</span>
          </div>

          <div class="award">
            <div class="award__head">
              <div class="award__medal"><ion-icon :icon="ribbonOutline" /></div>
              <div class="award__text">
                <span class="award__eyebrow">Piagam Penghargaan Resmi</span>
                <b class="award__title">Juara 1 FLS2N Tingkat Provinsi</b>
              </div>
              <span class="award__seal"></span>
            </div>

            <div class="score">
              <div class="score__icon"><ion-icon :icon="clipboardOutline" /></div>
              <div class="score__text">
                <b class="score__value">Skor Juri: 94.5 <span>/100</span></b>
                <small class="score__note">3 Kurator Independen Disahkan</small>
              </div>
              <span class="score__badge">Lolos Validasi</span>
            </div>

            <div class="award__cut"></div>
          </div>
        </section>

        <section class="copy">
          <span class="step"><i class="step__dot"></i> Langkah {{ current }} dari {{ total }} • Prestasi &amp; Pengakuan</span>
          <h1 class="copy__title">Penilaian Adil &amp; Sertifikat Resmi Ber-Barcode</h1>
          <p class="copy__desc">
            Dapatkan evaluasi langsung dari dewan juri kurator kredibel serta e-sertifikat bertanda tangan elektronik sah
            untuk portofolio dan seleksi prestasi.
          </p>
        </section>

        <div class="features">
          <div v-for="f in features" :key="f.title" class="feature">
            <div class="feature__icon" :class="'feature__icon--' + f.tone"><ion-icon :icon="f.icon" /></div>
            <b class="feature__title">{{ f.title }}</b>
            <p class="feature__desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border">
      <div class="dock">
        <div class="dots" role="tablist" aria-label="Halaman pengenalan">
          <span v-for="n in total" :key="n" class="dots__item" :class="{ 'dots__item--active': n === current }" />
        </div>

        <button class="cta cta--primary" type="button" @click="register">
          Mulai Sekarang / Daftar Akun
          <ion-icon :icon="arrowForwardOutline" />
        </button>

        <button class="cta cta--outline" type="button" @click="login">
          <ion-icon :icon="logInOutline" />
          Sudah Punya Akun? Masuk Portal
        </button>

        <button class="guest" type="button" @click="guest">Masuk sebagai Tamu / Cek Juknis Lomba</button>
      </div>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonFooter, IonIcon } from '@ionic/vue';
import {
  shieldCheckmark,
  ribbonOutline,
  clipboardOutline,
  arrowForwardOutline,
  logInOutline,
  listOutline,
  qrCodeOutline,
} from 'ionicons/icons';

const router = useRouter();

const total = 3;
const current = 3;

const features = [
  { title: 'Rubrik Skor Terbuka', desc: 'Ulasan poin juri obyektif & dapat diaudit.', icon: listOutline, tone: 'blue' },
  { title: 'Sah TTE Kedinasan', desc: 'Barcode QR resmi pengakuan Dikda Sulut.', icon: qrCodeOutline, tone: 'amber' },
];

function register() {
  router.replace('/register');
}
function login() {
  router.replace('/login');
}
function guest() {
  router.replace('/juknis');
}
</script>

<style scoped>
.onb-content {
  --background: #f4f7fc;
}

.onb {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: calc(env(safe-area-inset-top, 0px) + 14px) 20px 16px;
  background: #f4f7fc;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

/* Header */
.onb__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__logo {
  width: 38px;
  height: 38px;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.brand__text strong {
  font-size: 15px;
  font-weight: 800;
  color: #0b4a8f;
}

.brand__text span {
  font-size: 11px;
  letter-spacing: 0.3px;
  color: #334155;
}

.onb__last {
  padding: 8px 18px;
  border-radius: 999px;
  background: #cfe3fb;
  font-size: 12px;
  font-weight: 700;
  color: #0b4a8f;
}

/* Pratinjau */
.preview {
  position: relative;
  height: 232px;
  padding: 16px 18px 0;
  overflow: hidden;
  border-radius: 28px;
  background: linear-gradient(180deg, #dbeafe 0%, #eaf2fc 55%, #f4f7fc 100%);
  box-shadow: 0 6px 20px rgba(29, 79, 156, 0.1);
}

.preview::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 56px;
  background: linear-gradient(180deg, rgba(244, 247, 252, 0) 0%, #f4f7fc 100%);
  pointer-events: none;
}

.preview__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #c7d6ea;
}

.preview__cert {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: #0b4a8f;
}

.preview__cert ion-icon {
  font-size: 18px;
}

.preview__sk {
  font-size: 11px;
  color: #64748b;
}

/* Kartu piagam */
.award {
  padding: 14px;
  margin-top: 16px;
  border: 1px solid #f3e2b0;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
}

.award__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.award__medal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border: 1px solid #f3d98a;
  border-radius: 12px;
  background: #f3ece4;
  font-size: 22px;
  color: #b8860b;
}

.award__text {
  flex: 1;
  min-width: 0;
}

.award__eyebrow {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #7a4f00;
}

.award__title {
  display: block;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.award__seal {
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 50%;
  background: #ffdeac;
}

.score {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f1f5f9;
}

.score__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 10px;
  background: #0b4a8f;
  font-size: 20px;
  color: #fff;
}

.score__text {
  flex: 1;
  min-width: 0;
}

.score__value {
  display: block;
  font-size: 13px;
}

.score__value span {
  font-weight: 400;
  color: #64748b;
}

.score__note {
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: #475569;
}

.score__badge {
  max-width: 100px;
  padding: 10px 14px;
  border-radius: 999px;
  background: #cfe3fb;
  font-size: 11px;
  font-weight: 800;
  line-height: 14px;
  text-align: center;
  text-transform: uppercase;
  color: #0b4a8f;
}

.award__cut {
  height: 0;
  margin-top: 14px;
  border-top: 1px dashed #cbd5e1;
}

/* Teks */
.copy {
  margin-top: 4px;
}

.step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 8px;
  background: #cfe3fb;
  font-size: 12px;
  font-weight: 700;
  color: #0b4a8f;
}

.step__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0b4a8f;
}

.copy__title {
  margin: 14px 0 0;
  font-size: 28px;
  line-height: 36px;
  font-weight: 800;
  color: #0b1220;
}

.copy__desc {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 24px;
  color: #475569;
}

/* Fitur */
.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 18px;
  padding-bottom: 8px;
}

.feature {
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  background: #fff;
}

.feature__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  border-radius: 12px;
  font-size: 22px;
}

.feature__icon--blue {
  background: #cfe3fb;
  color: #0b4a8f;
}

.feature__icon--amber {
  background: #ffdeac;
  color: #7a4f00;
}

.feature__title {
  display: block;
  font-size: 15px;
  line-height: 20px;
}

.feature__desc {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 18px;
  color: #64748b;
}

/* Dock bawah */
.dock {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 20px calc(env(safe-area-inset-bottom, 0px) + 16px);
  background: #f4f7fc;
  border-top: 1px solid #e2e8f0;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dots__item {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #cbd5e1;
  transition: width 0.25s ease, background 0.25s ease;
}

.dots__item--active {
  width: 36px;
  background: #0b4a8f;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 54px;
  border-radius: 14px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 800;
  transition: transform 0.15s ease;
}

.cta:active {
  transform: scale(0.98);
}

.cta ion-icon {
  font-size: 20px;
}

.cta--primary {
  border: 0;
  background: #0b4a8f;
  color: #fff;
  box-shadow: 0 6px 14px rgba(11, 74, 143, 0.28);
}

.cta--outline {
  border: 1.5px solid #0b4a8f;
  background: #fff;
  color: #0b4a8f;
}

.guest {
  padding: 8px 0 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  text-decoration: underline;
  color: #1e293b;
}

.cta:focus-visible,
.guest:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}
</style>