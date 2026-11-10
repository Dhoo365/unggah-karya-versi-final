<template>
  <ion-page>
    <ion-content :fullscreen="true" class="siswa-content">
      <div class="siswa">
        <header class="topbar">
          <button class="topbar__btn" type="button" aria-label="Kembali" @click="router.back()">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="topbar__text">
            <h1 class="topbar__title">Data Siswa SMPN 1 Manado</h1>
            <p class="topbar__subtitle">SIKARYA Dikda Sulut</p>
          </div>
          <div class="topbar__actions">
            <button class="topbar__btn" type="button" aria-label="Cari"><ion-icon :icon="searchOutline" /></button>
            <button class="topbar__btn" type="button" aria-label="Notifikasi"><ion-icon :icon="notificationsOutline" /></button>
          </div>
        </header>

        <div class="body">
          <!-- Info isolasi data -->
          <section class="notice">
            <div class="notice__icon"><ion-icon :icon="shieldCheckmarkOutline" /></div>
            <div>
              <b class="notice__title">Data Terisolasi: Khusus SMP Negeri 1 Manado</b>
              <p class="notice__text">
                Portal audit resmi Guru Pembimbing. Hak akses hanya menampilkan riwayat portofolio &amp; peserta terdaftar unit
                sekolah Anda.
              </p>
            </div>
          </section>

          <!-- Pencarian & filter -->
          <div class="search">
            <ion-icon class="search__icon" :icon="searchOutline" />
            <input v-model="query" class="search__input" type="text" placeholder="Cari nama atau NISN siswa..." />
            <button v-if="query" class="search__clear" type="button" aria-label="Hapus" @click="query = ''">
              <ion-icon :icon="closeCircle" />
            </button>
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

          <!-- Daftar siswa -->
          <div class="section-head">
            <h2 class="section-head__title">Daftar Siswa Bimbingan</h2>
            <small class="section-head__note">Menampilkan 4 dari 120</small>
          </div>

          <article v-for="s in siswa" :key="s.nisn" class="student" :class="{ 'student--focus': s.focus }">
            <span v-if="s.focus" class="student__flag"><ion-icon :icon="createOutline" /> Fokus Edit</span>

            <div class="student__top">
              <div class="student__avatar" :class="'student__avatar--' + s.tone">{{ s.initial }}</div>
              <div class="student__info">
                <b class="student__name">
                  {{ s.name }}
                  <ion-icon v-if="s.focus" class="student__verified" :icon="checkmarkCircleOutline" />
                </b>
                <p class="student__meta">
                  NISN: {{ s.nisn }} <i class="student__sep"></i> <span>Kelas {{ s.kelas }}</span>
                </p>
              </div>
              <span class="status" :class="s.graduated ? 'status--gray' : 'status--green'">
                <i></i> {{ s.graduated ? 'Lulus' : 'Aktif' }}
              </span>
            </div>

            <div class="student__foot">
              <span class="student__note"><ion-icon :icon="s.noteIcon" /> {{ s.note }}</span>
              <button v-if="s.focus" class="student__manage" type="button">
                <ion-icon :icon="peopleOutline" /> Kelola Status
              </button>
              <a v-else class="student__link" href="#">{{ s.action }} <ion-icon :icon="chevronForwardOutline" /></a>
            </div>
          </article>

          <!-- Panel kelola status -->
          <section class="panel">
            <i class="panel__handle"></i>

            <div class="panel__head">
              <div class="panel__icon"><ion-icon :icon="idCardOutline" /></div>
              <div class="panel__title">
                <b>Kelola Status Siswa</b>
                <small>Panel Kendali Guru Pembimbing</small>
              </div>
              <span class="panel__id">ID: {{ detail.nisn }}</span>
            </div>

            <div class="detail">
              <div v-for="d in detailRows" :key="d.label" class="detail__item">
                <small class="detail__label">{{ d.label }}</small>
                <b class="detail__value" :class="{ 'detail__value--blue': d.blue }">{{ d.value }}</b>
              </div>
            </div>

            <p class="panel__label">Ubah Status Siswa:</p>
            <div class="options">
              <label
                v-for="o in options"
                :key="o.value"
                class="option"
                :class="{ 'option--selected': status === o.value }"
                @click="status = o.value"
              >
                <span class="option__radio"><i></i></span>
                <span class="option__text">
                  <b class="option__title">{{ o.title }}</b>
                  <small class="option__desc">{{ o.desc }}</small>
                </span>
                <i v-if="status === o.value" class="option__dot"></i>
              </label>
            </div>

            <p class="panel__label panel__label--small">Catatan Guru Pembimbing (Wajib untuk Audit):</p>
            <textarea v-model="catatan" class="note" rows="3" placeholder="Tulis alasan perubahan status..."></textarea>

            <div class="history__head">
              <span class="history__title"><ion-icon :icon="timeOutline" /> Riwayat Perubahan Status</span>
              <span class="history__badge">Audit Trail Terverifikasi</span>
            </div>

            <ol class="timeline">
              <li v-for="h in history" :key="h.date" class="timeline__item">
                <i class="timeline__dot" :class="'timeline__dot--' + h.tone"></i>
                <div class="log" :class="{ 'log--plain': h.first }">
                  <div class="log__head">
                    <b class="log__date">{{ h.date }}</b>
                    <small class="log__time">{{ h.time }}</small>
                  </div>
                  <p class="log__text" v-html="h.text"></p>
                  <p class="log__by"><ion-icon :icon="h.byIcon" /> <span v-html="h.by"></span></p>
                  <p v-if="h.note" class="log__note">{{ h.note }}</p>
                </div>
              </li>
            </ol>

            <div class="panel__actions">
              <button class="btn btn--outline" type="button">Batal</button>
              <button class="btn btn--primary" type="button"><ion-icon :icon="saveOutline" /> Simpan Perubahan</button>
            </div>
          </section>

          <p class="foot">
            Dinas Pendidikan Daerah Provinsi Sulawesi Utara © 2026. Data perlindungan siswa terlindungi enkripsi SHA-256.
          </p>
        </div>
      </div>
    </ion-content>

    <GuruTabbar active="/guru/karya" />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBackOutline,
  searchOutline,
  notificationsOutline,
  shieldCheckmarkOutline,
  closeCircle,
  checkmarkOutline,
  createOutline,
  checkmarkCircleOutline,
  peopleOutline,
  chevronForwardOutline,
  trophyOutline,
  folderOutline,
  schoolOutline,
  idCardOutline,
  timeOutline,
  personOutline,
  serverOutline,
  saveOutline,
} from 'ionicons/icons';

import GuruTabbar from './GuruTabbar.vue';

const router = useRouter();
const query = ref('Budi');
const filters = ['Semua (120)', 'Siswa Aktif (105)', 'Siswa Lulus (15)'];
const active = ref(filters[0]);

const siswa = [
  {
    initial: 'A', tone: 'light', name: 'Andi Pratama', nisn: '123456', kelas: 'IX-A',
    noteIcon: trophyOutline, note: '2 Karya Kompetisi Dikda', action: 'Lihat Riwayat',
  },
  {
    initial: 'B', tone: 'dark', name: 'Budi Santoso', nisn: '123457', kelas: 'IX-B', focus: true,
    noteIcon: schoolOutline, note: 'Jenjang: SMP Negeri 1 Manado',
  },
  {
    initial: 'C', tone: 'light', name: 'Citra Wenas', nisn: '123458', kelas: 'VIII-C',
    noteIcon: folderOutline, note: '1 Proposal Inovasi', action: 'Lihat Riwayat',
  },
  {
    initial: 'D', tone: 'gray', name: 'Dimas Pangemanan', nisn: '123459', kelas: 'IX-A', graduated: true,
    noteIcon: schoolOutline, note: 'Alumni TP 2025/2026', action: 'Arsip Nilai',
  },
] as any[];

const detail = { nama: 'Budi Santoso', nisn: '123457', kelas: 'IX-B', sekolah: 'SMP Negeri 1 Manado' };
const detailRows = [
  { label: 'Nama Lengkap', value: detail.nama },
  { label: 'NISN', value: detail.nisn, blue: true },
  { label: 'Kelas', value: detail.kelas },
  { label: 'Jenjang Sekolah', value: detail.sekolah },
];

const options = [
  { value: 'aktif', title: 'Aktif', desc: 'Dapat mengajukan karya & mengikuti lomba' },
  { value: 'lulus', title: 'Lulus', desc: 'Telah menyelesaikan masa studi di SMPN 1 Manado' },
  { value: 'pindah', title: 'Tidak Aktif / Pindah', desc: 'Mutasi ke luar daerah atau non-aktif' },
];
const status = ref('aktif');
const catatan = ref('Verifikasi kelayakan berkas kepesertaan olimpiade Dikda Sulut 2026.');

const history = [
  {
    date: '15 Juni 2026', time: '10:42 WITA', tone: 'dark', first: true,
    text: 'Status diubah dari <b class="green">Aktif</b> ke Lulus',
    byIcon: personOutline, by: 'Oleh Guru: <b>Ahmad Fauzi, S.Pd.</b>',
    note: 'Catatan: "Kelulusan Angkatan TP 2025/2026"',
  },
  {
    date: '10 Juli 2025', time: '08:15 WITA', tone: 'blue',
    text: 'Status Aktif (Kenaikan Kelas IX)',
    byIcon: serverOutline, by: 'Sistem Otomatis Dapodik Sulut',
  },
  {
    date: '12 Juli 2024', time: '09:00 WITA', tone: 'gray',
    text: 'Status Aktif (Pendaftaran Siswa Baru SMP)',
    byIcon: personOutline, by: 'Admin PPDB SMP Negeri 1 Manado',
  },
] as any[];
</script>

<style scoped>
.siswa-content {
  --background: #f7f9fb;
}

.siswa {
  min-height: 100%;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.siswa ion-icon {
  flex-shrink: 0;
}

.siswa button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.siswa h1,
.siswa h2,
.siswa p {
  margin: 0;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 16px 10px;
  background: #fff;
  border-bottom: 1px solid #e0e3e5;
}

.topbar__text {
  flex: 1;
  min-width: 0;
}

.topbar__title {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
}

.topbar__subtitle {
  font-size: 11px;
  line-height: 14px;
  color: #00639a;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar__btn {
  display: flex;
  font-size: 24px;
  color: #003178;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px 16px 24px;
}

/* Info */
.notice {
  display: flex;
  gap: 12px;
  padding: 14px;
  border: 1px solid #c3c6d4;
  border-radius: 14px;
  background: #eef2f8;
}

.notice__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 10px;
  background: #d9e2ff;
  font-size: 22px;
  color: #003178;
}

.notice__title {
  display: block;
  font-size: 13px;
  color: #003178;
}

.notice__text {
  margin-top: 6px !important;
  font-size: 12px;
  line-height: 18px;
  color: #434652;
}

/* Search & filter */
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
  padding: 0 44px;
  border: 1px solid #c3c6d4;
  border-radius: 12px;
  background: #fff;
  font: inherit;
  font-size: 15px;
  color: #191c1e;
  outline: none;
}

.search__input:focus {
  border-color: #003178;
  box-shadow: 0 0 0 1px #003178;
}

.search__clear {
  position: absolute;
  right: 12px;
  display: flex;
  font-size: 20px;
  color: #9aa0ad;
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
  padding: 8px 16px;
  border: 1px solid #c3c6d4 !important;
  border-radius: 8px;
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
  background: #003178 !important;
  border-color: #003178 !important;
  font-weight: 700;
  color: #fff;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-head__title {
  font-size: 14px;
  font-weight: 800;
}

.section-head__note {
  font-size: 11px;
  color: #737783;
}

/* Kartu siswa */
.student {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 14px;
  background: #fff;
}

.student--focus {
  border: 2px solid #003178;
  box-shadow: 0 4px 14px rgba(0, 49, 120, 0.15);
}

.student__flag {
  position: absolute;
  top: -1px;
  right: -1px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 0 12px 0 10px;
  background: #003178;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
}

.student__flag ion-icon {
  font-size: 11px;
}

.student__top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.student--focus .student__top {
  margin-top: 8px;
}

.student__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 50%;
  font-size: 17px;
  font-weight: 700;
}

.student__avatar--light {
  background: #d9e2ff;
  color: #003178;
}

.student__avatar--dark {
  background: #003178;
  color: #fff;
}

.student__avatar--gray {
  background: #e6e8ea;
  color: #434652;
}

.student__info {
  flex: 1;
  min-width: 0;
}

.student__name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 800;
}

.student__verified {
  font-size: 16px;
  color: #f59e0b;
}

.student__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #737783;
}

.student__meta span {
  font-weight: 700;
  color: #003178;
}

.student__sep {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00639a;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
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

.status--gray {
  background: #e6e8ea;
  color: #434652;
}

.student__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.student__note {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #434652;
}

.student__note ion-icon {
  font-size: 16px;
  color: #00639a;
}

.student__link {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 700;
  color: #003178;
  text-decoration: none;
}

.student__link ion-icon {
  font-size: 14px;
}

.student__manage {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 10px;
  background: #003178 !important;
  font-size: 12px;
  font-weight: 700;
  color: #fff !important;
}

.student__manage ion-icon {
  font-size: 16px;
}

/* Panel */
.panel {
  padding: 8px 16px 16px;
  margin-top: 6px;
  border: 1px solid #b0c6ff;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 49, 120, 0.12);
}

.panel__handle {
  display: block;
  width: 44px;
  height: 5px;
  margin: 0 auto 14px;
  border-radius: 3px;
  background: #c3c6d4;
}

.panel__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 10px;
  background: #003178;
  font-size: 20px;
  color: #fff;
}

.panel__title {
  flex: 1;
}

.panel__title b {
  display: block;
  font-size: 15px;
  font-weight: 800;
}

.panel__title small {
  font-size: 11px;
  color: #737783;
}

.panel__id {
  padding: 3px 10px;
  border-radius: 6px;
  background: #d9e2ff;
  font-family: 'JetBrains Mono', ui-monospace, 'Courier New', monospace;
  font-size: 11px;
  font-weight: 700;
  color: #003178;
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  padding: 14px;
  margin-top: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.detail__label {
  display: block;
  font-size: 11px;
  color: #737783;
}

.detail__value {
  font-size: 13px;
  font-weight: 800;
}

.detail__value--blue {
  color: #00639a;
}

.panel__label {
  margin: 16px 0 10px !important;
  font-size: 14px;
  font-weight: 700;
}

.panel__label--small {
  margin-top: 16px !important;
  font-size: 12px;
}

/* Opsi status */
.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #c3c6d4;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
}

.option--selected {
  border: 2px solid #003178;
  background: #eef4fd;
}

.option__radio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex: none;
  margin-top: 2px;
  border: 2px solid #737783;
  border-radius: 50%;
}

.option__radio i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
}

.option--selected .option__radio {
  border-color: #003178;
}

.option--selected .option__radio i {
  background: #003178;
}

.option__text {
  flex: 1;
}

.option__title {
  display: block;
  font-size: 14px;
}

.option__desc {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 17px;
  color: #434652;
}

.option__dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 50%;
  background: #10b981;
}

.note {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #c3c6d4;
  border-radius: 10px;
  background: #fff;
  font: inherit;
  font-size: 13px;
  line-height: 18px;
  color: #434652;
  resize: none;
  outline: none;
}

.note:focus {
  border-color: #003178;
}

/* Riwayat */
.history__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid #e0e3e5;
}

.history__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 800;
}

.history__title ion-icon {
  font-size: 20px;
  color: #003178;
}

.history__badge {
  padding: 4px 10px;
  border-radius: 8px;
  background: #d1fae5;
  font-size: 11px;
  font-weight: 700;
  line-height: 13px;
  text-align: center;
  color: #047857;
}

.timeline {
  position: relative;
  padding: 0 0 0 26px;
  margin: 16px 0 0;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 7px;
  width: 2px;
  background: #b0c6ff;
}

.timeline__item {
  position: relative;
  margin-bottom: 14px;
}

.timeline__dot {
  position: absolute;
  top: 6px;
  left: -26px;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 3px solid #fff;
  border-radius: 50%;
}

.timeline__dot--dark {
  background: #674600;
  box-shadow: 0 0 0 1px #674600;
}

.timeline__dot--blue {
  background: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.timeline__dot--gray {
  background: #737783;
  box-shadow: 0 0 0 1px #737783;
}

.log {
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.log--plain {
  padding: 0 0 0 4px;
  border: 0;
  background: transparent;
}

.log__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.log__date {
  font-size: 14px;
  font-weight: 800;
}

.log__time {
  font-size: 11px;
  color: #434652;
}

.log__text {
  margin-top: 4px !important;
  font-size: 12px;
  font-weight: 600;
}

.log__text :deep(.green) {
  color: #047857;
}

.log__by {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px !important;
  font-size: 11px;
  color: #737783;
}

.log__by ion-icon {
  font-size: 14px;
  color: #00639a;
}

.log__by :deep(b) {
  font-weight: 700;
  color: #003178;
}

.log__note {
  padding: 8px 10px;
  margin-top: 8px !important;
  border: 1px solid #e0e3e5;
  border-radius: 8px;
  background: #fff;
  font-size: 11px;
  font-style: italic;
  color: #434652;
}

/* Tombol */
.panel__actions {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 10px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
}

.btn ion-icon {
  font-size: 18px;
}

.btn--outline {
  border: 1px solid #c3c6d4 !important;
  background: #fff !important;
  color: #191c1e;
}

.btn--primary {
  background: #003178 !important;
  color: #fff !important;
}

.foot {
  padding: 4px 12px;
  font-size: 11px;
  line-height: 16px;
  text-align: center;
  color: #737783;
}
</style>