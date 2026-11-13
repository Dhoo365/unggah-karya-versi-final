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
              <strong>Unggah Karya Siswa</strong>
              <span>SMP Negeri 1 Manado <i class="sep"></i> Wilayah Cabdin Manado</span>
            </div>
          </div>

          <div class="bar__actions">
            <span class="emblem"><ion-icon :icon="ribbonOutline" /></span>

            <button class="icon-btn" type="button" aria-label="Bantuan">
              <ion-icon :icon="helpCircleOutline" />
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Stepper -->
          <ol class="stepper" aria-label="Tahapan unggah karya">
            <li class="st st--done">
              <span class="st__dot"><ion-icon :icon="checkmark" /></span>
              <small>Identitas</small>
            </li>

            <li class="st__line st__line--done" aria-hidden="true"></li>

            <li class="st st--now" aria-current="step">
              <span class="st__dot"><ion-icon :icon="cloudUploadOutline" /></span>
              <small>Berkas &amp; Media</small>
            </li>

            <li class="st__line" aria-hidden="true"></li>

            <li class="st">
              <span class="st__dot">3</span>
              <small>Validasi</small>
            </li>
          </ol>

          <!-- 1. Siswa & cabang -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="idCardOutline" /> 1. Siswa Binaan &amp; Cabang Lomba</h2>

              <span class="status status-blue">
                <ion-icon :icon="checkmarkCircleOutline" />
                Terverifikasi
              </span>
            </div>

            <div class="box">
              <small class="box__label">Siswa Peserta Terpilih</small>

              <div class="student">
                <span class="student__avatar">{{ inisial(siswa.nama) }}</span>

                <div class="student__text">
                  <strong>{{ siswa.nama }}</strong>
                  <small>NISN: {{ siswa.nisn }} • Kelas {{ siswa.kelas }}</small>
                </div>

                <button
                  type="button"
                  class="student__change"
                  :aria-expanded="pilihSiswaTerbuka"
                  aria-haspopup="listbox"
                  @click="pilihSiswaTerbuka = !pilihSiswaTerbuka"
                >
                  Ganti <ion-icon :icon="chevronDownOutline" />
                </button>
              </div>

              <ul v-if="pilihSiswaTerbuka" class="student-list" role="listbox" aria-label="Pilih siswa">
                <li v-for="s in daftarSiswa" :key="s.nisn" role="option" :aria-selected="s.nisn === siswa.nisn">
                  <button type="button" @click="pilihSiswa(s)">
                    <strong>{{ s.nama }}</strong>
                    <small>NISN: {{ s.nisn }} • Kelas {{ s.kelas }}</small>
                  </button>
                </li>
              </ul>
            </div>

            <div class="box box--white">
              <div class="contest__top">
                <small class="box__label">Cabang Lomba</small>
                <span class="status status-gold">Buka s.d {{ cabang.batas }}</span>
              </div>

              <h3>{{ cabang.nama }}</h3>

              <p class="contest__rule">
                <ion-icon :icon="folderOutline" />
                Batas Ukuran: Maks 25 MB • Format: PDF / High-Res PNG
              </p>
            </div>
          </section>

          <!-- 2. Detail karya -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="bookOutline" /> 2. Informasi Detail Karya</h2>
            </div>

            <div class="field">
              <label for="judul">Judul Karya Siswa <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('judul') }">
                <input
                  id="judul"
                  v-model="form.judul"
                  type="text"
                  maxlength="100"
                  placeholder="Contoh: Eksplorasi Pesona Bawah Laut Bunaken"
                  :aria-invalid="!!show('judul')"
                  @blur="touched.judul = true"
                />
                <ion-icon :icon="colorPaletteOutline" class="input__trail" />
              </div>

              <p v-if="show('judul')" class="error" role="alert">{{ show('judul') }}</p>
              <p class="help">Gunakan judul representatif sesuai tema kearifan lokal Sulawesi Utara.</p>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="deskripsi">Deskripsi &amp; Sinopsis Filosofi Karya <b>*</b></label>
                <small :class="{ over: jumlahKata > 300 }">{{ jumlahKata }} / 300 kata</small>
              </div>

              <textarea
                id="deskripsi"
                v-model="form.deskripsi"
                rows="5"
                :class="{ 'textarea--error': show('deskripsi') }"
                placeholder="Jelaskan makna, inspirasi, dan filosofi karya..."
                :aria-invalid="!!show('deskripsi')"
                @blur="touched.deskripsi = true"
              />

              <p v-if="show('deskripsi')" class="error" role="alert">{{ show('deskripsi') }}</p>
            </div>
          </section>

          <!-- 3. Berkas -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="documentAttachOutline" /> 3. Berkas &amp; Dokumen Juknis</h2>
              <small class="tag">FLS2N 2025</small>
            </div>

            <div class="field">
              <div class="label-row label-row--top">
                <span class="label">Berkas Utama Karya (Poster/Desain) <b>*</b></span>
                <small class="hint">PDF/PNG maks 25 MB</small>
              </div>

              <input
                ref="utamaInput"
                type="file"
                class="sr-only"
                accept=".pdf,.png,application/pdf,image/png"
                @change="pilihUtama"
              />

              <div v-if="berkasUtama" class="main-file">
                <span class="pdf-tile"><ion-icon :icon="documentsOutline" /></span>

                <div class="main-file__text">
                  <strong>{{ berkasUtama.name }}</strong>
                  <small>
                    {{ ukuran(berkasUtama) }}
                    <span class="ok"><ion-icon :icon="checkmarkCircleOutline" /> Sesuai Format</span>
                  </small>
                </div>

                <button type="button" class="act act--blue" aria-label="Lihat berkas" @click="lihatBerkas">
                  <ion-icon :icon="eyeOutline" />
                </button>

                <button type="button" class="act act--red" aria-label="Hapus berkas" @click="hapusUtama">
                  <ion-icon :icon="trashOutline" />
                </button>
              </div>

              <button
                v-else
                type="button"
                class="upload"
                :class="{ 'upload--error': show('berkas') }"
                @click="utamaInput?.click()"
              >
                <ion-icon :icon="cloudUploadOutline" />
                <strong>Pilih Berkas Utama Karya</strong>
                <small>PDF atau High-Res PNG, maksimal 25 MB</small>
              </button>

              <p v-if="show('berkas')" class="error" role="alert">{{ show('berkas') }}</p>
            </div>

            <div class="field">
              <span class="label">Dokumen Kelengkapan Administrasi <b>*</b></span>

              <input
                ref="adminInput"
                type="file"
                class="sr-only"
                accept=".pdf,application/pdf"
                @change="pilihAdmin"
              />

              <div
                v-for="d in dokumenAdmin"
                :key="d.key"
                class="admin"
                :class="{ 'admin--done': d.file, 'admin--error': show(d.key) }"
              >
                <div class="admin__row">
                  <span class="admin__icon"><ion-icon :icon="d.icon" /></span>

                  <div class="admin__text">
                    <strong>{{ d.judul }}</strong>
                    <small>{{ d.file ? d.file.name : d.sub }}</small>
                  </div>
                </div>

                <div class="admin__foot">
                  <span class="status" :class="d.file ? 'status-green' : 'status-amber'">
                    <ion-icon :icon="d.file ? checkmarkCircleOutline : timeOutline" />
                    {{ d.file ? 'Terunggah' : 'Siap Unggah' }}
                  </span>

                  <button type="button" class="link" @click="bukaAdmin(d.key)">
                    {{ d.file ? 'Ganti Berkas' : 'Pilih Berkas' }}
                  </button>
                </div>

                <p v-if="show(d.key)" class="error" role="alert">{{ show(d.key) }}</p>
              </div>
            </div>

            <div class="field">
              <label for="tautan">Tautan Pendukung / Video Proses Karya <i>(Opsional)</i></label>

              <div class="input" :class="{ 'input--error': show('tautan') }">
                <ion-icon :icon="linkOutline" class="input__lead" />
                <input
                  id="tautan"
                  v-model.trim="form.tautan"
                  type="url"
                  inputmode="url"
                  placeholder="https://youtu.be/proses-karya-bunaken"
                  :aria-invalid="!!show('tautan')"
                  @blur="touched.tautan = true"
                />
              </div>

              <p v-if="show('tautan')" class="error" role="alert">{{ show('tautan') }}</p>
              <p class="help">Tautan video timelapse pembuatan atau demonstrasi presentasi karya.</p>
            </div>
          </section>

          <!-- 4. Validasi guru -->
          <section class="panel">
            <div class="panel__head">
              <h2><ion-icon :icon="checkboxOutline" /> 4. Validasi Guru Pembimbing</h2>
            </div>

            <label class="check" :class="{ 'check--error': show('orisinal') }">
              <input v-model="form.orisinal" type="checkbox" />
              <span class="check__box"><ion-icon :icon="checkmark" /></span>
              <span class="check__text">
                Saya telah meninjau orisinalitas karya dan memastikan karya ini murni hasil
                ciptaan siswa, tidak melanggar hak cipta, serta memenuhi petunjuk teknis FLS2N
                Dikda Sulut 2025.
              </span>
            </label>
            <p v-if="show('orisinal')" class="error" role="alert">{{ show('orisinal') }}</p>

            <label class="check" :class="{ 'check--error': show('sinkron') }">
              <input v-model="form.sinkron" type="checkbox" />
              <span class="check__box"><ion-icon :icon="checkmark" /></span>
              <span class="check__text">
                Data identitas siswa (Nama, NISN, Jenjang) dan kelengkapan berkas telah
                diverifikasi sinkron dengan database resmi Dapodik Dinas Pendidikan Daerah.
              </span>
            </label>
            <p v-if="show('sinkron')" class="error" role="alert">{{ show('sinkron') }}</p>

            <div class="teacher">
              <span class="teacher__icon"><ion-icon :icon="personCircleOutline" /></span>

              <div class="teacher__text">
                <strong>{{ guru.nama }}</strong>
                <small>NUPTK: {{ guru.nuptk }} • {{ guru.bidang }}</small>
              </div>

              <span class="status status-outline">
                <ion-icon :icon="lockClosedOutline" />
                Otorisasi<br />Aktif
              </span>
            </div>
          </section>

        </main>
      </div>
    </ion-content>

    <!-- Aksi tetap di bawah -->
    <div class="dock">
      <div class="dock__row">
        <button type="button" class="btn-outline" @click="simpanDraf">
          <ion-icon :icon="saveOutline" />
          Draf
        </button>

        <button type="button" class="btn-validate" :disabled="mengirim" :aria-busy="mengirim" @click="kirim">
          {{ mengirim ? 'Mengirim...' : 'Verifikasi & Kirim Karya' }}
          <ion-icon :icon="sendOutline" />
        </button>
      </div>

      <p class="dock__note">
        <ion-icon :icon="checkmarkCircleOutline" />
        Enkripsi data dinas terverifikasi BSrE • SIKARYA Dikda Sulut
      </p>
    </div>
  </ion-page>
</template>


<script setup lang="ts">

import { computed, nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  IonPage,
  IonContent,
  IonIcon
} from '@ionic/vue';

import {
  arrowBack,
  helpCircleOutline,
  ribbonOutline,
  checkmark,
  cloudUploadOutline,
  idCardOutline,
  checkmarkCircleOutline,
  chevronDownOutline,
  folderOutline,
  bookOutline,
  colorPaletteOutline,
  documentAttachOutline,
  documentsOutline,
  eyeOutline,
  trashOutline,
  shieldCheckmarkOutline,
  personCircleOutline,
  timeOutline,
  linkOutline,
  checkboxOutline,
  lockClosedOutline,
  saveOutline,
  sendOutline
} from 'ionicons/icons';

const router = useRouter();

/* ---------- Data pokok (TODO: ganti dengan data dari API) ---------- */

const daftarSiswa = [
  { nama: 'Evelyn Pangemanan', nisn: '0072918239', kelas: 'IX-A' },
  { nama: 'Andi Pratama', nisn: '123456', kelas: 'IX-A' },
  { nama: 'Budi Santoso', nisn: '123457', kelas: 'IX-B' },
  { nama: 'Citra Wenas', nisn: '123458', kelas: 'VIII-C' }
];

const siswa = ref(daftarSiswa[0]);
const pilihSiswaTerbuka = ref(false);

function pilihSiswa(s: (typeof daftarSiswa)[number]) {
  siswa.value = s;
  pilihSiswaTerbuka.value = false;
}

function inisial(nama: string) {
  return nama
    .split(' ')
    .map((k) => k[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const cabang = {
  nama: 'FLS2N 2025 – Desain Poster Digital Kreatif',
  batas: '15 Nov 2025'
};

const guru = {
  nama: 'Dra. Meike Rondonuwu, M.Pd',
  nuptk: '197405121999032004',
  bidang: 'Pembimbing Seni'
};

/* ---------- Form ---------- */

const form = reactive({
  judul: '',
  deskripsi: '',
  tautan: '',
  orisinal: false,
  sinkron: false
});

const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const mengirim = ref(false);

const jumlahKata = computed(() => form.deskripsi.trim().split(/\s+/).filter(Boolean).length);

/* ---------- Berkas ---------- */

const MB = 1024 * 1024;

const pesanBerkas = reactive<Record<string, string>>({});

function ukuran(file: File) {
  const mb = file.size / MB;
  return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.ceil(file.size / 1024) + ' KB';
}

// Berkas utama
const berkasUtama = ref<File | null>(null);
const utamaInput = ref<HTMLInputElement | null>(null);

function pilihUtama(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  pesanBerkas.berkas = '';
  if (file) {
    const tipeOk = ['application/pdf', 'image/png'].includes(file.type);
    if (!tipeOk) {
      berkasUtama.value = null;
      pesanBerkas.berkas = 'Format berkas harus PDF atau PNG.';
    } else if (file.size > 25 * MB) {
      berkasUtama.value = null;
      pesanBerkas.berkas = 'Ukuran berkas maksimum 25 MB.';
    } else {
      berkasUtama.value = file;
    }
  }
  input.value = '';
}

function hapusUtama() {
  berkasUtama.value = null;
  pesanBerkas.berkas = '';
}

function lihatBerkas() {
  // TODO: tampilkan pratinjau berkas utama
  console.log('lihat berkas');
}

// Dokumen administrasi
const dokumenAdmin = reactive([
  {
    key: 'orisinalitas',
    judul: 'Surat Orisinalitas',
    sub: 'Bermaterai 10.000 (PDF)',
    icon: shieldCheckmarkOutline,
    file: null as File | null
  },
  {
    key: 'rekomendasi',
    judul: 'Surat Rekomendasi',
    sub: 'Kepala Sekolah (PDF)',
    icon: personCircleOutline,
    file: null as File | null
  }
]);

const adminInput = ref<HTMLInputElement | null>(null);
let adminTarget = '';

function bukaAdmin(key: string) {
  adminTarget = key;
  adminInput.value?.click();
}

function pilihAdmin(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  const dok = dokumenAdmin.find((d) => d.key === adminTarget);
  pesanBerkas[adminTarget] = '';

  if (file && dok) {
    if (file.type !== 'application/pdf') {
      pesanBerkas[adminTarget] = 'Berkas harus berformat PDF.';
    } else if (file.size > 5 * MB) {
      // TODO: sesuaikan batas ukuran dokumen administrasi dengan juknis
      pesanBerkas[adminTarget] = 'Ukuran berkas maksimum 5 MB.';
    } else {
      dok.file = file;
    }
  }
  input.value = '';
}

/* ---------- Validasi ---------- */

const errors = computed<Record<string, string>>(() => ({
  judul: form.judul.trim().length >= 5 ? '' : 'Judul karya wajib diisi (minimal 5 karakter).',
  deskripsi:
    jumlahKata.value === 0
      ? 'Deskripsi dan sinopsis karya wajib diisi.'
      : jumlahKata.value > 300
        ? 'Deskripsi melebihi 300 kata.'
        : '',
  berkas: pesanBerkas.berkas || (berkasUtama.value ? '' : 'Berkas utama karya wajib diunggah.'),
  orisinalitas:
    pesanBerkas.orisinalitas ||
    (dokumenAdmin[0].file ? '' : 'Surat Orisinalitas wajib diunggah.'),
  rekomendasi:
    pesanBerkas.rekomendasi ||
    (dokumenAdmin[1].file ? '' : 'Surat Rekomendasi wajib diunggah.'),
  tautan:
    form.tautan && !/^https?:\/\/\S+\.\S+/.test(form.tautan)
      ? 'Tautan harus diawali http:// atau https://.'
      : '',
  orisinal: form.orisinal ? '' : 'Pernyataan orisinalitas harus disetujui.',
  sinkron: form.sinkron ? '' : 'Pernyataan verifikasi data harus disetujui.'
}));

function show(key: string) {
  const pesan = errors.value[key];
  if (!pesan) return '';
  const fileKey = ['berkas', 'orisinalitas', 'rekomendasi'].includes(key);
  return dicoba.value || touched[key] || (fileKey && pesanBerkas[key]) ? pesan : '';
}

const valid = computed(() => Object.values(errors.value).every((e) => !e));

/* ---------- Aksi ---------- */

async function kirim() {
  if (mengirim.value) return;
  dicoba.value = true;

  if (!valid.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>(
      '.input--error input, .textarea--error, .upload--error, .admin--error, .check--error'
    );
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  mengirim.value = true;
  try {
    // TODO: kirim form, berkasUtama, dan dokumenAdmin ke API unggah karya.
    // Setelah berhasil, arahkan ke halaman riwayat portofolio siswa.
  } finally {
    mengirim.value = false;
  }
}

function simpanDraf() {
  // TODO: simpan isian form sebagai draf (berkas yang sudah dipilih tidak ikut tersimpan lokal)
  console.log('simpan draf');
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
  text-align: left;
}

h1,
h2,
h3,
p,
ol,
ul {
  margin: 0;
}

ol,
ul {
  padding: 0;
  list-style: none;
}

small {
  font-size: 11px;
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
  gap: 8px;

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
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand__text strong {
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
  color: #003178;
}

.brand__text span {
  font-size: 10px;
  line-height: 13px;
  color: #3d4452;
}

.sep {
  display: inline-block;
  width: 4px;
  height: 4px;
  margin: 0 4px;
  vertical-align: middle;
  border-radius: 50%;
  background: #9aa0ac;
}

.bar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.emblem {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #dce7ff;
  color: #003178;
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
  padding: 14px 14px 24px;
}

/* ---------- Stepper ---------- */

.stepper {
  display: flex;
  align-items: flex-start;
  padding: 14px 16px 10px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
}

.st {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 70px;
}

.st small {
  font-size: 11px;
  font-weight: 600;
  color: #747985;
}

.st__dot {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8ebf0;
  color: #50545d;
  font-size: 14px;
  font-weight: 700;
}

.st__dot ion-icon {
  font-size: 20px;
}

.st--done .st__dot {
  background: #003178;
  color: #fff;
}

.st--done small,
.st--now small {
  color: #0b4fa6;
}

.st--now .st__dot {
  background: #00639a;
  color: #fff;
  box-shadow: 0 0 0 4px #cfe3fb;
}

.st__line {
  flex: 1;
  height: 3px;
  margin-top: 18px;
  border-radius: 2px;
  background: #e1e4ea;
}

.st__line--done {
  background: #003178;
}

/* ---------- Panel ---------- */

.panel {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04);
}

.panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 12px;
}

.panel__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.panel__head h2 ion-icon {
  font-size: 24px;
  color: #003178;
}

.tag {
  flex: none;
  color: #50545d;
}

/* ---------- Pill ---------- */

.status {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
}

.status ion-icon {
  font-size: 14px;
}

.status-blue {
  background: #cfe3fb;
  color: #0b4fa6;
}

.status-gold {
  background: #ffe1b3;
  color: #7a4b00;
}

.status-amber {
  background: #fff0c7;
  color: #8a5a00;
}

.status-green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.status-outline {
  padding: 5px 10px;
  border: 1px solid #aeb4c1;
  background: #fff;
  color: #003178;
  font-size: 10px;
  line-height: 13px;
}

/* ---------- Box siswa & cabang ---------- */

.box {
  position: relative;
  margin-top: 4px;
  padding: 12px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.box--white {
  margin-top: 12px;
  background: #fff;
  border-color: #c9d4e8;
}

.box__label {
  display: block;
  color: #50545d;
}

.box--white .box__label {
  color: #0b4fa6;
  font-weight: 600;
}

.student {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.student__avatar {
  width: 40px;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #dce7ff;
  color: #003178;
  font-size: 13px;
  font-weight: 700;
}

.student__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.student__text strong {
  font-size: 14px;
}

.student__text small {
  color: #3d4452;
}

.student__change {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #0b4fa6;
  font-size: 12px;
  font-weight: 700;
}

.student__change ion-icon {
  font-size: 16px;
}

.student-list {
  margin-top: 10px;
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #dfe2e8;
}

.student-list li + li {
  border-top: 1px solid #eceef2;
}

.student-list button {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 12px;
}

.student-list strong {
  font-size: 13px;
}

.student-list small {
  color: #50545d;
}

.student-list li[aria-selected='true'] button {
  background: #eaf2fd;
}

.contest__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.box h3 {
  margin-top: 8px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
}

.contest__rule {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eceef2;
  font-size: 12px;
  line-height: 18px;
  color: #3d4452;
}

.contest__rule ion-icon {
  color: #606572;
}

/* ---------- Field ---------- */

.field {
  margin-top: 14px;
}

.field label,
.label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  color: #191c1e;
}

.field label i {
  font-style: normal;
  font-weight: 400;
  color: #606572;
}

.label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 7px;
}

.label-row--top {
  align-items: flex-start;
}

.label-row small {
  flex: none;
  font-weight: 600;
  color: #0b4fa6;
}

.label-row small.over {
  color: #ba1a1a;
}

.hint {
  max-width: 110px;
  text-align: right;
  line-height: 15px;
}

.field > .label {
  margin-bottom: 7px;
}

.input {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 50px;
  padding: 0 14px;
  border-radius: 10px;
  background: #eef0f4;
  border: 1px solid #c3c9d6;
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

.input input {
  flex: 1;
  min-width: 0;
  height: 48px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: #191c1e;
}

.input input::placeholder {
  color: #747985;
}

.input__lead,
.input__trail {
  font-size: 22px;
  color: #50545d;
}

textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #c3c9d6;
  background: #eef0f4;
  outline: 0;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 27px;
  color: #191c1e;
}

textarea:focus {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
  background: #fff;
}

.textarea--error,
.textarea--error:focus {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.help {
  margin-top: 6px;
  font-size: 11px;
  line-height: 16px;
  color: #50545d;
}

.error {
  margin-top: 6px;
  font-size: 11px;
  line-height: 16px;
  color: #ba1a1a;
}

/* ---------- Berkas utama ---------- */

.main-file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #eaf2fd;
  border: 1px solid #a9c6ee;
}

.pdf-tile {
  width: 48px;
  height: 48px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #003178;
  color: #fff;
}

.pdf-tile ion-icon {
  font-size: 26px;
}

.main-file__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.main-file__text strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  color: #003178;
}

.main-file__text small {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin-top: 2px;
  color: #3d4452;
}

.ok {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: #0b4fa6;
}

.ok ion-icon {
  font-size: 14px;
}

.act {
  display: flex;
  padding: 5px;
}

.act ion-icon {
  font-size: 22px;
}

.act--blue {
  color: #0b4fa6;
}

.act--red {
  color: #ba1a1a;
}

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

.upload--error {
  border-color: #ba1a1a;
}

.upload ion-icon {
  font-size: 28px;
  color: #003178;
}

.upload strong {
  font-size: 12px;
  color: #003178;
}

.upload small {
  color: #606572;
}

/* ---------- Dokumen administrasi ---------- */

.admin {
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #f7f8fa;
  border: 1.5px dashed #b9bfcb;
}

.admin--done {
  background: #f4fbf7;
  border: 1px solid #b6e4cb;
}

.admin--error {
  border-color: #ba1a1a;
}

.admin__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin__icon {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #e3e6ec;
  color: #3d4452;
}

.admin__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.admin__text strong {
  font-size: 13px;
}

.admin__text small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #50545d;
}

.admin__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 10px;
}

.link {
  font-size: 12px;
  font-weight: 700;
  color: #0b4fa6;
}

/* ---------- Validasi ---------- */

.check {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 4px;
  padding: 6px 0;
  cursor: pointer;
}

.check + .error,
.check + .check {
  margin-top: 4px;
}

.check input {
  position: absolute;
  opacity: 0;
}

.check__box {
  width: 24px;
  height: 24px;
  flex: none;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid #747985;
  background: #fff;
  color: transparent;
}

.check__box ion-icon {
  font-size: 18px;
}

.check input:checked + .check__box {
  background: #003178;
  border-color: #003178;
  color: #fff;
}

.check input:focus-visible + .check__box {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

.check--error .check__box {
  border-color: #ba1a1a;
}

.check__text {
  font-size: 12px;
  line-height: 19px;
  color: #3d4452;
}

.teacher {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.teacher__icon {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #cfe3fb;
  color: #003178;
}

.teacher__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.teacher__text strong {
  font-size: 14px;
  line-height: 20px;
}

.teacher__text small {
  line-height: 15px;
  color: #3d4452;
}

/* ---------- Dock ---------- */

.dock {
  padding:
    12px
    14px
    calc(env(safe-area-inset-bottom, 0px) + 8px);

  background: #fff;
  border-top: 1px solid #e3e6ec;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, .05);
}

.dock__row {
  display: grid;
  grid-template-columns: 1fr 2.2fr;
  gap: 10px;
}

.btn-outline,
.btn-validate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}

.btn-outline {
  border: 1px solid #aeb4c1;
  background: #fff;
  color: #003178;
}

.btn-validate {
  background: #0d47a1;
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 49, 120, .22);
}

.btn-validate:disabled {
  opacity: .7;
  cursor: progress;
}

.btn-outline ion-icon,
.btn-validate ion-icon {
  font-size: 22px;
}

.dock__note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
  font-size: 10px;
  color: #3d4452;
}

.dock__note ion-icon {
  font-size: 15px;
  color: #0f9d6b;
}

.btn-outline:focus-visible,
.btn-validate:focus-visible,
.link:focus-visible,
.upload:focus-visible,
.act:focus-visible,
.student__change:focus-visible {
  outline: 2px solid #00639a;
  outline-offset: 2px;
}

</style>