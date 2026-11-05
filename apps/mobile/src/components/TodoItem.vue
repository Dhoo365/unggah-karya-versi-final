<template>
  <ion-item>
    <ion-label>{{ todo.title }}</ion-label>
  </ion-item>
</template>

<script setup>
import { IonItem, IonLabel } from '@ionic/vue';
defineProps({ todo: { type: Object, required: true } });
</script>
