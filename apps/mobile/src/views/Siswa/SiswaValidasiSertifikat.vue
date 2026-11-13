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
              <strong>Validasi Sertifikat Prestasi</strong>
              <span>SIKARYA Dikda Sulut</span>
            </div>
          </div>

          <div class="bar__actions">
            <button class="icon-btn" type="button" aria-label="Bantuan">
              <ion-icon :icon="helpCircleOutline" />
            </button>
          </div>
        </header>

        <main class="main">

          <!-- Banner Integrasi Dapodik -->
          <section class="info-banner" aria-label="Informasi Integrasi Dapodik">
            <span class="info-banner__icon">
              <ion-icon :icon="shieldCheckmark" />
            </span>

            <div class="info-banner__text">
              <strong>Integrasi Resmi Dapodik</strong>
              <p>
                Sertifikat prestasi lomba tingkat Kota Manado dapat diunggah untuk diverifikasi
                Admin Dikbud Kota Manado agar masuk ke portofolio resmi Dapodik.
              </p>
            </div>
          </section>

          <!-- Segmented Tab -->
          <div class="tabs" role="tablist" aria-label="Mode Sertifikat">
            <button
              type="button"
              role="tab"
              class="tabs__btn"
              :class="{ 'tabs__btn--active': tabAktif === 'unggah' }"
              :aria-selected="tabAktif === 'unggah'"
              @click="tabAktif = 'unggah'"
            >
              <ion-icon :icon="addCircleOutline" />
              Unggah Baru
            </button>

            <button
              type="button"
              role="tab"
              class="tabs__btn"
              :class="{ 'tabs__btn--active': tabAktif === 'riwayat' }"
              :aria-selected="tabAktif === 'riwayat'"
              @click="scrollKeRiwayat"
            >
              <ion-icon :icon="timeOutline" />
              Riwayat &amp; Status
              <span class="tabs__badge">{{ daftarPengajuan.length }}</span>
            </button>
          </div>

          <!-- Panel Formulir Data Prestasi -->
          <section class="panel">
            <div class="panel__head panel__head--col">
              <h2>Formulir Data Prestasi Siswa</h2>
              <p class="panel__sub">
                Lengkapi detail perolehan lomba sesuai sertifikat fisik atau digital.
              </p>
            </div>

            <!-- Nama Prestasi -->
            <div class="field">
              <label for="namaPrestasi">Nama Prestasi / Judul Kegiatan <b>*</b></label>

              <div class="input" :class="{ 'input--error': show('namaPrestasi') }">
                <input
                  id="namaPrestasi"
                  v-model="form.namaPrestasi"
                  type="text"
                  maxlength="120"
                  placeholder="Misal: Juara 2 Lomba Debat Bahasa Inggris Pr..."
                  :aria-invalid="!!show('namaPrestasi')"
                  @blur="touched.namaPrestasi = true"
                />
              </div>

              <p v-if="show('namaPrestasi')" class="error" role="alert">
                {{ show('namaPrestasi') }}
              </p>
              <p class="help">Tuliskan nama kejuaraan secara lengkap beserta tingkatannya.</p>
            </div>

            <!-- Tingkat Kejuaraan -->
            <div class="field">
              <span class="label">Tingkat Kejuaraan <b>*</b></span>

              <div class="level-grid" role="radiogroup" aria-label="Tingkat Kejuaraan">
                <button
                  v-for="t in daftarTingkat"
                  :key="t.value"
                  type="button"
                  role="radio"
                  class="level-card"
                  :class="{ 'level-card--active': form.tingkat === t.value }"
                  :aria-checked="form.tingkat === t.value"
                  @click="form.tingkat = t.value"
                >
                  <ion-icon
                    :icon="form.tingkat === t.value ? checkmarkCircle : t.icon"
                    class="level-card__icon"
                  />
                  <span>{{ t.label }}</span>
                </button>
              </div>
            </div>

            <!-- Tahun & Penyelenggara -->
            <div class="field-grid">
              <div class="field">
                <label for="tahun">Tahun <b>*</b></label>

                <div class="select-wrap" :class="{ 'input--error': show('tahun') }">
                  <select
                    id="tahun"
                    v-model="form.tahun"
                    :aria-invalid="!!show('tahun')"
                    @blur="touched.tahun = true"
                  >
                    <option v-for="th in daftarTahun" :key="th" :value="th">{{ th }}</option>
                  </select>
                  <ion-icon :icon="chevronDownOutline" class="select-wrap__arrow" />
                </div>
              </div>

              <div class="field">
                <label for="penyelenggara">Penyelenggara <b>*</b></label>

                <div class="input" :class="{ 'input--error': show('penyelenggara') }">
                  <input
                    id="penyelenggara"
                    v-model="form.penyelenggara"
                    type="text"
                    placeholder="Dinas Pendidikan dan Kebud..."
                    :aria-invalid="!!show('penyelenggara')"
                    @blur="touched.penyelenggara = true"
                  />
                </div>
              </div>
            </div>
            <p v-if="show('penyelenggara')" class="error" role="alert">
              {{ show('penyelenggara') }}
            </p>

            <!-- Berkas Sertifikat -->
            <div class="field">
              <span class="label">Berkas Sertifikat (PDF / JPG) <b>*</b></span>

              <input
                ref="sertifikatInput"
                type="file"
                class="sr-only"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                @change="pilihSertifikat"
              />

              <div class="dropzone" :class="{ 'dropzone--error': show('berkas') }">
                <div v-if="berkasSertifikat" class="file-card">
                  <span class="file-card__tile">
                    <ion-icon :icon="documentTextOutline" />
                  </span>

                  <div class="file-card__text">
                    <strong>{{ berkasSertifikat.name }}</strong>
                    <small>{{ ukuran(berkasSertifikat) }} • Siap diverifikasi</small>
                  </div>

                  <button
                    type="button"
                    class="file-card__change"
                    @click="sertifikatInput?.click()"
                  >
                    <ion-icon :icon="refreshOutline" />
                    Ganti
                  </button>
                </div>

                <button
                  v-else
                  type="button"
                  class="dropzone__empty"
                  @click="sertifikatInput?.click()"
                >
                  <ion-icon :icon="cloudUploadOutline" />
                  <strong>Pilih Berkas Sertifikat</strong>
                </button>

                <p class="dropzone__hint">
                  <ion-icon :icon="informationCircleOutline" />
                  <span>Format: PDF/JPG/PNG • Maks. 5 MB • Resolusi minimal 300 DPI</span>
                </p>
              </div>

              <p v-if="show('berkas')" class="error" role="alert">{{ show('berkas') }}</p>
            </div>

            <!-- Pernyataan Keaslian -->
            <label class="check" :class="{ 'check--error': show('pernyataan') }">
              <input v-model="form.pernyataan" type="checkbox" />
              <span class="check__box"><ion-icon :icon="checkmark" /></span>
              <span class="check__text">
                Saya menyatakan bahwa sertifikat ini sah dan asli. Pemalsuan dokumen dapat
                dikenakan sanksi diskualifikasi prestasi Dapodik.
              </span>
            </label>
            <p v-if="show('pernyataan')" class="error" role="alert">{{ show('pernyataan') }}</p>

            <!-- Tombol Submit -->
            <button
              type="button"
              class="btn-submit"
              :disabled="mengirim"
              :aria-busy="mengirim"
              @click="kirim"
            >
              <ion-icon :icon="cloudUploadOutline" />
              {{ mengirim ? 'Mengirim Sertifikat...' : 'Kirim Sertifikat untuk Validasi' }}
            </button>
          </section>

          <!-- Catatan Estimasi Waktu -->
          <div class="sla-note">
            <ion-icon :icon="timeOutline" />
            <p>
              Proses pemeriksaan berkas oleh Admin Verifikator Kota Manado membutuhkan rata-rata
              1–3 hari kerja.
            </p>
          </div>

          <!-- Daftar Pengajuan Sertifikat -->
          <section ref="riwayatSection" class="history">
            <div class="history__head">
              <h2>Daftar Pengajuan Sertifikat</h2>
              <small>{{ daftarPengajuan.length }} Berkas Tercatat</small>
            </div>

            <article
              v-for="item in daftarPengajuan"
              :key="item.id"
              class="sub-card"
            >
              <div class="sub-card__top">
                <span class="status" :class="`status-${item.badgeColor}`">
                  <ion-icon v-if="item.badgeIcon" :icon="item.badgeIcon" />
                  {{ item.statusLabel }}
                </span>
                <small class="sub-card__date">{{ item.tanggal }}</small>
              </div>

              <h3>{{ item.judul }}</h3>
              <p class="sub-card__meta">{{ item.tingkat }} • {{ item.penyelenggara }}</p>

              <!-- Kondisi 1: Disetujui -->
              <div v-if="item.status === 'approved'" class="bsre-box">
                <span class="bsre-box__icon">
                  <ion-icon :icon="shieldCheckmarkOutline" />
                </span>

                <div class="bsre-box__text">
                  <strong>No. BSrE: {{ item.nomorBsre }}</strong>
                  <small>Tervalidasi TTE Disdikbud Manado • Sinkron Dapodik</small>
                </div>

                <button type="button" class="btn-mini" @click="lihatSertifikat(item)">
                  <ion-icon :icon="eyeOutline" />
                  Lihat
                </button>
              </div>

              <!-- Kondisi 2: Sedang Ditinjau -->
              <div v-else-if="item.status === 'review'" class="review-box">
                <ion-icon :icon="timeOutline" />
                <span class="review-box__est">{{ item.estimasi }}</span>
                <span class="review-box__file">{{ item.namaFile }}</span>
              </div>

              <!-- Kondisi 3: Perlu Perbaikan -->
              <template v-else-if="item.status === 'revision'">
                <div class="revision-box">
                  <div class="revision-box__head">
                    <ion-icon :icon="chatboxEllipsesOutline" />
                    <strong>Catatan Validator Dikbud Manado:</strong>
                  </div>
                  <p>"{{ item.catatan }}"</p>
                </div>

                <div class="revision-actions">
                  <button type="button" class="btn-ghost" @click="detailCatatan(item)">
                    Detail Catatan
                  </button>
                  <button type="button" class="btn-primary-sm" @click="unggahUlangSk(item)">
                    <ion-icon :icon="documentAttachOutline" />
                    Unggah Ulang SK
                  </button>
                </div>
              </template>
            </article>
          </section>

        </main>
      </div>
    </ion-content>

    <!-- Bottom Tab Navigation -->
    <nav class="bottom-nav" aria-label="Navigasi Utama">
      <button type="button" class="bottom-nav__item" @click="router.push('/unggah-karya')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="cloudUploadOutline" />
        </span>
        <small>Unggah Karya</small>
      </button>

      <button type="button" class="bottom-nav__item bottom-nav__item--active" aria-current="page">
        <span class="bottom-nav__pill">
          <ion-icon :icon="folder" />
        </span>
        <small>Karya Saya</small>
      </button>

      <button type="button" class="bottom-nav__item" @click="router.push('/profil')">
        <span class="bottom-nav__pill">
          <ion-icon :icon="personOutline" />
        </span>
        <small>Profil</small>
      </button>
    </nav>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBack,
  helpCircleOutline,
  shieldCheckmark,
  addCircleOutline,
  timeOutline,
  checkmarkCircle,
  businessOutline,
  schoolOutline,
  trophyOutline,
  chevronDownOutline,
  documentTextOutline,
  refreshOutline,
  cloudUploadOutline,
  informationCircleOutline,
  checkmark,
  shieldCheckmarkOutline,
  eyeOutline,
  alertCircleOutline,
  chatboxEllipsesOutline,
  documentAttachOutline,
  folder,
  personOutline,
  hourglassOutline
} from 'ionicons/icons';

const router = useRouter();
const tabAktif = ref<'unggah' | 'riwayat'>('unggah');
const riwayatSection = ref<HTMLElement | null>(null);

function scrollKeRiwayat() {
  tabAktif.value = 'riwayat';
  riwayatSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- Opsi Pilihan ---------- */

const daftarTingkat = [
  { value: 'kota', label: 'Tingkat Kota Manado', icon: checkmarkCircle },
  { value: 'kecamatan', label: 'Antar Kecamatan', icon: businessOutline },
  { value: 'sekolah', label: 'Antar Sekolah Manado', icon: schoolOutline },
  { value: 'pekan', label: 'Pekan Prestasi Manado', icon: trophyOutline }
];

const daftarTahun = ['2025', '2024', '2023', '2022'];

/* ---------- Form State ---------- */

const form = reactive({
  namaPrestasi: '',
  tingkat: 'kota',
  tahun: '2024',
  penyelenggara: 'Dinas Pendidikan dan Kebud',
  pernyataan: true
});

const touched = reactive<Record<string, boolean>>({});
const dicoba = ref(false);
const mengirim = ref(false);

/* ---------- Berkas Sertifikat ---------- */

const MB = 1024 * 1024;
const pesanBerkas = ref('');
const sertifikatInput = ref<HTMLInputElement | null>(null);

// Mock file awal agar tampilan sesuai gambar (ganti dengan null jika kosong)
const berkasSertifikat = ref<File | null>(
  new File(['dummy'], 'Sertifikat_Juara2_Debat_2024.pdf', { type: 'application/pdf' })
);

function ukuran(file: File) {
  if (file.name === 'Sertifikat_Juara2_Debat_2024.pdf' && file.size < 100) return '1.8 MB';
  const mb = file.size / MB;
  return mb >= 1 ? mb.toFixed(1) + ' MB' : Math.ceil(file.size / 1024) + ' KB';
}

function pilihSertifikat(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  pesanBerkas.value = '';

  if (file) {
    const tipeOk = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
    if (!tipeOk) {
      berkasSertifikat.value = null;
      pesanBerkas.value = 'Format berkas harus PDF, JPG, atau PNG.';
    } else if (file.size > 5 * MB) {
      berkasSertifikat.value = null;
      pesanBerkas.value = 'Ukuran berkas maksimum 5 MB.';
    } else {
      berkasSertifikat.value = file;
    }
  }
  input.value = '';
}

/* ---------- Validasi ---------- */

const errors = computed<Record<string, string>>(() => ({
  namaPrestasi:
    form.namaPrestasi.trim().length >= 5
      ? ''
      : 'Nama prestasi wajib diisi (minimal 5 karakter).',
  penyelenggara:
    form.penyelenggara.trim().length >= 3 ? '' : 'Nama penyelenggara wajib diisi.',
  berkas: pesanBerkas.value || (berkasSertifikat.value ? '' : 'Berkas sertifikat wajib diunggah.'),
  pernyataan: form.pernyataan ? '' : 'Pernyataan keaslian dokumen wajib dicentang.'
}));

function show(key: string) {
  const pesan = errors.value[key];
  if (!pesan) return '';
  if (key === 'berkas' && pesanBerkas.value) return pesan;
  return dicoba.value || touched[key] ? pesan : '';
}

const valid = computed(() => Object.values(errors.value).every((e) => !e));

/* ---------- Daftar Pengajuan (Riwayat) ---------- */

interface PengajuanItem {
  id: string;
  status: 'approved' | 'review' | 'revision';
  statusLabel: string;
  badgeColor: 'green' | 'amber' | 'red';
  badgeIcon?: string;
  tanggal: string;
  judul: string;
  tingkat: string;
  penyelenggara: string;
  nomorBsre?: string;
  estimasi?: string;
  namaFile?: string;
  catatan?: string;
}

const daftarPengajuan = ref<PengajuanItem[]>([
  {
    id: '1',
    status: 'approved',
    statusLabel: 'Disetujui Kota Manado',
    badgeColor: 'green',
    tanggal: '14 Jan 2025',
    judul: 'Juara 1 Lomba Cipta Puisi FLS2N Tingkat Kota Manado 2024',
    tingkat: 'Tingkat Kota Manado',
    penyelenggara: 'Disdikbud Kota Manado',
    nomorBsre: 'MND-CERT-88102'
  },
  {
    id: '2',
    status: 'review',
    statusLabel: 'Sedang Ditinjau Admin Kota',
    badgeColor: 'amber',
    badgeIcon: hourglassOutline,
    tanggal: 'Kemarin',
    judul: 'Juara 2 Olimpiade Sains Siswa Kota Manado 2024',
    tingkat: 'Tingkat Kota Manado',
    penyelenggara: 'MKKS Kota Manado',
    estimasi: 'Estimasi: 2–3 hari kerja verifikasi',
    namaFile: 'OSN_Manado_2024.pdf'
  },
  {
    id: '3',
    status: 'revision',
    statusLabel: 'Perlu Perbaikan Berkas',
    badgeColor: 'red',
    badgeIcon: alertCircleOutline,
    tanggal: '10 Jan 2025',
    judul: 'Juara 3 Robotik Kreatif Pelajar Manado 2023',
    tingkat: 'Tingkat Kota Manado',
    penyelenggara: 'Balai Pemuda Kota Manado',
    catatan:
      'Lampirkan SK Penetapan Pemenang dari Disdikbud Kota Manado atau legalisir Kepala Sekolah untuk pengesahan poin.'
  }
]);

/* ---------- Aksi ---------- */

async function kirim() {
  if (mengirim.value) return;
  dicoba.value = true;

  if (!valid.value) {
    await nextTick();
    const salah = document.querySelector<HTMLElement>(
      '.input--error input, .dropzone--error, .check--error'
    );
    salah?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    salah?.focus?.();
    return;
  }

  mengirim.value = true;
  try {
    // TODO: Kirim payload form + berkasSertifikat ke API validasi sertifikat
    console.log('Mengirim sertifikat:', { ...form, file: berkasSertifikat.value?.name });
  } finally {
    mengirim.value = false;
  }
}

function lihatSertifikat(item: PengajuanItem) {
  console.log('Lihat sertifikat:', item.nomorBsre);
}

function detailCatatan(item: PengajuanItem) {
  console.log('Detail catatan:', item.id);
}

function unggahUlangSk(item: PengajuanItem) {
  console.log('Unggah ulang SK untuk:', item.id);
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
  padding: 14px 14px 28px;
}

/* ---------- Banner Info ---------- */

.info-banner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 14px;
  background: #e8f1fd;
  border: 1px solid #c5dbf8;
}

.info-banner__icon {
  width: 34px;
  height: 34px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #003178;
  color: #fff;
}

.info-banner__icon ion-icon {
  font-size: 19px;
}

.info-banner__text strong {
  display: block;
  font-size: 13px;
  font-weight: 800;
  color: #003178;
  margin-bottom: 3px;
}

.info-banner__text p {
  font-size: 11.5px;
  line-height: 17px;
  color: #3d4452;
}

/* ---------- Segmented Tabs ---------- */

.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.tabs__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 38px;
  padding: 6px 10px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 700;
  color: #50545d;
  transition: background 0.15s ease, color 0.15s ease;
}

.tabs__btn ion-icon {
  font-size: 17px;
}

.tabs__btn--active {
  background: #fff;
  color: #003178;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.tabs__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #003178;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
}

/* ---------- Panel ---------- */

.panel {
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.panel__head--col {
  padding-bottom: 4px;
}

.panel__head--col h2 {
  font-size: 15px;
  line-height: 21px;
  font-weight: 800;
  color: #003178;
}

.panel__sub {
  margin-top: 3px;
  font-size: 11.5px;
  line-height: 16px;
  color: #50545d;
}

/* ---------- Form Fields ---------- */

.field {
  margin-top: 14px;
}

.field label,
.label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  color: #191c1e;
}

.field-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 10px;
}

.input,
.select-wrap {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 0 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #c3c9d6;
}

.input:focus-within,
.select-wrap:focus-within {
  border-color: #00639a;
  box-shadow: 0 0 0 1px #00639a;
}

.input--error,
.input--error:focus-within {
  border-color: #ba1a1a;
  box-shadow: 0 0 0 1px #ba1a1a;
}

.input input,
.select-wrap select {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 44px;
  border: 0;
  outline: 0;
  background: none;
  font-family: inherit;
  font-size: 13px;
  color: #191c1e;
}

.select-wrap select {
  appearance: none;
  padding-right: 22px;
  cursor: pointer;
}

.select-wrap__arrow {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: #50545d;
  pointer-events: none;
}

.input input::placeholder {
  color: #747985;
}

.help {
  margin-top: 5px;
  font-size: 11px;
  line-height: 15px;
  color: #606572;
}

.error {
  margin-top: 5px;
  font-size: 11px;
  line-height: 15px;
  color: #ba1a1a;
}

/* ---------- Tingkat Kejuaraan Grid ---------- */

.level-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.level-card {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #d2d7e2;
  font-size: 11.5px;
  font-weight: 600;
  line-height: 15px;
  color: #3d4452;
  transition: all 0.15s ease;
}

.level-card__icon {
  font-size: 18px;
  color: #606572;
}

.level-card--active {
  background: #eef5ff;
  border: 1.5px solid #003178;
  color: #003178;
  font-weight: 700;
}

.level-card--active .level-card__icon {
  color: #003178;
}

/* ---------- Dropzone Berkas Sertifikat ---------- */

.dropzone {
  padding: 12px;
  border-radius: 12px;
  background: #f4f9ff;
  border: 1.5px dashed #7db5e8;
}

.dropzone--error {
  border-color: #ba1a1a;
}

.file-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #dce3ef;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.file-card__tile {
  width: 38px;
  height: 38px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #fde8e8;
  color: #c81e1e;
}

.file-card__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.file-card__text strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12.5px;
  font-weight: 700;
  color: #191c1e;
}

.file-card__text small {
  margin-top: 2px;
  color: #50545d;
}

.file-card__change {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #003178;
}

.file-card__change ion-icon {
  font-size: 15px;
}

.dropzone__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  background: #fff;
  color: #003178;
  font-size: 12.5px;
  font-weight: 700;
}

.dropzone__hint {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 10px;
  font-size: 11px;
  line-height: 15px;
  color: #3d4452;
}

.dropzone__hint ion-icon {
  font-size: 15px;
  color: #0b4fa6;
  margin-top: 1px;
}

/* ---------- Checkbox Pernyataan ---------- */

.check {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 14px;
  cursor: pointer;
}

.check input {
  position: absolute;
  opacity: 0;
}

.check__box {
  width: 20px;
  height: 20px;
  flex: none;
  margin-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 2px solid #747985;
  background: #fff;
  color: transparent;
}

.check__box ion-icon {
  font-size: 15px;
}

.check input:checked + .check__box {
  background: #003178;
  border-color: #003178;
  color: #fff;
}

.check--error .check__box {
  border-color: #ba1a1a;
}

.check__text {
  font-size: 11.5px;
  line-height: 17px;
  color: #3d4452;
}

/* ---------- Primary Submit Button ---------- */

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 48px;
  margin-top: 16px;
  padding: 0 16px;
  border-radius: 12px;
  background: #0b4fa6;
  color: #fff;
  font-size: 13.5px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(11, 79, 166, 0.25);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ---------- SLA Note ---------- */

.sla-note {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 12px;
  background: #eef0f4;
  border: 1px solid #dfe2e8;
}

.sla-note ion-icon {
  font-size: 18px;
  color: #0b4fa6;
}

.sla-note p {
  font-size: 11px;
  line-height: 16px;
  color: #3d4452;
}

/* ---------- Daftar Pengajuan (Riwayat) ---------- */

.history {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.history__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.history__head h2 {
  font-size: 15px;
  font-weight: 800;
  color: #003178;
}

.history__head small {
  font-weight: 600;
  color: #50545d;
}

.sub-card {
  padding: 14px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #dfe2e8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.sub-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sub-card__date {
  color: #606572;
}

.sub-card h3 {
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 800;
  color: #191c1e;
}

.sub-card__meta {
  margin-top: 3px;
  font-size: 11.5px;
  color: #50545d;
}

/* Status Pills */

.status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  line-height: 15px;
}

.status ion-icon {
  font-size: 13px;
}

.status-green {
  background: #d9f4e4;
  color: #0b5f3a;
}

.status-amber {
  background: #fff0c7;
  color: #8a5a00;
}

.status-red {
  background: #fde8e8;
  color: #ba1a1a;
}

/* BSrE Box (Disetujui) */

.bsre-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f0f6ff;
  border: 1px solid #cfe3fb;
}

.bsre-box__icon {
  width: 32px;
  height: 32px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #dce7ff;
  color: #003178;
}

.bsre-box__icon ion-icon {
  font-size: 17px;
}

.bsre-box__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.bsre-box__text strong {
  font-size: 11.5px;
  font-weight: 800;
  color: #003178;
}

.bsre-box__text small {
  font-size: 10px;
  line-height: 14px;
  color: #50545d;
}

.btn-mini {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #aeb4c1;
  font-size: 11.5px;
  font-weight: 700;
  color: #003178;
}

.btn-mini ion-icon {
  font-size: 15px;
}

/* Review Box (Sedang Ditinjau) */

.review-box {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  padding: 9px 11px;
  border-radius: 10px;
  background: #fffaf0;
  border: 1px solid #f6e0a6;
  font-size: 11px;
}

.review-box ion-icon {
  font-size: 15px;
  color: #b47300;
}

.review-box__est {
  flex: 1;
  font-weight: 600;
  color: #8a5a00;
}

.review-box__file {
  color: #50545d;
  font-weight: 500;
}

/* Revision Box (Perlu Perbaikan) */

.revision-box {
  margin-top: 12px;
  padding: 11px 12px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #f7c6c6;
}

.revision-box__head {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ba1a1a;
  font-size: 11.5px;
}

.revision-box__head ion-icon {
  font-size: 16px;
}

.revision-box p {
  margin-top: 5px;
  font-size: 11.5px;
  line-height: 17px;
  color: #5a1d1d;
}

.revision-actions {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 8px;
  margin-top: 10px;
}

.btn-ghost,
.btn-primary-sm {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 38px;
  padding: 0 10px;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 700;
}

.btn-ghost {
  background: #eef0f4;
  color: #3d4452;
}

.btn-primary-sm {
  background: #0b4fa6;
  color: #fff;
}

.btn-primary-sm ion-icon {
  font-size: 16px;
}

/* ---------- Bottom Navigation Bar ---------- */

.bottom-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px 12px calc(env(safe-area-inset-bottom, 0px) + 8px);
  background: #fff;
  border-top: 1px solid #dfe2e8;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
}

.bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #50545d;
}

.bottom-nav__pill {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 30px;
  border-radius: 999px;
  transition: background 0.15s ease, color 0.15s ease;
}

.bottom-nav__pill ion-icon {
  font-size: 20px;
}

.bottom-nav__item small {
  font-size: 11px;
  font-weight: 600;
}

.bottom-nav__item--active {
  color: #003178;
}

.bottom-nav__item--active .bottom-nav__pill {
  background: #38a3f1;
  color: #fff;
}

.bottom-nav__item--active small {
  font-weight: 800;
}
</style>