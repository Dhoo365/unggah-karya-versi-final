<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="topbar">
        <ion-buttons slot="start">
          <ion-button @click="router.back()" aria-label="Kembali">
            <ion-icon slot="icon-only" :icon="arrowBack" />
          </ion-button>
        </ion-buttons>
        <div class="topbar__title">
          <h1>Karya Siswa Sekolah</h1>
          <p>SMP Negeri 1 Manado <i class="dot" /> Dikda Sulut</p>
        </div>
        <ion-buttons slot="end">
          <ion-button aria-label="Filter"><ion-icon slot="icon-only" :icon="optionsOutline" /></ion-button>
          <ion-button aria-label="Notifikasi" class="bell">
            <ion-icon slot="icon-only" :icon="notificationsOutline" />
            <span class="bell__dot" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="page">
      <div class="wrap">
        <!-- Periode -->
        <section class="period">
          <div class="period__icon"><ion-icon :icon="businessOutline" /></div>
          <div>
            <strong>T.A. 2025/2026 Gelombang I</strong>
            <p>Batas Kurasi Dispen: 30 Juni 2026</p>
          </div>
          <span class="period__badge">Aktif</span>
        </section>

        <!-- Hero upload -->
        <section class="hero">
          <div class="hero__top">
            <span class="hero__pill">Auto-validasi Dapodik &amp; Berkas</span>
            <ion-icon :icon="cloudUploadOutline" class="hero__cloud" />
          </div>
          <h2>Daftarkan Karya Inovasi Siswa</h2>
          <p>
            Pastikan NISN terdaftar dan pakta integritas orisinalitas bermeterai telah disiapkan.
          </p>
          <button class="hero__btn" @click="uploadBaru">
            <ion-icon :icon="addCircleOutline" /> Upload Karya Baru
          </button>
        </section>

        <!-- Filter -->
        <div class="chips" role="tablist">
          <button
            v-for="f in filters"
            :key="f.key"
            class="chip"
            :class="{ 'chip--on': filter === f.key }"
            role="tab"
            :aria-selected="filter === f.key"
            @click="filter = f.key"
          >
            {{ f.label }}
            <span class="chip__count" :class="{ 'chip__count--amber': f.key === 'menunggu' }">{{ f.count }}</span>
          </button>
        </div>

        <!-- Daftar karya -->
        <article
          v-for="k in filtered"
          :key="k.id"
          class="card"
          :class="{ 'card--revisi': k.status === 'revisi' }"
        >
          <!-- Status -->
          <div class="card__status">
            <span class="pill" :class="'pill--' + k.status">
              <ion-icon :icon="statusIcon[k.status]" /> {{ statusLabel[k.status] }}
            </span>
            <span v-if="k.status === 'menunggu'" class="date"><ion-icon :icon="timeOutline" /> {{ k.tanggal }}</span>
            <span v-if="k.status === 'revisi'" class="deadline">Batas: {{ k.batas }}</span>
          </div>

          <!-- Judul + skor -->
          <div class="card__title">
            <h3>{{ k.judul }}</h3>
            <div v-if="k.skor" class="score">
              <small>SKOR</small>
              <b>{{ k.skor }}<span>/100</span></b>
            </div>
          </div>

          <p class="meta"><ion-icon :icon="personOutline" /> {{ k.siswa }} <i class="dot dot--gray" /> Kelas {{ k.kelas }}</p>
          <p class="meta meta--muted"><ion-icon :icon="k.kategoriIcon" /> {{ k.kategori }}</p>

          <!-- Menunggu -->
          <template v-if="k.status === 'menunggu'">
            <div class="file">
              <ion-icon :icon="attachOutline" />
              <span class="file__name">{{ k.file }}</span>
              <span class="file__size">{{ k.ukuran }}</span>
            </div>
            <div class="btnrow">
              <button class="btn-soft"><ion-icon :icon="eyeOutline" /> Lihat Berkas</button>
              <button class="btn-outline"><ion-icon :icon="closeCircleOutline" /> Tarik / Batalkan</button>
            </div>
          </template>

          <!-- Revisi -->
          <template v-else-if="k.status === 'revisi'">
            <div class="alert" role="alert">
              <ion-icon :icon="warningOutline" />
              <div>
                <b>Alasan Penolakan Dispen:</b>
                <p>"{{ k.alasan }}"</p>
              </div>
            </div>
            <button class="btn-red"><ion-icon :icon="documentAttachOutline" /> Perbaiki &amp; Upload Ulang Berkas</button>
            <a class="link"><ion-icon :icon="chatboxEllipsesOutline" /> Detail Catatan Juri &amp; Evaluasi</a>
          </template>

          <!-- Dinilai -->
          <template v-else>
            <div class="progress">
              <div class="progress__top">
                <span>Progres Penilaian: {{ k.juriSelesai }} dari {{ k.juriTotal }} Juri Selesai</span>
                <b>{{ Math.round((k.juriSelesai! / k.juriTotal!) * 100) }}%</b>
              </div>
              <div class="progress__bar"><i :style="{ width: (k.juriSelesai! / k.juriTotal!) * 100 + '%' }" /></div>
            </div>
            <div class="btnrow btnrow--rubrik">
              <button class="btn-gray"><ion-icon :icon="statsChartOutline" /> Rubrik Penilaian</button>
              <button class="btn-share" aria-label="Bagikan"><ion-icon :icon="shareSocialOutline" /></button>
            </div>
          </template>
        </article>

        <p v-if="!filtered.length" class="empty">Belum ada karya pada kategori ini.</p>

        <p class="note">
          <ion-icon :icon="informationCircleOutline" />
          Verifikasi berkas oleh Tim Kurasi Dispen Sulut dilakukan setelah karya diajukan.
        </p>
      </div>
    </ion-content>

    <GuruTabbar active="/guru/karya" />
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import {
  arrowBack, optionsOutline, notificationsOutline, businessOutline, cloudUploadOutline,
  addCircleOutline, timeOutline, personOutline, attachOutline, eyeOutline, closeCircleOutline,
  warningOutline, documentAttachOutline, chatboxEllipsesOutline, statsChartOutline,
  shareSocialOutline, informationCircleOutline, filmOutline, hardwareChipOutline,
  colorPaletteOutline, alertCircle, checkmarkCircle, paperPlane,
} from 'ionicons/icons';
import GuruTabbar from './GuruTabbar.vue';
// Sesuaikan path jika struktur folder berbeda


type Status = 'menunggu' | 'revisi' | 'dinilai';

interface Karya {
  id: number;
  status: Status;
  judul: string;
  siswa: string;
  kelas: string;
  kategori: string;
  kategoriIcon: string;
  tanggal?: string;
  batas?: string;
  file?: string;
  ukuran?: string;
  alasan?: string;
  skor?: number;
  juriSelesai?: number;
  juriTotal?: number;
}

const router = useRouter();

const statusLabel: Record<Status, string> = {
  menunggu: 'Diajukan → Menunggu Verifikasi Dispen',
  revisi: 'Perlu Perbaikan / Revisi',
  dinilai: 'Diterima Dispen → Sedang Dinilai Juri Provinsi',
};
const statusIcon: Record<Status, string> = {
  menunggu: paperPlane,
  revisi: alertCircle,
  dinilai: checkmarkCircle,
};

const karya = ref<Karya[]>([
  {
    id: 1, status: 'menunggu', judul: 'Video Animasi Edukasi Bahari Bunaken',
    siswa: 'Budi Santoso', kelas: 'IX-B', kategori: 'FLS2N Sinematografi & Seni Video',
    kategoriIcon: filmOutline, tanggal: '14 Jun 2026',
    file: 'MP4_Bunaken_FLS2N_BudiS.mp4', ukuran: '148 MB',
  },
  {
    id: 2, status: 'revisi', judul: 'Robot Pemilah Sampah Pesisir Pantai Malalayang',
    siswa: 'Andi Pratama', kelas: 'IX-A', kategori: 'LKS Karya Teknologi & Inovasi',
    kategoriIcon: hardwareChipOutline, batas: '18 Jun 2026',
    alasan: 'Surat pernyataan orisinalitas belum dibubuhi meterai Rp10.000 dan tanda tangan Kepala Sekolah.',
  },
  {
    id: 3, status: 'dinilai', judul: 'Kriya Anyam Bambu Khas Minahasa',
    siswa: 'Citra Kirana', kelas: 'VIII-C', kategori: 'FLS2N Kriya Seni SMP',
    kategoriIcon: colorPaletteOutline, skor: 88.5, juriSelesai: 2, juriTotal: 3,
  },
]);

const filter = ref<'semua' | 'menunggu' | 'diterima'>('semua');
const filters = [
  { key: 'semua', label: 'Semua', count: 35 },
  { key: 'menunggu', label: 'Menunggu Verifikasi', count: 8 },
  { key: 'diterima', label: 'Diterima / Lolos', count: 19 },
] as const;

const filtered = computed(() => {
  if (filter.value === 'semua') return karya.value;
  if (filter.value === 'menunggu') return karya.value.filter((k) => k.status === 'menunggu');
  return karya.value.filter((k) => k.status === 'dinilai');
});

function uploadBaru() {
  // TODO: arahkan ke halaman/form upload karya
  console.log('upload karya baru');
}
</script>

<style scoped>
ion-page {
  --navy: #0b2f7a;
  --green: #0f9d6b;
  --green-bg: #dcf5ea;
  --red: #b3171c;
  --red-bg: #fdecec;
  --amber-bg: #fdf1c4;
  --line: #dfe5ee;
  --ink: #0f172a;
  --muted: #64748b;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.page { --background: #f1f4f9; }
.wrap { padding: 12px 14px 24px; color: var(--ink); }
.dot { display: inline-block; width: 4px; height: 4px; margin: 0 3px; border-radius: 50%; background: currentColor; vertical-align: middle; }
.dot--gray { background: #94a3b8; margin: 0 6px; }
button { font: inherit; cursor: pointer; }
button:focus-visible, a:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }

/* Top bar */
.topbar { --background: #fff; --color: var(--navy); --border-width: 0; padding: 4px 0; }
.topbar__title { padding: 0 4px; }
.topbar__title h1 { margin: 0; font-size: 18px; font-weight: 800; color: var(--navy); line-height: 1.2; }
.topbar__title p { margin: 2px 0 0; font-size: 11px; color: #3b6fb6; }
.bell { position: relative; }
.bell__dot { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; border-radius: 50%; background: #d92d20; }

/* Periode */
.period { display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: #fff; border: 1px solid #cdd5e1; border-radius: 12px; }
.period__icon { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 9px; background: #dbe7fb; color: var(--navy); font-size: 20px; flex: none; }
.period strong { font-size: 13px; font-weight: 700; }
.period p { margin: 1px 0 0; font-size: 12px; color: #475569; }
.period__badge { margin-left: auto; padding: 3px 12px; border-radius: 12px; background: #cfe6fb; color: #0b5cad; font-size: 12px; font-weight: 700; }

/* Hero */
.hero { margin-top: 14px; padding: 16px; border-radius: 18px; color: #fff; background: linear-gradient(150deg, #0b3a8f 0%, #1858c8 100%); box-shadow: 0 6px 16px rgba(11, 47, 122, 0.25); }
.hero__top { display: flex; justify-content: space-between; align-items: center; }
.hero__pill { padding: 5px 14px; border-radius: 14px; background: rgba(255, 255, 255, 0.18); font-size: 11.5px; font-weight: 700; }
.hero__cloud { font-size: 24px; opacity: 0.75; }
.hero h2 { margin: 16px 0 4px; font-size: 17.5px; font-weight: 800; }
.hero p { margin: 0; font-size: 12.5px; line-height: 1.5; color: #c9dbf8; }
.hero__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 16px; height: 46px; border: 0; border-radius: 12px; background: #fff; color: var(--navy); font-size: 14.5px; font-weight: 800; }
.hero__btn ion-icon { font-size: 22px; }

/* Chips */
.chips { display: flex; gap: 8px; margin: 16px -14px 0; padding: 0 14px 2px; overflow-x: auto; scrollbar-width: none; }
.chips::-webkit-scrollbar { display: none; }
.chip { flex: none; display: inline-flex; align-items: center; gap: 8px; height: 38px; padding: 0 14px; border-radius: 12px; border: 1px solid #aeb9cb; background: #fff; color: #334155; font-size: 12.5px; font-weight: 600; }
.chip__count { min-width: 20px; padding: 1px 6px; border-radius: 10px; background: #e6ebf3; font-size: 11.5px; font-weight: 700; text-align: center; }
.chip__count--amber { background: var(--amber-bg); color: #8a5a00; }
.chip--on { background: var(--navy); border-color: var(--navy); color: #fff; font-weight: 800; }
.chip--on .chip__count { background: rgba(255, 255, 255, 0.2); color: #fff; }

/* Card */
.card { margin-top: 14px; padding: 14px; background: #fff; border: 1px solid var(--line); border-radius: 14px; }
.card--revisi { border: 2px solid #e8a3a5; background: #fffdfd; }
.card__status { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; line-height: 1.25; }
.pill ion-icon { flex: none; font-size: 13px; }
.pill--menunggu { background: var(--amber-bg); color: #7a4b00; border: 1px solid #ecd37a; }
.pill--revisi { background: #fbdcdc; color: var(--red); }
.pill--dinilai { background: var(--green-bg); color: #0b6b49; border: 1px solid #a8e0c8; }
.date { display: inline-flex; align-items: center; gap: 4px; flex: none; font-size: 12px; color: #475569; }
.deadline { flex: none; font-size: 12px; font-weight: 700; color: var(--red); }

.card__title { display: flex; justify-content: space-between; gap: 10px; margin: 12px 0 8px; }
.card__title h3 { margin: 0; font-size: 16.5px; font-weight: 800; line-height: 1.3; }
.score { flex: none; padding: 6px 12px; border-radius: 10px; background: #fcefc9; border: 1px solid #ecd37a; text-align: center; }
.score small { display: block; font-size: 10px; font-weight: 800; color: #7a4b00; }
.score b { font-size: 19px; font-weight: 800; color: #8a5a00; }
.score b span { font-size: 12px; font-weight: 500; }

.meta { display: flex; align-items: center; gap: 6px; margin: 6px 0 0; font-size: 12.5px; }
.meta ion-icon { color: #2a6fd1; font-size: 16px; }
.meta--muted { color: #475569; }

/* File */
.file { display: flex; align-items: center; gap: 8px; margin-top: 12px; padding: 12px; background: #eef1f6; border: 1px solid var(--line); border-radius: 10px; font-size: 12px; color: #334155; }
.file__name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.file__size { color: #475569; }

/* Buttons */
.btnrow { display: grid; grid-template-columns: 1.1fr 1fr; gap: 10px; margin-top: 12px; }
.btnrow button { display: flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; padding: 6px 10px; border-radius: 10px; font-size: 12.5px; font-weight: 700; line-height: 1.2; }
.btn-soft { border: 0; background: #d8e8fb; color: #0b4fa6; }
.btn-outline { border: 1px solid #aeb9cb; background: #fff; color: #334155; }
.btn-red { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 46px; margin-top: 12px; border: 0; border-radius: 10px; background: var(--red); color: #fff; font-size: 13.5px; font-weight: 800; }
.btn-red ion-icon { font-size: 18px; }
.link { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 14px 0 4px; font-size: 12.5px; font-weight: 600; color: #0b4fa6; cursor: pointer; }

/* Alert */
.alert { display: flex; gap: 10px; margin-top: 12px; padding: 12px; border: 1px solid #efb4b6; border-radius: 10px; background: var(--red-bg); color: var(--red); }
.alert > ion-icon { flex: none; font-size: 20px; margin-top: 1px; }
.alert b { font-size: 12.5px; font-weight: 800; }
.alert p { margin: 4px 0 0; font-size: 12.5px; line-height: 1.5; font-style: italic; }

/* Progress */
.progress { margin-top: 12px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 10px; background: #f6f8fb; }
.progress__top { display: flex; justify-content: space-between; font-size: 11.5px; color: #334155; }
.progress__top b { color: #0b4fa6; }
.progress__bar { height: 8px; margin-top: 8px; border-radius: 4px; background: #dbe3ef; overflow: hidden; }
.progress__bar i { display: block; height: 100%; border-radius: 4px; background: #0b5cad; }

.btnrow--rubrik { grid-template-columns: 1fr 48px; }
.btn-gray { border: 0; background: #e3e7ee; color: var(--navy); }
.btn-share { border: 1px solid #aeb9cb; background: #fff; color: #334155; font-size: 18px; }

.empty { margin: 18px 0; text-align: center; font-size: 13px; color: var(--muted); }
.note { display: flex; gap: 8px; margin: 16px 2px 0; padding: 12px; border: 1px solid var(--line); border-radius: 12px; background: #e9eef6; font-size: 12px; line-height: 1.5; color: #475569; }
.note ion-icon { flex: none; font-size: 16px; margin-top: 1px; color: #3b6fb6; }
</style>