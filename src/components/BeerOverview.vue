<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else>
    <p>{{ beer.name }}</p>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBeersStore } from '@/stores/beers';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const beersStore = useBeersStore();
const { beers, loading } = storeToRefs(beersStore);

const route = useRoute();

const beer = computed(() => {
  return beers.value.find((beer) => beer.id === Number(route.params.id));
});
</script>

<style scoped></style>
