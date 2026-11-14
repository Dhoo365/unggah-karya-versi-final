<template>
  <ion-page>
    <ion-content :fullscreen="true" class="lomba-content">
      <div class="lomba">
        <header class="topbar">
          <div class="topbar__brand">
            <button class="topbar__btn" type="button" aria-label="Menu"><ion-icon :icon="menuOutline" /></button>
            <div class="topbar__text">
              <h1 class="topbar__title">SIKARYA Dikda Sulut</h1>
              <p class="topbar__subtitle"><i class="topbar__dot"></i> Pemerintah Provinsi Sulawesi Utara</p>
            </div>
          </div>
          <button class="topbar__btn topbar__btn--notif" type="button" aria-label="Notifikasi">
            <ion-icon :icon="notificationsOutline" />
            <i class="topbar__badge"></i>
          </button>
        </header>

        <div class="body">
          <!-- Info portal -->
          <section class="portal">
            <div class="portal__icon"><ion-icon :icon="ribbonOutline" /></div>
            <div class="portal__text">
              <b class="portal__title">Portal Kurasi Talenta Prestasi Pelajar</b>
              <p class="portal__desc">Dinas Pendidikan Daerah Provinsi Sulut</p>
            </div>
            <span class="portal__year">Tahun 2025</span>
          </section>

          <!-- Hero -->
          <section class="hero">
            <ion-icon class="hero__mark" :icon="trophyOutline" />
            <div class="hero__top">
              <span class="hero__eyebrow"><ion-icon :icon="trophyOutline" /> FLS2N Sulut 2025</span>
              <span class="hero__remain"><ion-icon :icon="timeOutline" /> Sisa {{ countdown[0].value }} Hari</span>
            </div>
            <h2 class="hero__title">Festival &amp; Lomba Seni Siswa Nasional</h2>
            <p class="hero__text">Tingkat Provinsi Sulawesi Utara • Ajang Seleksi Bakat Menuju Nasional</p>

            <div class="countdown">
              <div v-for="c in countdown" :key="c.label" class="countdown__item">
                <b class="countdown__value">{{ c.value }}</b>
                <small class="countdown__label">{{ c.label }}</small>
              </div>
            </div>

            <div class="hero__actions">
              <button class="hero__btn hero__btn--yellow" type="button">
                Daftar Sekarang <ion-icon :icon="arrowForwardOutline" />
              </button>
              <button class="hero__btn hero__btn--glass" type="button">
                <ion-icon :icon="downloadOutline" /> Unduh Juknis Resmi
              </button>
            </div>
          </section>

          <!-- Kategori jenjang -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Kategori Jenjang</h2>
              <a class="section-head__link" href="#">Lihat Syarat</a>
            </div>
            <div class="chips">
              <button
                v-for="j in jenjang"
                :key="j.key"
                class="chips__item"
                :class="{ 'chips__item--active': activeJenjang === j.key }"
                type="button"
                @click="activeJenjang = j.key"
              >
                <ion-icon v-if="activeJenjang === j.key" :icon="checkmarkOutline" /> {{ j.label }}
              </button>
            </div>
          </section>

          <!-- Statistik -->
          <section class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <span class="stat__label">{{ s.label }}</span>
              <span class="stat__row">
                <b class="stat__value">{{ s.value }}</b>
                <small class="stat__unit">{{ s.unit }}</small>
              </span>
            </div>
          </section>

          <!-- Daftar lomba -->
          <section>
            <div class="section-head section-head--top">
              <div>
                <h2 class="section-head__title section-head__title--big">Kategori Lomba Aktif</h2>
                <p class="section-head__desc">Pilih cabang kejuaraan dan unggah berkas karya siswa</p>
              </div>
              <button class="section-head__filter" type="button" aria-label="Filter"><ion-icon :icon="optionsOutline" /></button>
            </div>

            <div class="list">
              <article v-for="l in filteredLomba" :key="l.title" class="card">
                <div class="card__top">
                  <span class="card__level" :class="'card__level--' + l.tone">{{ l.level }}</span>
                  <small class="card__field">{{ l.field }}</small>
                  <span class="card__status"><i class="card__dot"></i> Buka</span>
                </div>

                <div class="card__main">
                  <div class="card__icon"><ion-icon :icon="l.icon" /></div>
                  <div class="card__text">
                    <h3 class="card__title">{{ l.title }}</h3>
                    <p class="card__desc">{{ l.desc }}</p>
                  </div>
                </div>

                <div class="card__info">
                  <span class="card__meta"><ion-icon :icon="calendarOutline" /> Tenggat: <b>{{ l.deadline }}</b></span>
                  <span class="card__meta"><ion-icon :icon="peopleOutline" /> Kuota: <b>{{ l.quota }}</b></span>
                </div>

                <div class="card__bottom">
                  <a class="card__link" href="#"><ion-icon :icon="bookOutline" /> Pedoman Juknis</a>
                  <button class="card__btn" type="button">Detail &amp; Kirim <ion-icon :icon="chevronForwardOutline" /></button>
                </div>
              </article>

              <p v-if="!filteredLomba.length" class="empty">Belum ada lomba untuk jenjang ini.</p>
            </div>
          </section>

          <!-- Bantuan -->
          <section class="help">
            <div class="help__icon"><ion-icon :icon="helpCircleOutline" /></div>
            <div class="help__text">
              <b class="help__title">Butuh Panduan Pendaftaran?</b>
              <p class="help__desc">Hubungi Helpdesk Teknis Dinas Dikda Sulut</p>
            </div>
            <button class="help__btn" type="button">Bantuan</button>
          </section>
        </div>
      </div>
    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  menuOutline,
  notificationsOutline,
  ribbonOutline,
  trophyOutline,
  timeOutline,
  arrowForwardOutline,
  downloadOutline,
  checkmarkOutline,
  optionsOutline,
  calendarOutline,
  peopleOutline,
  bookOutline,
  chevronForwardOutline,
  helpCircleOutline,
  desktopOutline,
  happyOutline,
  waterOutline,
  flaskOutline,
} from 'ionicons/icons';


// Batas pendaftaran FLS2N (ganti sesuai jadwal resmi)
const deadline = new Date('2025-07-15T23:59:59+08:00').getTime();

const jenjang = [
  { key: 'semua', label: 'Semua Jenjang' },
  { key: 'SMA', label: 'SMA' },
  { key: 'SMK', label: 'SMK' },
  { key: 'SLB', label: 'SLB' },
  { key: 'MA', label: 'MA' },
];

const stats = [
  { label: 'Lomba Aktif', value: 18, unit: 'Cabang' },
  { label: 'Kab/Kota Terdaftar', value: 15, unit: 'Wilayah' },
  { label: 'Total Peserta', value: '1.240', unit: 'Karya' },
];

const lomba = [
  {
    level: 'SMK', jenjang: ['SMK'], tone: 'gray', field: 'Bidang Vokasi & Keahlian', icon: desktopOutline,
    title: 'LKS SMK Kejuruan (Teknologi & Desain)',
    desc: 'Desain Web Komersial, Cloud Computing, dan Grafis Digital',
    deadline: '15 Juli 2025', quota: '3 Peserta/Sekolah',
  },
  {
    level: 'SMA / SMK', jenjang: ['SMA', 'SMK'], tone: 'amber', field: 'Kearifan Lokal Sulut', icon: happyOutline,
    title: 'FLS2N: Tari Kreasi Daerah & Seni Monolog',
    desc: 'Eksplorasi cerita rakyat Minahasa, Bolaang Mongondow, dan Sangihe',
    deadline: '20 Juli 2025', quota: '1 Tim/Cabang',
  },
  {
    level: 'SMA / SLB', jenjang: ['SMA', 'SLB'], tone: 'blue', field: 'Olahraga & Kebugaran', icon: waterOutline,
    title: 'O2SN: Cabang Atletik & Renang Pelajar',
    desc: 'Kompetisi fisik putra/putri, rekor waktu sprint dan gaya bebas',
    deadline: '25 Juli 2025', quota: '2 Atlet/Nomor',
  },
  {
    level: 'SMA / MA', jenjang: ['SMA', 'MA'], tone: 'blue', field: 'Sains & Matematika', icon: flaskOutline,
    title: 'Olimpiade Sains Daerah (OSD) Sulut',
    desc: 'Fisika Terapan, Matematika Komputasi, dan Biologi Lingkungan',
    deadline: '30 Juli 2025', quota: 'Terbuka',
  },
];

const activeJenjang = ref('semua');
const now = ref(Date.now());
let timer: ReturnType<typeof setInterval> | undefined;

const filteredLomba = computed(() =>
  activeJenjang.value === 'semua' ? lomba : lomba.filter((l) => l.jenjang.includes(activeJenjang.value)),
);

const pad = (n: number) => String(n).padStart(2, '0');

const countdown = computed(() => {
  const sisa = Math.max(0, Math.floor((deadline - now.value) / 1000));
  return [
    { label: 'Hari', value: pad(Math.floor(sisa / 86400)) },
    { label: 'Jam', value: pad(Math.floor((sisa % 86400) / 3600)) },
    { label: 'Menit', value: pad(Math.floor((sisa % 3600) / 60)) },
    { label: 'Detik', value: pad(sisa % 60) },
  ];
});

onMounted(() => {
  timer = setInterval(() => (now.value = Date.now()), 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.lomba-content {
  --background: #f7f9fb;
}

.lomba {
  min-height: 100%;
  padding-bottom: 80px;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.lomba ion-icon {
  flex-shrink: 0;
}

.lomba button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.lomba h1,
.lomba h2,
.lomba h3,
.lomba p {
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
  gap: 14px;
}

.topbar__title {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  line-height: 14px;
  color: #434652;
}

.topbar__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f59e0b;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 26px;
  color: #003178;
}

.topbar__btn--notif {
  color: #92400e;
}

.topbar__badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 9px;
  height: 9px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #ba1a1a;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px;
}

/* Portal */
.portal {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.portal__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  background: #f2f4f6;
  font-size: 22px;
  color: #003178;
}

.portal__text {
  flex: 1;
  min-width: 0;
}

.portal__title {
  display: block;
  font-size: 12px;
  line-height: 16px;
  color: #003178;
}

.portal__desc {
  margin-top: 2px !important;
  font-size: 11px;
  line-height: 15px;
  color: #737783;
}

.portal__year {
  flex: none;
  padding: 4px 10px;
  border-radius: 10px;
  background: #d9e2ff;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
  color: #003178;
}

/* Hero */
.hero {
  position: relative;
  overflow: hidden;
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #0d47a1 0%, #003178 100%);
  color: #fff;
}

.hero__mark {
  position: absolute;
  right: -16px;
  top: 40px;
  font-size: 140px;
  color: rgba(255, 255, 255, 0.06);
}

.hero__top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 11px;
  font-weight: 600;
  color: #d9e2ff;
}

.hero__remain {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 8px;
  background: #ffe9b8;
  font-size: 11px;
  font-weight: 700;
  color: #7a3e00;
}

.hero__title {
  position: relative;
  margin-top: 14px !important;
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
  letter-spacing: -0.4px;
}

.hero__text {
  position: relative;
  margin-top: 8px !important;
  font-size: 12px;
  line-height: 17px;
  color: #d9e2ff;
}

/* Countdown */
.countdown {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 14px;
}

.countdown__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
}

.countdown__value {
  font-size: 20px;
  line-height: 24px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.countdown__label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #d9e2ff;
}

.hero__actions {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
}

.hero__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 10px !important;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
}

.hero__btn ion-icon {
  font-size: 18px;
}

.hero__btn--yellow {
  background: #ffba38 !important;
  color: #3d2000 !important;
}

.hero__btn--glass {
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  background: rgba(255, 255, 255, 0.12) !important;
  color: #fff !important;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.section-head--top {
  align-items: flex-start;
  margin-bottom: 12px;
}

.section-head__title {
  font-size: 15px;
  font-weight: 800;
}

.section-head__title--big {
  font-size: 18px;
}

.section-head__desc {
  margin-top: 2px !important;
  font-size: 12px;
  color: #737783;
}

.section-head__link {
  font-size: 12px;
  font-weight: 600;
  color: #003178;
  text-decoration: none;
}

.section-head__filter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 10px;
  background: #e6e8ea !important;
  font-size: 20px;
  color: #434652 !important;
}

/* Chips */
.chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.chips::-webkit-scrollbar {
  display: none;
}

.chips__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  padding: 9px 16px !important;
  border: 1px solid #e0e3e5 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  color: #434652 !important;
}

.chips__item--active {
  border-color: #003178 !important;
  background: #003178 !important;
  color: #fff !important;
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
  justify-content: space-between;
  gap: 6px;
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.stat__label {
  font-size: 11px;
  line-height: 14px;
  color: #434652;
}

.stat__row {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px;
}

.stat__value {
  font-size: 22px;
  line-height: 1.1;
  font-weight: 800;
  color: #003178;
}

.stat__unit {
  font-size: 10px;
  font-weight: 600;
  color: #003178;
}

/* Kartu lomba */
.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card {
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.card__top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card__level {
  flex: none;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.card__level--gray {
  background: #e6e8ea;
  color: #191c1e;
}

.card__level--amber {
  background: #ffe9b8;
  color: #7a3e00;
}

.card__level--blue {
  background: #d9e2ff;
  color: #003178;
}

.card__field {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 11px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #434652;
}

.card__status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  padding: 3px 10px;
  border-radius: 999px;
  background: #effaf4;
  font-size: 11px;
  font-weight: 700;
  color: #047857;
}

.card__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.card__main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 14px;
}

.card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: none;
  border-radius: 10px;
  background: #f2f4f6;
  font-size: 22px;
  color: #191c1e;
}

.card__text {
  flex: 1;
  min-width: 0;
}

.card__title {
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
}

.card__desc {
  margin-top: 2px !important;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #737783;
}

.card__info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #eceef0;
}

.card__meta {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11px;
  line-height: 16px;
  color: #434652;
}

.card__meta ion-icon {
  margin-top: 1px;
  font-size: 14px;
  color: #003178;
}

.card__meta b {
  color: #191c1e;
}

.card__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
}

.card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #003178;
  text-decoration: none;
}

.card__link ion-icon {
  font-size: 16px;
}

.card__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px !important;
  border-radius: 10px;
  background: #003178 !important;
  font-size: 13px;
  font-weight: 700;
  color: #fff !important;
}

.empty {
  padding: 24px;
  border: 1px dashed #c4c6d0;
  border-radius: 14px;
  font-size: 12px;
  text-align: center;
  color: #737783;
}

/* Bantuan */
.help {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #f2f4f6;
}

.help__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 10px;
  background: #d9e2ff;
  font-size: 22px;
  color: #003178;
}

.help__text {
  flex: 1;
  min-width: 0;
}

.help__title {
  display: block;
  font-size: 13px;
  line-height: 18px;
}

.help__desc {
  margin-top: 2px !important;
  font-size: 11px;
  line-height: 15px;
  color: #737783;
}

.help__btn {
  flex: none;
  padding: 8px 14px !important;
  border: 1px solid #c4c6d0 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  color: #003178 !important;
}
</style>