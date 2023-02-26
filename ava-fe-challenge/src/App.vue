<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBarOverview from '@/components/NavBarOverview.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initAuth();
});
</script>

<template>
  <div id="app">
    <NavBarOverview />
    <RouterView />
  </div>
</template>

<style scoped></style>
