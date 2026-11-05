<template>
  <ion-page>
    <ion-content :fullscreen="true" class="tugas-content">
      <div class="tugas">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="hammerOutline" /></div>
            <div class="topbar__text">
              <div class="topbar__row">
                <h1 class="topbar__title">SIKARYA</h1>
                <span class="topbar__city">MANADO</span>
              </div>
              <p class="topbar__subtitle">Portal Penjurian Resmi Dikda Sulut</p>
            </div>
          </div>
          <button class="topbar__bell" type="button" aria-label="Notifikasi">
            <ion-icon :icon="notificationsOutline" />
            <i class="topbar__dot"></i>
          </button>
        </header>

        <div class="body">
          <!-- Profil juri -->
          <section class="profile">
            <div class="profile__top">
              <div class="profile__photo">
                <img v-if="juri.photo" class="profile__img" :src="juri.photo" :alt="juri.name" />
                <span v-else class="profile__initial">{{ juri.initial }}</span>
                <i class="profile__badge"></i>
              </div>
              <div class="profile__info">
                <h2 class="profile__name">{{ juri.name }}</h2>
                <b class="profile__role">{{ juri.role }}</b>
                <p class="profile__meta">NIP: {{ juri.nip }}</p>
                <p class="profile__meta">{{ juri.org }}</p>
              </div>
            </div>
            <div class="profile__foot">
              <span class="chip-ok">Pakta Integritas Aktif</span>
              <span class="profile__access"><ion-icon :icon="keyOutline" /> Hak Akses Penuh</span>
            </div>
          </section>

          <!-- Peringatan batas waktu -->
          <section class="deadline">
            <div class="deadline__icon"><ion-icon :icon="alarmOutline" /></div>
            <div class="deadline__text">
              <b class="deadline__title">Batas Penilaian Mendekat</b>
              <p class="deadline__desc">Input skor akhir rubrik ditutup <b>28 Februari 2026</b> pukul 23:59 WITA.</p>
            </div>
            <span class="deadline__badge">3 Hari Lagi</span>
          </section>

          <!-- Rekapitulasi -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Rekapitulasi Tugas Juri</h2>
              <span class="section-head__note section-head__note--blue">Tahun Ajaran 2025/2026</span>
            </div>
            <div class="recap">
              <div v-for="r in recap" :key="r.label" class="recap__card">
                <div class="recap__head">
                  <ion-icon class="recap__icon" :class="'recap__icon--' + r.tone" :icon="r.icon" />
                  <span class="recap__tag" :class="'recap__tag--' + r.tone">{{ r.tag }}</span>
                </div>
                <b class="recap__value" :class="'recap__value--' + r.tone">{{ r.value }}</b>
                <span class="recap__label">{{ r.label }}</span>
              </div>
            </div>
          </section>

          <!-- Cabang lomba -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Cabang Lomba Ditugaskan</h2>
              <span class="section-head__note">2 Aktif</span>
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
          </section>

          <article v-for="l in lombas" :key="l.title" class="lomba">
            <div class="lomba__top">
              <span class="lomba__tag" :class="'lomba__tag--' + l.tone"><ion-icon :icon="l.tagIcon" /> {{ l.tag }}</span>
              <span class="lomba__status" :class="'lomba__status--' + l.tone"><i></i> {{ l.status }}</span>
            </div>

            <h3 class="lomba__title">{{ l.title }}</h3>
            <p class="lomba__line lomba__line--blue"><ion-icon :icon="l.lineIcon" /> {{ l.line }}</p>
            <p class="lomba__line"><ion-icon :icon="documentTextOutline" /> {{ l.doc }}</p>

            <div class="progress">
              <div class="progress__head">
                <span class="progress__label">Progres Penilaian Juri</span>
                <b class="progress__value">{{ l.done }} / {{ l.total }} Peserta ({{ percent(l) }}%)</b>
              </div>
              <div class="progress__track">
                <div class="progress__fill" :class="'progress__fill--' + l.tone" :style="{ width: percent(l) + '%' }"></div>
              </div>
              <div class="progress__foot">
                <small class="progress__left">{{ l.left }}</small>
                <small class="progress__note" :class="'progress__note--' + l.noteTone">{{ l.note }}</small>
              </div>
            </div>

            <button class="lomba__cta" type="button">
              <ion-icon :icon="l.ctaIcon" /> Buka Antrean Karya Peserta
            </button>
          </article>

          <!-- Instruksi -->
          <section class="info">
            <h2 class="info__title"><ion-icon :icon="megaphoneOutline" /> Instruksi Tim Teknis SIKARYA Sulut</h2>
            <p class="info__text">
              Setiap dewan juri wajib memastikan penilaian 4 aspek kriteria (Orisinalitas, Teknik, Penghayatan, dan
              Kesesuaian Tema) telah tersimpan dengan status verifikasi ganda sebelum sinkronisasi data final ke
              Puspresnas/Dinas Provinsi.
            </p>
            <div class="info__foot">
              <span class="info__org">Sekretariat Disdikbud Kota Manado</span>
              <a class="info__link" href="#">Unduh Panduan Rubrik PDF</a>
            </div>
          </section>
        </div>
      </div>
    </ion-content>

    <juri-tabbar/>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  hammerOutline,
  notificationsOutline,
  keyOutline,
  alarmOutline,
  clipboardOutline,
  checkmarkCircleOutline,
  timeOutline,
  checkmarkOutline,
  ribbonOutline,
  colorPaletteOutline,
  schoolOutline,
  constructOutline,
  documentTextOutline,
  playCircleOutline,
  listOutline,
  megaphoneOutline,
} from 'ionicons/icons';

import JuriTabbar from './JuriTabbar.vue';

const juri = {
  name: 'Dr. Timothy Mumek, S.T., M.T.',
  role: 'Ketua Dewan Juri Kota Manado',
  nip: '197805142003121002',
  org: 'UNIMA / Disdikbud Kota Manado',
  initial: 'TM',
  photo: '', // isi dengan path foto, misalnya '/assets/juri/timothy.jpg'
};

const recap = [
  { label: 'Total Karya', value: 24, tag: 'Beban', tone: 'blue', icon: clipboardOutline },
  { label: 'Selesai', value: 18, tag: '75%', tone: 'green', icon: checkmarkCircleOutline },
  { label: 'Belum Nilai', value: 6, tag: 'Wajib', tone: 'orange', icon: timeOutline },
];

const filters = ['Semua Lomba', 'FLS2N Seni Tari', 'FLS2N Vokal Solo'];
const active = ref(filters[0]);

const lombas = [
  {
    tag: 'FLS2N 2026', tagIcon: ribbonOutline, tone: 'blue', status: 'Penjurian Berlangsung',
    title: 'FLS2N Seni Budaya & Tari Kreasi 2026 – Kota Manado',
    lineIcon: schoolOutline, line: 'Jenjang SMP & SMA Se-Kota Manado',
    doc: 'SK Kadis No. 420/Disdik-Mdo/2026',
    done: 10, total: 14, left: 'Sisa 4 karya video tari', note: 'Tenggat: 28 Feb', noteTone: 'orange',
    ctaIcon: playCircleOutline,
  },
  {
    tag: 'Kriya & Desain', tagIcon: colorPaletteOutline, tone: 'amber', status: 'Penjurian Tahap 1',
    title: 'Festival Inovasi Kriya & Desain Kreatif Pelajar Manado',
    lineIcon: constructOutline, line: 'Kategori: SMK Vokasi',
    doc: 'Rubrik: Estetika, Ergonomi, Portofolio PDF',
    done: 8, total: 10, left: 'Sisa 2 portofolio fisik/desain', note: 'Tersedia Berkas', noteTone: 'green',
    ctaIcon: listOutline,
  },
] as any[];

const percent = (l: { done: number; total: number }) => Math.round((l.done / l.total) * 100);
</script>

<style scoped>
.tugas-content {
  --background: #f7f9fb;
}

.tugas {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.tugas ion-icon {
  flex-shrink: 0;
}

.tugas button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.tugas h1,
.tugas h2,
.tugas h3,
.tugas p {
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
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
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

.topbar__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 800;
  color: #0d47a1;
}

.topbar__city {
  padding: 1px 8px;
  border-radius: 6px;
  background: #d9e2ff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #0d47a1;
}

.topbar__subtitle {
  font-size: 12px;
  line-height: 16px;
  color: #434652;
}

.topbar__bell {
  position: relative;
  display: flex;
  font-size: 26px;
  color: #434652;
}

.topbar__dot {
  position: absolute;
  top: 0;
  right: 2px;
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

/* Profil */
.profile {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.profile__top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.profile__photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  flex: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #0d47a1);
  border: 2px solid #0d47a1;
}

.profile__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile__initial {
  font-size: 20px;
  font-weight: 800;
  color: #fff;
}

.profile__badge {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffba38;
  border: 2px solid #fff;
}

.profile__name {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
}

.profile__role {
  display: block;
  font-size: 13px;
  color: #0d47a1;
}

.profile__meta {
  font-size: 12px;
  line-height: 17px;
  color: #434652;
}

.profile__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #e0e3e5;
}

.chip-ok {
  padding: 6px 16px;
  border-radius: 999px;
  background: #d1fae5;
  font-size: 12px;
  font-weight: 700;
  color: #065f46;
}

.profile__access {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #737783;
}

.profile__access ion-icon {
  font-size: 18px;
}

/* Deadline */
.deadline {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #f3d98a;
  border-radius: 14px;
  background: #fff3cd;
}

.deadline__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  background: #ffe9a8;
  font-size: 22px;
  color: #92400e;
}

.deadline__text {
  flex: 1;
}

.deadline__title {
  display: block;
  font-size: 13px;
  color: #7a3e00;
}

.deadline__desc {
  font-size: 12px;
  line-height: 17px;
  color: #7a3e00;
}

.deadline__badge {
  flex: none;
  padding: 4px 10px;
  border-radius: 999px;
  background: #f59e0b;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-head__title {
  font-size: 17px;
  font-weight: 700;
}

.section-head__note {
  font-size: 13px;
  color: #737783;
}

.section-head__note--blue {
  font-size: 12px;
  font-weight: 600;
  color: #0d47a1;
}

/* Rekap */
.recap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.recap__card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.recap__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 24px;
}

.recap__icon {
  font-size: 22px;
}

.recap__icon--blue {
  color: #0d47a1;
}

.recap__icon--green {
  color: #047857;
}

.recap__icon--orange {
  color: #b45309;
}

.recap__tag {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.recap__tag--blue {
  background: transparent;
  font-weight: 500;
  color: #434652;
}

.recap__tag--green {
  background: #d1fae5;
  color: #047857;
}

.recap__tag--orange {
  background: #ffdad6;
  color: #93000a;
}

.recap__value {
  margin-top: 12px;
  font-size: 24px;
  line-height: 1;
  font-weight: 800;
}

.recap__value--green {
  color: #0d47a1;
}

.recap__value--orange {
  color: #b45309;
}

.recap__label {
  margin-top: 6px;
  font-size: 12px;
  color: #434652;
}

/* Filters */
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
  max-width: 140px;
  padding: 10px 18px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
  color: #191c1e;
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

/* Kartu lomba */
.lomba {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.lomba__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.lomba__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.lomba__tag--blue {
  background: #d9e2ff;
  color: #001a6e;
}

.lomba__tag--amber {
  background: #ffe9b8;
  color: #7a3e00;
}

.lomba__tag ion-icon {
  font-size: 15px;
}

.lomba__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.lomba__status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.lomba__status--blue {
  background: #d1fae5;
  color: #047857;
}

.lomba__status--amber {
  background: #fff1c9;
  color: #7a3e00;
}

.lomba__title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
}

.lomba__line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #434652;
}

.lomba__line ion-icon {
  font-size: 18px;
}

.lomba__line--blue {
  color: #00639a;
}

.lomba__line--blue ion-icon {
  color: #00639a;
}

/* Progres */
.progress {
  padding: 12px;
  margin-top: 4px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.progress__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.progress__label {
  font-size: 13px;
  color: #434652;
}

.progress__value {
  font-size: 14px;
  color: #003178;
}

.progress__track {
  height: 8px;
  margin: 10px 0 8px;
  border-radius: 999px;
  overflow: hidden;
  background: #dfe3e8;
}

.progress__fill {
  height: 100%;
  border-radius: 999px;
}

.progress__fill--blue {
  background: #003178;
}

.progress__fill--amber {
  background: #0a6aa8;
}

.progress__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress__left {
  font-size: 11px;
  color: #737783;
}

.progress__note {
  font-size: 11px;
  font-weight: 700;
}

.progress__note--orange {
  color: #b45309;
}

.progress__note--green {
  color: #047857;
}

/* CTA */
.lomba__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 6px;
  padding: 16px;
  border-radius: 12px;
  background: #003178 !important;
  font-size: 15px;
  font-weight: 700;
  color: #fff !important;
  transition: transform 0.15s ease;
}

.lomba__cta:active {
  transform: scale(0.98);
}

.lomba__cta ion-icon {
  font-size: 22px;
}

/* Instruksi */
.info {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.info__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #003178;
}

.info__title ion-icon {
  font-size: 20px;
}

.info__text {
  margin-top: 12px !important;
  font-size: 13px;
  line-height: 22px;
  color: #434652;
}

.info__foot {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #e0e3e5;
}

.info__org {
  font-size: 12px;
  line-height: 18px;
  color: #434652;
}

.info__link {
  max-width: 130px;
  font-size: 12px;
  line-height: 18px;
  color: #0d47a1;
  text-decoration: underline;
}
</style>