<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <div class="brand__text">
              <strong>Kelola Status Siswa</strong>
              <span>
                <ion-icon :icon="schoolOutline" />
                SMP Negeri 1 Manado
              </span>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Informasi">
            <ion-icon :icon="informationCircleOutline" />
          </button>
        </header>

        <main class="main">

          <!-- Profil siswa -->
          <section class="profile">
            <div class="profile__top">
              <div class="profile__avatar">{{ inisial }}</div>

              <div class="profile__text">
                <div class="profile__name">
                  <h1>{{ siswa.nama }}</h1>
                  <span class="status status-green"><i class="dot"></i> {{ labelStatus(statusSekarang) }}</span>
                </div>

                <p>NISN: <strong>{{ siswa.nisn }}</strong></p>
              </div>
            </div>

            <div class="profile__meta">
              <span>
                <ion-icon :icon="bookmarkOutline" />
                Kelas <strong>{{ siswa.kelas }}</strong>
              </span>

              <i class="sep"></i>

              <span>
                <ion-icon :icon="locationOutline" />
                {{ siswa.sekolah }}
              </span>
            </div>
          </section>

          <!-- Pilihan status -->
          <div class="section-head">
            <h2 id="pilih-status">Pilih Status Pembaruan</h2>
            <small>1 Opsi Terpilih</small>
          </div>

          <div class="options" role="radiogroup" aria-labelledby="pilih-status">
            <label
              v-for="o in opsi"
              :key="o.value"
              class="option"
              :class="{ 'option--on': statusBaru === o.value }"
            >
              <input v-model="statusBaru" type="radio" name="status" :value="o.value" />

              <span class="option__radio"></span>

              <span class="option__text">
                <span class="option__title">
                  <strong>{{ o.label }}</strong>

                  <em v-if="o.value === statusSekarang" class="current">Status Sekarang</em>

                  <ion-icon v-if="o.peringatan" :icon="warningOutline" class="warn" />
                </span>

                <small>{{ o.desc }}</small>
              </span>
            </label>
          </div>

          <p v-if="tampilError.status" class="error" role="alert">{{ tampilError.status }}</p>

          <!-- Catatan audit -->
          <div class="field">
            <label for="catatan">
              Alasan / Catatan Perubahan (Audit Trail) <b>*</b>
            </label>

            <div class="textarea" :class="{ 'textarea--error': tampilError.catatan }">
              <textarea
                id="catatan"
                v-model="catatan"
                rows="3"
                maxlength="250"
                placeholder="Contoh: Siswa aktif terdaftar tim Olimpiade Sains Sulut 2026"
                :aria-invalid="!!tampilError.catatan"
              />

              <small>{{ catatan.length ? catatan.length + '/250 Karakter' : 'Maks. 250 Karakter' }}</small>
            </div>

            <p v-if="tampilError.catatan" class="error" role="alert">{{ tampilError.catatan }}</p>

            <p class="audit-note">
              <ion-icon :icon="shieldOutline" />
              Catatan ini akan dicatat ke dalam log audit resmi Dikda Sulut dan tidak dapat
              dihapus.
            </p>
          </div>

          <!-- Riwayat audit -->
          <section class="history">
            <div class="history__head">
              <h2>
                <ion-icon :icon="timeOutline" />
                Riwayat Audit Terakhir
              </h2>
              <small>{{ log.length }} Catatan Log</small>
            </div>

            <ol class="timeline">
              <li v-for="(r, i) in log" :key="r.waktu" class="tl" :class="'tl--' + i">
                <span class="tl__dot"></span>

                <div class="tl__body">
                  <div class="tl__top">
                    <strong>{{ r.waktu }}</strong>
                    <span :class="r.tone">{{ r.label }}</span>
                  </div>

                  <p>{{ r.isi }}</p>

                  <small>
                    <ion-icon :icon="idCardOutline" />
                    Diubah oleh: {{ r.oleh }}
                  </small>
                </div>
              </li>
            </ol>
          </section>

          <footer class="foot">
            <strong>
              <ion-icon :icon="shieldCheckmarkOutline" />
              Sistem Verifikasi Audit Trail Terenkripsi
            </strong>
            <span>Dinas Pendidikan Daerah Provinsi Sulawesi Utara</span>
          </footer>

        </main>
      </div>
    </ion-content>

    <!-- Aksi tetap di bawah -->
    <div class="dock">
      <button type="button" class="btn-validate" :disabled="mengirim" :aria-busy="mengirim" @click="simpan">
        <ion-icon :icon="saveOutline" />
        {{ mengirim ? 'Menyimpan...' : 'Simpan & Perbarui Status' }}
      </button>

      <button type="button" class="btn-text" @click="router.back()">Batal</button>
    </div>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  schoolOutline,
  informationCircleOutline,
  bookmarkOutline,
  locationOutline,
  warningOutline,
  shieldOutline,
  shieldCheckmarkOutline,
  timeOutline,
  idCardOutline,
  saveOutline
} from 'ionicons/icons';

const router = useRouter();

type Status = 'aktif' | 'lulus' | 'nonaktif' | 'ditangguhkan';

// TODO: ganti dengan data siswa dari API
const siswa = {
  nama: 'Budi Santoso',
  nisn: '123457',
  kelas: 'IX-B',
  sekolah: 'SMPN 1 Manado'
};

const statusSekarang: Status = 'aktif';

const opsi: { value: Status; label: string; desc: string; peringatan?: boolean }[] = [
  {
    value: 'aktif',
    label: 'Aktif',
    desc: 'Dapat didaftarkan lomba, mengunggah karya, dan diverifikasi tim juri.'
  },
  {
    value: 'lulus',
    label: 'Lulus',
    desc: 'Telah menyelesaikan masa pendidikan resmi di SMPN 1 Manado (Alumni).'
  },
  {
    value: 'nonaktif',
    label: 'Pindah / Non-Aktif',
    desc: 'Mutasi ke satuan pendidikan lain di luar/dalam wilayah atau data non-aktif.'
  },
  {
    value: 'ditangguhkan',
    label: 'Ditangguhkan',
    peringatan: true,
    desc: 'Sementara tidak dapat diikutsertakan lomba atau submisi karya baru.'
  }
];

function labelStatus(s: Status) {
  return opsi.find((o) => o.value === s)?.label ?? s;
}

const inisial = computed(() =>
  siswa.nama
    .split(' ')
    .map((k) => k[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
);

// TODO: ganti dengan log audit dari API
const log = [
  {
    waktu: '15 Januari 2026 • 09:42 WITA',
    label: 'Aktif',
    tone: 'tone-green',
    isi: 'Pendaftaran semester genap & verifikasi kelayakan kompetisi saintek.',
    oleh: 'Ahmad Fauzi, S.Pd.'
  },
  {
    waktu: '18 Juli 2025 • 14:10 WITA',
    label: 'Registrasi Baru',
    tone: 'tone-blue',
    isi: 'Sinkronisasi data NISN siswa dari basis Dapodikdasmen Sulut.',
    oleh: 'Ahmad Fauzi, S.Pd.'
  }
];

/* Form */
const statusBaru = ref<Status>(statusSekarang);
const catatan = ref('');
const dicoba = ref(false);
const mengirim = ref(false);

const tampilError = computed(() => ({
  status:
    dicoba.value && statusBaru.value === statusSekarang
      ? 'Pilih status yang berbeda dari status saat ini.'
      : '',
  catatan: dicoba.value && catatan.value.trim().length < 5 ? 'Alasan perubahan wajib diisi untuk audit.' : ''
}));

async function simpan() {
  if (mengirim.value) return;
  dicoba.value = true;

  if (statusBaru.value === statusSekarang || catatan.value.trim().length < 5) {
    await nextTick();
    document
      .querySelector<HTMLElement>('.error')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  mengirim.value = true;
  try {
    // TODO: kirim { nisn: siswa.nisn, status: statusBaru, catatan } ke API.
    // Setelah berhasil, kembali ke daftar siswa: router.back().
  } finally {
    mengirim.value = false;
  }
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
}

h1,
h2,
p,
ol {
  margin: 0;
}

ol {
  padding: 0;
  list-style: none;
}

small {
  font-size: 11px;
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
  font-size: 18px;
  line-height: 22px;
  font-weight: 800;
}

.brand__text span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #3d4452;
}

.brand__text span ion-icon {
  font-size: 14px;
  color: #003178;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 14px 24px;
}

/* ---------- Pill ---------- */

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
}

.status-green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #0f9d6b;
}

.sep {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c3c9d6;
}

/* ---------- Profil ---------- */

.profile {
  padding: 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.profile__top {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eceef2;
}

.profile__avatar {
  width: 62px;
  height: 62px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #003178;
  border: 3px solid #cfe0fb;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.profile__text {
  flex: 1;
  min-width: 0;
}

.profile__name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.profile__name h1 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
}

.profile__text > p {
  margin-top: 3px;
  font-size: 13px;
  color: #3d4452;
}

.profile__text > p strong {
  font-size: 15px;
  color: #191c1e;
}

.profile__meta {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 8px;
  margin-top: 12px;
  font-size: 13px;
}

.profile__meta span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.profile__meta ion-icon {
  font-size: 18px;
  color: #0b4fa6;
}

/* ---------- Pilihan status ---------- */

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
}

.section-head h2 {
  font-size: 14px;
  font-weight: 700;
}

.section-head small {
  font-size: 12px;
  color: #0b4fa6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #c3c9d6;
  cursor: pointer;
}

.option input {
  position: absolute;
  opacity: 0;
}

.option__radio {
  flex: none;
  width: 24px;
  height: 24px;
  margin-top: 2px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #747985;
}

.option__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.option__title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.option__title strong {
  font-size: 15px;
  font-weight: 600;
}

.option__text small {
  font-size: 13px;
  line-height: 20px;
  color: #3d4452;
}

.current {
  padding: 2px 10px;
  border-radius: 6px;
  background: #cfe3fb;
  color: #0b4fa6;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
}

.warn {
  font-size: 18px;
  color: #ba1a1a;
}

.option--on {
  border: 2px solid #003178;
  box-shadow: 0 1px 4px rgba(0, 49, 120, .15);
}

.option--on .option__radio {
  border-color: #003178;
}

.option--on .option__radio::after {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #003178;
}

.option:has(input:focus-visible) {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Catatan ---------- */

.field {
  margin-top: 6px;
}

.field label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.field label b {
  color: #ba1a1a;
}

.textarea {
  padding: 12px 14px 8px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #747985;
}

.textarea:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.textarea--error,
.textarea--error:focus-within {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.textarea textarea {
  display: block;
  width: 100%;
  border: 0;
  outline: 0;
  resize: none;
  background: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 26px;
  color: #191c1e;
}

.textarea textarea::placeholder {
  color: #aab0bb;
}

.textarea small {
  display: block;
  text-align: right;
  font-size: 11px;
  color: #8b909c;
}

.audit-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 12px;
  font-size: 12px;
  line-height: 18px;
  color: #3d4452;
}

.audit-note ion-icon {
  margin-top: 1px;
  font-size: 18px;
  color: #d19a00;
}

.error {
  margin-top: 6px;
  font-size: 12px;
  color: #ba1a1a;
}

/* ---------- Riwayat ---------- */

.history {
  padding: 14px;
  border-radius: 16px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.history__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.history__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
}

.history__head h2 ion-icon {
  font-size: 22px;
  color: #003178;
}

.history__head small {
  font-size: 12px;
  font-weight: 600;
  color: #0b4fa6;
}

.timeline {
  position: relative;
  margin-top: 14px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 3px;
  border-radius: 2px;
  background: #c3cfe3;
}

.tl {
  position: relative;
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.tl:last-child {
  margin-bottom: 0;
}

.tl__dot {
  z-index: 1;
  width: 13px;
  height: 13px;
  flex: none;
  margin-top: 6px;
  border-radius: 50%;
  background: #003178;
}

.tl--1 .tl__dot {
  background: #6b7280;
}

.tl__body {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e3e6ec;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .04);
}

.tl__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.tl__top strong {
  font-size: 12px;
  font-weight: 500;
}

.tl__top span {
  flex: none;
  font-size: 12px;
  font-weight: 700;
}

.tone-green {
  color: #0b6b43;
}

.tone-blue {
  color: #0b4fa6;
}

.tl__body p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 20px;
}

.tl__body small {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  color: #3d4452;
}

.tl__body small ion-icon {
  font-size: 15px;
  color: #50545d;
}

/* ---------- Footer ---------- */

.foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding-top: 4px;
  text-align: center;
  font-size: 11px;
  color: #3d4452;
}

.foot strong {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #191c1e;
}

.foot strong ion-icon {
  font-size: 17px;
  color: #003178;
}

/* ---------- Dock ---------- */

.dock {
  padding:
    14px
    16px
    calc(env(safe-area-inset-bottom, 0px) + 6px);

  background: #fff;
  border-top: 1px solid #e3e6ec;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, .05);
}

.btn-validate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 54px;
  border-radius: 12px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-validate:disabled {
  opacity: .7;
  cursor: progress;
}

.btn-validate ion-icon {
  font-size: 22px;
}

.btn-text {
  display: block;
  width: 100%;
  padding: 14px 0 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.btn-validate:focus-visible,
.btn-text:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

</style>