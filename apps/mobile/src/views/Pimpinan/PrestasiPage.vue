<template>
  <ion-page>
    <ion-content :fullscreen="true" class="prestasi-content">
      <div class="prestasi">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="businessOutline" /></div>
            <div class="topbar__text">
              <span class="topbar__eyebrow">SIKARYA Dikda Sulut</span>
              <h1 class="topbar__title">Executive Portal • Kepala Dinas</h1>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Kalender"><ion-icon :icon="calendarOutline" /></button>
            <button class="topbar__btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <i class="topbar__dot"></i>
            </button>
            <div class="topbar__avatar">FS</div>
          </div>
        </header>

        <div class="body">
          <!-- Akses -->
          <div class="access">
            <span class="access__chip"><ion-icon :icon="shieldCheckmarkOutline" /> Akses Komando Kepala Balai</span>
            <span class="access__cert"><ion-icon :icon="shieldCheckmark" /> BSrE Bersertifikasi</span>
          </div>

          <header class="heading">
            <h2 class="heading__title">Bank Talenta &amp; Penganugerahan</h2>
            <p class="heading__sub">Verifikasi pengesahan SK prestasi siswa &amp; delegasi provinsi.</p>
          </header>

          <div class="filters">
            <button
              v-for="f in filters"
              :key="f.label"
              class="filters__item"
              :class="{ 'filters__item--active': active === f.label }"
              type="button"
              @click="active = f.label"
            >
              <ion-icon :icon="f.icon" /> {{ f.label }}
              <ion-icon v-if="f.dropdown" class="filters__caret" :icon="chevronDownOutline" />
            </button>
          </div>

          <!-- Otorisasi SK -->
          <section class="auth">
            <div class="auth__top">
              <span class="auth__pill"><i></i> Otorisasi Segera</span>
              <span class="auth__tte"><ion-icon :icon="fingerPrintOutline" /> TTE BSrE V.3</span>
            </div>
            <h3 class="auth__title">SK Penetapan Juara FLS2N Tingkat Kota Manado Tahun 2025</h3>
            <p class="auth__no">No: 421/DISDIK/SK/X/2025</p>

            <div class="auth__info">
              <div class="auth__item">
                <span class="auth__icon auth__icon--gold"><ion-icon :icon="trophyOutline" /></span>
                <span class="auth__text"><small>Penerima SK</small><b>12 Siswa Juara</b></span>
              </div>
              <div class="auth__item">
                <span class="auth__icon auth__icon--blue"><ion-icon :icon="shapesOutline" /></span>
                <span class="auth__text"><small>Kategori Seni</small><b>4 Cabang Lomba</b></span>
              </div>
            </div>

            <button class="auth__btn" type="button"><ion-icon :icon="createOutline" /> Otorisasi &amp; Tanda Tangan Digital (TTE)</button>
          </section>

          <!-- Rekap -->
          <div class="section-head">
            <h3 class="section-head__title">Rekapitulasi Prestasi Wilayah Manado</h3>
            <span class="section-head__note">Tervalidasi Puspresnas</span>
          </div>

          <section class="recap">
            <div class="recap__main">
              <span class="recap__icon"><ion-icon :icon="shieldCheckmarkOutline" /></span>
              <div class="recap__text">
                <b class="recap__value">124</b>
                <small>Sertifikat Terverifikasi BSrE</small>
              </div>
              <span class="recap__badge"><ion-icon :icon="trendingUpOutline" /> 100% Sah</span>
            </div>

            <div class="medals">
              <div v-for="m in medals" :key="m.label" class="medal">
                <span class="medal__icon" :class="'medal__icon--' + m.tone"><ion-icon :icon="m.icon" /></span>
                <b class="medal__value">{{ m.value }}</b>
                <small class="medal__label">{{ m.label }}</small>
              </div>
            </div>
          </section>

          <!-- Top 3 -->
          <div class="section-head section-head--top">
            <h3 class="section-head__title section-head__title--icon"><ion-icon :icon="starOutline" /> 3 Siswa Berprestasi Tertinggi</h3>
            <a class="section-head__link" href="#">Semua (48)</a>
          </div>

          <article v-for="s in siswa" :key="s.name" class="student">
            <div class="student__top">
              <div class="student__photo">
                <img v-if="s.photo" class="student__img" :src="s.photo" :alt="s.name" />
                <span v-else class="student__initial">{{ s.initial }}</span>
                <i class="student__rank">1</i>
              </div>
              <div class="student__who">
                <b class="student__name">{{ s.name }}</b>
                <span class="student__school">{{ s.school }}</span>
              </div>
              <div class="student__score">
                <b>{{ s.score }}</b>
                <small>Skor Juri</small>
              </div>
            </div>

            <div class="award">
              <div class="award__row">
                <b class="award__title"><ion-icon :icon="s.icon" /> {{ s.award }}</b>
                <ion-icon class="award__side" :icon="s.sideIcon" />
              </div>
              <div class="award__status" :class="'award__status--' + s.statusTone">
                <ion-icon :icon="s.statusIcon" />
                <span>{{ s.status }}</span>
              </div>
            </div>

            <div class="student__foot">
              <span class="student__note"><ion-icon :icon="s.noteIcon" /> {{ s.note }}</span>
              <button class="student__btn" type="button">Dossier <ion-icon :icon="chevronForwardOutline" /></button>
            </div>
          </article>

          <!-- Unduh -->
          <button class="export" type="button">
            <ion-icon :icon="downloadOutline" /> Unduh Rekapitulasi Bank Talenta ke Excel / PDF
          </button>
          <p class="sync"><ion-icon :icon="checkmarkCircleOutline" /> Sinkronisasi otomatis dengan Database SIM-Karya Provinsi Sulawesi Utara</p>
        </div>
      </div>
    </ion-content>
    <PimpinanTabbar />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  businessOutline,
  calendarOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  shieldCheckmark,
  locationOutline,
  chevronDownOutline,
  colorPaletteOutline,
  trophyOutline,
  fingerPrintOutline,
  shapesOutline,
  createOutline,
  trendingUpOutline,
  ribbonOutline,
  medalOutline,
  starOutline,
  micOutline,
  musicalNoteOutline,
  brushOutline,
  desktopOutline,
  bookOutline,
  documentTextOutline,
  arrowForwardOutline,
  checkmarkCircleOutline,
  archiveOutline,
  cloudDoneOutline,
  folderOpenOutline,
  chevronForwardOutline,
  downloadOutline,
} from 'ionicons/icons';

import PimpinanTabbar from './PimpinanTabbar.vue';

const filters = [
  { label: 'Kota Manado 2025/2026', icon: locationOutline, dropdown: true },
  { label: 'FLS2N Seni', icon: colorPaletteOutline },
  { label: 'O2SN', icon: trophyOutline },
];
const active = ref(filters[0].label);

const medals = [
  { label: 'Emas', value: 18, icon: ribbonOutline, tone: 'gold' },
  { label: 'Perak', value: 24, icon: ribbonOutline, tone: 'silver' },
  { label: 'Perunggu', value: 36, icon: medalOutline, tone: 'bronze' },
  { label: 'Harapan', value: 46, icon: starOutline, tone: 'blue' },
];

const siswa = [
  {
    initial: 'GR', photo: '', name: 'Gisella M. Rantung', school: 'SMP Negeri 1 Manado', score: '94.8',
    icon: micOutline, award: 'Juara 1 FLS2N Menyanyi Solo', sideIcon: musicalNoteOutline,
    status: 'Direkomendasikan Lolos Seleksi Tingkat Provinsi Sulut', statusIcon: arrowForwardOutline, statusTone: 'green',
    noteIcon: archiveOutline, note: 'Tersimpan di Bank Talenta Daerah',
  },
  {
    initial: 'CP', photo: '', name: 'Christian J. Pangemanan', school: 'SMP Katolik Don Bosco Manado', score: '92.5',
    icon: brushOutline, award: 'Juara 1 Desain Poster Digital', sideIcon: desktopOutline,
    status: 'Tervalidasi E-Sertifikat Nasional', statusIcon: checkmarkCircleOutline, statusTone: 'blue',
    noteIcon: cloudDoneOutline, note: 'Karya Sinkron Puspresnas',
  },
  {
    initial: 'AR', photo: '', name: 'Aura V. Rumengan', school: 'SMP Negeri 8 Manado', score: '91.0',
    icon: documentTextOutline, award: 'Juara 1 Ilustrasi Gambar Bercerita', sideIcon: bookOutline,
    status: 'Penetapan Finalisasi Tahap Pembinaan', statusIcon: checkmarkCircleOutline, statusTone: 'gray',
    noteIcon: folderOpenOutline, note: 'Karya Terkurasi Tim Ahli Dikda',
  },
] as any[];
</script>

<style scoped>
.prestasi-content {
  --background: #f4f7fb;
}

.prestasi {
  min-height: 100%;
  background: #f4f7fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.prestasi ion-icon {
  flex-shrink: 0;
}

.prestasi button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.prestasi h1,
.prestasi h2,
.prestasi h3,
.prestasi p {
  margin: 0;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 14px 10px;
  background: #fff;
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.topbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 12px;
  background: #003178;
  font-size: 22px;
  color: #fff;
}

.topbar__text {
  min-width: 0;
}

.topbar__eyebrow {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #00639a;
}

.topbar__title {
  overflow: hidden;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 22px;
  color: #434652;
}

.topbar__dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e5383b;
}

.topbar__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 2px solid #b6d0f2;
  border-radius: 50%;
  background: #d9e8fb;
  font-size: 11px;
  font-weight: 800;
  color: #003178;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 14px 24px;
}

/* Akses */
.access {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 2px 0;
}

.access__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: #e6e9ee;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.access__chip ion-icon {
  font-size: 14px;
}

.access__cert {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.access__cert ion-icon {
  font-size: 15px;
  color: #f59e0b;
}

/* Judul */
.heading__title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
  color: #0b1a3d;
}

.heading__sub {
  margin-top: 2px !important;
  font-size: 13px;
  color: #475569;
}

.filters {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.filters::-webkit-scrollbar {
  display: none;
}

.filters__item {
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 999px;
  background: #fff !important;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.filters__item ion-icon {
  font-size: 18px;
}

.filters__item--active {
  background: #003178 !important;
  border-color: #003178 !important;
  font-weight: 700;
  color: #fff;
}

.filters__caret {
  font-size: 16px !important;
}

/* Otorisasi */
.auth {
  padding: 16px;
  border-radius: 22px;
  background: linear-gradient(145deg, #0d47a1 0%, #003178 100%);
  box-shadow: 0 8px 20px rgba(0, 49, 120, 0.25);
  color: #fff;
}

.auth__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.auth__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffd27a;
}

.auth__pill i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ffba38;
}

.auth__tte {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #d9e2ff;
}

.auth__tte ion-icon {
  font-size: 18px;
}

.auth__title {
  margin-top: 16px !important;
  font-size: 18px;
  line-height: 25px;
  font-weight: 800;
}

.auth__no {
  margin-top: 6px !important;
  font-family: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;
  font-size: 11px;
  color: #b0c6ff;
}

.auth__info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px;
  margin-top: 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
}

.auth__item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 10px;
  font-size: 18px;
}

.auth__icon--gold {
  background: #ffba38;
  color: #4a2f00;
}

.auth__icon--blue {
  background: rgba(255, 255, 255, 0.2);
  color: #b0c6ff;
}

.auth__text small {
  display: block;
  font-size: 11px;
  color: #b0c6ff;
}

.auth__text b {
  font-size: 13px;
}

.auth__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 14px;
  padding: 16px;
  border-radius: 14px;
  background: #fff !important;
  font-size: 14px;
  font-weight: 700;
  color: #003178 !important;
  transition: transform 0.15s ease;
}

.auth__btn:active {
  transform: scale(0.98);
}

.auth__btn ion-icon {
  font-size: 20px;
}

/* Section head */
.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-top: 6px;
}

.section-head--top {
  align-items: center;
  margin-top: 4px;
}

.section-head__title {
  font-size: 16px;
  line-height: 22px;
  font-weight: 800;
}

.section-head__title--icon {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.section-head__title--icon ion-icon {
  font-size: 20px;
  color: #003178;
}

.section-head__note {
  max-width: 100px;
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  color: #00639a;
}

.section-head__link {
  font-size: 12px;
  font-weight: 700;
  color: #00639a;
  text-decoration: none;
}

/* Rekap */
.recap {
  padding: 14px;
  border: 1px solid #e6e9ee;
  border-radius: 20px;
  background: #fff;
}

.recap__main {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 16px;
  background: #f1f4f8;
}

.recap__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 14px;
  background: #d9e8fb;
  font-size: 24px;
  color: #003178;
}

.recap__text {
  flex: 1;
}

.recap__value {
  display: block;
  font-size: 26px;
  line-height: 30px;
  font-weight: 800;
}

.recap__text small {
  font-size: 12px;
  color: #475569;
}

.recap__badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #d1fae5;
  font-size: 11px;
  font-weight: 700;
  color: #047857;
}

.medals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 12px;
}

.medal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 12px 4px;
  border-radius: 14px;
  background: #f1f4f8;
}

.medal__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
  border-radius: 50%;
  font-size: 17px;
}

.medal__icon--gold {
  background: #fde8b8;
  color: #b45309;
}

.medal__icon--silver {
  background: #e2e8f0;
  color: #475569;
}

.medal__icon--bronze {
  background: #fde0cc;
  color: #9a3412;
}

.medal__icon--blue {
  background: #cfe3fb;
  color: #003178;
}

.medal__value {
  font-size: 18px;
  font-weight: 800;
}

.medal__label {
  font-size: 12px;
  color: #475569;
}

/* Siswa */
.student {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e6e9ee;
  border-radius: 20px;
  background: #fff;
}

.student__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student__photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #b6d0f2, #003178);
}

.student__img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.student__initial {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
}

.student__rank {
  position: absolute;
  right: -4px;
  bottom: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #f59e0b;
  font-size: 10px;
  font-style: normal;
  font-weight: 800;
  color: #fff;
}

.student__who {
  flex: 1;
  min-width: 0;
}

.student__name {
  display: block;
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
}

.student__school {
  font-size: 12px;
  color: #64748b;
}

.student__score {
  text-align: right;
}

.student__score b {
  display: block;
  font-size: 22px;
  line-height: 26px;
  font-weight: 800;
  color: #003178;
}

.student__score small {
  font-size: 11px;
  color: #475569;
}

.award {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid #e6e9ee;
  border-radius: 14px;
  background: #f1f4f8;
}

.award__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.award__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #003178;
}

.award__title ion-icon {
  font-size: 17px;
}

.award__side {
  font-size: 18px;
  color: #475569;
}

.award__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 16px;
}

.award__status ion-icon {
  font-size: 16px;
}

.award__status--green {
  background: #e3f6ec;
  color: #047857;
}

.award__status--blue {
  background: #e3effc;
  color: #003178;
}

.award__status--gray {
  background: #e6e9ee;
  color: #334155;
}

.student__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.student__note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #00639a;
}

.student__note ion-icon {
  font-size: 18px;
}

.student__btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 18px;
  border-radius: 10px;
  background: #e6e9ee !important;
  font-size: 13px;
  font-weight: 600;
  color: #191c1e !important;
}

.student__btn ion-icon {
  font-size: 14px;
}

/* Unduh */
.export {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  background: #e6e9ee !important;
  font-size: 13px;
  font-weight: 600;
  color: #003178 !important;
}

.export ion-icon {
  font-size: 20px;
}

.sync {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 17px;
  color: #475569;
}

.sync ion-icon {
  flex: none;
  font-size: 16px;
}
</style>