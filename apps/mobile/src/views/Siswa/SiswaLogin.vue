<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <span class="logo"><ion-icon :icon="ribbonOutline" /></span>

            <div class="brand__text">
              <span>SIKARYA SULUT</span>
              <strong>Login Siswa Peserta</strong>
            </div>
          </div>
        </header>

        <main class="main">

          <!-- Hero -->
          <section class="hero">
            <div class="app-tile">
              <ion-icon :icon="trophyOutline" class="app-tile__icon" />
              <span class="app-tile__badge"><ion-icon :icon="checkmarkCircle" /></span>
            </div>

            <span class="pill">
              <ion-icon :icon="schoolOutline" />
              PORTAL PESERTA • SINKRONISASI DAPODIK SISWA
            </span>

            <h1>Login Portal Siswa</h1>

            <p>
              Masuk menggunakan 10 digit NISN terdaftar untuk mendaftar cabang lomba, mengunggah karya, dan memantau sertifikat.
            </p>
          </section>

          <!-- Zona Siswa -->
          <section class="zone">
            <span class="zone__icon"><ion-icon :icon="shieldCheckmarkOutline" /></span>

            <div>
              <div class="zone__title">
                AKUN PESERTA DIDIK <i class="dot"></i> <em>Dapodik Sulut</em>
              </div>

              <p>
                Terbuka untuk seluruh siswa jenjang SMP/MTs, SMA/MA, SMK, dan SLB aktif di Provinsi Sulawesi Utara.
              </p>
            </div>
          </section>

          <form class="form" novalidate @submit.prevent="masuk">

            <!-- NISN -->
            <div class="field">
              <div class="label-row">
                <label for="nisn">Nomor Induk Siswa Nasional (NISN)</label>
                <small class="req">10 Digit Angka</small>
              </div>

              <div class="input" :class="{ 'input--error': show('nisn') }">
                <ion-icon :icon="idCardOutline" class="input__lead" />
                <input
                  id="nisn"
                  v-model="form.nisn"
                  type="text"
                  inputmode="numeric"
                  maxlength="10"
                  placeholder="Contoh: 0064821901"
                  autocomplete="username"
                  :aria-invalid="!!show('nisn')"
                  @blur="touched.nisn = true"
                />
              </div>
              <p v-if="show('nisn')" class="error" role="alert">{{ show('nisn') }}</p>
            </div>

            <!-- Kata Sandi -->
            <div class="field">
              <div class="label-row">
                <label for="sandi">Kata Sandi Siswa</label>
                <small>Enkripsi 256-Bit</small>
              </div>

              <div class="input" :class="{ 'input--error': show('sandi') }">
                <ion-icon :icon="lockClosedOutline" class="input__lead" />
                <input
                  id="sandi"
                  v-model="form.sandi"
                  :type="lihat ? 'text' : 'password'"
                  placeholder="Masukkan kata sandi portal"
                  autocomplete="current-password"
                  :aria-invalid="!!show('sandi')"
                  @blur="touched.sandi = true"
                />
                <button
                  type="button"
                  class="input__eye"
                  :aria-label="lihat ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  :aria-pressed="lihat"
                  @click="lihat = !lihat"
                >
                  <ion-icon :icon="lihat ? eyeOffOutline : eyeOutline" />
                </button>
              </div>
              <p v-if="show('sandi')" class="error" role="alert">{{ show('sandi') }}</p>
            </div>

            <!-- Jenjang Pendidikan -->
            <div class="field">
              <label for="jenjang" class="label-solo">Jenjang Pendidikan</label>

              <div class="input input--select" :class="{ 'input--error': show('jenjang') }">
                <ion-icon :icon="businessOutline" class="input__lead" />
                <select
                  id="jenjang"
                  v-model="form.jenjang"
                  :aria-invalid="!!show('jenjang')"
                  @blur="touched.jenjang = true"
                >
                  <option v-for="j in jenjangList" :key="j" :value="j">{{ j }}</option>
                </select>
                <ion-icon :icon="chevronDownOutline" class="input__trail" />
              </div>
              <p v-if="show('jenjang')" class="error" role="alert">{{ show('jenjang') }}</p>
            </div>

            <div class="row">
              <label class="check">
                <input v-model="form.ingat" type="checkbox" />
                <span class="check__box"><ion-icon :icon="checkmark" /></span>
                <span>Ingat Perangkat Ini</span>
              </label>

              <button type="button" class="link" @click="lupaSandi">Lupa Kata Sandi?</button>
            </div>

            <p v-if="galat" class="alert" role="alert">{{ galat }}</p>

            <button type="submit" class="btn-validate" :disabled="memproses" :aria-busy="memproses">
              Masuk ke Portal Karya Siswa
              <ion-icon :icon="arrowForward" />
            </button>

            <button type="button" class="btn-soft" :disabled="memproses" @click="masukBelajarId">
              <ion-icon :icon="logoGoogle" />
              Masuk dengan Akun belajar.id
            </button>

          </form>

          <!-- Info Aktivasi & Bantuan -->
          <section class="info-note">
            <div class="info-note__title">
              <ion-icon :icon="informationCircleOutline" />
              BELUM MEMILIKI AKUN ATAU LUPA SANDI?
            </div>

            <p>
              Akun siswa otomatis terhubung dengan data NISN Dapodik sekolah. Hubungi <strong>Operator Dapodik / Tata Usaha Sekolah</strong> jika NISN belum aktif atau butuh reset kata sandi.
            </p>
          </section>

          <footer class="foot">
            <p class="help">
              <ion-icon :icon="helpCircleOutline" />
              Butuh panduan pendaftaran?
              <button type="button" class="link-inline" @click="keBantuan">
                <strong>Buka Pusat Bantuan</strong>
              </button>
            </p>

            <div class="role-links">
              <button type="button" class="back" @click="keLoginGuru">
                <ion-icon :icon="schoolOutline" />
                Login Guru Pembimbing
              </button>
              <span class="sep">•</span>
              <button type="button" class="back" @click="keLoginAdmin">
                <ion-icon :icon="shieldCheckmarkOutline" />
                Login Admin
              </button>
            </div>

            <small>
              SIKARYA V2.4 • DINAS PENDIDIKAN DAERAH PROVINSI SULAWESI UTARA
            </small>
          </footer>

        </main>
      </div>
    </ion-content>

    <!-- Snackbar proses -->
    <Transition name="snack">
      <div v-if="pesan" class="snack" role="status">
        <ion-icon :icon="informationCircleOutline" class="snack__icon" />
        <span>{{ pesan }}</span>
        <button type="button" class="snack__close" aria-label="Tutup pesan" @click="pesan = ''">
          <ion-icon :icon="closeOutline" />
        </button>
      </div>
    </Transition>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  arrowForward,
  ribbonOutline,
  trophyOutline,
  checkmarkCircle,
  schoolOutline,
  shieldCheckmarkOutline,
  idCardOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  businessOutline,
  chevronDownOutline,
  checkmark,
  logoGoogle,
  informationCircleOutline,
  helpCircleOutline,
  closeOutline
} from 'ionicons/icons';

const router = useRouter();

const jenjangList = [
  'SMA / MA (Sekolah Menengah Atas)',
  'SMK (Sekolah Menengah Kejuruan)',
  'SMP / MTs (Sekolah Menengah Pertama)',
  'SLB (Sekolah Luar Biasa)'
];

const form = reactive({
  nisn: '',
  sandi: '',
  jenjang: jenjangList[0],
  ingat: false
});

const lihat = ref(false);
const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const memproses = ref(false);
const pesan = ref('');
const galat = ref('');

/* NISN hanya angka, maksimal 10 digit */
watch(
  () => form.nisn,
  (v) => {
    const bersih = v.replace(/\D/g, '').slice(0, 10);
    if (bersih !== v) form.nisn = bersih;
  }
);

const errors = computed<Record<string, string>>(() => ({
  nisn: /^\d{10}$/.test(form.nisn) ? '' : 'NISN harus terdiri dari 10 digit angka.',
  sandi: form.sandi.length > 0 ? '' : 'Kata sandi siswa wajib diisi.',
  jenjang: form.jenjang ? '' : 'Pilih jenjang pendidikan Anda.'
}));

function show(key: string) {
  return touched[key] || dicoba.value ? errors.value[key] : '';
}

async function masuk() {
  if (memproses.value) return;
  dicoba.value = true;
  galat.value = '';

  if (Object.values(errors.value).some((e) => e)) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>('.input--error input, .input--error select');
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  memproses.value = true;
  pesan.value = 'Memverifikasi NISN dengan Dapodik...';

  try {
    // TODO: kirim { nisn: form.nisn, sandi: form.sandi, jenjang: form.jenjang, ingat: form.ingat } ke API login siswa.
    // Jika berhasil: router.replace('/beranda');
    // Jika gagal: galat.value = 'NISN atau kata sandi tidak sesuai.';
  } finally {
    memproses.value = false;
    pesan.value = '';
  }
}

function masukBelajarId() {
  if (memproses.value) return;
  // TODO: mulai alur OAuth SSO akun belajar.id siswa
  pesan.value = 'Menghubungkan ke akun belajar.id...';
}

function lupaSandi() {
  router.push('/keamanan-akun');
}

function keBantuan() {
  router.push('/bantuan');
}

function keLoginGuru() {
  router.push('/login-guru');
}

function keLoginAdmin() {
  router.push('/login-admin');
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
  gap: 10px;
}

.logo {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #0d47a1;
  color: #fff;
}

.logo ion-icon {
  font-size: 24px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text span {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .8px;
  color: #0b3a8f;
}

.brand__text strong {
  font-size: 17px;
  line-height: 21px;
  font-weight: 600;
  color: #191c1e;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #191c1e;
}

.icon-btn ion-icon {
  font-size: 26px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 16px 30px;
}

/* ---------- Hero ---------- */

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.app-tile {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 26px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(0, 49, 120, .16);
}

.app-tile__icon {
  font-size: 52px;
  color: #0b5cad;
}

.app-tile__badge {
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #00639a;
  color: #fff;
}

.app-tile__badge ion-icon {
  font-size: 18px;
}

.pill {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 10px 16px;
  border-radius: 24px;
  background: #dbe3ff;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: .4px;
  line-height: 17px;
  color: #003178;
}

.pill ion-icon {
  font-size: 18px;
  color: #003178;
}

.hero h1 {
  margin-top: 14px;
  font-size: 24px;
  line-height: 30px;
  font-weight: 800;
  letter-spacing: -.3px;
  color: #003178;
}

.hero p {
  margin-top: 8px;
  padding: 0 8px;
  font-size: 13px;
  line-height: 21px;
  color: #3d4452;
}

/* ---------- Zona Siswa ---------- */

.zone {
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #003178 0%, #00639a 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(0, 49, 120, .24);
}

.zone::after {
  content: '';
  position: absolute;
  right: -40px;
  bottom: -60px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .07);
}

.zone__icon {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, .14);
  color: #ffc83d;
}

.zone__icon ion-icon {
  font-size: 24px;
}

.zone > div:last-child {
  position: relative;
  z-index: 1;
}

.zone__title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: .3px;
}

.zone__title em {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  color: #bcd3ff;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f5b400;
}

.zone p {
  margin-top: 6px;
  font-size: 12.5px;
  line-height: 20px;
  color: #e6efff;
}

/* ---------- Form ---------- */

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 6px;
}

.field label {
  font-size: 14.5px;
  font-weight: 600;
  color: #191c1e;
}

.label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.label-row small {
  flex: none;
  font-size: 12px;
  color: #606572;
}

.label-row small.req {
  font-weight: 700;
  color: #0b4fa6;
}

.label-solo {
  display: block;
  margin-bottom: 10px;
}

.input {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 58px;
  padding: 0 16px;
  border-radius: 16px;
  background: #eef0f4;
  border: 1px solid transparent;
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

.input input,
.input select {
  flex: 1;
  min-width: 0;
  height: 56px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 15.5px;
  color: #191c1e;
}

.input input::placeholder {
  color: #9ba1ae;
}

.input--select {
  background: #f4f6f9;
  border: 1px solid #e3e6ec;
}

.input select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 14.5px;
}

.input__lead {
  font-size: 25px;
  color: #3d4452;
}

.input__trail {
  font-size: 20px;
  color: #3d4452;
  pointer-events: none;
}

.input__eye {
  display: flex;
  padding: 4px;
  color: #3d4452;
}

.input__eye ion-icon {
  font-size: 25px;
}

.error {
  margin-top: 6px;
  font-size: 12px;
  color: #ba1a1a;
}

.alert {
  padding: 12px 14px;
  border-radius: 12px;
  background: #fdeaea;
  border: 1px solid #f0b8b8;
  font-size: 13px;
  color: #93000a;
}

/* ---------- Baris ingat ---------- */

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.check {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
}

.check input {
  position: absolute;
  opacity: 0;
}

.check__box {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #e3e6ec;
  color: transparent;
}

.check__box ion-icon {
  font-size: 20px;
}

.check input:checked + .check__box {
  background: #0d47a1;
  color: #fff;
}

.check input:focus-visible + .check__box {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

.link {
  font-size: 14px;
  font-weight: 600;
  color: #0b4fa6;
}

/* ---------- Tombol ---------- */

.btn-validate,
.btn-soft {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  border-radius: 14px;
  font-size: 15.5px;
}

.btn-validate {
  min-height: 60px;
  background: #003178;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .25);
}

.btn-soft {
  min-height: 54px;
  margin-top: -6px;
  background: #cfe3fb;
  color: #003178;
  font-weight: 700;
}

.btn-validate ion-icon,
.btn-soft ion-icon {
  font-size: 22px;
}

.btn-validate:disabled,
.btn-soft:disabled {
  opacity: .65;
  cursor: progress;
}

.btn-validate:focus-visible,
.btn-soft:focus-visible,
.link:focus-visible,
.back:focus-visible,
.input__eye:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Info Note ---------- */

.info-note {
  padding: 16px;
  border-radius: 14px;
  background: #eef5ff;
  border: 1px solid #c5dbf8;
}

.info-note__title {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: .4px;
  color: #003178;
}

.info-note__title ion-icon {
  font-size: 20px;
  color: #0b4fa6;
}

.info-note p {
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 20px;
  color: #3d4452;
}

/* ---------- Footer ---------- */

.foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 4px;
  text-align: center;
}

.help {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  font-size: 13px;
  color: #191c1e;
}

.help ion-icon {
  font-size: 18px;
  color: #0b4fa6;
}

.link-inline {
  color: #003178;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.role-links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.sep {
  color: #9ba1ae;
  font-weight: 700;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 20px;
  color: #0b3a8f;
}

.back ion-icon {
  font-size: 17px;
}

.foot small {
  font-size: 11.5px;
  letter-spacing: .9px;
  line-height: 18px;
  color: #747985;
}

/* ---------- Snackbar ---------- */

.snack {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 20px);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #2f3133;
  color: #f1f3f5;
  font-size: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, .3);
}

.snack span {
  flex: 1;
}

.snack__icon {
  font-size: 24px;
  color: #f5b400;
}

.snack__close {
  display: flex;
  padding: 4px;
  color: #d4d8de;
}

.snack__close ion-icon {
  font-size: 22px;
}

.snack-enter-active,
.snack-leave-active {
  transition: opacity .2s ease, transform .2s ease;
}

.snack-enter-from,
.snack-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (prefers-reduced-motion: reduce) {
  .snack-enter-active,
  .snack-leave-active {
    transition: opacity .01s;
  }

  .snack-enter-from,
  .snack-leave-to {
    transform: none;
  }
}
</style>