<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-content">
      <div class="login">
        <div class="nav">
          <button class="nav__back" type="button" aria-label="Kembali" @click="router.back()">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <span class="nav__badge"><i class="nav__dot"></i> Portal Resmi V2.4</span>
          <span class="nav__space"></span>
        </div>

        <header class="hero">
          <div class="hero__logo">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 36 L20 8 L26 20 L18 36 Z" fill="#1d4f9c" />
              <path d="M18 36 L26 20 L34 36 Z" fill="#2f7be0" />
              <path d="M22 6 L32 4 L28 14 Z" fill="#f5b800" />
              <circle cx="30" cy="22" r="3" fill="#f5b800" />
            </svg>
            <span class="hero__role"><ion-icon :icon="hammerOutline" /></span>
          </div>

          <span class="hero__pill">Portal Dewan Juri • Kota Manado</span>
          <h1 class="hero__title">Masuk Portal Juri</h1>
          <p class="hero__desc">
            Silakan masuk menggunakan NIP / ID Registrasi Juri dan kata sandi yang telah terverifikasi oleh Disdikbud Kota
            Manado.
          </p>
        </header>

        <section class="form">
          <div class="field">
            <div class="field__head">
              <label class="field__label" for="nip">NIP / NIDN / ID Juri Resmi</label>
              <a class="field__link field__link--small" href="#">SK Disdikbud 2026</a>
            </div>
            <div class="input">
              <ion-icon class="input__icon" :icon="idCardOutline" />
              <input
                id="nip"
                v-model="nip"
                class="input__control"
                type="text"
                inputmode="text"
                autocomplete="username"
                placeholder="Contoh: 197805142003121002 atau JUR-MDO-01"
              />
            </div>
            <p class="field__hint"><ion-icon :icon="informationCircleOutline" /> Sesuai SK Penugasan Kadis Dikda Sulut &amp; Disdikbud Manado</p>
          </div>

          <div class="field">
            <div class="field__head">
              <label class="field__label" for="pass">Kata Sandi</label>
              <a class="field__link" href="#">Lupa Kata Sandi?</a>
            </div>
            <div class="input">
              <ion-icon class="input__icon" :icon="lockClosedOutline" />
              <input
                id="pass"
                v-model="password"
                class="input__control"
                :type="show ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Masukkan kata sandi terdaftar"
              />
              <button class="input__eye" type="button" :aria-label="show ? 'Sembunyikan' : 'Tampilkan'" @click="show = !show">
                <ion-icon :icon="show ? eyeOffOutline : eyeOutline" />
              </button>
            </div>
          </div>

          <div class="row">
            <label class="remember">
              <input v-model="remember" class="remember__box" type="checkbox" />
              <span>Ingat Saya di Perangkat Ini</span>
            </label>
            <span class="secure"><ion-icon :icon="shieldOutline" /> Aman (SSL 256-bit)</span>
          </div>

          <button class="submit" type="button" @click="submit">
            Masuk ke Panel Juri
            <ion-icon :icon="arrowForwardOutline" />
          </button>

          <div class="or"><span>Atau verifikasi biometrik / dinas</span></div>
        </section>

        <section class="help">
          <div class="help__icon"></div>
          <div class="help__body">
            <b class="help__title">Belum Menerima SK atau Akun Belum Aktif?</b>
            <p class="help__text">
              Silakan hubungi Sekretariat Panitia FLS2N/O2SN Disdikbud Kota Manado atau Sekretaris Dewan Juri untuk penerbitan
              token akses.
            </p>
            <a class="help__link" href="#"><ion-icon :icon="headsetOutline" /> Hubungi Helpdesk Panitia</a>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBackOutline,
  hammerOutline,
  idCardOutline,
  informationCircleOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  shieldOutline,
  arrowForwardOutline,
  headsetOutline,
} from 'ionicons/icons';

const router = useRouter();

const nip = ref('');
const password = ref('');
const show = ref(false);
const remember = ref(false);

function submit() {
  // TODO: sambungkan ke API login juri
  router.replace('/berandajuri');
}
</script>

<style scoped>
.login-content {
  --background: #f7f9fb;
}

.login {
  min-height: 100%;
  padding: calc(env(safe-area-inset-top, 0px) + 14px) 24px 32px;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.login h1,
.login p {
  margin: 0;
}

/* Navigasi */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__back {
  display: flex;
  width: 32px;
  padding: 0;
  border: 0;
  background: none;
  font-size: 28px;
  color: #0b3d91;
  cursor: pointer;
}

.nav__space {
  width: 32px;
}

.nav__badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #64748b;
}

.nav__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f5b400;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 22px;
  text-align: center;
}

.hero__logo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 0 40px rgba(47, 123, 224, 0.18), 0 4px 14px rgba(15, 23, 42, 0.08);
}

.hero__logo svg {
  width: 62px;
  height: 62px;
}

.hero__role {
  position: absolute;
  right: -8px;
  bottom: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #0b3d91;
  font-size: 16px;
  color: #fff;
}

.hero__pill {
  margin-top: 18px;
  padding: 7px 22px;
  border: 1px solid #b6d0f2;
  border-radius: 999px;
  background: #dbeafe;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

.hero__title {
  margin-top: 12px !important;
  font-size: 32px;
  line-height: 38px;
  font-weight: 800;
  color: #003178;
  letter-spacing: -0.5px;
}

.hero__desc {
  margin-top: 12px !important;
  padding: 0 4px;
  font-size: 14px;
  line-height: 23px;
  color: #475569;
}

/* Form */
.form {
  margin-top: 28px;
}

.field {
  margin-bottom: 18px;
}

.field__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.field__label {
  font-size: 16px;
  font-weight: 700;
}

.field__link {
  font-size: 13px;
  font-weight: 700;
  color: #00639a;
  text-decoration: none;
}

.field__link--small {
  font-size: 12px;
  font-weight: 600;
}

.field__hint {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px !important;
  font-size: 12px;
  color: #64748b;
}

.field__hint ion-icon {
  font-size: 15px;
}

.input {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 68px;
  padding: 0 18px;
  border: 1px solid #c3c6d4;
  border-radius: 16px;
  background: #fff;
}

.input:focus-within {
  border-color: #003178;
  box-shadow: 0 0 0 1px #003178;
}

.input__icon {
  flex: none;
  font-size: 24px;
  color: #64748b;
}

.input__control {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 14px;
  color: #191c1e;
}

.input__control::placeholder {
  color: #334155;
}

.input__eye {
  display: flex;
  padding: 0;
  border: 0;
  background: none;
  font-size: 26px;
  color: #64748b;
  cursor: pointer;
}

/* Ingat saya */
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  cursor: pointer;
}

.remember__box {
  width: 22px;
  height: 22px;
  margin: 0;
  accent-color: #003178;
  cursor: pointer;
}

.secure {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  background: #fdebd0;
  font-size: 12px;
  font-weight: 600;
  color: #7a4f00;
}

.secure ion-icon {
  font-size: 15px;
}

/* Tombol masuk */
.submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 60px;
  margin-top: 24px;
  border: 0;
  border-radius: 16px;
  background: #003178;
  font-family: inherit;
  font-size: 17px;
  font-weight: 800;
  color: #fff;
  box-shadow: 0 8px 18px rgba(0, 49, 120, 0.28);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.submit:active {
  transform: scale(0.98);
}

.submit ion-icon {
  font-size: 22px;
}

.or {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 22px;
}

.or::before,
.or::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #cbd5e1;
}

.or span {
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #94a3b8;
}

/* Bantuan */
.help {
  display: flex;
  gap: 14px;
  padding: 18px;
  margin-top: 48px;
  border: 1px solid #d5d9e0;
  border-radius: 20px;
  background: #f1f4f8;
}

.help__icon {
  width: 38px;
  height: 38px;
  flex: none;
  border-radius: 10px;
  background: #ffdeac;
}

.help__title {
  display: block;
  font-size: 15px;
  line-height: 20px;
}

.help__text {
  margin-top: 8px !important;
  font-size: 14px;
  line-height: 22px;
  color: #475569;
}

.help__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 14px;
  font-weight: 800;
  color: #00639a;
  text-decoration: none;
}

.help__link ion-icon {
  font-size: 18px;
}
</style>