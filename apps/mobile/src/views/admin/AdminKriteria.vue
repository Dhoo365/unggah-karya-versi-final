<template>
  <ion-page>
    <ion-content :fullscreen="true" class="kriteria-content">
      <div class="kriteria">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="shieldCheckmarkOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">Kriteria &amp; Rubrik Nilai</h1>
              <p class="topbar__subtitle">Standar Disdikbud Kota Manado</p>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Notifikasi"><ion-icon :icon="notificationsOutline" /></button>
            <button class="topbar__btn" type="button" aria-label="Pengaturan"><ion-icon :icon="settingsOutline" /></button>
          </div>
        </header>

        <div class="body">
          <!-- Regulasi -->
          <section class="reg">
            <div class="reg__icon"><ion-icon :icon="clipboardOutline" /></div>
            <div class="reg__content">
              <div class="reg__meta">
                <span class="reg__tag">Regulasi 2026</span>
                <small class="reg__sk">SK Disdik Sulut No. 44/Dikda-03</small>
              </div>
              <h2 class="reg__title">Format Standar Penilaian Resmi TA 2025/2026</h2>
              <p class="reg__text">
                Metode kurasi menggunakan skala baku <b>10 - 100 poin</b> rujukan Puspresnas Kemendikbudristek untuk
                sinkronisasi otomatis ke Pangkalan Talenta Daerah.
              </p>
            </div>
          </section>

          <!-- Kategori terpilih -->
          <section class="card">
            <div class="category__head">
              <span class="category__label">Kategori &amp; Cabang Terpilih</span>
              <span class="badge badge--green"><ion-icon :icon="lockClosedOutline" /> Rubrik Terkunci &amp; Aktif</span>
            </div>
            <button class="category__select" type="button">
              <span class="category__trophy"><ion-icon :icon="trophyOutline" /></span>
              <span class="category__info">
                <b class="category__name">FLS2N Seni Budaya &amp; Tari Kreasi 2026 – Kota Manado</b>
                <small class="category__level">Jenjang SMA / SMK Se-Kota Manado (Babak Final)</small>
              </span>
              <ion-icon class="category__chevron" :icon="chevronExpandOutline" />
            </button>
            <div class="category__foot">
              <span class="category__stat"><ion-icon :icon="hammerOutline" /> 3 Juri Terverifikasi</span>
              <span class="category__stat"><ion-icon :icon="peopleOutline" /> 28 Peserta Finalis</span>
            </div>
          </section>

          <!-- Akumulasi bobot -->
          <section class="card">
            <div class="weight__head">
              <h2 class="weight__title">Akumulasi Bobot Kriteria</h2>
              <span class="badge badge--green"><i class="badge__dot"></i><ion-icon :icon="checkmarkCircleOutline" /> {{ total }}% Terdistribusi (Seimbang)</span>
            </div>
            <div class="weight__bar">
              <div v-for="c in kriteria" :key="c.no" class="weight__seg" :class="'weight__seg--' + c.tone" :style="{ width: c.weight + '%' }"></div>
            </div>
            <ul class="weight__legend">
              <li v-for="c in kriteria" :key="c.no" class="weight__item">
                <i class="weight__dot" :class="'weight__dot--' + c.tone"></i>
                <b>{{ c.weight }}%</b>
                <span>{{ c.short }}</span>
              </li>
            </ul>
          </section>

          <!-- Rincian -->
          <div class="section-head">
            <h2 class="section-head__title"><ion-icon :icon="optionsOutline" /> Rincian Komponen Penilaian</h2>
            <small class="section-head__note">3 Parameter Wajib</small>
          </div>

          <article v-for="c in kriteria" :key="c.no" class="card item">
            <div class="item__top">
              <div class="item__no" :class="'item__no--' + c.tone2">{{ c.no }}</div>
              <div class="item__head">
                <span class="item__tag" :class="'item__tag--' + c.tone2">Sub-Bobot: {{ c.weight }}%</span>
                <h3 class="item__title">{{ c.title }}</h3>
              </div>
              <button class="item__menu" type="button" aria-label="Opsi"><ion-icon :icon="ellipsisVertical" /></button>
            </div>

            <p class="item__indicator"><b>Indikator Kurasi:</b> {{ c.indicator }}</p>

            <div class="item__foot">
              <span class="item__grade-label"><ion-icon :icon="flagOutline" /> Batas Lulus (Passing Grade):</span>
              <b class="item__grade">Min. {{ c.min }} Poin</b>
              <button class="item__edit" type="button"><ion-icon :icon="createOutline" /> Ubah Bobot</button>
            </div>
          </article>

          <div class="bottom">
            <button class="bottom__btn bottom__btn--outline" type="button">
              <ion-icon :icon="addCircleOutline" /> + Tambah Kriteria Baru
            </button>
            <button class="bottom__btn bottom__btn--primary" type="button">
              <ion-icon :icon="copyOutline" /> + Salin Rubrik ke Cabang Lomba Lain
            </button>
          </div>
        </div>
      </div>
    </ion-content>

    <AdminTabBar />
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  shieldCheckmarkOutline,
  notificationsOutline,
  settingsOutline,
  clipboardOutline,
  lockClosedOutline,
  trophyOutline,
  chevronExpandOutline,
  hammerOutline,
  peopleOutline,
  checkmarkCircleOutline,
  optionsOutline,
  ellipsisVertical,
  flagOutline,
  createOutline,
  addCircleOutline,
  copyOutline,
} from 'ionicons/icons';

import AdminTabBar from './AdminTabBar.vue';

const kriteria = [
  {
    no: '01',
    weight: 35,
    min: 70,
    tone: 'navy',
    tone2: 'blue',
    short: 'Orisinalitas Lokal',
    title: 'Kreativitas & Orisinalitas Kearifan Lokal',
    indicator:
      'Keaslian koreografi dan nilai budaya khas Minahasa / Manado, keutuhan pesan folklorik daerah, serta unsur eksplorasi artistik otentik.',
  },
  {
    no: '02',
    weight: 40,
    min: 75,
    tone: 'blue',
    tone2: 'blue',
    short: 'Kesesuaian Teknis',
    title: 'Kesesuaian Teknis & Portofolio',
    indicator:
      'Harmonisasi irama musik dan ketepatan wiraga (sikap badan, dinamika tempo tarian kolosal/tunggal), teknik dasar gerakan, dan stabilitas panggung.',
  },
  {
    no: '03',
    weight: 25,
    min: 70,
    tone: 'amber',
    tone2: 'amber',
    short: 'Tata Rias Budaya',
    title: 'Tata Rias & Properti Adat',
    indicator:
      'Kesopanan busana daerah, kepatutan ornamen kostum adat suku Minahasa, estetika tata rias panggung, dan etika pementasan santun.',
  },
];

const total = computed(() => kriteria.reduce((sum, c) => sum + c.weight, 0));
</script>

<style scoped>
.kriteria-content {
  --background: #f7f9fb;
}

.kriteria {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.kriteria ion-icon {
  flex-shrink: 0;
}

.kriteria button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.kriteria h1,
.kriteria h2,
.kriteria h3,
.kriteria p {
  margin: 0;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
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
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 12px;
  background: #d9e2ff;
  font-size: 22px;
  color: #0d47a1;
}

.topbar__title {
  font-size: 18px;
  line-height: 22px;
  font-weight: 800;
  color: #001a6e;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  font-size: 11px;
  line-height: 14px;
  color: #434652;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar__btn {
  display: flex;
  font-size: 24px;
  color: #191c1e;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 24px;
}

/* Card */
.card {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

/* Regulasi */
.reg {
  display: flex;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 40%, #e8f0fe 100%);
}

.reg__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 10px;
  background: #d9e2ff;
  font-size: 20px;
  color: #0d47a1;
}

.reg__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.reg__tag {
  padding: 3px 10px;
  border-radius: 8px;
  background: #d9e2ff;
  font-size: 11px;
  font-weight: 700;
  color: #0d47a1;
}

.reg__sk {
  font-size: 11px;
  color: #434652;
}

.reg__title {
  margin-top: 8px !important;
  font-size: 15px;
  line-height: 22px;
  font-weight: 800;
}

.reg__text {
  margin-top: 8px !important;
  font-size: 12px;
  line-height: 20px;
  color: #434652;
}

.reg__text b {
  color: #0d47a1;
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
}

.badge ion-icon {
  font-size: 16px;
}

.badge--green {
  background: #d1fae5;
  color: #065f46;
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

/* Kategori */
.category__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.category__label {
  max-width: 140px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #737783;
}

.category__select {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 12px;
  background: #f7f9fb !important;
  text-align: left;
}

.category__trophy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  background: #ffdeac;
  font-size: 22px;
  color: #674600;
}

.category__info {
  flex: 1;
}

.category__name {
  display: block;
  font-size: 14px;
  line-height: 18px;
}

.category__level {
  display: block;
  font-size: 11px;
  line-height: 14px;
  color: #434652;
}

.category__chevron {
  font-size: 18px;
  color: #434652;
}

.category__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 11px;
  color: #434652;
}

.category__stat {
  display: flex;
  align-items: center;
  gap: 6px;
}

.category__stat ion-icon {
  font-size: 16px;
  color: #0d47a1;
}

/* Akumulasi bobot */
.weight__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.weight__title {
  font-size: 15px;
  line-height: 22px;
  font-weight: 800;
}

.weight__bar {
  display: flex;
  height: 10px;
  margin: 14px 0;
  border-radius: 999px;
  overflow: hidden;
  background: #eceef0;
}

.weight__seg {
  height: 100%;
}

.weight__seg--navy {
  background: #003178;
}

.weight__seg--blue {
  background: #00639a;
}

.weight__seg--amber {
  background: #ffba38;
}

.weight__legend {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.weight__item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.weight__item b {
  min-width: 28px;
}

.weight__item span {
  color: #434652;
}

.weight__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.weight__dot--navy {
  background: #003178;
}

.weight__dot--blue {
  background: #00639a;
}

.weight__dot--amber {
  background: #ffba38;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}

.section-head__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
}

.section-head__title ion-icon {
  font-size: 20px;
  color: #0d47a1;
}

.section-head__note {
  font-size: 11px;
  color: #737783;
}

/* Item kriteria */
.item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item__top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.item__no {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
}

.item__no--blue {
  background: #d9e2ff;
  color: #0d47a1;
}

.item__no--amber {
  background: #ffdeac;
  color: #674600;
}

.item__head {
  flex: 1;
}

.item__tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.item__tag--blue {
  background: #d9e2ff;
  color: #001a6e;
}

.item__tag--amber {
  background: #ffdeac;
  color: #674600;
}

.item__title {
  margin-top: 6px !important;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.item__menu {
  display: flex;
  font-size: 20px;
  color: #434652;
}

.item__indicator {
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 10px;
  background: #f2f4f6;
  font-size: 12px;
  line-height: 20px;
  color: #434652;
}

.item__indicator b {
  color: #191c1e;
}

.item__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid #e0e3e5;
}

.item__grade-label {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #434652;
}

.item__grade-label ion-icon {
  font-size: 18px;
  color: #674600;
}

.item__grade {
  width: 64px;
  font-size: 12px;
  line-height: 16px;
  color: #0d47a1;
}

.item__edit {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px solid #0d47a1 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
  color: #0d47a1;
}

.item__edit ion-icon {
  font-size: 16px;
}

/* Tombol bawah */
.bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bottom__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  transition: transform 0.15s ease;
}

.bottom__btn:active {
  transform: scale(0.98);
}

.bottom__btn ion-icon {
  font-size: 20px;
}

.bottom__btn--outline {
  background: #fff !important;
  border: 1px solid #e0e3e5 !important;
  color: #0d47a1;
}

.bottom__btn--primary {
  background: #003178 !important;
  color: #fff !important;
}
</style>