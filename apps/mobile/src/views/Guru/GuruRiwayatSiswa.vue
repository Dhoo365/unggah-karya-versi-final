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
              <strong>Riwayat Portofolio Siswa</strong>
              <span>SMP Negeri 1 Manado • SIKARYA Dikda Sulut</span>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Menu lainnya">
            <ion-icon :icon="ellipsisVertical" />
          </button>
        </header>

        <main class="main">

          <!-- Profil siswa -->
          <section class="profile">
            <div class="profile__top">
              <div class="profile__avatar">{{ inisial }}</div>

              <div class="profile__text">
                <div class="profile__name">
                  <h1>{{ siswa.nama }}</h1>
                  <span class="status status-green"><i class="dot"></i> {{ siswa.status }}</span>
                </div>

                <p>NISN: {{ siswa.nisn }} <i class="sep"></i> Kelas: {{ siswa.kelas }}</p>

                <p class="profile__minat">
                  <ion-icon :icon="schoolOutline" />
                  {{ siswa.peminatan }}
                </p>
              </div>
            </div>

            <div class="stats">
              <div class="stat">
                <strong class="c-navy">{{ statistik.diikuti }}</strong>
                <span>Lomba Diikuti</span>
              </div>

              <div class="stat">
                <strong class="c-blue">{{ statistik.penjurian }}</strong>
                <span>Dalam Penjurian</span>
              </div>

              <div class="stat">
                <strong class="c-orange">{{ statistik.juara }}</strong>
                <span>Lolos Juara</span>
              </div>
            </div>
          </section>

          <!-- Tab -->
          <div class="segment" role="tablist">
            <button
              type="button"
              role="tab"
              :aria-selected="tab === 'karya'"
              :class="{ active: tab === 'karya' }"
              @click="tab = 'karya'"
            >
              <ion-icon :icon="folderOpenOutline" />
              Karya &amp; Lomba ({{ lomba.length }})
            </button>

            <button
              type="button"
              role="tab"
              :aria-selected="tab === 'audit'"
              :class="{ active: tab === 'audit' }"
              @click="tab = 'audit'"
            >
              <ion-icon :icon="receiptOutline" />
              Log Audit Status
            </button>
          </div>

          <!-- Karya & Lomba -->
          <template v-if="tab === 'karya'">

            <div class="section-head">
              <h2>Daftar Partisipasi Kompetisi</h2>
              <small>Tahun Ajaran 2024/2025</small>
            </div>

            <article v-for="l in lomba" :key="l.id" class="card">

              <div class="card__head">
                <span class="event">
                  <ion-icon :icon="l.icon" />
                  {{ l.kompetisi }}
                </span>

                <span class="status" :class="l.tipe === 'juara' ? 'status-gold' : 'status-amber'">
                  <ion-icon v-if="l.tipe === 'juara'" :icon="trophyOutline" />
                  {{ l.label }}
                </span>
              </div>

              <h3>{{ l.judul }}</h3>

              <p class="date">
                <ion-icon :icon="calendarOutline" />
                Tanggal Submisi: <strong>{{ l.tanggal }}</strong>
              </p>

              <!-- Dalam penjurian -->
              <template v-if="l.tipe === 'proses'">
                <div class="score score--gray">
                  <ion-icon :icon="chatboxEllipsesOutline" />
                  <p>
                    <strong>Skor Sementara: {{ l.skor }}</strong> • Catatan: {{ l.catatan }}
                  </p>
                </div>

                <div class="card__foot card__foot--end">
                  <button type="button" class="btn-outline" @click="lihatDetail(l)">
                    Lihat Detail Submisi
                    <ion-icon :icon="arrowForward" />
                  </button>
                </div>
              </template>

              <!-- Juara -->
              <template v-else>
                <div class="score score--green">
                  <ion-icon :icon="checkmarkCircleOutline" />
                  <span>Validasi Dikda Sulut: Selesai</span>
                  <strong>Skor Akhir: {{ l.skor }}</strong>
                </div>

                <div class="card__foot">
                  <small>No. Reg: {{ l.noReg }}</small>

                  <button type="button" class="btn-gold" @click="unduhSertifikat(l)">
                    <ion-icon :icon="downloadOutline" />
                    Unduh E-Sertifikat
                  </button>
                </div>
              </template>

            </article>

            <!-- Catatan pembimbing -->
            <section class="panel">
              <h2 class="panel__title">
                <ion-icon :icon="personCircleOutline" />
                Catatan Guru Pembimbing
              </h2>

              <blockquote class="note">
                <p>“{{ catatanGuru.isi }}”</p>

                <footer>
                  <span>{{ catatanGuru.nama }}</span>
                  <small>Diperbarui: {{ catatanGuru.tanggal }}</small>
                </footer>
              </blockquote>
            </section>

          </template>

          <!-- Log audit -->
          <template v-else>

            <div class="section-head">
              <h2>Riwayat Perubahan Status</h2>
              <span class="status status-green">Audit Trail Terverifikasi</span>
            </div>

            <ol class="timeline">
              <li v-for="(r, i) in log" :key="r.tanggal" class="tl" :class="'tl--' + i">
                <span class="tl__dot"></span>

                <div class="tl__body">
                  <div class="tl__top">
                    <strong>{{ r.tanggal }}</strong>
                    <time>{{ r.jam }}</time>
                  </div>

                  <p class="tl__status">{{ r.status }}</p>
                  <p class="tl__by">{{ r.oleh }}</p>
                </div>
              </li>
            </ol>

          </template>

          <!-- Aksi -->
          <div class="actions">
            <button type="button" class="btn-validate" @click="cetakRekap">
              <ion-icon :icon="documentsOutline" />
              Cetak Rekap Portofolio (PDF)
            </button>

            <button type="button" class="btn-outline btn-outline--block" @click="kembaliKeDaftar">
              <ion-icon :icon="arrowBack" />
              Kembali ke Daftar Siswa
            </button>
          </div>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  arrowForward,
  ellipsisVertical,
  schoolOutline,
  folderOpenOutline,
  receiptOutline,
  calendarOutline,
  colorPaletteOutline,
  bulbOutline,
  trophyOutline,
  chatboxEllipsesOutline,
  checkmarkCircleOutline,
  downloadOutline,
  personCircleOutline,
  documentsOutline
} from 'ionicons/icons';

const router = useRouter();

const tab = ref<'karya' | 'audit'>('karya');

// TODO: ganti dengan data siswa dari API
const siswa = {
  nama: 'Andi Pratama',
  status: 'Aktif',
  nisn: '123456',
  kelas: 'IX-A',
  peminatan: 'Peminatan Seni Kriya & Riset Vokasi'
};

const lomba = [
  {
    id: 1,
    tipe: 'proses',
    icon: colorPaletteOutline,
    kompetisi: 'FLS2N 2025 • Seni Kriya Nusantara',
    label: 'Tahap 2: Verifikasi Cabdin',
    judul: 'Miniatur Rumah Adat Minahasa Berbahan Bambu Daur Ulang',
    tanggal: '12 Okt 2025',
    skor: '88.5',
    catatan: 'Berkas portofolio lengkap & orisinalitas terverifikasi.'
  },
  {
    id: 2,
    tipe: 'juara',
    icon: bulbOutline,
    kompetisi: 'Olimpiade Kreativitas Remaja',
    label: 'Juara 2 Tingkat Provinsi',
    judul: 'Aplikasi Edukasi Konservasi Terumbu Karang Bunaken',
    tanggal: '24 Nov 2024',
    skor: '94.2',
    noReg: 'SIK-2024–MND-091'
  }
];

const statistik = computed(() => ({
  diikuti: lomba.length,
  penjurian: lomba.filter((l) => l.tipe === 'proses').length,
  juara: lomba.filter((l) => l.tipe === 'juara').length
}));

const inisial = computed(() =>
  siswa.nama
    .split(' ')
    .map((k) => k[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
);

const catatanGuru = {
  isi: 'Siswa menunjukkan konsistensi tinggi dalam bidang kerajinan & teknologi lokal. Direkomendasikan untuk seleksi FLS2N tingkat nasional.',
  nama: 'Drs. Fransiscus Manoppo, M.Pd',
  tanggal: '15 Okt 2025'
};

// TODO: ganti dengan log audit status sebenarnya dari API (contoh data)
const log = [
  {
    tanggal: '10 Juli 2025',
    jam: '08:15 WITA',
    status: 'Status Aktif (Kenaikan Kelas IX)',
    oleh: 'Sistem Otomatis Dapodikda Sulut'
  },
  {
    tanggal: '12 Juli 2024',
    jam: '09:00 WITA',
    status: 'Status Aktif (Pendaftaran Siswa Baru SMP)',
    oleh: 'Admin PPDB SMP Negeri 1 Manado'
  }
];

function lihatDetail(l: { id: number }) {
  // TODO: buka halaman detail submisi
  console.log('detail submisi', l.id);
}

function unduhSertifikat(l: { id: number }) {
  // TODO: unduh e-sertifikat
  console.log('unduh e-sertifikat', l.id);
}

function cetakRekap() {
  // TODO: buat dan unduh rekap portofolio PDF
  console.log('cetak rekap');
}

function kembaliKeDaftar() {
  // TODO: sesuaikan dengan route daftar siswa Anda
  router.push('/guru/data-siswa');
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
p,
ol,
blockquote {
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
  min-width: 0;
}

.brand__text strong {
  font-size: 17px;
  line-height: 21px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 11px;
  color: #191c1e;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.brand .icon-btn {
  color: #003178;
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
  gap: 5px;
  padding: 4px 11px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
}

.status ion-icon {
  font-size: 14px;
}

.status-green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.status-amber {
  background: #fff0c7;
  border: 1px solid #f0d58a;
  color: #7a4b00;
}

.status-gold {
  background: #fff0c7;
  border: 1px solid #f0c76a;
  color: #7a4b00;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0f9d6b;
}

.sep {
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0 6px;
  vertical-align: middle;
  background: #9aa0ac;
}

/* ---------- Profil ---------- */

.profile {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.profile__top {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eceef2;
}

.profile__avatar {
  width: 62px;
  height: 62px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #0d47a1;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.profile__text {
  flex: 1;
  min-width: 0;
}

.profile__name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.profile__name h1 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
}

.profile__text > p {
  margin-top: 3px;
  font-size: 12px;
  color: #3d4452;
}

.profile__minat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #606572 !important;
}

.profile__minat ion-icon {
  font-size: 16px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 14px;
}

.stat {
  padding: 12px 6px;
  border-radius: 10px;
  background: #eef0f4;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
}

.stat span {
  font-size: 11px;
  color: #3d4452;
}

.c-navy {
  color: #003178;
}

.c-blue {
  color: #0b5cad;
}

.c-orange {
  color: #c26a00;
}

/* ---------- Tab ---------- */

.segment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  border-radius: 14px;
  background: #e8ebf0;
  border: 1px solid #dde1e8;
}

.segment button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  border-radius: 10px;
  color: #3d4452;
  font-size: 13px;
  font-weight: 600;
}

.segment button.active {
  background: #fff;
  color: #003178;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .12);
}

.segment button:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Daftar ---------- */

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 4px;
}

.section-head h2 {
  font-size: 14px;
  font-weight: 700;
}

.section-head small {
  font-size: 11px;
  color: #606572;
}

.card {
  padding: 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.event {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #003178;
}

.event ion-icon {
  font-size: 18px;
}

.card h3 {
  margin-top: 12px;
  font-size: 17px;
  line-height: 25px;
  font-weight: 700;
}

.date {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;
  color: #50545d;
}

.date strong {
  font-weight: 500;
  color: #191c1e;
}

.score {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  padding: 12px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 20px;
}

.score--gray {
  background: #eef0f4;
  border: 1px solid #dfe2e8;
  color: #3d4452;
}

.score--gray ion-icon {
  font-size: 24px;
  color: #003178;
}

.score--gray strong {
  color: #003178;
}

.score--green {
  background: #e6f7ee;
  border: 1px solid #b6e4cb;
  color: #0b5f3a;
}

.score--green ion-icon {
  font-size: 22px;
  color: #0f9d6b;
}

.score--green span {
  flex: 1;
  font-size: 13px;
}

.score--green strong {
  flex: none;
  font-size: 12px;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #eceef2;
}

.card__foot--end {
  justify-content: flex-end;
}

.card__foot small {
  font-size: 11px;
  color: #50545d;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #aeb4c1;
  border-radius: 10px;
  background: #fff;
  color: #003178;
  font-size: 13px;
  font-weight: 700;
}

.btn-outline ion-icon {
  font-size: 18px;
}

.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #fbbf24;
  color: #3d2800;
  font-size: 13px;
  font-weight: 700;
}

.btn-gold ion-icon {
  font-size: 18px;
}

/* ---------- Catatan ---------- */

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

.panel__title ion-icon {
  font-size: 24px;
  color: #003178;
}

.note {
  margin-top: 12px;
  padding: 14px;
  border-radius: 0 10px 10px 0;
  background: #eef0f4;
  border-left: 4px solid #0d47a1;
}

.note p {
  font-size: 13px;
  line-height: 25px;
  font-style: italic;
  color: #3d4452;
}

.note footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 4px 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #dfe2e8;
  font-size: 11px;
  color: #3d4452;
}

.note footer small {
  color: #606572;
}

/* ---------- Log audit ---------- */

.timeline {
  position: relative;
  padding: 0 0 0 4px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 8px;
  bottom: 30px;
  width: 3px;
  border-radius: 2px;
  background: #c3cfe3;
}

.tl {
  position: relative;
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
}

.tl__dot {
  z-index: 1;
  width: 18px;
  height: 18px;
  flex: none;
  margin-top: 14px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #fff;
  border: 4px solid #0b6bd1;
}

.tl--1 .tl__dot {
  border-color: #6b7280;
}

.tl__body {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #dfe2e8;
  font-size: 12px;
}

.tl__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.tl__top strong {
  font-size: 14px;
}

.tl__top time {
  font-size: 11px;
  color: #606572;
}

.tl__status {
  margin-top: 6px;
  font-weight: 700;
}

.tl__by {
  margin-top: 4px;
  font-size: 11px;
  color: #50545d;
}

/* ---------- Aksi ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.btn-validate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  border-radius: 12px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-validate ion-icon {
  font-size: 22px;
}

.btn-outline--block {
  width: 100%;
  min-height: 48px;
  border-radius: 12px;
}

.btn-validate:focus-visible,
.btn-outline:focus-visible,
.btn-gold:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

</style>