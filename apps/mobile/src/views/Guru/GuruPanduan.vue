<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <div class="brand__text">
              <strong>Panduan Guru (Buku Saku)</strong>
              <span>Dinas Pendidikan Daerah Prov Sulut</span>
            </div>
          </div>

          <div class="bar__actions">
            <button
              class="icon-btn"
              type="button"
              :aria-label="cariAktif ? 'Tutup pencarian' : 'Cari dokumen'"
              :aria-expanded="cariAktif"
              @click="toggleCari"
            >
              <ion-icon :icon="cariAktif ? closeOutline : searchOutline" />
            </button>

            <button class="icon-btn" type="button" aria-label="Bantuan">
              <ion-icon :icon="helpCircleOutline" />
            </button>
          </div>
        </header>

        <div v-if="cariAktif" class="searchbar">
          <ion-icon :icon="searchOutline" />
          <input
            ref="cariInput"
            v-model="query"
            type="search"
            placeholder="Cari regulasi atau instrumen lomba..."
            aria-label="Cari regulasi atau instrumen lomba"
          />
        </div>

        <main class="main">

          <!-- Strip info -->
          <section class="strip">
            <span class="status status-info">Edisi 2025/2026</span>
            <strong>Direktori Resmi Sulut</strong>
            <span class="verified">
              <ion-icon :icon="checkmarkCircleOutline" />
              Terverifikasi Dikda
            </span>
          </section>

          <!-- Buku saku utama -->
          <section class="book-card">
            <div class="book-card__body">
              <div class="book-icon">
                <ion-icon :icon="bookOutline" />
              </div>

              <div class="tags">
                <span class="status status-gold">Pedoman Utama</span>
                <span class="status status-gray">Versi 2.1</span>
              </div>

              <h1>Buku Saku Guru Pembimbing Lomba Siswa 2025/2026</h1>

              <p class="book-desc">
                Edisi Resmi Dinas Pendidikan Daerah Prov Sulut. Panduan teknis pendampingan
                kurasi karya siswa jenjang SMA, SMK, dan SLB.
              </p>

              <div class="meta">
                <span class="meta__pdf">
                  <ion-icon :icon="documentsOutline" /> PDF (4.2 MB)
                </span>
                <span>
                  <ion-icon :icon="calendarOutline" /> Terbit Januari 2026
                </span>
                <span class="meta__blue">
                  <ion-icon :icon="schoolOutline" /> Dikmen &amp; Diksus
                </span>
              </div>

              <button type="button" class="btn-validate" @click="baca">
                <ion-icon :icon="eyeOutline" />
                Baca Sekarang (In-App Viewer)
              </button>

              <button type="button" class="btn-soft" @click="unduhBuku">
                <ion-icon :icon="downloadOutline" />
                Unduh PDF
              </button>
            </div>
          </section>

          <!-- Daftar dokumen -->
          <section class="docs">
            <div class="section-head">
              <h2>Daftar Regulasi &amp; Instrumen Lomba</h2>
              <small>{{ dokumenTampil.length }} Berkas<br />Tersedia</small>
            </div>

            <article v-for="d in dokumenTampil" :key="d.id" class="doc-card">
              <div class="doc-card__row">
                <span class="doc-icon" :class="'tone-' + d.tone">
                  <ion-icon :icon="d.icon" />
                </span>

                <div class="doc-card__text">
                  <div class="doc-tags">
                    <span class="status status-gray">{{ d.tag }}</span>
                    <span class="fmt" :class="'fmt--' + d.fmtTone">
                      <ion-icon :icon="d.fmtIcon" />
                      {{ d.format }} • {{ d.ukuran }}
                    </span>
                  </div>

                  <h3>{{ d.judul }}</h3>
                  <p>{{ d.deskripsi }}</p>
                </div>
              </div>

              <button type="button" class="btn-gray" @click="unduh(d)">
                <ion-icon :icon="downloadOutline" />
                Unduh
              </button>
            </article>

            <p v-if="!dokumenTampil.length" class="empty">
              Tidak ada dokumen yang cocok dengan pencarian.
            </p>
          </section>

          <!-- Video tutorial -->
          <section class="video-card">
            <div class="video-icon">
              <ion-icon :icon="playCircleOutline" />
            </div>

            <h2>Perlu panduan video tutorial?</h2>

            <p>
              Tonton video panduan tata cara verifikasi karya di kanal YouTube Resmi Dikda Sulut
              untuk penjelasan tahapan kurasi langkah demi langkah.
            </p>

            <button type="button" class="btn-teal" @click="bukaYoutube">
              Buka YouTube Dikda
              <ion-icon :icon="openOutline" />
            </button>
          </section>

          <footer class="foot">
            Pusat Data Dokumen &amp; Regulasi Pendidikan Menengah &amp; Khusus Sulawesi Utara • 2026
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  searchOutline,
  closeOutline,
  helpCircleOutline,
  checkmarkCircleOutline,
  bookOutline,
  documentsOutline,
  calendarOutline,
  schoolOutline,
  eyeOutline,
  downloadOutline,
  documentTextOutline,
  clipboardOutline,
  checkboxOutline,
  playCircleOutline,
  openOutline
} from 'ionicons/icons';

const router = useRouter();

const cariAktif = ref(false);
const query = ref('');
const cariInput = ref<HTMLInputElement | null>(null);

const dokumen = [
  {
    id: 1,
    tone: 'blue',
    icon: documentTextOutline,
    tag: 'Juknis Resmi',
    format: 'PDF',
    fmtTone: 'red',
    fmtIcon: documentsOutline,
    ukuran: '2.8 MB',
    judul: 'Juknis FLS2N Jenjang Dikmen & Diksus Sulut 2025',
    deskripsi: 'Petunjuk pelaksanaan festival dan lomba seni siswa nasional tingkat provinsi.'
  },
  {
    id: 2,
    tone: 'amber',
    icon: clipboardOutline,
    tag: 'Dokumen Wajib',
    format: 'DOCX/PDF',
    fmtTone: 'blue',
    fmtIcon: documentTextOutline,
    ukuran: '1.1 MB',
    judul: 'Format Pakta Integritas Orisinalitas Karya & Bebas Plagiarisme',
    deskripsi: 'Surat pernyataan bermeterai wajib diunggah bersama berkas karya siswa.'
  },
  {
    id: 3,
    tone: 'lavender',
    icon: checkboxOutline,
    tag: 'Standar Juri',
    format: 'PDF',
    fmtTone: 'red',
    fmtIcon: documentsOutline,
    ukuran: '3.4 MB',
    judul: 'Pedoman Penilaian & Rubrik Skor Dewan Juri Provinsi',
    deskripsi: 'Kriteria pembobotan teknis, kebaruan ide, dan orisinalitas karya.'
  }
];

const dokumenTampil = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return dokumen;
  return dokumen.filter(
    (d) =>
      d.judul.toLowerCase().includes(q) ||
      d.deskripsi.toLowerCase().includes(q) ||
      d.tag.toLowerCase().includes(q)
  );
});

async function toggleCari() {
  cariAktif.value = !cariAktif.value;
  if (cariAktif.value) {
    await nextTick();
    cariInput.value?.focus();
  } else {
    query.value = '';
  }
}

function baca() {
  // TODO: buka buku saku di In-App Viewer
  console.log('baca buku saku');
}

function unduhBuku() {
  // TODO: unduh PDF buku saku
  console.log('unduh buku saku');
}

function unduh(d: { id: number }) {
  // TODO: unduh dokumen
  console.log('unduh', d.id);
}

function bukaYoutube() {
  // TODO: buka kanal YouTube resmi Dikda Sulut
  console.log('buka youtube');
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
  font-family:
    'Plus Jakarta Sans',
    system-ui,
    sans-serif;
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
h2,
h3,
p {
  margin: 0;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding:
    calc(env(safe-area-inset-top, 0px) + 8px)
    12px
    8px;

  background: #fff;
  border-bottom: 1px solid #d7dbe5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}

.brand {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10px;
  color: #606572;
}

.bar__actions {
  display: flex;
  align-items: center;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 23px;
}

.brand .icon-btn {
  color: #003178;
}

.searchbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 14px 0;
  padding: 0 12px;
  height: 42px;
  border-radius: 11px;
  background: #fff;
  border: 1px solid #c3c9d6;
}

.searchbar:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.searchbar ion-icon {
  color: #606572;
  font-size: 18px;
}

.searchbar input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  color: #191c1e;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 28px;
}

/* ---------- Pill ---------- */

.status {
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
  white-space: nowrap;
}

.status-info {
  background: #cfe6fb;
  color: #0b4fa6;
}

.status-gold {
  background: #ffe1b3;
  color: #7a4b00;
}

.status-gray {
  background: #eceff3;
  color: #50545d;
  font-weight: 600;
}

/* ---------- Strip ---------- */

.strip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 -14px;
  padding: 0 14px;
  overflow-x: auto;
  scrollbar-width: none;
}

.strip::-webkit-scrollbar {
  display: none;
}

.strip strong {
  flex: none;
  font-size: 11px;
  font-weight: 600;
}

.verified {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #606572;
}

.verified ion-icon {
  font-size: 16px;
}

/* ---------- Buku saku ---------- */

.book-card {
  overflow: hidden;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  border-top: 5px solid #003178;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}

.book-card__body {
  padding: 16px;
}

.book-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #dce7ff;
  color: #003178;
}

.book-icon ion-icon {
  font-size: 30px;
}

.tags {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.book-card h1 {
  margin-top: 10px;
  font-size: 19px;
  line-height: 26px;
  font-weight: 800;
  color: #0b3a8f;
}

.book-desc {
  margin-top: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eceef2;
  font-size: 12px;
  line-height: 17px;
  color: #3d4452;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 12px;
  font-size: 12px;
  color: #3d4452;
}

.meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.meta ion-icon {
  font-size: 16px;
}

.meta__pdf {
  color: #ba1a1a;
}

.meta__blue {
  color: #0b4fa6;
}

/* ---------- Tombol ---------- */

.btn-validate,
.btn-soft,
.btn-gray,
.btn-teal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  border-radius: 12px;
  font-weight: 700;
}

.btn-validate {
  min-height: 48px;
  margin-top: 16px;
  background: #002a6e;
  color: #fff;
  font-size: 13px;
  box-shadow: 0 2px 4px rgba(0, 49, 120, .18);
}

.btn-soft {
  min-height: 48px;
  margin-top: 10px;
  background: #cfe3fb;
  color: #003178;
  font-size: 13px;
}

.btn-gray {
  min-height: 42px;
  margin-top: 10px;
  background: #eceff3;
  color: #003178;
  font-size: 12px;
}

.btn-teal {
  min-height: 46px;
  margin-top: 14px;
  background: #00639a;
  color: #fff;
  font-size: 12px;
}

.btn-validate ion-icon,
.btn-soft ion-icon,
.btn-gray ion-icon,
.btn-teal ion-icon {
  font-size: 18px;
}

.btn-validate:focus-visible,
.btn-soft:focus-visible,
.btn-gray:focus-visible,
.btn-teal:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Daftar dokumen ---------- */

.docs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-top: 4px;
}

.section-head h2 {
  font-size: 18px;
  line-height: 25px;
  font-weight: 700;
  color: #003178;
}

.section-head small {
  flex: none;
  margin-bottom: 4px;
  font-size: 10px;
  line-height: 14px;
  color: #606572;
}

.doc-card {
  padding: 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.doc-card__row {
  display: flex;
  gap: 12px;
}

.doc-icon {
  width: 44px;
  height: 44px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.tone-blue {
  background: #cfe3fb;
  color: #003f91;
}

.tone-amber {
  background: #ffe1b3;
  color: #7a4b00;
}

.tone-lavender {
  background: #dfe3ff;
  color: #3a3f9c;
}

.doc-card__text {
  flex: 1;
  min-width: 0;
}

.doc-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.fmt {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
}

.fmt ion-icon {
  font-size: 14px;
}

.fmt--red {
  color: #ba1a1a;
}

.fmt--blue {
  color: #0b4fa6;
}

.doc-card h3 {
  margin-top: 6px;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
}

.doc-card p {
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #50545d;
}

.empty {
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
  color: #747985;
}

/* ---------- Video ---------- */

.video-card {
  padding: 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.video-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #ffdad6;
  color: #ba1a1a;
}

.video-icon ion-icon {
  font-size: 26px;
}

.video-card h2 {
  margin-top: 14px;
  font-size: 15px;
  font-weight: 800;
}

.video-card p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 22px;
  color: #3d4452;
}

.foot {
  padding: 0 8px;
  text-align: center;
  font-size: 11px;
  line-height: 16px;
  color: #747985;
}

</style>