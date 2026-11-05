<template>
  <ion-page>
    <ion-content :scroll-y="false" class="slide-content">
      <div class="slide">
        <!-- Header -->
        <header class="header">
          <div class="brand">
            <!-- PENTING: pakai path logo yang sama dengan slide 1 -->
            <img
              class="brand__logo"
              src="/assets/Logo.png"
              alt="Logo SIKARYA"
            />
            <div class="brand__text">
              <strong>SIKARYA</strong>
              <span>Dikda Sulut</span>
            </div>
          </div>
          <button class="skip" type="button" @click="lewati">Lewati</button>
        </header>

        <!-- Isi -->
        <main class="body">
          <div class="step-pill">
            <ion-icon :icon="checkmarkCircle" />
            <span>Langkah 2 dari 3 &bull; Kurasi &amp; Validasi</span>
          </div>

          <!-- Kartu pratinjau -->
          <section class="preview">
            <div class="chips">
              <span class="chip chip--blue">MP4<br />VIDEO</span>
              <span class="chip chip--blue">PDF<br />NASKAH</span>
              <span class="chip chip--grey">ZIP<br />DATA</span>
              <span class="chip chip--ssl">
                <ion-icon :icon="cloudUploadOutline" />
                <span>Enkripsi<br />SSL</span>
              </span>
            </div>

            <div class="teacher">
              <div class="teacher__avatar">
                <ion-icon :icon="bookOutline" />
              </div>
              <div class="teacher__info">
                <strong>Drs.Mott Versteppen, S.T</strong>
                <span>Guru Pembimbing &bull; SMAIN 7</span>
              </div>
              <span class="teacher__badge"><i></i>NUPTK Sah</span>
            </div>
          </section>

          <h1 class="title">Unggah Karya Praktis<br />Bersama Pembimbing</h1>
          <p class="desc">
            Kirim video sinopsis, naskah inovasi, dan portofolio dengan
            supervisi guru Anda. Berkas otomatis terverifikasi sebelum masuk ke
            meja dewan juri Dikda Sulut.
          </p>

          <div class="feature">
            <div class="feature__icon">
              <ion-icon :icon="shieldCheckmarkOutline" />
            </div>
            <div class="feature__text">
              <strong>Validasi Otomatis Pra-Submit</strong>
              <span>
                Mencegah kesalahan format berkas, Kuota file, atau legalitas
                yang tidak lengkap.
              </span>
            </div>
          </div>

          <div class="feature">
            <div class="feature__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M12 16V8" />
                <path d="m8.5 11.5 3.5-3.5 3.5 3.5" />
              </svg>
            </div>
            <div class="feature__text">
              <strong>Status &amp; Catatan Revisi Real-Time</strong>
              <span>
                Dapatkan arahan perbaikan langsung dari pembimbing via
                notifikasi sistem.
              </span>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="footer">
          <div class="dots">
            <span></span>
            <span class="active"></span>
            <span></span>
          </div>

          <button class="btn-next" type="button" @click="lanjut">
            <span>Lanjut (2/3)</span>
            <ion-icon :icon="arrowForwardOutline" />
          </button>

          <button class="btn-back" type="button" @click="kembali">
            <ion-icon :icon="arrowBackOutline" />
            <span>Kembali ke Slide 1</span>
          </button>
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  checkmarkCircle,
  cloudUploadOutline,
  bookOutline,
  shieldCheckmarkOutline,
  arrowForwardOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const lanjut = () => router.push('/onboarding/3');
const kembali = () => router.push('/onboarding');
const lewati = () => router.replace('/login');
</script>

<style scoped>
.slide-content {
  --background: #eaf1fd;
}

/* Layout penuh layar. Di HP/Android mengisi seluruh lebar; di layar lebar
   (browser desktop) hanya isinya yang dibatasi 560px dan diletakkan di tengah,
   latar belakang tetap penuh. */
.slide {
  --pad-x: max(20px, calc((100% - 560px) / 2));

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #eaf1fd;
  color: #0d1117;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* ---------- Header ---------- */
.header {
  position: relative;
  z-index: 2;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: env(safe-area-inset-top, 0px) var(--pad-x) 0;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(15, 40, 80, 0.14);
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand__logo {
  width: 36px;
  height: 40px;
  object-fit: contain;
}
.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.brand__text strong {
  font-size: 18px;
  font-weight: 800;
}
.brand__text span {
  font-size: 12px;
  color: #1f2937;
}
.skip {
  padding: 8px 0 8px 8px;
  border: 0;
  background: none;
  font-size: 12px;
  font-weight: 700;
  color: #1a5a9a;
}

/* ---------- Isi ---------- */
.body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 16px var(--pad-x) 12px;
}
.body::-webkit-scrollbar {
  display: none;
}

.step-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 12px;
  border-radius: 999px;
  background: #cbdcf2;
  font-size: 10.5px;
  font-weight: 600;
  color: #1c3556;
}
.step-pill ion-icon {
  font-size: 13px;
  color: #0a4f8f;
}

/* Kartu pratinjau */
.preview {
  margin-top: 24px;
  padding: 18px 12px 0;
  overflow: hidden;
  border: 1px solid #ced6e2;
  border-radius: 16px;
  background: #f2f6fd;
}
.chips {
  display: flex;
  align-items: stretch;
  gap: 10px;
  height: 44px;
}
.chip {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}
.chip--blue {
  background: #1b64ab;
  color: #ffffff;
}
.chip--grey {
  background: #e7e5e4;
  color: #3b3b3b;
}
.chip--ssl {
  gap: 4px;
  border: 1px solid #e3e8ef;
  border-radius: 12px;
  background: #ffffff;
  color: #1f2937;
  font-size: 10.5px;
  text-align: left;
}
.chip--ssl ion-icon {
  flex: none;
  font-size: 15px;
  color: #0a4f8f;
}

/* Kartu guru pembimbing */
.teacher {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 76px;
  margin-top: 22px;
  padding: 0 14px;
  border: 1px solid #d6dde8;
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  background: #ffffff;
}
.teacher__avatar {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #a9c5ee;
  color: #12356a;
  font-size: 22px;
}
.teacher__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 150px;
}
.teacher__info strong {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.25;
}
.teacher__info span {
  font-size: 9.5px;
  font-weight: 600;
  color: #1f2937;
}
.teacher__badge {
  position: absolute;
  top: 8px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border: 1px solid #b5e3c6;
  border-radius: 999px;
  background: #dff5e7;
  font-size: 8.5px;
  font-weight: 600;
  color: #1b8a45;
}
.teacher__badge i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22a559;
}

/* Judul + deskripsi */
.title {
  margin: 32px 0 10px;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.2px;
}
.desc {
  margin: 0 0 28px;
  font-size: 13px;
  line-height: 22px;
  color: #1c2430;
}

/* Kartu fitur */
.feature {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 76px;
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid #d9dee6;
  border-radius: 12px;
  background: #e6e9ee;
}
.feature__icon {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid #d3d9e2;
  border-radius: 9px;
  background: #ffffff;
  color: #12447a;
  font-size: 19px;
}
.feature__icon svg {
  width: 19px;
  height: 19px;
}
.feature__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.feature__text strong {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
}
.feature__text span {
  font-size: 10px;
  line-height: 1.45;
  color: #6b7280;
}

/* ---------- Footer ---------- */
.footer {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px var(--pad-x) calc(16px + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid #e1e8f3;
  background: #f2f6fd;
}
.dots {
  display: flex;
  align-items: center;
  gap: 5px;
}
.dots span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #9ca3af;
}
.dots span.active {
  width: 42px;
  background: #0a4f8f;
}

.btn-next {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  margin-top: 18px;
  border: 0;
  border-radius: 10px;
  background: #0a5190;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
}
.btn-next ion-icon {
  font-size: 18px;
}
.btn-next:active {
  opacity: 0.9;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 14px;
  padding: 4px 8px;
  border: 0;
  background: none;
  font-size: 12px;
  font-weight: 500;
  color: #4b5563;
}
.btn-back ion-icon {
  font-size: 14px;
}

.skip:focus-visible,
.btn-next:focus-visible,
.btn-back:focus-visible {
  outline: 2px solid #0a4f8f;
  outline-offset: 2px;
}
</style>