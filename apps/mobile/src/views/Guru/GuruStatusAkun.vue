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
              <strong>Status Akun Guru</strong>
              <span>SIKARYA Dikda Sulut</span>
            </div>
          </div>

          <span class="status status-gold">
            <ion-icon :icon="hourglassOutline" />
            Menunggu Verifikasi
          </span>
        </header>

        <main class="main">

          <!-- Status tinjauan -->
          <section class="review">
            <div class="review__icon">
              <ion-icon :icon="folderOpenOutline" />
            </div>

            <h1>Berkas Pengajuan Sedang Ditinjau</h1>

            <p>
              Data Dapodik dan SK Penugasan Anda sedang dalam antrean verifikasi oleh Verifikator
              Dinas Pendidikan Daerah Provinsi Sulawesi Utara (Cabdin).
            </p>

            <div class="stage">
              <ion-icon :icon="timeOutline" class="stage__icon" />

              <div class="stage__text">
                <strong>Tahap Verifikasi</strong>
                <span>{{ pengajuan.tahap }}</span>
              </div>

              <span class="queue">Antrean #{{ pengajuan.antrean }}</span>
            </div>
          </section>

          <!-- Identitas pengajuan -->
          <section class="panel">
            <div class="panel__head">
              <h2>
                <ion-icon :icon="idCardOutline" />
                Identitas Pengajuan
              </h2>
              <span class="reg-id">#{{ pengajuan.noReg }}</span>
            </div>

            <dl class="data">
              <div>
                <dt>Nama Guru Pembimbing</dt>
                <dd>{{ pengajuan.nama }}</dd>
              </div>

              <div>
                <dt>NIP / NUPTK</dt>
                <dd>{{ pengajuan.nip }}</dd>
              </div>

              <div>
                <dt>Unit Kerja (Sekolah)</dt>
                <dd class="school">
                  <ion-icon :icon="schoolOutline" />
                  {{ pengajuan.sekolah }}
                </dd>
              </div>

              <div>
                <dt>Dokumen Terlampir</dt>
                <dd>
                  <div class="file">
                    <ion-icon :icon="documentTextOutline" class="file__icon" />

                    <div class="file__text">
                      <strong>{{ pengajuan.berkas.nama }}</strong>
                      <small>{{ pengajuan.berkas.ukuran }} • PDF Dokumen</small>
                    </div>

                    <button type="button" class="file__view" aria-label="Lihat dokumen" @click="lihatBerkas">
                      <ion-icon :icon="eyeOutline" />
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </section>

          <!-- Info -->
          <section class="info" role="note">
            <ion-icon :icon="informationCircleOutline" />

            <p>
              Hasil verifikasi akan menentukan hak akses Anda ke Portal Pengunggahan &amp; Kurasi
              Karya Siswa. Estimasi <strong>1–2 hari kerja</strong>.
            </p>
          </section>

          <!-- Aksi -->
          <div class="actions">
            <button
              type="button"
              class="btn-validate"
              :disabled="memuat"
              :aria-busy="memuat"
              @click="cekStatus"
            >
              <ion-icon :icon="refreshOutline" :class="{ spin: memuat }" />
              {{ memuat ? 'Memeriksa Status...' : 'Cek Status Terbaru (Refresh)' }}
            </button>

            <button type="button" class="btn-soft" @click="hubungiHelpdesk">
              <ion-icon :icon="headsetOutline" />
              Hubungi Helpdesk Cabdin Sulut
            </button>

            <button type="button" class="btn-outline" @click="keluar">
              <ion-icon :icon="logOutOutline" />
              Keluar / Logout
            </button>
          </div>

          <footer class="foot">
            <span>Dinas Pendidikan Daerah Provinsi Sulawesi Utara</span>
            <small>Sistem Informasi Karya &amp; Prestasi Vokasi/Akademik</small>
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  hourglassOutline,
  folderOpenOutline,
  timeOutline,
  idCardOutline,
  schoolOutline,
  documentTextOutline,
  eyeOutline,
  informationCircleOutline,
  refreshOutline,
  headsetOutline,
  logOutOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data dari API status pendaftaran
const pengajuan = {
  noReg: 'REG-GURU-2025-0194',
  tahap: 'Admin Cabang Dinas Wilayah I',
  antrean: 14,
  nama: 'Dra. Meiske Lumintang, M.Pd',
  nip: '19740812 199903 2 004',
  sekolah: 'SMA Negeri 1 Manado',
  berkas: { nama: 'SK_Pembimbing_Resmi.pdf', ukuran: '1.2 MB' }
};

const memuat = ref(false);

async function cekStatus() {
  if (memuat.value) return;
  memuat.value = true;

  try {
    // TODO: panggil API status pendaftaran, lalu perbarui `pengajuan`.
    // Jika status sudah disetujui, arahkan ke beranda guru.
  } finally {
    memuat.value = false;
  }
}

function lihatBerkas() {
  // TODO: buka pratinjau dokumen terlampir
  console.log('lihat berkas');
}

function hubungiHelpdesk() {
  // TODO: buka kontak helpdesk Cabdin Sulut
  console.log('hubungi helpdesk');
}

function keluar() {
  // TODO: hapus sesi login lalu arahkan ke halaman login
  console.log('keluar');
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
p,
dl,
dd {
  margin: 0;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

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
  font-size: 17px;
  line-height: 21px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 11px;
  color: #3d4452;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.status ion-icon {
  font-size: 15px;
}

.status-gold {
  background: #ffefc2;
  color: #7a4b00;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 28px;
}

/* ---------- Kartu tinjauan ---------- */

.review {
  padding: 22px 18px 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
  text-align: center;
}

.review__icon {
  width: 68px;
  height: 68px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #cfe3fb;
  color: #003178;
}

.review__icon ion-icon {
  font-size: 34px;
}

.review h1 {
  margin-top: 14px;
  font-size: 17px;
  line-height: 24px;
  font-weight: 800;
}

.review > p {
  margin-top: 8px;
  font-size: 13px;
  line-height: 24px;
  color: #3d4452;
}

.stage {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #eceef2;
  text-align: left;
}

.stage__icon {
  font-size: 24px;
  color: #00639a;
}

.stage__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.stage__text strong {
  font-size: 12px;
}

.stage__text span {
  font-size: 12px;
  color: #3d4452;
}

.queue {
  flex: none;
  padding: 5px 12px;
  border-radius: 8px;
  background: #e8ebf0;
  color: #50545d;
  font-size: 11px;
  font-weight: 600;
}

/* ---------- Identitas ---------- */

.panel {
  padding: 14px 16px 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eceef2;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
}

.panel__head h2 ion-icon {
  font-size: 24px;
  color: #003178;
}

.reg-id {
  flex: none;
  font-size: 11px;
  font-weight: 700;
  color: #0b4fa6;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
}

.data dt {
  font-size: 11px;
  color: #50545d;
}

.data dd {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 700;
}

.data dd.school {
  display: flex;
  align-items: center;
  gap: 8px;
}

.data dd.school ion-icon {
  font-size: 22px;
  color: #00639a;
}

.file {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding: 12px;
  border-radius: 10px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.file__icon {
  font-size: 26px;
  color: #ba1a1a;
}

.file__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.file__text strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}

.file__text small {
  font-size: 11px;
  font-weight: 400;
  color: #50545d;
}

.file__view {
  display: flex;
  padding: 6px;
  color: #00639a;
}

.file__view ion-icon {
  font-size: 24px;
}

/* ---------- Info ---------- */

.info {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  background: #dcedfd;
  border: 1px solid #bcd7f0;
}

.info ion-icon {
  margin-top: 1px;
  font-size: 22px;
  color: #00639a;
}

.info p {
  font-size: 12px;
  line-height: 21px;
  color: #3d4452;
}

.info strong {
  color: #003178;
}

/* ---------- Tombol ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
}

.actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 50px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.actions ion-icon {
  font-size: 22px;
}

.btn-validate {
  background: #0d47a1;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 49, 120, .18);
}

.btn-validate:disabled {
  opacity: .7;
  cursor: progress;
}

.btn-soft {
  background: #cfe3fb;
  color: #003178;
}

.btn-outline {
  border: 1px solid #aeb4c1;
  background: #fff;
  color: #191c1e;
}

.actions button:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

.spin {
  animation: putar 1s linear infinite;
}

@keyframes putar {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spin {
    animation: none;
  }
}

/* ---------- Footer ---------- */

.foot {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  text-align: center;
  font-size: 11px;
  line-height: 18px;
  color: #50545d;
}

.foot small {
  font-size: 11px;
  color: #a7b0bd;
}

</style>