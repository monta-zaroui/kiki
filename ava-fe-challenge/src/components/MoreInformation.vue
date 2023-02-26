<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">Tips:</h2>
    <p class="text-gray-600 mb-4">{{ beer.brewers_tips }}</p>
    <p class="text-gray-400 text-xs mb-4">
      {{ beer.tagline }} {{ beer.first_brewed }} By {{ beer.contributed_by }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Beer } from '@/models/beer.model';

defineProps<{
  beer: Beer;
}>();
</script>

<style scoped></style>
