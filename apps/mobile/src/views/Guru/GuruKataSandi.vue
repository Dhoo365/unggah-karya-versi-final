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
              <strong>Keamanan &amp; Kata Sandi</strong>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Bantuan">
            <ion-icon :icon="helpCircleOutline" />
          </button>
        </header>

        <main class="main">

          <section class="account">
            <div class="account__avatar">RG</div>

            <div class="account__text">
              <strong>{{ akun.nama }}</strong>
              <span>{{ akun.peran }}</span>
            </div>

            <span class="status status-info">NIP<br />Aktif</span>
          </section>

          <form class="panel" novalidate @submit.prevent="simpan">
            <h2>Ubah Kata Sandi</h2>
            <p class="panel__desc">
              Perbarui kata sandi secara berkala untuk menjaga keamanan akun portal guru Anda.
            </p>

            <div v-for="f in fields" :key="f.key" class="field">
              <label :for="'pw-' + f.key">{{ f.label }}</label>

              <div class="input" :class="{ 'input--error': f.key === 'konfirmasi' && tidakCocok }">
                <ion-icon :icon="f.icon" class="input__lead" />

                <input
                  :id="'pw-' + f.key"
                  v-model="form[f.key]"
                  :type="lihat[f.key] ? 'text' : 'password'"
                  :placeholder="f.placeholder"
                  :autocomplete="f.autocomplete"
                />

                <button
                  type="button"
                  class="input__eye"
                  :aria-label="lihat[f.key] ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
                  :aria-pressed="lihat[f.key]"
                  @click="lihat[f.key] = !lihat[f.key]"
                >
                  <ion-icon :icon="lihat[f.key] ? eyeOffOutline : eyeOutline" />
                </button>
              </div>

              <p v-if="f.key === 'konfirmasi' && tidakCocok" class="error" role="alert">
                Konfirmasi kata sandi belum sama dengan kata sandi baru.
              </p>
            </div>

            <div class="rules">
              <strong>Ketentuan Kata Sandi:</strong>

              <ul>
                <li :class="{ ok: minimal8 }">
                  <ion-icon :icon="minimal8 ? checkmarkCircle : ellipseOutline" />
                  Minimal 8 karakter
                </li>

                <li :class="{ ok: kombinasi }">
                  <ion-icon :icon="kombinasi ? checkmarkCircle : ellipseOutline" />
                  Kombinasi huruf &amp; angka
                </li>
              </ul>
            </div>

            <button type="submit" class="btn-validate" :disabled="!bisaSimpan">
              <ion-icon :icon="saveOutline" />
              Perbarui Kata Sandi
            </button>

            <p v-if="berhasil" class="success" role="status">
              <ion-icon :icon="checkmarkCircle" />
              Kata sandi berhasil diperbarui.
            </p>
          </form>

          <footer class="foot">
            <span>
              Pusat Bantuan Teknis Dinas Pendidikan Daerah Provinsi Sulawesi Utara
            </span>
            <small>Versi Aplikasi v2.4.0 (Android Native Layout)</small>
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
  helpCircleOutline,
  lockClosedOutline,
  refreshCircleOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  ellipseOutline,
  eyeOutline,
  eyeOffOutline,
  saveOutline
} from 'ionicons/icons';

const router = useRouter();

const akun = {
  nama: 'Drs. Robby Gerungan, M.Pd',
  peran: 'Guru Pembina • SMAN 1 Manado'
};

type Key = 'lama' | 'baru' | 'konfirmasi';

const fields: {
  key: Key;
  label: string;
  placeholder: string;
  autocomplete: string;
  icon: string;
}[] = [
  {
    key: 'lama',
    label: 'Kata Sandi Saat Ini',
    placeholder: 'Masukkan kata sandi lama',
    autocomplete: 'current-password',
    icon: lockClosedOutline
  },
  {
    key: 'baru',
    label: 'Kata Sandi Baru',
    placeholder: 'Buat kata sandi baru',
    autocomplete: 'new-password',
    icon: refreshCircleOutline
  },
  {
    key: 'konfirmasi',
    label: 'Konfirmasi Kata Sandi Baru',
    placeholder: 'Ulangi kata sandi baru',
    autocomplete: 'new-password',
    icon: checkmarkCircleOutline
  }
];

const form = reactive<Record<Key, string>>({ lama: '', baru: '', konfirmasi: '' });
const lihat = reactive<Record<Key, boolean>>({ lama: false, baru: false, konfirmasi: false });
const berhasil = ref(false);

const minimal8 = computed(() => form.baru.length >= 8);
const kombinasi = computed(() => /[A-Za-z]/.test(form.baru) && /\d/.test(form.baru));
const tidakCocok = computed(
  () => form.konfirmasi.length > 0 && form.konfirmasi !== form.baru
);

const bisaSimpan = computed(
  () =>
    form.lama.length > 0 &&
    minimal8.value &&
    kombinasi.value &&
    form.konfirmasi === form.baru
);

function simpan() {
  if (!bisaSimpan.value) return;

  // TODO: kirim form.lama dan form.baru ke API ubah kata sandi.
  // Jangan menulis kata sandi ke console atau log.

  form.lama = '';
  form.baru = '';
  form.konfirmasi = '';
  berhasil.value = true;
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
ul {
  margin: 0;
}

ul {
  padding: 0;
  list-style: none;
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

.brand__text strong {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
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
  padding: 14px 14px 28px;
}

/* ---------- Akun ---------- */

.account {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 13px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.account__avatar {
  width: 46px;
  height: 46px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #003178;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
}

.account__text {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.account__text strong {
  font-size: 13px;
  line-height: 18px;
}

.account__text span {
  margin-top: 1px;
  font-size: 11px;
  color: #606572;
}

.status {
  flex: none;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  line-height: 14px;
}

.status-info {
  background: #dce7ff;
  color: #0b4fa6;
}

/* ---------- Panel form ---------- */

.panel {
  padding: 18px 16px 20px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.panel h2 {
  font-size: 18px;
  line-height: 24px;
  font-weight: 800;
  color: #003178;
}

.panel__desc {
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  color: #50545d;
}

.field {
  margin-top: 16px;
}

.field label {
  display: block;
  margin-bottom: 7px;
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 52px;
  padding: 0 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #c3c9d6;
}

.input:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.input--error {
  border-color: #ba1a1a;
}

.input--error:focus-within {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.input__lead {
  font-size: 22px;
  color: #565c69;
}

.input input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: #191c1e;
}

.input input::placeholder {
  color: #565c69;
}

.input__eye {
  display: flex;
  padding: 4px;
  color: #565c69;
}

.input__eye ion-icon {
  font-size: 24px;
}

.input__eye:focus-visible,
.btn-validate:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
  border-radius: 8px;
}

.error {
  margin-top: 6px;
  font-size: 11px;
  color: #ba1a1a;
}

/* ---------- Ketentuan ---------- */

.rules {
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f0f2f5;
}

.rules strong {
  font-size: 11px;
  font-weight: 600;
  color: #3d4452;
}

.rules ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.rules li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #3d4452;
}

.rules li ion-icon {
  font-size: 20px;
  color: #747985;
}

.rules li.ok {
  color: #087443;
}

.rules li.ok ion-icon {
  color: #16a34a;
}

/* ---------- Tombol ---------- */

.btn-validate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  margin-top: 18px;
  border-radius: 12px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 49, 120, .18);
}

.btn-validate:disabled {
  opacity: .45;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-validate ion-icon {
  font-size: 22px;
}

.success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #087443;
}

.success ion-icon {
  font-size: 18px;
}

/* ---------- Footer ---------- */

.foot {
  padding: 4px 12px 0;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: #747985;
}

.foot small {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #b3b8c2;
}

</style>