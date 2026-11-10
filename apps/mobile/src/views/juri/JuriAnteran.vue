<template>
  <ion-page>
    <ion-content :fullscreen="true" class="antrean-content">
      <div class="antrean">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="hammerOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">SIKARYA Juri Manado</h1>
              <p class="topbar__subtitle">Disdikbud Kota Manado</p>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Jadwal"><ion-icon :icon="calendarOutline" /></button>
            <button class="topbar__btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <i class="topbar__dot"></i>
            </button>
          </div>
        </header>

        <div class="body">
          <!-- Judul -->
          <section class="heading">
            <div>
              <h2 class="heading__title">Antrean Penilaian</h2>
              <p class="heading__subtitle">Penjurian Tahap Final Tingkat Kota 2026</p>
            </div>
            <span class="heading__badge"><ion-icon :icon="shieldCheckmarkOutline" /> Juri Resmi</span>
          </section>

          <!-- Status beban -->
          <section class="beban">
            <div class="beban__head">
              <span class="beban__title"><ion-icon :icon="gridOutline" /> Status Beban Penilaian</span>
              <span class="beban__deadline"><ion-icon :icon="calendarOutline" /> Tenggat: 28 Feb 2026</span>
            </div>
            <div class="beban__grid">
              <div v-for="b in beban" :key="b.label" class="beban__card">
                <div class="beban__label">
                  <span>{{ b.label }}</span>
                  <i class="beban__dot" :class="'beban__dot--' + b.tone"></i>
                </div>
                <div class="beban__value"><b>{{ b.value }}</b><span>{{ b.unit }}</span></div>
              </div>
            </div>
          </section>

          <!-- Pencarian & filter -->
          <div class="search">
            <ion-icon class="search__icon" :icon="searchOutline" />
            <input v-model="query" class="search__input" type="text" placeholder="Cari nomor undian atau nama peserta..." />
            <ion-icon class="search__filter" :icon="optionsOutline" />
          </div>

          <div class="filters">
            <button
              v-for="f in filters"
              :key="f"
              class="filters__item"
              :class="{ 'filters__item--active': active === f }"
              type="button"
              @click="active = f"
            >
              <ion-icon v-if="active === f" :icon="checkmarkOutline" />
              {{ f }}
            </button>
          </div>

          <!-- Antrean -->
          <article v-for="a in antrean" :key="a.no" class="item" :class="{ 'item--active': a.status === 'draft' }">
            <div class="item__top">
              <span class="item__tag"><ion-icon :icon="a.tagIcon" /> Antrean #{{ a.no }} • {{ a.lomba }}</span>
              <span class="item__status" :class="'item__status--' + a.status">{{ a.statusLabel }}</span>
            </div>

            <h3 class="item__title">{{ a.title }}</h3>
            <p class="item__peserta">
              <ion-icon :icon="schoolOutline" />
              <b>{{ a.name }}</b>
              <i class="item__sep"></i>
              <span>{{ a.school }}</span>
            </p>

            <div v-if="a.files" class="item__files">
              <span v-for="f in a.files" :key="f.label" class="file"><ion-icon :icon="f.icon" /> {{ f.label }}</span>
            </div>
            <p v-if="a.time" class="item__time"><ion-icon :icon="timeOutline" /> {{ a.time }}</p>

            <!-- Progres draf -->
            <div v-if="a.progress" class="draft">
              <div class="draft__head">
                <span class="draft__count"><ion-icon :icon="checkboxOutline" /> {{ a.progress.filled }} dari {{ a.progress.total }} Kriteria Terisi</span>
                <b class="draft__score">Skor Sementara: {{ a.progress.score }}</b>
              </div>
              <div class="draft__track"><div class="draft__fill" :style="{ width: (a.progress.filled / a.progress.total) * 100 + '%' }"></div></div>
              <div class="draft__criteria">
                <span v-for="c in a.progress.criteria" :key="c.name" class="draft__item" :class="{ 'draft__item--empty': !c.done }">
                  {{ c.name }}<br />({{ c.done ? 'Done' : 'Kosong' }})
                </span>
              </div>
            </div>

            <div v-if="a.status === 'wait'" class="item__divider"></div>
            <div v-if="a.status === 'idle'" class="item__divider"></div>

            <button class="cta" :class="'cta--' + a.status" type="button">
              {{ a.cta }}
              <ion-icon :icon="a.ctaIcon" />
            </button>
          </article>

          <!-- Petunjuk -->
          <section class="note">
            <ion-icon class="note__icon" :icon="informationCircleOutline" />
            <div>
              <b class="note__title">Petunjuk Dewan Juri</b>
              <p class="note__text">
                Sesuai regulasi Disdikbud Sulut, seluruh rubrik penilaian wajib disimpan sebagai draf sebelum batas waktu 28
                Februari 2026 pukul 23:59 WITA untuk rekonsiliasi sidang pleno.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ion-content>

    <JuriTabbar variant="soft" />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  hammerOutline,
  calendarOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  gridOutline,
  searchOutline,
  optionsOutline,
  checkmarkOutline,
  playForwardOutline,
  radioButtonOnOutline,
  colorPaletteOutline,
  schoolOutline,
  playCircleOutline,
  documentTextOutline,
  imageOutline,
  timeOutline,
  checkboxOutline,
  arrowForwardOutline,
  createOutline,
  readerOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import JuriTabbar from './JuriTabbar.vue';

const query = ref('');
const filters = ['Semua Antrean (6)', 'FLS2N Tari (4)', 'Kriya Vokasi (2)'];
const active = ref(filters[0]);

const beban = [
  { label: 'Menunggu Dinilai', value: 6, unit: 'Karya', tone: 'amber' },
  { label: 'Draf Berjalan', value: 2, unit: 'Belum Final', tone: 'blue' },
];

const antrean = [
  {
    no: '01', lomba: 'FLS2N Tari Kreasi', tagIcon: playForwardOutline, status: 'wait', statusLabel: 'Menunggu Juri',
    title: 'Tari Kreasi Nuansa Mapalus Minahasa', name: 'Kevin Pangkey', school: 'SMP Negeri 1 Manado',
    files: [
      { label: 'Video MP4 (8 Menit)', icon: playCircleOutline },
      { label: 'Naskah PDF', icon: documentTextOutline },
    ],
    time: '14.20 WITA', cta: 'Mulai Menilai Sekarang', ctaIcon: arrowForwardOutline,
  },
  {
    no: '02', lomba: 'FLS2N Tari Kreasi', tagIcon: radioButtonOnOutline, status: 'draft', statusLabel: 'Draf Tersimpan',
    title: 'Harmoni Danau Tondano & Teluk Manado', name: 'Kezia Wenas', school: 'SMKN 1 Manado',
    progress: {
      filled: 3, total: 4, score: '78.50',
      criteria: [
        { name: 'Wiraga', done: true },
        { name: 'Wirama', done: true },
        { name: 'Wirasa', done: true },
        { name: 'Kreativitas', done: false },
      ],
    },
    cta: 'Lanjutkan Penilaian', ctaIcon: createOutline,
  },
  {
    no: '03', lomba: 'Festival Kriya', tagIcon: colorPaletteOutline, status: 'idle', statusLabel: 'Belum Dimulai',
    title: 'Kerajinan Anyaman Bambu Minahasa Modern', name: 'Jonathan Mandey', school: 'SMKN 2 Manado',
    files: [
      { label: 'Foto Portofolio HD (6 File)', icon: imageOutline },
      { label: 'Proposal PDF', icon: documentTextOutline },
    ],
    cta: 'Buka Lembar Penilaian', ctaIcon: readerOutline,
  },
] as any[];
</script>

<style scoped>
.antrean-content {
  --background: #f7f9fb;
}

.antrean {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.antrean ion-icon {
  flex-shrink: 0;
}

.antrean button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.antrean h1,
.antrean h2,
.antrean h3,
.antrean p {
  margin: 0;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 16px 10px;
  background: #fff;
  border-bottom: 1px solid #e0e3e5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 12px;
  background: #003178;
  font-size: 24px;
  color: #fff;
}

.topbar__title {
  font-size: 19px;
  line-height: 24px;
  font-weight: 800;
  color: #0d47a1;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  font-size: 12px;
  line-height: 16px;
  color: #434652;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 24px;
  color: #434652;
}

.topbar__dot {
  position: absolute;
  top: -1px;
  right: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #e5383b;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 24px;
}

/* Judul */
.heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
}

.heading__title {
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
}

.heading__subtitle {
  font-size: 13px;
  color: #434652;
}

.heading__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid #b0c6ff;
  border-radius: 999px;
  background: #e8f0fe;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: #003178;
}

.heading__badge ion-icon {
  font-size: 15px;
}

/* Beban */
.beban {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.beban__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.beban__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
}

.beban__title ion-icon {
  font-size: 18px;
  color: #003178;
}

.beban__deadline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid #f3d98a;
  border-radius: 999px;
  background: #fff3d6;
  font-size: 12px;
  font-weight: 600;
  color: #7a3e00;
}

.beban__deadline ion-icon {
  font-size: 15px;
}

.beban__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 14px;
}

.beban__card {
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: linear-gradient(135deg, #f7f9fb, #eceef0);
}

.beban__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #434652;
}

.beban__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.beban__dot--amber {
  background: #f59e0b;
}

.beban__dot--blue {
  background: #0d47a1;
}

.beban__value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 8px;
}

.beban__value b {
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
  color: #003178;
}

.beban__value span {
  font-size: 14px;
  font-weight: 500;
}

/* Search & filters */
.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search__icon {
  position: absolute;
  left: 14px;
  font-size: 22px;
  color: #434652;
}

.search__input {
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  padding: 0 48px;
  border: 1px solid #c3c6d4;
  border-radius: 14px;
  background: #fff;
  font: inherit;
  font-size: 15px;
  color: #191c1e;
  outline: none;
}

.search__input::placeholder {
  color: rgba(67, 70, 82, 0.7);
}

.search__input:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.search__filter {
  position: absolute;
  right: 14px;
  font-size: 22px;
  color: #434652;
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
  gap: 6px;
  padding: 10px 18px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: #191c1e;
}

.filters__item ion-icon {
  font-size: 18px;
}

.filters__item--active {
  background: #0d47a1 !important;
  border-color: #0d47a1 !important;
  font-weight: 700;
  color: #fff;
}

/* Item antrean */
.item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.item--active {
  border-color: #7fb8f0;
  box-shadow: 0 0 0 2px rgba(127, 184, 240, 0.25);
}

.item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.item__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  background: #e6e8ea;
  font-size: 12px;
  font-weight: 600;
  color: #003178;
}

.item__tag ion-icon {
  font-size: 14px;
}

.item__status {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.item__status--wait {
  border: 1px solid #f3d98a;
  background: #fff1c9;
  color: #7a3e00;
}

.item__status--draft {
  background: #e8f0fe;
  color: #0d47a1;
}

.item__status--idle {
  background: #eceef0;
  color: #434652;
}

.item__title {
  font-size: 19px;
  line-height: 26px;
  font-weight: 800;
}

.item__peserta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #434652;
}

.item__peserta ion-icon {
  font-size: 18px;
  color: #00639a;
}

.item__peserta b {
  color: #191c1e;
  font-weight: 600;
}

.item__sep {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #737783;
}

.item__files {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.file {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e0e3e5;
  border-radius: 8px;
  background: #f2f4f6;
  font-size: 13px;
  color: #434652;
}

.file ion-icon {
  font-size: 18px;
}

.item__time {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  font-size: 13px;
  color: #434652;
}

.item__time ion-icon {
  font-size: 16px;
}

.item__divider {
  height: 1px;
  background: #e0e3e5;
}

/* Draf */
.draft {
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.draft__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.draft__count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #434652;
}

.draft__count ion-icon {
  font-size: 18px;
  color: #00639a;
}

.draft__score {
  font-size: 13px;
  color: #003178;
}

.draft__track {
  height: 8px;
  margin: 10px 0;
  border-radius: 999px;
  overflow: hidden;
  background: #dfe3e8;
}

.draft__fill {
  height: 100%;
  border-radius: 999px;
  background: #00639a;
}

.draft__criteria {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.draft__item {
  font-size: 12px;
  line-height: 16px;
  color: #737783;
}

.draft__item--empty {
  font-weight: 600;
  color: #b45309;
}

/* CTA */
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  transition: transform 0.15s ease;
}

.cta:active {
  transform: scale(0.98);
}

.cta ion-icon {
  font-size: 20px;
}

.cta--wait {
  background: #0d47a1 !important;
  color: #fff !important;
}

.cta--draft {
  flex-direction: row-reverse;
  background: #00639a !important;
  color: #fff !important;
}

.cta--idle {
  flex-direction: row-reverse;
  border: 1px solid #c3c6d4 !important;
  background: #f2f4f6 !important;
  color: #003178;
}

/* Petunjuk */
.note {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #eceef0;
}

.note__icon {
  font-size: 22px;
  color: #00639a;
}

.note__title {
  display: block;
  font-size: 14px;
}

.note__text {
  margin-top: 6px !important;
  font-size: 13px;
  line-height: 20px;
  color: #434652;
}

</style>