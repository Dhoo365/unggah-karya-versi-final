<template>
  <ion-page>
    <ion-content :fullscreen="true" class="unggah-content">
      <div class="unggah">
        <header class="topbar">
          <div class="topbar__brand">
            <button class="topbar__btn" type="button" aria-label="Menu"><ion-icon :icon="menuOutline" /></button>
            <div class="topbar__text">
              <h1 class="topbar__title">SIKARYA Dikda Sulut</h1>
              <p class="topbar__subtitle">Sulawesi Utara Unggul &amp; Berbudaya</p>
            </div>
          </div>
          <button class="topbar__btn topbar__btn--notif" type="button" aria-label="Notifikasi">
            <ion-icon :icon="notificationsOutline" />
            <i class="topbar__badge"></i>
          </button>
        </header>

        <div class="body">
          <!-- Tahapan -->
          <section class="steps">
            <div class="steps__head">
              <span class="steps__eyebrow">Tahapan Pengiriman</span>
              <span class="steps__count">Langkah {{ currentStep }} dari {{ steps.length }}</span>
            </div>
            <h2 class="steps__title">Unggah Berkas &amp; Karya</h2>
            <div class="steps__bar">
              <i class="steps__fill" :style="{ width: (currentStep / steps.length) * 100 + '%' }"></i>
            </div>
            <div class="steps__labels">
              <span
                v-for="(s, i) in steps"
                :key="s"
                class="steps__label"
                :class="{ 'steps__label--done': i + 1 < currentStep, 'steps__label--active': i + 1 === currentStep }"
              >{{ i + 1 }}. {{ s }}</span>
            </div>
          </section>

          <!-- Info lomba -->
          <section class="banner">
            <span class="banner__eyebrow"><ion-icon :icon="starOutline" /> {{ lomba.tag }}</span>
            <h2 class="banner__title">{{ lomba.title }}</h2>
            <p class="banner__text">Batas Akhir Penerimaan Berkas: {{ lomba.deadline }}</p>
          </section>

          <!-- Data identitas -->
          <section class="panel">
            <div class="panel__head">
              <div class="panel__icon"><ion-icon :icon="peopleOutline" /></div>
              <div class="panel__text">
                <h2 class="panel__title">Data Identitas Peserta</h2>
                <p class="panel__desc">Informasi tim perwakilan dan guru pendamping resmi</p>
              </div>
            </div>

            <div class="form">
              <label v-for="f in identitas" :key="f.key" class="field">
                <span class="field__label">{{ f.label }}</span>
                <span class="field__box" :class="{ 'field__box--readonly': f.readonly }">
                  <input v-model="form[f.key]" class="field__input" type="text" :readonly="f.readonly" />
                  <ion-icon v-if="f.icon" class="field__icon" :icon="f.icon" />
                </span>
                <small v-if="f.hint" class="field__hint">{{ f.hint }}</small>
              </label>
            </div>
          </section>

          <!-- Berkas persyaratan -->
          <section class="panel">
            <div class="panel__head">
              <div class="panel__icon"><ion-icon :icon="documentAttachOutline" /></div>
              <div class="panel__text">
                <h2 class="panel__title">Berkas Persyaratan Lomba</h2>
                <p class="panel__desc">Format resmi dokumen PDF (Maks. 5 MB per berkas)</p>
              </div>
              <span class="panel__count">{{ berkas.length }} Berkas</span>
            </div>

            <div class="files">
              <div v-for="(b, i) in berkas" :key="b.name" class="file">
                <div class="file__icon"><ion-icon :icon="documentTextOutline" /><small>PDF</small></div>
                <div class="file__text">
                  <div class="file__top">
                    <b class="file__name">{{ b.name }}</b>
                    <span class="file__badge">{{ b.badge }}</span>
                  </div>
                  <p class="file__meta">Terunggah ({{ b.fileName }} • {{ b.size }}) • {{ b.info }}</p>
                </div>
                <button class="file__change" type="button" @click="pilihFile(i)">Ganti File</button>
              </div>
            </div>
            <input ref="fileInput" class="hidden" type="file" accept="application/pdf" @change="gantiFile" />

            <div class="notice">
              <ion-icon :icon="shieldCheckmarkOutline" />
              <p>Seluruh berkas administrasi telah memenuhi format sah Dikda Sulut.</p>
            </div>
          </section>

          <!-- Karya digital -->
          <section class="panel">
            <div class="panel__head">
              <div class="panel__icon"><ion-icon :icon="filmOutline" /></div>
              <div class="panel__text">
                <h2 class="panel__title">Karya Digital &amp; Sinopsis</h2>
                <p class="panel__desc">Tautan video dokumenter dan lembar ringkasan karya</p>
              </div>
            </div>

            <div class="form">
              <label class="field">
                <span class="field__label">Tautan Video Karya (YouTube / Google Drive)</span>
                <span class="field__box">
                  <ion-icon class="field__icon field__icon--left" :icon="linkOutline" />
                  <input v-model="form.videoUrl" class="field__input" type="url" placeholder="https://" />
                </span>
                <small class="field__hint">
                  Pastikan pengaturan hak akses video disetel ke 'Tidak Publik (Unlisted)' atau 'Siapa saja yang memiliki tautan'
                </small>
              </label>

              <label class="field">
                <span class="field__row">
                  <span class="field__label">Sinopsis Singkat Karya</span>
                  <small class="field__counter" :class="{ 'field__counter--over': jumlahKata > maxKata }">
                    {{ jumlahKata }} / {{ maxKata }} Kata
                  </small>
                </span>
                <textarea v-model="form.sinopsis" class="field__textarea" rows="5"></textarea>
              </label>

              <div class="field">
                <span class="field__label">Pratinjau Thumbnail Karya Resmi</span>
                <div class="thumb" :style="thumbnail ? { backgroundImage: `url(${thumbnail})` } : {}">
                  <ion-icon v-if="!thumbnail" class="thumb__placeholder" :icon="imageOutline" />
                  <div class="thumb__overlay">
                    <span class="thumb__res">Resolusi: 1920x1080 (HD)</span>
                    <b class="thumb__title">{{ form.judulKarya }}</b>
                  </div>
                  <button class="thumb__btn" type="button" aria-label="Ganti poster" @click="posterInput?.click()">
                    <ion-icon :icon="cameraOutline" />
                  </button>
                </div>
                <input ref="posterInput" class="hidden" type="file" accept="image/*" @change="gantiPoster" />
                <p class="thumb__note">
                  <ion-icon :icon="checkmarkCircle" /> Format 16:9 sesuai pedoman teknis
                  <button class="thumb__link" type="button" @click="posterInput?.click()">Unggah Ulang Poster</button>
                </p>
              </div>
            </div>
          </section>

          <!-- Aksi -->
          <div class="actions">
            <button class="actions__btn actions__btn--primary" type="button" :disabled="jumlahKata > maxKata">
              <ion-icon :icon="sendOutline" /> Kirim Karya ke Penjurian
            </button>
            <button class="actions__btn actions__btn--outline" type="button">
              <ion-icon :icon="mailOutline" /> Simpan Draf Formulir
            </button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  menuOutline,
  notificationsOutline,
  starOutline,
  peopleOutline,
  idCardOutline,
  schoolOutline,
  documentAttachOutline,
  documentTextOutline,
  shieldCheckmarkOutline,
  filmOutline,
  linkOutline,
  imageOutline,
  cameraOutline,
  checkmarkCircle,
  sendOutline,
  mailOutline,
} from 'ionicons/icons';

type FormKey = 'namaTim' | 'sekolah' | 'guru' | 'nip' | 'videoUrl' | 'sinopsis' | 'judulKarya';

const steps = ['Identitas Awal', 'Unggah & Tautan', 'Finalisasi'];
const currentStep = 2;
const maxKata = 200;

const lomba = {
  tag: 'FLS2N SMA Tingkat Provinsi',
  title: 'Lomba Film Pendek & Dokumenter Budaya Sulawesi Utara',
  deadline: '28 Oktober 2025 • 23:59 WITA',
};

const form = reactive<Record<FormKey, string>>({
  namaTim: 'CineMapalus SMAN 1',
  sekolah: 'SMAN 1 Manado (Kota Manado)',
  guru: 'Dra. Vonny Pangemanan, M.Pd',
  nip: '19780412 200501 2 008',
  videoUrl: 'https://youtu.be/wP7_sulut_karya_2025',
  sinopsis:
    'Dokumenter ini merekam kearifan tradisi Mapalus di pedalaman Minahasa Tenggara sebagai cerminan gotong royong luhur yang kini bertransformasi di kalangan generasi muda digital.',
  judulKarya: 'Kain Penghubung Zaman: Mapalus Masa Kini',
});

const identitas: { key: FormKey; label: string; icon?: string; hint?: string; readonly?: boolean }[] = [
  { key: 'namaTim', label: 'Nama Tim / Delegasi', icon: idCardOutline },
  {
    key: 'sekolah', label: 'Asal Satuan Pendidikan', icon: schoolOutline, readonly: true,
    hint: 'Terdaftar resmi di Cabang Dinas Pendidikan Sulawesi Utara',
  },
  { key: 'guru', label: 'Nama Guru Pembimbing' },
  { key: 'nip', label: 'NIP / NUPTK Pembimbing' },
];

const berkas = ref([
  { name: 'Kartu Pelajar Tim (Kolektif)', badge: 'Lengkap', fileName: 'kartu-pelajar.pdf', size: '1.4 MB', info: '24 Okt 2025' },
  { name: 'Surat Pengantar Cabang Dinas', badge: 'Terverifikasi', fileName: 'surat-pengantar.pdf', size: '1.4 MB', info: 'No: 421/CADIS-MDO/89' },
  { name: 'Surat Orisinalitas Bermaterai', badge: 'Materai 10K', fileName: 'orisinalitas.pdf', size: '1.4 MB', info: 'Telah ditandatangani' },
]);

const fileInput = ref<HTMLInputElement | null>(null);
const posterInput = ref<HTMLInputElement | null>(null);
const fileIndex = ref(0);
const thumbnail = ref('');

const jumlahKata = computed(() => form.sinopsis.trim().split(/\s+/).filter(Boolean).length);

const formatSize = (bytes: number) => (bytes / 1024 / 1024).toFixed(1) + ' MB';

const pilihFile = (i: number) => {
  fileIndex.value = i;
  fileInput.value?.click();
};

const gantiFile = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran berkas maksimal 5 MB');
  } else {
    const item = berkas.value[fileIndex.value];
    item.fileName = file.name;
    item.size = formatSize(file.size);
    item.info = 'Baru diunggah';
  }
  input.value = '';
};

const gantiPoster = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (thumbnail.value) URL.revokeObjectURL(thumbnail.value);
  thumbnail.value = URL.createObjectURL(file);
  input.value = '';
};

onUnmounted(() => {
  if (thumbnail.value) URL.revokeObjectURL(thumbnail.value);
});
</script>

<style scoped>
.unggah-content {
  --background: #f7f9fb;
}

.unggah {
  min-height: 100%;
  padding-bottom: 80px;
  background: #f7f9fb;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #191c1e;
}

.unggah ion-icon {
  flex-shrink: 0;
}

.unggah button {
  font-family: inherit;
  border: 0;
  background: none;
  padding: 0;
  color: inherit;
  cursor: pointer;
}

.unggah h1,
.unggah h2,
.unggah h3,
.unggah p {
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
  color: #434652;
}

.topbar__btn {
  position: relative;
  display: flex;
  font-size: 26px;
  color: #003178;
}

.topbar__btn--notif {
  color: #92400e;
}

.topbar__badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 9px;
  height: 9px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #ba1a1a;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px;
}

/* Tahapan */
.steps {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.steps__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.steps__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #003178;
}

.steps__count {
  padding: 3px 10px;
  border-radius: 999px;
  background: #d9e2ff;
  font-size: 11px;
  font-weight: 600;
  color: #003178;
}

.steps__title {
  margin-top: 8px !important;
  font-size: 19px;
  font-weight: 800;
}

.steps__bar {
  overflow: hidden;
  height: 6px;
  margin-top: 14px;
  border-radius: 3px;
  background: #e6e8ea;
}

.steps__fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  background: #003178;
  transition: width 0.3s ease;
}

.steps__labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.steps__label {
  font-size: 11px;
  color: #737783;
}

.steps__label--done {
  color: #003178;
}

.steps__label--active {
  font-weight: 700;
  color: #003178;
}

/* Banner */
.banner {
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0d47a1 0%, #003178 100%);
  color: #fff;
}

.banner__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #d9e2ff;
}

.banner__eyebrow ion-icon {
  padding: 2px;
  border-radius: 50%;
  background: #ffba38;
  font-size: 12px;
  color: #003178;
}

.banner__title {
  margin-top: 8px !important;
  font-size: 17px;
  line-height: 23px;
  font-weight: 800;
}

.banner__text {
  margin-top: 6px !important;
  font-size: 12px;
  line-height: 17px;
  color: #d9e2ff;
}

/* Panel */
.panel {
  padding: 16px;
  border: 1px solid #e0e3e5;
  border-radius: 16px;
  background: #fff;
}

.panel__head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eceef0;
}

.panel__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 10px;
  background: #d9e2ff;
  font-size: 20px;
  color: #003178;
}

.panel__text {
  flex: 1;
  min-width: 0;
}

.panel__title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
}

.panel__desc {
  margin-top: 2px !important;
  font-size: 11px;
  line-height: 15px;
  color: #737783;
}

.panel__count {
  flex: none;
  padding: 3px 10px;
  border-radius: 999px;
  background: #d9e2ff;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  color: #003178;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field__label {
  font-size: 12px;
  font-weight: 700;
  color: #191c1e;
}

.field__box {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 14px;
  border: 1px solid #c4c6d0;
  border-radius: 12px;
  background: #f7f9fb;
}

.field__box:focus-within {
  border-color: #003178;
  background: #fff;
}

.field__box--readonly {
  background: #f2f4f6;
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

.field__icon {
  font-size: 20px;
  color: #737783;
}

.field__icon--left {
  color: #003178;
}

.field__hint {
  font-size: 11px;
  line-height: 15px;
  color: #737783;
}

.field__counter {
  font-size: 11px;
  font-weight: 600;
  color: #737783;
}

.field__counter--over {
  color: #ba1a1a;
}

.field__textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #c4c6d0;
  border-radius: 12px;
  outline: none;
  resize: vertical;
  background: #f7f9fb;
  font-family: inherit;
  font-size: 13px;
  line-height: 20px;
  color: #191c1e;
}

.field__textarea:focus {
  border-color: #003178;
  background: #fff;
}

/* Berkas */
.files {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e0e3e5;
  border-radius: 12px;
  background: #f7f9fb;
}

.file__icon {
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

.file__icon small {
  font-size: 8px;
  font-weight: 800;
}

.file__text {
  flex: 1;
  min-width: 0;
}

.file__top {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px;
}

.file__name {
  font-size: 13px;
  line-height: 18px;
}

.file__badge {
  padding: 2px 8px;
  border-radius: 6px;
  background: #effaf4;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  color: #047857;
}

.file__meta {
  margin-top: 4px !important;
  font-size: 11px;
  line-height: 15px;
  color: #737783;
}

.file__change {
  flex: none;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  text-decoration: underline;
  color: #003178 !important;
}

.notice {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  padding: 10px 12px;
  border: 1px solid #e0e3e5;
  border-radius: 10px;
  background: #f2f4f6;
}

.notice ion-icon {
  margin-top: 1px;
  font-size: 16px;
  color: #003178;
}

.notice p {
  font-size: 11px;
  line-height: 16px;
  color: #003178;
}

/* Thumbnail */
.thumb {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  background: linear-gradient(135deg, #0d47a1 0%, #003178 100%) center / cover no-repeat;
}

.thumb__placeholder {
  font-size: 48px;
  color: rgba(255, 255, 255, 0.3);
}

.thumb__overlay {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 36px 56px 12px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
}

.thumb__res {
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.55);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffba38;
}

.thumb__title {
  font-size: 14px;
  line-height: 19px;
  color: #fff;
}

.thumb__btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2) !important;
  font-size: 18px;
  color: #fff !important;
}

.thumb__note {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 11px;
  color: #434652;
}

.thumb__note ion-icon {
  font-size: 14px;
  color: #047857;
}

.thumb__link {
  font-size: 11px;
  font-weight: 700;
  color: #003178 !important;
}

/* Aksi */
.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.actions__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 50px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
}

.actions__btn ion-icon {
  font-size: 18px;
}

.actions__btn--primary {
  background: #003178 !important;
  box-shadow: 0 6px 16px rgba(0, 49, 120, 0.25);
  color: #fff !important;
}

.actions__btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.actions__btn--outline {
  border: 1px solid #c4c6d0 !important;
  background: #fff !important;
  color: #003178 !important;
}
</style>