<template>
  <ion-page>
    <ion-content :fullscreen="true" class="peserta-content">
      <div class="page">

        <!-- Header -->
        <header class="bar">
          <div class="brand">
            <button class="icon-btn" type="button" aria-label="Kembali" @click="router.back()">
              <ion-icon :icon="arrowBack" />
            </button>

            <div class="brand__text">
              <strong>Keamanan Akun</strong>
              <span>Ubah Kata Sandi Siswa</span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Bantuan">
              <ion-icon :icon="helpCircleOutline" />
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Kartu Profil Siswa Ringkas -->
          <section class="user-card">
            <div class="user-card__top">
              <div class="user-card__avatar">KP</div>
              <div class="user-card__info">
                <strong>Kevin Pangkey</strong>
                <small>NISN: 0064821901</small>
              </div>
              <span class="status-badge">
                Dapodik Aktif
              </span>
            </div>

            <p class="user-card__school">
              <ion-icon :icon="schoolOutline" />
              SMP Negeri 1 Manado • Kelas IX-A
            </p>

            <p class="user-card__desc">
              Kata sandi ini digunakan untuk login ke portal lomba, pengumpulan karya, dan pemantauan sertifikat SIKARYA Dikda Sulut.
            </p>
          </section>

          <!-- Panel Formulir Kata Sandi Baru -->
          <section class="panel">
            <div class="panel__head">
              <h2>
                <ion-icon :icon="lockClosedOutline" />
                Formulir Kata Sandi Baru
              </h2>
              <small class="text-muted">Wajib diisi</small>
            </div>

            <!-- Kata Sandi Saat Ini -->
            <div class="field">
              <label for="sandiLama">Kata Sandi Saat Ini <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('sandiLama') }">
                <input
                  id="sandiLama"
                  v-model="form.sandiLama"
                  :type="tampilSandiLama ? 'text' : 'password'"
                  placeholder="••••••••••••"
                  :aria-invalid="!!show('sandiLama')"
                  @blur="touched.sandiLama = true"
                />
                <button type="button" class="eye-btn" @click="tampilSandiLama = !tampilSandiLama">
                  <ion-icon :icon="tampilSandiLama ? eyeOffOutline : eyeOutline" />
                </button>
              </div>

              <div class="field__row-hint">
                <small class="help">Kata sandi akun aktif Anda</small>
                <button type="button" class="link-btn" @click="lupaSandi">Lupa kata sandi?</button>
              </div>
              <p v-if="show('sandiLama')" class="error" role="alert">{{ show('sandiLama') }}</p>
            </div>

            <!-- Kata Sandi Baru -->
            <div class="field">
              <label for="sandiBaru">Kata Sandi Baru <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('sandiBaru') }">
                <input
                  id="sandiBaru"
                  v-model="form.sandiBaru"
                  :type="tampilSandiBaru ? 'text' : 'password'"
                  placeholder="Buat kata sandi baru yang kuat"
                  :aria-invalid="!!show('sandiBaru')"
                  @blur="touched.sandiBaru = true"
                />
                <button type="button" class="eye-btn" @click="tampilSandiBaru = !tampilSandiBaru">
                  <ion-icon :icon="tampilSandiBaru ? eyeOffOutline : eyeOutline" />
                </button>
              </div>
              <p v-if="show('sandiBaru')" class="error" role="alert">{{ show('sandiBaru') }}</p>
            </div>

            <!-- Konfirmasi Kata Sandi Baru -->
            <div class="field">
              <label for="konfirmasiSandi">Konfirmasi Kata Sandi Baru <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('konfirmasiSandi') }">
                <input
                  id="konfirmasiSandi"
                  v-model="form.konfirmasiSandi"
                  :type="tampilKonfirmasi ? 'text' : 'password'"
                  placeholder="Ulangi kata sandi baru"
                  :aria-invalid="!!show('konfirmasiSandi')"
                  @blur="touched.konfirmasiSandi = true"
                />
                <button type="button" class="eye-btn" @click="tampilKonfirmasi = !tampilKonfirmasi">
                  <ion-icon :icon="tampilKonfirmasi ? eyeOffOutline : eyeOutline" />
                </button>
              </div>
              <p v-if="show('konfirmasiSandi')" class="error" role="alert">{{ show('konfirmasiSandi') }}</p>
            </div>

            <!-- Kotak Kriteria Keamanan Kata Sandi -->
            <div class="criteria-box">
              <div class="criteria-box__title">
                <ion-icon :icon="shieldCheckmarkOutline" />
                <strong>Kriteria Keamanan Kata Sandi</strong>
              </div>

              <ul class="criteria-list">
                <li :class="{ 'criteria-ok': syaratMinimalKarakter }">
                  <ion-icon :icon="syaratMinimalKarakter ? checkmarkCircle : ellipseOutline" />
                  <span>Minimal 8 karakter</span>
                </li>
                <li :class="{ 'criteria-ok': syaratKombinasiKarakter }">
                  <ion-icon :icon="syaratKombinasiKarakter ? checkmarkCircle : ellipseOutline" />
                  <span>Kombinasi huruf besar, huruf kecil, dan angka</span>
                </li>
                <li :class="{ 'criteria-ok': syaratSimbolKhusus }">
                  <ion-icon :icon="syaratSimbolKhusus ? checkmarkCircle : ellipseOutline" />
                  <span>Disarankan menggunakan simbol khusus (misal: @, #, !)</span>
                </li>
              </ul>
            </div>

            <!-- Kotak Peringatan Bantuan Operator -->
            <div class="warning-box">
              <ion-icon :icon="informationCircleOutline" />
              <p>
                Jika lupa kata sandi lama, segera temui <strong>Operator Dapodik di SMP Negeri 1 Manado</strong> untuk reset token dinas.
              </p>
            </div>

            <!-- Tombol Simpan -->
            <button
              type="button"
              class="btn-submit"
              :disabled="menyimpan"
              :aria-busy="menyimpan"
              @click="simpanKataSandi"
            >
              <ion-icon :icon="lockClosedOutline" />
              {{ menyimpan ? 'Menyimpan Kata Sandi...' : 'Simpan Kata Sandi Baru' }}
            </button>
          </section>

          <!-- Tautan Batal / Kembali ke Profil -->
          <button type="button" class="btn-cancel" @click="router.back()">
            <ion-icon :icon="closeOutline" />
            Batal / Kembali ke Profil
          </button>

          <!-- Footer Info -->
          <footer class="footer-info">
            <ion-icon :icon="shieldCheckmark" />
            <p>
              Sistem Informasi Karya Siswa Daerah (SIKARYA)<br />
              Dinas Pendidikan Daerah Provinsi Sulawesi Utara
            </p>
          </footer>

        </main>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBack,
  helpCircleOutline,
  schoolOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  shieldCheckmarkOutline,
  checkmarkCircle,
  ellipseOutline,
  informationCircleOutline,
  closeOutline,
  shieldCheckmark
} from 'ionicons/icons';

const router = useRouter();

/* State Form */
const form = reactive({
  sandiLama: '',
  sandiBaru: '',
  konfirmasiSandi: ''
});

const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const menyimpan = ref(false);

/* Toggle Password Visibility */
const tampilSandiLama = ref(false);
const tampilSandiBaru = ref(false);
const tampilKonfirmasi = ref(false);

/* Kriteria Validasi Real-time */
const syaratMinimalKarakter = computed(() => form.sandiBaru.length >= 8);
const syaratKombinasiKarakter = computed(() =>
  /[A-Z]/.test(form.sandiBaru) && /[a-z]/.test(form.sandiBaru) && /[0-9]/.test(form.sandiBaru)
);
const syaratSimbolKhusus = computed(() => /[^A-Za-z0-9]/.test(form.sandiBaru));

/* Validasi Keseluruhan */
const errors = computed<Record<string, string>>(() => ({
  sandiLama: form.sandiLama ? '' : 'Kata sandi saat ini wajib diisi.',
  sandiBaru:
    form.sandiBaru.length >= 8
      ? ''
      : 'Kata sandi baru minimal 8 karakter.',
  konfirmasiSandi:
    form.konfirmasiSandi === form.sandiBaru
      ? ''
      : 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru.'
}));

function show(key: string) {
  const pesan = errors.value[key];
  if (!pesan) return '';
  return dicoba.value || touched[key] ? pesan : '';
}

const valid = computed(() => Object.values(errors.value).every((e) => !e));

/* Aksi Tombol */
async function simpanKataSandi() {
  if (menyimpan.value) return;
  dicoba.value = true;

  if (!valid.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>('.input--error input');
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  menyimpan.value = true;
  try {
    // TODO: Kirim permintaan ubah kata sandi ke API backend
    console.log('Menyimpan kata sandi baru...');
  } finally {
    menyimpan.value = false;
  }
}

function lupaSandi() {
  console.log('Proses pemulihan / lupa kata sandi');
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
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
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
  text-align: left;
}

h1,
h2,
h3,
p {
  margin: 0;
}

small {
  font-size: 11px;
}

b {
  color: #ba1a1a;
}

/* ---------- Header ---------- */

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 12px 10px;
  background: #fff;
  border-bottom: 1px solid #d7dbe5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand__text strong {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 11px;
  line-height: 14px;
  color: #50545d;
}

.icon-btn {
  display: flex;
  padding: 6px;
  color: #003178;
}

.icon-btn ion-icon {
  font-size: 22px;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 14px 14px 32px;
}

/* ---------- User Card Ringkas ---------- */

.user-card {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.user-card__top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.user-card__avatar {
  width: 42px;
  height: 42px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #002256 0%, #0b4fa6 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}

.user-card__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.user-card__info strong {
  font-size: 15px;
  font-weight: 800;
  color: #191c1e;
}

.user-card__info small {
  color: #50545d;
  font-size: 11.5px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  background: #d9f4e4;
  color: #0b5f3a;
  font-size: 11px;
  font-weight: 700;
}

.user-card__school {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #0b4fa6;
  margin-bottom: 6px;
}

.user-card__school ion-icon {
  font-size: 16px;
}

.user-card__desc {
  font-size: 11.5px;
  line-height: 17px;
  color: #50545d;
}

/* ---------- Panel Formulir ---------- */

.panel {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 4px;
  margin-bottom: 4px;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 14.5px;
  font-weight: 800;
  color: #003178;
}

.panel__head h2 ion-icon {
  font-size: 20px;
}

.text-muted {
  color: #747985;
  font-weight: 600;
}

/* ---------- Field Form ---------- */

.field {
  margin-top: 14px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.field__row-hint {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 5px;
}

.input {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #c3c9d6;
}

.input:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.input--error,
.input--error:focus-within {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.input input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 46px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  color: #191c1e;
}

.input input::placeholder {
  color: #747985;
}

.eye-btn {
  display: flex;
  padding: 6px;
  color: #50545d;
}

.eye-btn ion-icon {
  font-size: 20px;
}

.help {
  font-size: 11px;
  color: #606572;
}

.link-btn {
  font-size: 11px;
  font-weight: 700;
  color: #0b4fa6;
}

.error {
  margin-top: 5px;
  font-size: 11px;
  line-height: 15px;
  color: #ba1a1a;
}

/* ---------- Kriteria Keamanan Box ---------- */

.criteria-box {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #f4f8ff;
  border: 1px solid #c5dbf8;
}

.criteria-box__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #003178;
  margin-bottom: 8px;
}

.criteria-box__title ion-icon {
  font-size: 17px;
}

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.criteria-list li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 11.5px;
  color: #50545d;
}

.criteria-list li ion-icon {
  font-size: 16px;
  color: #747985;
}

.criteria-list li.criteria-ok {
  color: #0b5f3a;
  font-weight: 600;
}

.criteria-list li.criteria-ok ion-icon {
  color: #10b981;
}

/* ---------- Warning Box (Operator Dapodik) ---------- */

.warning-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 14px;
  padding: 12px;
  border-radius: 12px;
  background: #fff8eb;
  border: 1px solid #fce8b2;
}

.warning-box ion-icon {
  font-size: 18px;
  color: #b47300;
  flex: none;
  margin-top: 1px;
}

.warning-box p {
  font-size: 11.5px;
  line-height: 16px;
  color: #5a3e00;
}

/* ---------- Tombol Simpan Kata Sandi ---------- */

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  margin-top: 16px;
  padding: 0 16px;
  border-radius: 12px;
  background: #003178;
  color: #fff;
  font-size: 13.5px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 49, 120, 0.25);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-submit ion-icon {
  font-size: 20px;
}

/* ---------- Tombol Batal ---------- */

.btn-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 46px;
  margin-top: 12px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #aeb4c1;
  color: #3d4452;
  font-size: 12.5px;
  font-weight: 700;
}

.btn-cancel ion-icon {
  font-size: 18px;
}

/* ---------- Footer Info ---------- */

.footer-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  text-align: center;
  color: #747985;
}

.footer-info ion-icon {
  font-size: 24px;
  color: #0b4fa6;
}

.footer-info p {
  font-size: 10.5px;
  line-height: 15px;
}
</style>