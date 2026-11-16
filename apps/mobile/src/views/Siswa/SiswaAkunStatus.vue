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
              <span>SIKARYA DIKDA SULUT</span>
              <strong>Status Akun Siswa</strong>
            </div>
          </div>

          <span class="status status-gold">
            <i class="dot"></i>
            Menunggu Verifikasi
          </span>
        </header>

        <main class="main">

          <!-- Status tinjauan -->
          <section class="review">
            <div class="review__tile">
              <ion-icon :icon="hourglass" />
              <span class="review__badge"><ion-icon :icon="ellipsisHorizontalCircleOutline" /></span>
            </div>

            <span class="status status-gold status-lg">
              <ion-icon :icon="timeOutline" />
              Sedang Ditinjau
            </span>

            <h1>Pendaftaran Berhasil Diajukan</h1>

            <p>
              Akun Anda sedang dalam proses verifikasi oleh Guru Pembimbing di
              <strong>{{ pengajuan.sekolah }}</strong>. Proses biasanya membutuhkan waktu 1×24
              jam kerja.
            </p>
          </section>

          <!-- Ringkasan -->
          <section class="panel">
            <div class="panel__head">
              <h2>
                <ion-icon :icon="idCardOutline" />
                Ringkasan Data Siswa
              </h2>

              <span class="locked">
                <ion-icon :icon="lockClosedOutline" />
                Terkunci
              </span>
            </div>

            <dl class="data">
              <div>
                <dt>Nomor Tiket</dt>
                <dd><code>#{{ pengajuan.tiket }}</code></dd>
              </div>

              <div>
                <dt>Nama Siswa</dt>
                <dd class="strong">{{ pengajuan.nama }}</dd>
              </div>

              <div>
                <dt>NISN</dt>
                <dd>{{ pengajuan.nisn }}</dd>
              </div>

              <div>
                <dt>Sekolah</dt>
                <dd>{{ pengajuan.sekolah }}</dd>
              </div>

              <div class="data__teacher">
                <dt>Guru Verifikator</dt>
                <dd class="teacher">
                  <ion-icon :icon="personOutline" />
                  {{ pengajuan.guru }}
                </dd>
              </div>
            </dl>
          </section>

          <!-- Info -->
          <section class="info" role="note">
            <span class="info__icon"><ion-icon :icon="informationCircleOutline" /></span>

            <div>
              <strong>Estimasi Selesai 1×24 Jam</strong>
              <p>
                Notifikasi WhatsApp otomatis atau pesan di portal ini akan dikirim segera setelah
                berkas disetujui oleh guru pembimbing Anda.
              </p>
            </div>
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
              <ion-icon :icon="syncOutline" :class="{ spin: memuat }" />
              {{ memuat ? 'Memeriksa Status...' : 'Perbarui Status (Refresh)' }}
            </button>

            <div class="actions__row">
              <button type="button" class="btn-gray" @click="hubungiGuru">
                <ion-icon :icon="chatboxEllipsesOutline" />
                Hubungi Guru
              </button>

              <button type="button" class="btn-gray" @click="keluar">
                <ion-icon :icon="logOutOutline" />
                Keluar Akun
              </button>
            </div>
          </div>

          <footer class="foot">Dinas Pendidikan Daerah Provinsi Sulawesi Utara</footer>

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
  hourglass,
  ellipsisHorizontalCircleOutline,
  timeOutline,
  idCardOutline,
  lockClosedOutline,
  personOutline,
  informationCircleOutline,
  syncOutline,
  chatboxEllipsesOutline,
  logOutOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data dari API status pendaftaran siswa
const pengajuan = {
  tiket: 'REG-SISWA-2025-0842',
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  sekolah: 'SMA Negeri 1 Manado',
  guru: 'Dra. Meiske Lumintang, M.Pd'
};

const memuat = ref(false);

async function cekStatus() {
  if (memuat.value) return;
  memuat.value = true;

  try {
    // TODO: panggil API status pendaftaran, lalu perbarui `pengajuan`.
    // Jika sudah disetujui, arahkan siswa ke beranda.
  } finally {
    memuat.value = false;
  }
}

function hubungiGuru() {
  // TODO: buka WhatsApp / pesan portal ke guru verifikator
  console.log('hubungi guru');
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

.brand__text span {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .6px;
  color: #00639a;
}

.brand__text strong {
  font-size: 17px;
  line-height: 21px;
  font-weight: 800;
  color: #003178;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 28px;
}

/* ---------- Pill ---------- */

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.status-gold {
  background: #ffe9bf;
  color: #4a3000;
}

.status-lg {
  padding: 7px 16px;
  font-size: 12px;
}

.status ion-icon {
  font-size: 15px;
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f0a30a;
}

/* ---------- Kartu tinjauan ---------- */

.review {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 18px 20px;
  border-radius: 20px;
  background:
    linear-gradient(
      160deg,
      #ffffff 55%,
      #eaf2fd 100%
    );
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
  text-align: center;
}

.review__tile {
  position: relative;
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #deeafc;
  color: #003178;
}

.review__tile > ion-icon {
  font-size: 34px;
}

.review__badge {
  position: absolute;
  right: -14px;
  bottom: -6px;
  width: 30px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 12px 12px 4px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
  color: #f0a30a;
}

.review__badge ion-icon {
  font-size: 22px;
}

.review .status {
  margin-top: 18px;
}

.review h1 {
  margin-top: 16px;
  font-size: 21px;
  line-height: 28px;
  font-weight: 800;
  color: #003178;
}

.review p {
  margin-top: 12px;
  font-size: 13px;
  line-height: 25px;
  color: #3d4452;
}

.review p strong {
  color: #191c1e;
}

/* ---------- Ringkasan ---------- */

.panel {
  padding: 16px;
  border-radius: 20px;
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
  border-bottom: 1px solid #e3e6ec;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #003178;
}

.panel__head h2 ion-icon {
  font-size: 24px;
}

.locked {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #606572;
}

.locked ion-icon {
  font-size: 14px;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.data > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
}

.data dt {
  color: #50545d;
}

.data dd {
  text-align: right;
  color: #191c1e;
}

.data dd.strong {
  font-size: 14px;
  font-weight: 700;
}

.data code {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  background: #eaf2fd;
  color: #0b4fa6;
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  font-size: 11px;
  font-weight: 700;
}

.data__teacher {
  margin-top: 2px;
  padding-top: 12px;
  border-top: 1px dashed #c3c9d6;
}

.teacher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: #0b4fa6 !important;
}

.teacher ion-icon {
  font-size: 16px;
}

/* ---------- Info ---------- */

.info {
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  background: #eaf2fd;
  border: 1px solid #bcd7f0;
}

.info__icon {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #00639a;
  color: #fff;
}

.info strong {
  font-size: 14px;
  font-weight: 600;
  color: #00507d;
}

.info p {
  margin-top: 4px;
  font-size: 12px;
  line-height: 19px;
  color: #3d4452;
}

/* ---------- Tombol ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.btn-validate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 54px;
  border-radius: 14px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-validate:disabled {
  opacity: .7;
  cursor: progress;
}

.btn-validate ion-icon {
  font-size: 22px;
}

.actions__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btn-gray {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  border-radius: 12px;
  background: #eceff3;
  border: 1px solid #dfe2e8;
  color: #191c1e;
  font-size: 12px;
  font-weight: 600;
}

.btn-gray ion-icon {
  font-size: 18px;
}

.btn-validate:focus-visible,
.btn-gray:focus-visible,
.icon-btn:focus-visible {
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
  margin-top: 18px;
  text-align: center;
  font-size: 12px;
  color: #747985;
}

</style>