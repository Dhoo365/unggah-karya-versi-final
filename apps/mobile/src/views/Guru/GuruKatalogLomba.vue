<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="topbar">
        <ion-buttons slot="start">
          <ion-button @click="router.back()" aria-label="Kembali">
            <ion-icon slot="icon-only" :icon="arrowBack" />
          </ion-button>
        </ion-buttons>
        <div class="topbar__title">
          <h1>Katalog Lomba Aktif</h1>
          <p><ion-icon :icon="checkmarkCircle" /> Portal Resmi Dikda Prov. Sulut</p>
        </div>
        <ion-buttons slot="end">
          <ion-button aria-label="Cari"><ion-icon slot="icon-only" :icon="searchOutline" /></ion-button>
          <ion-button aria-label="Notifikasi" class="bell">
            <ion-icon slot="icon-only" :icon="notificationsOutline" />
            <span class="bell__dot" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="page">
      <div class="wrap">
        <!-- Akun guru -->
        <section class="account">
          <div class="account__icon"><ion-icon :icon="schoolOutline" /></div>
          <div class="account__text">
            <small>AKUN GURU PEMBIMBING</small>
            <strong>SMP Negeri 1 Manado</strong>
          </div>
          <span class="status-badge"><i class="dot" /> Aktif</span>
        </section>

        <!-- Kategori jenjang -->
        <div class="sect-head">
          <h2>Kategori Jenjang</h2>
          <button class="sect-head__btn"><ion-icon :icon="optionsOutline" /> Sesuaikan</button>
        </div>
        <div class="chips" role="tablist">
          <button
            v-for="j in jenjangList"
            :key="j.key"
            class="chip"
            :class="{ 'chip--on': jenjang === j.key }"
            role="tab"
            :aria-selected="jenjang === j.key"
            @click="jenjang = j.key"
          >
            <ion-icon v-if="jenjang === j.key" :icon="checkmark" /> {{ j.label }}
          </button>
        </div>

        <!-- Info wilayah -->
        <section class="info">
          <ion-icon :icon="megaphoneOutline" class="info__icon" />
          <div>
            <b>Informasi Wilayah Sulawesi Utara</b>
            <p>
              Menampilkan 6 Lomba Resmi Dinas Pendidikan Daerah Prov. Sulut Periode 2026 khusus
              tingkat SMP.
            </p>
          </div>
        </section>

        <!-- Daftar lomba -->
        <article
          v-for="l in tampil"
          :key="l.id"
          class="card"
          :class="{ 'card--soon': l.status === 'segera' }"
        >
          <!-- Baris label -->
          <div class="card__tags">
            <span v-if="l.status === 'dibuka' && l.badge" class="pill pill--amber">
              <ion-icon :icon="l.badge.icon" /> {{ l.badge.label }}
            </span>
            <span v-else-if="l.status === 'dibuka'" class="pill pill--blue"><i class="dot" /> Dibuka</span>
            <span v-else class="pill pill--gray"><ion-icon :icon="lockClosedOutline" /> Segera Dibuka (Coming Soon)</span>

            <span v-if="l.badge" class="pill pill--blue"><i class="dot" /> Pendaftaran Dibuka</span>
            <span v-else-if="l.tagKanan" class="tagkanan" :class="{ 'pill pill--amber': l.tagKananWarna === 'amber' }">
              <ion-icon :icon="l.tagKananIcon" /> {{ l.tagKanan }}
            </span>
          </div>

          <h3>{{ l.judul }}</h3>
          <p class="desc">{{ l.deskripsi }}</p>

          <!-- Cabang -->
          <template v-if="l.cabang">
            <p class="cabang-title">CABANG YANG DILOMBAKAN:</p>
            <div class="cabang">
              <span v-for="c in l.cabang" :key="c.nama" class="tag"><ion-icon :icon="c.icon" /> {{ c.nama }}</span>
            </div>
          </template>

          <!-- Tag bidang -->
          <div v-if="l.bidang" class="bidang">
            <span class="tag">{{ l.bidang[0] }}</span>
            <i class="dot dot--gray" />
            <span class="tag">{{ l.bidang[1] }}</span>
          </div>

          <!-- Kotak tanggal -->
          <div v-if="l.status === 'dibuka'" class="box">
            <div class="box__row">
              <span class="box__label"><ion-icon :icon="l.sisaHari ? calendarOutline : l.batasIcon" /> {{ l.batasLabel }}</span>
              <strong>{{ l.batas }}</strong>
            </div>
            <template v-if="l.sisaHari">
              <div class="box__row box__row--split">
                <span class="late"><ion-icon :icon="timeOutline" /> {{ l.sisaHari }}</span>
                <span class="kuota">Kuota: {{ l.kuota }}</span>
              </div>
              <div class="box__row box__row--line">
                <span class="kuota">Sisa Kuota SMPN 1:</span>
                <span class="chip-blue">{{ l.sisaKuota }}</span>
              </div>
            </template>
          </div>

          <!-- Tombol -->
          <template v-if="l.status === 'dibuka'">
            <template v-if="l.layout === 'stack'">
              <button class="btn-navy btn-navy--lg" @click="daftar(l)">
                <ion-icon :icon="personAddOutline" /> Daftarkan Siswa (+)
              </button>
              <button class="btn-outline btn-outline--lg" @click="unduh(l)">
                <ion-icon :icon="documentsOutline" /> Unduh Juknis PDF ({{ l.ukuranJuknis }})
              </button>
            </template>
            <div v-else-if="l.layout === 'split'" class="btnrow">
              <button class="btn-navy" @click="daftar(l)"><ion-icon :icon="personAddOutline" /> Daftarkan Siswa</button>
              <button class="btn-outline" @click="unduh(l)"><ion-icon :icon="downloadOutline" /> Unduh Juknis</button>
            </div>
            <div v-else class="btnrow btnrow--icon">
              <button class="btn-navy" @click="daftar(l)"><ion-icon :icon="documentTextOutline" /> Daftar Sekarang</button>
              <button class="btn-outline btn-outline--icon" aria-label="Unduh juknis" @click="unduh(l)">
                <ion-icon :icon="documentTextOutline" />
              </button>
            </div>
          </template>

          <!-- Coming soon -->
          <template v-else>
            <p class="soon-note">{{ l.catatan }}</p>
            <div class="soon-foot">
              <em>{{ l.petunjuk }}</em>
              <button class="btn-remind" @click="ingatkan(l)">
                <ion-icon :icon="notificationsOutline" /> Ingatkan
              </button>
            </div>
          </template>
        </article>

        <p v-if="!tampil.length" class="empty">
          Belum ada lomba untuk jenjang ini. Pilih "Jenjang SMP" untuk melihat katalog sekolah Anda.
        </p>

        <!-- Bantuan -->
        <section class="help">
          <div class="help__icon"><ion-icon :icon="helpCircleOutline" /></div>
          <b>Butuh bantuan pendaftaran?</b>
          <p>Hubungi Panitia Provinsi melalui menu Profil &gt; Bantuan.</p>
        </section>
      </div>
    </ion-content>

    <GuruTabbar />
  </ion-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import {
  arrowBack, searchOutline, notificationsOutline, checkmarkCircle, checkmark, schoolOutline,
  optionsOutline, megaphoneOutline, trophyOutline, calendarOutline, timeOutline,
  personAddOutline, documentsOutline, downloadOutline, documentTextOutline,
  lockClosedOutline, helpCircleOutline, colorPaletteOutline, micOutline, brushOutline,
  filmOutline, fitnessOutline, bulbOutline, musicalNotesOutline,
} from 'ionicons/icons';
import GuruTabbar from './GuruTabbar.vue';

// Sesuaikan path jika GuruTabBar ada di folder lain (mis. './GuruTabBar.vue')


const router = useRouter();

const jenjang = ref('smp');
const jenjangList = [
  { key: 'smp', label: 'Jenjang SMP (Terfilter Sekolah)' },
  { key: 'smasmk', label: 'Jenjang SMA/SMK' },
];

const lomba = ref([
  {
    id: 1, jenjang: 'smp', status: 'dibuka', layout: 'stack',
    badge: { label: 'Provinsi Sulut 2026', icon: trophyOutline },
    judul: 'Lomba FLS2N SMP Tingkat Provinsi 2026',
    deskripsi: 'Festival & Lomba Seni Siswa Nasional - Seleksi Berjenjang',
    cabang: [
      { nama: 'Tari Kreasi Tradisional', icon: colorPaletteOutline },
      { nama: 'Menyanyi Solo', icon: micOutline },
      { nama: 'Desain Ilustrasi Digital', icon: brushOutline },
      { nama: 'Sinematografi', icon: filmOutline },
    ],
    batasLabel: 'Batas Akhir:', batas: '28 Juni 2026', sisaHari: '14 Hari Lagi',
    kuota: '2 Karya/Cabang', sisaKuota: '1 Siswa / Karya', ukuranJuknis: '2.4 MB',
  },
  {
    id: 2, jenjang: 'smp', status: 'dibuka', layout: 'split',
    tagKanan: 'Olahraga', tagKananIcon: fitnessOutline,
    judul: 'O2SN SMP Cabang Pencak Silat & Atletik',
    deskripsi: 'Olimpiade Olahraga Siswa Nasional - Tingkat Kabupaten/Provinsi',
    batasLabel: 'Batas Registrasi:', batas: '10 Juli 2026', batasIcon: calendarOutline,
  },
  {
    id: 3, jenjang: 'smp', status: 'dibuka', layout: 'icon',
    tagKanan: 'Riset Pelajar', tagKananIcon: bulbOutline, tagKananWarna: 'amber',
    judul: 'Lomba Kreativitas & Inovasi Pelajar SMP Sulut',
    deskripsi: '', bidang: ['Karya Ilmiah Remaja', 'Teknologi Tepat Guna'],
    batasLabel: 'Batas Pengumpulan:', batas: '15 Juli 2026', batasIcon: timeOutline,
  },
  {
    id: 4, jenjang: 'smp', status: 'segera',
    tagKanan: 'Budaya Daerah', tagKananIcon: musicalNotesOutline,
    judul: 'Lomba Musik Kolintang Pelajar',
    deskripsi: '',
    catatan: 'Pelestarian alat musik tradisional khas Minahasa & Sulawesi Utara tingkat satuan pendidikan.',
    petunjuk: 'Petunjuk Teknis sedang disiapkan Panitia Provinsi.',
  },
]);

const tampil = computed(() => lomba.value.filter((l) => l.jenjang === jenjang.value));

function daftar(l) {
  // TODO: arahkan ke form pendaftaran siswa untuk lomba ini
  console.log('daftar', l.id);
}
function unduh(l) {
  // TODO: unduh juknis PDF
  console.log('unduh juknis', l.id);
}
function ingatkan(l) {
  // TODO: simpan pengingat pembukaan lomba
  console.log('ingatkan', l.id);
}
</script>

<style scoped>
ion-page {
  --navy: #0b2f7a;
  --green: #0f9d6b;
  --red: #b3171c;
  --amber-bg: #fdecc4;
  --line: #dfe5ee;
  --ink: #0f172a;
  --muted: #64748b;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.page { --background: #f1f4f9; }
.wrap { padding: 12px 14px 24px; color: var(--ink); }
.dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.dot--gray { width: 4px; height: 4px; background: #94a3b8; margin: 0 8px; }
button { font: inherit; cursor: pointer; }
button:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }

/* Top bar */
.topbar { --background: #fff; --color: var(--navy); --border-width: 0; padding: 4px 0; }
.topbar__title { padding: 0 4px; }
.topbar__title h1 { margin: 0; font-size: 18px; font-weight: 800; color: var(--navy); line-height: 1.2; }
.topbar__title p { display: flex; align-items: center; gap: 4px; margin: 2px 0 0; font-size: 11px; color: #3b6fb6; }
.bell { position: relative; }
.bell__dot { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; border-radius: 50%; background: #d92d20; }

/* Akun */
.account { display: flex; align-items: center; gap: 12px; padding: 12px; background: #fff; border: 1px solid #cdd5e1; border-radius: 14px; }
.account__icon { flex: none; width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; background: #dbe7fb; color: var(--navy); font-size: 22px; }
.account__text { display: flex; flex-direction: column; min-width: 0; }
.account__text small { font-size: 10.5px; font-weight: 700; color: #1a5aa8; letter-spacing: 0.02em; }
.account__text strong { margin-top: 2px; font-size: 14.5px; font-weight: 800; }
.status-badge { margin-left: auto; align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 12px; background: #cfe6fb; color: #0b5cad; font-size: 12px; font-weight: 700; }

/* Section head & chips */
.sect-head { display: flex; justify-content: space-between; align-items: center; margin: 16px 2px 8px; }
.sect-head h2 { margin: 0; font-size: 13px; font-weight: 800; }
.sect-head__btn { display: inline-flex; align-items: center; gap: 4px; border: 0; background: none; padding: 0; font-size: 12px; font-weight: 600; color: #1a5aa8; }
.chips { display: flex; gap: 8px; margin: 0 -14px; padding: 0 14px 2px; overflow-x: auto; scrollbar-width: none; }
.chips::-webkit-scrollbar { display: none; }
.chip { flex: none; display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 16px; border-radius: 12px; border: 1px solid #aeb9cb; background: #fff; color: #334155; font-size: 12.5px; font-weight: 700; }
.chip--on { background: var(--navy); border-color: var(--navy); color: #fff; }

/* Info */
.info { display: flex; gap: 12px; margin-top: 14px; padding: 14px; background: #d6e6fb; border: 1px solid #b6d0f3; border-radius: 14px; }
.info__icon { flex: none; font-size: 24px; color: var(--navy); margin-top: 2px; }
.info b { font-size: 13px; font-weight: 800; color: var(--navy); }
.info p { margin: 4px 0 0; font-size: 12.5px; line-height: 1.5; color: #334155; }

/* Card */
.card { margin-top: 14px; padding: 16px; background: #fff; border: 1px solid var(--line); border-radius: 16px; }
.card--soon { background: #f6f8fb; border: 1.5px dashed #b4bfd0; }
.card__tags { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 12px; font-size: 11.5px; font-weight: 700; }
.pill--amber { background: var(--amber-bg); color: #6b4300; }
.pill--blue { background: #d6e6fb; color: #0b4fa6; }
.pill--blue .dot { width: 7px; height: 7px; }
.pill--gray { background: #e3e7ee; color: #475569; }
.tagkanan { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--muted); }

.card h3 { margin: 12px 0 4px; font-size: 16.5px; font-weight: 800; line-height: 1.35; }
.card--soon h3 { color: #64748b; }
.desc { margin: 0; font-size: 12.5px; color: #475569; line-height: 1.45; }
.desc:empty { display: none; }

.cabang-title { margin: 14px 0 8px; font-size: 11.5px; font-weight: 700; color: #475569; letter-spacing: 0.03em; }
.cabang { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 8px; background: #e6ebf3; color: #334155; font-size: 12px; }
.tag ion-icon { color: #475569; font-size: 14px; }
.bidang { display: flex; align-items: center; margin-top: 12px; }

/* Box tanggal */
.box { margin-top: 14px; padding: 12px; background: #eef1f6; border: 1px solid var(--line); border-radius: 12px; }
.box__row { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; }
.box__row strong { font-size: 14px; font-weight: 800; }
.box__label { display: inline-flex; align-items: center; gap: 8px; color: #334155; }
.box__label ion-icon { font-size: 18px; color: #2a6fd1; }
.box__row--split { margin-top: 8px; }
.box__row--line { margin-top: 10px; padding-top: 10px; border-top: 1px solid #d3dbe8; }
.late { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 8px; background: #fbdcdc; color: var(--red); font-size: 12px; font-weight: 800; }
.kuota { font-size: 12px; font-weight: 600; color: #334155; }
.chip-blue { padding: 4px 12px; border-radius: 8px; background: #d6e6fb; color: #0b4fa6; font-size: 12px; font-weight: 800; }

/* Tombol */
.btn-navy, .btn-outline { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-weight: 800; font-size: 13px; }
.btn-navy { border: 0; background: var(--navy); color: #fff; }
.btn-outline { border: 1.5px solid #aeb9cb; background: #fff; color: var(--navy); }
.btn-navy--lg, .btn-outline--lg { width: 100%; height: 50px; margin-top: 12px; font-size: 14px; }
.btn-navy--lg ion-icon, .btn-outline--lg ion-icon { font-size: 20px; }
.btnrow { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 14px; }
.btnrow button { height: 46px; }
.btnrow--icon { grid-template-columns: 1fr 52px; }
.btn-outline--icon { font-size: 22px; }

/* Coming soon */
.soon-note { margin: 8px 0 0; padding-bottom: 12px; border-bottom: 1px solid #d3dbe8; font-size: 12.5px; line-height: 1.5; color: #64748b; }
.soon-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-top: 10px; }
.soon-foot em { font-size: 11.5px; color: #64748b; }
.btn-remind { flex: none; display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border: 0; border-radius: 10px; background: #dfe3ea; color: #334155; font-size: 12px; font-weight: 800; }

.empty { margin: 20px 0; text-align: center; font-size: 13px; color: var(--muted); }

/* Bantuan */
.help { margin-top: 16px; padding: 16px; border-radius: 16px; background: #e4e9f0; text-align: center; }
.help__icon { display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: #cfdcf2; color: var(--navy); font-size: 22px; }
.help b { display: block; margin-top: 8px; font-size: 13px; }
.help p { margin: 4px 0 0; font-size: 12px; color: #475569; }
</style>