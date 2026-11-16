<template>
  <ion-page>
    <ion-content :fullscreen="true" class="profil-content">
      <div class="profil">
        <header class="topbar">
          <div class="topbar__brand">
            <div class="topbar__logo"><ion-icon :icon="hammerOutline" /></div>
            <div class="topbar__text">
              <h1 class="topbar__title">SIKARYA Juri Manado</h1>
              <p class="topbar__subtitle"><i class="topbar__dot"></i> Dewan Juri Kota Manado</p>
            </div>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Bantuan"><ion-icon :icon="helpCircleOutline" /></button>
            <button class="topbar__btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" />
              <i class="topbar__badge"></i>
            </button>
          </div>
        </header>

        <div class="body">
          <!-- Kartu profil -->
          <section class="card profile">
            <div class="profile__photo">
              <img v-if="juri.photo" class="profile__img" :src="juri.photo" :alt="juri.name" />
              <span v-else class="profile__initial">{{ juri.initial }}</span>
              <span class="profile__role">{{ juri.role }}</span>
            </div>
            <h2 class="profile__name">{{ juri.name }}</h2>
            <span class="profile__nip"><ion-icon :icon="idCardOutline" /> NIP: {{ juri.nip }}</span>
            <p class="profile__org">{{ juri.org }}</p>
            <div class="profile__chips">
              <span class="chip chip--green">Pakta Integritas</span>
              <span class="chip chip--blue">TTE BSrE Aktif</span>
            </div>
          </section>

          <!-- Statistik -->
          <section class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <b class="stat__value" :class="'stat__value--' + s.tone">{{ s.value }}</b>
              <span class="stat__label">{{ s.label }}</span>
            </div>
          </section>

          <!-- Legalitas -->
          <section class="card legal">
            <div class="legal__head">
              <h2 class="legal__title"><ion-icon :icon="shieldCheckmarkOutline" /> Legalitas &amp; Surat Penugasan</h2>
              <span class="legal__year">T.A. 2026</span>
            </div>

            <div v-for="d in dokumen" :key="d.title" class="doc">
              <div class="doc__icon" :class="'doc__icon--' + d.tone"><ion-icon :icon="d.icon" /></div>
              <div class="doc__info">
                <b class="doc__title">{{ d.title }}</b>
                <p class="doc__desc" :class="{ 'doc__desc--mono': d.mono }">{{ d.desc }}</p>
              </div>
              <button v-if="d.action" class="doc__btn" type="button">{{ d.action }}</button>
              <span v-else class="doc__badge" :class="'doc__badge--' + d.badgeTone">
                <ion-icon v-if="d.badgeIcon" :icon="d.badgeIcon" />{{ d.badge }}
              </span>
            </div>
          </section>

          <!-- Keluar (contoh, sesuaikan dengan desainmu) -->
          <button class="logout" type="button"><ion-icon :icon="logOutOutline" /> Keluar dari Akun</button>
        </div>
      </div>
    </ion-content>

    <JuriTabbar variant="soft" />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  hammerOutline,
  helpCircleOutline,
  notificationsOutline,
  idCardOutline,
  shieldCheckmarkOutline,
  documentTextOutline,
  ribbonOutline,
  documentLockOutline,
  checkmarkCircle,
  logOutOutline,
} from 'ionicons/icons';

import JuriTabbar from './JuriTabbar.vue';

const juri = {
  name: 'Dr. Timothy Mumek, S.T., M.T.',
  role: 'Ketua Juri',
  nip: '197805142003121002',
  org: 'Dosen Seni UNIMA / Tim Juri Disdikbud Kota Manado',
  initial: 'TM',
  photo: '/assets/moty.png', // isi dengan path foto, misalnya '/assets/juri/timothy.jpg'
};

const stats = [
  { value: '48', label: 'Karya Dinilai', tone: 'navy' },
  { value: '6', label: 'Antrean Lomba', tone: 'blue' },
  { value: '100%', label: 'Validasi TTE', tone: 'gold' },
];

const dokumen = [
  {
    title: 'SK Kadis Pendidikan Kota Manado', desc: 'No. 420/Disdik-Mdo/SK-JURI/2026', mono: true,
    icon: documentTextOutline, tone: 'blue', action: 'Lihat SK',
  },
  {
    title: 'Sertifikat Sertifikasi Juri', desc: 'Bidang Seni Budaya • Disdikbud Sulut', mono: false,
    icon: ribbonOutline, tone: 'sky', badge: 'Valid', badgeTone: 'green',
  },
  {
    title: 'Pakta Integritas Penjurian', desc: 'Penilaian Objektif & Netral 2026', mono: false,
    icon: documentLockOutline, tone: 'amber', badge: 'Digital', badgeTone: 'blue', badgeIcon: checkmarkCircle,
  },
] as any[];
</script>

<style scoped>
.profil-content {
  --background: #f7f9fb;
}

.profil {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.profil ion-icon {
  flex-shrink: 0;
}

.profil button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.profil h1,
.profil h2,
.profil p {
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
  background: #eceef0;
  font-size: 24px;
  color: #003178;
}

.topbar__title {
  font-size: 19px;
  line-height: 24px;
  font-weight: 800;
  color: #003178;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 16px;
  color: #434652;
}

.topbar__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00639a;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 26px;
  color: #191c1e;
}

.topbar__badge {
  position: absolute;
  top: 0;
  right: 1px;
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

/* Card dasar */
.card {
  border: 1px solid #e0e3e5;
  border-radius: 20px;
  background: #fff;
}

/* Profil */
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px;
  background: linear-gradient(160deg, #ffffff 40%, #eaf1fb 75%, #fff4e3 100%);
}

.profile__photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f59e0b, #0d47a1);
  border: 4px solid #6b7f3a;
}

.profile__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile__initial {
  font-size: 36px;
  font-weight: 800;
  color: #fff;
}

.profile__role {
  position: absolute;
  bottom: -12px;
  left: 50%;
  padding: 3px 18px;
  border-radius: 999px;
  background: #674600;
  border: 1px solid #ffba38;
  font-size: 11px;
  font-weight: 800;
  line-height: 13px;
  text-align: center;
  white-space: nowrap;
  color: #ffba38;
  transform: translateX(-50%);
}

.profile__name {
  margin-top: 12px !important;
  font-size: 20px;
  line-height: 26px;
  font-weight: 800;
  text-align: center;
}

.profile__nip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 4px 12px;
  border-radius: 8px;
  background: #e6e8ea;
  font-family: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;
  font-size: 12px;
  color: #434652;
}

.profile__nip ion-icon {
  font-size: 16px;
}

.profile__org {
  margin-top: 8px !important;
  font-size: 13px;
  text-align: center;
  color: #00639a;
}

.profile__chips {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e0e3e5;
}

.chip {
  padding: 10px 8px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.chip--green {
  background: #d1fae5;
  color: #065f46;
}

.chip--blue {
  background: #e3eefc;
  color: #003178;
}

/* Statistik */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 8px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.stat__value {
  font-size: 24px;
  line-height: 1;
  font-weight: 800;
}

.stat__value--navy {
  color: #003178;
}

.stat__value--blue {
  color: #00639a;
}

.stat__value--gold {
  color: #674600;
}

.stat__label {
  font-size: 12px;
  color: #434652;
}

/* Legalitas */
.legal {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px 16px;
}

.legal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.legal__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
}

.legal__title ion-icon {
  font-size: 20px;
  color: #003178;
}

.legal__year {
  font-size: 12px;
  font-weight: 700;
  color: #00639a;
}

.doc {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #f2f4f6;
}

.doc__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 12px;
  font-size: 22px;
}

.doc__icon--blue {
  background: #d9e2ff;
  color: #003178;
}

.doc__icon--sky {
  background: #cee5ff;
  color: #00639a;
}

.doc__icon--amber {
  background: #ffdeac;
  color: #674600;
}

.doc__info {
  flex: 1;
  min-width: 0;
}

.doc__title {
  display: block;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
}

.doc__desc {
  font-size: 13px;
  line-height: 18px;
  color: #434652;
}

.doc__desc--mono {
  font-family: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;
  font-size: 12px;
  line-height: 20px;
}

.doc__btn {
  flex: none;
  padding: 8px 14px;
  border-radius: 999px;
  background: #003178 !important;
  font-size: 12px;
  font-weight: 700;
  color: #fff !important;
}

.doc__badge {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.doc__badge ion-icon {
  font-size: 14px;
}

.doc__badge--green {
  background: #d1fae5;
  color: #047857;
}

.doc__badge--blue {
  background: #d9e8fb;
  color: #00639a;
}

/* Keluar */
.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border: 1px solid #f0b8b8 !important;
  border-radius: 14px;
  background: #fff !important;
  font-size: 14px;
  font-weight: 700;
  color: #ba1a1a;
}

.logout ion-icon {
  font-size: 20px;
}
</style>