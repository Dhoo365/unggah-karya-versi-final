<template>
  <ion-page>
    <ion-content :fullscreen="true" class="onb-content">
      <div class="onb">
        <header class="onb__header">
          <div class="brand">
            <svg class="brand__logo" viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 36 L20 8 L26 20 L18 36 Z" fill="#1d4f9c" />
              <path d="M18 36 L26 20 L34 36 Z" fill="#2f7be0" />
              <path d="M22 6 L32 4 L28 14 Z" fill="#f5b800" />
              <circle cx="30" cy="22" r="3" fill="#f5b800" />
            </svg>
            <div class="brand__text">
              <strong>SIKARYA</strong>
              <span>Moti Versteppen</span>
            </div>
          </div>
          <button class="skip" type="button" @click="skip">Lewati</button>
        </header>

        <section class="hero">
          <img class="hero__img" :src="slide.image" :alt="slide.imageAlt" />
          <div class="hero__shade"></div>

          <span class="pill pill--dark">
            <ion-icon :icon="schoolOutline" />
            {{ slide.level }}
          </span>

          <span class="hero__meta hero__meta--left">
            <ion-icon :icon="locationOutline" />
            {{ slide.location }}
          </span>
          <span class="hero__meta hero__meta--right">{{ slide.season }}</span>
        </section>

        <ul class="chips">
          <li v-for="c in slide.competitions" :key="c.label" class="chip">
            <ion-icon :icon="c.icon" />
            <span>{{ c.label }}</span>
          </li>
        </ul>

        <section class="copy">
          <span class="step">
            <ion-icon :icon="flagOutline" />
            Langkah {{ current }} dari {{ total }} • {{ slide.step }}
          </span>
          <h1 class="copy__title">
            {{ slide.title }}
            <span>{{ slide.titleAccent }}</span>
          </h1>
          <p class="copy__desc">{{ slide.description }}</p>
        </section>

        <div class="features">
          <div v-for="f in slide.features" :key="f.title" class="feature">
            <ion-icon :icon="f.icon" :class="f.iconClass" />
            <div>
              <strong>{{ f.title }}</strong>
              <span>{{ f.subtitle }}</span>
            </div>
          </div>
        </div>

        <div class="dots" role="tablist" aria-label="Halaman pengenalan">
          <span
            v-for="n in total"
            :key="n"
            class="dots__item"
            :class="{ 'dots__item--active': n === current }"
          />
        </div>

        <button class="cta" type="button" @click="next">
          Lanjut ({{ current }}/{{ total }})
          <ion-icon :icon="arrowForwardOutline" />
        </button>

        <footer class="onb__footer">
          <ion-icon :icon="businessOutline" />
          Dinas Pendidikan Daerah Provinsi Sulawesi Utara
        </footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import {
  schoolOutline,
  locationOutline,
  flagOutline,
  arrowForwardOutline,
  businessOutline,
  checkmarkCircle,
  documentTextOutline,
  musicalNotesOutline,
  footballOutline,
  flaskOutline,
  carSportOutline,
} from 'ionicons/icons';

const router = useRouter();

const slides = [
  {
    image: '/assets/onboarding/slide-1.jpg',
    imageAlt: 'Siswa di puncak gunung Sulawesi Utara',
    level: 'Jenjang SMA • SMK',
    location: '15 kab / Kota Sulawesi Utara',
    season: '2026/2027',
    competitions: [
      { label: 'FLS3N', icon: musicalNotesOutline },
      { label: 'O2SN', icon: footballOutline },
      { label: 'JURDOL', icon: flaskOutline },
      { label: 'DRAG RACE', icon: carSportOutline },
    ],
    step: 'Temukan Kompetisi',
    title: 'Panggung Talenta Pelajar',
    titleAccent: 'Sulawesi Utara',
    description:
      'Jelajahi puluhan cabang lomba seni, teknologi, sains, dan vokasi tingkat daerah hingga nasional secara resmi dan terpadu.',
    features: [
      { title: 'Sinkron Dapodik', subtitle: 'Validasi NISN Instan', icon: checkmarkCircle, iconClass: 'ico-check' },
      { title: 'Juknis Resmi', subtitle: 'Panduan Terbuka', icon: documentTextOutline, iconClass: 'ico-doc' },
    ],
  },
];

const total = 3;
const index = ref(0);
const current = computed(() => index.value + 1);
const slide = computed(() => slides[Math.min(index.value, slides.length - 1)]);

function next() {
  if (index.value < total - 1) index.value += 1;
  else router.replace('/login');
}
function skip() {
  router.replace('/onboarding2');
}
</script>

<style scoped>
.onb-content {
  --background: #dfeaf7;
}

.onb {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: calc(env(safe-area-inset-top, 0px) + 14px) 20px
    calc(env(safe-area-inset-bottom, 0px) + 14px);
  background: linear-gradient(180deg, #eaf3fc 0%, #e3eefa 100%);
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

.onb__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand__logo {
  width: 34px;
  height: 34px;
}
.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.brand__text strong {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.3px;
}
.brand__text span {
  font-size: 11px;
  color: #334155;
}
.skip {
  background: none;
  border: 0;
  padding: 4px 0;
  font-size: 11px;
  font-weight: 600;
  color: #1d4f9c;
}

.hero {
  position: relative;
  height: 236px;
  border-radius: 16px;
  overflow: hidden;
  background: #8fa9c4;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.55);
  margin: 0 4px;
}
.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hero__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.55) 100%);
}
.pill {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 9px;
  font-weight: 600;
}
.pill--dark {
  background: rgba(15, 23, 42, 0.78);
  color: #fff;
  backdrop-filter: blur(4px);
}
.hero__meta {
  position: absolute;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 8.5px;
  font-weight: 600;
  color: #fff;
}
.hero__meta--left {
  left: 10px;
}
.hero__meta--right {
  right: 10px;
}

.chips {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0;
  margin: 12px 4px 0;
}
.chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 7px 2px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 8.5px;
  font-weight: 800;
  color: #334155;
}
.chip ion-icon {
  font-size: 15px;
  color: #475569;
}

.copy {
  margin-top: 16px;
}
.step {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border-radius: 6px;
  background: #cfe0f5;
  font-size: 9px;
  font-weight: 600;
  color: #1d4f9c;
}
.copy__title {
  margin: 10px 0 0;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 800;
  color: #0b1220;
}
.copy__title span {
  display: block;
  color: #1d4f9c;
}
.copy__desc {
  margin: 8px 0 0;
  font-size: 11.5px;
  line-height: 1.55;
  color: #475569;
}

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 14px;
}
.feature {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
}
.feature ion-icon {
  font-size: 18px;
  flex-shrink: 0;
}
.ico-check {
  color: #1d4f9c;
}
.ico-doc {
  color: #475569;
}
.feature strong {
  display: block;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.2;
}
.feature span {
  display: block;
  font-size: 8.5px;
  color: #64748b;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin: 18px 0 14px;
}
.dots__item {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #aab6c4;
  transition: width 0.25s ease, background 0.25s ease;
}
.dots__item--active {
  width: 30px;
  background: #0b4a8f;
}

.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 46px;
  border: 0;
  border-radius: 12px;
  background: #0b4a8f;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(11, 74, 143, 0.28);
}
.cta:active {
  transform: scale(0.98);
}
.cta:focus-visible,
.skip:focus-visible {
  outline: 2px solid #2f7be0;
  outline-offset: 2px;
}

.onb__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 12px;
  font-size: 9px;
  color: #475569;
}
</style>