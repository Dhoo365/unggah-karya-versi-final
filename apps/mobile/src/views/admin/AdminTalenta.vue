<template>
  <ion-page>
    <ion-content :fullscreen="true" class="talenta-content">
      <div class="talenta">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="ribbonOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">Kurasi Talenta Daerah</h1>
              <p class="topbar__subtitle">Pusat Prestasi Disdikbud Kota Manado</p>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Unduh"><ion-icon :icon="downloadOutline" /></button>
            <button class="topbar__btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <i class="topbar__dot"></i>
            </button>
          </div>
        </header>

        <div class="body">
          <section class="hero">
            <ion-icon class="hero__mark" :icon="trophy" />
            <span class="hero__pill"><ion-icon :icon="starOutline" /> Program Pembinaan 2026</span>
            <h2 class="hero__title">Database Talenta Emas Manado 2026</h2>
            <p class="hero__text">Pembinaan Menuju FLS2N &amp; O2SN Tingkat Provinsi Sulut dan Nasional Puspresnas.</p>
            <div class="hero__foot">
              <span class="hero__org"><ion-icon :icon="schoolOutline" /> Dikda Sulut &amp; Disdikbud Manado</span>
              <a class="hero__link" href="#">Tahap Finalisasi <ion-icon :icon="arrowForwardOutline" /></a>
            </div>
          </section>

          <section class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <div class="stat__head">
                <span class="stat__label">{{ s.label }}</span>
                <div class="stat__icon" :class="'stat__icon--' + s.tone"><ion-icon :icon="s.icon" /></div>
              </div>
              <b class="stat__value" :class="'stat__value--' + s.tone">{{ s.value }}</b>
              <small class="stat__note" :class="'stat__note--' + s.tone">{{ s.note }}</small>
            </div>
          </section>

          <div class="search">
            <ion-icon class="search__icon" :icon="searchOutline" />
            <input v-model="query" class="search__input" type="text" placeholder="Cari siswa berprestasi, NISN, atau sekolah..." />
            <button class="search__filter" type="button" aria-label="Filter"><ion-icon :icon="optionsOutline" /></button>
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

          <div class="section-head">
            <h2 class="section-head__title">Daftar Talenta Teratas <i class="section-head__dot"></i></h2>
            <a class="section-head__sort" href="#">Urutkan: Skor Tertinggi</a>
          </div>

          <article v-for="t in talenta" :key="t.name" class="talent" :class="{ 'talent--top': t.rank === 1 }">
            <div class="talent__top">
              <div class="talent__rank" :class="'talent__rank--' + t.rankTone">#{{ t.rank }}</div>
              <div class="talent__who">
                <h3 class="talent__name">
                  {{ t.name }}
                  <ion-icon v-if="t.nameIcon" class="talent__medal" :class="'talent__medal--' + t.rankTone" :icon="t.nameIcon" />
                </h3>
                <p class="talent__school">{{ t.school }}</p>
              </div>
              <div class="talent__score" :class="{ 'talent__score--top': t.rank === 1 }">
                <small>Skor Kurasi</small>
                <b>{{ t.score }}<span>/100</span></b>
              </div>
            </div>

            <div class="talent__field">
              <b class="talent__bidang"><ion-icon :icon="t.icon" /> {{ t.bidang }}</b>
              <span class="talent__badge" :class="'talent__badge--' + t.badgeTone">
                <ion-icon :icon="t.badgeIcon" /> {{ t.badge }}
              </span>
            </div>

            <div v-if="t.rank === 1" class="talent__actions">
              <button class="btn btn--primary" type="button"><ion-icon :icon="eyeOutline" /> Lihat Portofolio</button>
              <button class="btn btn--soft" type="button"><ion-icon :icon="downloadOutline" /> Unduh Rapor Prestasi</button>
            </div>
            <div v-else class="talent__actions talent__actions--end">
              <button class="btn btn--ghost" type="button">Detail Berkas</button>
              <button class="btn" :class="t.rank === 4 ? 'btn--gray' : 'btn--soft'" type="button">
                <ion-icon :icon="documentTextOutline" /> Rapor Prestasi
              </button>
            </div>
          </article>

          <section class="exec">
            <h2 class="exec__title"><ion-icon :icon="shieldCheckmarkOutline" /> Aksi Eksekutif Disdikbud Manado</h2>
            <p class="exec__text">Proses sinkronisasi langsung ke sistem Dinas Pendidikan Daerah Provinsi Sulawesi Utara.</p>
            <button class="exec__btn exec__btn--primary" type="button">
              <ion-icon :icon="shareOutline" /> Ekspor Kurasi Talenta ke Dinas Provinsi (PDF/Excel)
            </button>
            <button class="exec__btn exec__btn--gold" type="button">
              <ion-icon :icon="personOutline" /> Terbitkan Piagam Apresiasi Kadis
            </button>
          </section>
        </div>
      </div>
    </ion-content>

    <AdminTabBar />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { ribbonOutline, downloadOutline, notificationsOutline, trophy, trophyOutline, starOutline, schoolOutline, arrowForwardOutline, peopleOutline, checkmarkCircleOutline, checkmarkDoneOutline, clipboardOutline, searchOutline, optionsOutline, checkmarkOutline, medalOutline, flaskOutline, musicalNotesOutline, colorPaletteOutline, brushOutline,
  bulbOutline,
  folderOutline,
  eyeOutline,
  documentTextOutline,
  shieldCheckmarkOutline,
  shareOutline,
  personOutline,
} from 'ionicons/icons';

import AdminTabBar from './AdminTabBar.vue';

const query = ref('');
const filters = ['Semua Talenta (42)', 'Seni & Budaya (18)', 'Sains & KIR (12)'];
const active = ref(filters[0]);

const stats = [
  { label: 'Siswa Unggulan', value: '42', note: 'Terkurasi Valid', icon: peopleOutline, tone: 'blue' },
  { label: 'Rekomendasi', value: '15', note: 'Tiket Prov. Sulut', icon: checkmarkCircleOutline, tone: 'sky' },
  { label: 'Medali Emas', value: '8', note: 'Juara 1 Daerah', icon: trophyOutline, tone: 'amber' },
  { label: 'Status Arsip', value: '100%', note: 'Tervalidasi LPMP', icon: clipboardOutline, tone: 'green' },
];

const talenta = [
  {
    rank: 1, rankTone: 'gold', name: 'Alvaro G. Rumambi', school: 'SMAN 9 Binsus Manado', score: '98.4',
    nameIcon: trophyOutline, icon: flaskOutline, bidang: 'Bidang Robotika & Sains Maritim',
    badge: 'Rekomendasi Kontingen Provinsi', badgeTone: 'green', badgeIcon: checkmarkCircleOutline,
  },
  {
    rank: 2, rankTone: 'gray', name: 'Clarissa Sompotan', school: 'SMAN 1 Manado', score: '96.2',
    nameIcon: medalOutline, icon: musicalNotesOutline, bidang: 'Bidang Seni Tari Tradisi (FLS2N)',
    badge: 'Siap Seleksi Provinsi', badgeTone: 'blue', badgeIcon: checkmarkDoneOutline,
  },
  {
    rank: 3, rankTone: 'amber', name: 'Kezia Wenas', school: 'SMKN 1 Manado', score: '94.8',
    nameIcon: trophyOutline, icon: colorPaletteOutline, bidang: 'Bidang Desain Animasi Budaya & Vokasi',
    badge: 'Karya Terbaik Manado', badgeTone: 'amber', badgeIcon: bulbOutline,
  },
  {
    rank: 4, rankTone: 'gray', name: 'Jonathan Mandey', school: 'SMKN 2 Manado', score: '92.5',
    nameIcon: '', icon: brushOutline, bidang: 'Bidang Kriya Tradisional Anyaman',
    badge: 'Koleksi Kurasi Kota', badgeTone: 'gray', badgeIcon: folderOutline,
  },
] as any[];
</script>

<style scoped>
.talenta-content {
  --background: #f7f9fb;
}

.talenta {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.talenta ion-icon {
  flex-shrink: 0;
}

.talenta button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.talenta h1,
.talenta h2,
.talenta h3,
.talenta p {
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
  gap: 16px;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 22px;
  color: #191c1e;
}

.topbar__dot {
  position: absolute;
  top: -1px;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e5383b;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 24px;
}

/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #003178 0%, #0d47a1 55%, #00639a 100%);
  color: #fff;
}

.hero__mark {
  position: absolute;
  top: 8px;
  right: 14px;
  font-size: 84px;
  color: rgba(255, 255, 255, 0.12);
}

.hero__pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 222, 172, 0.5);
  font-size: 11px;
  font-weight: 600;
  color: #ffdeac;
}

.hero__pill ion-icon {
  font-size: 14px;
}

.hero__title {
  position: relative;
  margin-top: 10px !important;
  font-size: 22px;
  line-height: 28px;
  font-weight: 800;
}

.hero__text {
  position: relative;
  margin-top: 8px !important;
  font-size: 12px;
  line-height: 18px;
  color: #d9e2ff;
}

.hero__foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 11px;
}

.hero__org {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #d9e2ff;
}

.hero__org ion-icon {
  font-size: 15px;
}

.hero__link {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 700;
  color: #ffba38;
  text-decoration: none;
}

.hero__link ion-icon {
  font-size: 14px;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat {
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.stat__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat__label {
  font-size: 11px;
  color: #434652;
}

.stat__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 16px;
}

.stat__icon--blue {
  background: #d9e2ff;
  color: #0d47a1;
}

.stat__icon--sky {
  background: #cee5ff;
  color: #0d47a1;
}

.stat__icon--amber {
  background: #ffdeac;
  color: #674600;
}

.stat__icon--green {
  background: #d1fae5;
  color: #047857;
}

.stat__value {
  display: block;
  margin: 10px 0 4px;
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
}

.stat__value--blue,
.stat__value--sky {
  color: #0d47a1;
}

.stat__value--amber {
  color: #f59e0b;
}

.stat__value--green {
  color: #047857;
}

.stat__note {
  display: block;
  font-size: 11px;
  font-weight: 600;
}

.stat__note--blue,
.stat__note--sky {
  color: #00639a;
}

.stat__note--amber {
  color: #674600;
}

.stat__note--green {
  color: #047857;
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
  font-size: 20px;
  color: #434652;
}

.search__input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 52px 0 44px;
  border: 1px solid #c3c6d4;
  border-radius: 12px;
  background: #fff;
  font: inherit;
  font-size: 13px;
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
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #eceef0 !important;
  font-size: 18px;
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
  padding: 9px 16px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: #191c1e;
}

.filters__item ion-icon {
  font-size: 16px;
}

.filters__item--active {
  background: #0d47a1 !important;
  border-color: #0d47a1 !important;
  font-weight: 700;
  color: #fff;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.section-head__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 800;
}

.section-head__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
}

.section-head__sort {
  font-size: 11px;
  font-weight: 600;
  color: #0d47a1;
  text-decoration: none;
}

/* Talent card */
.talent {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.talent--top {
  border: 2px solid #f5b400;
  background: linear-gradient(180deg, #fffbee 0%, #ffffff 60%);
  box-shadow: 0 4px 14px rgba(245, 180, 0, 0.18);
}

.talent__top {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.talent__rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 800;
}

.talent__rank--gold {
  background: #ffdeac;
  border: 1px solid #f5b400;
  color: #674600;
}

.talent__rank--gray {
  background: #e6e8ea;
  color: #434652;
}

.talent__rank--amber {
  background: #ffefc2;
  color: #674600;
}

.talent__who {
  flex: 1;
  min-width: 0;
}

.talent__name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.talent__medal {
  font-size: 14px;
}

.talent__medal--gold,
.talent__medal--amber {
  color: #b45309;
}

.talent__medal--gray {
  color: #737783;
}

.talent__school {
  font-size: 11px;
  color: #434652;
}

.talent__score {
  text-align: right;
}

.talent__score small {
  display: block;
  font-size: 10px;
  color: #434652;
}

.talent__score b {
  font-size: 22px;
  line-height: 26px;
  font-weight: 800;
  color: #0d47a1;
}

.talent__score span {
  font-size: 11px;
  font-weight: 500;
  color: #737783;
}

.talent__score--top {
  margin: -4px -6px -4px 0;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
}

.talent__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.talent__bidang {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 16px;
  color: #00639a;
}

.talent__bidang ion-icon {
  font-size: 16px;
}

.talent__badge {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
}

.talent__badge ion-icon {
  font-size: 13px;
}

.talent__badge--green {
  background: #e6f7ee;
  border: 1px solid #b8e6cb;
  color: #047857;
}

.talent__badge--blue {
  background: #e8f0fe;
  color: #0d47a1;
}

.talent__badge--amber {
  background: #fff1c9;
  color: #7a3e00;
}

.talent__badge--gray {
  background: #e6e8ea;
  color: #434652;
}

.talent__actions {
  display: flex;
  gap: 10px;
}

.talent__actions--end {
  justify-content: flex-end;
}

/* Buttons */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 15px;
  transition: transform 0.15s ease;
}

.btn:active {
  transform: scale(0.97);
}

.btn ion-icon {
  font-size: 16px;
}

.btn--primary {
  flex: 1;
  background: #003178 !important;
  color: #fff !important;
}

.btn--soft {
  flex: 1;
  background: #d9e2ff !important;
  color: #001a6e !important;
}

.talent__actions--end .btn--soft,
.talent__actions--end .btn--gray {
  flex: none;
}

.btn--gray {
  background: #e6e8ea !important;
  color: #434652 !important;
}

.btn--ghost {
  border: 1px solid #c3c6d4 !important;
  background: #fff !important;
  color: #0d47a1;
}

/* Aksi eksekutif */
.exec {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  margin-top: 4px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #f2f4f6;
}

.exec__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 800;
  color: #0d47a1;
}

.exec__title ion-icon {
  font-size: 18px;
}

.exec__text {
  font-size: 12px;
  line-height: 17px;
  color: #434652;
}

.exec__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}

.exec__btn ion-icon {
  font-size: 18px;
}

.exec__btn--primary {
  background: #003178 !important;
  color: #fff !important;
}

.exec__btn--gold {
  background: #ffdeac !important;
  color: #281900 !important;
}

</style>