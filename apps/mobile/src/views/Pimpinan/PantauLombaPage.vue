<template>
  <ion-page>
    <ion-content :fullscreen="true" class="pantau-content">
      <div class="pantau">
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
          <!-- Hero -->
          <section class="hero">
            <ion-icon class="hero__mark" :icon="shieldOutline" />
            <div class="hero__top">
              <span class="hero__pill"><i></i> Pemantauan Real-Time</span>
              <small class="hero__period">Manado • TA 2024/2025</small>
            </div>
            <h2 class="hero__title">Pengawasan Lomba Aktif</h2>
            <p class="hero__text">Monitoring komprehensif kurasi karya, dewan juri, dan kepatuhan sekolah.</p>
            <div class="hero__stats">
              <div class="hero__stat">
                <small>Total Ajang</small>
                <b>14 <span>Cabang</span></b>
              </div>
              <div class="hero__stat">
                <small>Karya Dinilai</small>
                <b class="hero__stat-gold">87.5%</b>
              </div>
              <div class="hero__stat">
                <small>Sekolah Aktif</small>
                <b class="hero__stat-gold">91.4%</b>
              </div>
            </div>
          </section>

          <!-- Kategori -->
          <section>
            <div class="section-head">
              <span class="section-head__label">Kategori Bidang Lomba</span>
              <a class="section-head__link" href="#">Tingkat SMP/MTs</a>
            </div>
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
              </button>
            </div>
          </section>

          <!-- Aksi cepat -->
          <section class="quick">
            <button class="quick__item" type="button">
              <span class="quick__icon quick__icon--gray"><ion-icon :icon="notificationsOutline" /></span>
              <span class="quick__text">
                <b>Ingatkan Juri</b>
                <small>Push notifikasi ...</small>
              </span>
            </button>
            <button class="quick__item" type="button">
              <span class="quick__icon quick__icon--amber"><ion-icon :icon="checkboxOutline" /></span>
              <span class="quick__text">
                <b>Rapat Pleno</b>
                <small>Buka Berita Acara</small>
              </span>
            </button>
          </section>

          <!-- Progres cabang -->
          <div class="section-head section-head--title">
            <h2 class="section-head__title">Progres Cabang Prioritas</h2>
            <span class="section-head__sync"><ion-icon :icon="syncOutline" /> Diperbarui 3m lalu</span>
          </div>

          <!-- Kartu 1: final -->
          <article class="lomba">
            <div class="lomba__top">
              <span class="lomba__cat">FLS2N • Seni Kreatif</span>
              <span class="status status--green"><i></i> Tahap Penjurian Final</span>
            </div>
            <h3 class="lomba__title">Kriya Anyam &amp; Seni Kriya</h3>
            <p class="lomba__level">Tingkat SMP se-Kota Manado</p>

            <div class="info">
              <div class="info__item">
                <small class="info__label"><ion-icon :icon="archiveOutline" /> Karya Masuk</small>
                <b class="info__value">48/48 <span class="info__green">(100% Kuota)</span></b>
              </div>
              <div class="info__item">
                <small class="info__label"><ion-icon :icon="hammerOutline" /> Kinerja Juri</small>
                <b class="info__value">3/3 Selesai <span class="info__muted">• Rata 86.4</span></b>
              </div>
            </div>

            <div class="winner">
              <ion-icon :icon="trophyOutline" />
              <p><b>Pemenang Terbentuk:</b> 3 Juara Utama + 2 Harapan siap diplenokan.</p>
            </div>

            <button class="cta" type="button"><ion-icon :icon="documentTextOutline" /> Tinjau Rekap Skor &amp; Berita Acara</button>
          </article>

          <!-- Kartu 2: berjalan -->
          <article class="lomba lomba--orange">
            <div class="lomba__top">
              <span class="lomba__cat">FLS2N • Seni Media Baru</span>
              <span class="status status--amber"><i></i> Penjurian ({{ progress }}%)</span>
            </div>
            <h3 class="lomba__title">Desain Poster Digital</h3>
            <p class="lomba__level">Tingkat SMP se-Kota Manado</p>

            <div class="progress">
              <div class="progress__row">
                <span>Kemajuan Evaluasi Karya</span>
                <b>42 / 62 Karya Dinilai</b>
              </div>
              <div class="progress__track"><div class="progress__fill" :style="{ width: progress + '%' }"></div></div>
            </div>

            <div class="info">
              <div class="info__item">
                <small class="info__label"><ion-icon :icon="peopleOutline" /> Status Dewan Juri</small>
                <b class="info__value info__value--sm">2 dari 3 telah submit</b>
                <b class="info__red">(1 in-progress)</b>
              </div>
              <div class="info__item">
                <small class="info__label"><ion-icon class="info__label-red" :icon="timerOutline" /> Tenggat Waktu</small>
                <b class="info__deadline">12 Jam Tersisa</b>
                <small class="info__note">Batas: Hari ini 23:59</small>
              </div>
            </div>

            <div class="duo">
              <button class="duo__btn duo__btn--gray" type="button"><ion-icon :icon="eyeOutline" /> Pantau Juri</button>
              <button class="duo__btn duo__btn--blue" type="button"><ion-icon :icon="sendOutline" /> Kirim Nudge</button>
            </div>
          </article>

          <!-- Kartu 3: verifikasi -->
          <article class="lomba lomba--blue">
            <div class="lomba__top">
              <span class="lomba__cat">O2SN • Olahraga Prestasi</span>
              <span class="status status--blue"><i></i> Verifikasi Berkas &amp; Fisik</span>
            </div>
            <h3 class="lomba__title">Senam Ritmik &amp; Atletik Pelajar</h3>
            <p class="lomba__level">Tingkat SMP se-Kota Manado</p>

            <div class="athlete">
              <span class="athlete__icon"><ion-icon :icon="walkOutline" /></span>
              <div class="athlete__text">
                <small>Total Peserta Terdaftar</small>
                <b>84 Atlet Pelajar</b>
              </div>
              <div class="athlete__side">
                <span class="athlete__pass">78 Lolos Berkas</span>
                <small>6 Perlu Klarifikasi NISN</small>
              </div>
            </div>
          </article>

          <!-- Keterlibatan sekolah -->
          <section class="coverage">
            <div class="coverage__head">
              <span class="coverage__icon"><ion-icon :icon="schoolOutline" /></span>
              <div class="coverage__title">
                <b>Analisis Keterlibatan Sekolah</b>
                <small>Distribusi partisipasi SMP/MTs Manado</small>
              </div>
              <b class="coverage__percent">{{ coveragePercent }}%</b>
            </div>

            <div class="coverage__row">
              <span>Cakupan Wilayah</span>
              <b>{{ totalInvolved }} dari {{ totalSchools }} Sekolah Terlibat</b>
            </div>
            <div class="coverage__bar">
              <div class="coverage__seg coverage__seg--navy" :style="{ width: negeriWidth + '%' }"></div>
              <div class="coverage__seg coverage__seg--sky" :style="{ width: swastaWidth + '%' }"></div>
            </div>
            <div class="coverage__legend">
              <span><i class="dot dot--navy"></i> Negeri: 100% (38/38)</span>
              <span><i class="dot dot--sky"></i> Swasta: 82% (26/32)</span>
            </div>

            <div class="coverage__note">
              <ion-icon :icon="informationCircleOutline" />
              <p>6 sekolah swasta yang belum mengirimkan karya terkendala zonasi fasilitas multimedia. Tim pendamping balai telah dikerahkan.</p>
            </div>
          </section>
        </div>
      </div>
    </ion-content>
    <PimpinanTabbar />
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  businessOutline,
  calendarOutline,
  notificationsOutline,
  shieldOutline,
  gridOutline,
  colorPaletteOutline,
  basketballOutline,
  checkboxOutline,
  syncOutline,
  archiveOutline,
  hammerOutline,
  trophyOutline,
  documentTextOutline,
  peopleOutline,
  timerOutline,
  eyeOutline,
  sendOutline,
  walkOutline,
  schoolOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import PimpinanTabbar from './PimpinanTabbar.vue';

const filters = [
  { label: 'Semua Lomba', icon: gridOutline },
  { label: 'FLS2N Seni', icon: colorPaletteOutline },
  { label: 'O2SN Olahraga', icon: basketballOutline },
];
const active = ref(filters[0].label);

const progress = Math.round((42 / 62) * 100);

const negeri = { done: 38, total: 38 };
const swasta = { done: 26, total: 32 };
const totalSchools = negeri.total + swasta.total;
const totalInvolved = negeri.done + swasta.done;
const coveragePercent = ((totalInvolved / totalSchools) * 100).toFixed(1);
const negeriWidth = computed(() => (negeri.done / totalSchools) * 100);
const swastaWidth = computed(() => (swasta.done / totalSchools) * 100);
</script>

<style scoped>
.pantau-content {
  --background: #f4f7fb;
}

.pantau {
  min-height: 100%;
  background: #f4f7fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.pantau ion-icon {
  flex-shrink: 0;
}

.pantau button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.pantau h1,
.pantau h2,
.pantau h3,
.pantau p {
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
  gap: 16px;
  padding: 0 14px 24px;
}

/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 16px;
  border-radius: 0 0 22px 22px;
  background: linear-gradient(135deg, #0d47a1 0%, #003178 100%);
  color: #fff;
  margin: 0 -14px;
}

.hero__mark {
  position: absolute;
  top: 50px;
  right: 24px;
  font-size: 90px;
  color: rgba(255, 255, 255, 0.08);
}

.hero__top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.hero__pill i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffba38;
}

.hero__period {
  font-size: 11px;
  color: #b0c6ff;
}

.hero__title {
  position: relative;
  margin-top: 14px !important;
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
}

.hero__text {
  position: relative;
  margin-top: 4px !important;
  font-size: 12px;
  line-height: 17px;
  color: #b0c6ff;
}

.hero__stats {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
}

.hero__stat {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
}

.hero__stat small {
  display: block;
  font-size: 11px;
  color: #b0c6ff;
}

.hero__stat b {
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
}

.hero__stat b span {
  font-size: 12px;
  font-weight: 500;
  color: #d9e2ff;
}

.hero__stat-gold {
  color: #ffd27a;
}

/* Kategori */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-head--title {
  margin: 4px 0 -4px;
}

.section-head__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #475569;
}

.section-head__link {
  font-size: 12px;
  font-weight: 700;
  color: #003178;
  text-decoration: none;
}

.section-head__title {
  font-size: 17px;
  font-weight: 800;
}

.section-head__sync {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #00639a;
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
  border-radius: 12px;
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

/* Aksi cepat */
.quick {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.quick__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e6e9ee !important;
  border-radius: 16px;
  background: #fff !important;
  text-align: left;
}

.quick__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: none;
  border-radius: 12px;
  font-size: 22px;
}

.quick__icon--gray {
  background: #e8ecf2;
  color: #003178;
}

.quick__icon--amber {
  background: #fde0b0;
  color: #5b3a00;
}

.quick__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.quick__text b {
  font-size: 14px;
}

.quick__text small {
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #64748b;
}

/* Kartu lomba */
.lomba {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #e6e9ee;
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
}

.lomba--orange::before,
.lomba--blue::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 4px;
}

.lomba--orange::before {
  background: linear-gradient(90deg, #b45309, #f59e0b);
}

.lomba--blue::before {
  background: linear-gradient(90deg, #0d47a1, #4aa8e8);
}

.lomba__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.lomba__cat {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #00639a;
}

.lomba__title {
  margin-top: 12px !important;
  font-size: 20px;
  line-height: 26px;
  font-weight: 800;
}

.lomba__level {
  margin-top: 2px !important;
  font-size: 12px;
  color: #64748b;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.status--green {
  background: #d1fae5;
  color: #047857;
}

.status--amber {
  background: #fff1c9;
  color: #92400e;
}

.status--blue {
  background: #dbeafe;
  color: #003178;
}

/* Info grid */
.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 12px 14px;
  margin-top: 14px;
  border-radius: 14px;
  background: #f1f4f8;
}

.info__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #475569;
}

.info__label ion-icon {
  font-size: 15px;
  color: #003178;
}

.info__label .info__label-red {
  color: #ba1a1a;
}

.info__value {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
}

.info__value--sm {
  font-size: 13px;
}

.info__value span {
  font-size: 11px;
  font-weight: 500;
}

.info__green {
  color: #047857;
}

.info__muted {
  color: #64748b;
}

.info__red {
  font-size: 12px;
  color: #ba1a1a;
}

.info__deadline {
  font-size: 18px;
  line-height: 22px;
  font-weight: 800;
  color: #ba1a1a;
}

.info__note {
  font-size: 11px;
  color: #475569;
}

/* Pemenang */
.winner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  margin-top: 12px;
  border: 1px solid #f3d98a;
  border-radius: 14px;
  background: #fff3d6;
}

.winner ion-icon {
  font-size: 22px;
  color: #7a4f00;
}

.winner p {
  font-size: 12px;
  line-height: 17px;
  color: #5b3a00;
}

.winner b {
  font-size: 13px;
  color: #2b1a00;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-top: 14px;
  padding: 16px;
  border-radius: 14px;
  background: #003178 !important;
  font-size: 14px;
  font-weight: 700;
  color: #fff !important;
  transition: transform 0.15s ease;
}

.cta:active {
  transform: scale(0.98);
}

.cta ion-icon {
  font-size: 20px;
}

/* Progres */
.progress {
  margin-top: 14px;
}

.progress__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.progress__row b {
  color: #ba1a1a;
}

.progress__track {
  height: 8px;
  margin-top: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: #e2e6ec;
}

.progress__fill {
  height: 100%;
  border-radius: 999px;
  background: #e8710a;
}

.duo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}

.duo__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}

.duo__btn ion-icon {
  font-size: 18px;
}

.duo__btn--gray {
  background: #e8ecf2 !important;
  color: #191c1e !important;
}

.duo__btn--blue {
  background: #8fcbff !important;
  color: #002b4d !important;
}

/* Atlet */
.athlete {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 14px;
  border-radius: 14px;
  background: #f1f4f8;
}

.athlete__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: none;
  border-radius: 12px;
  background: #dbeafe;
  font-size: 24px;
  color: #003178;
}

.athlete__text {
  flex: 1;
}

.athlete__text small {
  display: block;
  font-size: 11px;
  color: #475569;
}

.athlete__text b {
  font-size: 16px;
  font-weight: 700;
}

.athlete__side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.athlete__side small {
  font-size: 11px;
  color: #475569;
}

.athlete__pass {
  padding: 3px 10px;
  border: 1px solid #b8e6cb;
  border-radius: 8px;
  background: #e6f7ee;
  font-size: 11px;
  font-weight: 700;
  color: #047857;
}

/* Cakupan */
.coverage {
  padding: 16px;
  border: 1px solid #e6e9ee;
  border-radius: 18px;
  background: #fff;
}

.coverage__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.coverage__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 12px;
  background: #e8ecf2;
  font-size: 22px;
  color: #003178;
}

.coverage__title {
  flex: 1;
}

.coverage__title b {
  display: block;
  font-size: 15px;
  line-height: 19px;
}

.coverage__title small {
  font-size: 12px;
  color: #64748b;
}

.coverage__percent {
  font-size: 26px;
  font-weight: 800;
  color: #003178;
}

.coverage__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 13px;
}

.coverage__row b {
  font-size: 13px;
  color: #003178;
}

.coverage__bar {
  display: flex;
  height: 10px;
  margin-top: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: #e2e6ec;
}

.coverage__seg--navy {
  background: #003178;
}

.coverage__seg--sky {
  background: #4aa8e8;
}

.coverage__legend {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
}

.coverage__legend span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot--navy {
  background: #003178;
}

.dot--sky {
  background: #4aa8e8;
}

.coverage__note {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  margin-top: 14px;
  border-radius: 12px;
  background: #eceff3;
}

.coverage__note ion-icon {
  flex: none;
  margin-top: 2px;
  font-size: 18px;
  color: #00639a;
}

.coverage__note p {
  font-size: 12px;
  line-height: 18px;
  color: #475569;
}
</style>