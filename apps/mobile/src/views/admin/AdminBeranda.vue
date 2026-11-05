<template>
  <ion-page>
    <ion-content :fullscreen="true" class="lomba-content">
      <div class="page">
        <header class="bar">
          <div class="brand">
            <div class="brand__logo"><ion-icon :icon="shieldCheckmarkOutline" /></div>
            <div class="brand__text">
              <strong>Admin SIKARYA</strong>
              <span><i class="dot"></i> Sulut Talenta Berdaya</span>
            </div>
          </div>
          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Notifikasi">
              <ion-icon :icon="notificationsOutline" /><i class="badge"></i>
            </button>
            <button class="icon-btn" type="button" aria-label="Menu" @click="drawer = true">
              <ion-icon :icon="menuOutline" />
            </button>
          </div>
        </header>

        <main class="main">
          <section class="hero">
            <i class="hero__glow"></i>
            <div class="hero__top">
              <div class="hero__left">
                <div class="hero__seal"><ion-icon :icon="ribbon" /></div>
                <div>
                  <div class="hero__name"><b>Admin Disdikbud Manado</b><span class="hero__city">Kota Manado</span></div>
                  <p>Dinas Pendidikan dan Kebudayaan Kota Manado</p>
                </div>
              </div>
              <span class="hero__active"><i></i> Aktif 2026</span>
            </div>
            <div class="hero__foot">
              <span class="hero__access"><ion-icon :icon="shieldCheckmarkOutline" /> Hak Akses Verifikator Utama</span>
              <a href="#quick">Pusat Kontrol <ion-icon :icon="arrowForwardOutline" /></a>
            </div>
          </section>

          <section class="stack8">
            <div class="search">
              <ion-icon :icon="searchOutline" />
              <input v-model="query" type="text" placeholder="Cari lomba, juknis, atau nama dewan juri..." />
            </div>
            <div class="filters">
              <button v-for="j in jenjang" :key="j" type="button" :class="{ on: active === j }" @click="active = j">
                <ion-icon v-if="active === j" :icon="checkmarkOutline" />{{ j }}
              </button>
            </div>
          </section>

          <section>
            <div class="sec-head">
              <h2>Statistik Kinerja Lomba</h2>
              <span class="sec-head__year">Tahun Ajaran 2025/2026</span>
            </div>
            <div class="stats">
              <div v-for="s in stats" :key="s.label" class="stat">
                <div class="stat__ico" :class="s.tone"><ion-icon :icon="s.icon" /></div>
                <div><b>{{ s.value }}</b><span>{{ s.label }}</span></div>
              </div>
            </div>
          </section>

          <section id="quick" class="create">
            <div class="create__left">
              <div class="create__ico"><ion-icon :icon="addCircleOutline" /></div>
              <div><h3>Buat Lomba Baru</h3><p>Unggah juknis, atur kuota, dan tanggal seleksi</p></div>
            </div>
            <button class="create__btn" type="button">+ Buat</button>
          </section>

          <section class="stack12">
            <div class="sec-head sec-head--top">
              <div>
                <h2 class="lg">Data Lomba Terkini</h2>
                <p class="muted">Kelola status kuota kecamatan/sub-rayon, jadwal &amp; juknis</p>
              </div>
              <a class="manage" href="#">Kelola Semua</a>
            </div>

            <article v-for="l in lombas" :key="l.title" class="card stack12">
              <div class="between top">
                <div class="row gap8">
                  <span class="pill" :class="l.levelTone">{{ l.level }}</span>
                  <span class="pill" :class="l.statusTone">{{ l.status }}</span>
                </div>
                <div class="row">
                  <button class="mini" type="button"><ion-icon :icon="createOutline" /></button>
                  <button class="mini mini--danger" type="button"><ion-icon :icon="trashOutline" /></button>
                </div>
              </div>

              <div>
                <h3 class="lg">{{ l.title }}</h3>
                <p class="muted">{{ l.meta }}</p>
              </div>

              <template v-if="l.quota">
                <div class="stack4">
                  <div class="between top small">
                    <span class="muted2">{{ l.quota.label }}</span>
                    <b :class="'c-' + l.quota.tone">{{ l.quota.value }}</b>
                  </div>
                  <div class="track"><div :class="'bg-' + l.quota.tone" :style="{ width: l.quota.pct + '%' }"></div></div>
                </div>
                <div class="card__foot">
                  <span class="card__file" :class="l.foot.tone"><ion-icon :icon="l.foot.icon" />{{ l.foot.text }}</span>
                  <button class="more" type="button">{{ l.foot.btn }} <ion-icon :icon="chevronForwardOutline" /></button>
                </div>
              </template>
              <div v-else class="between top small">
                <span class="muted2">Siswa Lolos Verifikasi: <strong>112 Atlet</strong></span>
                <button class="link" type="button">Kelola Kuota Kecamatan</button>
              </div>
            </article>
          </section>

          <section class="card stack8">
            <div class="between">
              <div class="row gap8">
                <div class="sq sq--amber"><ion-icon :icon="hammerOutline" /></div>
                <h2 class="lg">Penetapan Dewan Juri</h2>
              </div>
              <span class="count">18 Terdaftar</span>
            </div>
            <div class="jury">
              <div class="between gap8">
                <div>
                  <p class="jury__title">FLS2N Kategori Vokal Solo &amp; Musik Tradisi - Tingkat Kota Manado</p>
                  <p class="muted">3 Dewan Juri Ditetapkan (Praktisi Musik &amp; Penggiat Seni Kota Manado)</p>
                </div>
                <span class="done"><ion-icon :icon="checkmarkCircle" /> Lengkap</span>
              </div>
              <div class="between jury__foot">
                <div class="avatars"><div v-for="a in juri" :key="a.i" :class="a.tone">{{ a.i }}</div></div>
                <button class="assign" type="button">Tentukan Penugasan Juri <ion-icon :icon="arrowForwardOutline" /></button>
              </div>
            </div>
            <div class="row gap8">
              <button class="act act--soft" type="button"><ion-icon :icon="personAddOutline" /> SK Dewan Juri</button>
              <button class="act act--line" type="button"><ion-icon :icon="idCardOutline" /> Pakta Integritas</button>
            </div>
          </section>

          <section class="card stack8">
            <div class="between">
              <div class="row gap8">
                <div class="sq sq--blue"><ion-icon :icon="clipboardOutline" /></div>
                <div><h2 class="lg">Kriteria &amp; Rubrik Skor</h2><p class="muted">Bobot penilaian standar Disdikbud Kota Manado</p></div>
              </div>
              <button class="tune" type="button" aria-label="Ubah rubrik"><ion-icon :icon="optionsOutline" /></button>
            </div>
            <div class="stack8">
              <div v-for="k in kriteria" :key="k.title" class="crit">
                <div class="between"><b>{{ k.title }}</b><b :class="'c-' + k.tone">{{ k.pct }}%</b></div>
                <div class="track track--thin"><div :class="'bg-' + k.tone" :style="{ width: k.pct + '%' }"></div></div>
                <span>{{ k.desc }}</span>
              </div>
            </div>
          </section>

          <section class="card stack12">
            <div class="between"><h2 class="lg">Status Pengumuman Hasil</h2><span class="outline">Publikasi Portal</span></div>
            <div class="stack8">
              <div v-for="p in pengumuman" :key="p.title" class="ann" :class="p.box">
                <div class="row gap12">
                  <div class="ann__ico" :class="p.tone"><ion-icon :icon="p.icon" /></div>
                  <div class="ann__text"><b>{{ p.title }}</b><span>{{ p.sub }}</span></div>
                </div>
                <span class="pill pill--bold" :class="p.tone">{{ p.badge }}</span>
              </div>
            </div>
            <button class="release" type="button"><ion-icon :icon="cloudUploadOutline" /> Rilis Pengumuman Resmi Baru</button>
          </section>
        </main>
      </div>
    </ion-content>

    <div class="overlay" :class="{ show: drawer }" @click="drawer = false"></div>
    <aside class="drawer" :class="{ show: drawer }">
      <div class="drawer__head">
        <div class="row gap8">
          <div class="drawer__emblem"><ion-icon :icon="businessOutline" /></div>
          <div class="drawer__who">
            <strong>Admin Disdikbud Manado</strong>
            <span>Dinas Pendidikan &amp; Kebudayaan Kota Manado</span>
            <small>disdikbud@kotamanado.go.id</small>
          </div>
        </div>
        <button class="icon-btn" type="button" aria-label="Tutup" @click="drawer = false"><ion-icon :icon="closeOutline" /></button>
      </div>
      <nav class="drawer__nav">
        <a v-for="(m, i) in menus" :key="m.label" href="#" :class="{ on: i === 0 }">
          <ion-icon :icon="m.icon" /><span>{{ m.label }}</span>
        </a>
      </nav>
      <div class="drawer__foot">
        <div class="drawer__ver"><span>Wilayah: Rayon Kota Manado</span><b>Ver. 3.4.1</b></div>
        <button class="logout" type="button"><ion-icon :icon="logOutOutline" /><span>Keluar Portal Admin</span></button>
      </div>
    </aside>

    <AdminTabBar/>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonFooter, IonIcon } from '@ionic/vue';
import { shieldCheckmarkOutline, notificationsOutline, menuOutline, closeOutline, ribbon, arrowForwardOutline, searchOutline, checkmarkOutline, trophyOutline, peopleOutline, hammerOutline, ribbonOutline, checkmarkCircleOutline, checkmarkCircle, addCircleOutline, createOutline, trashOutline, documentTextOutline, chevronForwardOutline, personAddOutline, idCardOutline, clipboardOutline, optionsOutline, megaphoneOutline, cloudUploadOutline, businessOutline, gridOutline, statsChartOutline, settingsOutline, logOutOutline,} from 'ionicons/icons';
import AdminTabBar from './AdminTabBar.vue';

const route = useRoute();
const router = useRouter();
const drawer = ref(false);
const query = ref('');

const jenjang = ['Semua Jenjang', 'SMA / MA', 'SMK Vokasi', 'SMP / MTs', 'SLB / Khusus'];
const active = ref(jenjang[0]);

const stats = [
  { value: 12, label: 'Lomba Aktif', icon: trophyOutline, tone: 'tone-blue' },
  { value: 348, label: 'Siswa Terdaftar', icon: peopleOutline, tone: 'tone-sky' },
  { value: 18, label: 'Dewan Juri Aktif', icon: hammerOutline, tone: 'tone-amber' },
  { value: 156, label: 'Sertifikat Valid', icon: checkmarkCircleOutline, tone: 'tone-green' },
];

const lombas = [
  {
    level: 'SMA / MA', levelTone: 'tone-blue', status: 'Pendaftaran Buka', statusTone: 'tone-green',
    title: 'FLS2N Seni Budaya & Tari Kreasi 2026', meta: 'Tingkat Kota Manado • Seleksi Tahap I',
    quota: { label: 'Kuota Sub-rayon (Malalayang, Tikala, Wenang, Sario):', value: '84 / 100 Peserta', pct: 84, tone: 'pri' },
    foot: { icon: documentTextOutline, text: 'Juknis_FLS2N_Manado_2026.pdf', tone: 'file', btn: 'Detail Kuota' },
  },
  {
    level: 'SMK Vokasi', levelTone: 'tone-sky', status: 'Tahap Penjurian', statusTone: 'tone-amber',
    title: 'Festival Inovasi Teknologi Rekayasa Vokasi', meta: 'Tingkat Kota Manado • Bidang IoT & Rekayasa Terapan',
    quota: { label: 'Kuota Terisi:', value: '42 / 50 Tim Sekolah', pct: 84, tone: 'sec' },
    foot: { icon: checkmarkCircleOutline, text: 'Rubrik Penilaian Terkunci', tone: 'ok', btn: 'Lihat Portofolio' },
  },
  {
    level: 'SMP / MTs', levelTone: 'tone-gray', status: 'Validasi Berkas', statusTone: 'tone-dim',
    title: 'O2SN Olahraga Atletik & Bulu Tangkis', meta: 'Tingkat Kota Manado • Seleksi Kontingen 11 Kecamatan Kota Manado',
    quota: null,
  },
] as any[];

const juri = [{ i: 'DR', tone: 'av-pri' }, { i: 'MK', tone: 'av-sec' }, { i: 'AL', tone: 'av-tert' }];

const kriteria = [
  { title: 'Kreativitas & Orisinalitas Kearifan Lokal', pct: 35, tone: 'pri', desc: 'Skala penilaian 10 - 100 poin (Kunci Juri: Min. 70)' },
  { title: 'Kesesuaian Teknis & Portofolio Karya', pct: 40, tone: 'sec', desc: 'Standar kesesuaian dokumen juknis resmi Disdikbud Kota Manado' },
  { title: 'Presentasi & Penguasaan Materi', pct: 25, tone: 'tert', desc: 'Sesi tanya jawab panelis dewan juri daerah' },
];

const pengumuman = [
  { title: 'Juara FLS2N Seni Tari Tingkat Kota Manado', sub: 'Diterbitkan • 26 Feb 2026', badge: 'Diterbitkan', icon: megaphoneOutline, box: 'ann--solid', tone: 'tone-green' },
  { title: 'Hasil Seleksi Portofolio Vokasi IoT', sub: 'Menunggu TTD Kadis Pendidikan Kota Manado', badge: 'Draft SK', icon: createOutline, box: 'ann--dashed', tone: 'tone-amber' },
];



const menus = [
  { icon: gridOutline, label: 'Dashboard Utama' },
  { icon: checkmarkCircleOutline, label: 'Sertifikat & Validasi' },
  { icon: ribbonOutline, label: 'Kurasi Talenta Daerah' },
  { icon: statsChartOutline, label: 'Laporan Rekapitulasi' },
  { icon: settingsOutline, label: 'Pengaturan Akun Dinas' },
];
</script>

<style scoped>
.lomba-content {
  --background: #f7f9fb;
}

.page {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  color: #191c1e;
}

ion-icon {
  flex: none;
  font-size: 20px;
}

button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

h1, h2, h3, p {
  margin: 0;
}

.row {
  display: flex;
  align-items: center;
}

.between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.top {
  align-items: flex-start;
}

.gap8 {
  gap: 8px;
}

.gap12 {
  gap: 12px;
}

.stack4 {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stack8 {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stack12 {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.muted {
  font-size: 12px;
  line-height: 16px;
  color: #434652;
}

.muted2 {
  color: #434652;
}

.outline {
  font-size: 11px;
  color: #737783;
}

.small {
  font-size: 11px;
  font-weight: 500;
}

.small b {
  white-space: nowrap;
  font-weight: 700;
}

.small strong {
  color: #191c1e;
}

.lg {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top, 0px) + 8px) 16px 8px;
  background: #fff;
  border-bottom: 1px solid #c3c6d4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand__logo {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #d9e2ff;
  color: #003178;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand__logo ion-icon {
  font-size: 22px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: #003178;
  letter-spacing: -0.2px;
}

.brand__text span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.bar__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  position: relative;
  display: flex;
  padding: 8px;
  border-radius: 50%;
  color: #434652;
  transition: transform 0.15s, background 0.15s;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.icon-btn:active {
  background: #e6e8ea;
  transform: scale(0.95);
}

.badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ba1a1a;
  box-shadow: 0 0 0 2px #fff;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 24px;
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 16px;
  border-radius: 16px;
  color: #fff;
  background: linear-gradient(135deg, #003178 0%, #0d47a1 50%, #00639a 100%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.hero__glow {
  position: absolute;
  right: -24px;
  bottom: -24px;
  width: 144px;
  height: 144px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  filter: blur(24px);
  pointer-events: none;
}

.hero__top {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.hero__left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero__seal {
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  color: #ffba38;
}

.hero__seal ion-icon {
  font-size: 28px;
}

.hero__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.hero__name b {
  font-size: 12px;
  letter-spacing: 0.3px;
}

.hero__city {
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 11px;
  background: rgba(206, 229, 255, 0.2);
  color: #cee5ff;
  border: 1px solid rgba(206, 229, 255, 0.3);
}

.hero p {
  margin-top: 2px;
  font-size: 12px;
  line-height: 16px;
  color: #d9e2ff;
}

.hero__active {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  white-space: nowrap;
  background: rgba(16, 185, 129, 0.2);
  color: #a7f3d0;
  border: 1px solid rgba(52, 211, 153, 0.3);
}

.hero__active i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.4;
  }
}

.hero__foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
}

.hero__access {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #d9e2ff;
}

.hero__access ion-icon,
.hero__foot a ion-icon {
  font-size: 14px;
}

.hero__foot a {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-weight: 500;
  color: #ffba38;
  text-decoration: none;
}

.search {
  position: relative;
}

.search ion-icon {
  position: absolute;
  left: 14px;
  top: 14px;
  color: #434652;
}

.search input {
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  padding: 0 16px 0 44px;
  font: inherit;
  font-size: 14px;
  color: #191c1e;
  background: #fff;
  border: 1px solid #c3c6d4;
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.search input::placeholder {
  color: rgba(67, 70, 82, 0.6);
}

.search input:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.filters {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px 0;
  scrollbar-width: none;
}

.filters::-webkit-scrollbar {
  display: none;
}

.filters button {
  flex: none;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  color: #434652;
  background: #fff;
  border: 1px solid #c3c6d4;
  transition: transform 0.15s;
}

.filters button:active {
  transform: scale(0.95);
}

.filters button.on {
  color: #fff;
  background: #003178;
  border-color: #003178;
}

.filters ion-icon {
  font-size: 14px;
}

.tone-blue {
  background: #d9e2ff;
  color: #003178;
}

.tone-sky {
  background: #cee5ff;
  color: #00639a;
}

.tone-amber {
  background: #fef3c7;
  color: #92400e;
}

.tone-green {
  background: #d1fae5;
  color: #065f46;
}

.tone-gray {
  background: #e6e8ea;
  color: #434652;
}

.tone-dim {
  background: #b0c6ff;
  color: #001945;
}

.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.sec-head--top {
  align-items: flex-start;
  margin: 0;
}

.sec-head h2 {
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.sec-head h2.lg {
  font-size: 16px;
  line-height: 24px;
}

.sec-head__year {
  font-size: 11px;
  font-weight: 600;
  color: #00639a;
}

.manage {
  font-size: 11px;
  font-weight: 700;
  color: #003178;
  text-decoration: none;
  white-space: nowrap;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border: 1px solid rgba(195, 198, 212, 0.6);
  border-radius: 12px;
}

.stat__ico {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
}

.stat__ico ion-icon {
  font-size: 22px;
}

.stat b {
  display: block;
  font-size: 20px;
  line-height: 1;
  font-weight: 700;
}

.stat span {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.create {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(206, 229, 255, 0.4);
  border: 1px solid rgba(0, 99, 154, 0.2);
}

.create__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.create__ico {
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #003178;
  color: #fff;
}

.create__ico ion-icon {
  font-size: 24px;
}

.create h3 {
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: #001d32;
}

.create p {
  font-size: 12px;
  line-height: 16px;
  color: #004a75;
}

.create__btn {
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: #003178;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s;
}

.create__btn:active {
  transform: scale(0.95);
}

.card {
  padding: 16px;
  background: #fff;
  border: 1px solid rgba(195, 198, 212, 0.7);
  border-radius: 16px;
}

.pill {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.pill--bold {
  padding: 4px 10px;
  font-weight: 700;
  white-space: nowrap;
}

.mini {
  display: flex;
  padding: 4px;
  border-radius: 8px;
  color: #434652;
}

.mini ion-icon {
  font-size: 18px;
}

.mini:active {
  color: #003178;
}

.mini--danger:active {
  color: #ba1a1a;
}

.track {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: #eceef0;
}

.track--thin {
  height: 6px;
  margin-top: 4px;
}

.track div {
  height: 100%;
  border-radius: 999px;
}

.c-pri {
  color: #003178;
}

.c-sec {
  color: #00639a;
}

.c-tert {
  color: #674600;
}

.bg-pri {
  background: #003178;
}

.bg-sec {
  background: #00639a;
}

.bg-tert {
  background: #ffba38;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(195, 198, 212, 0.4);
}

.card__file {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.card__file ion-icon {
  font-size: 16px;
}

.card__file.file ion-icon {
  color: #00639a;
}

.card__file.ok {
  color: #047857;
}

.more {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 500;
  color: #003178;
  background: #f2f4f6;
}

.more ion-icon {
  font-size: 14px;
}

.link {
  font-size: 11px;
  font-weight: 700;
  color: #00639a;
  text-align: right;
}

.sq {
  width: 32px;
  height: 32px;
  flex: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sq ion-icon {
  font-size: 18px;
}

.sq--amber {
  background: #ffdeac;
  color: #281900;
}

.sq--blue {
  background: #cee5ff;
  color: #001d32;
}

.count {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 222, 172, 0.4);
  color: #604100;
}

.jury {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: #f2f4f6;
  border: 1px solid rgba(195, 198, 212, 0.5);
}

.jury__title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
}

.done {
  flex: none;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  background: #d1fae5;
  color: #065f46;
}

.done ion-icon {
  font-size: 12px;
}

.jury__foot {
  padding-top: 8px;
  border-top: 1px solid rgba(195, 198, 212, 0.4);
}

.avatars {
  display: flex;
}

.avatars div {
  width: 28px;
  height: 28px;
  margin-left: -8px;
  border-radius: 50%;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
}

.avatars div:first-child {
  margin-left: 0;
}

.av-pri {
  background: #003178;
}

.av-sec {
  background: #00639a;
}

.av-tert {
  background: #674600;
}

.assign {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 11px;
  font-weight: 700;
  color: #003178;
}

.assign ion-icon {
  font-size: 14px;
}

.act {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.act ion-icon {
  font-size: 16px;
}

.act--soft {
  background: #d9e2ff;
  color: #001945;
}

.act--line {
  border: 1px solid #c3c6d4;
  color: #191c1e;
}

.tune {
  display: flex;
  padding: 6px;
  border-radius: 8px;
  color: #003178;
}

.tune ion-icon {
  font-size: 22px;
}

.crit {
  padding: 10px;
  border-radius: 12px;
  background: #f2f4f6;
}

.crit b {
  font-size: 12px;
  line-height: 16px;
}

.crit span {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.ann {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
}

.ann--solid {
  border: 1px solid rgba(195, 198, 212, 0.6);
}

.ann--dashed {
  border: 1px dashed #c3c6d4;
  background: rgba(242, 244, 246, 0.6);
}

.ann__ico {
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ann__text b {
  display: block;
  font-size: 12px;
  line-height: 16px;
}

.ann__text span {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
}

.release {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 0;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: #003178;
  transition: transform 0.15s;
}

.release:active {
  transform: scale(0.98);
}

.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  padding: 4px 16px env(safe-area-inset-bottom);
  background: #fff;
  border-top: 1px solid #c3c6d4;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.06);
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.tabs a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 10px;
  border-radius: 12px;
  color: #434652;
  cursor: pointer;
  transition: transform 0.15s;
}

.tabs a:active {
  transform: scale(0.95);
}

.tabs a.on {
  background: #0d47a1;
  color: #a1bbff;
}

.tabs ion-icon {
  font-size: 24px;
}

.tabs span {
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
}

.tabs a.on span {
  font-weight: 700;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(45, 49, 51, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 51;
  width: 288px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: calc(env(safe-area-inset-top, 0px) + 16px) 16px 16px;
  background: #f7f9fb;
  border-right: 1px solid #c3c6d4;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
  transform: translateX(-100%);
  transition: transform 0.2s ease-in-out;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.drawer.show {
  transform: translateX(0);
}

.drawer__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #c3c6d4;
}

.drawer__emblem {
  width: 48px;
  height: 48px;
  flex: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #0d47a1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.drawer__emblem ion-icon {
  font-size: 26px;
}

.drawer__who strong {
  display: block;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #003178;
}

.drawer__who span {
  display: block;
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
  color: #434652;
}

.drawer__who small {
  font-size: 11px;
  font-weight: 500;
  color: #737783;
}

.drawer__nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
}

.drawer__nav a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #434652;
  text-decoration: none;
  transition: background 0.15s;
}

.drawer__nav a:active {
  background: #e6e8ea;
}

.drawer__nav a.on {
  background: #cee5ff;
  color: #001d32;
}

.drawer__foot {
  padding-top: 16px;
  border-top: 1px solid #c3c6d4;
}

.drawer__ver {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 4px 16px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  color: #434652;
  background: #f2f4f6;
}

.drawer__ver b {
  font-weight: 600;
  color: #00639a;
}

.logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #ba1a1a;
}

.logout:active {
  background: #ffdad6;
}

</style>