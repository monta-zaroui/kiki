<template>
  <div class="flex">
    <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
      <img
        class="w-125 h-20 md:h-auto object-cover md:w-20 rounded-t-lg md:rounded-none md:rounded-l-lg"
        :src="image_url"
        alt="Image of beer"
      />
      <div class="p-6 flex flex-col justify-start">
        <h5 class="text-gray-900 text-xl font-medium mb-2">{{ beer.name }}</h5>
        <p class="text-gray-700 text-base mb-4">
          {{ beer.description }}
        </p>
        <p class="text-gray-600 text-xs">{{ beer.contributed_by }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Beer } from '@/models/beer.model';

const props = defineProps<{
  beer: Beer;
}>();

const image_url = props.beer.image_url || 'src/assets/beer.jpg';
</script>

<style scoped></style>
