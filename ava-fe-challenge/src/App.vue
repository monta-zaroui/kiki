<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount } from 'vue';

const authStore = useAuthStore();

onBeforeMount(() => authStore.initAuth());
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
