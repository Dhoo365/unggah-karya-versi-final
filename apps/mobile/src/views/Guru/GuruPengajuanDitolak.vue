<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Tutup" @click="router.back()">
              <ion-icon :icon="closeOutline" />
            </button>

            <div class="brand__text">
              <strong>Status Pengajuan Akun</strong>
              <span>SIKARYA Dikda Sulut</span>
            </div>
          </div>

          <span class="status status-gray">
            <ion-icon :icon="shieldOutline" />
            ID: #{{ keputusan.id }}
          </span>
        </header>

        <main class="main">

          <!-- Hero -->
          <section class="hero">
            <div class="hero__ring">
              <div class="hero__icon">
                <ion-icon :icon="closeCircleOutline" />
              </div>
            </div>

            <span class="status status-red">
              <i class="dot"></i>
              Status: Pendaftaran Guru Ditolak
            </span>

            <h1>Pengajuan Akun Guru Tidak Disetujui</h1>

            <p>
              Mohon maaf, pengajuan registrasi akun pendidik/guru pembimbing Anda tidak dapat
              disetujui oleh Tim Verifikator Cabang Dinas Pendidikan Provinsi Sulawesi Utara.
            </p>
          </section>

          <!-- Keputusan -->
          <section class="decision">
            <div class="decision__head">
              <div class="decision__icon">
                <ion-icon :icon="businessOutline" />
              </div>

              <div>
                <small>Otoritas Verifikator Resmi</small>
                <strong>{{ keputusan.verifikator }}</strong>
              </div>
            </div>

            <div class="decision__date">
              <span>
                <ion-icon :icon="calendarOutline" />
                Tanggal Keputusan
              </span>
              <strong>{{ keputusan.tanggal }}</strong>
            </div>

            <div class="reason">
              <div class="reason__title">
                <ion-icon :icon="warningOutline" />
                Alasan Resmi Penolakan:
              </div>

              <p>“{{ keputusan.alasan }}”</p>
            </div>

            <h2 class="label">DETAIL DATA PENGAJUAN</h2>

            <dl class="detail">
              <div>
                <dt>Nama Lengkap PTK</dt>
                <dd>{{ pengajuan.nama }}</dd>
              </div>

              <div>
                <dt>NUPTK Terdaftar</dt>
                <dd class="mono">{{ pengajuan.nuptk }}</dd>
              </div>

              <div>
                <dt>Asal Satuan Pendidikan</dt>
                <dd>{{ pengajuan.sekolah }}</dd>
              </div>

              <div>
                <dt>
                  <ion-icon :icon="attachOutline" class="clip" />
                  Dokumen Bermasalah
                </dt>
                <dd class="doc">
                  <span>{{ pengajuan.dokumen }}</span>
                  <em>Kedaluwarsa</em>
                </dd>
              </div>
            </dl>
          </section>

          <!-- Langkah perbaikan -->
          <section class="panel">
            <h2 class="panel__title">
              <span class="panel__icon"><ion-icon :icon="bulbOutline" /></span>
              Langkah Perbaikan &amp; Rekomendasi
            </h2>

            <ol class="steps">
              <li v-for="(s, i) in langkah" :key="s.judul" class="step">
                <span class="step__no">{{ i + 1 }}</span>

                <div>
                  <strong>{{ s.judul }}</strong>
                  <p>{{ s.isi }}</p>
                </div>
              </li>
            </ol>
          </section>

          <!-- Aksi -->
          <div class="actions">
            <button type="button" class="btn-validate" @click="daftarUlang">
              <ion-icon :icon="refreshOutline" />
              Daftar Ulang Akun Guru
            </button>

            <button type="button" class="btn-soft" @click="hubungiHelpdesk">
              <ion-icon :icon="headsetOutline" />
              Hubungi Helpdesk Cabang Dinas
            </button>

            <button type="button" class="link" @click="keLogin">
              <ion-icon :icon="arrowBack" />
              Kembali ke Halaman Masuk
            </button>
          </div>

          <footer class="foot">
            <strong>
              <ion-icon :icon="businessOutline" />
              Pemerintah Provinsi Sulawesi Utara
            </strong>

            <span>
              Dinas Pendidikan Daerah Provinsi Sulawesi Utara • Bidang GTK &amp; Cabdin
            </span>

            <code>SIKARYA v2.4.0 • Terintegrasi Pusdatin &amp; SIM-GTK Sulut</code>
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  closeOutline,
  shieldOutline,
  closeCircleOutline,
  businessOutline,
  calendarOutline,
  warningOutline,
  attachOutline,
  bulbOutline,
  refreshOutline,
  headsetOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data dari API keputusan verifikasi
const keputusan = {
  id: 'VER-8492',
  verifikator: 'Tim Verifikator Cabang Dinas Bitung / Manado',
  tanggal: '24 Okt 2025 • 11:30 WITA',
  alasan:
    'SK Penugasan Kepala Sekolah yang diunggah tidak valid / telah melewati batas masa berlaku tahun berjalan 2024/2025, serta NUPTK belum sinkron dengan Pangkalan Data Master PTK Dikda Sulut.'
};

const pengajuan = {
  nama: 'Dra. Meiske Lumintang, M.Pd',
  nuptk: '8439 2019 4820 1948',
  sekolah: 'SMKN 2 Bitung',
  dokumen: 'SK_Pembimbing_2023.pdf'
};

const langkah = [
  {
    judul: 'Perbarui SK Penugasan Pembimbing Lomba',
    isi: 'Pastikan SK ditandatangani Kepala Sekolah dengan stempel basah atau sertifikasi elektronik (BSrE) aktif tahun ajaran 2025.'
  },
  {
    judul: 'Sinkronisasi NUPTK di Dapodik / SIMPATIKA',
    isi: 'Hubungi Operator Satuan Pendidikan (SMKN 2 Bitung) untuk memvalidasi keaktifan status kepegawaian Anda di database kementerian.'
  },
  {
    judul: 'Klarifikasi Langsung atau Bantuan Helpdesk',
    isi: 'Apabila terjadi anomali data, lakukan konfirmasi ke Kantor Cabang Dinas Pendidikan setempat atau hubungi saluran resmi SIKARYA.'
  }
];

function daftarUlang() {
  // TODO: sesuaikan dengan route halaman pendaftaran Anda
  router.push('/daftar-guru');
}

function hubungiHelpdesk() {
  // TODO: buka kontak helpdesk Cabang Dinas
  console.log('hubungi helpdesk');
}

function keLogin() {
  // TODO: sesuaikan dengan route halaman login Anda
  router.push('/login');
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
dd,
ol {
  margin: 0;
}

ol {
  padding: 0;
  list-style: none;
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
  gap: 8px;
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 15px;
  line-height: 19px;
  font-weight: 700;
}

.brand__text span {
  font-size: 11px;
  font-weight: 600;
  color: #0b4fa6;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 14px 28px;
}

/* ---------- Status pill ---------- */

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.status ion-icon {
  font-size: 15px;
}

.status-gray {
  background: #eceff3;
  color: #50545d;
}

.status-red {
  background: #fbdcdc;
  color: #93000a;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ba1a1a;
}

/* ---------- Hero ---------- */

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero__ring {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fde8e8;
  border: 2px solid #f0c0c0;
}

.hero__icon {
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fbd0d0;
  color: #ba1a1a;
}

.hero__icon ion-icon {
  font-size: 44px;
}

.hero .status {
  margin-top: 14px;
}

.hero h1 {
  margin-top: 14px;
  font-size: 20px;
  line-height: 27px;
  font-weight: 700;
}

.hero p {
  margin-top: 10px;
  padding: 0 6px;
  font-size: 13px;
  line-height: 23px;
  color: #3d4452;
}

/* ---------- Keputusan ---------- */

.decision {
  padding: 14px 16px 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  border-left: 4px solid #ba1a1a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.decision__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eceef2;
}

.decision__icon {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #eceff3;
  color: #003178;
}

.decision__icon ion-icon {
  font-size: 24px;
}

.decision__head small {
  display: block;
  font-size: 11px;
  color: #50545d;
}

.decision__head strong {
  display: block;
  margin-top: 2px;
  font-size: 14px;
  line-height: 20px;
}

.decision__date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
}

.decision__date span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #3d4452;
}

.decision__date strong {
  font-weight: 600;
}

.reason {
  margin-top: 14px;
  padding: 14px;
  border-radius: 10px;
  background: #fdeaea;
  border: 1px solid #f0b8b8;
  color: #93000a;
}

.reason__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
}

.reason p {
  margin-top: 8px;
  font-size: 14px;
  line-height: 27px;
}

.label {
  margin-top: 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .3px;
  color: #50545d;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 8px;
  padding: 14px;
  border-radius: 10px;
  background: #eef0f4;
  border: 1px solid #e3e6ec;
}

.detail > div {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.detail dt {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  max-width: 45%;
  font-size: 12px;
  line-height: 17px;
  color: #50545d;
}

.detail dd {
  text-align: right;
  font-size: 12px;
  font-weight: 700;
}

.mono {
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  letter-spacing: .4px;
}

.clip {
  font-size: 14px;
  color: #ba1a1a;
}

.doc {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.doc span {
  color: #ba1a1a;
  font-weight: 600;
}

.doc em {
  padding: 2px 10px;
  border-radius: 10px;
  background: #fbdcdc;
  color: #93000a;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
}

/* ---------- Langkah ---------- */

.panel {
  padding: 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.panel__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
}

.panel__icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #4aa8f0;
  color: #fff;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.step {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: #eef0f4;
}

.step__no {
  width: 26px;
  height: 26px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #003178;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.step strong {
  display: block;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.step p {
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  color: #50545d;
}

/* ---------- Tombol ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.btn-validate,
.btn-soft {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
}

.btn-validate {
  background: #0d47a1;
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-soft {
  background: #deeefc;
  border: 1px solid #b4d3f3;
  color: #003178;
  font-weight: 600;
}

.btn-validate ion-icon,
.btn-soft ion-icon {
  font-size: 20px;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
  padding: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #0b4fa6;
}

.btn-validate:focus-visible,
.btn-soft:focus-visible,
.link:focus-visible,
.icon-btn:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Footer ---------- */

.foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #e3e6ec;
  text-align: center;
  font-size: 11px;
  line-height: 17px;
  color: #3d4452;
}

.foot strong {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #003178;
}

.foot strong ion-icon {
  font-size: 18px;
}

.foot code {
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  font-size: 10px;
  line-height: 16px;
  color: #747985;
}

</style>