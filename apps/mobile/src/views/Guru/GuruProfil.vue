<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Menu">
              <ion-icon :icon="menuOutline" />
            </button>

            <div class="brand__text">
              <strong>SIKARYA Dikda Sulut</strong>
              <span>SMP Negeri 1 Manado</span>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Notifikasi">
            <ion-icon :icon="notificationsOutline" />
            <i class="notification-dot"></i>
          </button>
        </header>

        <main class="main">

          <section class="page-title">
            <div>
              <h1>Profil Guru Pembimbing</h1>
              <p>Portal Pengesahan &amp; Portofolio Prestasi</p>
            </div>

            <button class="icon-btn" type="button" aria-label="Pengaturan">
              <ion-icon :icon="settingsOutline" />
            </button>
          </section>

          <!-- Kartu profil -->
          <section class="profile-card">
            <div class="profile-card__cover"></div>

            <div class="profile-card__body">
              <div class="avatar-wrap">
                <div class="avatar-lg">AF</div>
                <span class="avatar-badge"><ion-icon :icon="checkmarkCircle" /></span>
              </div>

              <h2>{{ guru.nama }}</h2>
              <p class="role">{{ guru.peran }}</p>

              <span class="status status-green">
                <i class="dot"></i>
                Pendidik Aktif Dapodik<br />2025/2026
              </span>

              <div class="school-row">
                <ion-icon :icon="schoolOutline" />
                <span>{{ guru.sekolah }}</span>
              </div>

              <dl class="id-rows">
                <div>
                  <dt>NUPTK</dt>
                  <dd>{{ guru.nuptk }}</dd>
                </div>
                <div>
                  <dt>NIP</dt>
                  <dd>{{ guru.nip }}</dd>
                </div>
              </dl>
            </div>
          </section>

          <!-- Statistik -->
          <section class="block">
            <div class="section-head">
              <h2><ion-icon :icon="statsChartOutline" /> Statistik Pembinaan Lomba</h2>
              <small>Tahun 2025/2026</small>
            </div>

            <div class="stats">
              <div v-for="s in statistik" :key="s.label" class="stat">
                <span class="stat__icon" :class="'tone-' + s.tone">
                  <ion-icon :icon="s.icon" />
                </span>

                <div>
                  <small>{{ s.label }}</small>
                  <strong>{{ s.nilai }} <span>{{ s.satuan }}</span></strong>
                </div>
              </div>
            </div>
          </section>

          <!-- SK & Legalitas -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="shieldCheckmarkOutline" /> SK &amp; Legalitas Pembimbing</h2>
              <span class="status status-green">Sah Cabdin</span>
            </div>

            <div class="doc">
              <div class="doc__top">
                <span class="doc__pdf">PDF</span>

                <div>
                  <strong>SK Kepala Sekolah Penetapan Pembimbing Lomba 2026</strong>
                  <small>No: 421.2/108/SMPN1-MND/I/2026 • PDF 1.8 MB</small>
                </div>
              </div>

              <div class="actions">
                <button type="button" class="btn-outline" @click="lihatSK">
                  <ion-icon :icon="eyeOutline" /> Lihat Dokumen
                </button>

                <button type="button" class="btn-validate" @click="unduhSK">
                  <ion-icon :icon="downloadOutline" /> Unduh
                </button>
              </div>
            </div>

            <div class="pakta">
              <ion-icon :icon="clipboardOutline" class="pakta__icon" />

              <div>
                <strong>Pakta Integritas Orisinalitas Karya</strong>
                <small>Terverifikasi Digital Sig • Aktif 2026</small>
              </div>

              <ion-icon :icon="checkmarkCircle" class="pakta__ok" />
            </div>

            <button type="button" class="link link--center" @click="perbaruiSK">
              <ion-icon :icon="cloudUploadOutline" />
              Perbarui Berkas SK Penugasan
            </button>
          </section>

          <!-- E-Sertifikat -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="ribbonOutline" /> E-Sertifikat Pembimbing Resmi Dispen</h2>
              <span class="verified-text">Tervalidasi</span>
            </div>

            <div class="cert-list">
              <div v-for="c in sertifikat" :key="c.judul" class="cert">
                <span class="cert__icon" :class="'tone-' + c.tone">
                  <ion-icon :icon="c.icon" />
                </span>

                <div class="cert__text">
                  <strong>{{ c.judul }}</strong>
                  <small>{{ c.penerbit }}</small>
                </div>

                <button type="button" class="cert__dl" aria-label="Unduh sertifikat" @click="unduhSertifikat(c)">
                  <ion-icon :icon="downloadOutline" />
                </button>
              </div>
            </div>

            <button type="button" class="link link--center" @click="semuaSertifikat">
              Lihat Semua Sertifikat (4)
              <ion-icon :icon="arrowForwardOutline" />
            </button>
          </section>

          <!-- Manajemen akun -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="personCircleOutline" /> Manajemen Akun &amp; Pengaturan Sistem</h2>
            </div>

            <ul class="menu">
              <li>
                <button type="button" class="menu__item" @click="editKontak">
                  <ion-icon :icon="idCardOutline" class="menu__icon" />
                  <span class="menu__text">
                    <strong>Informasi Kontak Dapodik <em>Edit</em></strong>
                    <small>{{ guru.email }}</small>
                    <small>{{ guru.telepon }} (WhatsApp Aktif)</small>
                  </span>
                  <ion-icon :icon="chevronForward" class="menu__go" />
                </button>
              </li>

              <li>
                <div class="menu__item">
                  <ion-icon :icon="notificationsOutline" class="menu__icon" />
                  <span class="menu__text">
                    <strong>Notifikasi WhatsApp &amp; Email</strong>
                    <small>Status revisi karya siswa &amp; info juri berkala</small>
                  </span>

                  <button
                    type="button"
                    class="switch"
                    :class="{ 'switch--on': notifikasi }"
                    role="switch"
                    :aria-checked="notifikasi"
                    aria-label="Notifikasi WhatsApp dan Email"
                    @click="notifikasi = !notifikasi"
                  >
                    <i></i>
                  </button>
                </div>
              </li>

              <li>
                <button type="button" class="menu__item" @click="keamanan">
                  <ion-icon :icon="lockClosedOutline" class="menu__icon" />
                  <span class="menu__text">
                    <strong>Keamanan &amp; Kata Sandi</strong>
                    <small>Ubah Password &amp; Autentikasi 2 Langkah</small>
                  </span>
                  <ion-icon :icon="chevronForward" class="menu__go" />
                </button>
              </li>

              <li>
                <button type="button" class="menu__item" @click="bantuan">
                  <ion-icon :icon="headsetOutline" class="menu__icon" />
                  <span class="menu__text">
                    <strong>Pusat Bantuan &amp; Hotline Cabdin</strong>
                    <small>Helpdesk Teknis Dinas Pendidikan Sulut</small>
                  </span>
                  <ion-icon :icon="chevronForward" class="menu__go" />
                </button>
              </li>

              <li>
                <button type="button" class="menu__item" @click="panduan">
                  <ion-icon :icon="bookOutline" class="menu__icon" />
                  <span class="menu__text">
                    <strong>Panduan Guru (Buku Saku PDF)</strong>
                    <small>Standar Kurasi &amp; Penilaian Mandiri</small>
                  </span>
                  <ion-icon :icon="openOutline" class="menu__go" />
                </button>
              </li>
            </ul>
          </section>

          <section class="data-center">
            <ion-icon :icon="shieldOutline" class="data-center__icon" />

            <p>
              Data sesi terisolasi khusus unit kerja <strong>SMP Negeri 1 Manado</strong>.
              Seluruh aktivitas kurasi dan unggahan karya tercatat dalam audit trail sistem
              kedinasan.
            </p>
          </section>

          <button type="button" class="btn-logout" @click="keluar">
            <ion-icon :icon="logOutOutline" />
            Keluar dari Portal Guru
          </button>

          <footer class="foot">
            <span>SIKARYA Dikda Sulut Mobile v2.4.1</span>
            <small>Pemerintah Provinsi Sulawesi Utara © 2026</small>
          </footer>

        </main>
      </div>
    </ion-content>

    <GuruTabBar active="/guru/profil" />
  </ion-page>
</template>


<script setup lang="ts">

import { ref } from 'vue';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  menuOutline,
  notificationsOutline,
  settingsOutline,
  checkmarkCircle,
  schoolOutline,
  statsChartOutline,
  peopleOutline,
  layersOutline,
  trophyOutline,
  medalOutline,
  shieldCheckmarkOutline,
  eyeOutline,
  downloadOutline,
  clipboardOutline,
  cloudUploadOutline,
  ribbonOutline,
  arrowForwardOutline,
  personCircleOutline,
  idCardOutline,
  lockClosedOutline,
  headsetOutline,
  bookOutline,
  chevronForward,
  openOutline,
  shieldOutline,
  logOutOutline
} from 'ionicons/icons';

// Sesuaikan path dengan lokasi GuruTabBar di proyek Anda
import GuruTabBar from './GuruTabBar.vue';

const guru = {
  nama: 'Ahmad Fauzi, S.Pd.',
  peran: 'Guru Pembimbing Kontingen • Pembina OSIS & TIK',
  sekolah: 'SMP Negeri 1 Manado • Cabdin Wilayah Manado-Tomohon',
  nuptk: '198204152008011009',
  nip: '19820415 2008011 009',
  email: 'ahmad.fauzi@guru.smp.belajar.id',
  telepon: '+62 812-3456-7890'
};

const statistik = [
  { label: 'Total Bimbingan', nilai: 120, satuan: 'Siswa', icon: peopleOutline, tone: 'blue' },
  { label: 'Karya Dikurasi', nilai: 35, satuan: 'Karya', icon: layersOutline, tone: 'blue' },
  { label: 'Siswa Juara', nilai: 12, satuan: 'Prestasi', icon: trophyOutline, tone: 'amber' },
  { label: 'Sertifikat Resmi', nilai: 4, satuan: 'Berkas', icon: medalOutline, tone: 'blue' }
];

const sertifikat = [
  {
    judul: 'Pembimbing Terbaik FLS2N Kategori Sinematografi 2025',
    penerbit: 'Dinas Pendidikan Daerah Prov. Sulawesi Utara',
    icon: ribbonOutline,
    tone: 'amber'
  },
  {
    judul: 'Sertifikat Bimtek Kurasi Karya Inovasi & Budaya 2026',
    penerbit: 'Balai Penjaminan Mutu Pendidikan (BPMP)',
    icon: schoolOutline,
    tone: 'blue'
  }
];

const notifikasi = ref(true);

function lihatSK() { console.log('lihat SK'); }
function unduhSK() { console.log('unduh SK'); }
function perbaruiSK() { console.log('perbarui SK'); }
function unduhSertifikat(c: { judul: string }) { console.log('unduh', c.judul); }
function semuaSertifikat() { console.log('semua sertifikat'); }
function editKontak() { console.log('edit kontak'); }
function keamanan() { console.log('keamanan'); }
function bantuan() { console.log('bantuan'); }
function panduan() { console.log('panduan'); }

function keluar() {
  // TODO: hapus sesi login lalu arahkan ke halaman login
  console.log('keluar');
}

</script>


<style scoped>

.peserta-content {
  --background: #f7f9fb;
}

.page {
  min-height: 100%;
  background: #f7f9fb;
  color: #191c1e;
  font-family:
    'Plus Jakarta Sans',
    system-ui,
    sans-serif;
}

ion-icon {
  flex: none;
  font-size: 20px;
}

button {
  border: 0;
  background: none;
  padding: 0;
  font-family: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
}

h1,
h2,
h3,
p,
dl,
dd,
ul {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
}

em {
  font-style: normal;
}

small {
  display: block;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding:
    calc(env(safe-area-inset-top, 0px) + 8px)
    12px
    8px;

  background: #fff;
  border-bottom: 1px solid #d7dbe5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}

.brand {
  display: flex;
  align-items: center;
  gap: 6px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 15px;
  line-height: 19px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10px;
  color: #606572;
}

.icon-btn {
  position: relative;
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 22px;
}

.notification-dot {
  position: absolute;
  top: 5px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ba1a1a;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 12px 24px;
}

.page-title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.page-title h1 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
  color: #003178;
}

.page-title p {
  margin-top: 1px;
  font-size: 11px;
  color: #606572;
}

/* ---------- Status ---------- */

.dot {
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a34a;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
}

.status-green {
  background: #e2f7ec;
  color: #087443;
}

/* ---------- Kartu profil ---------- */

.profile-card {
  overflow: hidden;
  border-radius: 15px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.profile-card__cover {
  height: 62px;
  background:
    linear-gradient(
      160deg,
      #1a63c4 0%,
      #4aa3e8 100%
    );
}

.profile-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px 14px;
  text-align: center;
}

.avatar-wrap {
  position: relative;
  margin-top: -40px;
}

.avatar-lg {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #dce7ff;
  color: #003178;
  font-size: 24px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .12);
}

.avatar-badge {
  position: absolute;
  right: -2px;
  bottom: 2px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  color: #003f91;
}

.avatar-badge ion-icon {
  font-size: 22px;
}

.profile-card h2 {
  margin-top: 8px;
  font-size: 17px;
  font-weight: 800;
}

.role {
  margin-top: 3px;
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  color: #00639a;
}

.profile-card .status {
  margin-top: 10px;
  text-align: center;
  background: #f1f4f2;
  border: 1px solid #d5ddd8;
  color: #087443;
}

.school-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 9px 10px;
  border-radius: 9px;
  background: #f0f2f5;
  border: 1px solid #e3e6ec;
  font-size: 11px;
  line-height: 16px;
  color: #343842;
  text-align: left;
}

.school-row ion-icon {
  color: #003178;
}

.id-rows {
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.id-rows > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e3e6ec;
  background: #fff;
  font-size: 10px;
}

.id-rows dt {
  color: #606572;
}

.id-rows dd {
  font-weight: 800;
  letter-spacing: .2px;
}

/* ---------- Statistik ---------- */

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.section-head h2,
.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 17px;
  font-weight: 800;
}

.section-head h2 ion-icon,
.panel__head h2 ion-icon {
  font-size: 17px;
  color: #003178;
}

.section-head small {
  font-size: 10px;
  color: #606572;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-radius: 13px;
  background: #fff;
  border: 1px solid #dfe2e8;
}

.stat__icon,
.cert__icon {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.tone-blue {
  background: #dce7ff;
  color: #003f91;
}

.tone-amber {
  background: #ffe1b3;
  color: #9a5b00;
}

.stat small {
  font-size: 10px;
  color: #606572;
}

.stat strong {
  font-size: 22px;
  line-height: 26px;
  font-weight: 800;
}

.stat strong span {
  font-size: 11px;
  font-weight: 500;
  color: #606572;
}

/* ---------- Panel ---------- */

.panel {
  padding: 12px;
  border-radius: 13px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.verified-text {
  flex: none;
  font-size: 10px;
  font-weight: 700;
  color: #0b4fa6;
}

/* SK */

.doc {
  margin-top: 12px;
  padding: 10px;
  border-radius: 10px;
  background: #f0f2f5;
  border: 1px solid #e3e6ec;
}

.doc__top {
  display: flex;
  gap: 10px;
}

.doc__pdf {
  width: 34px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #f0c4c4;
  color: #ba1a1a;
  font-size: 9px;
  font-weight: 800;
}

.doc__top strong {
  display: block;
  font-size: 12px;
  line-height: 17px;
}

.doc__top small {
  margin-top: 2px;
  font-size: 9px;
  color: #606572;
}

.actions {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 8px;
  margin-top: 10px;
}

.actions button {
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
}

.actions ion-icon {
  font-size: 15px;
}

.btn-outline {
  border: 1px solid #c3c9d6;
  background: #fff;
  color: #003f91;
}

.btn-validate {
  background: #003f91;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 49, 120, .18);
}

.pakta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #f0f2f5;
  border: 1px solid #e3e6ec;
}

.pakta > div {
  flex: 1;
}

.pakta strong {
  display: block;
  font-size: 12px;
}

.pakta small {
  margin-top: 2px;
  font-size: 9px;
  color: #606572;
}

.pakta__icon {
  color: #003f91;
}

.pakta__ok {
  font-size: 22px;
  color: #16a34a;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #003f91;
  font-size: 11px;
  font-weight: 700;
}

.link--center {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
}

.link ion-icon {
  font-size: 15px;
}

/* Sertifikat */

.cert-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.cert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: #f0f2f5;
  border: 1px solid #e3e6ec;
}

.cert__text {
  flex: 1;
  min-width: 0;
}

.cert__text strong {
  display: block;
  font-size: 12px;
  line-height: 17px;
}

.cert__text small {
  margin-top: 2px;
  font-size: 9px;
  line-height: 13px;
  color: #606572;
}

.cert__dl {
  display: flex;
  padding: 6px;
  color: #003f91;
}

/* ---------- Menu akun ---------- */

.menu {
  margin-top: 6px;
}

.menu li + li {
  border-top: 1px solid #eceef2;
}

.menu__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 0;
}

.menu__icon {
  color: #3d4452;
}

.menu__text {
  flex: 1;
  min-width: 0;
}

.menu__text strong {
  display: block;
  font-size: 12px;
  line-height: 17px;
}

.menu__text strong em {
  margin-left: 6px;
  font-size: 10px;
  font-weight: 700;
  color: #00639a;
}

.menu__text small {
  margin-top: 1px;
  font-size: 10px;
  line-height: 14px;
  color: #606572;
}

.menu__go {
  font-size: 18px;
  color: #747985;
}

/* Switch */

.switch {
  position: relative;
  flex: none;
  width: 46px;
  height: 26px;
  border-radius: 13px;
  background: #c3c9d6;
  transition: background .2s;
}

.switch i {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
  transition: transform .2s;
}

.switch--on {
  background: #003f91;
}

.switch--on i {
  transform: translateX(20px);
}

.switch:focus-visible,
.menu__item:focus-visible,
.btn-logout:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Catatan & keluar ---------- */

.data-center {
  display: flex;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #eceff3;
  border: 1px solid #dfe2e8;
}

.data-center__icon {
  margin-top: 1px;
  color: #003178;
}

.data-center p {
  font-size: 10px;
  line-height: 16px;
  color: #50545d;
}

.btn-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 46px;
  border-radius: 11px;
  background: #fdeeee;
  border: 1px solid #e7b4b4;
  color: #ba1a1a;
  font-size: 12px;
  font-weight: 700;
}

.foot {
  text-align: center;
  font-size: 10px;
  color: #747985;
}

.foot small {
  margin-top: 2px;
  color: #00639a;
}

</style>