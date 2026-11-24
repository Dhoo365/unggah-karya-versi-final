<template>
  <ion-page>
    <ion-content :fullscreen="true" class="rv-content">
      <div class="rv">
        <!-- Top bar -->
        <header class="topbar">
          <button class="icon-btn" type="button" aria-label="Kembali" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="topbar__text">
            <strong>Status &amp; Perbaikan Akun</strong>
            <span>SIKARYA Dikda Sulut • Siswa Aktif</span>
          </div>
          <span class="badge">
            <ion-icon :icon="alertCircleOutline" />
            Perlu Revisi
          </span>
        </header>

        <main class="body">
          <!-- Tiket + catatan -->
          <section class="ticket">
            <div class="ticket__head">
              <span class="ticket__icon"><ion-icon :icon="clipboardOutline" /></span>
              <div class="ticket__id">
                <small>ID TIKET VERIFIKASI</small>
                <strong>{{ data.tiket }}</strong>
              </div>
              <span class="deadline"><ion-icon :icon="timerOutline" /> Sisa {{ data.sisa }}</span>
            </div>

            <div class="note">
              <div class="note__meta">
                <span class="note__who"><ion-icon :icon="ribbonOutline" /> Catatan Verifikator</span>
                <i class="note__dot"></i>
                <span class="note__name">{{ data.guru }}</span>
              </div>
              <blockquote>“{{ data.catatan }}”</blockquote>
            </div>
          </section>

          <!-- Data Dapodik -->
          <section class="card">
            <div class="card__head">
              <h2><ion-icon :icon="idCardOutline" /> Data Terverifikasi Dapodik</h2>
              <span class="sync"><ion-icon :icon="checkmarkCircleOutline" /> Sinkron Dapodik</span>
            </div>

            <div class="locked">
              <div>
                <small>Nama Lengkap Siswa</small>
                <strong class="locked__name">{{ data.nama }}</strong>
              </div>
              <ion-icon :icon="lockClosedOutline" />
            </div>
            <div class="locked">
              <div>
                <small>Nomor Induk Siswa Nasional</small>
                <strong>{{ data.nisn }}</strong>
              </div>
              <ion-icon :icon="lockClosedOutline" />
            </div>
            <div class="locked locked--school">
              <span class="locked__avatar"><ion-icon :icon="schoolOutline" /></span>
              <div>
                <small>Satuan Pendidikan (Sekolah Asal)</small>
                <strong class="locked__school">{{ data.sekolah }}</strong>
              </div>
            </div>

            <p class="help help--icon">
              <ion-icon :icon="informationCircleOutline" />
              Perubahan nama dan NISN hanya dapat diproses melalui Operator Dapodik Satuan Pendidikan.
            </p>
          </section>

          <!-- Formulir -->
          <section class="card">
            <div class="card__head">
              <h2 class="h-lg"><ion-icon :icon="createOutline" /> Formulir Perbaikan Data</h2>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="rombel">Rombongan Belajar (Rombel) <i>*</i></label>
                <span class="year">Tahun Ajaran 2024/2025</span>
              </div>
              <div class="select">
                <ion-icon class="select__icon" :icon="businessOutline" />
                <select id="rombel" v-model="form.rombel">
                  <option v-for="r in rombelList" :key="r" :value="r">{{ r }}</option>
                </select>
                <ion-icon class="select__chev" :icon="chevronDownOutline" />
              </div>
              <p class="help">Pilih rombel resmi yang sesuai dengan SK Pembagian Kelas terkini.</p>
            </div>

            <div class="field">
              <div class="label-row">
                <label>Scan Kartu Pelajar Siswa <i>*</i></label>
                <span class="format">Format JPG, PNG, PDF (Maks 2 MB)</span>
              </div>

              <!-- File ditolak -->
              <div class="rejected">
                <span class="rejected__icon"><ion-icon :icon="imageOutline" /></span>
                <div class="rejected__text">
                  <strong>{{ data.fileLama }}</strong>
                  <span>Alasan penolakan: File buram &amp; tidak terbaca</span>
                </div>
                <span class="rejected__tag"><ion-icon :icon="closeCircleOutline" /> Ditolak</span>
              </div>

              <!-- File baru -->
              <div class="upload">
                <div class="upload__row">
                  <span class="upload__icon"><ion-icon :icon="cloudDoneOutline" /></span>
                  <div class="upload__text">
                    <strong>{{ file.name }}</strong>
                    <span>
                      {{ file.size }} <i class="dot"></i>
                      <b><ion-icon :icon="checkmarkCircleOutline" /> Resolusi tajam (300 DPI)</b>
                    </span>
                  </div>
                  <span class="upload__ready">Siap</span>
                </div>
                <button class="upload__btn" type="button" @click="pickFile">
                  <ion-icon :icon="syncOutline" />
                  Ganti File
                </button>
                <input ref="fileInput" type="file" accept=".jpg,.jpeg,.png,.pdf" hidden @change="onFile" />
              </div>
              <p v-if="fileError" class="error">{{ fileError }}</p>
            </div>

            <div class="field">
              <div class="label-row">
                <label for="catatan">Catatan Tanggapan Siswa <span class="opt">(Opsional)</span></label>
                <span class="format">Maks. 250 karakter</span>
              </div>
              <textarea id="catatan" v-model="form.catatan" maxlength="250" rows="3"></textarea>
              <p class="help">
                Pesan ini akan langsung terlihat oleh Verifikator di Dinas Pendidikan Daerah Sulawesi Utara.
              </p>
            </div>
          </section>

          <aside class="priority">
            <ion-icon :icon="shieldCheckmarkOutline" />
            <p>
              Data perbaikan yang dikirim ulang akan masuk prioritas antrean kurasi verifikator dalam waktu
              1×24 jam kerja.
            </p>
          </aside>
        </main>

        <div class="ft">
          <div class="ft__inner">
            <button class="cta" type="button" :disabled="sending" @click="submit">
              <ion-icon :icon="paperPlaneOutline" />
              Kirim Ulang Perbaikan
            </button>
            <button class="ghost" type="button" @click="contactTeacher">
              <ion-icon :icon="helpCircleOutline" />
              Bantuan / Hubungi Guru Pembimbing
            </button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  alertCircleOutline,
  arrowBackOutline,
  businessOutline,
  checkmarkCircleOutline,
  chevronDownOutline,
  clipboardOutline,
  closeCircleOutline,
  cloudDoneOutline,
  createOutline,
  helpCircleOutline,
  idCardOutline,
  imageOutline,
  informationCircleOutline,
  lockClosedOutline,
  paperPlaneOutline,
  ribbonOutline,
  schoolOutline,
  shieldCheckmarkOutline,
  syncOutline,
  timerOutline,
} from 'ionicons/icons';

const router = useRouter();

// Data contoh; ganti dengan data dari API / store
const data = {
  tiket: '#REV-SISWA-4920',
  sisa: '2 hari 18 jam',
  guru: 'Dra. Meiske Lumintang, M.Pd',
  catatan:
    'Mohon sesuaikan pilihan rombel kelas Anda dan unggah ulang scan Kartu Pelajar yang terbaca jelas.',
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  sekolah: 'SMA Negeri 1 Manado',
  fileLama: 'KPS_KevinPangkey_Lama.jpg',
};

const rombelList = [
  'Kelas XII MIPA 3 (Aktif Semester Berjalan)',
  'Kelas XII MIPA 1 (Aktif Semester Berjalan)',
  'Kelas XII MIPA 2 (Aktif Semester Berjalan)',
  'Kelas XII IPS 1 (Aktif Semester Berjalan)',
];

const form = reactive({
  rombel: rombelList[0],
  catatan: 'Sudah saya unggah kartu pelajar yang baru dan kelas disesuaikan.',
});

const file = reactive({ name: 'Scan_KPS_Kevin_Update.jpg', size: '340 KB' });
const fileInput = ref<HTMLInputElement | null>(null);
const fileError = ref('');
const sending = ref(false);

const MAX_SIZE = 2 * 1024 * 1024;

function pickFile() {
  fileInput.value?.click();
}

function onFile(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (!f) return;
  if (f.size > MAX_SIZE) {
    fileError.value = 'Ukuran file melebihi 2 MB. Pilih file yang lebih kecil.';
    return;
  }
  fileError.value = '';
  file.name = f.name;
  file.size = f.size >= 1024 * 1024 ? `${(f.size / 1024 / 1024).toFixed(1)} MB` : `${Math.round(f.size / 1024)} KB`;
}

async function submit() {
  if (sending.value) return;
  sending.value = true;
  try {
    // TODO: kirim form.rombel, file, form.catatan ke API
    await new Promise((r) => setTimeout(r, 800));
  } finally {
    sending.value = false;
  }
}

function contactTeacher() {
  // TODO: buka WhatsApp guru pembimbing
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.rv-content {
  --background: #f5f8fc;
}

.rv {
  --navy: #0b2a6b;
  --blue: #0b4a8f;
  --teal: #0b6a8a;
  --line: #dde6f1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #f5f8fc;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

/* ---------- Top bar ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 14px 10px 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
}
.icon-btn {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--navy);
  font-size: 24px;
  cursor: pointer;
}
.topbar__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
}
.topbar__text strong {
  max-width: 170px;
  font-size: 17px;
  line-height: 1.25;
  font-weight: 800;
  color: var(--navy);
}
.topbar__text span {
  font-size: 10px;
  white-space: nowrap;
  color: #475569;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fde6e0;
  font-size: 11px;
  font-weight: 700;
  color: #b3261e;
}
.badge ion-icon {
  font-size: 14px;
}

.body {
  flex: 1;
  padding: 16px 16px 20px;
}

/* ---------- Ticket ---------- */
.ticket {
  padding: 12px;
  border: 1px solid #f3dc9a;
  border-radius: 16px;
  background: linear-gradient(180deg, #fff5d6 0%, #fffaf0 100%);
  box-shadow: 0 2px 8px rgba(245, 184, 0, 0.12);
}
.ticket__head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ticket__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border: 1.5px solid #f0b429;
  border-radius: 10px;
  background: #fff3cf;
  color: #b45309;
  font-size: 22px;
}
.ticket__id {
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 1.25;
}
.ticket__id small {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.4px;
  color: #475569;
}
.ticket__id strong {
  font-size: 14px;
  font-weight: 800;
  color: #a1380f;
}
.deadline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border: 1px solid #f3c969;
  border-radius: 999px;
  background: #fffaf0;
  font-size: 10px;
  font-weight: 600;
  color: #a1380f;
}
.deadline ion-icon {
  font-size: 13px;
}

.note {
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #f1e6c3;
  border-radius: 12px;
  background: #fff;
}
.note__meta {
  display: flex;
  align-items: center;
  gap: 8px;
}
.note__who {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--teal);
}
.note__who ion-icon {
  flex-shrink: 0;
  font-size: 15px;
}
.note__dot {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #64748b;
}
.note__name {
  font-size: 10px;
  line-height: 1.25;
  color: #475569;
}
.note blockquote {
  margin: 12px 0 2px;
  padding-left: 12px;
  border-left: 3px solid #f0b429;
  font-size: 13.5px;
  font-style: italic;
  line-height: 1.6;
  color: #334155;
}

/* ---------- Cards ---------- */
.card {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 12px;
  margin-bottom: 14px;
  border-bottom: 1px solid #e5ecf5;
}
.card__head h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--navy);
}
.card__head h2 ion-icon {
  font-size: 17px;
}
.card__head .h-lg {
  font-size: 15px;
  font-weight: 800;
}
.sync {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #d9f5e3;
  font-size: 10px;
  font-weight: 600;
  color: #15803d;
}
.sync ion-icon {
  font-size: 12px;
}

/* Locked fields */
.locked {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
  padding: 12px 14px;
  border: 1px solid #e6ebf2;
  border-radius: 12px;
  background: #f1f4f8;
}
.locked small {
  display: block;
  font-size: 10px;
  color: #475569;
}
.locked strong {
  display: block;
  margin-top: 4px;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: #0f172a;
}
.locked .locked__name {
  color: var(--navy);
}
.locked > ion-icon {
  align-self: flex-start;
  font-size: 13px;
  color: #64748b;
}
.locked--school {
  justify-content: flex-start;
  gap: 12px;
}
.locked__avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e3e9f1;
  color: #334155;
  font-size: 16px;
}
.locked .locked__school {
  margin-top: 2px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0;
}

.help {
  margin: 6px 0 0;
  font-size: 11px;
  line-height: 1.5;
  color: #64748b;
}
.help--icon {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}
.help--icon ion-icon {
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 13px;
}

/* ---------- Form ---------- */
.field {
  margin-bottom: 16px;
}
.field:last-child {
  margin-bottom: 0;
}
.label-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}
.label-row label {
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.35;
  color: #0f172a;
}
.label-row label i {
  font-style: normal;
  color: #dc2626;
}
.opt {
  font-weight: 400;
  color: #475569;
}
.year {
  max-width: 90px;
  font-size: 10px;
  line-height: 1.3;
  color: var(--teal);
}
.format {
  max-width: 108px;
  font-size: 10px;
  line-height: 1.3;
  color: #64748b;
}

.select {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  border: 1px solid #cfd8e3;
  border-radius: 12px;
  background: #f1f4f8;
}
.select__icon {
  flex-shrink: 0;
  font-size: 18px;
  color: #334155;
}
.select select {
  flex: 1;
  min-width: 0;
  height: 44px;
  padding: 0 24px 0 0;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  font-size: 12.5px;
  color: #1e293b;
  text-overflow: ellipsis;
  appearance: none;
  -webkit-appearance: none;
}
.select__chev {
  position: absolute;
  right: 12px;
  font-size: 16px;
  pointer-events: none;
}
.select:focus-within,
textarea:focus {
  border-color: #2f7be0;
  box-shadow: 0 0 0 3px rgba(47, 123, 224, 0.15);
}

/* Rejected */
.rejected {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #f4b8b8;
  border-radius: 12px;
  background: #fdecec;
}
.rejected__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #fff;
  color: #c62828;
  font-size: 17px;
}
.rejected__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  line-height: 1.3;
}
.rejected__text strong {
  overflow: hidden;
  font-size: 11.5px;
  font-weight: 700;
  color: #c62828;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rejected__text span {
  overflow: hidden;
  font-size: 10px;
  color: #c62828;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.rejected__tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  background: #f9d3d3;
  font-size: 10px;
  font-weight: 700;
  color: #c62828;
}

/* Upload */
.upload {
  margin-top: 12px;
  padding: 12px;
  border: 1.5px dashed #6aa9ee;
  border-radius: 14px;
  background: #eaf3fd;
}
.upload__row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.upload__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #cfe3fb;
  color: var(--blue);
  font-size: 23px;
}
.upload__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 2px;
}
.upload__text strong {
  overflow: hidden;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--navy);
  white-space: nowrap;
  text-overflow: ellipsis;
}
.upload__text span {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #475569;
}
.upload__text b {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 500;
  color: #15803d;
}
.upload__text b ion-icon {
  font-size: 13px;
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #475569;
}
.upload__ready {
  flex-shrink: 0;
  align-self: flex-start;
  padding: 3px 9px;
  border-radius: 999px;
  background: #d9f5e3;
  font-size: 10px;
  font-weight: 700;
  color: #15803d;
}
.upload__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 38px;
  margin-top: 12px;
  border: 1px solid #c9d6e6;
  border-radius: 8px;
  background: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--navy);
  cursor: pointer;
}
.upload__btn ion-icon {
  font-size: 14px;
}
.error {
  margin: 6px 0 0;
  font-size: 11px;
  color: #c62828;
}

textarea {
  display: block;
  width: 100%;
  min-height: 84px;
  padding: 12px;
  border: 1px solid #cfd8e3;
  border-radius: 12px;
  outline: 0;
  background: #f1f4f8;
  font: inherit;
  font-size: 13.5px;
  line-height: 1.55;
  color: #1e293b;
  resize: none;
  box-sizing: border-box;
}

/* Priority note */
.priority {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  padding: 14px;
  border: 1px solid #e0e6ee;
  border-radius: 14px;
  background: #eceff3;
}
.priority ion-icon {
  flex-shrink: 0;
  font-size: 22px;
  color: var(--teal);
}
.priority p {
  margin: 0;
  font-size: 11px;
  line-height: 1.55;
  color: #475569;
}

/* ---------- Footer ---------- */
.ft {
  position: sticky;
  bottom: 0;
  z-index: 10;
  background: #f5f8fc;
}
.ft__inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 16px calc(env(safe-area-inset-bottom, 0px) + 10px);
  border-top: 1px solid #e5ecf5;
  background: #f5f8fc;
}
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
  border: 0;
  border-radius: 12px;
  background: var(--blue);
  color: #fff;
  font: inherit;
  font-size: 13.5px;
  font-weight: 700;
  box-shadow: 0 5px 12px rgba(11, 74, 143, 0.25);
  opacity: 1;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.cta ion-icon {
  font-size: 17px;
}
.cta:active:not(:disabled) {
  transform: scale(0.98);
}
.cta:disabled {
  opacity: 0.7;
}
.ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  border: 1px solid #c9d6e6;
  border-radius: 12px;
  background: #fff;
  font: inherit;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--navy);
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.ghost ion-icon {
  font-size: 15px;
}

/* Focus */
.icon-btn:focus-visible,
.upload__btn:focus-visible,
.cta:focus-visible,
.ghost:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}
</style>