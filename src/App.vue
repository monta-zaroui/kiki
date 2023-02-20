<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useBeersStore } from '@/stores/beers';
import { onMounted } from 'vue';

const beersStore = useBeersStore();

onMounted(() => beersStore.fetchBeers());
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
