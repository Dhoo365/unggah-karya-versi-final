<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <span class="logo"><ion-icon :icon="shieldCheckmarkOutline" /></span>

            <div class="brand__text">
              <span>SIKARYA SULUT</span>
              <strong>Login Administrator</strong>
            </div>
          </div>
        </header>

        <main class="main">

          <!-- Hero -->
          <section class="hero">
            <div class="app-tile">
              <ion-icon :icon="imagesOutline" class="app-tile__icon" />
              <span class="app-tile__badge"><ion-icon :icon="shieldCheckmark" /></span>
            </div>

            <span class="pill">
              <ion-icon :icon="shieldOutline" />
              SISTEM TERPROTEKSI • AKSES KHUSUS ADMINISTRATOR
            </span>

            <h1>Login Portal Administrator</h1>

            <p>
              Masuk dengan NIP/ID Dinas dan Kredensial Resmi Dikda Sulut Wilayah Kota Manado.
            </p>
          </section>

          <!-- Zona resmi -->
          <section class="zone">
            <span class="zone__icon"><ion-icon :icon="shieldCheckmarkOutline" /></span>

            <div>
              <div class="zone__title">
                DISDIKBUD KOTA MANADO <i class="dot"></i> <em>Zona Resmi</em>
              </div>

              <p>
                Khusus Tim Pengelola Lomba, Verifikator Dapodik, dan Admin Cabang Dinas
                Pendidikan Sulawesi Utara.
              </p>
            </div>
          </section>

          <form class="form" novalidate @submit.prevent="masuk">

            <div class="field">
              <div class="label-row">
                <label for="nip">Nomor Induk Pegawai (NIP) / ID Petugas</label>
                <small class="req">Wajib ASN/PPPK</small>
              </div>

              <div class="input" :class="{ 'input--error': show('nip') }">
                <ion-icon :icon="idCardOutline" class="input__lead" />
                <input
                  id="nip"
                  v-model="form.nip"
                  type="text"
                  inputmode="numeric"
                  maxlength="18"
                  placeholder="198503122010011008"
                  autocomplete="username"
                  :aria-invalid="!!show('nip')"
                  @blur="touched.nip = true"
                />
              </div>
              <p v-if="show('nip')" class="error" role="alert">{{ show('nip') }}</p>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="sandi">Kata Sandi Dinas</label>
                <small>Enkripsi 256-Bit</small>
              </div>

              <div class="input" :class="{ 'input--error': show('sandi') }">
                <ion-icon :icon="lockClosedOutline" class="input__lead" />
                <input
                  id="sandi"
                  v-model="form.sandi"
                  :type="lihat ? 'text' : 'password'"
                  placeholder="Masukkan kata sandi dinas"
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

            <div class="field">
              <label for="unit" class="label-solo">Unit Kerja Otoritas</label>

              <div class="input input--select" :class="{ 'input--error': show('unit') }">
                <ion-icon :icon="businessOutline" class="input__lead" />
                <select
                  id="unit"
                  v-model="form.unit"
                  :aria-invalid="!!show('unit')"
                  @blur="touched.unit = true"
                >
                  <option v-for="u in unitList" :key="u" :value="u">{{ u }}</option>
                </select>
                <ion-icon :icon="chevronDownOutline" class="input__trail" />
              </div>
              <p v-if="show('unit')" class="error" role="alert">{{ show('unit') }}</p>
            </div>

            <div class="row">
              <label class="check">
                <input v-model="form.ingat" type="checkbox" />
                <span class="check__box"><ion-icon :icon="checkmark" /></span>
                <span>Ingat Perangkat Ini</span>
              </label>

              <button type="button" class="link" @click="lupaKredensial">Lupa Kredensial?</button>
            </div>

            <p v-if="galat" class="alert" role="alert">{{ galat }}</p>

            <button type="submit" class="btn-validate" :disabled="memproses" :aria-busy="memproses">
              Masuk ke Dashboard Pengelola
              <ion-icon :icon="arrowForward" />
            </button>

            <button type="button" class="btn-soft" :disabled="memproses" @click="masukSso">
              <ion-icon :icon="gitNetworkOutline" />
              Masuk via SSO ASN Digital Sulut
            </button>

          </form>

          <!-- Audit -->
          <section class="audit">
            <div class="audit__title">
              <ion-icon :icon="hammerOutline" />
              PERHATIAN AUDIT KEAMANAN
            </div>

            <p>
              Seluruh aktivitas login dan perubahan data oleh administrator dicatat dalam log
              audit resmi. Penyalahgunaan akses akan ditindaklanjuti sesuai ketentuan
              Disdikbud Sulut.
            </p>
          </section>

          <footer class="foot">
            <p class="help">
              <ion-icon :icon="headsetOutline" />
              Bantuan Teknis IT Balai Tekkomdik:
              <a href="tel:+624318517782"><strong>(0431) 851-7782</strong></a>
            </p>

            <button type="button" class="back" @click="keLoginPengguna">
              <ion-icon :icon="arrowBack" />
              Bukan Administrator? Kembali ke Portal Siswa &amp; Guru
            </button>

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
  shieldCheckmarkOutline,
  shieldCheckmark,
  shieldOutline,
  imagesOutline,
  idCardOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  businessOutline,
  chevronDownOutline,
  checkmark,
  gitNetworkOutline,
  hammerOutline,
  headsetOutline,
  informationCircleOutline,
  closeOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan daftar unit kerja otoritas resmi
const unitList = [
  'Disdikbud Kota Manado - Seksi Pembinaan',
  'Disdikbud Kota Manado - Verifikator Dapodik',
  'Cabang Dinas Pendidikan Sulut - Admin Wilayah'
];

const form = reactive({
  nip: '',
  sandi: '',
  unit: unitList[0],
  ingat: false
});

const lihat = ref(false);
const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const memproses = ref(false);
const pesan = ref('');
const galat = ref('');

/* NIP hanya angka, maksimal 18 digit */
watch(
  () => form.nip,
  (v) => {
    const bersih = v.replace(/\D/g, '').slice(0, 18);
    if (bersih !== v) form.nip = bersih;
  }
);

const errors = computed<Record<string, string>>(() => ({
  nip: /^\d{18}$/.test(form.nip) ? '' : 'NIP harus 18 digit angka.',
  sandi: form.sandi.length > 0 ? '' : 'Kata sandi dinas wajib diisi.',
  unit: form.unit ? '' : 'Pilih unit kerja otoritas.'
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
  pesan.value = 'Memproses otentikasi ASN...';

  try {
    // TODO: kirim { nip: form.nip, sandi: form.sandi, unit: form.unit, ingat: form.ingat } ke API login admin.
    // Jangan menulis kata sandi ke console atau log.
    // Jika berhasil: router.replace('/admin/beranda') (sesuaikan route).
    // Jika gagal: galat.value = 'NIP atau kata sandi tidak sesuai.';
  } finally {
    memproses.value = false;
    pesan.value = '';
  }
}

function masukSso() {
  if (memproses.value) return;
  // TODO: mulai alur SSO ASN Digital Sulut (OAuth/OIDC)
  pesan.value = 'Mengalihkan ke SSO ASN Digital Sulut...';
}

function lupaKredensial() {
  // TODO: buka alur pemulihan kredensial / hubungi admin pusat
  console.log('lupa kredensial');
}

function keLoginPengguna() {
  // TODO: sesuaikan dengan route halaman login siswa & guru Anda
  router.push('/login');
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
  font-weight: 500;
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
  background: #0d47a1;
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
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .5px;
  line-height: 17px;
  color: #191c1e;
}

.pill ion-icon {
  font-size: 18px;
  color: #003178;
}

.hero h1 {
  margin-top: 14px;
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  letter-spacing: -.3px;
  color: #003178;
}

.hero p {
  margin-top: 8px;
  padding: 0 8px;
  font-size: 13px;
  line-height: 22px;
  color: #3d4452;
}

/* ---------- Zona resmi ---------- */

.zone {
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 18px;
  background: #0d47a1;
  color: #fff;
  box-shadow: 0 4px 14px rgba(13, 71, 161, .28);
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
  font-size: 14px;
  font-weight: 700;
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
  font-size: 13px;
  line-height: 22px;
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
  font-size: 15px;
  font-weight: 500;
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
  font-weight: 600;
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
  font-size: 16px;
  color: #191c1e;
}

.input input::placeholder {
  color: #b3b8c2;
}

.input--select {
  background: #f4f6f9;
  border: 1px solid #e3e6ec;
}

.input select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 15px;
}

.input__lead {
  font-size: 26px;
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
  font-size: 26px;
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
  font-weight: 500;
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
  font-size: 16px;
}

.btn-validate {
  min-height: 62px;
  background: #00307a;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .25);
}

.btn-soft {
  min-height: 56px;
  margin-top: -6px;
  background: #cfe3fb;
  color: #00307a;
  font-weight: 500;
}

.btn-validate ion-icon,
.btn-soft ion-icon {
  font-size: 24px;
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

/* ---------- Audit ---------- */

.audit {
  padding: 16px;
  border-radius: 14px;
  background: #fddcd9;
  border: 1px solid #f5c0bb;
}

.audit__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .4px;
  color: #93000a;
}

.audit__title ion-icon {
  font-size: 22px;
}

.audit p {
  margin-top: 8px;
  font-size: 13px;
  line-height: 22px;
  color: #93000a;
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
  gap: 6px;
  font-size: 13px;
  color: #191c1e;
}

.help ion-icon {
  font-size: 18px;
}

.help a {
  color: inherit;
  text-decoration: none;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #0b3a8f;
  text-align: left;
}

.back ion-icon {
  font-size: 18px;
}

.foot small {
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 19px;
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