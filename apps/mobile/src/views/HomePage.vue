<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ APP_NAME }}</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/about">About</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p v-if="loading">Memuat...</p>
      <p v-if="error" style="color: red">Error: {{ error }} (pastikan API berjalan)</p>
      <ion-list>
        <TodoItem v-for="t in todos" :key="t.id" :todo="t" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonButtons, IonButton,
} from '@ionic/vue';
import { APP_NAME } from '@my-project/shared';
import TodoItem from '@/components/TodoItem.vue';
import { getTodos } from '@/services/api';

const todos = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    todos.value = await getTodos();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>
