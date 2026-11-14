<template>
  <ion-page>
    <ion-content :fullscreen="true" class="validasi-content">
      <div class="validasi">
        <header class="topbar">
          <div class="topbar__brand">
            <button class="topbar__btn" type="button" aria-label="Kembali"><ion-icon :icon="arrowBackOutline" /></button>
            <div class="topbar__text">
              <h1 class="topbar__title">Validasi Sertifikat Prestasi</h1>
              <p class="topbar__subtitle">SIKARYA Dikda Sulut</p>
            </div>
          </div>
          <button class="topbar__btn topbar__btn--gray" type="button" aria-label="Bantuan"><ion-icon :icon="helpCircleOutline" /></button>
        </header>

        <div class="body">
          <!-- Info Dapodik -->
          <section class="notice">
            <div class="notice__icon"><ion-icon :icon="shieldCheckmark" /></div>
            <div>
              <b class="notice__title">Integrasi Resmi Dapodik</b>
              <p class="notice__desc">
                Sertifikat prestasi lomba tingkat Kota Manado dapat diunggah untuk diverifikasi Admin Dikbud Kota
                Manado agar masuk ke portofolio resmi Dapodik.
              </p>
            </div>
          </section>

          <!-- Tab -->
          <div class="tabs">
            <button
              v-for="t in tabs"
              :key="t.key"
              class="tabs__item"
              :class="{ 'tabs__item--active': activeTab === t.key }"
              type="button"
              @click="activeTab = t.key"
            >
              <ion-icon :icon="t.icon" /> {{ t.label }}
              <b v-if="t.key === 'riwayat'" class="tabs__count">{{ pengajuan.length }}</b>
            </button>
          </div>

          <!-- Formulir -->
          <template v-if="activeTab === 'unggah'">
            <section class="panel">
              <h2 class="panel__title">Formulir Data Prestasi Siswa</h2>
              <p class="panel__desc">Lengkapi detail perolehan lomba sesuai sertifikat fisik atau digital.</p>

              <div class="form">
                <label class="field">
                  <span class="field__label">Nama Prestasi / Judul Kegiatan <i class="field__req">*</i></span>
                  <span class="field__box">
                    <input v-model="form.nama" class="field__input" type="text" placeholder="Misal: Juara 2 Lomba Debat Bahasa Inggris Pelajar" />
                  </span>
                  <small class="field__hint">Tuliskan nama kejuaraan secara lengkap beserta tingkatannya.</small>
                </label>

                <div class="field">
                  <span class="field__label">Tingkat Kejuaraan <i class="field__req">*</i></span>
                  <div class="levels">
                    <button
                      v-for="l in tingkat"
                      :key="l.label"
                      class="levels__item"
                      :class="{ 'levels__item--active': form.tingkat === l.label }"
                      type="button"
                      @click="form.tingkat = l.label"
                    >
                      <ion-icon :icon="form.tingkat === l.label ? checkmarkCircle : l.icon" /> {{ l.label }}
                    </button>
                  </div>
                </div>

                <div class="form__row">
                  <label class="field field--small">
                    <span class="field__label">Tahun <i class="field__req">*</i></span>
                    <span class="field__box">
                      <select v-model="form.tahun" class="field__input field__select">
                        <option v-for="y in tahunList" :key="y" :value="y">{{ y }}</option>
                      </select>
                      <ion-icon class="field__icon" :icon="chevronDownOutline" />
                    </span>
                  </label>
                  <label class="field">
                    <span class="field__label">Penyelenggara <i class="field__req">*</i></span>
                    <span class="field__box">
                      <input v-model="form.penyelenggara" class="field__input" type="text" placeholder="Nama instansi" />
                    </span>
                  </label>
                </div>

                <div class="field">
                  <span class="field__label">Berkas Sertifikat (PDF / JPG) <i class="field__req">*</i></span>
                  <div class="upload">
                    <div v-if="berkas" class="upload__file">
                      <div class="upload__icon"><ion-icon :icon="documentTextOutline" /><small>{{ berkas.ext }}</small></div>
                      <div class="upload__text">
                        <b class="upload__name">{{ berkas.name }}</b>
                        <small class="upload__meta">{{ berkas.size }} • Siap diverifikasi</small>
                      </div>
                      <button class="upload__change" type="button" @click="fileInput?.click()">
                        <ion-icon :icon="syncOutline" /> Ganti
                      </button>
                    </div>
                    <button v-else class="upload__empty" type="button" @click="fileInput?.click()">
                      <ion-icon :icon="cloudUploadOutline" /> Pilih berkas sertifikat
                    </button>
                    <p class="upload__note">
                      <ion-icon :icon="informationCircleOutline" />
                      Format: PDF/JPG/PNG • Maks. 5 MB • Resolusi minimal 300 DPI
                    </p>
                  </div>
                  <input ref="fileInput" class="hidden" type="file" accept=".pdf,.jpg,.jpeg,.png" @change="pilihBerkas" />
                </div>

                <label class="agree">
                  <input v-model="form.setuju" class="agree__check" type="checkbox" />
                  <span>
                    Saya menyatakan bahwa sertifikat ini sah dan asli. Pemalsuan dokumen dapat dikenakan sanksi
                    diskualifikasi prestasi Dapodik.
                  </span>
                </label>

                <button class="submit" type="button" :disabled="!bisaKirim">
                  <ion-icon :icon="cloudUploadOutline" /> Kirim Sertifikat untuk Validasi
                </button>
              </div>
            </section>

            <section class="info">
              <ion-icon :icon="timerOutline" />
              <p>Proses pemeriksaan berkas oleh Admin Verifikator Kota Manado membutuhkan rata-rata 1–3 hari kerja.</p>
            </section>
          </template>

          <!-- Daftar pengajuan -->
          <section>
            <div class="section-head">
              <h2 class="section-head__title">Daftar Pengajuan Sertifikat</h2>
              <span class="section-head__note">{{ pengajuan.length }} Berkas Tercatat</span>
            </div>

            <div class="list">
              <article v-for="p in pengajuan" :key="p.title" class="item" :class="'item--' + p.tone">
                <div class="item__top">
                  <span class="item__tag" :class="'item__tag--' + p.tone"><ion-icon :icon="p.icon" /> {{ p.status }}</span>
                  <small class="item__date">{{ p.date }}</small>
                </div>
                <h3 class="item__title">{{ p.title }}</h3>
                <p class="item__meta">{{ p.meta }}</p>

                <!-- Disetujui -->
                <div v-if="p.tone === 'green'" class="item__foot">
                  <ion-icon class="item__shield" :icon="shieldCheckmarkOutline" />
                  <div class="item__cert">
                    <b>No. BSrE: {{ p.noBsre }}</b>
                    <small>Tervalidasi TTE Disdikbud Manado • Sinkron Dapodik</small>
                  </div>
                  <button class="item__btn item__btn--outline" type="button"><ion-icon :icon="eyeOutline" /> Lihat</button>
                </div>

                <!-- Ditinjau -->
                <div v-else-if="p.tone === 'amber'" class="item__foot item__foot--plain">
                  <span class="item__estimate"><ion-icon :icon="timeOutline" /> Estimasi: 2–3 hari kerja verifikasi</span>
                  <small class="item__file">{{ p.file }}</small>
                </div>

                <!-- Revisi -->
                <template v-else>
                  <div class="item__catatan">
                    <ion-icon :icon="chatboxEllipsesOutline" />
                    <p><b>Catatan Validator Dikbud Manado:</b> "{{ p.catatan }}"</p>
                  </div>
                  <div class="item__actions">
                    <button class="item__btn item__btn--gray" type="button">Detail Catatan</button>
                    <button class="item__btn item__btn--primary" type="button"><ion-icon :icon="documentAttachOutline" /> Unggah Ulang SK</button>
                  </div>
                </template>
              </article>
            </div>
          </section>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  arrowBackOutline,
  helpCircleOutline,
  shieldCheckmark,
  shieldCheckmarkOutline,
  addCircleOutline,
  timeOutline,
  checkmarkCircle,
  businessOutline,
  schoolOutline,
  trophyOutline,
  chevronDownOutline,
  documentTextOutline,
  syncOutline,
  cloudUploadOutline,
  informationCircleOutline,
  timerOutline,
  eyeOutline,
  hourglassOutline,
  alertCircleOutline,
  chatboxEllipsesOutline,
  documentAttachOutline,
} from 'ionicons/icons';

const tabs = [
  { key: 'unggah', label: 'Unggah Baru', icon: addCircleOutline },
  { key: 'riwayat', label: 'Riwayat & Status', icon: timeOutline },
];

const tingkat = [
  { label: 'Tingkat Kota Manado', icon: businessOutline },
  { label: 'Antar Kecamatan', icon: businessOutline },
  { label: 'Antar Sekolah Manado', icon: schoolOutline },
  { label: 'Pekan Prestasi Manado', icon: trophyOutline },
];

const tahunList = [2026, 2025, 2024, 2023];

const pengajuan = [
  {
    status: 'Disetujui Kota Manado', tone: 'green', icon: checkmarkCircle, date: '14 Jan 2025',
    title: 'Juara 1 Lomba Cipta Puisi FLS2N Tingkat Kota Manado 2024',
    meta: 'Tingkat Kota Manado • Disdikbud Kota Manado',
    noBsre: 'MND-CERT-88102',
  },
  {
    status: 'Sedang Ditinjau Admin Kota', tone: 'amber', icon: hourglassOutline, date: 'Kemarin',
    title: 'Juara 2 Olimpiade Sains Siswa Kota Manado 2024',
    meta: 'Tingkat Kota Manado • MKKS Kota Manado',
    file: 'OSN_Manado_2024.pdf',
  },
  {
    status: 'Perlu Perbaikan Berkas', tone: 'red', icon: alertCircleOutline, date: '10 Jan 2025',
    title: 'Juara 3 Robotik Kreatif Pelajar Manado 2023',
    meta: 'Tingkat Kota Manado • Balai Pemuda Kota Manado',
    catatan: 'Lampirkan SK Penetapan Pemenang dari Disdikbud Kota Manado atau legalisir Kepala Sekolah untuk pengesahan poin.',
  },
];

const activeTab = ref('unggah');
const fileInput = ref<HTMLInputElement | null>(null);
const berkas = ref<{ name: string; size: string; ext: string } | null>({
  name: 'Sertifikat_Juara2_Debat.pdf', size: '1.8 MB', ext: 'PDF',
});

const form = reactive({
  nama: '',
  tingkat: 'Tingkat Kota Manado',
  tahun: 2024,
  penyelenggara: 'Dinas Pendidikan dan Kebudayaan Kota Manado',
  setuju: true,
});

const bisaKirim = computed(() => form.nama.trim() && form.penyelenggara.trim() && berkas.value && form.setuju);

const pilihBerkas = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran berkas maksimal 5 MB');
  } else {
    berkas.value = {
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
      ext: (file.name.split('.').pop() || '').toUpperCase(),
    };
  }
  input.value = '';
};
</script>

<style scoped>
.validasi-content {
  --background: #f7f9fb;
}

.validasi {
  min-height: 100%;
  padding-bottom: 80px;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.validasi ion-icon {
  flex-shrink: 0;
}

.validasi button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.validasi h1,
.validasi h2,
.validasi h3,
.validasi p {
  margin: 0;
}

.hidden {
  display: none;
}

/* Top bar */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top, 0px) + 10px) 16px 10px;
  background: #fff;
  border-bottom: 1px solid #e0e3e5;
}

.topbar__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.topbar__title {
  font-size: 17px;
  line-height: 22px;
  font-weight: 800;
  color: #003178;
  letter-spacing: -0.3px;
}

.topbar__subtitle {
  font-size: 11px;
  line-height: 14px;
  color: #003178;
}

.topbar__btn {
  display: flex;
  font-size: 24px;
  color: #003178;
}

.topbar__btn--gray {
  color: #434652;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

/* Notice */
.notice {
  display: flex;
  gap: 12px;
  padding: 14px;
  border: 1px solid #b9d3f5;
  border-radius: 14px;
  background: #e8f0fe;
}

.notice__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 10px;
  background: #003178;
  font-size: 20px;
  color: #fff;
}

.notice__title {
  display: block;
  font-size: 13px;
}

.notice__desc {
  margin-top: 6px !important;
  font-size: 12px;
  line-height: 18px;
  color: #003178;
}

/* Tab */
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: #e6e8ea;
}

.tabs__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 6px !important;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  color: #434652 !important;
}

.tabs__item ion-icon {
  font-size: 18px;
}

.tabs__item--active {
  background: #fff !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  color: #003178 !important;
}

.tabs__count {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #003178;
  font-size: 11px;
  color: #fff;
}

/* Panel */
.panel {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.panel__title {
  font-size: 16px;
  font-weight: 800;
  color: #003178;
}

.panel__desc {
  margin-top: 4px !important;
  font-size: 12px;
  line-height: 17px;
  color: #737783;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 18px;
}

.form__row {
  display: grid;
  grid-template-columns: 0.75fr 1.25fr;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.field__label {
  font-size: 13px;
  font-weight: 700;
}

.field__req {
  font-style: normal;
  color: #ba1a1a;
}

.field__box {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 14px;
  border: 1px solid #c4c6d0;
  border-radius: 12px;
  background: #fff;
}

.field__box:focus-within {
  border-color: #003178;
}

.field__input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: #191c1e;
}

.field__select {
  appearance: none;
  cursor: pointer;
}

.field__icon {
  font-size: 18px;
  color: #434652;
  pointer-events: none;
}

.field__hint {
  font-size: 11px;
  line-height: 15px;
  color: #737783;
}

/* Tingkat */
.levels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.levels__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 12px !important;
  border: 1px solid #c4c6d0 !important;
  border-radius: 10px;
  background: #fff !important;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
  color: #434652 !important;
}

.levels__item ion-icon {
  font-size: 16px;
}

.levels__item--active {
  border-color: #003178 !important;
  background: #e8f0fe !important;
  color: #003178 !important;
}

/* Upload */
.upload {
  padding: 12px;
  border: 2px dashed #7fb0e8;
  border-radius: 14px;
  background: #f5f9ff;
}

.upload__file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #fff;
}

.upload__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 42px;
  flex: none;
  border-radius: 8px;
  background: #fff1ef;
  font-size: 18px;
  color: #ba1a1a;
}

.upload__icon small {
  font-size: 8px;
  font-weight: 800;
}

.upload__text {
  flex: 1;
  min-width: 0;
}

.upload__name {
  display: block;
  overflow: hidden;
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.upload__meta {
  font-size: 11px;
  color: #737783;
}

.upload__change {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: none;
  font-size: 12px;
  font-weight: 700;
  color: #003178 !important;
}

.upload__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 18px !important;
  font-size: 13px;
  font-weight: 700;
  color: #003178 !important;
}

.upload__empty ion-icon {
  font-size: 22px;
}

.upload__note {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px !important;
  font-size: 11px;
  line-height: 15px;
  color: #434652;
}

.upload__note ion-icon {
  font-size: 14px;
  color: #003178;
}

/* Persetujuan */
.agree {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12px;
  line-height: 17px;
  color: #434652;
  cursor: pointer;
}

.agree__check {
  width: 18px;
  height: 18px;
  flex: none;
  margin: 0;
  accent-color: #003178;
}

.submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  border-radius: 12px;
  background: #003178 !important;
  box-shadow: 0 6px 16px rgba(0, 49, 120, 0.25);
  font-size: 14px;
  font-weight: 700;
  color: #fff !important;
}

.submit ion-icon {
  font-size: 20px;
}

.submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Info */
.info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f2f4f6;
}

.info ion-icon {
  font-size: 22px;
  color: #003178;
}

.info p {
  font-size: 11px;
  line-height: 16px;
  color: #434652;
}

/* Section head */
.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.section-head__title {
  font-size: 16px;
  font-weight: 800;
}

.section-head__note {
  font-size: 11px;
  color: #737783;
}

/* Daftar pengajuan */
.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.item {
  padding: 14px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.item__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.item__tag--green {
  background: #effaf4;
  color: #047857;
}

.item__tag--amber {
  background: #fff3d6;
  color: #7a3e00;
}

.item__tag--red {
  background: #fff1ef;
  color: #ba1a1a;
}

.item__date {
  flex: none;
  font-size: 11px;
  color: #737783;
}

.item__title {
  margin-top: 10px !important;
  font-size: 15px;
  line-height: 21px;
  font-weight: 700;
}

.item__meta {
  margin-top: 4px !important;
  font-size: 12px;
  color: #737783;
}

.item__foot {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eceef0;
}

.item__foot--plain {
  justify-content: space-between;
  flex-wrap: wrap;
}

.item__shield {
  font-size: 20px;
  color: #003178;
}

.item__cert {
  flex: 1;
  min-width: 0;
}

.item__cert b {
  display: block;
  font-size: 12px;
  color: #003178;
}

.item__cert small {
  font-size: 10px;
  line-height: 14px;
  color: #737783;
}

.item__estimate {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #b45309;
}

.item__estimate ion-icon {
  font-size: 15px;
}

.item__file {
  font-size: 11px;
  color: #434652;
}

.item__catatan {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #f4b6b0;
  border-radius: 12px;
  background: #fff1ef;
}

.item__catatan ion-icon {
  margin-top: 2px;
  font-size: 18px;
  color: #ba1a1a;
}

.item__catatan p {
  font-size: 12px;
  line-height: 17px;
  color: #93000a;
}

.item__catatan b {
  display: block;
}

.item__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

.item__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: none;
  padding: 8px 12px !important;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.item__btn ion-icon {
  font-size: 16px;
}

.item__btn--outline {
  border: 1px solid #003178 !important;
  background: #fff !important;
  color: #003178 !important;
}

.item__btn--gray {
  background: #e6e8ea !important;
  color: #191c1e !important;
}

.item__btn--primary {
  background: #003178 !important;
  color: #fff !important;
}
</style>