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

          <!-- Banner Progress Pengiriman -->
          <section class="progress-banner">
            <div class="progress-banner__head">
              <span class="progress-label">TAHAPAN PENGIRIMAN</span>
              <span class="progress-step">Langkah 2 dari 3</span>
            </div>

            <h2>Unggah Berkas &amp; Karya</h2>

            <!-- Progress Bar -->
            <div class="progress-track" aria-hidden="true">
              <div class="progress-track__fill" style="width: 66%"></div>
            </div>

            <div class="progress-steps-label">
              <span>1. Identifikasi Awal</span>
              <span class="text-active">2. Unggah &amp; Tautan</span>
              <span>3. Finalisasi</span>
            </div>
          </section>

          <!-- Banner Info Lomba -->
          <section class="comp-banner">
            <div class="comp-banner__badge">
              <ion-icon :icon="ribbonOutline" />
              <span>FLS2N SMA TINGKAT PROVINSI</span>
            </div>
            <h3>Lomba Film Pendek &amp; Dokumenter Budaya Sulawesi Utara</h3>
            <p>Batas Akhir Penerimaan Berkas: 28 Oktober 2025 • 23:59 WITA</p>
          </section>

          <!-- Bagian 1: Data Identitas Peserta -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="peopleOutline" />
                Data Identitas Peserta
              </h3>
              <p class="section-desc">Informasi tim perwakilan dan guru pendamping resmi</p>
            </div>

            <!-- Nama Tim -->
            <div class="field">
              <label for="namaTim">Nama Tim / Delegasi</label>
              <div class="input">
                <input id="namaTim" v-model="form.namaTim" type="text" />
                <ion-icon :icon="businessOutline" class="input__icon" />
              </div>
            </div>

            <!-- Asal Sekolah -->
            <div class="field">
              <label for="asalSekolah">Asal Satuan Pendidikan</label>
              <div class="input">
                <input id="asalSekolah" v-model="form.asalSekolah" type="text" />
                <ion-icon :icon="schoolOutline" class="input__icon" />
              </div>
              <small class="field-hint">Terdaftar resmi di Cabang Dinas Pendidikan Sulawesi Utara</small>
            </div>

            <!-- Guru Pembimbing -->
            <div class="field">
              <label for="guru">Nama Guru Pembimbing</label>
              <div class="input">
                <input id="guru" v-model="form.namaGuru" type="text" />
              </div>
            </div>

            <!-- NIP / NUPTK -->
            <div class="field">
              <label for="nip">NIP / NUPTK Pembimbing</label>
              <div class="input">
                <input id="nip" v-model="form.nipGuru" type="text" />
              </div>
            </div>
          </section>

          <!-- Bagian 2: Berkas Persyaratan Lomba -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="documentTextOutline" />
                Berkas Persyaratan Lomba
              </h3>
              <div class="header-badge-row">
                <small class="section-desc">Format resmi dokumen PDF (Maks. 5 MB per berkas)</small>
                <span class="count-pill">3 Berkas</span>
              </div>
            </div>

            <div class="doc-list">
              <!-- Berkas 1 -->
              <div class="doc-card">
                <span class="doc-card__icon"><ion-icon :icon="documentAttachOutline" /></span>
                <div class="doc-card__text">
                  <div class="title-row">
                    <strong>Kartu Pelajar Tim (Kolektif)</strong>
                    <span class="status-pill status-pill--green">LENGKAP</span>
                  </div>
                  <small>Terunggah (PDF 1.4 MB) • 24 Okt 2025</small>
                </div>
                <button type="button" class="btn-ganti" @click="gantiBerkas('kartu')">Ganti File</button>
              </div>

              <!-- Berkas 2 -->
              <div class="doc-card">
                <span class="doc-card__icon"><ion-icon :icon="documentAttachOutline" /></span>
                <div class="doc-card__text">
                  <div class="title-row">
                    <strong>Surat Pengantar Cabang Dinas</strong>
                    <span class="status-pill status-pill--blue">TERVERIFIKASI</span>
                  </div>
                  <small>Terunggah (PDF 1.4 MB) • No: 421/CADIS-MDO/89</small>
                </div>
                <button type="button" class="btn-ganti" @click="gantiBerkas('pengantar')">Ganti File</button>
              </div>

              <!-- Berkas 3 -->
              <div class="doc-card">
                <span class="doc-card__icon"><ion-icon :icon="documentAttachOutline" /></span>
                <div class="doc-card__text">
                  <div class="title-row">
                    <strong>Surat Orisinalitas Bermaterai</strong>
                    <span class="status-pill status-pill--amber">MATERAI 10K</span>
                  </div>
                  <small>Terunggah (PDF 1.4 MB) • Telah ditandatangani</small>
                </div>
                <button type="button" class="btn-ganti" @click="gantiBerkas('orisinalitas')">Ganti File</button>
              </div>
            </div>

            <div class="info-note">
              <ion-icon :icon="shieldCheckmarkOutline" />
              <span>Seluruh berkas administrasi telah memenuhi format sah Dikda Sulut.</span>
            </div>
          </section>

          <!-- Bagian 3: Karya Digital & Sinopsis -->
          <section class="section-group">
            <div class="section-header">
              <h3>
                <ion-icon :icon="videocamOutline" />
                Karya Digital &amp; Sinopsis
              </h3>
              <p class="section-desc">Tautan video dokumenter dan lembar ringkasan karya</p>
            </div>

            <!-- Tautan Video -->
            <div class="field">
              <label for="tautan">Tautan Video Karya (YouTube / Google Drive)</label>
              <div class="input">
                <ion-icon :icon="linkOutline" class="input__icon-left" />
                <input id="tautan" v-model="form.tautanVideo" type="text" />
              </div>
              <small class="field-hint">
                Pastikan pengaturan hak akses video disetel ke "Tidak Publik (Unlisted)" atau "Siapa saja yang memiliki tautan".
              </small>
            </div>

            <!-- Sinopsis -->
            <div class="field">
              <div class="label-row">
                <label for="sinopsis">Sinopsis Singkat Karya</label>
                <small class="counter-text">{{ form.sinopsis.length }} / 200 Kata</small>
              </div>
              <textarea
                id="sinopsis"
                v-model="form.sinopsis"
                rows="4"
                placeholder="Tuliskan sinopsis karya..."
              ></textarea>
            </div>

            <!-- Pratinjau Thumbnail -->
            <div class="field">
              <span class="label">Pratinjau Thumbnail Karya Resmi</span>
              
              <div class="thumbnail-preview">
                <div class="thumbnail-preview__img-wrap">
                  <!-- Simulasi gambar poster/video -->
                  <div class="thumbnail-overlay">
                    <span class="res-tag">RESOLUSI: 1920X1080 (HD)</span>
                    <strong>Kain Penghubung Zaman: Mapalus Masa Kini</strong>
                  </div>
                  <button type="button" class="cam-fab" aria-label="Ganti thumbnail">
                    <ion-icon :icon="cameraOutline" />
                  </button>
                </div>

                <div class="thumbnail-footer">
                  <span class="dot-green"></span>
                  <span>Format 16:9 sesuai pedoman teknis</span>
                  <button type="button" class="link-blue" @click="gantiPoster">Unggah Ulang Poster</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Tombol Aksi Utama -->
          <div class="action-buttons">
            <button type="button" class="btn-primary" @click="kirimKarya">
              <ion-icon :icon="sendOutline" />
              Kirim Karya ke Penjurian
            </button>

            <button type="button" class="btn-secondary" @click="simpanDraf">
              <ion-icon :icon="saveOutline" />
              Simpan Draf Formulir
            </button>
          </div>

        </main>
      </div>
    </ion-content>

    <!-- Bottom Tab Navigation -->
    <nav class="bottom-nav" aria-label="Navigasi Utama">
      <button type="button" class="bottom-nav__item" @click="router.push('/beranda')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="homeOutline" />
        </span>
        <small>Beranda</small>
      </button>

      <button type="button" class="bottom-nav__item bottom-nav__item--active" aria-current="page">
        <span class="bottom-nav__pill">
          <ion-icon :icon="folder" />
        </span>
        <small>Karya Saya</small>
      </button>

      <button type="button" class="bottom-nav__item" @click="router.push('/penjurian')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="documentTextOutline" />
        </span>
        <small>Penjurian</small>
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
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  menuOutline,
  ribbonOutline,
  notificationsOutline,
  peopleOutline,
  businessOutline,
  schoolOutline,
  documentTextOutline,
  documentAttachOutline,
  shieldCheckmarkOutline,
  videocamOutline,
  linkOutline,
  cameraOutline,
  sendOutline,
  saveOutline,
  homeOutline,
  folder,
  personOutline
} from 'ionicons/icons';

const router = useRouter();

const form = reactive({
  namaTim: 'CineMapalus SMAN 1',
  asalSekolah: 'SMAN 1 Manado (Kota Manado)',
  namaGuru: 'Dra. Vonny Pangemanan, M.Pd',
  nipGuru: '19780412 200501 2 008',
  tautanVideo: 'https://youtu.be/wP7_sulut_karya_202',
  sinopsis:
    'Dokumenter ini merekam kearifan tradisi Mapalus di pedalaman Minahasa Tenggara sebagai cerminan gotong royong luhur yang kini bertransformasi di kalangan generasi muda digital. Melalui sudut pandang seniman...'
});

function gantiBerkas(jenis: string) {
  console.log('Ganti berkas:', jenis);
}

function gantiPoster() {
  console.log('Unggah ulang poster thumbnail');
}

function kirimKarya() {
  console.log('Kirim karya ke penjurusan');
}

function simpanDraf() {
  console.log('Simpan draf formulir');
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
  padding: 14px 14px 32px;
}

/* ---------- Progress Banner ---------- */

.progress-banner {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.progress-banner__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.progress-label {
  font-size: 10px;
  font-weight: 800;
  color: #0b4fa6;
  letter-spacing: 0.5px;
}

.progress-step {
  font-size: 11px;
  font-weight: 700;
  color: #003178;
}

.progress-banner h2 {
  font-size: 16px;
  font-weight: 800;
  color: #191c1e;
  margin-bottom: 12px;
}

.progress-track {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: #eef0f4;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-track__fill {
  height: 100%;
  background: #003178;
  border-radius: 999px;
}

.progress-steps-label {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #747985;
}

.text-active {
  color: #003178;
  font-weight: 700;
}

/* ---------- Comp Banner ---------- */

.comp-banner {
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #002256 0%, #0b4fa6 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 49, 120, 0.2);
}

.comp-banner__badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 9px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.comp-banner h3 {
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
  margin-bottom: 6px;
}

.comp-banner p {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
}

/* ---------- Section Groups ---------- */

.section-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.section-header h3 {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14.5px;
  font-weight: 800;
  color: #003178;
  margin-bottom: 2px;
}

.section-header h3 ion-icon {
  font-size: 18px;
}

.section-desc {
  font-size: 11.5px;
  color: #50545d;
}

.header-badge-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}

.count-pill {
  padding: 2px 8px;
  border-radius: 10px;
  background: #dce7ff;
  color: #003178;
  font-size: 10px;
  font-weight: 800;
}

/* ---------- Form Fields ---------- */

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field label,
.label {
  font-size: 11.5px;
  font-weight: 700;
  color: #191c1e;
}

.input {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 0 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #c3c9d6;
}

.input:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.input input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 44px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 12.5px;
  color: #191c1e;
}

.input__icon,
.input__icon-left {
  font-size: 18px;
  color: #747985;
  flex: none;
}

.input__icon-left {
  margin-right: 8px;
}

.field-hint {
  font-size: 10.5px;
  color: #747985;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.counter-text {
  font-size: 10.5px;
  color: #747985;
}

textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #c3c9d6;
  font-family: inherit;
  font-size: 12.5px;
  color: #191c1e;
  resize: vertical;
  outline: 0;
}

textarea:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

/* ---------- Document Cards ---------- */

.doc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.doc-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7f9fb;
  border: 1px solid #e1e5ed;
}

.doc-card__icon {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fde8e8;
  color: #c81e1e;
  font-size: 18px;
}

.doc-card__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 2px;
}

.title-row strong {
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.doc-card__text small {
  color: #50545d;
  font-size: 10.5px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: 800;
}

.status-pill--green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.status-pill--blue {
  background: #dce7ff;
  color: #003178;
}

.status-pill--amber {
  background: #fff3cd;
  color: #8a5a00;
}

.btn-ganti {
  flex: none;
  font-size: 11.5px;
  font-weight: 700;
  color: #0b4fa6;
}

.info-note {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  background: #eef5ff;
  color: #003178;
  font-size: 11px;
  font-weight: 600;
}

.info-note ion-icon {
  font-size: 16px;
  color: #0b4fa6;
}

/* ---------- Thumbnail Preview ---------- */

.thumbnail-preview {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #d2d7e2;
  overflow: hidden;
  background: #191c1e;
}

.thumbnail-preview__img-wrap {
  position: relative;
  width: 100%;
  height: 160px;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
}

.thumbnail-overlay {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.res-tag {
  display: inline-block;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  width: max-content;
}

.thumbnail-overlay strong {
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  line-height: 18px;
}

.cam-fab {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.cam-fab ion-icon {
  font-size: 16px;
}

.thumbnail-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f4f6fa;
  font-size: 10.5px;
  color: #50545d;
}

.dot-green {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.link-blue {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  color: #0b4fa6;
}

/* ---------- Action Buttons ---------- */

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}

.btn-primary {
  background: #002256;
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 34, 86, 0.25);
}

.btn-primary ion-icon {
  font-size: 18px;
}

.btn-secondary {
  background: #fff;
  border: 1px solid #aeb4c1;
  color: #3d4452;
}

/* ---------- Bottom Navigation Bar ---------- */

.bottom-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  width: 48px;
  height: 28px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}

.bottom-nav__pill ion-icon {
  font-size: 18px;
}

.bottom-nav__item small {
  font-size: 10px;
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
```[cite: 7]