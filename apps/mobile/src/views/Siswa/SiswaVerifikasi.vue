<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ver-content">
      <div class="ver">
        <!-- Top bar -->
        <header class="topbar">
          <button class="icon-btn" type="button" aria-label="Kembali" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="topbar__text">
            <strong>SIKARYA Dikda Sulut</strong>
            <span>Provinsi Sulawesi Utara</span>
          </div>
          <button class="icon-btn icon-btn--right" type="button" aria-label="Bantuan">
            <ion-icon :icon="headsetOutline" />
          </button>
        </header>

        <!-- Hero -->
        <section class="hero">
          <div class="avatar">
            <span class="avatar__core"></span>
            <span class="avatar__badge"><ion-icon :icon="shieldCheckmarkOutline" /></span>
          </div>
          <span class="pill">
            <ion-icon :icon="shieldCheckmark" />
            Tahap Terakhir Aktivasi Akun
          </span>
          <h1 class="hero__title">Verifikasi Akun Anda</h1>
          <p class="hero__desc">
            Kode verifikasi 6 digit telah dikirimkan ke email dan nomor WhatsApp resmi siswa terdaftar.
          </p>
        </section>

        <!-- Data siswa -->
        <section class="card student">
          <div class="student__head">
            <span class="student__icon"><ion-icon :icon="schoolOutline" /></span>
            <div class="student__info">
              <strong>{{ student.nama }}</strong>
              <span>NISN: {{ student.nisn }}</span>
            </div>
            <span class="school">{{ student.sekolah }}</span>
          </div>

          <div class="contacts">
            <div class="contact">
              <span class="contact__label"><ion-icon :icon="mailOutline" /> Email Siswa</span>
              <strong class="contact__value">{{ student.email }}</strong>
              <span class="contact__status"><ion-icon :icon="checkmarkCircleOutline" /> Terkirim</span>
            </div>
            <div class="contact">
              <span class="contact__label"><ion-icon :icon="chatboxEllipsesOutline" /> WhatsApp Resmi</span>
              <strong class="contact__value">{{ student.wa }}</strong>
              <span class="contact__status"><ion-icon :icon="checkmarkCircleOutline" /> Terkirim</span>
            </div>
          </div>
        </section>

        <!-- OTP -->
        <section class="card otp">
          <div class="otp__head">
            <h2><ion-icon :icon="gridOutline" /> Masukkan 6 Digit Kode OTP</h2>
            <span class="otp__valid"><ion-icon :icon="timeOutline" /> Masa Berlaku</span>
          </div>

          <div class="otp__boxes" @paste.prevent="onPaste">
            <input
              v-for="(_, i) in digits"
              :key="i"
              :ref="(el) => setRef(el, i)"
              v-model="digits[i]"
              class="otp__box"
              :class="{ 'otp__box--filled': digits[i] }"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="1"
              placeholder="•"
              :aria-label="`Digit ${i + 1}`"
              @input="onInput(i)"
              @keydown="onKeydown($event, i)"
              @focus="($event.target as HTMLInputElement).select()"
            />
          </div>

          <p class="otp__resend">
            Kirim ulang kode dalam
            <b class="timer" :class="{ 'timer--done': remaining === 0 }">{{ timeLabel }}</b>
          </p>

          <div class="otp__links">
            <button type="button" class="link link--teal" :disabled="remaining > 0" @click="resend">
              <ion-icon :icon="sendOutline" />
              Kirim via WhatsApp
            </button>
            <i class="otp__dot"></i>
            <button type="button" class="link link--gray" @click="changeContact">
              <ion-icon :icon="createOutline" />
              Ganti Email / No. HP
            </button>
          </div>
        </section>

        <!-- Tahapan -->
        <section class="steps">
          <h2><ion-icon :icon="informationCircleOutline" /> Tahapan Pasca Verifikasi</h2>
          <ol>
            <li v-for="s in steps" :key="s.n">
              <span class="steps__num" :class="`steps__num--${s.n}`">{{ s.n }}</span>
              <div>
                <strong>{{ s.title }}</strong>
                <p>{{ s.desc }}</p>
              </div>
            </li>
          </ol>
        </section>

        <!-- Actions -->
        <button class="cta" type="button" :disabled="!complete" @click="verify">
          Verifikasi &amp; Masuk ke Beranda
          <ion-icon :icon="arrowForwardOutline" />
        </button>

        <div class="actions">
          <button type="button" class="ghost" @click="openMail">
            <ion-icon :icon="openOutline" />
            Buka Gmail Siswa
          </button>
          <button type="button" class="ghost">
            <ion-icon :icon="helpCircleOutline" />
            Bantuan Dapodik
          </button>
        </div>

        <footer class="foot">
          <p class="foot__ssl"><ion-icon :icon="shieldCheckmarkOutline" /> Sistem Resmi Terenkripsi SSL 256-bit</p>
          <p>
            © 2025 Dinas Pendidikan Daerah Provinsi Sulawesi Utara.<br />
            Pemerintah Provinsi Sulawesi Utara.
          </p>
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBackOutline,
  arrowForwardOutline,
  chatboxEllipsesOutline,
  checkmarkCircleOutline,
  createOutline,
  gridOutline,
  headsetOutline,
  helpCircleOutline,
  informationCircleOutline,
  mailOutline,
  openOutline,
  schoolOutline,
  sendOutline,
  shieldCheckmark,
  shieldCheckmarkOutline,
  timeOutline,
} from 'ionicons/icons';

const router = useRouter();

// Data contoh; ganti dengan data hasil registrasi
const student = {
  nama: 'Christian Tatengkeng',
  nisn: '0064829102',
  sekolah: 'SMAN 1 Manado',
  email: 'c.tatengkeng@gmail.com',
  wa: '+62 812-44••-8921',
};

const steps = [
  {
    n: 1,
    title: 'Input Kode OTP 6 Digit',
    desc: 'Pastikan kode yang diterima sesuai dengan email atau pesan WhatsApp resmi Dikda.',
  },
  {
    n: 2,
    title: 'Sinkronisasi Otomatis Dapodik',
    desc: 'Sistem memvalidasi rekam data akademik sekolah wilayah Sulawesi Utara secara real-time.',
  },
  {
    n: 3,
    title: 'Akses Portofolio & Lomba',
    desc: 'Siap mendaftar dan mengunggah berkas karya FLS2N, LKS SMK, O2SN, atau apresiasi GTK.',
  },
];

/* ---------- OTP ---------- */
const LENGTH = 6;
const digits = ref<string[]>(Array(LENGTH).fill(''));
const inputs: (HTMLInputElement | null)[] = [];

const complete = computed(() => digits.value.every((d) => d !== ''));

function setRef(el: unknown, i: number) {
  inputs[i] = el as HTMLInputElement | null;
}

function focusAt(i: number) {
  inputs[Math.max(0, Math.min(LENGTH - 1, i))]?.focus();
}

function onInput(i: number) {
  const clean = digits.value[i].replace(/\D/g, '').slice(-1);
  digits.value[i] = clean;
  if (clean && i < LENGTH - 1) focusAt(i + 1);
}

function onKeydown(e: KeyboardEvent, i: number) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    digits.value[i - 1] = '';
    focusAt(i - 1);
  } else if (e.key === 'ArrowLeft') {
    focusAt(i - 1);
  } else if (e.key === 'ArrowRight') {
    focusAt(i + 1);
  }
}

function onPaste(e: ClipboardEvent) {
  const text = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, LENGTH);
  if (!text) return;
  text.split('').forEach((c, i) => (digits.value[i] = c));
  focusAt(Math.min(text.length, LENGTH - 1));
}

/* ---------- Timer ---------- */
const COUNTDOWN = 90; // 01:30
const remaining = ref(COUNTDOWN);
let timer: ReturnType<typeof setInterval> | null = null;

const timeLabel = computed(() => {
  const m = String(Math.floor(remaining.value / 60)).padStart(2, '0');
  const s = String(remaining.value % 60).padStart(2, '0');
  return `${m}:${s}`;
});

function startTimer() {
  if (timer) clearInterval(timer);
  remaining.value = COUNTDOWN;
  timer = setInterval(() => {
    if (remaining.value > 0) remaining.value--;
    else if (timer) clearInterval(timer);
  }, 1000);
}

onMounted(() => {
  startTimer();
  focusAt(0);
});
onBeforeUnmount(() => timer && clearInterval(timer));

/* ---------- Actions ---------- */
function resend() {
  if (remaining.value > 0) return;
  digits.value = Array(LENGTH).fill('');
  startTimer();
  focusAt(0);
  // TODO: panggil API kirim ulang OTP via WhatsApp
}

function changeContact() {
  router.back();
}

function verify() {
  if (!complete.value) return;
  const code = digits.value.join('');
  // TODO: kirim `code` ke API verifikasi, lalu arahkan ke beranda
  console.log('OTP:', code);
}

function openMail() {
  window.open('https://mail.google.com', '_blank');
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.ver-content {
  --background: #f4f8fd;
}

.ver {
  --navy: #0b2a6b;
  --blue: #0b4a8f;
  --teal: #0b6a8a;
  --line: #dbe5f1;
  min-height: 100%;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
  background: #f4f8fd;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

/* ---------- Top bar ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px;
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
  color: var(--navy);
  font-size: 22px;
  cursor: pointer;
}
.icon-btn--right {
  margin-left: auto;
}
.topbar__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.topbar__text strong {
  font-size: 15px;
  font-weight: 800;
  color: var(--navy);
}
.topbar__text span {
  font-size: 10px;
  color: #64748b;
}

/* ---------- Hero ---------- */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px 24px 0;
  text-align: center;
}
.avatar {
  position: relative;
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.55), 0 8px 24px rgba(11, 74, 143, 0.18);
}
.avatar__core {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: var(--navy);
}
.avatar__badge {
  position: absolute;
  right: -2px;
  bottom: 2px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #f5b800;
  color: #5b3d00;
  font-size: 15px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: -9px;
  padding: 5px 14px;
  border-radius: 999px;
  background: #cfe3fb;
  font-size: 10.5px;
  font-weight: 600;
  color: #1d3b6e;
  position: relative;
}
.pill ion-icon {
  font-size: 12px;
}
.hero__title {
  margin: 10px 0 0;
  font-size: 26px;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.4px;
  color: var(--navy);
}
.hero__desc {
  max-width: 320px;
  margin: 10px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: #475569;
}

/* ---------- Cards ---------- */
.card {
  margin: 20px 20px 0;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

/* Student */
.student__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5edf6;
}
.student__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #dbe6fb;
  color: var(--navy);
  font-size: 22px;
}
.student__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  line-height: 1.3;
}
.student__info strong {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}
.student__info span {
  font-size: 11px;
  color: #64748b;
}
.school {
  flex-shrink: 0;
  max-width: 96px;
  padding: 5px 12px;
  border-radius: 999px;
  background: #e8ecf1;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 1.15;
  text-align: center;
  color: #334155;
}

.contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
}
.contact {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 12px;
  border: 1px solid #e3e9f1;
  border-radius: 10px;
  background: #f1f4f8;
}
.contact__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: var(--teal);
}
.contact__label ion-icon {
  font-size: 16px;
}
.contact__value {
  overflow: hidden;
  font-size: 12px;
  font-weight: 500;
  color: #1e293b;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contact__status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--teal);
}
.contact__status ion-icon {
  font-size: 13px;
}

/* OTP */
.otp {
  padding: 18px 16px 16px;
}
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
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}
.otp__head h2 ion-icon {
  font-size: 16px;
  color: var(--blue);
}
.otp__valid {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #64748b;
}
.otp__boxes {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 16px;
}
.otp__box {
  width: 100%;
  aspect-ratio: 1 / 1.2;
  padding: 0;
  border: 1.5px solid #c9d3df;
  border-radius: 12px;
  background: #fff;
  font: inherit;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: var(--navy);
  outline: 0;
  caret-color: transparent;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.otp__box::placeholder {
  color: #94a3b8;
  font-size: 18px;
}
.otp__box--filled {
  border-color: var(--navy);
  border-width: 2px;
  box-shadow: 0 0 0 2px #eaf1fb;
}
.otp__box:focus {
  border-color: #2f7be0;
  box-shadow: 0 0 0 3px rgba(47, 123, 224, 0.2);
}
.otp__resend {
  margin: 16px 0 0;
  text-align: center;
  font-size: 12px;
  color: #1e293b;
}
.timer {
  display: inline-block;
  margin-left: 6px;
  padding: 3px 10px;
  border-radius: 6px;
  background: #fde2e2;
  font-weight: 700;
  color: #c62828;
}
.timer--done {
  background: #dcf5e6;
  color: #15803d;
}
.otp__links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.link ion-icon {
  font-size: 16px;
}
.link--teal {
  font-weight: 700;
  color: var(--teal);
}
.link--teal:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.link--gray {
  color: #64748b;
}
.otp__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #cbd5e1;
}

/* ---------- Steps ---------- */
.steps {
  margin: 20px 20px 0;
  padding: 16px;
  border: 1px solid #e0e6ee;
  border-radius: 14px;
  background: #eef1f5;
}
.steps h2 {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 14px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--navy);
}
.steps h2 ion-icon {
  font-size: 15px;
}
.steps ol {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.steps li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.steps__num {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
}
.steps__num--1 {
  background: var(--navy);
  color: #fff;
}
.steps__num--2 {
  background: #a9d2fb;
  color: #0b2a6b;
}
.steps__num--3 {
  background: #fde7bd;
  color: #7a4b00;
}
.steps strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}
.steps p {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: #64748b;
}

/* ---------- CTA ---------- */
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: calc(100% - 40px);
  height: 52px;
  margin: 22px 20px 0;
  border: 0;
  border-radius: 12px;
  background: var(--blue);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(11, 74, 143, 0.28);
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}
.cta ion-icon {
  font-size: 17px;
}
.cta:active:not(:disabled) {
  transform: scale(0.98);
}
.cta:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 20px 0;
}
.ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  border: 1px solid #c9d6e6;
  border-radius: 10px;
  background: #fff;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--navy);
  cursor: pointer;
}
.ghost ion-icon {
  font-size: 16px;
}
.ghost:active {
  background: #f1f6fc;
}

/* ---------- Footer ---------- */
.foot {
  margin-top: 34px;
  padding: 0 24px;
  text-align: center;
}
.foot p {
  margin: 0;
  font-size: 11px;
  line-height: 1.5;
  color: #64748b;
}
.foot__ssl {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px !important;
}
.foot__ssl ion-icon {
  font-size: 14px;
}

/* ---------- Focus ---------- */
.icon-btn:focus-visible,
.link:focus-visible,
.cta:focus-visible,
.ghost:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .otp__box,
  .cta {
    transition: none;
  }
}
</style>