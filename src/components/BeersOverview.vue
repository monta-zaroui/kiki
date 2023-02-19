<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else-if="error">
    <BaseError />
  </template>

  <template v-else>
    <BaseCard v-for="beer in beers" :key="beer.id" :beer="beer" />
  </template>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBeersStore } from '@/stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseError from '@/components/base/BaseError.vue';
import BaseCard from '@/components/base/BaseCard.vue';

const beersStore = useBeersStore();
const { beers, loading, error } = storeToRefs(beersStore);

onMounted(() => {
  beersStore.fetchBeers();
});
</script>

<style scoped>
</style>
