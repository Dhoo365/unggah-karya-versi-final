<template>
  <ion-page>
    <ion-content :fullscreen="true" class="riwayat-content">
      <div class="riwayat">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="hammerOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">SIKARYA Juri Manado</h1>
              <p class="topbar__subtitle">Dikda Prov. Sulut • Disdikbud Manado</p>
            </div>
          </div>
          <button class="topbar__bell" type="button" aria-label="Notifikasi"><ion-icon :icon="notificationsOutline" /></button>
        </header>

        <div class="body">
          <!-- Judul -->
          <section class="heading">
            <div class="heading__text">
              <span class="heading__pill"><ion-icon :icon="ribbonOutline" /> Sidang Pleno Dewan Juri</span>
              <h2 class="heading__title">Riwayat Penilaian</h2>
              <p class="heading__subtitle">Karya Telah Dikunci &amp; Sah</p>
            </div>
            <button class="heading__btn" type="button"><ion-icon :icon="printOutline" /> Rekap PDF</button>
          </section>

          <!-- Rekapitulasi putusan -->
          <section class="recap">
            <div class="recap__head">
              <span class="recap__title"><ion-icon :icon="ribbonOutline" /> Rekapitulasi Putusan</span>
              <span class="recap__final">Final</span>
            </div>
            <div class="recap__grid">
              <div class="recap__card">
                <span class="recap__label"><ion-icon :icon="checkboxOutline" /> Total Karya Selesai</span>
                <div class="recap__value"><b>18</b><span>Karya</span></div>
                <small class="recap__note">100% Kuota Terpenuhi</small>
              </div>
              <div class="recap__card">
                <span class="recap__label"><ion-icon :icon="statsChartOutline" /> Rata-rata Skor</span>
                <div class="recap__value recap__value--gold"><b>84.6</b><span>/ 100</span></div>
                <small class="recap__note">Predikat Sangat Baik</small>
              </div>
            </div>
            <div class="recap__foot">
              <span class="recap__tte"><ion-icon :icon="shieldCheckmarkOutline" /> Tanda Tangan Elektronik (TTE BSrE) Sah</span>
              <a class="recap__audit" href="#">Audit Log</a>
            </div>
          </section>

          <!-- Filter -->
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

          <!-- Kartu riwayat -->
          <article v-for="r in riwayat" :key="r.code" class="card">
            <div class="card__top">
              <span class="card__code">{{ r.code }}</span>
              <span class="card__lomba">{{ r.lomba }}</span>
              <span class="lock" :class="'lock--' + r.lock">
                <ion-icon :icon="r.lock === 'ttd' ? checkmarkCircleOutline : lockClosedOutline" />
                {{ r.lockLabel }}
              </span>
            </div>

            <div class="card__main">
              <div class="card__info">
                <h3 class="card__title">{{ r.title }}</h3>
                <p class="card__peserta">
                  <ion-icon :icon="personOutline" />
                  <b>{{ r.name }}</b>
                  <i class="card__sep"></i>
                  <span>{{ r.school }}</span>
                </p>
              </div>
              <div class="score">
                <b class="score__value">{{ r.score }}</b>
                <small class="score__grade">{{ r.grade }}</small>
              </div>
            </div>

            <div v-if="r.breakdown" class="breakdown">
              <div v-for="b in r.breakdown" :key="b.k" class="breakdown__item">
                <small class="breakdown__label">{{ b.k }}: {{ b.name }}</small>
                <b class="breakdown__value">{{ b.value }}</b>
                <small class="breakdown__weight">Bobot {{ b.weight }}%</small>
              </div>
            </div>

            <blockquote v-if="r.quote" class="quote">
              <ion-icon class="quote__icon" :icon="chatboxEllipsesOutline" />
              <p class="quote__text">“{{ r.quote }}”</p>
            </blockquote>

            <div v-if="r.tags" class="tags">
              <span v-for="t in r.tags" :key="t.label" class="tag"><ion-icon :icon="t.icon" /> {{ t.label }}</span>
            </div>

            <div v-if="r.breakdown" class="card__actions">
              <button class="btn btn--outline" type="button"><ion-icon :icon="documentTextOutline" /> Lihat Lembar Nilai</button>
              <button class="btn btn--soft" type="button"><ion-icon :icon="downloadOutline" /> Unduh Bukti Nilai PDF</button>
            </div>
            <button v-else class="btn btn--wide" type="button"><ion-icon :icon="eyeOutline" /> Lihat Detail Nilai</button>
          </article>

          <!-- Sinkronisasi -->
          <section class="sync">
            <div class="sync__head">
              <span class="sync__title"><i class="sync__dot"></i> Status Sinkronisasi Juri</span>
              <span class="sync__badge">Sinkronisasi Otomatis</span>
            </div>
            <p class="sync__text">
              Seluruh nilai juri telah terkunci pada server Dikda Sulut. Anda dapat mengirim berkas salinan fisik pleno ke
              sekretariat Disdikbud Manado.
            </p>
            <button class="sync__btn" type="button"><ion-icon :icon="sendOutline" /> Kirim Lembar Rekap Pleno ke Sekretariat</button>
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
  notificationsOutline,
  ribbonOutline,
  printOutline,
  checkboxOutline,
  statsChartOutline,
  shieldCheckmarkOutline,
  checkmarkOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  personOutline,
  chatboxEllipsesOutline,
  trophyOutline,
  archiveOutline,
  documentTextOutline,
  downloadOutline,
  eyeOutline,
  sendOutline,
} from 'ionicons/icons';

import JuriTabbar from './JuriTabbar.vue';

const filters = ['Semua Lomba (18)', 'FLS2N Seni Tari (10)', 'Kriya Vokasi (8)'];
const active = ref(filters[0]);

const riwayat = [
  {
    code: '#TR-FINAL-08', lomba: 'FLS2N Seni Tari', lock: 'ttd', lockLabel: 'Skor Terkunci • TTE Terverifikasi',
    title: 'Eksplorasi Tari Kabasaran Kontemporer', name: 'Clarissa Sompotan', school: 'SMA Negeri 1 Manado',
    score: '88.50', grade: 'Grade A (Sangat Baik)',
    breakdown: [
      { k: 'K1', name: 'Wiraga', value: '31.50', weight: 35 },
      { k: 'K2', name: 'Wirama', value: '35.00', weight: 40 },
      { k: 'K3', name: 'Wirasa', value: '22.00', weight: 25 },
    ],
  },
  {
    code: '#TR-FINAL-05', lomba: 'FLS2N Seni Tari', lock: 'locked', lockLabel: 'Skor Terkunci',
    title: 'Tari Kolintang Waraney Remaja', name: 'Alvaro Rumambi', school: 'SMP Kristen Eben Haezar',
    score: '82.25', grade: 'Grade A (Sangat Baik)',
    quote: 'Koreografi dinamis dan artikulasi gerak selaras dengan ritme kolintang live. Pertahankan ketajaman ekspresi mimik.',
  },
  {
    code: '#KR-FINAL-02', lomba: 'Kriya Vokasi Sulut', lock: 'locked', lockLabel: 'Skor Terkunci',
    title: 'Desain Busana Tenun Bentenan Modern', name: 'Michelle Pangemanan', school: 'SMKN 1 Manado',
    score: '91.00', grade: 'Grade A+ (Istimewa)',
    tags: [
      { label: 'Top Skor Kriya Manado', icon: trophyOutline },
      { label: 'Dokumentasi Fisik Lengkap', icon: archiveOutline },
    ],
  },
] as any[];
</script>

<style scoped>
.riwayat-content {
  --background: #f7f9fb;
}

.riwayat {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.riwayat ion-icon {
  flex-shrink: 0;
}

.riwayat button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.riwayat h1,
.riwayat h2,
.riwayat h3,
.riwayat p {
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
  border-radius: 50%;
  background: #003178;
  font-size: 24px;
  color: #fff;
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

.topbar__bell {
  display: flex;
  font-size: 26px;
  color: #434652;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.heading__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  background: #d9e2ff;
  font-size: 11px;
  font-weight: 600;
  color: #001a6e;
}

.heading__pill ion-icon {
  font-size: 14px;
}

.heading__title {
  margin-top: 6px !important;
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
  color: #003178;
}

.heading__subtitle {
  font-size: 12px;
  color: #434652;
}

.heading__btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 12px;
  background: #fff !important;
  font-size: 13px;
  font-weight: 600;
  color: #003178;
}

.heading__btn ion-icon {
  font-size: 20px;
}

/* Rekap */
.recap {
  padding: 16px;
  border: 1px solid #1c4fa8;
  border-radius: 16px;
  background: linear-gradient(160deg, #0d47a1 0%, #003178 100%);
  color: #fff;
}

.recap__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.recap__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #d9e2ff;
}

.recap__title ion-icon {
  font-size: 22px;
  color: #ffba38;
}

.recap__final {
  padding: 3px 12px;
  border-radius: 999px;
  background: #ffba38;
  font-size: 11px;
  font-weight: 800;
  color: #4a2f00;
}

.recap__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 14px;
}

.recap__card {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(0, 20, 70, 0.35);
}

.recap__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #b0c6ff;
}

.recap__label ion-icon {
  font-size: 14px;
}

.recap__value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 8px 0 4px;
}

.recap__value b {
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
}

.recap__value span {
  font-size: 14px;
  color: #b0c6ff;
}

.recap__value--gold b {
  color: #ffba38;
}

.recap__note {
  font-size: 11px;
  color: #d9e2ff;
}

.recap__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 11px;
}

.recap__tte {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #d9e2ff;
}

.recap__tte ion-icon {
  font-size: 20px;
  color: #6ee7b7;
}

.recap__audit {
  font-weight: 600;
  color: #b0c6ff;
  text-decoration: underline;
}

/* Filter */
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
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: #191c1e;
}

.filters__item ion-icon {
  font-size: 16px;
}

.filters__item--active {
  background: #003178 !important;
  border-color: #003178 !important;
  font-weight: 700;
  color: #fff;
}

/* Kartu */
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.card__top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card__code {
  padding: 3px 10px;
  border-radius: 6px;
  background: #d9e2ff;
  font-size: 11px;
  font-weight: 800;
  line-height: 14px;
  color: #001a6e;
}

.card__lomba {
  flex: 1;
  font-size: 11px;
  line-height: 14px;
  color: #434652;
}

.lock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
}

.lock ion-icon {
  font-size: 15px;
}

.lock--ttd {
  max-width: 140px;
  border: 1px solid #b8e6cb;
  background: #e6f7ee;
  color: #047857;
}

.lock--locked {
  border: 1px solid #f3d98a;
  background: #fff7e0;
  color: #7a3e00;
}

.card__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card__info {
  flex: 1;
  min-width: 0;
}

.card__title {
  font-size: 17px;
  line-height: 23px;
  font-weight: 800;
}

.card__peserta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 10px !important;
  font-size: 12px;
  color: #434652;
}

.card__peserta ion-icon {
  font-size: 18px;
  color: #00639a;
}

.card__peserta b {
  font-weight: 500;
  color: #191c1e;
}

.card__sep {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #737783;
}

/* Skor */
.score {
  flex: none;
  width: 124px;
  box-sizing: border-box;
  padding: 12px 8px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
  text-align: right;
}

.score__value {
  display: block;
  font-size: 26px;
  line-height: 30px;
  font-weight: 800;
  color: #003178;
}

.score__grade {
  display: block;
  font-size: 11px;
  color: #434652;
}

/* Rincian bobot */
.breakdown {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 6px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
  text-align: center;
}

.breakdown__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.breakdown__label {
  font-size: 11px;
  color: #434652;
}

.breakdown__value {
  font-size: 16px;
  font-weight: 800;
}

.breakdown__weight {
  font-size: 11px;
  color: #737783;
}

/* Kutipan */
.quote {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 12px;
  border-left: 4px solid #00639a;
  border-radius: 8px;
  background: #eceef0;
}

.quote__icon {
  font-size: 16px;
  color: #00639a;
}

.quote__text {
  font-size: 12px;
  font-style: italic;
  line-height: 18px;
  color: #434652;
}

/* Tag */
.tags {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 8px;
  background: #eceef0;
  font-size: 11px;
  color: #434652;
}

.tag ion-icon {
  font-size: 14px;
}

/* Tombol */
.card__actions {
  display: flex;
  gap: 10px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  transition: transform 0.15s ease;
}

.btn:active {
  transform: scale(0.98);
}

.btn ion-icon {
  font-size: 22px;
}

.btn--outline {
  flex: 1;
  border: 1px solid #c3c6d4 !important;
  background: #fff !important;
  color: #003178;
}

.btn--soft {
  flex: 1;
  background: #d9e2ff !important;
  color: #001a6e !important;
}

.btn--wide {
  width: 100%;
  padding: 14px;
  border: 1px solid #c3c6d4 !important;
  background: #fff !important;
  font-size: 14px;
  color: #003178;
}

/* Sinkronisasi */
.sync {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.sync__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sync__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
}

.sync__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
}

.sync__badge {
  padding: 4px 12px;
  border: 1px solid #b8e6cb;
  border-radius: 999px;
  background: #e6f7ee;
  font-size: 11px;
  font-weight: 500;
  color: #047857;
}

.sync__text {
  margin-top: 10px !important;
  font-size: 12px;
  line-height: 18px;
  color: #434652;
}

.sync__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 14px;
  padding: 16px 12px;
  border-radius: 12px;
  background: #003178 !important;
  font-size: 14px;
  font-weight: 700;
  color: #fff !important;
}

.sync__btn ion-icon {
  font-size: 22px;
}
</style>