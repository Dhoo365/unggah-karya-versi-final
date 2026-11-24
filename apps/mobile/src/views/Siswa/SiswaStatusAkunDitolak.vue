<template>
  <ion-page>
    <ion-content :fullscreen="true" class="rj-content">
      <div class="rj">
        <!-- Top bar -->
        <header class="topbar">
          <button class="icon-btn" type="button" aria-label="Tutup" @click="goBack">
            <ion-icon :icon="closeOutline" />
          </button>
          <div class="topbar__text">
            <strong>Status Pengajuan Akun</strong>
            <span>SIKARYA Dikda Sulut</span>
          </div>
          <span class="ticket">ID: <b>{{ data.tiket }}</b></span>
        </header>

        <main class="body">
          <!-- Hero -->
          <section class="hero">
            <div class="hero__ring">
              <span class="hero__core"><ion-icon :icon="closeCircleOutline" /></span>
            </div>
            <span class="status">
              <i class="status__dot"></i>
              Status: Pendaftaran Siswa Ditolak
            </span>
            <h1 class="hero__title">Pengajuan Akun Siswa Tidak Disetujui</h1>
            <p class="hero__desc">
              Mohon maaf, pengajuan registrasi akun siswa Anda tidak dapat disetujui oleh Guru Pembimbing /
              Operator Satuan Pendidikan sekolah Anda.
            </p>
          </section>

          <!-- Detail penolakan -->
          <section class="card">
            <div class="teacher">
              <span class="teacher__icon"><ion-icon :icon="idCardOutline" /></span>
              <div>
                <small>Guru Verifikator Sekolah</small>
                <strong>{{ data.guru }}</strong>
                <span>Guru Pembimbing {{ data.sekolahSingkat }}</span>
              </div>
            </div>

            <p class="time">
              <ion-icon :icon="timeOutline" />
              Waktu Keputusan: <b>{{ data.waktu }}</b>
            </p>

            <div class="reason">
              <h2><ion-icon :icon="warningOutline" /> ALASAN RESMI PENOLAKAN:</h2>
              <blockquote>“{{ data.alasan }}”</blockquote>
            </div>

            <h3 class="detail-title">Rincian Data yang Diinputkan:</h3>
            <dl class="table">
              <div class="tr">
                <dt>Nama Lengkap Siswa</dt>
                <dd>{{ data.nama }}</dd>
              </div>
              <div class="tr">
                <dt>NISN Terdaftar</dt>
                <dd class="red">{{ data.nisn }}</dd>
              </div>
              <div class="tr">
                <dt>Rombel / Kelas</dt>
                <dd>{{ data.kelas }}</dd>
              </div>
              <div class="tr">
                <dt>Asal Satuan Pendidikan</dt>
                <dd>{{ data.sekolahSingkat }}</dd>
              </div>
              <div class="tr tr--file">
                <dt><ion-icon :icon="documentTextOutline" /> <span>Berkas Bermasalah</span></dt>
                <dd class="file">{{ data.berkas }}</dd>
                <span class="invalid">Tidak Valid / Fiktif</span>
              </div>
            </dl>
          </section>

          <!-- Langkah -->
          <section class="steps">
            <div class="steps__head">
              <span class="steps__icon"><ion-icon :icon="bulbOutline" /></span>
              <h2>Langkah Penyelesaian &amp; Rekomendasi</h2>
            </div>
            <ol>
              <li v-for="s in steps" :key="s.n">
                <span class="steps__num">{{ s.n }}</span>
                <p><b>{{ s.bold }}</b> {{ s.text }}</p>
              </li>
            </ol>
          </section>

          <!-- Aksi -->
          <button class="cta" type="button" @click="register">
            <ion-icon :icon="refreshOutline" />
            Daftar Ulang Akun Siswa
          </button>
          <button class="outline" type="button" @click="contactTeacher">
            <ion-icon :icon="chatboxEllipsesOutline" />
            Hubungi Guru Pembimbing via WhatsApp
          </button>
          <button class="link" type="button" @click="toLogin">Kembali ke Halaman Masuk</button>
        </main>

        <footer class="foot">
          <p>Dinas Pendidikan Daerah Provinsi Sulawesi Utara • Cabang Dinas Manado</p>
          <p>SIKARYA Dikda Sulut v2.4.0 • Terintegrasi Dapodikdasmen</p>
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  bulbOutline,
  chatboxEllipsesOutline,
  closeCircleOutline,
  closeOutline,
  documentTextOutline,
  idCardOutline,
  refreshOutline,
  timeOutline,
  warningOutline,
} from 'ionicons/icons';

const router = useRouter();

// Data contoh; ganti dengan data dari API / store
const data = {
  tiket: '#REG-SISWA-4920',
  guru: 'Dra. Meiske Lumintang, M.Pd',
  sekolahSingkat: 'SMAN 1 Manado',
  waktu: '24 Okt 2025 • 11:45 WITA',
  alasan:
    'Data NISN (0078 4920 11) dan berkas Kartu Pelajar yang diunggah tidak terdaftar dalam pangkalan data siswa aktif semester berjalan di SMAN 1 Manado. Ditemukan ketidaksesuaian identitas dengan arsip buku induk sekolah.',
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  kelas: 'XII IPA 1',
  berkas: 'Kartu_Pelajar_Scan.pdf',
};

const steps = [
  {
    n: 1,
    bold: 'Konfirmasi ke Bagian Tata Usaha (TU)',
    text: 'SMAN 1 Manado untuk memeriksa status keaktifan NISN pada sistem Dapodik sekolah.',
  },
  {
    n: 2,
    bold: 'Minta Surat Keterangan Siswa Aktif',
    text: 'resmi bertanda tangan Kepala Sekolah jika Anda merupakan siswa mutasi baru yang belum tersinkronisasi.',
  },
  {
    n: 3,
    bold: 'Lakukan Pendaftaran Ulang',
    text: 'dengan memasukkan NISN yang valid serta scan kartu pelajar asli setelah data diperbaiki oleh pihak sekolah.',
  },
];

function register() {
  router.push('/register');
}

function contactTeacher() {
  // TODO: buka WhatsApp guru pembimbing
}

function toLogin() {
  router.replace('/login');
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.rj-content {
  --background: #f6f8fc;
}

.rj {
  --navy: #0b2a6b;
  --blue: #0b4a8f;
  --teal: #0b6a8a;
  --red: #b91c1c;
  min-height: 100%;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px);
  background: #f6f8fc;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

/* ---------- Top bar ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px;
  background: #fff;
  border-bottom: 1px solid #e5edf6;
}
.icon-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: none;
  color: #0f172a;
  font-size: 24px;
  cursor: pointer;
}
.topbar__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
}
.topbar__text strong {
  max-width: 130px;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 700;
  color: #0f172a;
}
.topbar__text span {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--teal);
}
.ticket {
  flex-shrink: 0;
  max-width: 150px;
  padding: 7px 12px;
  border: 1px solid #dde3ea;
  border-radius: 10px;
  background: #eef1f5;
  font-size: 11px;
  line-height: 1.3;
  color: #64748b;
}
.ticket b {
  font-weight: 800;
  color: var(--teal);
}

.body {
  padding: 0 16px;
}

/* ---------- Hero ---------- */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 22px;
  text-align: center;
}
.hero__ring {
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.18) 0%, rgba(220, 38, 38, 0.1) 55%, rgba(220, 38, 38, 0) 72%);
}
.hero__core {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #c01919;
  box-shadow: 0 4px 14px rgba(185, 28, 28, 0.35);
  color: #fff;
  font-size: 44px;
}
.status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: -10px;
  padding: 5px 14px;
  border: 1px solid #f4b8b8;
  border-radius: 999px;
  background: #fde6e6;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--red);
  position: relative;
}
.status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #c01919;
}
.hero__title {
  margin: 16px 0 0;
  font-size: 19px;
  line-height: 1.3;
  font-weight: 700;
  color: #0f172a;
}
.hero__desc {
  margin: 10px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #475569;
}

/* ---------- Card ---------- */
.card {
  margin-top: 22px;
  padding: 16px 14px 14px 16px;
  border: 1px solid #dde4ee;
  border-left: 4px solid var(--red);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}
.teacher {
  display: flex;
  align-items: center;
  gap: 12px;
}
.teacher__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #dbe6fb;
  color: var(--navy);
  font-size: 24px;
}
.teacher div {
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}
.teacher small {
  font-size: 10.5px;
  color: #64748b;
}
.teacher strong {
  font-size: 14.5px;
  font-weight: 700;
  color: #0f172a;
}
.teacher span:last-child {
  font-size: 11.5px;
  color: var(--teal);
}
.time {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 14px 0 0;
  padding-top: 12px;
  border-top: 1px solid #e5ecf5;
  font-size: 12px;
  color: #64748b;
}
.time ion-icon {
  font-size: 15px;
}
.time b {
  font-weight: 500;
  color: #1e293b;
}

.reason {
  margin-top: 14px;
  padding: 14px;
  border: 1px solid #f4b8b8;
  border-radius: 12px;
  background: #fdecec;
}
.reason h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: var(--red);
}
.reason h2 ion-icon {
  font-size: 16px;
}
.reason blockquote {
  margin: 10px 0 0;
  padding: 12px;
  border: 1px solid #f6d3d3;
  border-radius: 10px;
  background: #fff;
  font-size: 12.5px;
  line-height: 1.65;
  color: #334155;
}

.detail-title {
  margin: 18px 0 8px;
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}
.table {
  margin: 0;
  border: 1px solid #e3e9f1;
  border-radius: 10px;
  background: #f4f6f9;
  overflow: hidden;
}
.tr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid #e3e9f1;
}
.tr dt {
  font-size: 12px;
  color: #64748b;
}
.tr dd {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  text-align: right;
  color: #0f172a;
}
.tr dd.red {
  font-weight: 800;
  color: var(--red);
}
.tr--file {
  gap: 8px;
  padding: 10px 10px 10px 14px;
  border-bottom: 0;
  background: #fdf1f1;
}
.tr--file dt {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.tr--file dt ion-icon {
  flex-shrink: 0;
  font-size: 16px;
  color: var(--red);
}
.tr--file dt span {
  max-width: 72px;
  line-height: 1.3;
}
.tr--file .file {
  flex: 1;
  min-width: 0;
  font-weight: 500;
  word-break: break-all;
}
.invalid {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  padding: 4px;
  border-radius: 50%;
  background: #c01919;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.15;
  text-align: center;
  color: #fff;
}

/* ---------- Steps ---------- */
.steps {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #dde4ee;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}
.steps__head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.steps__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #dbe6fb;
  color: var(--navy);
  font-size: 18px;
}
.steps__head h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}
.steps ol {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.steps li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.steps__num {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #dbe6fb;
  font-size: 12px;
  font-weight: 700;
  color: var(--navy);
}
.steps li p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: #475569;
}
.steps li b {
  font-weight: 700;
  color: #0f172a;
}

/* ---------- Actions ---------- */
.cta,
.outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  font: inherit;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.cta {
  height: 50px;
  margin-top: 22px;
  border: 0;
  border-radius: 10px;
  background: var(--blue);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}
.cta ion-icon {
  font-size: 18px;
}
.outline {
  height: 50px;
  margin-top: 10px;
  border: 2px solid var(--blue);
  border-radius: 10px;
  background: #fff;
  color: var(--blue);
  font-size: 13.5px;
  font-weight: 600;
}
.outline ion-icon {
  font-size: 18px;
}
.cta:active,
.outline:active {
  transform: scale(0.99);
}
.link {
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 8px 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
}

/* ---------- Footer ---------- */
.foot {
  margin-top: 26px;
  padding: 16px 20px 0;
  border-top: 1px solid #e5ecf5;
  text-align: center;
}
.foot p {
  margin: 0 0 4px;
  font-size: 10.5px;
  line-height: 1.45;
  color: #64748b;
}

/* ---------- Focus ---------- */
.icon-btn:focus-visible,
.cta:focus-visible,
.outline:focus-visible,
.link:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}
</style>