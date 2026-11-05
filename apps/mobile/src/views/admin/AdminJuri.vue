<template>
  <ion-page>
    <ion-content :fullscreen="true" class="juri-content">
      <div class="juri">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="shieldCheckmarkOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">Kelola Dewan Juri</h1>
              <p class="topbar__subtitle">Dinas Pendidikan &amp; Kebudayaan Kota Manado</p>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <i class="topbar__dot"></i>
            </button>
            <button class="topbar__btn" type="button" aria-label="Akun">
              <ion-icon :icon="personCircleOutline" />
            </button>
          </div>
        </header>

        <div class="body">
          <section class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <div class="stat__head">
                <span class="stat__label">{{ s.label }}</span>
                <div class="stat__icon" :class="'stat__icon--' + s.tone"><ion-icon :icon="s.icon" /></div>
              </div>
              <div class="stat__value" :class="'stat__value--' + s.valueTone">
                <b>{{ s.value }}</b><span>{{ s.unit }}</span>
              </div>
              <p class="stat__note" :class="{ 'stat__note--blue': s.noteBlue }">
                <i v-if="s.dot" class="stat__dot"></i>
                <ion-icon v-if="s.noteIcon" :icon="s.noteIcon" />
                {{ s.note }}
              </p>
            </div>
          </section>

          <div class="actions">
            <button class="actions__btn actions__btn--primary" type="button">
              <ion-icon :icon="personAddOutline" /> + Tambah Juri Baru
            </button>
            <button class="actions__btn actions__btn--soft" type="button">
              <ion-icon :icon="clipboardOutline" /> Kelola SK Kadis Penugasan
            </button>
          </div>

          <div class="search">
            <ion-icon class="search__icon" :icon="searchOutline" />
            <input v-model="query" class="search__input" type="text" placeholder="Cari nama juri, NIP, atau keahlian..." />
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

          <article v-for="j in juri" :key="j.name" class="card">
            <div class="card__top">
              <div class="card__avatar" :class="'card__avatar--' + j.avatarTone">{{ j.initial }}</div>
              <div class="card__who">
                <h2 class="card__name">{{ j.name }}</h2>
                <b class="card__role">{{ j.role }}</b>
                <p class="card__meta">{{ j.meta }}</p>
              </div>
              <button class="card__menu" type="button" aria-label="Opsi"><ion-icon :icon="ellipsisVertical" /></button>
            </div>

            <div class="card__chips">
              <span v-for="c in j.chips" :key="c.label" class="chip" :class="'chip--' + c.tone">
                <ion-icon :icon="c.icon" />{{ c.label }}
              </span>
            </div>

            <div v-if="j.warning" class="notice">
              <span class="notice__text"><ion-icon :icon="timeOutline" /> {{ j.warning }}</span>
              <a class="notice__link" href="#">Kirim Ulang</a>
            </div>
            <div v-else class="pakta">
              <span class="pakta__item pakta__item--ok"><ion-icon :icon="checkmarkCircleOutline" /> Pakta Integritas Valid</span>
              <span class="pakta__item"><ion-icon :icon="fingerPrintOutline" /> TTE Digital BSrE</span>
            </div>

            <div class="card__foot">
              <span class="card__sk">{{ j.sk }}</span>
              <div class="card__foot-actions">
                <button class="card__detail" type="button">Detail &amp; Tugas</button>
                <button class="card__edit" type="button" aria-label="Ubah"><ion-icon :icon="createOutline" /></button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </ion-content>

    <AdminTabBar variant="icon" />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import { shieldCheckmarkOutline, notificationsOutline, personCircleOutline, idCardOutline, hammerOutline, shieldOutline, checkmarkCircleOutline, personAddOutline, clipboardOutline, searchOutline, optionsOutline, checkmarkOutline, ellipsisVertical, timeOutline, fingerPrintOutline, createOutline, ribbonOutline, documentTextOutline, musicalNoteOutline, colorPaletteOutline, flaskOutline, removeCircleOutline, } from 'ionicons/icons';

import AdminTabBar from './AdminTabBar.vue';

const query = ref('');
const filters = ['Semua (18)', 'Seni Tari (6)', 'Kriya & Vokasi (5)', 'KIR (4)'];
const active = ref(filters[0]);

const stats = [
  { label: 'Juri Terdaftar', value: 18, unit: 'Personil', icon: idCardOutline, tone: 'blue', valueTone: 'navy', note: '100% Terverifikasi', dot: true, noteBlue: true },
  { label: 'Juri Bertugas', value: 14, unit: 'Aktif', icon: hammerOutline, tone: 'sky', valueTone: 'navy', note: 'Mencakup 5 Kategori' },
  { label: 'Juri Cadangan', value: 4, unit: 'Siap Tugas', icon: shieldOutline, tone: 'gray', valueTone: 'dark', note: 'Standby Disdikbud' },
  { label: 'Pakta Integritas', value: '100%', unit: 'Valid', icon: shieldCheckmarkOutline, tone: 'green', valueTone: 'green', note: 'TTE BSrE Lengkap', noteIcon: checkmarkCircleOutline },
] as any[];

const juri = [
  {
    initial: 'RS',
    avatarTone: 'blue',
    name: 'Dr. Ronald Sumendap, M.Sn',
    role: 'Ketua Dewan Juri Seni Budaya',
    meta: 'NIP: 197805142003121002 • Instansi: UNIMA Manado',
    chips: [
      { label: 'Aktif Menilai', tone: 'green', icon: checkmarkCircleOutline },
      { label: 'FLS2N Seni Tari 2026', tone: 'blue', icon: ribbonOutline },
    ],
    sk: 'Penugasan SK: No. 421/Dikbud/142',
  },
  {
    initial: 'MK',
    avatarTone: 'blue',
    name: 'Dra. Merry Korompis, S.Pd',
    role: 'Juri FLS2N Musik & Vokal Tradisi',
    meta: 'NIP: 198203112006042011 • Praktisi Budaya Minahasa',
    chips: [
      { label: 'SK Kadis Terbit', tone: 'blue', icon: documentTextOutline },
      { label: 'Vokal Solo & Tradisi Minahasa', tone: 'gray', icon: musicalNoteOutline },
    ],
    sk: 'SK Kadis: No. 800/Dikbud-Mdo/55',
  },
  {
    initial: 'AL',
    avatarTone: 'amber',
    name: 'Andreas Lengkong, M.Si',
    role: 'Juri Inovasi Kriya & Desain',
    meta: 'Praktisi Industri Kreatif Manado',
    chips: [
      { label: 'Menunggu Konfirmasi Pakta', tone: 'amber', icon: removeCircleOutline },
      { label: 'Kriya Anyaman & Kayu', tone: 'gray', icon: colorPaletteOutline },
    ],
    warning: 'Tautan Pakta Terkirim via WA',
    sk: 'Menunggu TTE Digital',
  },
  {
    initial: 'FT',
    avatarTone: 'blue',
    name: 'Dr. Fransisca Tulung, M.Pd',
    role: 'Juri Karya Ilmiah Remaja (KIR)',
    meta: 'Akademisi Unsrat Manado',
    chips: [
      { label: 'Aktif Menilai', tone: 'green', icon: checkmarkCircleOutline },
      { label: 'KIR Sains Terapan & Lingkungan', tone: 'blue', icon: flaskOutline },
    ],
    sk: 'SK Kadis: No. 421/Dikbud/148',
  },
] as any[];
</script>

<style scoped>
.juri-content {
  --background: #f7f9fb;
}

.juri {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.juri ion-icon {
  flex-shrink: 0;
}

.juri button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.juri h1,
.juri h2,
.juri p {
  margin: 0;
}

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
  background: #d9e2ff;
  font-size: 22px;
  color: #0d47a1;
}

.topbar__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 800;
  color: #0d47a1;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  font-size: 11px;
  line-height: 13px;
  color: #434652;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 26px;
  color: #191c1e;
}

.topbar__dot {
  position: absolute;
  top: 0;
  right: 2px;
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
  font-size: 12px;
  font-weight: 600;
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

.stat__icon--gray {
  background: #e6e8ea;
  color: #434652;
}

.stat__icon--green {
  background: #d1fae5;
  color: #047857;
}

.stat__value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 10px 0 6px;
}

.stat__value b {
  font-size: 26px;
  line-height: 1;
  font-weight: 800;
}

.stat__value span {
  font-size: 12px;
  color: #434652;
}

.stat__value--navy b {
  color: #0d47a1;
}

.stat__value--green b {
  color: #047857;
}

.stat__value--green span {
  color: #047857;
}

.stat__note {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #434652;
}

.stat__note ion-icon {
  font-size: 14px;
  color: #047857;
}

.stat__note--blue {
  color: #0d47a1;
}

.stat__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0d47a1;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions__btn {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  padding: 14px 8px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 0.15s ease;
}

.actions__btn:active {
  transform: scale(0.98);
}

.actions__btn ion-icon {
  font-size: 20px;
}

.actions__btn--primary {
  background: #0d47a1 !important;
  color: #fff !important;
}

.actions__btn--soft {
  background: #d9e2ff !important;
  color: #001945 !important;
}

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
  font-size: 14px;
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
  color: #737783;
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
  font-size: 13px;
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
  align-items: flex-start;
  gap: 12px;
}

.card__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
}

.card__avatar--blue {
  background: #d9e2ff;
  color: #0d47a1;
}

.card__avatar--amber {
  background: #ffefc2;
  color: #7a3e00;
}

.card__who {
  flex: 1;
  min-width: 0;
}

.card__name {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
}

.card__role {
  display: block;
  font-size: 11px;
  line-height: 15px;
  color: #0d47a1;
}

.card__meta {
  font-size: 12px;
  line-height: 16px;
  color: #434652;
}

.card__menu {
  display: flex;
  font-size: 20px;
  color: #434652;
}

.card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
}

.chip ion-icon {
  font-size: 14px;
}

.chip--green {
  background: #e6f7ee;
  border: 1px solid #b8e6cb;
  color: #047857;
}

.chip--blue {
  background: #d9e2ff;
  color: #001945;
}

.chip--gray {
  background: #e6e8ea;
  color: #434652;
}

.chip--amber {
  background: #fff6dc;
  border: 1px solid #f3d98a;
  color: #7a3e00;
}

.pakta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #f2f4f6;
}

.pakta__item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.pakta__item ion-icon {
  font-size: 16px;
}

.pakta__item--ok ion-icon {
  color: #047857;
}

.notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #f3e2b0;
  border-radius: 10px;
  background: #fffaf0;
}

.notice__text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  color: #7a3e00;
}

.notice__text ion-icon {
  font-size: 16px;
  color: #c92a2a;
}

.notice__link {
  font-size: 11px;
  font-weight: 700;
  color: #0d47a1;
  text-decoration: underline;
  white-space: nowrap;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid #e0e3e5;
}

.card__sk {
  font-size: 12px;
  line-height: 16px;
  color: #737783;
}

.card__foot-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card__detail {
  padding: 10px 16px;
  border-radius: 10px;
  background: #e6e8ea !important;
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.card__edit {
  display: flex;
  font-size: 18px;
  color: #434652;
}

</style>