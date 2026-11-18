<template>
  <ion-page>
    <ion-content :fullscreen="true" class="profil-content">
      <div class="profil">
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
          <!-- Otoritas -->
          <section class="authority">
            <div class="authority__top">
              <span class="authority__label">Otoritas Kepemimpinan Prov. Sulut</span>
              <span class="authority__session"><i></i> Sesi Aman Eksekutif</span>
            </div>
            <div class="authority__chips">
              <span class="chip chip--navy"><ion-icon :icon="shieldCheckmarkOutline" /> Akses Komando Kepala Balai</span>
              <span class="chip chip--amber"><ion-icon :icon="checkmarkCircleOutline" /> TTE BSrE Tersertifikasi</span>
            </div>
          </section>

          <!-- Kartu profil -->
          <section class="card profile">
            <div class="profile__top">
              <div class="profile__photo">
                <img v-if="pimpinan.photo" class="profile__img" :src="pimpinan.photo" :alt="pimpinan.name" />
                <span v-else class="profile__initial">{{ pimpinan.initial }}</span>
                <i class="profile__badge"><ion-icon :icon="ribbonOutline" /></i>
              </div>
              <div class="profile__info">
                <h2 class="profile__name">{{ pimpinan.name }}</h2>
                <b class="profile__role">{{ pimpinan.role }}</b>
                <span class="profile__status"><i></i> Aktif • Otoritas Penuh TTE BSSN</span>
              </div>
            </div>
            <dl class="detail">
              <div v-for="d in detail" :key="d.label" class="detail__row">
                <dt>{{ d.label }}</dt>
                <dd>{{ d.value }}</dd>
              </div>
            </dl>
          </section>

          <!-- Ringkasan -->
          <section>
            <div class="section-head">
              <h3 class="section-head__title"><ion-icon :icon="statsChartOutline" /> Ringkasan Aktivitas Semester Ini</h3>
              <span class="section-head__note">T.A. 2024/2025</span>
            </div>
            <div class="stats">
              <div v-for="s in stats" :key="s.label" class="stat">
                <span class="stat__icon" :class="'stat__icon--' + s.tone"><ion-icon :icon="s.icon" /></span>
                <b class="stat__value">{{ s.value }}</b>
                <small class="stat__label">{{ s.label }}</small>
              </div>
            </div>
            <button class="audit" type="button">
              <ion-icon class="audit__icon" :icon="clipboardOutline" />
              <span>Lihat Log Audit Tanda Tangan Digital Pimpinan</span>
              <ion-icon :icon="arrowForwardOutline" />
            </button>
          </section>

          <!-- Kredensial -->
          <section>
            <div class="section-head">
              <h3 class="section-head__title"><ion-icon :icon="shieldOutline" /> Kredensial &amp; Otorisasi Keamanan</h3>
              <span class="section-head__muted">Level Eksekutif</span>
            </div>
            <div class="card security">
              <div class="cert">
                <div class="cert__head">
                  <span class="cert__icon"><ion-icon :icon="shieldCheckmarkOutline" /></span>
                  <div class="cert__text">
                    <b>Sertifikat Digital TTE BSrE</b>
                    <small>Balai Sertifikasi Elektronik - BSSN RI</small>
                  </div>
                  <span class="cert__valid">Valid</span>
                </div>
                <p class="cert__id">ID: <b>BSrE-SULUT-981240</b> Masa Berlaku: <b>24 Des 2026</b></p>
                <button class="cert__sync" type="button"><ion-icon :icon="syncOutline" /> Sinkronisasi &amp; Perbarui Sertifikat Digital</button>
              </div>

              <div class="option">
                <span class="option__icon option__icon--blue"><ion-icon :icon="fingerPrintOutline" /></span>
                <div class="option__text">
                  <b>Autentikasi Biometrik</b>
                  <small>Sidik Jari &amp; Face ID untuk persetujuan cepat</small>
                </div>
                <label class="switch">
                  <input v-model="biometrik" type="checkbox" />
                  <span></span>
                </label>
              </div>

              <div class="option option--pin">
                <span class="option__icon option__icon--amber"><ion-icon :icon="keypadOutline" /></span>
                <div class="option__text">
                  <b>PIN Pengesahan SK &amp; Piagam</b>
                  <small>6 Digit Terkonfigurasi Aman</small>
                </div>
                <button class="option__btn" type="button">Ubah PIN</button>
              </div>
            </div>
          </section>

          <!-- Notifikasi -->
          <section>
            <div class="section-head">
              <h3 class="section-head__title"><ion-icon :icon="notificationsOutline" /> Eskalasi Komando &amp; Notifikasi</h3>
              <span class="section-head__muted">Real-time</span>
            </div>
            <div class="card notif">
              <div v-for="n in notifs" :key="n.title" class="notif__row">
                <div class="notif__text">
                  <b>{{ n.title }}</b>
                  <small>{{ n.desc }}</small>
                </div>
                <label class="switch">
                  <input v-model="n.on" type="checkbox" />
                  <span></span>
                </label>
              </div>
            </div>
          </section>

          <!-- Bantuan -->
          <section>
            <div class="section-head">
              <h3 class="section-head__title"><ion-icon :icon="headsetOutline" /> Bantuan &amp; Protokoler Khusus</h3>
            </div>
            <div class="card help">
              <div v-for="h in help" :key="h.title" class="help__row">
                <span class="help__icon" :class="'help__icon--' + h.tone"><ion-icon :icon="h.icon" /></span>
                <div class="help__text">
                  <b>{{ h.title }}</b>
                  <small>{{ h.desc }}</small>
                </div>
                <ion-icon class="help__action" :icon="h.action" />
              </div>
            </div>
          </section>

          <button class="logout" type="button"><ion-icon :icon="logOutOutline" /> Keluar dari Portal Eksekutif</button>
          <p class="version">SIKARYA DIKDA SULUT • v2.4.0 (Build 2024.11–BSSN)</p>
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
  checkmarkCircleOutline,
  ribbonOutline,
  statsChartOutline,
  documentOutline,
  trophyOutline,
  schoolOutline,
  clipboardOutline,
  arrowForwardOutline,
  shieldOutline,
  syncOutline,
  fingerPrintOutline,
  keypadOutline,
  headsetOutline,
  callOutline,
  bookOutline,
  downloadOutline,
  logOutOutline,
} from 'ionicons/icons';

import PimpinanTabbar from './PimpinanTabbar.vue';

const pimpinan = {
  name: 'Dr. Femmy Sulistyowati, M.Pd.',
  role: 'Kepala Balai & Dewan Pengarah Talenta',
  initial: 'FS',
  photo: '', // isi dengan path foto, misalnya '/assets/pimpinan/femmy.jpg'
};

const detail = [
  { label: 'NIP', value: '19680412 199303 2 004' },
  { label: 'Pangkat / Gol.', value: 'Pembina Utama Muda (IV/c)' },
  { label: 'Satuan Kerja', value: 'Balai Tekkomdik & Dikda Prov. Sulut' },
];

const stats = [
  { value: '14', label: 'SK Diterbitkan', icon: documentOutline, tone: 'blue' },
  { value: '124', label: 'E-Sertifikat Sah', icon: trophyOutline, tone: 'amber' },
  { value: '100%', label: 'Sekolah Manado', icon: schoolOutline, tone: 'sky' },
];

const biometrik = ref(true);

const notifs = ref([
  { title: 'Notifikasi Lomba Kritis (< 24 Jam)', desc: 'Pemberitahuan darurat batas penilaian juri', on: true },
  { title: 'Laporan Harian Eksekutif (PDF)', desc: 'Terkirim otomatis pk 17.00 WITA via WA Dinas', on: true },
  { title: 'Pemberitahuan Pleno Dewan Juri', desc: 'Pemberitahuan langsung saat rekapitulasi nilai tuntas', on: true },
]);

const help = [
  { title: 'Hotline Tim Teknis IT Dikda', desc: 'Layanan Prioritas Ajudan & Sekretariat', icon: headsetOutline, tone: 'blue', action: callOutline },
  { title: 'Buku Saku Protokol TTE Digital', desc: 'Panduan resmi pejabat Pemprov Sulut (PDF)', icon: bookOutline, tone: 'blue', action: downloadOutline },
];
</script>

<style scoped>
.profil-content {
  --background: #f4f7fb;
}

.profil {
  min-height: 100%;
  background: #f4f7fb;
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
.profil h3,
.profil p,
.profil dl,
.profil dd {
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
  gap: 20px;
  padding: 0 14px 28px;
}

/* Otoritas */
.authority {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
}

.authority__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.authority__label {
  max-width: 190px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 14px;
  text-transform: uppercase;
  color: #003178;
}

.authority__session {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #b6d0f2;
  border-radius: 999px;
  background: #cfe3fb;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  color: #002b4d;
}

.authority__session i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.authority__chips {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.chip ion-icon {
  font-size: 16px;
}

.chip--navy {
  background: #003178;
  color: #fff;
}

.chip--amber {
  border: 1px solid #f3d98a;
  background: #fdeab8;
  color: #5b3a00;
}

/* Kartu */
.card {
  border: 1px solid #e6e9ee;
  border-radius: 22px;
  background: #fff;
}

.profile {
  padding: 16px;
  background: linear-gradient(145deg, #ffffff 55%, #e8f1fb 100%);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

.profile__top {
  display: flex;
  gap: 14px;
}

.profile__photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  flex: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #5b7db3, #003178);
}

.profile__img {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.profile__initial {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
}

.profile__badge {
  position: absolute;
  right: -6px;
  bottom: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #f5b400;
  font-size: 15px;
  color: #fff;
}

.profile__info {
  flex: 1;
  min-width: 0;
}

.profile__name {
  overflow: hidden;
  font-size: 19px;
  line-height: 26px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile__role {
  display: block;
  margin-top: 2px;
  font-size: 13px;
  line-height: 18px;
  color: #00639a;
}

.profile__status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #00639a;
}

.profile__status i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  margin-top: 16px !important;
  border: 1px solid #e6e9ee;
  border-radius: 14px;
  background: #f1f4f8;
}

.detail__row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
}

.detail__row dt {
  flex: none;
  color: #64748b;
}

.detail__row dd {
  font-weight: 600;
  text-align: right;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-head__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 800;
}

.section-head__title ion-icon {
  font-size: 20px;
  color: #003178;
}

.section-head__note {
  font-size: 12px;
  font-weight: 700;
  color: #00639a;
}

.section-head__muted {
  font-size: 12px;
  color: #475569;
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
  gap: 2px;
  padding: 16px 6px;
  border: 1px solid #e6e9ee;
  border-radius: 20px;
  background: #fff;
}

.stat__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  border-radius: 50%;
  font-size: 20px;
}

.stat__icon--blue {
  background: #d9e8fb;
  color: #003178;
}

.stat__icon--amber {
  background: #fde8b8;
  color: #92400e;
}

.stat__icon--sky {
  background: #cfe3fb;
  color: #00639a;
}

.stat__value {
  font-size: 24px;
  line-height: 28px;
  font-weight: 800;
}

.stat__label {
  font-size: 12px;
  color: #475569;
}

.audit {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  margin-top: 12px;
  border-radius: 14px;
  background: #e6eaf0 !important;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  color: #003178 !important;
}

.audit span {
  flex: 1;
}

.audit ion-icon {
  font-size: 20px;
}

/* Kredensial */
.security {
  padding: 14px;
}

.cert {
  padding: 14px;
  border: 1px solid #e6e9ee;
  border-radius: 18px;
  background: #f1f4f8;
}

.cert__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cert__icon {
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

.cert__text {
  flex: 1;
  min-width: 0;
}

.cert__text b {
  display: block;
  font-size: 15px;
}

.cert__text small {
  font-size: 12px;
  color: #475569;
}

.cert__valid {
  align-self: flex-start;
  padding: 2px 12px;
  border-radius: 999px;
  background: #d1fae5;
  font-size: 12px;
  font-weight: 700;
  color: #047857;
}

.cert__id {
  margin-top: 12px !important;
  font-family: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;
  font-size: 11px;
  color: #475569;
}

.cert__id b {
  color: #191c1e;
}

.cert__sync {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 12px;
  background: #e2e7ee !important;
  font-size: 12px;
  font-weight: 600;
  color: #003178 !important;
}

.cert__sync ion-icon {
  font-size: 18px;
}

.option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 4px 4px;
}

.option--pin {
  padding-top: 20px;
}

.option__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 14px;
  font-size: 24px;
}

.option__icon--blue {
  background: #d9e8fb;
  color: #003178;
}

.option__icon--amber {
  background: #fde0b0;
  color: #92400e;
}

.option__text {
  flex: 1;
  min-width: 0;
}

.option__text b {
  display: block;
  font-size: 14px;
  line-height: 20px;
}

.option__text small {
  display: block;
  font-size: 12px;
  line-height: 24px;
  color: #475569;
}

.option__btn {
  padding: 8px 14px;
  border-radius: 10px;
  background: #e6eaf0 !important;
  font-size: 12px;
  font-weight: 700;
  color: #003178 !important;
}

/* Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;
  flex: none;
}

.switch input {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.switch span {
  position: absolute;
  inset: 0;
  border: 2px solid #737783;
  border-radius: 999px;
  background: #e6e9ee;
  pointer-events: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.switch span::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 5px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #737783;
  transform: translateY(-50%);
  transition: left 0.2s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease;
}

.switch input:checked + span {
  border-color: #003178;
  background: #003178;
}

.switch input:checked + span::after {
  left: 23px;
  width: 24px;
  height: 24px;
  background: #fff;
}

/* Notifikasi */
.notif {
  padding: 8px 14px;
}

.notif__row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.notif__text {
  flex: 1;
  min-width: 0;
}

.notif__text b {
  display: block;
  font-size: 13px;
  line-height: 18px;
}

.notif__text small {
  display: block;
  font-size: 12px;
  line-height: 17px;
  color: #475569;
}

/* Bantuan */
.help {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
}

.help__row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border: 1px solid #e6e9ee;
  border-radius: 16px;
  background: #f1f4f8;
}

.help__icon {
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

.help__text {
  flex: 1;
  min-width: 0;
}

.help__text b {
  display: block;
  font-size: 13px;
}

.help__text small {
  display: block;
  font-size: 12px;
  line-height: 22px;
  color: #475569;
}

.help__action {
  font-size: 20px;
  color: #475569;
}

/* Keluar */
.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  background: #fcd7d4 !important;
  font-size: 14px;
  font-weight: 700;
  color: #93000a !important;
}

.logout ion-icon {
  font-size: 22px;
}

.version {
  font-size: 11px;
  text-align: center;
  color: #64748b;
}
</style>