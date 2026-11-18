<template>
  <ion-page>
    <ion-content :fullscreen="true" class="eks-content">
      <div class="eks">
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
          <!-- Sambutan -->
          <section class="welcome">
            <i class="welcome__circle"></i>
            <div class="welcome__top">
              <span class="welcome__sync"><ion-icon :icon="syncOutline" /> Sinkronisasi Dapodik &amp; BSrE Aktif</span>
              <span class="welcome__live"><i></i> Live</span>
            </div>
            <p class="welcome__hello">Selamat Pagi, Yth.</p>
            <h2 class="welcome__name">{{ pimpinan.name }}</h2>
            <p class="welcome__role">{{ pimpinan.role }}</p>
            <div class="welcome__foot">
              <span class="welcome__year"><i><ion-icon :icon="calendarNumberOutline" /></i> T.A. 2025/2026</span>
              <small class="welcome__update">Update: Pk 08:15 WITA</small>
            </div>
          </section>

          <!-- Prioritas TTE -->
          <section class="priority">
            <div class="priority__icon"><ion-icon :icon="createOutline" /></div>
            <div class="priority__body">
              <div class="priority__tags">
                <span class="priority__tag">Prioritas 1</span>
                <small class="priority__sub">Tanda Tangan Elektronik</small>
              </div>
              <h3 class="priority__title">1 Draf SK Pemenang Menunggu TTE</h3>
              <p class="priority__text">
                Pengesahan juara Lomba O2SN Tingkat Kota Manado untuk penerbitan sertifikat digital BSrE.
              </p>
              <div class="priority__actions">
                <button class="priority__btn priority__btn--dark" type="button">
                  <ion-icon :icon="shieldCheckmarkOutline" /> Buka &amp; Tanda Tangani
                </button>
                <button class="priority__btn priority__btn--light" type="button">Pratinjau Draf</button>
              </div>
            </div>
          </section>

          <!-- Ringkasan kinerja -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Ringkasan Kinerja Wilayah</h2>
              <span class="section-head__note">Semester Genap</span>
            </div>
            <div class="kpis">
              <div v-for="k in kpis" :key="k.label" class="kpi">
                <div class="kpi__head">
                  <span class="kpi__icon" :class="'kpi__icon--' + k.tone"><ion-icon :icon="k.icon" /></span>
                  <span class="kpi__badge" :class="'kpi__badge--' + k.badgeTone">{{ k.badge }}</span>
                </div>
                <b class="kpi__value">{{ k.value }}</b>
                <span class="kpi__label">{{ k.label }}</span>
                <small class="kpi__note">{{ k.note }}</small>
              </div>
            </div>
          </section>

          <!-- Perhatian segera -->
          <section class="alert">
            <div class="alert__head">
              <h2 class="alert__title"><ion-icon :icon="warningOutline" /> Perhatian Segera Pimpinan</h2>
              <span class="alert__badge">2 Lomba Kritis</span>
            </div>
            <div class="alert__box">
              <div class="alert__row">
                <b class="alert__name">FLS2N Desain Poster Manado</b>
                <span class="alert__days"><ion-icon :icon="timeOutline" /> Sisa 2 Hari</span>
              </div>
              <p class="alert__text">Sisa 12 karya SMA/SMK belum dinilaikan oleh tim juri seni visual.</p>
              <div class="alert__track"><div class="alert__fill" :style="{ width: alertPercent + '%' }"></div></div>
              <div class="alert__foot">
                <small>31 dari 43 karya telah dinilai ({{ alertPercent }}%)</small>
                <a class="alert__link" href="#">Kirim Notif Juri <ion-icon :icon="arrowForwardOutline" /></a>
              </div>
            </div>
          </section>

          <!-- Peta partisipasi -->
          <section class="card">
            <div class="card__head">
              <div>
                <h2 class="card__title">Peta Partisipasi Sekolah</h2>
                <p class="card__sub">Cakupan registrasi karya per kecamatan di Manado</p>
              </div>
              <button class="card__map" type="button" aria-label="Peta"><ion-icon :icon="mapOutline" /></button>
            </div>

            <div class="zones">
              <div v-for="z in zones" :key="z.name" class="zone">
                <small class="zone__name">{{ z.name }}</small>
                <b class="zone__value">{{ z.value }}%</b>
                <span class="zone__state">Optimal</span>
              </div>
            </div>

            <div v-for="k in kecamatan" :key="k.name" class="bar">
              <div class="bar__row">
                <b>Kecamatan {{ k.name }}</b>
                <small>{{ k.percent }}% ({{ k.done }}/{{ k.total }} Sekolah)</small>
              </div>
              <div class="bar__track"><div class="bar__fill" :style="{ width: k.percent + '%' }"></div></div>
            </div>
          </section>

          <!-- Peringkat satdik -->
          <section class="card">
            <div class="card__head">
              <div>
                <h2 class="card__title">Peringkat Prestasi Satdik</h2>
                <p class="card__sub">Akumulasi perolehan skor karya tertinggi</p>
              </div>
              <a class="card__link" href="#">Lihat Semua</a>
            </div>
            <div v-for="(r, i) in ranking" :key="r.name" class="rank">
              <span class="rank__no" :class="{ 'rank__no--gold': i === 0 }">{{ i + 1 }}</span>
              <div class="rank__info">
                <b class="rank__name">{{ r.name }}</b>
                <small class="rank__meta">{{ r.karya }} Karya Disetujui • {{ r.emas }} Medali Emas Semester</small>
              </div>
              <b class="rank__score">{{ r.score }}</b>
            </div>
          </section>

          <!-- Aksi cepat -->
          <section>
            <h2 class="section-head__title section-head__title--solo">Aksi Cepat Pimpinan</h2>
            <button class="quick quick--main" type="button">
              <ion-icon class="quick__lead" :icon="documentsOutline" />
              <span>Unduh Ringkasan Eksekutif (1 Lembar PDF)</span>
              <ion-icon class="quick__trail" :icon="downloadOutline" />
            </button>
            <div class="quick__grid">
              <button class="quick quick--soft" type="button">
                <ion-icon :icon="pulseOutline" /> Pantau Live Skor Juri
              </button>
              <button class="quick quick--gray" type="button">
                <ion-icon :icon="trophyOutline" /> Daftar 54 Siswa Unggulan
              </button>
            </div>
          </section>
        </div>
      </div>
    </ion-content>

    <PimpinanTabbar/>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  businessOutline,
  calendarOutline,
  calendarNumberOutline,
  notificationsOutline,
  syncOutline,
  createOutline,
  shieldCheckmarkOutline,
  trophyOutline,
  folderOpenOutline,
  clipboardOutline,
  radioButtonOnOutline,
  warningOutline,
  timeOutline,
  arrowForwardOutline,
  mapOutline,
  documentsOutline,
  downloadOutline,
  pulseOutline,
} from 'ionicons/icons';

import PimpinanTabbar from './PimpinanTabbar.vue';

const pimpinan = {
  name: 'Dr. Femmy Sulistyowati, M.Pd.',
  role: 'Kepala Balai & Dewan Pengarah Talenta • Wilayah Kota Manado',
};

const kpis = [
  { label: 'Kompetisi Aktif', value: '8', note: 'FLS2N, O2SN, OSN, Fiksi', icon: trophyOutline, tone: 'blue', badge: '+2 Bulan', badgeTone: 'green' },
  { label: 'Karya Terunggah', value: '428', note: 'Dari 451 target sekolah', icon: folderOpenOutline, tone: 'blue', badge: '91.2%', badgeTone: 'blue' },
  { label: 'Progres Penjurian', value: '78.5%', note: 'Seleksi dinilai juri', icon: clipboardOutline, tone: 'blue', badge: '336 / 428', badgeTone: 'plain' },
  { label: 'Talenta Unggulan', value: '54', note: 'Lolos tiket Prov/Nasional', icon: radioButtonOnOutline, tone: 'amber', badge: 'Tervalidasi', badgeTone: 'amber' },
];

const alertPercent = 72;

const zones = [
  { name: 'Wenang', value: 96 },
  { name: 'Sario', value: 94 },
  { name: 'Malalayang', value: 92 },
];

const kecamatan = [
  { name: 'Wanea', percent: 88, done: 44, total: 50 },
  { name: 'Mapanget', percent: 85, done: 51, total: 60 },
  { name: 'Tikala', percent: 80, done: 32, total: 40 },
];

const ranking = [
  { name: 'SMAN 1 Manado', karya: 18, emas: 6, score: '94.8' },
  { name: 'SMKN 1 Manado', karya: 15, emas: 4, score: '91.2' },
  { name: 'SMAS MIS (Manado Independent)', karya: 12, emas: 3, score: '89.6' },
];
</script>

<style scoped>
.eks-content {
  --background: #f4f7fb;
}

.eks {
  min-height: 100%;
  background: #f4f7fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.eks ion-icon {
  flex-shrink: 0;
}

.eks button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.eks h1,
.eks h2,
.eks h3,
.eks p {
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
  border-bottom: 1px solid #e6e9ee;
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
  width: 32px;
  height: 32px;
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
  gap: 16px;
  padding: 16px 14px 24px;
}

/* Sambutan */
.welcome {
  position: relative;
  overflow: hidden;
  padding: 16px;
  border: 1px solid #e6e9ee;
  border-radius: 20px;
  background: #fff;
}

.welcome__circle {
  position: absolute;
  top: -50px;
  right: -40px;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #eef2f7;
}

.welcome__top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome__sync {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid #b6d0f2;
  border-radius: 999px;
  background: #dbeafe;
  font-size: 11px;
  font-weight: 600;
  color: #003178;
}

.welcome__sync ion-icon {
  font-size: 14px;
}

.welcome__live {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #047857;
}

.welcome__live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
}

.welcome__hello {
  margin-top: 16px !important;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #475569;
}

.welcome__name {
  margin-top: 2px !important;
  font-size: 22px;
  line-height: 28px;
  font-weight: 800;
}

.welcome__role {
  margin-top: 6px !important;
  font-size: 12px;
  line-height: 17px;
  color: #64748b;
}

.welcome__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
}

.welcome__year {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
}

.welcome__year i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #dbeafe;
  font-size: 17px;
  font-style: normal;
  color: #003178;
}

.welcome__update {
  font-size: 11px;
  color: #64748b;
}

/* Prioritas */
.priority {
  display: flex;
  gap: 12px;
  padding: 14px;
  border: 1px solid #f4cf94;
  border-radius: 20px;
  background: #fdddb0;
}

.priority__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 14px;
  background: #2b1a00;
  font-size: 22px;
  color: #ffba38;
}

.priority__body {
  flex: 1;
  min-width: 0;
}

.priority__tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.priority__tag {
  padding: 2px 10px;
  border-radius: 999px;
  background: #2b1a00;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
}

.priority__sub {
  font-size: 11px;
  color: #5b3a00;
}

.priority__title {
  margin-top: 8px !important;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  color: #2b1a00;
}

.priority__text {
  margin-top: 4px !important;
  font-size: 12px;
  line-height: 17px;
  color: #5b3a00;
}

.priority__actions {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.priority__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  text-align: center;
}

.priority__btn ion-icon {
  font-size: 16px;
}

.priority__btn--dark {
  background: #2b1a00 !important;
  color: #fff !important;
}

.priority__btn--light {
  background: #fff2dc !important;
  color: #2b1a00 !important;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-head__title {
  font-size: 15px;
  font-weight: 800;
}

.section-head__title--solo {
  margin-bottom: 10px !important;
}

.section-head__note {
  font-size: 11px;
  font-weight: 600;
  color: #00639a;
}

/* KPI */
.kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.kpi {
  display: flex;
  flex-direction: column;
  padding: 14px;
  border: 1px solid #e6e9ee;
  border-radius: 18px;
  background: #fff;
}

.kpi__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.kpi__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 18px;
}

.kpi__icon--blue {
  background: #dbeafe;
  color: #003178;
}

.kpi__icon--amber {
  background: #fde0b0;
  color: #5b3a00;
}

.kpi__badge {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.kpi__badge--green {
  background: #d1fae5;
  color: #047857;
}

.kpi__badge--blue {
  background: #dbe3fb;
  color: #003178;
}

.kpi__badge--amber {
  background: #fdeab8;
  color: #7a4f00;
}

.kpi__badge--plain {
  padding: 3px 0;
  font-weight: 500;
  color: #64748b;
}

.kpi__value {
  margin-top: 14px;
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
  color: #003178;
}

.kpi__label {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 800;
}

.kpi__note {
  margin-top: 2px;
  font-size: 11px;
  color: #64748b;
}

/* Perhatian */
.alert {
  padding: 14px;
  border: 1px solid #f4c6c1;
  border-radius: 20px;
  background: #fff;
}

.alert__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
}

.alert__title ion-icon {
  font-size: 20px;
  color: #ba1a1a;
}

.alert__badge {
  padding: 3px 12px;
  border-radius: 999px;
  background: #fde1de;
  font-size: 11px;
  font-weight: 700;
  color: #ba1a1a;
}

.alert__box {
  padding: 14px;
  margin-top: 12px;
  border: 1px solid #e6e9ee;
  border-radius: 14px;
  background: #f4f6f9;
}

.alert__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert__name {
  font-size: 14px;
}

.alert__days {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #ba1a1a;
}

.alert__text {
  margin-top: 6px !important;
  font-size: 12px;
  line-height: 17px;
  color: #475569;
}

.alert__track {
  height: 8px;
  margin: 10px 0;
  border-radius: 999px;
  overflow: hidden;
  background: #e2e6ec;
}

.alert__fill {
  height: 100%;
  border-radius: 999px;
  background: #b91c1c;
}

.alert__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert__foot small {
  font-size: 11px;
  color: #64748b;
}

.alert__link {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-weight: 800;
  color: #003178;
  text-decoration: none;
}

/* Kartu umum */
.card {
  padding: 16px;
  border: 1px solid #e6e9ee;
  border-radius: 20px;
  background: #fff;
}

.card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.card__title {
  font-size: 15px;
  font-weight: 800;
}

.card__sub {
  margin-top: 2px !important;
  font-size: 11px;
  color: #64748b;
}

.card__map {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  background: #dbeafe !important;
  font-size: 18px;
  color: #003178;
}

.card__link {
  font-size: 11px;
  font-weight: 800;
  color: #00639a;
  text-decoration: none;
  white-space: nowrap;
}

/* Zona */
.zones {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 14px 0;
}

.zone {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border-radius: 14px;
  background: #f4f6f9;
}

.zone__name {
  font-size: 12px;
  color: #64748b;
}

.zone__value {
  font-size: 20px;
  font-weight: 800;
  color: #003178;
}

.zone__state {
  font-size: 11px;
  font-weight: 700;
  color: #047857;
}

.bar {
  margin-top: 12px;
}

.bar__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.bar__row small {
  font-size: 11px;
  color: #475569;
}

.bar__track {
  height: 8px;
  margin-top: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: #e2e6ec;
}

.bar__fill {
  height: 100%;
  border-radius: 999px;
  background: #00639a;
}

/* Peringkat */
.rank {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 10px;
  border-radius: 14px;
  background: #f4f6f9;
}

.rank__no {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: 50%;
  background: #e6e8ea;
  font-size: 12px;
  font-weight: 800;
  color: #434652;
}

.rank__no--gold {
  background: #fde0b0;
  color: #7a4f00;
}

.rank__info {
  flex: 1;
  min-width: 0;
}

.rank__name {
  display: block;
  font-size: 13px;
}

.rank__meta {
  display: block;
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #64748b;
}

.rank__score {
  font-size: 15px;
  color: #003178;
}

/* Aksi cepat */
.quick {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 700;
  line-height: 17px;
  text-align: center;
  transition: transform 0.15s ease;
}

.quick:active {
  transform: scale(0.98);
}

.quick ion-icon {
  font-size: 20px;
}

.quick--main {
  justify-content: space-between;
  padding: 16px;
  background: #003178 !important;
  color: #fff !important;
}

.quick--main span {
  flex: 1;
}

.quick__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}

.quick--soft {
  padding: 16px 10px;
  background: #d9e8fb !important;
  color: #003178 !important;
}

.quick--gray {
  padding: 16px 10px;
  background: #e6e8ea !important;
  color: #191c1e !important;
}
</style>