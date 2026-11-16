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
              <span>Dinas Pendidikan Daerah Prov. Sulut</span>
            </div>
          </div>

          <button class="icon-btn" type="button" aria-label="Bantuan">
            <ion-icon :icon="helpCircleOutline" />
          </button>
        </header>

        <main class="main">

          <!-- Hero -->
          <section class="intro">
            <span class="status status-info">
              <ion-icon :icon="schoolOutline" />
              Portal Pendidik &amp; Pembimbing Kontingen
            </span>

            <h1>Pendaftaran Akun Guru Pembimbing</h1>

            <p>
              Validasi NUPTK / NIK terintegrasi langsung dengan database GTK Dapodik
              Kemendikbudristek &amp; Cabang Dinas Pendidikan Provinsi Sulawesi Utara.
            </p>

            <div class="note">
              <ion-icon :icon="informationCircleOutline" />
              <p>
                Pastikan NUPTK atau PegID Anda terdaftar aktif di pangkalan data Dapodik sekolah
                binaan.
              </p>
            </div>
          </section>

          <form class="form" novalidate @submit.prevent="kirim">

            <!-- 1. Identitas -->
            <section class="panel">
              <h2 class="step"><span>1</span> Validasi Identitas PTK</h2>

              <div class="field">
                <div class="label-row">
                  <label for="nuptk">NUPTK / PegID (16 Digit) <b>*</b></label>
                  <small>Wajib Dapodik</small>
                </div>

                <div class="input input--action" :class="{ 'input--error': tampilError('nuptk') }">
                  <input
                    id="nuptk"
                    v-model="form.nuptk"
                    type="text"
                    inputmode="numeric"
                    maxlength="16"
                    placeholder="Contoh: 8345763665210083"
                    autocomplete="off"
                    :aria-invalid="!!tampilError('nuptk')"
                    @blur="touched.nuptk = true"
                  />

                  <button
                    type="button"
                    class="btn-inline"
                    :disabled="!/^\d{16}$/.test(form.nuptk)"
                    @click="validasiDapodik"
                  >
                    <ion-icon :icon="checkmarkCircleOutline" />
                    Validasi Dapodik
                  </button>
                </div>
                <p v-if="tampilError('nuptk')" class="error" role="alert">{{ tampilError('nuptk') }}</p>
              </div>

              <div class="field">
                <label for="nik">Nomor Induk Kependudukan (NIK) <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('nik') }">
                  <ion-icon :icon="idCardOutline" class="input__lead" />
                  <input
                    id="nik"
                    v-model="form.nik"
                    type="text"
                    inputmode="numeric"
                    maxlength="16"
                    placeholder="16 digit sesuai e-KTP Sulawesi Utara"
                    autocomplete="off"
                    :aria-invalid="!!tampilError('nik')"
                    @blur="touched.nik = true"
                  />
                </div>
                <p v-if="tampilError('nik')" class="error" role="alert">{{ tampilError('nik') }}</p>
              </div>

              <div class="field">
                <label for="nama">Nama Lengkap &amp; Gelar <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('nama') }">
                  <ion-icon :icon="personOutline" class="input__lead" />
                  <input
                    id="nama"
                    v-model.trim="form.nama"
                    type="text"
                    placeholder="Misal: Dra. Maria Sondakh, M.Pd."
                    autocomplete="name"
                    :aria-invalid="!!tampilError('nama')"
                    @blur="touched.nama = true"
                  />
                </div>
                <p v-if="tampilError('nama')" class="error" role="alert">{{ tampilError('nama') }}</p>
                <p class="help">Gunakan ejaan resmi untuk pencetakan sertifikat pembimbing juara.</p>
              </div>
            </section>

            <!-- 2. Penugasan -->
            <section class="panel">
              <h2 class="step"><span>2</span> Data Penugasan &amp; Sekolah</h2>

              <div class="field">
                <label for="cabang">Cabang Dinas Wilayah (Sulawesi Utara) <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('cabang') }">
                  <ion-icon :icon="locationOutline" class="input__lead" />
                  <select
                    id="cabang"
                    v-model="form.cabang"
                    :class="{ 'is-empty': !form.cabang }"
                    :aria-invalid="!!tampilError('cabang')"
                    @blur="touched.cabang = true"
                  >
                    <option value="" disabled>Pilih Wilayah Cabang Dinas...</option>
                    <option v-for="c in cabangList" :key="c" :value="c">{{ c }}</option>
                  </select>
                  <ion-icon :icon="chevronDownOutline" class="input__trail" />
                </div>
                <p v-if="tampilError('cabang')" class="error" role="alert">{{ tampilError('cabang') }}</p>
              </div>

              <div class="field">
                <label for="sekolah">Asal Satuan Pendidikan (SMA / SMK / SLB) <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('sekolah') }">
                  <ion-icon :icon="businessOutline" class="input__lead" />
                  <input
                    id="sekolah"
                    v-model.trim="form.sekolah"
                    type="text"
                    placeholder="Ketik nama sekolah, contoh: SMAN 1 Manado"
                    autocomplete="organization"
                    :aria-invalid="!!tampilError('sekolah')"
                    @blur="touched.sekolah = true"
                  />
                </div>
                <p v-if="tampilError('sekolah')" class="error" role="alert">{{ tampilError('sekolah') }}</p>
              </div>

              <div class="field">
                <label for="mapel">Mata Pelajaran Diampu / Bidang Binaan <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('mapel') }">
                  <ion-icon :icon="bookOutline" class="input__lead" />
                  <input
                    id="mapel"
                    v-model.trim="form.mapel"
                    type="text"
                    placeholder="Contoh: Seni Budaya / TIK / Pembina OSIS / Ekskul"
                    :aria-invalid="!!tampilError('mapel')"
                    @blur="touched.mapel = true"
                  />
                </div>
                <p v-if="tampilError('mapel')" class="error" role="alert">{{ tampilError('mapel') }}</p>
              </div>
            </section>

            <!-- 3. Kontak -->
            <section class="panel">
              <h2 class="step"><span>3</span> Kontak &amp; Akses Masuk</h2>

              <div class="field">
                <label for="wa">Nomor WhatsApp Aktif <b>*</b></label>

                <div class="input input--phone" :class="{ 'input--error': tampilError('wa') }">
                  <span class="prefix">+62</span>
                  <input
                    id="wa"
                    v-model="form.wa"
                    type="tel"
                    inputmode="tel"
                    maxlength="13"
                    placeholder="812-3456-7890"
                    autocomplete="tel-national"
                    :aria-invalid="!!tampilError('wa')"
                    @blur="touched.wa = true"
                  />
                </div>
                <p v-if="tampilError('wa')" class="error" role="alert">{{ tampilError('wa') }}</p>
                <p class="help">Digunakan untuk notifikasi verifikasi karya &amp; OTP penilaian dewan juri.</p>
              </div>

              <div class="field">
                <label for="email">Email Resmi (belajar.id / Dinas / Pribadi) <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('email') }">
                  <ion-icon :icon="mailOutline" class="input__lead" />
                  <input
                    id="email"
                    v-model.trim="form.email"
                    type="email"
                    inputmode="email"
                    placeholder="nama.guru@guru.sma.belajar.id"
                    autocomplete="email"
                    :aria-invalid="!!tampilError('email')"
                    @blur="touched.email = true"
                  />
                </div>
                <p v-if="tampilError('email')" class="error" role="alert">{{ tampilError('email') }}</p>
              </div>

              <div class="field">
                <label for="sandi">Kata Sandi Akun <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('sandi') }">
                  <ion-icon :icon="lockClosedOutline" class="input__lead" />
                  <input
                    id="sandi"
                    v-model="form.sandi"
                    :type="lihat.sandi ? 'text' : 'password'"
                    placeholder="Minimal 8 karakter kombinasi huruf & angka"
                    autocomplete="new-password"
                    :aria-invalid="!!tampilError('sandi')"
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
                <p v-if="tampilError('sandi')" class="error" role="alert">{{ tampilError('sandi') }}</p>
              </div>

              <div class="field">
                <label for="konfirmasi">Konfirmasi Kata Sandi <b>*</b></label>

                <div class="input" :class="{ 'input--error': tampilError('konfirmasi') }">
                  <ion-icon :icon="refreshCircleOutline" class="input__lead" />
                  <input
                    id="konfirmasi"
                    v-model="form.konfirmasi"
                    :type="lihat.konfirmasi ? 'text' : 'password'"
                    placeholder="Ulangi kata sandi"
                    autocomplete="new-password"
                    :aria-invalid="!!tampilError('konfirmasi')"
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
                <p v-if="tampilError('konfirmasi')" class="error" role="alert">{{ tampilError('konfirmasi') }}</p>
              </div>
            </section>

            <!-- 4. Dokumen -->
            <section class="panel">
              <h2 class="step"><span>4</span> Dokumen Verifikasi Pembimbing</h2>

              <div class="field">
                <span class="label">
                  Surat Tugas / SK Kepala Sekolah Penetapan Pembimbing Lomba <b>*</b>
                </span>

                <input
                  ref="berkasInput"
                  type="file"
                  class="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  @change="pilihBerkas"
                />

                <div v-if="berkas" class="file">
                  <ion-icon :icon="documentTextOutline" />
                  <div class="file__text">
                    <strong>{{ berkas.name }}</strong>
                    <small>{{ ukuranBerkas }}</small>
                  </div>
                  <button type="button" class="file__remove" aria-label="Hapus berkas" @click="hapusBerkas">
                    <ion-icon :icon="closeCircle" />
                  </button>
                </div>

                <button
                  v-else
                  type="button"
                  class="upload"
                  :class="{ 'upload--error': tampilError('berkas'), 'upload--drag': seret }"
                  @click="berkasInput?.click()"
                  @dragover.prevent="seret = true"
                  @dragleave.prevent="seret = false"
                  @drop.prevent="jatuhkanBerkas"
                >
                  <span class="upload__icon"><ion-icon :icon="cloudUploadOutline" /></span>
                  <strong>Pilih atau Seret Berkas SK / Surat Tugas</strong>
                  <small>Format PDF, JPG, atau PNG (Maksimum 2 MB)</small>
                </button>

                <p v-if="tampilError('berkas')" class="error" role="alert">{{ tampilError('berkas') }}</p>

                <p class="privacy">
                  <ion-icon :icon="shieldCheckmarkOutline" />
                  Dokumen hanya digunakan untuk akreditasi dewan juri tingkat provinsi.
                </p>
              </div>
            </section>

            <!-- Pernyataan -->
            <label class="consent" :class="{ 'consent--error': tampilError('setuju') }">
              <input v-model="form.setuju" type="checkbox" @change="touched.setuju = true" />
              <span class="consent__box"><ion-icon :icon="checkmark" /></span>
              <span class="consent__text">
                Saya menyatakan dengan sesungguhnya bahwa seluruh data PTK adalah sah, dan sebagai
                Guru Pembimbing saya berkomitmen menjaga integritas, orisinalitas karya cipta
                peserta didik bimbingan, serta mematuhi seluruh regulasi Dinas Pendidikan Daerah
                Provinsi Sulawesi Utara.
              </span>
            </label>
            <p v-if="tampilError('setuju')" class="error error--center" role="alert">
              {{ tampilError('setuju') }}
            </p>

            <button type="submit" class="btn-validate">
              Daftar Sebagai Guru Pembimbing
              <ion-icon :icon="arrowForward" />
            </button>

            <p v-if="terkirim" class="success" role="status">
              <ion-icon :icon="checkmarkCircle" />
              Data pendaftaran siap dikirim.
            </p>
          </form>

          <p class="login-link">
            Sudah memiliki akun terdaftar?
            <button type="button" @click="keLogin">Masuk Portal Guru <ion-icon :icon="chevronForward" /></button>
          </p>

          <footer class="foot">
            <span><ion-icon :icon="lockClosedOutline" /> Transmisi Data Terenkripsi 256-Bit SSL / TLS</span>
            <small>
              Sistem Informasi Karya &amp; Prestasi Terbuka Dikda Sulut • Pemerintah Provinsi Sulawesi
              Utara
            </small>
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
  informationCircleOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  checkmark,
  idCardOutline,
  personOutline,
  locationOutline,
  chevronDownOutline,
  chevronForward,
  businessOutline,
  bookOutline,
  mailOutline,
  lockClosedOutline,
  refreshCircleOutline,
  eyeOutline,
  eyeOffOutline,
  cloudUploadOutline,
  documentTextOutline,
  closeCircle,
  shieldCheckmarkOutline
} from 'ionicons/icons';

const router = useRouter();

// TODO: ganti dengan daftar resmi Cabang Dinas Wilayah Sulawesi Utara
const cabangList = [
  'Cabang Dinas Wilayah Manado-Tomohon',
  'Cabang Dinas Wilayah Minahasa-Minahasa Utara',
  'Cabang Dinas Wilayah Bolaang Mongondow',
  'Cabang Dinas Wilayah Kepulauan'
];

const form = reactive({
  nuptk: '',
  nik: '',
  nama: '',
  cabang: '',
  sekolah: '',
  mapel: '',
  wa: '',
  email: '',
  sandi: '',
  konfirmasi: '',
  setuju: false
});

const lihat = reactive({ sandi: false, konfirmasi: false });
const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const terkirim = ref(false);

/* Hanya angka untuk NUPTK, NIK, dan WhatsApp */
function hanyaAngka(key: 'nuptk' | 'nik' | 'wa', maks: number) {
  watch(
    () => form[key],
    (v) => {
      const bersih = v.replace(/\D/g, '').slice(0, maks);
      if (bersih !== v) form[key] = bersih;
    }
  );
}
hanyaAngka('nuptk', 16);
hanyaAngka('nik', 16);
hanyaAngka('wa', 13);

/* Berkas */
const berkas = ref<File | null>(null);
const berkasError = ref('');
const berkasInput = ref<HTMLInputElement | null>(null);
const seret = ref(false);

const ukuranBerkas = computed(() => {
  if (!berkas.value) return '';
  const mb = berkas.value.size / (1024 * 1024);
  return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.ceil(berkas.value.size / 1024) + ' KB';
});

function terimaBerkas(file: File | undefined) {
  berkasError.value = '';
  if (!file) return;

  const tipeOk = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
  if (!tipeOk) {
    berkas.value = null;
    berkasError.value = 'Format berkas harus PDF, JPG, atau PNG.';
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    berkas.value = null;
    berkasError.value = 'Ukuran berkas maksimum 2 MB.';
    return;
  }
  berkas.value = file;
}

function pilihBerkas(e: Event) {
  terimaBerkas((e.target as HTMLInputElement).files?.[0]);
}

function jatuhkanBerkas(e: DragEvent) {
  seret.value = false;
  terimaBerkas(e.dataTransfer?.files?.[0]);
}

function hapusBerkas() {
  berkas.value = null;
  berkasError.value = '';
  if (berkasInput.value) berkasInput.value.value = '';
}

/* Validasi */
const errors = computed<Record<string, string>>(() => ({
  nuptk: /^\d{16}$/.test(form.nuptk) ? '' : 'NUPTK / PegID harus 16 digit angka.',
  nik: /^\d{16}$/.test(form.nik) ? '' : 'NIK harus 16 digit angka.',
  nama: form.nama.length >= 3 ? '' : 'Nama lengkap & gelar wajib diisi.',
  cabang: form.cabang ? '' : 'Pilih wilayah Cabang Dinas.',
  sekolah: form.sekolah.length >= 3 ? '' : 'Nama satuan pendidikan wajib diisi.',
  mapel: form.mapel.length >= 2 ? '' : 'Mata pelajaran / bidang binaan wajib diisi.',
  wa: /^8\d{8,11}$/.test(form.wa) ? '' : 'Masukkan nomor tanpa 0 di depan, contoh: 812 3456 7890.',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Format email belum benar.',
  sandi:
    form.sandi.length >= 8 && /[A-Za-z]/.test(form.sandi) && /\d/.test(form.sandi)
      ? ''
      : 'Minimal 8 karakter, kombinasi huruf dan angka.',
  konfirmasi: form.konfirmasi && form.konfirmasi === form.sandi ? '' : 'Konfirmasi belum sama dengan kata sandi.',
  berkas: berkas.value ? '' : berkasError.value || 'Surat Tugas / SK wajib diunggah.',
  setuju: form.setuju ? '' : 'Pernyataan harus disetujui untuk melanjutkan.'
}));

function tampilError(key: string) {
  return touched[key] || dicoba.value ? errors.value[key] : '';
}

const valid = computed(() => Object.values(errors.value).every((e) => !e));

/* Aksi */
function validasiDapodik() {
  // TODO: cek form.nuptk ke API Dapodik, lalu isi otomatis nama & sekolah jika ditemukan
  console.log('validasi dapodik');
}

async function kirim() {
  dicoba.value = true;
  terkirim.value = false;

  if (!valid.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>(
      '.input--error input, .input--error select, .upload--error, .consent--error'
    );
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  // TODO: kirim form dan berkas ke API pendaftaran.
  // Jangan menulis kata sandi ke console atau log.
  terkirim.value = true;
}

function keLogin() {
  // TODO: sesuaikan dengan route halaman login Anda
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
h2,
p {
  margin: 0;
}

b {
  color: #ba1a1a;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
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
  gap: 6px;
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
  color: #606572;
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

/* ---------- Intro ---------- */

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
}

.status ion-icon {
  font-size: 14px;
}

.status-info {
  background: #cfe6fb;
  color: #0b4fa6;
  border: 1px solid #b4d3f3;
}

.intro h1 {
  margin-top: 14px;
  font-size: 24px;
  line-height: 31px;
  font-weight: 800;
  color: #003178;
}

.intro > p {
  margin-top: 10px;
  font-size: 13px;
  line-height: 21px;
  color: #3d4452;
}

.note {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding: 14px;
  border-radius: 10px;
  background: #eceff3;
  border: 1px solid #dfe2e8;
}

.note ion-icon {
  margin-top: 1px;
  color: #00639a;
}

.note p {
  font-size: 12px;
  line-height: 18px;
  color: #3d4452;
}

/* ---------- Form ---------- */

.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.panel {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eceef2;
  font-size: 15px;
  font-weight: 800;
  color: #003178;
}

.step span {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #003178;
  color: #fff;
  font-size: 12px;
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

.label-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.label-row small {
  flex: none;
  font-size: 10px;
  color: #606572;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
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
  color: #565c69;
}

.input select {
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.input select.is-empty {
  color: #565c69;
}

.input__lead {
  font-size: 22px;
  color: #565c69;
}

.input__trail {
  font-size: 18px;
  color: #565c69;
  pointer-events: none;
}

.input__eye {
  display: flex;
  padding: 4px;
  color: #565c69;
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
  padding: 10px 11px;
  border-radius: 8px;
  background: #003f91;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
}

.btn-inline ion-icon {
  font-size: 15px;
}

.btn-inline:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.input--phone {
  padding-left: 0;
  gap: 0;
}

.prefix {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-right: 1px solid #c3c9d6;
  font-size: 13px;
  font-weight: 700;
  color: #003178;
}

.input--phone input {
  padding-left: 14px;
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

/* ---------- Unggah ---------- */

.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 22px 14px;
  border-radius: 12px;
  background: #f4f9ff;
  border: 2px dashed #7db5e8;
  text-align: center;
}

.upload--drag {
  background: #e4f0fd;
  border-color: #00639a;
}

.upload--error {
  border-color: #ba1a1a;
}

.upload__icon {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #dce7ff;
  color: #003178;
}

.upload__icon ion-icon {
  font-size: 26px;
}

.upload strong {
  margin-top: 6px;
  font-size: 12px;
  color: #003178;
}

.upload small {
  font-size: 10px;
  color: #606572;
}

.file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: #f0f8ff;
  border: 1px solid #bcd7f0;
  color: #003f91;
}

.file__text {
  flex: 1;
  min-width: 0;
}

.file__text strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #191c1e;
}

.file__text small {
  font-size: 10px;
  color: #606572;
}

.file__remove {
  display: flex;
  padding: 4px;
  color: #747985;
}

.privacy {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-size: 10px;
  color: #606572;
}

.privacy ion-icon {
  font-size: 16px;
  color: #00639a;
}

/* ---------- Pernyataan ---------- */

.consent {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  background: #eceff3;
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
  margin-top: 2px;
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
  min-height: 52px;
  border-radius: 14px;
  background: #0d47a1;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-validate ion-icon {
  font-size: 20px;
}

.btn-validate:focus-visible,
.btn-inline:focus-visible,
.upload:focus-visible,
.input__eye:focus-visible,
.login-link button:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

.success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #087443;
}

.success ion-icon {
  font-size: 18px;
}

.login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 12px;
  color: #50545d;
}

.login-link button {
  display: inline-flex;
  align-items: center;
  font-weight: 800;
  color: #003178;
}

.login-link ion-icon {
  font-size: 15px;
}

/* ---------- Footer ---------- */

.foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 12px;
  border-top: 1px solid #e3e6ec;
  text-align: center;
  font-size: 10px;
  line-height: 15px;
  color: #747985;
}

.foot span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.foot span ion-icon {
  font-size: 14px;
  color: #00639a;
}

</style>