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
              <strong>Status &amp; Perbaikan Akun</strong>
              <span>SIKARYA Dikda Sulut <i class="sep"></i> Siswa Aktif</span>
            </div>
          </div>

          <span class="status status-gold">
            <ion-icon :icon="alertCircleOutline" />
            Perlu Revisi
          </span>
        </header>

        <main class="main">

          <!-- Tiket revisi -->
          <section class="ticket">
            <div class="ticket__head">
              <span class="ticket__icon"><ion-icon :icon="alertCircleOutline" /></span>

              <div class="ticket__id">
                <small>ID TIKET VERIFIKASI</small>
                <strong>#{{ tiket.id }}</strong>
              </div>

              <span class="status status-outline">
                <ion-icon :icon="timerOutline" />
                Sisa {{ tiket.sisaWaktu }}
              </span>
            </div>

            <div class="ticket__note">
              <div class="ticket__by">
                <span><ion-icon :icon="chatboxEllipsesOutline" /> Catatan<br />Verifikator</span>
                <span class="ticket__name"><i class="sep"></i> {{ tiket.verifikator }}</span>
              </div>

              <blockquote>“{{ tiket.pesan }}”</blockquote>
            </div>
          </section>

          <!-- Data Dapodik (terkunci) -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="idCardOutline" /> Data Terverifikasi Dapodik</h2>

              <span class="status status-green">
                <ion-icon :icon="checkmarkCircleOutline" />
                Sinkron Dapodik
              </span>
            </div>

            <div class="locked">
              <div>
                <small>Nama Lengkap Siswa</small>
                <strong class="blue">{{ siswa.nama }}</strong>
              </div>
              <ion-icon :icon="lockClosedOutline" class="locked__lock" />
            </div>

            <div class="locked">
              <div>
                <small>Nomor Induk Siswa Nasional</small>
                <strong>{{ siswa.nisn }}</strong>
              </div>
              <ion-icon :icon="lockClosedOutline" class="locked__lock" />
            </div>

            <div class="locked locked--school">
              <span class="locked__avatar"><ion-icon :icon="schoolOutline" /></span>

              <div>
                <small>Satuan Pendidikan (Sekolah Asal)</small>
                <strong class="medium">{{ siswa.sekolah }}</strong>
              </div>
            </div>

            <p class="hint">
              <ion-icon :icon="informationCircleOutline" />
              Perubahan nama dan NISN hanya dapat diproses melalui Operator Dapodik Satuan
              Pendidikan.
            </p>
          </section>

          <!-- Formulir perbaikan -->
          <section class="panel">
            <div class="panel__head panel__head--form">
              <h2 class="blue-title"><ion-icon :icon="createOutline" /> Formulir Perbaikan Data</h2>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="rombel">Rombongan Belajar (Rombel) <b>*</b></label>
                <small class="year">Tahun Ajaran 2024/2025</small>
              </div>

              <div class="input" :class="{ 'input--error': tampilError.rombel }">
                <ion-icon :icon="businessOutline" class="input__lead" />
                <select
                  id="rombel"
                  v-model="form.rombel"
                  :class="{ 'is-empty': !form.rombel }"
                  :aria-invalid="!!tampilError.rombel"
                >
                  <option value="" disabled>Pilih rombel kelas</option>
                  <option v-for="r in rombelList" :key="r" :value="r">{{ r }}</option>
                </select>
                <ion-icon :icon="chevronDownOutline" class="input__trail" />
              </div>

              <p v-if="tampilError.rombel" class="error" role="alert">{{ tampilError.rombel }}</p>
              <p class="help">Pilih rombel resmi yang sesuai dengan SK Pembagian Kelas terkini.</p>
            </div>

            <div class="field">
              <div class="label-row label-row--top">
                <span class="label">Scan Kartu Pelajar Siswa <b>*</b></span>
                <small class="format">Format JPG, PNG, PDF (Maks 2 MB)</small>
              </div>

              <!-- Berkas lama -->
              <div class="old-file">
                <ion-icon :icon="imageOutline" class="old-file__icon" />

                <div class="old-file__text">
                  <strong>{{ tiket.berkasLama.nama }}</strong>
                  <small>Alasan penolakan: {{ tiket.berkasLama.alasan }}</small>
                </div>

                <span class="status status-red">
                  <ion-icon :icon="closeCircleOutline" />
                  Ditolak
                </span>
              </div>

              <input
                ref="berkasInput"
                type="file"
                class="sr-only"
                accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                @change="pilihBerkas"
              />

              <!-- Berkas baru -->
              <div v-if="berkasBaru" class="new-file">
                <div class="new-file__row">
                  <span class="new-file__icon"><ion-icon :icon="cloudDoneOutline" /></span>

                  <div class="new-file__text">
                    <strong>{{ berkasBaru.name }}</strong>
                    <small>
                      {{ ukuranBerkas }}
                      <span class="ok"><ion-icon :icon="checkmarkCircleOutline" /> Format sesuai</span>
                    </small>
                  </div>

                  <span class="status status-green status-sm">Siap</span>
                </div>

                <button type="button" class="btn-outline" @click="berkasInput?.click()">
                  <ion-icon :icon="refreshOutline" />
                  Ganti File
                </button>
              </div>

              <button
                v-else
                type="button"
                class="upload"
                :class="{ 'upload--error': tampilError.berkas }"
                @click="berkasInput?.click()"
              >
                <ion-icon :icon="cloudUploadOutline" />
                <strong>Pilih Scan Kartu Pelajar Baru</strong>
                <small>Pastikan foto tajam, terbaca jelas, dan tidak terpotong</small>
              </button>

              <p v-if="tampilError.berkas" class="error" role="alert">{{ tampilError.berkas }}</p>
            </div>

            <div class="field">
              <div class="label-row label-row--top">
                <label for="catatan">Catatan Tanggapan Siswa <span class="opt">(Opsional)</span></label>
                <small class="format">
                  {{ form.catatan.length ? form.catatan.length + '/250 karakter' : 'Maks. 250 karakter' }}
                </small>
              </div>

              <textarea
                id="catatan"
                v-model="form.catatan"
                rows="3"
                maxlength="250"
                placeholder="Tulis tanggapan singkat untuk verifikator..."
              />

              <p class="help">
                Pesan ini akan langsung terlihat oleh Verifikator di Dinas Pendidikan Daerah
                Provinsi Sulawesi Utara.
              </p>
            </div>
          </section>

          <section class="priority">
            <ion-icon :icon="shieldCheckmarkOutline" />
            <p>
              Data perbaikan yang dikirim ulang akan masuk prioritas antrean kurasi verifikator
              dalam waktu 1×24 jam kerja.
            </p>
          </section>

        </main>
      </div>
    </ion-content>

    <!-- Aksi tetap di bawah -->
    <div class="dock">
      <button type="button" class="btn-validate" :disabled="mengirim" :aria-busy="mengirim" @click="kirimUlang">
        <ion-icon :icon="sendOutline" />
        {{ mengirim ? 'Mengirim...' : 'Kirim Ulang Perbaikan' }}
      </button>

      <button type="button" class="btn-outline btn-outline--block" @click="hubungiGuru">
        <ion-icon :icon="helpCircleOutline" />
        Bantuan / Hubungi Guru Pembimbing
      </button>
    </div>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  alertCircleOutline,
  timerOutline,
  chatboxEllipsesOutline,
  idCardOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  schoolOutline,
  informationCircleOutline,
  createOutline,
  businessOutline,
  chevronDownOutline,
  imageOutline,
  closeCircleOutline,
  cloudDoneOutline,
  cloudUploadOutline,
  refreshOutline,
  shieldCheckmarkOutline,
  sendOutline,
  helpCircleOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data tiket dari API
const tiket = {
  id: 'REV-SISWA-4920',
  sisaWaktu: '2 hari 18 jam',
  verifikator: 'Dra. Meiske Lumintang, M.Pd',
  pesan: 'Mohon sesuaikan pilihan rombel kelas Anda dan unggah ulang scan Kartu Pelajar yang terbaca jelas.',
  berkasLama: {
    nama: 'KPS_KevinPangkey_Lama.jpg',
    alasan: 'File buram & tidak terbaca'
  }
};

// Data Dapodik (hanya-baca)
const siswa = {
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  sekolah: 'SMA Negeri 1 Manado'
};

// TODO: ambil daftar rombel resmi dari Dapodik sekolah
const rombelList = [
  'Kelas XII MIPA 1',
  'Kelas XII MIPA 2',
  'Kelas XII MIPA 3',
  'Kelas XII IPS 1',
  'Kelas XII IPS 2'
];

const form = reactive({
  rombel: '',
  catatan: ''
});

/* Berkas pengganti */
const MB = 1024 * 1024;
const berkasBaru = ref<File | null>(null);
const pesanBerkas = ref('');
const berkasInput = ref<HTMLInputElement | null>(null);

const ukuranBerkas = computed(() => {
  if (!berkasBaru.value) return '';
  const mb = berkasBaru.value.size / MB;
  return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.ceil(berkasBaru.value.size / 1024) + ' KB';
});

function pilihBerkas(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  pesanBerkas.value = '';

  if (file) {
    const tipeOk = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
    if (!tipeOk) {
      berkasBaru.value = null;
      pesanBerkas.value = 'Format berkas harus JPG, PNG, atau PDF.';
    } else if (file.size > 2 * MB) {
      berkasBaru.value = null;
      pesanBerkas.value = 'Ukuran berkas maksimum 2 MB.';
    } else {
      berkasBaru.value = file;
    }
  }

  input.value = '';
}

/* Validasi */
const dicoba = ref(false);
const mengirim = ref(false);

const tampilError = computed(() => ({
  rombel: dicoba.value && !form.rombel ? 'Pilih rombel kelas Anda.' : '',
  berkas: pesanBerkas.value
    ? pesanBerkas.value
    : dicoba.value && !berkasBaru.value
      ? 'Unggah scan Kartu Pelajar yang baru dan terbaca jelas.'
      : ''
}));

async function kirimUlang() {
  if (mengirim.value) return;
  dicoba.value = true;

  if (!form.rombel || !berkasBaru.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>('.input--error select, .upload--error');
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  mengirim.value = true;
  try {
    // TODO: kirim form.rombel, berkasBaru, dan form.catatan ke API perbaikan data siswa.
    // Setelah berhasil, arahkan ke halaman status akun siswa (menunggu verifikasi).
  } finally {
    mengirim.value = false;
  }
}

function hubungiGuru() {
  // TODO: buka WhatsApp / pesan portal ke guru pembimbing
  console.log('hubungi guru pembimbing');
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
p,
blockquote {
  margin: 0;
}

small {
  font-size: 11px;
}

b {
  color: #ba1a1a;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.sep {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 4px;
  vertical-align: middle;
  border-radius: 50%;
  background: #9aa0ac;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

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
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 17px;
  line-height: 24px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10px;
  color: #3d4452;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 24px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 24px;
}

/* ---------- Pill ---------- */

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
}

.status ion-icon {
  font-size: 14px;
}

.status-gold {
  background: #ffe9bf;
  color: #4a3000;
}

.status-outline {
  background: #fff;
  border: 1px solid #f0c76a;
  color: #7a3b00;
}

.status-green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.status-red {
  background: #fbdcdc;
  border: 1px solid #f0b8b8;
  color: #93000a;
}

.status-sm {
  padding: 3px 10px;
}

/* ---------- Tiket ---------- */

.ticket {
  padding: 14px;
  border-radius: 16px;
  background: linear-gradient(160deg, #fff6df 0%, #fffdf6 100%);
  border: 1px solid #f0d58a;
}

.ticket__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ticket__icon {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #ffe1b3;
  border: 1px solid #f0c76a;
  color: #7a3b00;
}

.ticket__id {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.ticket__id small {
  font-size: 10px;
  letter-spacing: .3px;
  color: #3d4452;
}

.ticket__id strong {
  font-size: 15px;
  font-weight: 800;
  color: #8a2a00;
}

.ticket__note {
  margin-top: 12px;
  padding: 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #efe3bd;
}

.ticket__by {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
  color: #003178;
}

.ticket__by > span {
  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
}

.ticket__by ion-icon {
  font-size: 16px;
  margin-top: 1px;
}

.ticket__name {
  flex: 1;
  font-weight: 400;
  color: #3d4452;
}

.ticket blockquote {
  margin-top: 8px;
  padding-left: 12px;
  border-left: 3px solid #f0c76a;
  font-size: 13px;
  line-height: 24px;
  font-style: italic;
  color: #3d4452;
}

/* ---------- Panel ---------- */

.panel {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eceef2;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
}

.panel__head h2 ion-icon {
  font-size: 22px;
  color: #003178;
}

.panel__head--form {
  border-bottom: 0;
  padding-bottom: 0;
}

.blue-title {
  font-size: 15px !important;
  color: #003178;
}

/* Data terkunci */

.locked {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 12px;
  padding: 14px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #e3e6ec;
}

.locked small {
  display: block;
  color: #3d4452;
}

.locked strong {
  display: block;
  margin-top: 4px;
  font-size: 19px;
  line-height: 24px;
  font-weight: 700;
}

.locked strong.blue {
  color: #003178;
}

.locked strong.medium {
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
}

.locked__lock {
  align-self: flex-start;
  font-size: 16px;
  color: #606572;
}

.locked--school {
  justify-content: flex-start;
  gap: 12px;
}

.locked__avatar {
  width: 36px;
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e1e4ea;
  color: #003178;
}

.hint {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 12px;
  font-size: 11px;
  line-height: 16px;
  color: #50545d;
}

.hint ion-icon {
  font-size: 16px;
  margin-top: 1px;
}

/* ---------- Form ---------- */

.field {
  margin-top: 16px;
}

.field label,
.label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  color: #191c1e;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.label-row--top {
  align-items: flex-start;
}

.year {
  max-width: 100px;
  font-size: 10px;
  line-height: 14px;
  color: #0b4fa6;
}

.format {
  max-width: 130px;
  font-size: 10px;
  line-height: 14px;
  color: #50545d;
}

.opt {
  font-weight: 400;
  color: #3d4452;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 50px;
  padding: 0 12px;
  border-radius: 10px;
  background: #eef0f4;
  border: 1px solid #c3c9d6;
}

.input:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
  background: #fff;
}

.input--error,
.input--error:focus-within {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.input select {
  flex: 1;
  min-width: 0;
  height: 48px;
  border: 0;
  outline: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  color: #191c1e;
}

.input select.is-empty {
  color: #50545d;
}

.input__lead {
  font-size: 22px;
  color: #3d4452;
}

.input__trail {
  font-size: 18px;
  color: #3d4452;
  pointer-events: none;
}

textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #c3c9d6;
  background: #eef0f4;
  outline: 0;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  line-height: 24px;
  color: #191c1e;
}

textarea:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
  background: #fff;
}

.help {
  margin-top: 8px;
  font-size: 11px;
  line-height: 16px;
  color: #50545d;
}

.error {
  margin-top: 6px;
  font-size: 11px;
  line-height: 16px;
  color: #ba1a1a;
}

/* Berkas lama */

.old-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: #fdeeee;
  border: 1px solid #f0c0c0;
}

.old-file__icon {
  font-size: 24px;
  color: #ba1a1a;
}

.old-file__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.old-file__text strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #93000a;
}

.old-file__text small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 10px;
  color: #93000a;
}

/* Berkas baru */

.new-file {
  margin-top: 10px;
  padding: 12px;
  border-radius: 14px;
  background: #f0f8ff;
  border: 2px dashed #7db5e8;
}

.new-file__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.new-file__icon {
  width: 44px;
  height: 44px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #cfe3fb;
  color: #003178;
}

.new-file__icon ion-icon {
  font-size: 26px;
}

.new-file__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.new-file__text strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #191c1e;
}

.new-file__text small {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin-top: 2px;
  color: #3d4452;
}

.ok {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #0b5f3a;
}

.ok ion-icon {
  font-size: 14px;
}

.new-file .btn-outline {
  width: 100%;
  margin-top: 12px;
}

.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin-top: 10px;
  padding: 22px 14px;
  border-radius: 14px;
  background: #f4f9ff;
  border: 2px dashed #7db5e8;
  text-align: center;
}

.upload--error {
  border-color: #ba1a1a;
}

.upload ion-icon {
  font-size: 28px;
  color: #003178;
}

.upload strong {
  font-size: 12px;
  color: #003178;
}

.upload small {
  color: #606572;
}

/* ---------- Catatan prioritas ---------- */

.priority {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: #e8ebf0;
  border: 1px solid #dfe2e8;
}

.priority ion-icon {
  margin-top: 1px;
  font-size: 22px;
  color: #003178;
}

.priority p {
  font-size: 11px;
  line-height: 17px;
  color: #3d4452;
}

/* ---------- Dock ---------- */

.dock {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding:
    14px
    14px
    calc(env(safe-area-inset-bottom, 0px) + 10px);

  background: #fff;
  border-top: 1px solid #e3e6ec;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, .05);
}

.btn-validate,
.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 10px;
  font-weight: 700;
}

.btn-validate {
  width: 100%;
  min-height: 52px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-validate:disabled {
  opacity: .7;
  cursor: progress;
}

.btn-outline {
  min-height: 46px;
  border: 1px solid #aeb4c1;
  background: #fff;
  color: #003178;
  font-size: 13px;
}

.btn-outline--block {
  width: 100%;
  min-height: 48px;
  font-weight: 600;
}

.btn-validate ion-icon,
.btn-outline ion-icon {
  font-size: 20px;
}

.btn-validate:focus-visible,
.btn-outline:focus-visible,
.upload:focus-visible,
.icon-btn:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

</style>