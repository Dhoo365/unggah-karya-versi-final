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
              <strong>Informasi Kontak Dapodik</strong>
              <span>SIKARYA Dikda Sulut • Akun Pendidik</span>
            </div>
          </div>
        </header>

        <main class="main">

          <!-- Status sinkronisasi -->
          <section class="sync-card">
            <div class="sync-card__icon">
              <ion-icon :icon="shieldCheckmarkOutline" />
            </div>

            <div>
              <strong>Tersinkronisasi Dapodik Kemendikbudristek</strong>

              <span class="status status-info">
                <ion-icon :icon="checkmarkCircleOutline" />
                Aktif 2024/2025 Genap
              </span>

              <p>
                Pembaruan data sinkronisasi terakhir: 14 Mei 2024, 08:32 WITA oleh Admin Dapodik
                Sekolah.
              </p>
            </div>
          </section>

          <!-- Data pokok (terkunci) -->
          <section class="panel">
            <div class="panel__head">
              <h2>
                <ion-icon :icon="lockClosedOutline" />
                Data Pokok Guru (Terkunci)
              </h2>
              <span class="status status-muted">Hanya-<br />Baca</span>
            </div>

            <div class="field">
              <label for="nama">
                Nama Lengkap &amp; Gelar <ion-icon :icon="lockClosedOutline" class="lock" />
              </label>
              <div class="input input--locked">
                <input id="nama" :value="guru.nama" readonly aria-readonly="true" />
                <ion-icon :icon="idCardOutline" class="input__trail" />
              </div>
            </div>

            <div class="field">
              <label for="nip">
                NIP / NUPTK <ion-icon :icon="lockClosedOutline" class="lock" />
              </label>
              <div class="input input--locked">
                <input id="nip" :value="guru.nip" readonly aria-readonly="true" />
                <ion-icon :icon="keypadOutline" class="input__trail" />
              </div>
            </div>

            <div class="field">
              <label for="sekolah">
                Satuan Pendidikan Induk <ion-icon :icon="lockClosedOutline" class="lock" />
              </label>
              <div class="input input--locked">
                <ion-icon :icon="schoolOutline" class="input__lead input__lead--blue" />
                <input id="sekolah" :value="guru.sekolah" readonly aria-readonly="true" />
                <small>{{ guru.kota }}</small>
              </div>
            </div>

            <div class="note">
              <ion-icon :icon="informationCircleOutline" />
              <p>
                Perubahan Nama, NIP, atau Instansi Induk hanya dapat diproses melalui Operator
                Dapodik Sekolah resmi Dinas Pendidikan Daerah Sulut.
              </p>
            </div>
          </section>

          <!-- Kontak mandiri -->
          <section class="panel">
            <div class="panel__head panel__head--line">
              <h2 class="blue">
                <ion-icon :icon="personCircleOutline" />
                Informasi Kontak Mandiri
              </h2>
              <span class="editable">Dapat Diubah</span>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="email">Email Akun Belajar.id</label>
                <span class="tag tag--sso">
                  <ion-icon :icon="shieldCheckmarkOutline" /> Terhubung SSO
                </span>
              </div>

              <div class="input" :class="{ 'input--error': emailSalah }">
                <ion-icon :icon="mailOutline" class="input__lead" />
                <input
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  autocomplete="email"
                  inputmode="email"
                />
              </div>
              <p v-if="emailSalah" class="error" role="alert">Format email belum benar.</p>
              <p class="help">Digunakan untuk notifikasi verifikasi karya dan penjurian lomba.</p>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="wa">Nomor WhatsApp / Seluler Aktif</label>
                <span class="tag tag--verified">Terverifikasi SMS/WA</span>
              </div>

              <div class="input" :class="{ 'input--error': teleponSalah }">
                <ion-icon :icon="callOutline" class="input__lead" />
                <input
                  id="wa"
                  v-model.trim="form.telepon"
                  type="tel"
                  autocomplete="tel"
                  inputmode="tel"
                />
                <button type="button" class="btn-chip" @click="ujiSms">Uji SMS</button>
              </div>
              <p v-if="teleponSalah" class="error" role="alert">
                Masukkan nomor seluler Indonesia yang valid (contoh: +62 812-3456-7890).
              </p>
              <p v-if="smsTerkirim" class="ok" role="status">Permintaan uji SMS dikirim.</p>
              <p class="help">Diperlukan untuk koordinasi teknis penganugerahan karya guru.</p>
            </div>

            <div class="field">
              <label for="alamat">Alamat Domisili Guru di Manado</label>

              <div class="input input--area" :class="{ 'input--error': alamatKosong }">
                <ion-icon :icon="locationOutline" class="input__lead input__lead--top" />
                <textarea id="alamat" v-model="form.alamat" rows="3" autocomplete="street-address" />
              </div>
              <p v-if="alamatKosong" class="error" role="alert">Alamat domisili wajib diisi.</p>
              <p class="help">Alamat pengiriman sertifikat cetak &amp; plakat penghargaan lomba.</p>
            </div>
          </section>

          <div class="actions">
            <button type="button" class="btn-validate" :disabled="!bisaSimpan" @click="simpan">
              <ion-icon :icon="saveOutline" />
              Simpan Perubahan Kontak
            </button>

            <button type="button" class="btn-outline" @click="sinkronUlang">
              <ion-icon :icon="syncOutline" />
              Sinkronisasi Ulang Dapodik
            </button>
          </div>

          <p v-if="tersimpan" class="saved" role="status">
            <ion-icon :icon="checkmarkCircle" />
            Perubahan kontak berhasil disimpan.
          </p>

          <footer class="foot">
            Dikelola secara resmi oleh Balai Penjaminan Mutu Pendidikan • Provinsi Sulawesi Utara
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  shieldCheckmarkOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  lockClosedOutline,
  idCardOutline,
  keypadOutline,
  schoolOutline,
  informationCircleOutline,
  personCircleOutline,
  mailOutline,
  callOutline,
  locationOutline,
  saveOutline,
  syncOutline
} from 'ionicons/icons';

const router = useRouter();

// Data pokok dari Dapodik (hanya-baca)
const guru = {
  nama: 'Ahmad Fauzi, S.Pd.',
  nip: '198204152008011009',
  sekolah: 'SMP Negeri 1 Manado',
  kota: 'Kota Manado'
};

// Data kontak yang bisa diubah
const awal = reactive({
  email: 'ahmad.fauzi@guru.smp.belajar.id',
  telepon: '+62 812-3456-7890',
  alamat: 'Jl. Sam Ratulangi No. 45, Wenang Utara, Kec. Wenang, Kota Manado, Sulawesi Utara 95111'
});

const form = reactive({ ...awal });

const smsTerkirim = ref(false);
const tersimpan = ref(false);

const emailSalah = computed(
  () => form.email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
);

const teleponSalah = computed(() => {
  if (!form.telepon) return false;
  const angka = form.telepon.replace(/[\s-]/g, '');
  return !/^(\+62|62|0)8\d{8,11}$/.test(angka);
});

const alamatKosong = computed(() => form.alamat.trim().length === 0);

const berubah = computed(
  () =>
    form.email !== awal.email ||
    form.telepon !== awal.telepon ||
    form.alamat !== awal.alamat
);

const bisaSimpan = computed(
  () =>
    berubah.value &&
    form.email.length > 0 &&
    form.telepon.length > 0 &&
    !emailSalah.value &&
    !teleponSalah.value &&
    !alamatKosong.value
);

function ujiSms() {
  if (teleponSalah.value || !form.telepon) return;
  // TODO: minta server mengirim SMS uji ke form.telepon
  smsTerkirim.value = true;
}

function simpan() {
  if (!bisaSimpan.value) return;
  // TODO: kirim form.email, form.telepon, form.alamat ke API
  Object.assign(awal, form);
  tersimpan.value = true;
  smsTerkirim.value = false;
}

function sinkronUlang() {
  // TODO: minta server menarik ulang data pokok dari Dapodik
  console.log('sinkronisasi ulang dapodik');
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
p {
  margin: 0;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;

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
  gap: 8px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10px;
  color: #606572;
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
  padding: 14px 14px 28px;
}

/* ---------- Status ---------- */

.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
}

.status ion-icon {
  font-size: 13px;
}

.status-info {
  background: #dce7ff;
  color: #0b4fa6;
}

.status-muted {
  padding: 6px 10px;
  border-radius: 8px;
  background: #eceff3;
  color: #50545d;
  font-weight: 600;
}

/* ---------- Kartu sinkronisasi ---------- */

.sync-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.sync-card__icon {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #dce7ff;
  color: #003178;
}

.sync-card strong {
  display: block;
  font-size: 14px;
  line-height: 20px;
}

.sync-card .status {
  margin-top: 6px;
}

.sync-card p {
  margin-top: 6px;
  font-size: 11px;
  line-height: 16px;
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
  padding-bottom: 10px;
  border-bottom: 1px solid #eceef2;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
}

.panel__head h2 ion-icon {
  font-size: 22px;
}

.panel__head--line h2 {
  font-size: 15px;
}

.editable {
  flex: none;
  font-size: 11px;
  font-weight: 700;
  color: #0b4fa6;
}

/* ---------- Field ---------- */

.field {
  margin-top: 14px;
}

.field label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 7px;
  font-size: 11px;
  font-weight: 700;
  color: #3d4452;
}

.lock {
  font-size: 12px;
  color: #747985;
}

.label-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
}

.tag ion-icon {
  font-size: 12px;
}

.tag--sso {
  color: #0b4fa6;
}

.tag--verified {
  padding: 3px 9px;
  border-radius: 20px;
  background: #dce7ff;
  color: #0b4fa6;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 50px;
  padding: 0 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #c3c9d6;
}

.input:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.input--locked {
  background: #eef0f4;
  border-color: #dfe2e8;
}

.input--locked:focus-within {
  border-color: #dfe2e8;
  box-shadow: none;
}

.input--error,
.input--error:focus-within {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.input--area {
  align-items: flex-start;
  padding: 12px;
}

.input__lead {
  font-size: 22px;
  color: #565c69;
}

.input__lead--blue {
  color: #00639a;
}

.input__lead--top {
  margin-top: 2px;
}

.input__trail {
  font-size: 22px;
  color: #565c69;
}

.input input,
.input textarea {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: #191c1e;
}

.input input {
  height: 48px;
}

.input--locked input {
  font-weight: 600;
}

.input textarea {
  resize: none;
  line-height: 21px;
}

.input small {
  flex: none;
  font-size: 11px;
  color: #3d4452;
}

.btn-chip {
  flex: none;
  padding: 6px 11px;
  border-radius: 8px;
  background: #e8ebf0;
  color: #3d4452;
  font-size: 11px;
  font-weight: 700;
}

.help {
  margin-top: 6px;
  font-size: 11px;
  line-height: 16px;
  color: #50545d;
}

.error {
  margin-top: 6px;
  font-size: 11px;
  color: #ba1a1a;
}

.ok {
  margin-top: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #087443;
}

/* ---------- Catatan ---------- */

.note {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding: 14px;
  border-radius: 10px;
  background: #f0f2f5;
}

.note ion-icon {
  margin-top: 1px;
  color: #565c69;
}

.note p {
  font-size: 11px;
  line-height: 17px;
  color: #3d4452;
}

/* ---------- Tombol ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
}

.actions ion-icon {
  font-size: 22px;
}

.btn-validate {
  background: #0d47a1;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 49, 120, .18);
}

.btn-validate:disabled {
  opacity: .45;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-outline {
  border: 1px solid #c3c9d6;
  background: #fff;
  color: #0d47a1;
}

.btn-validate:focus-visible,
.btn-outline:focus-visible,
.btn-chip:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

.saved {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #087443;
}

.saved ion-icon {
  font-size: 18px;
}

.foot {
  padding: 0 8px;
  text-align: center;
  font-size: 11px;
  line-height: 16px;
  color: #747985;
}

</style>