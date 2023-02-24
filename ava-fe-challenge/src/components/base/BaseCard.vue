<template>
  <div class="flex">
    <div class="flex rounded-lg shadow-lg w-full p-6 h-80">
      <img
        v-if="isSmallScreen || isScreenMedium"
        class="h-full w-28 rounded-lg"
        :src="image_url"
        :alt="beer.name"
      />
      <div class="p-4 flex flex-col justify-start">
        <h5 class="text-gray-900 text-xl font-medium mb-2">{{ beer.name }}</h5>
        <p class="text-gray-700 text-base mb-4 line-clamp-3">
          {{ beer.description }}
        </p>
        <p class="text-gray-600 text-xs">{{ isSmall }}</p>
      </div>
      <img
        v-if="!isSmallScreen"
        class="w-28 h-full rounded-lg"
        :src="image_url"
        :alt="beer.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Beer } from '@/models/beer.model';
import { screens } from 'tailwindcss/defaultTheme';
import { computed } from 'vue';
const props = defineProps<{
  beer: Beer;
  isImageOnLeft: boolean;
  screenWidth: any;
}>();
const image_url = props.beer.image_url || 'src/assets/beer.jpg';


const isSmallScreen = computed((): boolean => {
  return props.screenWidth <= 640;
});

const isScreenMedium = computed((): boolean => {
  console.log(screens.md);
  return props.screenWidth <= 768 && props.screenWidth > 640;
});
</script>

<style scoped></style>
