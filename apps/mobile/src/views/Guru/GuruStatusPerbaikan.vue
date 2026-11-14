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
              <span>Akun Guru Pembimbing</span>
              <strong>Status &amp; Perbaikan</strong>
            </div>
          </div>

          <span class="status status-gold">
            <i class="dot"></i>
            Perlu Perbaikan
          </span>
        </header>

        <main class="main">

          <!-- Tiket revisi -->
          <section class="ticket">
            <div class="ticket__accent"></div>

            <div class="ticket__body">
              <div class="ticket__head">
                <div class="ticket__icon">
                  <ion-icon :icon="chatboxEllipsesOutline" />
                </div>

                <div class="ticket__title">
                  <small>Tiket Verifikasi</small>
                  <strong>Pemberitahuan Revisi Berkas</strong>
                </div>

                <span class="ticket__id">#{{ tiket.id }}</span>
              </div>

              <blockquote class="quote">
                <div class="quote__by">
                  <ion-icon :icon="shieldCheckmarkOutline" />
                  Verifikator Cabdin Sulut
                </div>
                <p>“{{ tiket.pesan }}”</p>
              </blockquote>

              <div class="deadline">
                <span class="deadline__left">
                  <ion-icon :icon="timerOutline" />
                  Batas perbaikan: {{ tiket.batasHari }} hari kerja
                </span>
                <span>Hingga {{ tiket.batasTanggal }}</span>
              </div>
            </div>
          </section>

          <!-- Data PTK (terkunci) -->
          <section class="panel">
            <div class="panel__head">
              <h2>
                <ion-icon :icon="idCardOutline" />
                Data PTK Dapodik
              </h2>

              <span class="status status-gray">
                <ion-icon :icon="lockClosedOutline" />
                Terkunci
              </span>
            </div>

            <div class="locked">
              <div class="locked__row">
                <div>
                  <small>Nama Lengkap Guru Pembimbing</small>
                  <strong>{{ guru.nama }}</strong>
                </div>

                <span class="status status-blue">
                  <ion-icon :icon="checkmarkCircleOutline" />
                  Terverifikasi<br />NUPTK
                </span>
              </div>
            </div>

            <div class="locked">
              <small>NIP / NUPTK</small>
              <strong class="mono">{{ guru.nip }}</strong>
            </div>

            <div class="locked">
              <small>Unit Kerja</small>
              <strong class="school">
                <ion-icon :icon="schoolOutline" />
                {{ guru.sekolah }}
              </strong>
            </div>
          </section>

          <!-- Formulir koreksi -->
          <section class="panel">
            <div class="panel__head panel__head--form">
              <ion-icon :icon="createOutline" class="head-icon" />

              <div>
                <h2>Formulir Koreksi Berkas</h2>
                <p>Perbarui berkas sesuai arahan verifikator</p>
              </div>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="no-sk">Nomor SK Pembimbing</label>
                <small class="required">Wajib diisi</small>
              </div>

              <div class="input" :class="{ 'input--error': tampilError.nomor }">
                <ion-icon :icon="documentTextOutline" class="input__lead" />
                <input
                  id="no-sk"
                  v-model.trim="form.nomorSk"
                  type="text"
                  placeholder="Nomor SK Penugasan"
                  autocomplete="off"
                  :aria-invalid="!!tampilError.nomor"
                />
              </div>
              <p v-if="tampilError.nomor" class="error" role="alert">{{ tampilError.nomor }}</p>
            </div>

            <div class="field">
              <span class="label">Lampiran SK Pembimbing (Format PDF)</span>

              <!-- Berkas lama -->
              <div class="old-file">
                <span class="pdf-tile">PDF</span>

                <div class="old-file__text">
                  <strong>{{ tiket.berkasLama.nama }}</strong>
                  <small>{{ tiket.berkasLama.ukuran }} • {{ tiket.berkasLama.alasan }}</small>
                </div>

                <span class="status status-red">Perlu Diganti</span>
              </div>

              <input
                ref="berkasInput"
                type="file"
                class="sr-only"
                accept=".pdf,application/pdf"
                @change="pilihBerkas"
              />

              <!-- Berkas baru -->
              <div v-if="berkasBaru" class="new-file">
                <div class="new-file__row">
                  <span class="new-file__icon"><ion-icon :icon="documentTextOutline" /></span>

                  <div class="new-file__text">
                    <strong>{{ berkasBaru.name }}</strong>
                    <small>
                      {{ ukuranBerkas }}
                      <span class="ready"><ion-icon :icon="checkmark" /> Berkas Siap Dikirim</span>
                    </small>
                  </div>

                  <button type="button" class="remove" aria-label="Hapus berkas baru" @click="hapusBerkas">
                    <ion-icon :icon="closeOutline" />
                  </button>
                </div>

                <div class="new-file__foot">
                  <span>Maksimal 5 MB (PDF Asli)</span>
                  <button type="button" class="link" @click="berkasInput?.click()">
                    <ion-icon :icon="cloudUploadOutline" /> Pilih Berkas Lain
                  </button>
                </div>
              </div>

              <button
                v-else
                type="button"
                class="upload"
                :class="{ 'upload--error': tampilError.berkas }"
                @click="berkasInput?.click()"
              >
                <ion-icon :icon="cloudUploadOutline" />
                <strong>Pilih Berkas SK Pengganti</strong>
                <small>Maksimal 5 MB (PDF Asli, bersetempel basah)</small>
              </button>

              <p v-if="tampilError.berkas" class="error" role="alert">{{ tampilError.berkas }}</p>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="catatan">Catatan untuk Verifikator Cabdin Sulut</label>
                <small>Opsional</small>
              </div>

              <textarea
                id="catatan"
                v-model="form.catatan"
                rows="3"
                maxlength="200"
                placeholder="Tulis klarifikasi singkat..."
              />

              <div class="label-row label-row--foot">
                <small>Berikan klarifikasi jika diperlukan</small>
                <small>{{ form.catatan.length }}/200</small>
              </div>
            </div>
          </section>

          <p class="agency">
            <ion-icon :icon="checkmarkCircleOutline" />
            Dinas Pendidikan Daerah Provinsi Sulawesi Utara
          </p>

        </main>
      </div>
    </ion-content>

    <!-- Aksi tetap di bawah -->
    <div class="dock">
      <button type="button" class="btn-validate" :disabled="mengirim" :aria-busy="mengirim" @click="kirimUlang">
        <ion-icon :icon="sendOutline" />
        {{ mengirim ? 'Mengirim...' : 'Kirim Ulang Berkas Guru' }}
      </button>

      <button type="button" class="link link--center" @click="hubungiHelpdesk">
        <ion-icon :icon="headsetOutline" />
        Hubungi Helpdesk Cabdin
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
  chatboxEllipsesOutline,
  shieldCheckmarkOutline,
  timerOutline,
  idCardOutline,
  lockClosedOutline,
  checkmarkCircleOutline,
  checkmark,
  schoolOutline,
  createOutline,
  documentTextOutline,
  closeOutline,
  cloudUploadOutline,
  sendOutline,
  headsetOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data dari API tiket verifikasi
const tiket = {
  id: 'REV-GURU-1984',
  pesan:
    'SK Penugasan Guru Pembimbing belum mencantumkan stempel basah kepala sekolah. Silakan perbaiki lampiran SK.',
  batasHari: 3,
  batasTanggal: '24 Okt 2025',
  berkasLama: {
    nama: 'SK_Pembimbing_Lama_2025.pdf',
    ukuran: '980 KB',
    alasan: 'Ditolak (Tanpa stempel)'
  }
};

// Data PTK dari Dapodik (hanya-baca)
const guru = {
  nama: 'Dra. Meiske Lumintang, M.Pd',
  nip: '19740812 199903 2 004',
  sekolah: 'SMA Negeri 1 Manado'
};

const form = reactive({
  nomorSk: '800/142/SMAN1–MND/2025',
  catatan: ''
});

/* Berkas pengganti */
const berkasBaru = ref<File | null>(null);
const berkasError = ref('');
const berkasInput = ref<HTMLInputElement | null>(null);

const ukuranBerkas = computed(() => {
  if (!berkasBaru.value) return '';
  const mb = berkasBaru.value.size / (1024 * 1024);
  return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.ceil(berkasBaru.value.size / 1024) + ' KB';
});

function pilihBerkas(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  berkasError.value = '';
  if (!file) return;

  if (file.type !== 'application/pdf') {
    berkasBaru.value = null;
    berkasError.value = 'Berkas harus berformat PDF.';
  } else if (file.size > 5 * 1024 * 1024) {
    berkasBaru.value = null;
    berkasError.value = 'Ukuran berkas maksimum 5 MB.';
  } else {
    berkasBaru.value = file;
  }

  input.value = '';
}

function hapusBerkas() {
  berkasBaru.value = null;
  berkasError.value = '';
}

/* Validasi */
const dicoba = ref(false);
const mengirim = ref(false);

const tampilError = computed(() => ({
  nomor: dicoba.value && form.nomorSk.length < 3 ? 'Nomor SK Pembimbing wajib diisi.' : '',
  berkas: berkasError.value
    ? berkasError.value
    : dicoba.value && !berkasBaru.value
      ? 'Unggah SK pengganti yang sudah berstempel basah.'
      : ''
}));

async function kirimUlang() {
  if (mengirim.value) return;
  dicoba.value = true;

  if (form.nomorSk.length < 3 || !berkasBaru.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>('.input--error input, .upload--error');
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  mengirim.value = true;
  try {
    // TODO: kirim form.nomorSk, berkasBaru, dan form.catatan ke API koreksi berkas.
    // Setelah berhasil, arahkan ke halaman status akun (menunggu verifikasi).
  } finally {
    mengirim.value = false;
  }
}

function hubungiHelpdesk() {
  // TODO: buka kontak helpdesk Cabdin
  console.log('hubungi helpdesk');
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
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

.brand__text span {
  font-size: 11px;
  color: #3d4452;
}

.brand__text strong {
  font-size: 17px;
  line-height: 21px;
  font-weight: 700;
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
  gap: 14px;
  padding: 14px 14px 24px;
}

/* ---------- Status pill ---------- */

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
  background: #ffefc2;
  border: 1px solid #f0c76a;
  color: #7a4b00;
}

.status-gray {
  background: #eceff3;
  color: #50545d;
}

.status-blue {
  padding: 7px 12px;
  border-radius: 14px;
  background: #cfe3fb;
  color: #0b4fa6;
}

.status-red {
  background: #ba1a1a;
  color: #fff;
  font-weight: 700;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f0a30a;
}

/* ---------- Tiket ---------- */

.ticket {
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .05);
}

.ticket__accent {
  height: 6px;
  background: linear-gradient(90deg, #f0a30a 0%, #7a4b00 100%);
}

.ticket__body {
  padding: 14px 16px 16px;
}

.ticket__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ticket__icon {
  width: 46px;
  height: 46px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #ffe1b3;
  color: #5d3a00;
}

.ticket__icon ion-icon {
  font-size: 24px;
}

.ticket__title {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.ticket__title small {
  color: #50545d;
}

.ticket__title strong {
  margin-top: 2px;
  font-size: 14px;
  line-height: 20px;
}

.ticket__id {
  align-self: flex-start;
  flex: none;
  padding: 3px 9px;
  border-radius: 6px;
  background: #fff0c7;
  color: #5d3a00;
  font-size: 11px;
  font-weight: 700;
}

.quote {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #eef0f4;
  border-left: 4px solid #f0a30a;
}

.quote__by {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 700;
}

.quote__by ion-icon {
  font-size: 17px;
}

.quote p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 23px;
  color: #3d4452;
}

.deadline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #eceef2;
  font-size: 11px;
  color: #3d4452;
}

.deadline__left {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: #ba1a1a;
}

.deadline__left ion-icon {
  font-size: 20px;
}

/* ---------- Panel ---------- */

.panel {
  padding: 14px 16px 16px;
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
  padding-bottom: 12px;
  border-bottom: 1px solid #eceef2;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
}

.panel__head h2 ion-icon {
  font-size: 24px;
  color: #003178;
}

.panel__head--form {
  justify-content: flex-start;
  gap: 10px;
}

.panel__head--form h2 {
  font-size: 14px;
}

.panel__head--form p {
  font-size: 12px;
  color: #3d4452;
}

.head-icon {
  font-size: 26px;
  color: #003178;
}

/* Data terkunci */

.locked {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #eef0f4;
}

.locked small {
  display: block;
  color: #3d4452;
}

.locked strong {
  display: block;
  margin-top: 3px;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
}

.locked__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.mono {
  font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  font-size: 14px !important;
  font-weight: 500 !important;
}

.locked strong.school {
  display: flex;
  align-items: center;
  gap: 8px;
}

.school ion-icon {
  font-size: 22px;
  color: #00639a;
}

/* ---------- Form ---------- */

.field {
  margin-top: 16px;
}

.field label,
.label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 7px;
}

.label-row small {
  color: #606572;
}

.label-row--foot {
  margin: 6px 0 0;
}

.required {
  color: #0b4fa6 !important;
}

.label {
  margin-bottom: 8px;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 14px;
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

.input__lead {
  font-size: 22px;
  color: #3d4452;
}

.input input {
  flex: 1;
  min-width: 0;
  height: 50px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: #191c1e;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #c3c9d6;
  background: #eef0f4;
  outline: 0;
  resize: none;
  font-family: inherit;
  font-size: 13px;
  line-height: 21px;
  color: #191c1e;
}

textarea:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
  background: #fff;
}

.error {
  margin-top: 6px;
  font-size: 11px;
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

.pdf-tile {
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid #ba1a1a;
  color: #ba1a1a;
  font-size: 8px;
  font-weight: 800;
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
}

.old-file__text small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3d4452;
}

/* Berkas baru */

.new-file {
  margin-top: 10px;
  padding: 14px;
  border-radius: 14px;
  background: #f4f9ff;
  border: 2px dashed #7db5e8;
}

.new-file__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.new-file__icon {
  width: 46px;
  height: 46px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #cfe3fb;
  color: #003178;
}

.new-file__icon ion-icon {
  font-size: 24px;
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
  color: #003178;
}

.new-file__text small {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  color: #3d4452;
}

.ready {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #0b4fa6;
}

.ready ion-icon {
  font-size: 14px;
}

.remove {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.remove ion-icon {
  font-size: 22px;
}

.new-file__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #d3e3f3;
  font-size: 11px;
  color: #3d4452;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #0b4fa6;
}

.link ion-icon {
  font-size: 16px;
}

.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin-top: 10px;
  padding: 20px 14px;
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

/* ---------- Footer & dock ---------- */

.agency {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #606572;
}

.agency ion-icon {
  font-size: 18px;
}

.dock {
  padding:
    14px
    16px
    calc(env(safe-area-inset-bottom, 0px) + 10px);

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

.link--center {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
  color: #003178;
  font-size: 13px;
}

.link--center ion-icon {
  font-size: 22px;
}

.btn-validate:focus-visible,
.link:focus-visible,
.upload:focus-visible,
.remove:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

</style>