<template>
  <ion-footer class="ion-no-border">
    <nav class="tabs">
      <a
        v-for="t in tabs"
        :key="t.to"
        class="tabs__item"
        :class="{ 'tabs__item--active': route.path === t.to }"
        @click="() => {
          console.log('Tombol ditekan:', t.to);
          router.push(t.to);
        }"
      >
        <ion-icon class="tabs__icon" :icon="t.icon" />
        <span class="tabs__label">{{ t.label }}</span>
      </a>
    </nav>
  </ion-footer>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { IonFooter, IonIcon } from '@ionic/vue';
import { trophyOutline, peopleOutline, hammerOutline, clipboardOutline, ribbonOutline,} from 'ionicons/icons';

const route = useRoute();
const router = useRouter();

const tabs = [
  { label: 'Lomba', to: '/beranda', icon: trophyOutline },
  { label: 'Peserta', to: '/peserta', icon: peopleOutline },
  { label: 'Juri', to: '/juri', icon: hammerOutline },
  { label: 'Kriteria', to: '/kriteria', icon: clipboardOutline },
  { label: 'Talenta', to: '/talenta', icon: ribbonOutline },
];
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  padding: 4px 16px env(safe-area-inset-bottom, 0px);
  background: #fff;
  border-top: 1px solid #c3c6d4;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.06);
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
}

.tabs__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 10px;
  border-radius: 12px;
  color: #434652;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.tabs__item:active {
  transform: scale(0.95);
}

.tabs__item--active {
  background: #0d47a1;
  color: #a1bbff;
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