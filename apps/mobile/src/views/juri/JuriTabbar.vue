<template>
  <ion-footer class="ion-no-border">
    <nav class="tabs">
      <a
        v-for="t in tabs"
        :key="t.to"
        class="tabs__item"
        :class="{ 'tabs__item--active': route.path === t.to }"
        @click="router.push(t.to)"
      >
        <span class="tabs__icon-wrap">
          <ion-icon class="tabs__icon" :icon="route.path === t.to ? t.iconActive : t.icon" />
          <i v-if="t.dot" class="tabs__dot"></i>
        </span>
        <span class="tabs__label">{{ t.label }}</span>
      </a>
    </nav>
  </ion-footer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { IonFooter, IonIcon } from '@ionic/vue';
import {
  clipboardOutline,
  clipboard,
  playCircleOutline,
  playCircle,
  checkboxOutline,
  checkbox,
  personOutline,
  person,
} from 'ionicons/icons';

const route = useRoute();
const router = useRouter();

const tabs = [
  { label: 'Lomba Tugas', to: '/berandajuri', icon: clipboardOutline, iconActive: clipboard },
  { label: 'Antrean', to: '/juri/antrean', icon: playCircleOutline, iconActive: playCircle, dot: true },
  { label: 'Riwayat', to: '/juri/riwayat', icon: checkboxOutline, iconActive: checkbox },
  { label: 'Profil', to: '/juri/profil', icon: personOutline, iconActive: person },
];
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  padding: 4px 12px env(safe-area-inset-bottom, 0px);
  background: #fff;
  border-top: 1px solid #e0e3e5;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.05);
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.tabs__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 64px;
  padding: 8px 10px;
  border-radius: 14px;
  color: #434652;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.tabs__item:active {
  transform: scale(0.95);
}

.tabs__item--active {
  background: #0d47a1;
  color: #fff;
}

.tabs__icon-wrap {
  position: relative;
  display: flex;
}

.tabs__icon {
  font-size: 24px;
}

.tabs__dot {
  position: absolute;
  top: -2px;
  right: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e5383b;
}

.tabs__label {
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
}

.tabs__item--active .tabs__label {
  font-weight: 700;
}
</style>