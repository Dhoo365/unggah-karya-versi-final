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
              <strong>SIKARYA Dikda Sulut</strong>
              <span>Provinsi Sulawesi Utara</span>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Bantuan" @click="bantuan">
            <ion-icon :icon="headsetOutline" />
          </button>
        </header>

        <main class="main">

          <!-- Hero -->
          <section class="hero">
            <div class="hero__ring">
              <div class="hero__icon"><ion-icon :icon="mailUnreadOutline" /></div>
              <span class="hero__badge"><ion-icon :icon="shieldCheckmark" /></span>
            </div>

            <span class="status status-info">
              <ion-icon :icon="shieldCheckmarkOutline" />
              Tahap Terakhir Aktivasi Akun
            </span>

            <h1>Verifikasi Akun Anda</h1>

            <p>
              Kode verifikasi 6 digit telah dikirimkan ke email dan nomor WhatsApp resmi siswa
              terdaftar.
            </p>
          </section>

          <!-- Data siswa -->
          <section class="panel">
            <div class="student">
              <span class="student__icon"><ion-icon :icon="schoolOutline" /></span>

              <div class="student__text">
                <strong>{{ siswa.nama }}</strong>
                <small>NISN: {{ siswa.nisn }}</small>
              </div>

              <span class="status status-gray">{{ siswa.sekolah }}</span>
            </div>

            <div class="channels">
              <div class="channel">
                <span class="channel__label"><ion-icon :icon="mailOutline" /> Email Siswa</span>
                <strong>{{ siswa.email }}</strong>
                <small><ion-icon :icon="checkmarkCircleOutline" /> Terkirim</small>
              </div>

              <div class="channel">
                <span class="channel__label"><ion-icon :icon="chatbubbleEllipsesOutline" /> WhatsApp Resmi</span>
                <strong>{{ siswa.telepon }}</strong>
                <small><ion-icon :icon="checkmarkCircleOutline" /> Terkirim</small>
              </div>
            </div>
          </section>

          <!-- OTP -->
          <section class="panel">
            <div class="otp__head">
              <h2 id="otp-label">
                <ion-icon :icon="keypadOutline" />
                Masukkan 6 Digit Kode OTP
              </h2>

              <span class="validity"><ion-icon :icon="timeOutline" /> Masa Berlaku</span>
            </div>

            <div class="otp" role="group" aria-labelledby="otp-label">
              <input
                v-for="(d, i) in digits"
                :key="i"
                :ref="(el) => setBox(el, i)"
                :value="d"
                type="text"
                inputmode="numeric"
                :autocomplete="i === 0 ? 'one-time-code' : 'off'"
                placeholder="•"
                :aria-label="'Digit ke-' + (i + 1) + ' dari 6'"
                :class="{ filled: d, 'otp--error': galat }"
                @input="isiDigit(i, $event)"
                @keydown="tombol(i, $event)"
                @paste.prevent="tempel(i, $event)"
                @focus="($event.target as HTMLInputElement).select()"
              />
            </div>

            <p v-if="galat" class="error" role="alert">{{ galat }}</p>

            <div class="resend">
              <span>Kirim ulang kode dalam</span>
              <b :class="{ done: sisaDetik === 0 }">{{ waktu }}</b>
            </div>

            <div class="links">
              <button type="button" class="link" :disabled="sisaDetik > 0" @click="kirimUlang('whatsapp')">
                <ion-icon :icon="logoWhatsapp" />
                Kirim via WhatsApp
              </button>

              <i class="sep"></i>

              <button type="button" class="link link--gray" @click="gantiKontak">
                <ion-icon :icon="createOutline" />
                Ganti Email / No. HP
              </button>
            </div>
          </section>

          <!-- Tahapan -->
          <section class="steps">
            <h2>
              <ion-icon :icon="informationCircleOutline" />
              Tahapan Pasca Verifikasi
            </h2>

            <ol>
              <li v-for="(s, i) in tahapan" :key="s.judul">
                <span class="no" :class="'no--' + (i + 1)">{{ i + 1 }}</span>

                <div>
                  <strong>{{ s.judul }}</strong>
                  <p>{{ s.isi }}</p>
                </div>
              </li>
            </ol>
          </section>

          <!-- Aksi -->
          <div class="actions">
            <button
              type="button"
              class="btn-validate"
              :disabled="!lengkap || memverifikasi"
              :aria-busy="memverifikasi"
              @click="verifikasi"
            >
              {{ memverifikasi ? 'Memverifikasi...' : 'Verifikasi & Masuk ke Beranda' }}
              <ion-icon :icon="arrowForward" />
            </button>

            <div class="actions__row">
              <button type="button" class="btn-outline" @click="bukaGmail">
                <ion-icon :icon="openOutline" />
                Buka Gmail Siswa
              </button>

              <button type="button" class="btn-outline" @click="bantuan">
                <ion-icon :icon="helpCircleOutline" />
                Bantuan Dapodik
              </button>
            </div>
          </div>

          <footer class="foot">
            <span><ion-icon :icon="shieldOutline" /> Sistem Resmi Terenkripsi SSL 256-bit</span>

            <p>
              © 2025 Dinas Pendidikan Daerah Provinsi Sulawesi Utara.<br />
              Pemerintah Provinsi Sulawesi Utara.
            </p>
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  arrowForward,
  headsetOutline,
  mailUnreadOutline,
  shieldCheckmark,
  shieldCheckmarkOutline,
  schoolOutline,
  mailOutline,
  chatbubbleEllipsesOutline,
  checkmarkCircleOutline,
  keypadOutline,
  timeOutline,
  logoWhatsapp,
  createOutline,
  informationCircleOutline,
  openOutline,
  helpCircleOutline,
  shieldOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan data pendaftaran dari API (email dan telepon sebaiknya sudah disamarkan oleh server)
const siswa = {
  nama: 'Christian Tatengkeng',
  nisn: '0064829102',
  sekolah: 'SMAN 1 Manado',
  email: 'c.tatengkeng@gmail.com',
  telepon: '+62 812-44••-8921'
};

const tahapan = [
  {
    judul: 'Input Kode OTP 6 Digit',
    isi: 'Pastikan kode yang diterima sesuai dengan email atau pesan WhatsApp resmi Dikda.'
  },
  {
    judul: 'Sinkronisasi Otomatis Dapodik',
    isi: 'Sistem memvalidasi rekam data akademik sekolah wilayah Sulawesi Utara secara real-time.'
  },
  {
    judul: 'Akses Portofolio & Lomba',
    isi: 'Siap mendaftar dan mengunggah berkas karya FLS2N, LKS SMK, O2SN, atau apresiasi GTK.'
  }
];

/* ---------- Input OTP ---------- */

const PANJANG = 6;

const digits = ref<string[]>(Array(PANJANG).fill(''));
const kotak: (HTMLInputElement | null)[] = [];
const galat = ref('');
const memverifikasi = ref(false);

const kode = computed(() => digits.value.join(''));
const lengkap = computed(() => kode.value.length === PANJANG);

function setBox(el: unknown, i: number) {
  kotak[i] = el as HTMLInputElement | null;
}

function fokus(i: number) {
  const target = kotak[Math.max(0, Math.min(PANJANG - 1, i))];
  target?.focus();
}

/* Isi beberapa digit mulai dari kotak ke-i (untuk tempel / isi otomatis) */
function sebar(mulai: number, teks: string) {
  const angka = teks.replace(/\D/g, '').slice(0, PANJANG - mulai);
  angka.split('').forEach((d, k) => {
    digits.value[mulai + k] = d;
  });
  fokus(mulai + angka.length);
}

function isiDigit(i: number, e: Event) {
  galat.value = '';
  const input = e.target as HTMLInputElement;
  const angka = input.value.replace(/\D/g, '');

  if (!angka) {
    digits.value[i] = '';
    input.value = '';
    return;
  }

  if (angka.length > 1) {
    // Isi otomatis dari iOS/Android: seluruh kode masuk ke satu kotak
    sebar(i, angka);
    return;
  }

  digits.value[i] = angka;
  input.value = angka;
  if (i < PANJANG - 1) fokus(i + 1);
}

function tombol(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    digits.value[i - 1] = '';
    fokus(i - 1);
    e.preventDefault();
  } else if (e.key === 'ArrowLeft') {
    fokus(i - 1);
    e.preventDefault();
  } else if (e.key === 'ArrowRight') {
    fokus(i + 1);
    e.preventDefault();
  }
}

function tempel(i: number, e: ClipboardEvent) {
  galat.value = '';
  sebar(i, e.clipboardData?.getData('text') ?? '');
}

/* ---------- Timer kirim ulang ---------- */

const JEDA = 90;
const sisaDetik = ref(JEDA);
let pewaktu: ReturnType<typeof setInterval> | undefined;

const waktu = computed(() => {
  const m = String(Math.floor(sisaDetik.value / 60)).padStart(2, '0');
  const s = String(sisaDetik.value % 60).padStart(2, '0');
  return `${m}:${s}`;
});

function mulaiTimer() {
  clearInterval(pewaktu);
  sisaDetik.value = JEDA;
  pewaktu = setInterval(() => {
    if (sisaDetik.value > 0) sisaDetik.value--;
    else clearInterval(pewaktu);
  }, 1000);
}

onMounted(async () => {
  mulaiTimer();
  await nextTick();
  fokus(0);
});

onBeforeUnmount(() => clearInterval(pewaktu));

/* ---------- Aksi ---------- */

function kirimUlang(kanal: 'whatsapp' | 'email') {
  if (sisaDetik.value > 0) return;
  // TODO: minta server mengirim ulang kode lewat `kanal`. Server juga harus membatasi frekuensi kirim.
  digits.value = Array(PANJANG).fill('');
  galat.value = '';
  mulaiTimer();
  fokus(0);
  console.log('kirim ulang', kanal);
}

function gantiKontak() {
  // TODO: buka form ganti email / nomor HP
  console.log('ganti kontak');
}

async function verifikasi() {
  if (!lengkap.value || memverifikasi.value) return;
  memverifikasi.value = true;
  galat.value = '';

  try {
    // TODO: kirim `kode.value` ke API verifikasi OTP.
    // Jika berhasil: router.replace('/siswa/beranda') (sesuaikan route).
    // Jika gagal: galat.value = 'Kode OTP salah atau sudah kedaluwarsa.';
  } finally {
    memverifikasi.value = false;
  }
}

function bukaGmail() {
  // TODO: di aplikasi native, buka lewat plugin Browser/AppLauncher
  window.open('https://mail.google.com', '_blank', 'noopener');
}

function bantuan() {
  // TODO: buka bantuan Dapodik / helpdesk
  console.log('bantuan');
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
  gap: 8px;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__text strong {
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10px;
  color: #50545d;
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
  padding: 18px 14px 28px;
}

/* ---------- Pill ---------- */

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.status ion-icon {
  font-size: 15px;
}

.status-info {
  background: #dce7ff;
  color: #0b3a8f;
  border: 1px solid #c3d4f5;
}

.status-gray {
  flex: none;
  max-width: 96px;
  background: #eceff3;
  border: 1px solid #d4d9e2;
  color: #3d4452;
  font-size: 11px;
  line-height: 14px;
  text-align: center;
}

/* ---------- Hero ---------- */

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero__ring {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 6px #eef3fc, 0 4px 14px rgba(0, 49, 120, .12);
}

.hero__icon {
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #003178;
  color: #fff;
}

.hero__icon ion-icon {
  font-size: 32px;
}

.hero__badge {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #fff;
  background: #f5b400;
  color: #5d3a00;
}

.hero__badge ion-icon {
  font-size: 17px;
}

.hero .status {
  margin-top: 12px;
}

.hero h1 {
  margin-top: 14px;
  font-size: 25px;
  line-height: 32px;
  font-weight: 800;
  color: #003178;
}

.hero p {
  margin-top: 10px;
  padding: 0 4px;
  font-size: 13px;
  line-height: 24px;
  color: #3d4452;
}

/* ---------- Panel ---------- */

.panel {
  padding: 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.student {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eceef2;
}

.student__icon {
  width: 42px;
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #dce7ff;
  color: #003178;
}

.student__icon ion-icon {
  font-size: 24px;
}

.student__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.student__text strong {
  font-size: 14px;
  line-height: 19px;
}

.student__text small {
  color: #50545d;
}

.channels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
}

.channel {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  padding: 12px;
  border-radius: 10px;
  background: #eef0f4;
  border: 1px solid #e3e6ec;
}

.channel__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: #00639a;
}

.channel__label ion-icon {
  font-size: 17px;
}

.channel strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
}

.channel small {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #00639a;
}

.channel small ion-icon {
  font-size: 14px;
}

/* ---------- OTP ---------- */

.otp__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.otp__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.otp__head h2 ion-icon {
  font-size: 20px;
  color: #00639a;
}

.validity {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #606572;
}

.validity ion-icon {
  font-size: 15px;
}

.otp {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 16px;
}

.otp input {
  width: 100%;
  min-width: 0;
  height: 62px;
  box-sizing: border-box;
  padding: 0;
  border-radius: 12px;
  border: 1.5px solid #c3c9d6;
  background: #fff;
  outline: 0;
  text-align: center;
  font-family: inherit;
  font-size: 26px;
  font-weight: 600;
  color: #003178;
  caret-color: #003178;
}

.otp input::placeholder {
  color: #747985;
}

.otp input.filled {
  border: 2px solid #003178;
  box-shadow: 0 1px 4px rgba(0, 49, 120, .15);
}

.otp input:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 2px #cfe3fb;
}

.otp input.otp--error {
  border-color: #ba1a1a;
  box-shadow: none;
}

.error {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #ba1a1a;
}

.resend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 12px;
}

.resend b {
  padding: 4px 12px;
  border-radius: 8px;
  background: #fbdcdc;
  color: #ba1a1a;
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.resend b.done {
  background: #d9f4e4;
  color: #0b5f3a;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #00639a;
}

.link ion-icon {
  font-size: 18px;
}

.link:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.link--gray {
  font-weight: 500;
  color: #50545d;
}

.sep {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #b4bac6;
}

/* ---------- Tahapan ---------- */

.steps {
  padding: 16px;
  border-radius: 14px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.steps h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #003178;
}

.steps h2 ion-icon {
  font-size: 18px;
}

.steps ol {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
}

.steps li {
  display: flex;
  gap: 12px;
}

.no {
  width: 28px;
  height: 28px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}

.no--1 {
  background: #003178;
  color: #fff;
}

.no--2 {
  background: #a9d3fb;
  color: #003178;
}

.no--3 {
  background: #ffe1b3;
  color: #7a4b00;
}

.steps strong {
  font-size: 14px;
  font-weight: 500;
}

.steps p {
  margin-top: 2px;
  font-size: 12px;
  line-height: 18px;
  color: #50545d;
}

/* ---------- Aksi ---------- */

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
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
  opacity: .5;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-validate ion-icon {
  font-size: 20px;
}

.actions__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.btn-outline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  border-radius: 10px;
  border: 1px solid #c3c9d6;
  background: #fff;
  color: #003178;
  font-size: 12px;
  font-weight: 600;
}

.btn-outline ion-icon {
  font-size: 18px;
}

.btn-validate:focus-visible,
.btn-outline:focus-visible,
.link:focus-visible,
.icon-btn:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

/* ---------- Footer ---------- */

.foot {
  padding-top: 10px;
  text-align: center;
}

.foot span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #50545d;
}

.foot span ion-icon {
  font-size: 16px;
  color: #747985;
}

.foot p {
  margin-top: 6px;
  font-size: 11px;
  line-height: 17px;
  color: #747985;
}

</style>