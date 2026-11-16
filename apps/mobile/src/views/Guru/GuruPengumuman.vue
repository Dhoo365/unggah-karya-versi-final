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
              <strong>Pengumuman &amp; Surat Edaran</strong>
              <span>Portal Resmi Dinas Pendidikan Sulut</span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Filter">
              <ion-icon :icon="optionsOutline" />
            </button>

            <button class="icon-btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <i class="notification-dot"></i>
            </button>
          </div>
        </header>

        <main class="main">

          <section class="hero">
            <ion-icon :icon="megaphoneOutline" class="hero__watermark" />

            <div class="hero__icon">
              <ion-icon :icon="schoolOutline" />
            </div>

            <div class="hero__text">
              <span>KHUSUS GURU PEMBIMBING</span>
              <h1>Sinkronisasi &amp; Edaran Tahap Provinsi 2026</h1>
              <p>
                Pastikan seluruh data portofolio siswa terbimbing telah tervalidasi
                sebelum batas kurasi wilayah.
              </p>
            </div>
          </section>

          <section class="content-tabs" role="tablist">
            <button
              v-for="k in kategoriList"
              :key="k.key"
              type="button"
              role="tab"
              :aria-selected="kategori === k.key"
              :class="{ active: kategori === k.key }"
              @click="kategori = k.key"
            >
              <ion-icon :icon="kategori === k.key && k.key === 'semua' ? checkmark : k.icon" />
              {{ k.label }}
            </button>
          </section>

          <section class="news-list">

            <article
              v-for="item in tampil"
              :key="item.id"
              class="news-card"
              :class="{ 'news-card--pinned': item.tersemat }"
            >

              <div class="news-head">
                <span class="status" :class="'status-' + item.tone">
                  <ion-icon v-if="item.badgeIcon" :icon="item.badgeIcon" />
                  {{ item.badge }}
                </span>

                <time>{{ item.tanggal }}</time>
              </div>

              <p v-if="item.nomor" class="news-number">
                <ion-icon :icon="businessOutline" />
                {{ item.nomor }}
              </p>

              <h3>{{ item.judul }}</h3>

              <p v-if="item.instansi" class="news-org">
                <ion-icon :icon="businessOutline" />
                {{ item.instansi }}
              </p>

              <!-- Isi: kotak sorotan (edaran) -->
              <div v-if="item.sorotan" class="highlight">
                {{ item.sorotan.awal }}
                <strong>{{ item.sorotan.merah }}</strong>.
              </div>

              <!-- Isi: paragraf biasa -->
              <p v-else class="news-desc">{{ item.isi }}</p>

              <!-- Berkas -->
              <div v-if="item.berkas" class="file">
                <span class="file__pdf">PDF</span>

                <div class="file__text">
                  <strong>{{ item.berkas.nama }}</strong>
                  <small>Dokumen Resmi • {{ item.berkas.ukuran }}</small>
                </div>

                <button type="button" class="btn-validate" @click="unduh(item)">
                  <ion-icon :icon="downloadOutline" />
                  Unduh
                </button>
              </div>

              <!-- Tombol -->
              <button
                v-if="item.tipe === 'wajib'"
                type="button"
                class="btn-soft"
                @click="lihatFormat(item)"
              >
                <ion-icon :icon="documentTextOutline" />
                Lihat Format &amp; Template
              </button>

              <div v-if="item.tipe === 'teknis'" class="actions">
                <button type="button" class="btn-teal" @click="bukaZoom(item)">
                  <ion-icon :icon="videocamOutline" />
                  Tautan Zoom
                </button>

                <button type="button" class="btn-outline" @click="notulensi(item)">
                  <ion-icon :icon="bookOutline" />
                  Notulensi
                </button>
              </div>

              <div v-if="item.tipe === 'hasil'" class="news-foot">
                <div class="avatars">
                  <span
                    v-for="(a, i) in item.avatar"
                    :key="a.i"
                    class="avatar"
                    :class="'avatar-' + a.tone"
                    :style="{ zIndex: 3 - i }"
                  >{{ a.i }}</span>

                  <small>{{ item.wilayah }}</small>
                </div>

                <button type="button" class="link" @click="bukaDaftar(item)">
                  Buka Daftar
                  <ion-icon :icon="chevronForward" />
                </button>
              </div>

            </article>

            <p v-if="!tampil.length" class="empty">
              Belum ada pengumuman pada kategori ini.
            </p>

          </section>

        </main>
      </div>
    </ion-content>

    <GuruTabBar active="/guru/beranda" />
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
  optionsOutline,
  notificationsOutline,
  schoolOutline,
  megaphoneOutline,
  checkmark,
  newspaperOutline,
  calendarOutline,
  businessOutline,
  pin,
  alertCircle,
  documentTextOutline,
  downloadOutline,
  videocamOutline,
  bookOutline,
  trophyOutline,
  chevronForward,
  constructOutline,
  ribbonOutline
} from 'ionicons/icons';

// Sesuaikan path dengan lokasi GuruTabBar di proyek Anda
import GuruTabBar from './GuruTabBar.vue';

const router = useRouter();

const kategori = ref('semua');

const kategoriList = [
  { key: 'semua', label: 'Semua', icon: checkmark },
  { key: 'edaran', label: 'Edaran Resmi', icon: newspaperOutline },
  { key: 'jadwal', label: 'Jadwal Seleksi', icon: calendarOutline },
  { key: 'teknis', label: 'Update Teknis', icon: constructOutline },
  { key: 'hasil', label: 'Hasil Kurasi', icon: ribbonOutline }
];

const pengumuman = [

  {
    id: 1,
    tipe: 'edaran',
    kategori: ['edaran', 'jadwal'],
    tersemat: true,
    tone: 'info',
    badge: 'Tersemat',
    badgeIcon: pin,
    tanggal: '12 Juni 2026',
    nomor: 'Surat Edaran No: 420/DISDIK/VI/2026',
    judul: 'Jadwal Verifikasi & Batas Pengunggahan Karya FLS2N dan LKS Tahun 2026',
    instansi: 'Cabang Dinas Pendidikan Manado-Tomohon',
    sorotan: {
      awal:
        'Diberitahukan kepada seluruh Kepala Satuan Pendidikan dan Guru Pembimbing bahwa sinkronisasi data Dapodik untuk kepesertaan ditutup pada',
      merah: '30 Juni 2026 pukul 23.59 WITA'
    },
    berkas: { nama: 'Surat_Edaran_Kadis_Sulut.pdf', ukuran: '1.2 MB' }
  },

  {
    id: 2,
    tipe: 'wajib',
    kategori: ['edaran'],
    tone: 'danger',
    badge: 'Wajib Dibaca Pembimbing',
    badgeIcon: alertCircle,
    tanggal: '10 Juni 2026',
    judul: 'Panduan Penulisan Sinopsis & Surat Pernyataan Orisinalitas Bermeterai',
    isi:
      'Seluruh naskah sinopsis karya wajib memuat lembar pengesahan berstempel basah sekolah asal dan meterai Rp10.000 sesuai format baku Dispen Dikda Sulut.'
  },

  {
    id: 3,
    tipe: 'teknis',
    kategori: ['teknis'],
    tone: 'muted',
    badge: 'Update Teknis',
    badgeIcon: videocamOutline,
    tanggal: '8 Juni 2026',
    judul: 'Sosialisasi Daring Pembimbingan Teknis Juri & Kurator Tingkat Provinsi',
    isi:
      'Penyelarasan rubrik penilaian 5 cabang lomba vokasi dan seni budaya dengan dewan kurator akademisi Sulut.'
  },

  {
    id: 4,
    tipe: 'hasil',
    kategori: ['hasil'],
    tone: 'gold',
    badge: 'Hasil Kurasi Tahap 1',
    badgeIcon: trophyOutline,
    tanggal: '1 Juni 2026',
    judul: 'Daftar Nominasi Awal Karya Unggulan SMP/SMA Se-Sulawesi Utara',
    isi:
      'Rangkuman 120 karya inovasi dan kriya seni terbaik yang lolos ke tahap pembimbingan intensif dewan juri daerah.',
    avatar: [
      { i: 'MN', tone: 'blue' },
      { i: 'TM', tone: 'yellow' },
      { i: 'BT', tone: 'purple' }
    ],
    wilayah: '15 Kab/Kota'
  }

] as any[];

const tampil = computed(() =>
  kategori.value === 'semua'
    ? pengumuman
    : pengumuman.filter((p) => p.kategori.includes(kategori.value))
);

function unduh(item: any) {
  // TODO: unduh surat edaran
  console.log('unduh', item.id);
}

function lihatFormat(item: any) {
  // TODO: buka format & template
  console.log('lihat format', item.id);
}

function bukaZoom(item: any) {
  // TODO: buka tautan Zoom
  console.log('zoom', item.id);
}

function notulensi(item: any) {
  // TODO: buka notulensi
  console.log('notulensi', item.id);
}

function bukaDaftar(item: any) {
  // TODO: buka daftar nominasi
  console.log('buka daftar', item.id);
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
  color: #3b6fb6;
}

.bar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  position: relative;
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 22px;
}

.notification-dot {
  position: absolute;
  top: 5px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ba1a1a;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 12px 24px;
}

/* ---------- Hero ---------- */

.hero {
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: 15px;
  background:
    linear-gradient(
      145deg,
      #00408c 0%,
      #0052a5 55%,
      #1a63c4 100%
    );
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .15);
}

.hero__watermark {
  position: absolute;
  right: -14px;
  bottom: -18px;
  font-size: 120px;
  color: rgba(255, 255, 255, .08);
}

.hero__icon {
  position: relative;
  z-index: 1;
  width: 42px;
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, .16);
  color: #dbe9ff;
}

.hero__icon ion-icon {
  font-size: 24px;
}

.hero__text {
  position: relative;
  z-index: 1;
}

.hero__text span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .4px;
  color: #a9d0ff;
}

.hero h1 {
  margin-top: 4px;
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  letter-spacing: -.2px;
}

.hero p {
  margin-top: 6px;
  font-size: 11px;
  line-height: 16px;
  color: #d3e4ff;
}

/* ---------- Kategori ---------- */

.content-tabs {
  display: flex;
  align-items: center;
  gap: 7px;
  overflow-x: auto;
  scrollbar-width: none;
}

.content-tabs::-webkit-scrollbar {
  display: none;
}

.content-tabs button {
  flex: none;
  height: 38px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px;
  border: 1px solid #d4d8e2;
  border-radius: 20px;
  background: #fff;
  color: #3d4452;
  font-size: 11px;
  font-weight: 600;
}

.content-tabs button.active {
  background: #003f91;
  border-color: #003f91;
  color: #fff;
}

.content-tabs ion-icon {
  font-size: 15px;
}

/* ---------- Status ---------- */

.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
}

.status ion-icon {
  font-size: 12px;
}

.status-info {
  background: #dce7ff;
  color: #0b4fa6;
}

.status-danger {
  background: #ffdad6;
  color: #ba1a1a;
}

.status-muted {
  background: #e8eaef;
  color: #3d4452;
}

.status-gold {
  background: #fff0c7;
  color: #765500;
}

/* ---------- Kartu ---------- */

.news-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.news-card {
  padding: 14px;
  border-radius: 13px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.news-card--pinned {
  border: 2px solid #c3d4ee;
  box-shadow: 0 2px 8px rgba(0, 63, 145, .1);
}

.news-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.news-head time {
  font-size: 10px;
  color: #747985;
}

.news-number {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 11px;
  font-weight: 700;
  color: #003178;
}

.news-number ion-icon {
  font-size: 15px;
}

.news-card h3 {
  margin-top: 8px;
  font-size: 15px;
  line-height: 21px;
  font-weight: 800;
}

.news-org {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 5px;
  font-size: 10px;
  color: #50545d;
}

.news-org ion-icon {
  font-size: 14px;
  color: #3473ad;
}

.news-desc {
  margin-top: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #50545d;
}

.highlight {
  margin-top: 10px;
  padding: 12px;
  border-radius: 9px;
  background: #f0f2f5;
  border: 1px solid #e3e6ec;
  font-size: 12px;
  line-height: 19px;
  color: #343842;
}

.highlight strong {
  color: #ba1a1a;
  font-weight: 600;
}

/* ---------- Berkas ---------- */

.file {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 10px;
  border-radius: 10px;
  background: #f0f8ff;
  border: 1px solid #bcd7f0;
}

.file__pdf {
  width: 38px;
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #f0c4c4;
  color: #ba1a1a;
  font-size: 10px;
  font-weight: 800;
}

.file__text {
  flex: 1;
  min-width: 0;
}

.file__text strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  color: #003178;
}

.file__text small {
  display: block;
  margin-top: 2px;
  font-size: 9px;
  color: #747985;
}

/* ---------- Tombol ---------- */

.btn-validate,
.btn-teal,
.btn-outline,
.btn-soft {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 700;
}

.btn-validate {
  flex: none;
  padding: 10px 14px;
  background: #003f91;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 49, 120, .18);
}

.btn-validate ion-icon,
.btn-teal ion-icon,
.btn-outline ion-icon,
.btn-soft ion-icon {
  font-size: 15px;
}

.btn-soft {
  width: 100%;
  min-height: 42px;
  margin-top: 12px;
  background: #e8f0fb;
  border: 1px solid #bcd0e8;
  color: #00639a;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.actions button {
  min-height: 42px;
}

.btn-teal {
  background: #00639a;
  color: #fff;
}

.btn-outline {
  border: 1px solid #c3c9d6;
  background: #fff;
  color: #003f91;
}

/* ---------- Footer hasil ---------- */

.news-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.avatars {
  display: flex;
  align-items: center;
}

.avatar {
  position: relative;
  width: 28px;
  height: 28px;
  margin-right: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #fff;
  font-size: 8px;
  font-weight: 700;
}

.avatar-blue {
  background: #dbeaff;
  color: #18519d;
}

.avatar-yellow {
  background: #ffedc2;
  color: #956400;
}

.avatar-purple {
  background: #e6ddff;
  color: #57319c;
}

.avatars small {
  margin-left: 16px;
  font-size: 10px;
  color: #50545d;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #00639a;
  font-size: 11px;
  font-weight: 700;
}

.link ion-icon {
  font-size: 14px;
}

.empty {
  padding: 18px 0;
  text-align: center;
  font-size: 11px;
  color: #747985;
}

</style>