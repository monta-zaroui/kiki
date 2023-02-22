<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else>
    <p>{{ beer.name }}</p>
  </template>
</template>

<script setup lang="ts">
import { useBeersStore } from '@/stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const beersStore = useBeersStore();
const { beer, loading } = storeToRefs(beersStore);
</script>

<style scoped></style>
