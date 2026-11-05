<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <div class="brand__logo">
              <ion-icon :icon="shieldCheckmarkOutline" />
            </div>

            <div class="brand__text">
              <strong>TTE BSEr Terhubung Aktif</strong>
              <span>
                <i class="dot"></i>
                Sistem Kurasi Talenta Kota Manado
              </span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button">
              <ion-icon :icon="notificationsOutline" />
              <i class="notification-badge">24</i>
            </button>

            <button class="profile" type="button">
              SU
            </button>
          </div>
        </header>


        <main class="main">

          <section class="hero">
            <div class="hero__top">
              <div>
                <div class="hero__tag">
                  Sistem Kurasi Talenta Kota Manado
                </div>

                <span class="hero__year">
                  TPK 2025
                </span>
              </div>
            </div>

            <h1>
              Manajemen Peserta &<br />
              Validasi Prestasi
            </h1>

            <div class="hero__stats">

              <div class="hero-stat">
                <span>Menunggu</span>
                <strong>24</strong>
              </div>

              <div class="hero-stat">
                <span>Tervalidasi</span>
                <strong>382</strong>
              </div>

              <div class="hero-stat">
                <span>E-Sertifikat</span>
                <strong>116</strong>
              </div>

            </div>
          </section>

          <section class="search-section">
            <div class="search">
              <ion-icon :icon="searchOutline" />
              <input
                v-model="query"
                type="text"
                placeholder="Cari NISN, nama peserta, atau sekolah..."
              />
              <button type="button" class="filter-btn">
                <ion-icon :icon="optionsOutline" />
              </button>
            </div>
          </section>

          <section class="content-tabs">
            <button
              type="button"
              :class="{ active: activeTab === 'validasi' }"
              @click="activeTab = 'validasi'"
            >
              <ion-icon :icon="checkmarkCircleOutline" />
              Validasi Prestasi
              <span>24</span>
            </button>
            <button
              type="button"
              :class="{ active: activeTab === 'kurasi' }"
              @click="activeTab = 'kurasi'"
            >
              <ion-icon :icon="ribbonOutline" />
              Kurasi Talenta
            </button>
            <button type="button" class="small-tab">
              <ion-icon :icon="optionsOutline" />
            </button>
          </section>

          <template v-if="activeTab === 'validasi'">
            <section class="top-talenta">
              <div class="talenta-head">
                <div>
                  <span class="medal">
                    <ion-icon :icon="trophyOutline" />
                  </span>

                  <div>
                    <strong>
                      Top 10 Talenta Seni & Sains Kota Manado
                    </strong>

                    <small>
                      100% tervalidasi
                    </small>
                  </div>
                </div>

                <span class="national">
                  Seleksi<br />
                  Nasional
                </span>
              </div>


              <div class="talenta-item">
                <div class="rank">
                  #1
                </div>
                <div class="talenta-person">
                  <strong>Álvaro G. Rumambi</strong>
                  <span>
                    SMAN 9 Binsus Manado • Robotika Maritim
                  </span>
                </div>
                <div class="score">
                  <strong>98.4</strong>
                  <small>/100</small>
                </div>
              </div>
            </section>

            <section class="queue-section">
              <div class="section-head">
                <div>
                  <h2>Daftar Antrean Validasi</h2>
                  <span class="waiting">
                    24 Menunggu
                  </span>
                </div>

                <button type="button">
                  Lihat Semua →
                </button>
              </div>

              <article
                v-for="peserta in pesertaList"
                :key="peserta.nama"
                class="participant-card"
              >

                <div class="participant-head">

                  <div class="person-info">

                    <div
                      class="avatar"
                      :class="peserta.avatarTone"
                    >
                      {{ peserta.initial }}
                    </div>

                    <div>
                      <strong>{{ peserta.nama }}</strong>

                      <span>
                        {{ peserta.asal }}
                      </span>

                      <small class="verified">
                        <ion-icon :icon="checkmarkCircleOutline" />
                        Dapodik Terverifikasi
                      </small>

                      <small class="nisn">
                        NISN: {{ peserta.nisn }}
                      </small>
                    </div>

                  </div>

                  <span
                    class="status"
                    :class="peserta.statusTone"
                  >
                    {{ peserta.status }}
                  </span>

                </div>

                <div class="achievement">
                  <div class="achievement-head">
                    <div>
                      <strong>{{ peserta.lomba }}</strong>
                      <span>
                        {{ peserta.waktu }}
                      </span>
                    </div>
                  </div>

                  <p>
                    "{{ peserta.judul }}"
                  </p>

                  <div class="files">
                    <div
                      v-for="file in peserta.files"
                      :key="file.nama"
                      class="file"
                    >
                      <ion-icon :icon="file.icon" />

                      <span>
                        {{ file.nama }}
                      </span>

                      <small>
                        {{ file.size }}
                      </small>
                    </div>
                  </div>
                </div>

                <div class="tte-status">
                  <span>
                    <ion-icon :icon="documentTextOutline" />
                    TTE BSEr
                  </span>

                  <strong>
                    <ion-icon :icon="checkmarkCircleOutline" />
                    Siap
                  </strong>
                </div>

                <div class="actions">

                  <button
                    type="button"
                    class="btn-reject"
                  >
                    <ion-icon :icon="closeCircleOutline" />
                    Minta Revisi / Tolak
                  </button>

                  <button
                    type="button"
                    class="btn-validate"
                  >
                    <ion-icon :icon="checkmarkCircleOutline" />
                    Validasi & Sahkan TTE
                  </button>
                </div>
              </article>

              <article class="participant-card validated-card">
                <div class="participant-head">
                  <div class="person-info">
                    <div class="avatar avatar-yellow">CS</div>
                    <div>
                      <strong>Clarissa</strong>
                      <span>
                        SMAN 1 Manado
                      </span>

                      <small class="verified">
                        <ion-icon :icon="checkmarkCircleOutline" />
                        Dapodik Terverifikasi
                      </small>
                    </div>
                  </div>

                  <span class="status status-success">
                    Tervalidasi
                    <br />
                    (E-Sertifikat Terbit)
                  </span>
                </div>

                <div class="achievement">
                  <div class="achievement-title">
                    FLS2N Solo Vocal Putri Kota Manado 2025
                  </div>

                  <p>
                    "Lagu Wajib Daerah: O Ina Ni Keke"
                    & Vokal Klasik Nusantara"
                  </p>

                </div>


                <div class="archive-info">
                  <span>
                    Diarsipkan di SIM-Prestasi Sulut
                  </span>

                  <button type="button">
                    <ion-icon :icon="downloadOutline" />
                    Unduh E-Sertifikat
                  </button>
                </div>
              </article>

            </section>
            <section class="data-center">
              <div class="data-icon">
                <ion-icon :icon="serverOutline" />
              </div>

              <div>
                <strong>
                  Pusat Data Integrasi Prestasi
                </strong>

                <p>
                  Arsip portofolio siswa terprestasi
                  dan dapat diverifikasi melalui
                  sistem pusat pendidikan.
                </p>
              </div>
            </section>

            <button
              type="button"
              class="mass-validation"
            >
              <ion-icon :icon="checkmarkCircleOutline" />
              Validasi Massal
            </button>
          </template>

          <template v-else>
            <section class="kurasi-empty">
              <div class="kurasi-icon">
                <ion-icon :icon="ribbonOutline" />
              </div>

              <h2>
                Kurasi Talenta Daerah
              </h2>

              <p>
                Kelola dan pilih peserta berprestasi
                untuk masuk dalam daftar talenta
                unggulan Kota Manado.
              </p>

              <button type="button">
                Mulai Kurasi Talenta
                <ion-icon :icon="arrowForwardOutline" />
              </button>
            </section>
          </template>
        </main>
      </div>
    </ion-content>

    <AdminTabBar></AdminTabBar>
  </ion-page>
</template>


<script setup lang="ts">

import { ref } from 'vue';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import { shieldCheckmarkOutline, notificationsOutline, searchOutline, optionsOutline, checkmarkCircleOutline, ribbonOutline, trophyOutline, documentTextOutline, closeCircleOutline, downloadOutline, serverOutline, arrowForwardOutline, fileTrayFullOutline } from 'ionicons/icons';


import AdminTabBar from './AdminTabBar.vue';
const query = ref('');
const activeTab = ref<'validasi' | 'kurasi'>('validasi');

const pesertaList = [
  {
    initial: 'KW',
    avatarTone: 'avatar-purple',
    nama: 'Kezia Wenas',
    asal: 'SMK N 1 Manado',
    nisn: '0064829104',
    status: 'Menunggu Validasi',
    statusTone: 'status-warning',
    lomba: 'Lomba Cipta Animasi Budaya Manado',
    waktu: 'Diajukan: 2 jam lalu',
    judul:
      'Eksplorasi Legenda Waraney dalam Animasi 3D Sinematik',

    files: [

      {
        nama: 'Video Karya (MP4, 4K)',
        size: '184 MB',
        icon: fileTrayFullOutline
      },

      {
        nama: 'Proposal & Naskah',
        size: '2 MB',
        icon: documentTextOutline
      }

    ]

  },


  {
    initial: 'JM',
    avatarTone: 'avatar-blue',

    nama: 'Jonathan Mandey',

    asal: 'SMK N 2 Manado',

    nisn: '0064829152',

    status: 'Menunggu Validasi',
    statusTone: 'status-warning',

    lomba:
      'Karya Ilmiah Remaja (KIR) – Konservasi Pesisir Teluk Manado',

    waktu: 'Diajukan: Kemarin',

    judul:
      'Pemanfaatan Potensi Panas Bumi Danau Linow untuk Ketahanan Energi Desa',

    files: [

      {
        nama: 'Jurnal_Lengkap_Final.pdf',
        size: '12 MB',
        icon: documentTextOutline
      },

      {
        nama: 'Lembar Pengesahan',
        size: '1 MB',
        icon: documentTextOutline
      }

    ]

  }

];

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
}

h1,
h2,
h3,
p {
  margin: 0;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding:
    calc(env(safe-area-inset-top, 0px) + 8px)
    16px
    8px;

  background: #fff;

  border-bottom: 1px solid #d7dbe5;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, .05);
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
}

.brand__logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dce7ff;
  color: #003178;
}

.brand__logo ion-icon {
  font-size: 20px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 12px;
  line-height: 16px;
  color: #191c1e;
}

.brand__text span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  color: #606572;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #16a34a;
}

.bar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  position: relative;
  display: flex;
  padding: 5px;
  color: #4b5060;
}

.icon-btn ion-icon {
  font-size: 22px;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #ba1a1a;
  color: #fff;
  font-size: 7px;
  font-style: normal;
  font-weight: 700;
}

.profile {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dce7ff;
  color: #003178;
  font-size: 10px;
  font-weight: 700;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding:
    12px
    12px
    24px;
}

.hero {
  position: relative;
  overflow: hidden;
  min-height: 174px;
  padding: 14px;
  border-radius: 15px;
  background:
    linear-gradient(
      145deg,
      #00408c 0%,
      #0052a5 50%,
      #00699b 100%
    );

  color: #fff;
  box-shadow:
    0 2px 6px rgba(0, 49, 120, .15);
}

.hero::after {
  content: '';
  position: absolute;
  right: -50px;
  bottom: -70px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background:
    rgba(255, 255, 255, .06);
}

.hero__top {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

.hero__tag {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 20px;
  background:
    rgba(255, 255, 255, .16);

  border:
    1px solid
    rgba(255, 255, 255, .2);

  font-size: 9px;
  color: #e0ebff;
}

.hero__year {
  position: absolute;
  right: 0;
  top: 3px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
}

.hero h1 {
  position: relative;
  z-index: 2;
  margin-top: 15px;
  font-size: 21px;
  line-height: 25px;
  font-weight: 800;
  letter-spacing: -.4px;
}

.hero__stats {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);

  gap: 5px;
}

.hero-stat {
  padding: 7px 5px;
  text-align: center;
  border-radius: 7px;
  background:
    rgba(255, 255, 255, .12);
}

.hero-stat span {
  display: block;
  font-size: 8px;
  color: #dbe9ff;
}

.hero-stat strong {
  display: block;
  margin-top: 1px;
  font-size: 15px;
  line-height: 17px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search > ion-icon {
  position: absolute;
  left: 12px;
  color: #6c7280;
  font-size: 17px;
}

.search input {
  width: 100%;
  height: 43px;
  box-sizing: border-box;
  padding: 0 42px 0 38px;
  border: 1px solid #d1d5df;
  border-radius: 11px;
  background: #fff;
  outline: none;
  font-family: inherit;
  font-size: 11px;
  color: #191c1e;
}

.search input::placeholder {
  color: #858a95;
}

.search input:focus {
  border-color: #00639a;
  box-shadow:
    0 0 0 1px #00639a;
}

.filter-btn {
  position: absolute;
  right: 8px;
  display: flex;
  padding: 5px;
  color: #565c69;
}

.filter-btn ion-icon {
  font-size: 17px;
}

.content-tabs {
  display: flex;
  align-items: center;
  gap: 7px;
  overflow-x: auto;
  scrollbar-width: none;
}

.content-tabs::-webkit-scrollbar {
  display: none;
}

.content-tabs button {
  flex: none;
  height: 34px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 11px;
  border: 1px solid #d4d8e2;
  border-radius: 8px;
  background: #fff;
  color: #5b606c;
  font-size: 10px;
  font-weight: 600;
}


.content-tabs button.active {
  background: #003f91;
  border-color: #003f91;
  color: #fff;
}

.content-tabs button span {
  padding: 2px 5px;
  border-radius: 10px;
  background: rgba(255,255,255,.2);
  font-size: 8px;
}

.content-tabs button:not(.active) span {
  background: #eef0f4;
}

.content-tabs ion-icon {
  font-size: 14px;
}

.content-tabs .small-tab {
  width: 35px;
  justify-content: center;
  padding: 0;
}

.top-talenta {
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(  135deg, #fffaf0, #fffdf8 );
  border: 1px solid #f3dfab;
}

.talenta-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.talenta-head > div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.medal {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff0c7;
  color: #d28700;
}

.medal ion-icon {
  font-size: 15px;
}

.talenta-head strong {
  display: block;
  font-size: 10px;
  line-height: 13px;
}

.talenta-head small {
  display: block;
  margin-top: 2px;
  font-size: 8px;
  color: #777;
}

.national {
  padding: 5px 7px;
  border-radius: 7px;
  background: #fff0c7;
  color: #765500;
  text-align: center;
  font-size: 7px;
  font-weight: 700;
}

.talenta-item {
  display: flex;
  align-items: center;
  margin-top: 9px;
  padding: 9px;
  border-radius: 9px;
  background: #fff;
}

.rank {
  width: 28px;
  font-size: 9px;
  font-weight: 800;
  color: #a87400;
}

.talenta-person {
  flex: 1;
}

.talenta-person strong {
  display: block;
  font-size: 10px;
}

.talenta-person span {
  display: block;
  margin-top: 2px;
  font-size: 8px;
  color: #777;
}

.score strong {
  color: #003f91;
  font-size: 13px;
}

.score small {
  font-size: 8px;
  color: #777;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
}

.section-head > div {
  display: flex;
  align-items: center;
  gap: 5px;
}

.section-head h2 {
  font-size: 12px;
  line-height: 18px;
}

.waiting {
  padding: 3px 6px;
  border-radius: 10px;
  background: #fff0c7;
  color: #806000;
  font-size: 7px;
  font-weight: 700;
}

.section-head button {
  color: #00639a;
  font-size: 9px;
  font-weight: 700;
}

.queue-section {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.participant-card {
  padding: 10px;
  border-radius: 13px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}

.participant-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
}

.person-info {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.avatar {
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 700;
}

.avatar-purple {
  background: #e6ddff;
  color: #57319c;
}

.avatar-blue {
  background: #dbeaff;
  color: #18519d;
}

.avatar-yellow {
  background: #ffedc2;
  color: #956400;
}

.person-info strong {
  display: block;
  font-size: 10px;
  line-height: 13px;
}

.person-info > div > span {
  display: block;
  font-size: 8px;
  color: #747985;
}

.verified {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-top: 2px;
  padding: 2px 4px;
  border-radius: 4px;
  background: #e2f7ec;
  color: #087443;
  font-size: 7px;
}

.verified ion-icon {
  font-size: 9px;
}

.nisn {
  display: block;
  margin-top: 1px;
  font-size: 7px;
  color: #777;
}

.status {
  flex: none;
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 7px;
  font-weight: 600;
  text-align: center;
}

.status-warning {
  background: #fff6d7;
  color: #866400;
}

.status-success {
  background: #e2f7ec;
  color: #087443;
}

.achievement {
  margin-top: 9px;
  padding: 9px;
  border-radius: 9px;
  background: #f6f7f9;
}

.achievement-head {
  display: flex;
  justify-content: space-between;
}

.achievement-head strong {
  display: block;
  font-size: 9px;
  line-height: 13px;
  color: #343842;
}

.achievement-head span {
  display: block;
  margin-top: 1px;
  font-size: 7px;
  color: #888;
}

.achievement p {
  margin-top: 7px;
  font-size: 8px;
  line-height: 12px;
  font-style: italic;
  color: #50545d;
}

.files {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 7px;
}

.file {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 6px;
  border: 1px solid #dfe2e8;
  border-radius: 6px;
  background: #fff;
}

.file ion-icon {
  font-size: 12px;
  color: #3473ad;
}

.file span {
  flex: 1;
  font-size: 7px;
  color: #444;
}

.file small {
  font-size: 7px;
  color: #888;
}

.tte-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 7px 9px;
  border-radius: 7px;
  background: #f0f8ff;
}

.tte-status span {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 8px;
  color: #00639a;
}

.tte-status span ion-icon {
  font-size: 12px;
}

.tte-status strong {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 8px;
  color: #07844a;
}

.tte-status strong ion-icon {
  font-size: 11px;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 6px;
  margin-top: 8px;
}

.actions button {
  min-height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 9px;
  font-size: 8px;
  font-weight: 700;
}

.actions ion-icon {
  font-size: 12px;
}

.btn-reject {
  border: 1px solid #e0b9b9;
  color: #a33d3d;
  background: #fff;
}

.btn-validate {
  background: #003f91;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0,49,120,.18);
}

.validated-card {
  margin-top: 0;
}

.validated-card .achievement {
  margin-top: 10px;
}

.achievement-title {
  font-size: 8px;
  font-weight: 700;
  color: #4e535e;
}

.archive-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin-top: 8px;
}

.archive-info span {
  font-size: 7px;
  color: #858995;
}

.archive-info button {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 6px 8px;
  border-radius: 7px;
  background: #ffdf9e;
  color: #5d4300;
  font-size: 7px;
  font-weight: 700;
}

.archive-info ion-icon {
  font-size: 11px;
}

.data-center {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #dfe2e8;
}

.data-icon {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #e1edff;
  color: #00639a;
}

.data-icon ion-icon {
  font-size: 18px;
}

.data-center strong {
  display: block;

  font-size: 9px;
}

.data-center p {
  margin-top: 2px;
  font-size: 7px;
  line-height: 10px;
  color: #777;
}

.mass-validation {
  position: fixed;
  right: 14px;
  bottom: 85px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 11px 14px;
  border-radius: 22px;
  background: #003f91;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0,0,0,.2);
  font-size: 9px;
  font-weight: 700;
}

.mass-validation ion-icon {
  font-size: 14px;
}

.kurasi-empty {
  padding: 35px 20px;
  text-align: center;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
}

.kurasi-icon {
  width: 55px;
  height: 55px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: #dce8ff;
  color: #003f91;
}

.kurasi-icon ion-icon {
  font-size: 27px;
}

.kurasi-empty h2 {
  font-size: 15px;
}

.kurasi-empty p {
  margin-top: 7px;
  font-size: 10px;
  line-height: 15px;
  color: #707581;
}

.kurasi-empty button {
  margin-top: 15px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 9px 13px;
  border-radius: 9px;
  background: #003f91;
  color: #fff;
  font-size: 9px;
  font-weight: 700;
}

.kurasi-empty button ion-icon {
  font-size: 13px;
}

</style>