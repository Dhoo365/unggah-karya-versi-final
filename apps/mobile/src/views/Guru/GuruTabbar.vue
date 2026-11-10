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
        <ion-icon class="tabs__icon" :icon="route.path === t.to ? t.iconActive : t.icon" />
        <span class="tabs__label">{{ t.label }}</span>
      </a>
    </nav>
  </ion-footer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { IonFooter, IonIcon } from '@ionic/vue';
import {
  homeOutline,
  home,
  folderOpenOutline,
  folderOpen,
  checkboxOutline,
  checkbox,
  personCircleOutline,
  personCircle,
} from 'ionicons/icons';

const route = useRoute();
const router = useRouter();

const tabs = [
  { label: 'Beranda', to: '/guru/beranda', icon: homeOutline, iconActive: home },
  { label: 'Karya Saya', to: '/guru/karya', icon: folderOpenOutline, iconActive: folderOpen },
  { label: 'Penilaian', to: '/guru/penilaian', icon: checkboxOutline, iconActive: checkbox },
  { label: 'Profil', to: '/guru/profil', icon: personCircleOutline, iconActive: personCircle },
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
  padding: 8px 12px;
  border-radius: 999px;
  color: #434652;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.tabs__item:active {
  transform: scale(0.95);
}

.tabs__item--active {
  min-width: 76px;
  padding: 14px 20px;
  background: #8fcbff;
  color: #001d32;
}

.tabs__icon {
  font-size: 24px;
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