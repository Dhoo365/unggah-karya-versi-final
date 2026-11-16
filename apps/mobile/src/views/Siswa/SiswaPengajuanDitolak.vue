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

          <span class="id-badge">
            <small>ID:</small>
            <strong>#{{ keputusan.id }}</strong>
          </span>
        </header>

        <main class="main">

          <!-- Hero -->
          <section class="hero">
            <div class="hero__glow">
              <div class="hero__ring">
                <div class="hero__icon">
                  <ion-icon :icon="closeCircleOutline" />
                </div>
              </div>
            </div>

            <span class="status status-red">
              <i class="dot"></i>
              Status: Pendaftaran Siswa Ditolak
            </span>

            <h1>Pengajuan Akun Siswa Tidak Disetujui</h1>

            <p>
              Mohon maaf, pengajuan registrasi akun siswa Anda tidak dapat disetujui oleh Guru
              Pembimbing / Operator Satuan Pendidikan sekolah Anda.
            </p>
          </section>

          <!-- Keputusan -->
          <section class="decision">
            <div class="decision__head">
              <div class="decision__icon">
                <ion-icon :icon="idCardOutline" />
              </div>

              <div>
                <small>Guru Verifikator Sekolah</small>
                <strong>{{ keputusan.guru }}</strong>
                <span>{{ keputusan.jabatan }}</span>
              </div>
            </div>

            <p class="decision__date">
              <ion-icon :icon="timeOutline" />
              Waktu Keputusan: <strong>{{ keputusan.waktu }}</strong>
            </p>

            <div class="reason">
              <div class="reason__title">
                <ion-icon :icon="warningOutline" />
                ALASAN RESMI PENOLAKAN:
              </div>

              <p>“{{ keputusan.alasan }}”</p>
            </div>

            <h2 class="label">Rincian Data yang Diinputkan:</h2>

            <dl class="detail">
              <div>
                <dt>Nama Lengkap Siswa</dt>
                <dd>{{ pengajuan.nama }}</dd>
              </div>

              <div>
                <dt>NISN Terdaftar</dt>
                <dd class="red">{{ pengajuan.nisn }}</dd>
              </div>

              <div>
                <dt>Rombel / Kelas</dt>
                <dd>{{ pengajuan.rombel }}</dd>
              </div>

              <div>
                <dt>Asal Satuan Pendidikan</dt>
                <dd>{{ pengajuan.sekolah }}</dd>
              </div>

              <div class="detail__file">
                <dt>
                  <ion-icon :icon="documentOutline" />
                  Berkas Bermasalah
                </dt>

                <dd class="file">
                  <span>{{ pengajuan.berkas }}</span>
                  <em>Tidak Valid / Fiktif</em>
                </dd>
              </div>
            </dl>
          </section>

          <!-- Langkah penyelesaian -->
          <section class="panel">
            <h2 class="panel__title">
              <span class="panel__icon"><ion-icon :icon="bulbOutline" /></span>
              Langkah Penyelesaian &amp; Rekomendasi
            </h2>

            <ol class="steps">
              <li v-for="(s, i) in langkah" :key="i" class="step">
                <span class="step__no">{{ i + 1 }}</span>

                <p v-html="s"></p>
              </li>
            </ol>
          </section>

          <!-- Aksi -->
          <div class="actions">
            <button type="button" class="btn-validate" @click="daftarUlang">
              <ion-icon :icon="refreshOutline" />
              Daftar Ulang Akun Siswa
            </button>

            <button type="button" class="btn-outline" @click="hubungiGuru">
              <ion-icon :icon="chatboxEllipsesOutline" />
              Hubungi Guru Pembimbing via WhatsApp
            </button>

            <button type="button" class="link" @click="keLogin">Kembali ke Halaman Masuk</button>
          </div>

          <footer class="foot">
            <span>Dinas Pendidikan Daerah Provinsi Sulawesi Utara • Cabang Dinas Manado</span>
            <small>SIKARYA Dikda Sulut v2.4.0 • Terintegrasi Dapodikdasmen</small>
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
  closeOutline,
  closeCircleOutline,
  idCardOutline,
  timeOutline,
  warningOutline,
  documentOutline,
  bulbOutline,
  refreshOutline,
  chatboxEllipsesOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data dari API keputusan verifikasi
const keputusan = {
  id: 'REG-SISWA-4920',
  guru: 'Dra. Meiske Lumintang, M.Pd',
  jabatan: 'Guru Pembimbing SMAN 1 Manado',
  waktu: '24 Okt 2025 • 11:45 WITA',
  alasan:
    'Data NISN (0078 4920 11) dan berkas Kartu Pelajar yang diunggah tidak terdaftar dalam pangkalan data siswa aktif semester berjalan di SMAN 1 Manado. Ditemukan ketidaksesuaian identitas dengan arsip buku induk sekolah.'
};

const pengajuan = {
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  rombel: 'XII IPA 1',
  sekolah: 'SMAN 1 Manado',
  berkas: 'Kartu_Pelajar_Scan.pdf'
};

// Teks statis milik aplikasi (bukan input pengguna), jadi aman dirender dengan <strong>
const langkah = [
  'Konfirmasi ke Bagian Tata Usaha (TU) SMAN 1 Manado untuk memeriksa status keaktifan NISN pada sistem Dapodik sekolah.',
  'Minta Surat Keterangan Siswa Aktif resmi bertanda tangan Kepala Sekolah jika Anda merupakan siswa mutasi baru yang belum tersinkronisasi.',
  '<strong>Lakukan Pendaftaran Ulang</strong> dengan memasukkan NISN yang valid serta scan kartu pelajar asli setelah data diperbaiki oleh pihak sekolah.'
];

function daftarUlang() {
  // TODO: sesuaikan dengan route halaman pendaftaran siswa Anda
  router.push('/daftar-siswa');
}

function hubungiGuru() {
  // TODO: buka WhatsApp guru pembimbing, mis. https://wa.me/<nomor>
  console.log('hubungi guru pembimbing');
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
  font-size: 17px;
  line-height: 23px;
  font-weight: 500;
}

.brand__text span {
  font-size: 11px;
  font-weight: 700;
  color: #003f91;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 26px;
}

.id-badge {
  flex: none;
  max-width: 156px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  background: #eceff3;
  border: 1px solid #d4d9e2;
}

.id-badge small {
  font-size: 11px;
  color: #606572;
}

.id-badge strong {
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  font-size: 11px;
  line-height: 14px;
  color: #003f91;
  word-break: break-all;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px 14px 28px;
}

/* ---------- Pill ---------- */

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-red {
  background: #fbdcdc;
  border: 1px solid #f0b8b8;
  color: #93000a;
}

.dot {
  width: 9px;
  height: 9px;
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

.hero__glow {
  width: 104px;
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fdeaea;
}

.hero__ring {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f8cfcf;
}

.hero__icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ba1a1a;
  color: #fff;
  box-shadow: 0 3px 10px rgba(186, 26, 26, .35);
}

.hero__icon ion-icon {
  font-size: 40px;
}

.hero .status {
  margin-top: 8px;
}

.hero h1 {
  margin-top: 14px;
  font-size: 21px;
  line-height: 28px;
  font-weight: 500;
}

.hero p {
  margin-top: 10px;
  padding: 0 6px;
  font-size: 13px;
  line-height: 22px;
  color: #3d4452;
}

/* ---------- Keputusan ---------- */

.decision {
  padding: 16px;
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
  width: 42px;
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #dce7ff;
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
  margin-top: 1px;
  font-size: 15px;
  line-height: 20px;
}

.decision__head span {
  font-size: 11px;
  color: #0b4fa6;
}

.decision__date {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
  color: #50545d;
}

.decision__date ion-icon {
  font-size: 16px;
}

.decision__date strong {
  font-weight: 500;
  color: #191c1e;
}

.reason {
  margin-top: 14px;
  padding: 14px;
  border-radius: 10px;
  background: #fdeaea;
  border: 1px solid #f0b8b8;
}

.reason__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .2px;
  color: #93000a;
}

.reason p {
  margin-top: 10px;
  padding: 12px;
  border-radius: 8px;
  background: #fff8f8;
  border: 1px solid #f5d0d0;
  font-size: 12px;
  line-height: 21px;
  color: #3d1b1b;
}

.label {
  margin-top: 16px;
  font-size: 12px;
  font-weight: 600;
  color: #191c1e;
}

.detail {
  margin-top: 8px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #dfe2e8;
  background: #f4f6f9;
}

.detail > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  font-size: 12px;
}

.detail > div + div {
  border-top: 1px solid #e3e6ec;
}

.detail dt {
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 45%;
  color: #50545d;
}

.detail dd {
  text-align: right;
  font-weight: 500;
}

.detail dd.red {
  font-weight: 700;
  color: #ba1a1a;
}

.detail__file {
  background: #f0f2f5;
}

.detail__file dt ion-icon {
  font-size: 16px;
  color: #ba1a1a;
}

.file {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file span {
  font-size: 11px;
}

.file em {
  width: 54px;
  height: 54px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ba1a1a;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 12px;
  text-align: center;
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
  font-weight: 600;
}

.panel__icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #e1f0ff;
  color: #003178;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 16px;
}

.step {
  display: flex;
  gap: 12px;
}

.step__no {
  width: 26px;
  height: 26px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #dce7ff;
  color: #003178;
  font-size: 12px;
  font-weight: 700;
}

.step p {
  font-size: 12px;
  line-height: 19px;
  color: #3d4452;
}

.step p :deep(strong) {
  color: #191c1e;
}

/* ---------- Tombol ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.btn-validate,
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  border-radius: 10px;
  font-weight: 600;
}

.btn-validate {
  min-height: 52px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-outline {
  min-height: 50px;
  border: 2px solid #0d47a1;
  background: #fff;
  color: #003178;
  font-size: 13px;
}

.btn-validate ion-icon,
.btn-outline ion-icon {
  font-size: 20px;
}

.link {
  padding: 12px 8px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
}

.btn-validate:focus-visible,
.btn-outline:focus-visible,
.link:focus-visible,
.icon-btn:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Footer ---------- */

.foot {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid #e3e6ec;
  text-align: center;
  font-size: 11px;
  line-height: 15px;
  color: #3d4452;
}

.foot small {
  font-size: 11px;
  color: #606572;
}

</style>