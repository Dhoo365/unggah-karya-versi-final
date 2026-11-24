<template>
  <ion-page>
    <ion-content :fullscreen="true" class="st-content">
      <div class="st">
        <!-- Top bar -->
        <header class="topbar">
          <button class="icon-btn" type="button" aria-label="Kembali" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="topbar__text">
            <span>SIKARYA DIKDA SULUT</span>
            <strong>Status Akun Siswa</strong>
          </div>
          <span class="badge">
            <i class="badge__dot"></i>
            Menunggu Verifikasi
          </span>
        </header>

        <main class="body">
          <!-- Status utama -->
          <section class="card hero">
            <div class="hero__icon">
              <ion-icon :icon="hourglassOutline" class="hero__glass" />
              <span class="hero__bubble"><ion-icon :icon="ellipsisHorizontalCircleOutline" /></span>
            </div>
            <span class="pill">
              <ion-icon :icon="timeOutline" />
              Sedang Ditinjau
            </span>
            <h1 class="hero__title">Pendaftaran Berhasil Diajukan</h1>
            <p class="hero__desc">
              Akun Anda sedang dalam proses verifikasi oleh Guru Pembimbing di
              <b>{{ siswa.sekolah }}</b>. Proses biasanya membutuhkan waktu 1×24 jam kerja.
            </p>
          </section>

          <!-- Ringkasan -->
          <section class="card summary">
            <div class="summary__head">
              <h2><ion-icon :icon="idCardOutline" /> Ringkasan Data Siswa</h2>
              <span class="locked"><ion-icon :icon="lockClosedOutline" /> Terkunci</span>
            </div>

            <dl class="rows">
              <div class="row">
                <dt>Nomor Tiket</dt>
                <dd><code class="ticket">{{ siswa.tiket }}</code></dd>
              </div>
              <div class="row">
                <dt>Nama Siswa</dt>
                <dd class="strong">{{ siswa.nama }}</dd>
              </div>
              <div class="row">
                <dt>NISN</dt>
                <dd>{{ siswa.nisn }}</dd>
              </div>
              <div class="row">
                <dt>Sekolah</dt>
                <dd>{{ siswa.sekolah }}</dd>
              </div>
              <div class="row row--dashed">
                <dt>Guru Verifikator</dt>
                <dd class="teacher"><ion-icon :icon="personOutline" /> {{ siswa.guru }}</dd>
              </div>
            </dl>
          </section>

          <!-- Estimasi -->
          <section class="note">
            <span class="note__icon"><ion-icon :icon="informationCircleOutline" /></span>
            <div>
              <strong>Estimasi Selesai 1×24 Jam</strong>
              <p>
                Notifikasi WhatsApp otomatis atau pesan di portal ini akan dikirim segera setelah berkas
                disetujui oleh guru pembimbing Anda.
              </p>
            </div>
          </section>

          <!-- Aksi -->
          <button class="cta" type="button" :disabled="loading" @click="refresh">
            <ion-icon :icon="syncOutline" :class="{ spin: loading }" />
            Perbarui Status (Refresh)
          </button>

          <div class="actions">
            <button type="button" class="ghost" @click="contactTeacher">
              <ion-icon :icon="chatboxEllipsesOutline" />
              Hubungi Guru
            </button>
            <button type="button" class="ghost" @click="logout">
              <ion-icon :icon="logOutOutline" />
              Keluar Akun
            </button>
          </div>
        </main>

        <footer class="foot">Dinas Pendidikan Daerah Provinsi Sulawesi Utara</footer>
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
  chatboxEllipsesOutline,
  ellipsisHorizontalCircleOutline,
  hourglassOutline,
  idCardOutline,
  informationCircleOutline,
  lockClosedOutline,
  logOutOutline,
  personOutline,
  syncOutline,
  timeOutline,
} from 'ionicons/icons';

const router = useRouter();

// Data contoh; ganti dengan data dari API / store
const siswa = {
  tiket: '#REG-SISWA-2025-0842',
  nama: 'Kevin Pangkey',
  nisn: '0078 4920 11',
  sekolah: 'SMA Negeri 1 Manado',
  guru: 'Dra. Meiske Lumintang, M.Pd',
};

const loading = ref(false);

async function refresh() {
  if (loading.value) return;
  loading.value = true;
  try {
    // TODO: panggil API untuk cek status verifikasi terbaru
    await new Promise((r) => setTimeout(r, 1000));
  } finally {
    loading.value = false;
  }
}

function contactTeacher() {
  // TODO: buka WhatsApp guru verifikator
}

function logout() {
  // TODO: hapus sesi/token
  router.replace('/login');
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.st-content {
  --background: #f5f8fc;
}

.st {
  --navy: #0b2a6b;
  --blue: #0b4a8f;
  --teal: #0b6a8a;
  --line: #dde6f1;
  min-height: 100%;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
  background: #f5f8fc;
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

/* ---------- Top bar ---------- */
.topbar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 16px 12px;
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
  line-height: 1.2;
}
.topbar__text span {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.9px;
  color: var(--teal);
}
.topbar__text strong {
  font-size: 17px;
  font-weight: 800;
  color: var(--navy);
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fde8c2;
  font-size: 10.5px;
  font-weight: 600;
  color: #3b2a0a;
}
.badge__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f5a300;
}

/* ---------- Body ---------- */
.body {
  padding: 16px 16px 0;
}
.card {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
}

/* Hero */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 18px 20px;
  text-align: center;
}
.hero__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 74px;
  height: 74px;
  border-radius: 20px;
  background: #e3effd;
}
.hero__glass {
  font-size: 34px;
  color: var(--navy);
}
.hero__bubble {
  position: absolute;
  right: -14px;
  bottom: -2px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 34px;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.12);
  color: #f5a300;
  font-size: 19px;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #fde8c2;
  font-size: 11.5px;
  font-weight: 600;
  color: #1e293b;
}
.pill ion-icon {
  font-size: 13px;
}
.hero__title {
  margin: 16px 0 0;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 700;
  color: var(--navy);
}
.hero__desc {
  margin: 12px 0 0;
  font-size: 13.5px;
  line-height: 1.65;
  color: #475569;
}
.hero__desc b {
  font-weight: 700;
  color: #0f172a;
}

/* Summary */
.summary {
  margin-top: 16px;
  padding: 20px 18px 18px;
}
.summary__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid #e3e9f1;
}
.summary__head h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--navy);
}
.summary__head h2 ion-icon {
  font-size: 20px;
}
.locked {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #64748b;
}
.rows {
  margin: 0;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 34px;
  margin-top: 12px;
}
.row dt {
  font-size: 12.5px;
  color: #475569;
}
.row dd {
  margin: 0;
  font-size: 12.5px;
  text-align: right;
  color: #0f172a;
}
.row dd.strong {
  font-size: 14px;
  font-weight: 600;
}
.ticket {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  background: #eaf0f7;
  font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--blue);
}
.row--dashed {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed #cdd6e2;
}
.teacher {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  color: var(--blue) !important;
}
.teacher ion-icon {
  font-size: 15px;
}

/* Note */
.note {
  display: flex;
  gap: 14px;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #cfe0f3;
  border-radius: 16px;
  background: #edf4fc;
}
.note__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #0b6a9c;
  color: #fff;
  font-size: 22px;
}
.note strong {
  display: block;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--teal);
}
.note p {
  margin: 4px 0 0;
  font-size: 12px;
  line-height: 1.55;
  color: #475569;
}

/* Actions */
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 52px;
  margin-top: 22px;
  border: 0;
  border-radius: 14px;
  background: var(--blue);
  color: #fff;
  font: inherit;
  font-size: 14.5px;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(11, 74, 143, 0.25);
  cursor: pointer;
}
.cta ion-icon {
  font-size: 18px;
}
.cta:active:not(:disabled) {
  transform: scale(0.98);
}
.cta:disabled {
  opacity: 0.75;
}
.spin {
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
}
.ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 50px;
  border: 1px solid #dde3ea;
  border-radius: 14px;
  background: #f1f3f6;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
}
.ghost ion-icon {
  font-size: 17px;
}
.ghost:active {
  background: #e7ebf0;
}

/* Footer */
.foot {
  margin-top: 40px;
  padding: 0 24px;
  text-align: center;
  font-size: 12px;
  color: #8793a3;
}

/* Focus */
.icon-btn:focus-visible,
.cta:focus-visible,
.ghost:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .spin {
    animation: none;
  }
}
</style>