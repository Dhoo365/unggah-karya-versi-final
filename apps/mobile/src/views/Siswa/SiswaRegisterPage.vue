<template>
  <ion-page>
    <ion-content :fullscreen="true" class="reg-content">
      <div class="reg">
        <!-- Top bar -->
        <header class="topbar">
          <button class="icon-btn" type="button" aria-label="Kembali" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="brand">
            <span class="brand__logo"><ion-icon :icon="schoolOutline" /></span>
            <div class="brand__text">
              <strong>SIKARYA Dikda Sulut</strong>
              <span>SULAWESI UTARA</span>
            </div>
          </div>
          <button class="icon-btn icon-btn--help" type="button" aria-label="Bantuan">
            <ion-icon :icon="helpCircleOutline" />
          </button>
        </header>

        <!-- Heading -->
        <section class="intro">
          <span class="pill">
            <ion-icon :icon="personAddOutline" />
            Akun Resmi Peserta
          </span>
          <h1 class="intro__title">Daftar Akun Siswa Baru</h1>
          <p class="intro__desc">
            Registrasi peserta lomba talenta &amp; karya seni tingkat SMA/SMK/SLB se-Sulawesi Utara.
          </p>
        </section>

        <!-- Info validasi -->
        <section class="info">
          <span class="info__icon"><ion-icon :icon="informationCircleOutline" /></span>
          <div>
            <strong>Validasi Data Dapodik</strong>
            <p>
              Pastikan NISN aktif dan terdaftar di Dapodik untuk validasi otomatis delegasi sekolah dan
              pembuatan nomor peserta kompetisi.
            </p>
          </div>
        </section>

        <!-- Form card -->
        <form class="card" novalidate @submit.prevent="submit">
          <!-- Identitas -->
          <h2 class="section">
            <ion-icon :icon="idCardOutline" />
            Identitas Siswa Dapodik
          </h2>

          <div class="field">
            <label class="label" for="nisn">Nomor Induk Siswa Nasional (NISN) <i>*</i></label>
            <div class="input input--action">
              <ion-icon class="input__icon" :icon="keypadOutline" />
              <input
                id="nisn"
                v-model="form.nisn"
                type="text"
                inputmode="numeric"
                maxlength="10"
                placeholder="10 digit NISN aktif"
                @input="onNisnInput"
              />
              <button class="btn-check" type="button" @click="cekDapodik">
                <ion-icon :icon="checkmarkCircleOutline" />
                Cek Dapodik
              </button>
            </div>
            <small class="hint">Ketik 10 angka NISN Anda lalu klik tombol Cek Dapodik.</small>
          </div>

          <div class="field">
            <label class="label" for="nama">Nama Lengkap Siswa <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="personOutline" />
              <input id="nama" v-model="form.nama" type="text" placeholder="Nama sesuai kartu identitas / akta" />
            </div>
          </div>

          <!-- Satuan pendidikan -->
          <h2 class="section">
            <ion-icon :icon="businessOutline" />
            Satuan Pendidikan &amp; Wilayah
          </h2>

          <div class="field">
            <span class="label">Jenjang Pendidikan <i>*</i></span>
            <div class="levels" role="radiogroup" aria-label="Jenjang Pendidikan">
              <button
                v-for="l in levels"
                :key="l.value"
                type="button"
                role="radio"
                class="level"
                :class="{ 'level--active': form.jenjang === l.value }"
                :aria-checked="form.jenjang === l.value"
                @click="form.jenjang = l.value"
              >
                <ion-icon v-if="form.jenjang === l.value" class="level__check" :icon="checkmarkCircleOutline" />
                <strong>{{ l.value }}</strong>
                <span>{{ l.label }}</span>
              </button>
            </div>
          </div>

          <div class="field">
            <label class="label" for="cabdin">Wilayah Cabang Dinas (Cabdin) <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="mapOutline" />
              <select id="cabdin" v-model="form.cabdin" :class="{ 'is-placeholder': !form.cabdin }">
                <option value="" disabled>Pilih Wilayah Cabang Dinas</option>
                <option v-for="c in cabdinList" :key="c" :value="c">{{ c }}</option>
              </select>
              <ion-icon class="input__chev" :icon="chevronDownOutline" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="sekolah">Asal Sekolah <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="libraryOutline" />
              <input id="sekolah" v-model="form.sekolah" type="text" placeholder="Contoh: SMAN 1 Manado / SMKN 2 Bitung" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="kelas">Kelas &amp; Konsentrasi Keahlian / Jurusan <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="bookOutline" />
              <input id="kelas" v-model="form.kelas" type="text" placeholder="Contoh: XII Rekayasa Perangkat Lunak / XI IPA" />
            </div>
          </div>

          <!-- Kontak -->
          <h2 class="section">
            <ion-icon :icon="lockClosedOutline" />
            Kontak &amp; Keamanan Akun
          </h2>

          <div class="field">
            <label class="label" for="email">Alamat Email Aktif <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="mailOutline" />
              <input id="email" v-model="form.email" type="email" placeholder="nama.siswa@gmail.com" autocomplete="email" />
            </div>
            <small class="hint">Sertifikat penghargaan digital dan berkas kurasi akan dikirimkan ke email ini.</small>
          </div>

          <div class="field">
            <label class="label" for="wa">Nomor WhatsApp Aktif <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="chatboxEllipsesOutline" />
              <input id="wa" v-model="form.wa" type="tel" inputmode="tel" placeholder="+62 812 3456 7890" autocomplete="tel" />
            </div>
          </div>

          <div class="field">
            <label class="label" for="pass">Kata Sandi Baru <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="keyOutline" />
              <input
                id="pass"
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                placeholder="Minimal 8 karakter (huruf & angka)"
                autocomplete="new-password"
              />
              <button class="eye" type="button" :aria-label="showPass ? 'Sembunyikan' : 'Tampilkan'" @click="showPass = !showPass">
                <ion-icon :icon="showPass ? eyeOffOutline : eyeOutline" />
              </button>
            </div>
            <div class="strength">
              <div class="strength__head">
                <span>Kekuatan Sandi</span>
                <b v-if="strength.label" :class="`s-${strength.level}`">{{ strength.label }}</b>
              </div>
              <div class="strength__bars">
                <span v-for="n in 3" :key="n" :class="{ on: n <= strength.level, [`s-${strength.level}`]: n <= strength.level }"></span>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label" for="pass2">Konfirmasi Kata Sandi <i>*</i></label>
            <div class="input">
              <ion-icon class="input__icon" :icon="refreshOutline" />
              <input
                id="pass2"
                v-model="form.confirm"
                :type="showConfirm ? 'text' : 'password'"
                placeholder="Ulangi kata sandi di atas"
                autocomplete="new-password"
              />
              <button class="eye" type="button" :aria-label="showConfirm ? 'Sembunyikan' : 'Tampilkan'" @click="showConfirm = !showConfirm">
                <ion-icon :icon="showConfirm ? eyeOffOutline : eyeOutline" />
              </button>
            </div>
          </div>

          <label class="agree">
            <input v-model="form.agree" type="checkbox" />
            <span>
              Saya menyatakan seluruh data yang diisikan benar, otentik, dan bersedia mematuhi pedoman lomba
              Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
            </span>
          </label>

          <button class="cta" type="submit">
            Daftar Sekarang
            <ion-icon :icon="arrowForwardOutline" />
          </button>

          <p class="login">
            Sudah memiliki akun terdaftar?
            <a href="#" @click.prevent="goLogin">Masuk di sini <ion-icon :icon="openOutline" /></a>
          </p>
        </form>

        <footer class="foot">
          <div class="foot__links">
            <a href="#"><ion-icon :icon="helpBuoyOutline" /> Helpdesk Teknis</a>
            <i class="foot__dot"></i>
            <a href="#"><ion-icon :icon="shieldCheckmarkOutline" /> Kebijakan Privasi</a>
          </div>
          <p>
            © 2025 Dinas Pendidikan Daerah Provinsi Sulawesi Utara.<br />
            Sistem Informasi Karya &amp; Talenta Siswa (SIKARYA).
          </p>
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBackOutline,
  arrowForwardOutline,
  bookOutline,
  businessOutline,
  chatboxEllipsesOutline,
  checkmarkCircleOutline,
  chevronDownOutline,
  eyeOffOutline,
  eyeOutline,
  helpBuoyOutline,
  helpCircleOutline,
  idCardOutline,
  informationCircleOutline,
  keyOutline,
  keypadOutline,
  libraryOutline,
  lockClosedOutline,
  mailOutline,
  mapOutline,
  openOutline,
  personAddOutline,
  personOutline,
  refreshOutline,
  schoolOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

const router = useRouter();

const levels = [
  { value: 'SMA', label: 'Menengah Atas' },
  { value: 'SMK', label: 'Kejuruan' },
  { value: 'SLB', label: 'Luar Biasa' },
];

const cabdinList = [
  'Cabdin Wilayah I',
  'Cabdin Wilayah II',
  'Cabdin Wilayah III',
  'Cabdin Wilayah IV',
  'Cabdin Wilayah V',
];

const form = reactive({
  nisn: '',
  nama: '',
  jenjang: 'SMA',
  cabdin: '',
  sekolah: '',
  kelas: '',
  email: '',
  wa: '',
  password: '',
  confirm: '',
  agree: false,
});

const showPass = ref(false);
const showConfirm = ref(false);

// 0 = kosong, 1 = lemah, 2 = sedang, 3 = kuat
const strength = computed(() => {
  const p = form.password;
  if (!p) return { level: 0, label: '' };
  let score = 0;
  if (p.length >= 8) score++;
  if (/[a-zA-Z]/.test(p) && /\d/.test(p)) score++;
  if (p.length >= 12 || /[^a-zA-Z0-9]/.test(p)) score++;
  const level = Math.max(1, score);
  return { level, label: ['', 'Lemah', 'Sedang', 'Kuat'][level] };
});

function onNisnInput() {
  form.nisn = form.nisn.replace(/\D/g, '').slice(0, 10);
}

function cekDapodik() {
  if (form.nisn.length !== 10) return;
  // TODO: panggil API validasi Dapodik
}

function submit() {
  if (!form.agree || form.password !== form.confirm) return;
  // TODO: kirim data registrasi
}

function goBack() {
  router.back();
}

function goLogin() {
  router.push('/login');
}
</script>

<style scoped>
.reg-content {
  --background: #ffffff;
}

.reg {
  --navy: #0b2a6b;
  --blue: #0b4a8f;
  --line: #d6e4f5;
  --field: #eef2f7;
  min-height: 100%;
  background: #f4f8fd;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #1e293b;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
}

/* ---------- Top bar ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 16px 10px;
  background: #fff;
  border-bottom: 1px solid #e5edf6;
}
.icon-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--blue);
  font-size: 22px;
  cursor: pointer;
}
.icon-btn--help {
  margin-left: auto;
  font-size: 24px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand__logo {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--navy);
  color: #fff;
  font-size: 17px;
}
.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.brand__text strong {
  font-size: 12.5px;
  font-weight: 800;
  color: var(--navy);
}
.brand__text span {
  font-size: 8.5px;
  letter-spacing: 0.4px;
  color: #64748b;
}

/* ---------- Intro ---------- */
.intro {
  padding: 14px 16px 0;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #cfe3fb;
  font-size: 9.5px;
  font-weight: 600;
  color: #1d4f9c;
}
.pill ion-icon {
  font-size: 12px;
}
.intro__title {
  margin: 10px 0 0;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 800;
  color: var(--navy);
}
.intro__desc {
  margin: 8px 0 0;
  font-size: 11.5px;
  line-height: 1.55;
  color: #475569;
}

/* ---------- Info ---------- */
.info {
  display: flex;
  gap: 10px;
  margin: 16px 16px 0;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}
.info__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #cfe3fb;
  color: var(--blue);
  font-size: 17px;
}
.info strong {
  display: block;
  font-size: 11.5px;
  font-weight: 800;
  color: var(--navy);
}
.info p {
  margin: 4px 0 0;
  font-size: 9.5px;
  line-height: 1.5;
  color: #64748b;
}

/* ---------- Card ---------- */
.card {
  margin: 16px 16px 0;
  padding: 16px 14px 14px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

.section {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0 0 14px;
  font-size: 13.5px;
  font-weight: 800;
  color: var(--navy);
}
.section ion-icon {
  font-size: 18px;
}
.section:not(:first-child) {
  margin-top: 22px;
}
.card > .section:first-child {
  padding-bottom: 8px;
  border-bottom: 1px solid #e5edf6;
}

.field {
  margin-bottom: 14px;
}
.label {
  display: block;
  margin-bottom: 6px;
  font-size: 9.5px;
  font-weight: 700;
  color: #1e293b;
}
.label i {
  font-style: normal;
  color: #dc2626;
}
.hint {
  display: block;
  margin-top: 6px;
  font-size: 8.5px;
  line-height: 1.4;
  color: #64748b;
}

/* ---------- Inputs ---------- */
.input {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid #d9e2ee;
  border-radius: 12px;
  background: var(--field);
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.input:focus-within {
  border-color: #2f7be0;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(47, 123, 224, 0.15);
}
.input__icon {
  flex-shrink: 0;
  font-size: 16px;
  color: #475569;
}
.input input,
.input select {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 40px;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  font-size: 11.5px;
  color: #1e293b;
  appearance: none;
  -webkit-appearance: none;
}
.input input::placeholder {
  color: #475569;
  opacity: 0.85;
}
.input select.is-placeholder {
  color: #475569;
}
.input__chev {
  position: absolute;
  right: 12px;
  font-size: 14px;
  color: #334155;
  pointer-events: none;
}
.input--action {
  padding-right: 5px;
}
.btn-check {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  height: 32px;
  padding: 0 12px;
  border: 0;
  border-radius: 9px;
  background: var(--blue);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}
.btn-check ion-icon {
  font-size: 13px;
}
.btn-check:active {
  transform: scale(0.97);
}

.eye {
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: none;
  color: #334155;
  font-size: 18px;
  cursor: pointer;
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
  height: 58px;
  padding: 0;
  border: 1.5px solid #c3cfdd;
  border-radius: 12px;
  background: #fff;
  color: #334155;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.level strong {
  font-size: 12px;
  font-weight: 800;
}
.level span {
  font-size: 8.5px;
  color: #64748b;
}
.level--active {
  border-color: var(--blue);
  background: #eaf3fc;
}
.level--active strong {
  color: var(--navy);
}
.level__check {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 14px;
  color: var(--blue);
}

/* ---------- Password strength ---------- */
.strength {
  margin-top: 10px;
}
.strength__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 8.5px;
  color: #475569;
}
.strength__head b {
  font-weight: 800;
}
.strength__bars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}
.strength__bars span {
  height: 5px;
  border-radius: 999px;
  background: #d5dde8;
  transition: background 0.25s;
}
.strength__bars span.on.s-1 {
  background: #dc2626;
}
.strength__bars span.on.s-2 {
  background: #f59e0b;
}
.strength__bars span.on.s-3 {
  background: #0b5c8f;
}
.strength__head b.s-1 {
  color: #dc2626;
}
.strength__head b.s-2 {
  color: #d97706;
}
.strength__head b.s-3 {
  color: #0b5c8f;
}

/* ---------- Agree ---------- */
.agree {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 4px;
  padding: 12px;
  border: 1px solid #dde4ee;
  border-radius: 10px;
  background: #f1f4f8;
  font-size: 9.5px;
  line-height: 1.55;
  color: #334155;
  cursor: pointer;
}
.agree input {
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  margin: 1px 0 0;
  accent-color: var(--blue);
}

/* ---------- CTA ---------- */
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  margin-top: 16px;
  border: 0;
  border-radius: 12px;
  background: var(--blue);
  color: #fff;
  font: inherit;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 6px 14px rgba(11, 74, 143, 0.28);
  cursor: pointer;
}
.cta ion-icon {
  font-size: 16px;
}
.cta:active {
  transform: scale(0.98);
}

.login {
  margin: 14px 0 0;
  text-align: center;
  font-size: 10.5px;
  color: #475569;
}
.login a {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 4px;
  font-weight: 800;
  color: var(--blue);
  text-decoration: none;
}
.login a ion-icon {
  font-size: 11px;
}

/* ---------- Footer ---------- */
.foot {
  margin-top: 18px;
  padding: 14px 16px 6px;
  border-top: 1px solid #e5edf6;
  text-align: center;
}
.foot__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.foot__links a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9.5px;
  font-weight: 700;
  color: #334155;
  text-decoration: none;
}
.foot__links ion-icon {
  font-size: 14px;
}
.foot__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #64748b;
}
.foot p {
  margin: 10px 0 0;
  font-size: 8.5px;
  line-height: 1.5;
  color: #64748b;
}

/* ---------- Focus ---------- */
.icon-btn:focus-visible,
.btn-check:focus-visible,
.level:focus-visible,
.eye:focus-visible,
.cta:focus-visible,
.login a:focus-visible,
.foot a:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .input,
  .level,
  .strength__bars span {
    transition: none;
  }
}
</style>