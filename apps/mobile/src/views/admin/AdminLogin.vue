<template>
  <ion-page>
    <ion-content :fullscreen="true" class="adm-content">
      <div class="adm">
        <!-- Top bar -->
        <header class="topbar">
          <button class="icon-btn" type="button" aria-label="Kembali" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>

          <div class="brand-badge" aria-hidden="true">
            <ion-icon :icon="shieldCheckmarkOutline" />
          </div>

          <div class="topbar__text">
            <span>SIKARYA SULUT</span>
            <strong>Login Administrator</strong>
          </div>

          <button
            class="avatar-btn"
            type="button"
            aria-label="Profil Administrator"
            @click="openProfileInfo"
          >
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=AdminSulut&backgroundColor=e2e8f0"
              alt="Profil"
            />
          </button>
        </header>

        <main class="body">
          <!-- Emblem & Title -->
          <section class="hero">
            <div class="hero__emblem">
              <div class="hero__card">
                <ion-icon :icon="cloudUploadOutline" class="hero__main-icon" />
                <span class="hero__sparkle"><ion-icon :icon="sparklesOutline" /></span>
              </div>
              <span class="hero__shield" aria-hidden="true">
                <ion-icon :icon="shieldHalfOutline" />
              </span>
            </div>

            <div class="security-pill">
              <ion-icon :icon="shieldCheckmarkOutline" />
              <span>SISTEM TERPROTEKSI • AKSES KHUSUS ADMINISTRATOR</span>
            </div>

            <h1 class="hero__title">Login Portal Administrator</h1>
            <p class="hero__desc">
              Masuk dengan NIP/ID Dinas dan Kredensial Resmi Dikda Sulut Wilayah Kota Manado
            </p>
          </section>

          <!-- Official Zone Banner -->
          <section class="zone-banner" aria-label="Zona Resmi">
            <div class="zone-banner__icon">
              <ion-icon :icon="shieldCheckmarkOutline" />
            </div>
            <div class="zone-banner__body">
              <div class="zone-banner__top">
                <strong>DISDIKBUD KOTA MANADO</strong>
                <span class="zone-banner__dot"></span>
                <span>Zona Resmi</span>
              </div>
              <p>
                Khusus Tim Pengelola Lomba, Verifikator Dapodik, dan Admin Cabang Dinas Pendidikan
                Sulawesi Utara.
              </p>
            </div>
          </section>

          <!-- Form Login -->
          <form class="form" @submit.prevent="handleLogin" novalidate>
            <!-- NIP / ID Petugas -->
            <div class="field">
              <div class="field__label-row">
                <label for="nip" class="field__label">Nomor Induk Pegawai (NIP) / ID Petugas</label>
                <span class="field__hint field__hint--blue">Wajib ASN/PPPK</span>
              </div>
              <div class="input-box" :class="{ 'input-box--error': !!errors.nip }">
                <ion-icon :icon="idCardOutline" class="input-box__leading" />
                <input
                  id="nip"
                  v-model.trim="form.nip"
                  type="text"
                  inputmode="numeric"
                  autocomplete="username"
                  placeholder="198503122010011008"
                />
              </div>
              <p v-if="errors.nip" class="field__error">{{ errors.nip }}</p>
            </div>

            <!-- Kata Sandi Dinas -->
            <div class="field">
              <div class="field__label-row">
                <label for="password" class="field__label">Kata Sandi Dinas</label>
                <span class="field__hint">Enkripsi 256-Bit</span>
              </div>
              <div class="input-box" :class="{ 'input-box--error': !!errors.password }">
                <ion-icon :icon="lockClosedOutline" class="input-box__leading" />
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="••••••••••••••"
                />
                <button
                  type="button"
                  class="input-box__eye"
                  :aria-label="showPassword ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'"
                  @click="showPassword = !showPassword"
                >
                  <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
                </button>
              </div>
              <p v-if="errors.password" class="field__error">{{ errors.password }}</p>
            </div>

            <!-- Unit Kerja Otoritas -->
            <div class="field">
              <div class="field__label-row">
                <label for="unit" class="field__label">Unit Kerja Otoritas</label>
              </div>
              <div class="input-box">
                <ion-icon :icon="businessOutline" class="input-box__leading" />
                <select id="unit" v-model="form.unit" class="select-control">
                  <option value="disdikbud-manado-pembinaan">
                    Disdikbud Kota Manado - Seksi Pembinaa
                  </option>
                  <option value="disdikbud-manado-dapodik">
                    Disdikbud Kota Manado - Verifikator Dapodik
                  </option>
                  <option value="cabdin-sulut-manado">
                    Cabang Dinas Pendidikan Sulut - Wilayah Manado
                  </option>
                  <option value="tim-lomba-sikarya">
                    Tim Pengelola Lomba SIKARYA Sulut
                  </option>
                </select>
                <ion-icon :icon="chevronDownOutline" class="input-box__chevron" />
              </div>
            </div>

            <!-- Ingat Perangkat & Lupa Kredensial -->
            <div class="meta-row">
              <label class="check">
                <input v-model="form.rememberDevice" type="checkbox" />
                <span class="check__box" aria-hidden="true">
                  <ion-icon v-if="form.rememberDevice" :icon="checkmarkOutline" />
                </span>
                <span>Ingat Perangkat Ini</span>
              </label>

              <button type="button" class="link-btn" @click="forgotCredential">
                Lupa Kredensial?
              </button>
            </div>

            <!-- Primary CTA -->
            <button class="cta" type="submit" :disabled="loading">
              <span>Masuk ke Dashboard Pengelola</span>
              <ion-icon
                :icon="loading ? syncOutline : arrowForwardOutline"
                :class="{ spin: loading }"
              />
            </button>

            <!-- SSO Button -->
            <button class="sso-btn" type="button" :disabled="loading" @click="loginWithSso">
              <ion-icon :icon="gitNetworkOutline" />
              <span>Masuk via SSO ASN Digital Sulut</span>
            </button>
          </form>

          <!-- Security Audit Alert -->
          <section class="audit-alert" role="status" aria-live="polite">
            <div class="audit-alert__head">
              <ion-icon :icon="hammerOutline" class="audit-alert__icon" />
              <strong>PERHATIAN AUDIT KEAMANAN</strong>
            </div>
            <p class="audit-alert__text">
              Setiap aktivitas login, perubahan data peserta, dan verifikasi berkas dicatat secara
              otomatis dalam log sistem
              <span class="audit-alert__link" @click="openAuditInfo">Disdikbud Sulut.</span>
            </p>

            <!-- Floating Toast Overlay mirip gambar -->
            <div v-if="toastVisible" class="toast-bar">
              <ion-icon :icon="informationCircleOutline" class="toast-bar__icon" />
              <span class="toast-bar__msg">{{ toastMessage }}</span>
              <button
                type="button"
                class="toast-bar__close"
                aria-label="Tutup notifikasi"
                @click="toastVisible = false"
              >
                <ion-icon :icon="closeOutline" />
              </button>
            </div>
          </section>

          <!-- Help & Back to Student/Teacher Portal -->
          <div class="support">
            <p class="support__hotline">
              <ion-icon :icon="headsetOutline" />
              <span>
                Bantuan Teknis IT Balai Tekkomdik: <strong>(0431) 851-7782</strong>
              </span>
            </p>

            <button type="button" class="portal-switch" @click="backToPortal">
              <ion-icon :icon="arrowBackOutline" />
              <span>Bukan Administrator? Kembali ke Portal Siswa &amp; Guru</span>
            </button>
          </div>
        </main>

        <footer class="foot">
          SIKARYA V2.4 • DINAS PENDIDIKAN DAERAH PROVINSI SULAWESI UTARA
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBackOutline,
  arrowForwardOutline,
  businessOutline,
  checkmarkOutline,
  chevronDownOutline,
  closeOutline,
  cloudUploadOutline,
  eyeOffOutline,
  eyeOutline,
  gitNetworkOutline,
  hammerOutline,
  headsetOutline,
  idCardOutline,
  informationCircleOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  shieldHalfOutline,
  sparklesOutline,
  syncOutline,
} from 'ionicons/icons';

const router = useRouter();

const form = reactive({
  nip: '',
  password: '',
  unit: 'disdikbud-manado-pembinaan',
  rememberDevice: false,
});

const errors = reactive<{ nip?: string; password?: string }>({});
const showPassword = ref(false);
const loading = ref(false);
const toastVisible = ref(true);
const toastMessage = ref('Memproses otentikasi ASN...');

function showToast(msg: string) {
  toastMessage.value = msg;
  toastVisible.value = true;
}

function validate(): boolean {
  errors.nip = undefined;
  errors.password = undefined;

  if (!form.nip) {
    errors.nip = 'NIP / ID Petugas wajib diisi.';
  }
  if (!form.password) {
    errors.password = 'Kata sandi dinas wajib diisi.';
  }

  return !errors.nip && !errors.password;
}

async function handleLogin() {
  if (loading.value) return;
  if (!validate()) return;

  loading.value = true;
  showToast('Memproses otentikasi ASN...');

  try {
    // TODO: panggil endpoint autentikasi administrator & verifikasi unit kerja
    await new Promise((r) => setTimeout(r, 1200));
    router.replace('/admin/dashboard');
  } finally {
    loading.value = false;
  }
}

async function loginWithSso() {
  if (loading.value) return;
  loading.value = true;
  showToast('Menghubungkan ke SSO ASN Digital Sulut...');

  try {
    // TODO: redirect / OAuth SSO ASN Digital Sulut
    await new Promise((r) => setTimeout(r, 1000));
  } finally {
    loading.value = false;
  }
}

function forgotCredential() {
  showToast('Hubungi Admin Dikda / Balai Tekkomdik untuk reset kredensial.');
}

function openAuditInfo() {
  showToast('Log audit keamanan aktif untuk sesi administrator.');
}

function openProfileInfo() {
  showToast('Silakan masuk terlebih dahulu untuk melihat profil.');
}

function backToPortal() {
  router.replace('/login');
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.adm-content {
  --background: #f8faff;
}

.adm {
  --royal: #08338a;
  --royal-dark: #062566;
  --royal-mid: #0c47b8;
  --soft-blue: #dce8ff;
  --field-bg: #f1f4f8;
  --line: #e2e8f0;
  min-height: 100%;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 20px);
  background: linear-gradient(180deg, #ffffff 0%, #f8faff 48%, #f4f7fb 100%);
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

/* ---------- Top bar ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px;
  background: #fff;
  border-bottom: 1px solid #eef2f7;
}
.icon-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: none;
  color: #0f172a;
  font-size: 22px;
  cursor: pointer;
}
.brand-badge {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--royal);
  color: #fff;
  font-size: 18px;
}
.topbar__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  line-height: 1.2;
}
.topbar__text span {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.7px;
  color: var(--royal);
}
.topbar__text strong {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}
.avatar-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  background: #f1f5f9;
  overflow: hidden;
  cursor: pointer;
}
.avatar-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ---------- Body ---------- */
.body {
  padding: 20px 16px 0;
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.hero__emblem {
  position: relative;
  display: grid;
  place-items: center;
  width: 92px;
  height: 92px;
  border-radius: 26px;
  background: #fff;
  box-shadow: 0 10px 26px rgba(8, 51, 138, 0.09);
  border: 1px solid #eef2f8;
}
.hero__card {
  position: relative;
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 16px;
  background: linear-gradient(145deg, #e8f1ff 0%, #cfe0ff 100%);
}
.hero__main-icon {
  font-size: 32px;
  color: var(--royal);
}
.hero__sparkle {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 13px;
  color: #f59e0b;
}
.hero__shield {
  position: absolute;
  right: 4px;
  bottom: 4px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--royal);
  border: 2px solid #fff;
  color: #fff;
  font-size: 13px;
}

.security-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  padding: 7px 14px;
  border-radius: 999px;
  background: #e3ecff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--royal);
}
.security-pill ion-icon {
  flex-shrink: 0;
  font-size: 14px;
}

.hero__title {
  margin: 14px 0 0;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 800;
  color: var(--royal-dark);
}
.hero__desc {
  margin: 8px 0 0;
  max-width: 340px;
  font-size: 13px;
  line-height: 1.55;
  color: #475569;
}

/* Official Zone Banner */
.zone-banner {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 18px;
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(125deg, #072f82 0%, #0d47b8 65%, #1959cf 100%);
  color: #fff;
  box-shadow: 0 8px 20px rgba(8, 51, 138, 0.22);
  overflow: hidden;
}
.zone-banner::after {
  content: '';
  position: absolute;
  right: -28px;
  bottom: -28px;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  pointer-events: none;
}
.zone-banner__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  color: #fbbf24;
  font-size: 21px;
}
.zone-banner__body {
  position: relative;
  z-index: 1;
  min-width: 0;
}
.zone-banner__top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
}
.zone-banner__top strong {
  font-weight: 800;
  letter-spacing: 0.4px;
}
.zone-banner__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fbbf24;
}
.zone-banner__top span:last-child {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
}
.zone-banner__body p {
  margin: 5px 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
}

/* Form */
.form {
  margin-top: 20px;
}
.field {
  margin-bottom: 16px;
}
.field__label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 7px;
}
.field__label {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
}
.field__hint {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
}
.field__hint--blue {
  color: var(--royal-mid);
}

.input-box {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid #e6ebf2;
  border-radius: 14px;
  background: var(--field-bg);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.input-box:focus-within {
  border-color: var(--royal-mid);
  background: #fff;
}
.input-box--error {
  border-color: #dc2626;
  background: #fef2f2;
}
.input-box__leading {
  flex-shrink: 0;
  margin-right: 10px;
  font-size: 19px;
  color: #64748b;
}
.input-box input,
.select-control {
  flex: 1;
  min-width: 0;
  height: 48px;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  color: #0f172a;
  outline: none;
}
.input-box input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}
.select-control {
  padding-right: 24px;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.input-box__chevron {
  position: pointer-events;
  pointer-events: none;
  flex-shrink: 0;
  font-size: 18px;
  color: #334155;
}
.input-box__eye {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  background: none;
  color: #475569;
  font-size: 19px;
  cursor: pointer;
}
.field__error {
  margin: 5px 0 0 2px;
  font-size: 11.5px;
  font-weight: 500;
  color: #dc2626;
}

/* Meta row */
.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 6px 0 18px;
}
.check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
}
.check input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.check__box {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border: 1.5px solid #cbd5e1;
  border-radius: 5px;
  background: #fff;
  color: #fff;
  font-size: 13px;
}
.check input:checked + .check__box {
  border-color: var(--royal);
  background: var(--royal);
}
.link-btn {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--royal);
  cursor: pointer;
}

/* Buttons */
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(180deg, #093691 0%, #06286e 100%);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(8, 51, 138, 0.25);
  cursor: pointer;
}
.cta ion-icon {
  font-size: 18px;
}
.cta:active:not(:disabled) {
  transform: scale(0.985);
}
.cta:disabled {
  opacity: 0.75;
}

.sso-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  margin-top: 12px;
  border: 1px solid #cfe0ff;
  border-radius: 14px;
  background: #dce9ff;
  color: var(--royal-dark);
  font: inherit;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
}
.sso-btn ion-icon {
  font-size: 18px;
  color: var(--royal);
}
.sso-btn:active:not(:disabled) {
  background: #cde0ff;
}

.spin {
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Audit Alert & Floating Toast */
.audit-alert {
  position: relative;
  margin-top: 18px;
  padding: 15px 16px;
  border: 1px solid #f7d3cf;
  border-radius: 16px;
  background: #fdeae8;
}
.audit-alert__head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #991b1b;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
}
.audit-alert__icon {
  font-size: 17px;
  color: #b91c1c;
}
.audit-alert__text {
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.55;
  color: #b91c1c;
}
.audit-alert__link {
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
}

.toast-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #2f3136;
  color: #f8fafc;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.24);
}
.toast-bar__icon {
  flex-shrink: 0;
  font-size: 19px;
  color: #facc15;
}
.toast-bar__msg {
  flex: 1;
  min-width: 0;
  font-size: 12.5px;
  font-weight: 500;
}
.toast-bar__close {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #cbd5e1;
  font-size: 18px;
  cursor: pointer;
}

/* Support & Footer */
.support {
  margin-top: 22px;
  text-align: center;
}
.support__hotline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  font-size: 12px;
  color: #475569;
}
.support__hotline ion-icon {
  font-size: 16px;
  color: #334155;
}
.support__hotline strong {
  color: #0f172a;
  font-weight: 700;
}

.portal-switch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 12px;
  padding: 4px 8px;
  border: 0;
  background: none;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--royal);
  cursor: pointer;
}
.portal-switch ion-icon {
  font-size: 16px;
}

.foot {
  margin-top: 18px;
  padding: 0 20px;
  text-align: center;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.6px;
  line-height: 1.5;
  color: #94a3b8;
}

/* Focus */
.icon-btn:focus-visible,
.avatar-btn:focus-visible,
.link-btn:focus-visible,
.cta:focus-visible,
.sso-btn:focus-visible,
.portal-switch:focus-visible,
.toast-bar__close:focus-visible {
  outline: 2px solid var(--royal-mid);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .spin {
    animation: none;
  }
}
</style>