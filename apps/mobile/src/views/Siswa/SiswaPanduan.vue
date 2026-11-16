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
              <strong>Pusat Bantuan &amp; Panduan</strong>
              <span>SIKARYA Dikda Sulut • SMPN 1 Manado</span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Informasi">
              <ion-icon :icon="informationCircleOutline" />
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Kolom Pencarian Bantuan -->
          <div class="search-box">
            <ion-icon :icon="searchOutline" class="search-box__icon" />
            <input
              type="text"
              v-model="pencarian"
              placeholder="Cari topik bantuan, juknis, atau kend..."
            />
            <button type="button" class="search-box__mic" aria-label="Cari suara">
              <ion-icon :icon="micOutline" />
            </button>
          </div>

          <!-- Kategori Filter / Chips -->
          <div class="category-scroll">
            <button
              type="button"
              class="cat-chip"
              :class="{ 'cat-chip--active': kaktif === 'semua' }"
              @click="kaktif = 'semua'"
            >
              <ion-icon :icon="checkmark" />
              Semua
            </button>
            <button
              type="button"
              class="cat-chip"
              :class="{ 'cat-chip--active': kaktif === 'unggah' }"
              @click="kaktif = 'unggah'"
            >
              Unggah Karya
            </button>
            <button
              type="button"
              class="cat-chip"
              :class="{ 'cat-chip--active': kaktif === 'sertifikat' }"
              @click="kaktif = 'sertifikat'"
            >
              Sertifikat
            </button>
            <button
              type="button"
              class="cat-chip"
              :class="{ 'cat-chip--active': kaktif === 'akun' }"
              @click="kaktif = 'akun'"
            >
              Akun &amp; Dapodik
            </button>
          </div>

          <!-- Banner Panduan Praktis Siswa (PDF) -->
          <section class="banner-guide">
            <div class="banner-guide__top">
              <span class="badge-saku">
                <ion-icon :icon="bookOutline" />
                BUKU SAKU SISWA 2025
              </span>
              <span class="banner-guide__star"><ion-icon :icon="star" /></span>
            </div>

            <h2>Panduan Praktis Siswa (PDF)</h2>
            <p>
              Petunjuk teknis resmi pendaftaran, ketentuan berkas karya digital, dan tahapan verifikasi kurasi.
            </p>

            <button type="button" class="btn-download-guide" @click="unduhJuknis">
              <ion-icon :icon="cloudDownloadOutline" />
              Unduh Juknis Lengkap (2.4 MB)
            </button>
          </section>

          <!-- Alur Partisipasi Karya -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="gitNetworkOutline" />
                Alur Partisipasi Karya
              </h3>
              <small class="text-blue">4 Tahapan Mudah</small>
            </div>

            <div class="flow-grid">
              <div class="flow-card">
                <span class="flow-card__num">1</span>
                <span class="flow-card__top-icon"><ion-icon :icon="idCardOutline" /></span>
                <strong>Registrasi Akun</strong>
                <p>Sinkronisasi NISN via operator Dapodik sekolah.</p>
              </div>

              <div class="flow-card">
                <span class="flow-card__num">2</span>
                <span class="flow-card__top-icon"><ion-icon :icon="appsOutline" /></span>
                <strong>Pilih Cabang</strong>
                <p>Pilih kategori lomba FLS2N, O2SN, atau Vokasi.</p>
              </div>

              <div class="flow-card">
                <span class="flow-card__num">3</span>
                <span class="flow-card__top-icon"><ion-icon :icon="cloudUploadOutline" /></span>
                <strong>Unggah Berkas</strong>
                <p>Kirim file PDF, karya gambar, atau tautan video.</p>
              </div>

              <div class="flow-card">
                <span class="flow-card__num">4</span>
                <span class="flow-card__top-icon"><ion-icon :icon="ribbonOutline" /></span>
                <strong>Pantau &amp; Sertifikat</strong>
                <p>Lihat skor tim juri dan unduh e-sertifikat resmi.</p>
              </div>
            </div>
          </section>

          <!-- Pertanyaan Sering Diajukan (FAQ) -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="helpCircleOutline" />
                Pertanyaan Sering Diajukan
              </h3>
              <small class="text-muted">FAQ Siswa</small>
            </div>

            <div class="faq-list">
              <!-- FAQ 1 (Accordion Terbuka) -->
              <div class="faq-item faq-item--open">
                <button type="button" class="faq-item__head" @click="faq1Open = !faq1Open">
                  <strong>Bagaimana jika NISN saya tidak ditemukan di Dapodik?</strong>
                  <ion-icon :icon="faq1Open ? chevronUpOutline : chevronDownOutline" />
                </button>

                <div v-if="faq1Open" class="faq-item__body">
                  <p>
                    Pastikan penulisan 10 digit NISN sudah sesuai dengan rapor fisik. Jika sistem masih menampilkan status tidak terdaftar, segera hubungi <strong>Operator Dapodik / Tata Usaha SMP Negeri 1 Manado</strong> untuk memvalidasi residu NISN pada portal Verval PD Kemendikbud.
                  </p>
                  <div class="faq-sub-badge">
                    <ion-icon :icon="shieldCheckmarkOutline" />
                    Sinkronisasi otomatis setiap 1x24 jam
                  </div>
                </div>
              </div>

              <!-- FAQ 2 -->
              <div class="faq-item">
                <button type="button" class="faq-item__head" @click="faq2Open = !faq2Open">
                  <strong>Apa format dan batas ukuran file video dan dokumen karya?</strong>
                  <ion-icon :icon="faq2Open ? chevronUpOutline : chevronDownOutline" />
                </button>
                <div v-if="faq2Open" class="faq-item__body">
                  <p>Dokumen karya utama berupa PDF atau PNG maksimal 25 MB, sedangkan surat administrasi pendukung berformat PDF maksimal 5 MB.</p>
                </div>
              </div>

              <!-- FAQ 3 -->
              <div class="faq-item">
                <button type="button" class="faq-item__head" @click="faq3Open = !faq3Open">
                  <strong>Berapa lama proses validasi sertifikat oleh Disdikbud Kota Manado?</strong>
                  <ion-icon :icon="faq3Open ? chevronUpOutline : chevronDownOutline" />
                </button>
                <div v-if="faq3Open" class="faq-item__body">
                  <p>Proses pemeriksaan dan validasi berkas oleh tim verifikator membutuhkan waktu rata-rata 1–3 hari kerja.</p>
                </div>
              </div>

              <!-- FAQ 4 -->
              <div class="faq-item">
                <button type="button" class="faq-item__head" @click="faq4Open = !faq4Open">
                  <strong>Apakah saya bisa mendaftar lebih dari satu cabang lomba?</strong>
                  <ion-icon :icon="faq4Open ? chevronUpOutline : chevronDownOutline" />
                </button>
                <div v-if="faq4Open" class="faq-item__body">
                  <p>Ya, siswa diperbolehkan mengikuti maksimal 2 cabang lomba berbeda selama tidak ada jadwal penjurian yang bersamaan.</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Kartu Kontak Helpdesk & WhatsApp -->
          <section class="helpdesk-card">
            <div class="helpdesk-card__head">
              <span class="helpdesk-avatar"><ion-icon :icon="headsetOutline" /></span>
              <div class="helpdesk-text">
                <strong>Butuh bantuan lebih lanjut?</strong>
                <p>Tim helpdesk teknis Cabdin Manado siap membimbing kendala Anda.</p>
              </div>
            </div>

            <button type="button" class="btn-whatsapp" @click="bukaWhatsApp">
              <ion-icon :icon="logoWhatsapp" />
              <div class="wa-text">
                <strong>Chat WhatsApp Helpdesk</strong>
                <small>Senin – Jumat, 08:00 - 16:00 WITA</small>
              </div>
              <ion-icon :icon="arrowForward" class="wa-arrow" />
            </button>

            <button type="button" class="email-row" @click="kirimEmail">
              <div class="email-row__left">
                <ion-icon :icon="mailOutline" />
                <div>
                  <strong>Email Dukungan Resmi</strong>
                  <small>sikarya.dikdasulut@gmail.com</small>
                </div>
              </div>
              <ion-icon :icon="openOutline" class="external-icon" />
            </button>
          </section>

          <!-- Footer -->
          <footer class="app-footer">
            <p>
              Dinas Pendidikan Daerah Provinsi Sulawesi Utara © 2025<br />
              SIKARYA v2.4.1 (Build Manado-Smart Edu)[cite: 6]
            </p>
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBack,
  informationCircleOutline,
  searchOutline,
  micOutline,
  checkmark,
  bookOutline,
  star,
  cloudDownloadOutline,
  gitNetworkOutline,
  idCardOutline,
  appsOutline,
  cloudUploadOutline,
  ribbonOutline,
  helpCircleOutline,
  chevronDownOutline,
  chevronUpOutline,
  shieldCheckmarkOutline,
  headsetOutline,
  logoWhatsapp,
  arrowForward,
  mailOutline,
  openOutline
} from 'ionicons/icons';

const router = useRouter();
const pencarian = ref('');
const kaktif = ref<'semua' | 'unggah' | 'sertifikat' | 'akun'>('semua');

/* Accordion States */
const faq1Open = ref(true);
const faq2Open = ref(false);
const faq3Open = ref(false);
const faq4Open = ref(false);

function unduhJuknis() {
  console.log('Mengunduh Buku Saku Siswa Juknis 2025 (PDF)');
}

function bukaWhatsApp() {
  console.log('Membuka chat WhatsApp Helpdesk');
}

function kirimEmail() {
  console.log('Mengirim email ke sikarya.dikdasulut@gmail.com');
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
  font-size: 14.5px;
  line-height: 20px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10.5px;
  line-height: 14px;
  color: #50545d;
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
  padding: 14px 14px 32px;
}

/* ---------- Search Box ---------- */

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #c3c9d6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.search-box:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.search-box__icon {
  font-size: 20px;
  color: #747985;
}

.search-box input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 44px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  color: #191c1e;
}

.search-box input::placeholder {
  color: #747985;
}

.search-box__mic {
  display: flex;
  padding: 4px;
  color: #50545d;
}

.search-box__mic ion-icon {
  font-size: 20px;
}

/* ---------- Category Scroll Chips ---------- */

.category-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.cat-chip {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #d2d7e2;
  font-size: 12px;
  font-weight: 700;
  color: #50545d;
  white-space: nowrap;
}

.cat-chip ion-icon {
  font-size: 16px;
  display: none;
}

.cat-chip--active {
  background: #003178;
  border-color: #003178;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 49, 120, 0.2);
}

.cat-chip--active ion-icon {
  display: inline-block;
}

/* ---------- Banner Panduan Praktis Siswa (PDF) ---------- */

.banner-guide {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #002256 0%, #0b4fa6 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 49, 120, 0.2);
}

.banner-guide__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.badge-saku {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.badge-saku ion-icon {
  font-size: 13px;
}

.banner-guide__star {
  color: #f6d060;
  font-size: 18px;
}

.banner-guide h2 {
  font-size: 17px;
  font-weight: 800;
  line-height: 23px;
  margin-bottom: 6px;
}

.banner-guide p {
  font-size: 11.5px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 14px;
}

.btn-download-guide {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f6d060 0%, #e5b323 100%);
  color: #382600;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(229, 179, 35, 0.3);
}

.btn-download-guide ion-icon {
  font-size: 18px;
  color: #382600;
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
  padding: 0 2px;
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

.text-blue {
  font-size: 11.5px;
  font-weight: 700;
  color: #0b4fa6;
}

.text-muted {
  font-size: 11.5px;
  font-weight: 600;
  color: #747985;
}

/* ---------- Alur Partisipasi Karya (Flow Grid 2x2) ---------- */

.flow-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.flow-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 14px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.flow-card__num {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #eef5ff;
  color: #0b4fa6;
  font-size: 11px;
  font-weight: 800;
}

.flow-card__top-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #eef0f4;
  color: #003178;
  margin-bottom: 8px;
}

.flow-card__top-icon ion-icon {
  font-size: 18px;
}

.flow-card strong {
  font-size: 12.5px;
  font-weight: 800;
  color: #191c1e;
  margin-bottom: 3px;
}

.flow-card p {
  font-size: 11px;
  line-height: 15px;
  color: #50545d;
}

/* ---------- FAQ / Pertanyaan Sering Diajukan ---------- */

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.faq-item {
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.faq-item__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 14px;
  font-size: 12.5px;
  font-weight: 700;
  color: #191c1e;
}

.faq-item__head ion-icon {
  font-size: 18px;
  color: #747985;
}

.faq-item__body {
  padding: 0 14px 14px 14px;
  border-top: 1px solid #eceef2;
  font-size: 11.5px;
  line-height: 17px;
  color: #3d4452;
}

.faq-item__body p {
  margin-top: 10px;
}

.faq-sub-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  background: #f0f4f8;
  color: #0b4fa6;
  font-size: 11px;
  font-weight: 700;
}

.faq-sub-badge ion-icon {
  font-size: 14px;
}

/* ---------- Helpdesk Card ---------- */

.helpdesk-card {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.helpdesk-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.helpdesk-avatar {
  width: 42px;
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #eef5ff;
  color: #0b4fa6;
  font-size: 22px;
}

.helpdesk-text strong {
  display: block;
  font-size: 13.5px;
  font-weight: 800;
  color: #003178;
  margin-bottom: 2px;
}

.helpdesk-text p {
  font-size: 11.5px;
  color: #50545d;
  line-height: 16px;
}

.btn-whatsapp {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  background: #00a86b;
  color: #fff;
  margin-bottom: 8px;
  box-shadow: 0 2px 6px rgba(0, 168, 107, 0.25);
}

.btn-whatsapp > ion-icon {
  font-size: 24px;
}

.wa-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.wa-text strong {
  font-size: 12.5px;
  font-weight: 700;
}

.wa-text small {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
}

.wa-arrow {
  font-size: 18px;
}

.email-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f7f9fb;
  border: 1px solid #dfe2e8;
}

.email-row__left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.email-row__left ion-icon {
  font-size: 20px;
  color: #50545d;
}

.email-row__left strong {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.email-row__left small {
  font-size: 11px;
  color: #50545d;
}

.external-icon {
  font-size: 16px;
  color: #747985;
}

/* ---------- Footer ---------- */

.app-footer {
  text-align: center;
  padding: 6px 0 0 0;
}

.app-footer p {
  font-size: 10.5px;
  line-height: 16px;
  color: #747985;
}
</style>