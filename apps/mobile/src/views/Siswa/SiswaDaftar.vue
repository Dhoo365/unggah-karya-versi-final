<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <span class="logo"><ion-icon :icon="schoolOutline" /></span>

            <div class="brand__text">
              <strong>SIKARYA Dikda Sulut</strong>
              <span>SULAWESI UTARA</span>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Bantuan">
            <ion-icon :icon="helpCircleOutline" />
          </button>
        </header>

        <main class="main">

          <!-- Pengantar -->
          <section class="intro">
            <span class="status status-info">
              <ion-icon :icon="personOutline" />
              Akun Resmi Peserta
            </span>

            <h1>Daftar Akun Siswa Baru</h1>

            <p>
              Registrasi peserta lomba talenta &amp; karya seni tingkat SMA/SMK/SLB se-Sulawesi
              Utara.
            </p>
          </section>

          <section class="note">
            <ion-icon :icon="informationCircleOutline" />

            <div>
              <strong>Validasi Data Dapodik</strong>
              <p>
                Pastikan NISN aktif dan terdaftar di Dapodik untuk validasi otomatis delegasi
                sekolah dan pembuatan nomor peserta kompetisi.
              </p>
            </div>
          </section>

          <form class="form" novalidate @submit.prevent="kirim">

            <!-- Identitas -->
            <h2 class="step"><ion-icon :icon="idCardOutline" /> Identitas Siswa Dapodik</h2>

            <div class="field">
              <label for="nisn">Nomor Induk Siswa Nasional (NISN) <b>*</b></label>

              <div class="input input--action" :class="{ 'input--error': show('nisn') }">
                <ion-icon :icon="keypadOutline" class="input__lead" />
                <input
                  id="nisn"
                  v-model="form.nisn"
                  type="text"
                  inputmode="numeric"
                  maxlength="10"
                  placeholder="10 digit NISN aktif"
                  autocomplete="off"
                  :aria-invalid="!!show('nisn')"
                  @blur="touched.nisn = true"
                />

                <button
                  type="button"
                  class="btn-inline"
                  :disabled="!/^\d{10}$/.test(form.nisn)"
                  @click="cekDapodik"
                >
                  <ion-icon :icon="checkmarkCircleOutline" />
                  Cek Dapodik
                </button>
              </div>

              <p v-if="show('nisn')" class="error" role="alert">{{ show('nisn') }}</p>
              <p class="help">Ketik 10 angka NISN Anda lalu klik tombol Cek Dapodik.</p>
            </div>

            <div class="field">
              <label for="nama">Nama Lengkap Siswa <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('nama') }">
                <ion-icon :icon="personOutline" class="input__lead" />
                <input
                  id="nama"
                  v-model.trim="form.nama"
                  type="text"
                  placeholder="Nama sesuai kartu identitas / akta"
                  autocomplete="name"
                  :aria-invalid="!!show('nama')"
                  @blur="touched.nama = true"
                />
              </div>
              <p v-if="show('nama')" class="error" role="alert">{{ show('nama') }}</p>
            </div>

            <!-- Satuan pendidikan -->
            <h2 class="step"><ion-icon :icon="businessOutline" /> Satuan Pendidikan &amp; Wilayah</h2>

            <div class="field">
              <span class="label" id="jenjang-label">Jenjang Pendidikan <b>*</b></span>

              <div class="levels" role="radiogroup" aria-labelledby="jenjang-label">
                <label
                  v-for="j in jenjangList"
                  :key="j.key"
                  class="level"
                  :class="{ 'level--on': form.jenjang === j.key, 'level--error': show('jenjang') }"
                >
                  <input v-model="form.jenjang" type="radio" name="jenjang" :value="j.key" />
                  <ion-icon v-if="form.jenjang === j.key" :icon="checkmarkCircle" class="level__check" />
                  <strong>{{ j.label }}</strong>
                  <small>{{ j.desc }}</small>
                </label>
              </div>

              <p v-if="show('jenjang')" class="error" role="alert">{{ show('jenjang') }}</p>
            </div>

            <div class="field">
              <label for="cabdin">Wilayah Cabang Dinas (Cabdin) <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('cabdin') }">
                <ion-icon :icon="mapOutline" class="input__lead" />
                <select
                  id="cabdin"
                  v-model="form.cabdin"
                  :class="{ 'is-empty': !form.cabdin }"
                  :aria-invalid="!!show('cabdin')"
                  @blur="touched.cabdin = true"
                >
                  <option value="" disabled>Pilih Wilayah Cabang Dinas</option>
                  <option v-for="c in cabdinList" :key="c" :value="c">{{ c }}</option>
                </select>
                <ion-icon :icon="chevronDownOutline" class="input__trail" />
              </div>
              <p v-if="show('cabdin')" class="error" role="alert">{{ show('cabdin') }}</p>
            </div>

            <div class="field">
              <label for="sekolah">Asal Sekolah <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('sekolah') }">
                <ion-icon :icon="schoolOutline" class="input__lead" />
                <input
                  id="sekolah"
                  v-model.trim="form.sekolah"
                  type="text"
                  placeholder="Contoh: SMAN 1 Manado / SMKN 2 Bitung"
                  autocomplete="organization"
                  :aria-invalid="!!show('sekolah')"
                  @blur="touched.sekolah = true"
                />
              </div>
              <p v-if="show('sekolah')" class="error" role="alert">{{ show('sekolah') }}</p>
            </div>

            <div class="field">
              <label for="kelas">Kelas &amp; Konsentrasi Keahlian / Jurusan <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('kelas') }">
                <ion-icon :icon="bookmarkOutline" class="input__lead" />
                <input
                  id="kelas"
                  v-model.trim="form.kelas"
                  type="text"
                  placeholder="Contoh: XII Rekayasa Perangkat Lunak / XI IPA"
                  :aria-invalid="!!show('kelas')"
                  @blur="touched.kelas = true"
                />
              </div>
              <p v-if="show('kelas')" class="error" role="alert">{{ show('kelas') }}</p>
            </div>

            <!-- Kontak -->
            <h2 class="step"><ion-icon :icon="lockClosedOutline" /> Kontak &amp; Keamanan Akun</h2>

            <div class="field">
              <label for="email">Alamat Email Aktif <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('email') }">
                <ion-icon :icon="mailOutline" class="input__lead" />
                <input
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  inputmode="email"
                  placeholder="nama.siswa@gmail.com"
                  autocomplete="email"
                  :aria-invalid="!!show('email')"
                  @blur="touched.email = true"
                />
              </div>
              <p v-if="show('email')" class="error" role="alert">{{ show('email') }}</p>
              <p class="help">
                Sertifikat penghargaan digital dan berkas kurasi akan dikirimkan ke email ini.
              </p>
            </div>

            <div class="field">
              <label for="wa">Nomor WhatsApp Aktif <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('wa') }">
                <ion-icon :icon="chatbubbleEllipsesOutline" class="input__lead" />
                <input
                  id="wa"
                  v-model.trim="form.wa"
                  type="tel"
                  inputmode="tel"
                  placeholder="+62 812 3456 7890"
                  autocomplete="tel"
                  :aria-invalid="!!show('wa')"
                  @blur="touched.wa = true"
                />
              </div>
              <p v-if="show('wa')" class="error" role="alert">{{ show('wa') }}</p>
            </div>

            <div class="field">
              <label for="sandi">Kata Sandi Baru <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('sandi') }">
                <ion-icon :icon="keyOutline" class="input__lead" />
                <input
                  id="sandi"
                  v-model="form.sandi"
                  :type="lihat.sandi ? 'text' : 'password'"
                  placeholder="Minimal 8 karakter (huruf & angka)"
                  autocomplete="new-password"
                  :aria-invalid="!!show('sandi')"
                  @blur="touched.sandi = true"
                />
                <button
                  type="button"
                  class="input__eye"
                  :aria-label="lihat.sandi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  :aria-pressed="lihat.sandi"
                  @click="lihat.sandi = !lihat.sandi"
                >
                  <ion-icon :icon="lihat.sandi ? eyeOffOutline : eyeOutline" />
                </button>
              </div>

              <div class="meter" aria-live="polite">
                <div class="meter__bars" aria-hidden="true">
                  <i v-for="n in 3" :key="n" :class="{ on: kekuatan.skor >= n }" :data-level="kekuatan.skor"></i>
                </div>

                <div class="meter__text">
                  <span>Kekuatan Sandi</span>
                  <strong v-if="form.sandi" :data-level="kekuatan.skor">{{ kekuatan.label }}</strong>
                </div>
              </div>

              <p v-if="show('sandi')" class="error" role="alert">{{ show('sandi') }}</p>
            </div>

            <div class="field">
              <label for="konfirmasi">Konfirmasi Kata Sandi <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('konfirmasi') }">
                <ion-icon :icon="refreshCircleOutline" class="input__lead" />
                <input
                  id="konfirmasi"
                  v-model="form.konfirmasi"
                  :type="lihat.konfirmasi ? 'text' : 'password'"
                  placeholder="Ulangi kata sandi di atas"
                  autocomplete="new-password"
                  :aria-invalid="!!show('konfirmasi')"
                  @blur="touched.konfirmasi = true"
                />
                <button
                  type="button"
                  class="input__eye"
                  :aria-label="lihat.konfirmasi ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  :aria-pressed="lihat.konfirmasi"
                  @click="lihat.konfirmasi = !lihat.konfirmasi"
                >
                  <ion-icon :icon="lihat.konfirmasi ? eyeOffOutline : eyeOutline" />
                </button>
              </div>
              <p v-if="show('konfirmasi')" class="error" role="alert">{{ show('konfirmasi') }}</p>
            </div>

            <!-- Pernyataan -->
            <label class="consent" :class="{ 'consent--error': show('setuju') }">
              <input v-model="form.setuju" type="checkbox" @change="touched.setuju = true" />
              <span class="consent__box"><ion-icon :icon="checkmark" /></span>
              <span class="consent__text">
                Saya menyatakan seluruh data yang diisikan benar, otentik, dan bersedia mematuhi
                pedoman lomba Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
              </span>
            </label>
            <p v-if="show('setuju')" class="error error--center" role="alert">{{ show('setuju') }}</p>

            <button type="submit" class="btn-validate" :disabled="mengirim" :aria-busy="mengirim">
              {{ mengirim ? 'Memproses...' : 'Daftar Sekarang' }}
              <ion-icon :icon="arrowForward" />
            </button>

            <p class="login-link">
              Sudah memiliki akun terdaftar?
              <button type="button" @click="keLogin">
                Masuk di sini <ion-icon :icon="openOutline" />
              </button>
            </p>

          </form>

          <footer class="foot">
            <div class="foot__links">
              <button type="button" @click="helpdesk"><ion-icon :icon="headsetOutline" /> Helpdesk Teknis</button>
              <i class="sep"></i>
              <button type="button" @click="privasi"><ion-icon :icon="shieldOutline" /> Kebijakan Privasi</button>
            </div>

            <p>
              © 2025 Dinas Pendidikan Daerah Provinsi Sulawesi Utara.<br />
              Sistem Informasi Karya &amp; Talenta Siswa (SIKARYA).
            </p>
          </footer>

        </main>
      </div>
    </ion-content>
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
  helpCircleOutline,
  schoolOutline,
  personOutline,
  informationCircleOutline,
  idCardOutline,
  keypadOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  checkmark,
  businessOutline,
  mapOutline,
  chevronDownOutline,
  bookmarkOutline,
  lockClosedOutline,
  mailOutline,
  chatbubbleEllipsesOutline,
  keyOutline,
  refreshCircleOutline,
  eyeOutline,
  eyeOffOutline,
  openOutline,
  headsetOutline,
  shieldOutline
} from 'ionicons/icons';

const router = useRouter();

const jenjangList = [
  { key: 'sma', label: 'SMA', desc: 'Menengah Atas' },
  { key: 'smk', label: 'SMK', desc: 'Kejuruan' },
  { key: 'slb', label: 'SLB', desc: 'Luar Biasa' }
];

// TODO: ganti dengan daftar resmi Cabang Dinas Wilayah Sulawesi Utara
const cabdinList = [
  'Cabang Dinas Wilayah Manado-Tomohon',
  'Cabang Dinas Wilayah Minahasa-Minahasa Utara',
  'Cabang Dinas Wilayah Bolaang Mongondow',
  'Cabang Dinas Wilayah Kepulauan'
];

const form = reactive({
  nisn: '',
  nama: '',
  jenjang: '',
  cabdin: '',
  sekolah: '',
  kelas: '',
  email: '',
  wa: '',
  sandi: '',
  konfirmasi: '',
  setuju: false
});

const lihat = reactive({ sandi: false, konfirmasi: false });
const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const mengirim = ref(false);

/* NISN hanya angka, maksimal 10 digit */
watch(
  () => form.nisn,
  (v) => {
    const bersih = v.replace(/\D/g, '').slice(0, 10);
    if (bersih !== v) form.nisn = bersih;
  }
);

/* Kekuatan kata sandi */
const kekuatan = computed(() => {
  const s = form.sandi;
  let skor = 0;
  if (s.length >= 8) skor++;
  if (/[A-Za-z]/.test(s) && /\d/.test(s)) skor++;
  if (s.length >= 12 || (/[A-Z]/.test(s) && /[a-z]/.test(s) && /[^A-Za-z0-9]/.test(s))) skor++;
  if (!s) skor = 0;
  const label = skor <= 1 ? 'Lemah' : skor === 2 ? 'Cukup' : 'Kuat';
  return { skor, label };
});

/* Validasi */
const errors = computed<Record<string, string>>(() => ({
  nisn: /^\d{10}$/.test(form.nisn) ? '' : 'NISN harus 10 digit angka.',
  nama: form.nama.length >= 3 ? '' : 'Nama lengkap siswa wajib diisi.',
  jenjang: form.jenjang ? '' : 'Pilih jenjang pendidikan.',
  cabdin: form.cabdin ? '' : 'Pilih wilayah Cabang Dinas.',
  sekolah: form.sekolah.length >= 3 ? '' : 'Asal sekolah wajib diisi.',
  kelas: form.kelas.length >= 2 ? '' : 'Kelas dan jurusan wajib diisi.',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Format email belum benar.',
  wa: /^(\+62|62|0)8\d{8,11}$/.test(form.wa.replace(/[\s-]/g, ''))
    ? ''
    : 'Masukkan nomor seluler Indonesia yang valid (contoh: +62 812 3456 7890).',
  sandi:
    form.sandi.length >= 8 && /[A-Za-z]/.test(form.sandi) && /\d/.test(form.sandi)
      ? ''
      : 'Minimal 8 karakter, kombinasi huruf dan angka.',
  konfirmasi:
    form.konfirmasi && form.konfirmasi === form.sandi ? '' : 'Konfirmasi belum sama dengan kata sandi.',
  setuju: form.setuju ? '' : 'Pernyataan harus disetujui untuk melanjutkan.'
}));

function show(key: string) {
  return touched[key] || dicoba.value ? errors.value[key] : '';
}

const valid = computed(() => Object.values(errors.value).every((e) => !e));

/* Aksi */
function cekDapodik() {
  // TODO: cek form.nisn ke API Dapodik, lalu isi otomatis nama, jenjang, dan sekolah jika ditemukan
  console.log('cek dapodik');
}

async function kirim() {
  if (mengirim.value) return;
  dicoba.value = true;

  if (!valid.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>(
      '.input--error input, .input--error select, .level--error, .consent--error'
    );
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  mengirim.value = true;
  try {
    // TODO: kirim data pendaftaran ke API.
    // Jangan menulis kata sandi ke console atau log.
  } finally {
    mengirim.value = false;
  }
}

function keLogin() {
  // TODO: sesuaikan dengan route halaman login Anda
  router.push('/login');
}

function helpdesk() {
  // TODO: buka kontak helpdesk teknis
  console.log('helpdesk');
}

function privasi() {
  // TODO: buka halaman kebijakan privasi
  console.log('privasi');
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

b {
  color: #ba1a1a;
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
  gap: 8px;
}

.logo {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #003178;
  color: #fff;
}

.logo ion-icon {
  font-size: 22px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 14px;
  line-height: 18px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 9px;
  letter-spacing: .4px;
  color: #50545d;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 23px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 28px;
}

/* ---------- Pengantar ---------- */

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 600;
}

.status ion-icon {
  font-size: 14px;
}

.status-info {
  background: #cfe6fb;
  color: #0b4fa6;
}

.intro h1 {
  margin-top: 10px;
  font-size: 24px;
  line-height: 31px;
  font-weight: 800;
  color: #003178;
}

.intro p {
  margin-top: 8px;
  font-size: 13px;
  line-height: 21px;
  color: #3d4452;
}

.note {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  background: #f0f8ff;
  border: 1px solid #bcd7f0;
}

.note > ion-icon {
  width: 30px;
  height: 30px;
  flex: none;
  padding: 0;
  font-size: 22px;
  color: #00639a;
}

.note strong {
  font-size: 12px;
  color: #003178;
}

.note p {
  margin-top: 4px;
  font-size: 11px;
  line-height: 17px;
  color: #3d4452;
}

/* ---------- Form ---------- */

.form {
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eceef2;
  font-size: 15px;
  font-weight: 800;
  color: #003178;
}

.step:not(:first-child) {
  margin-top: 24px;
}

.step ion-icon {
  font-size: 22px;
}

.field {
  margin-top: 14px;
}

.field label,
.label {
  display: block;
  margin-bottom: 7px;
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  color: #191c1e;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 12px;
  border-radius: 12px;
  background: #f3f5f8;
  border: 1px solid #d4d9e2;
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
  height: 50px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  color: #191c1e;
}

.input input::placeholder {
  color: #50545d;
}

.input select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.input select.is-empty {
  color: #50545d;
}

.input__lead {
  font-size: 22px;
  color: #50545d;
}

.input__trail {
  font-size: 18px;
  color: #50545d;
  pointer-events: none;
}

.input__eye {
  display: flex;
  padding: 4px;
  color: #50545d;
}

.input__eye ion-icon {
  font-size: 22px;
}

.input--action {
  padding-right: 6px;
}

.btn-inline {
  flex: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 11px 12px;
  border-radius: 9px;
  background: #00639a;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.btn-inline ion-icon {
  font-size: 16px;
}

.btn-inline:disabled {
  opacity: .55;
  cursor: not-allowed;
}

.help {
  margin-top: 6px;
  font-size: 10px;
  line-height: 15px;
  color: #50545d;
}

.error {
  margin-top: 6px;
  font-size: 11px;
  line-height: 15px;
  color: #ba1a1a;
}

.error--center {
  text-align: center;
}

/* ---------- Jenjang ---------- */

.levels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.level {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 62px;
  padding: 8px 4px;
  border-radius: 12px;
  background: #fff;
  border: 1.5px solid #c3c9d6;
  text-align: center;
  cursor: pointer;
}

.level input {
  position: absolute;
  opacity: 0;
}

.level strong {
  font-size: 14px;
  font-weight: 800;
}

.level small {
  font-size: 10px;
  color: #50545d;
}

.level--on {
  background: #eaf2fd;
  border: 2px solid #003178;
}

.level--on strong {
  color: #003178;
}

.level--error {
  border-color: #ba1a1a;
}

.level__check {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 17px;
  color: #003178;
}

.level:has(input:focus-visible) {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Kekuatan sandi ---------- */

.meter {
  margin-top: 12px;
}

.meter__bars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.meter__bars i {
  height: 6px;
  border-radius: 3px;
  background: #e1e4ea;
}

.meter__bars i.on {
  background: #00639a;
}

.meter__bars i.on[data-level='1'] {
  background: #ba1a1a;
}

.meter__bars i.on[data-level='2'] {
  background: #d19a00;
}

.meter__text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 11px;
  color: #3d4452;
}

.meter__text strong {
  color: #00639a;
}

.meter__text strong[data-level='1'] {
  color: #ba1a1a;
}

.meter__text strong[data-level='2'] {
  color: #8a5a00;
}

/* ---------- Pernyataan ---------- */

.consent {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 22px;
  padding: 16px 14px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
  cursor: pointer;
}

.consent--error {
  border-color: #ba1a1a;
}

.consent input {
  position: absolute;
  opacity: 0;
}

.consent__box {
  flex: none;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #747985;
  background: #fff;
  color: transparent;
}

.consent__box ion-icon {
  font-size: 16px;
}

.consent input:checked + .consent__box {
  background: #003f91;
  border-color: #003f91;
  color: #fff;
}

.consent input:focus-visible + .consent__box {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

.consent__text {
  font-size: 11px;
  line-height: 18px;
  color: #3d4452;
}

/* ---------- Tombol ---------- */

.btn-validate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 54px;
  margin-top: 16px;
  border-radius: 14px;
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
  font-size: 20px;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
  font-size: 12px;
  color: #3d4452;
}

.login-link button {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 800;
  color: #003178;
}

.login-link ion-icon {
  font-size: 14px;
}

.btn-validate:focus-visible,
.btn-inline:focus-visible,
.input__eye:focus-visible,
.login-link button:focus-visible,
.foot__links button:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Footer ---------- */

.foot {
  padding-top: 14px;
  border-top: 1px solid #e3e6ec;
  text-align: center;
}

.foot__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.foot__links button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #191c1e;
}

.foot__links ion-icon {
  font-size: 16px;
}

.sep {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #747985;
}

.foot p {
  margin-top: 10px;
  font-size: 10px;
  line-height: 16px;
  color: #747985;
}

</style>