<template>
  <div class="flex">
    <div class="flex rounded-lg shadow-lg w-full p-6 h-80">
      <img v-if="displayImageOnLeft" class="h-full w-28 rounded-lg" :src="image_url" :alt="beer.name" />
      <div class="p-4 flex flex-col justify-start">
        <h5 class="text-gray-900 text-xl font-medium mb-2">{{ beer.name }}</h5>
        <p class="text-gray-700 text-base mb-4 line-clamp-3">
          {{ beer.description }}
        </p>
        <p class="text-gray-600 text-xs">{{ screenWidth }}</p>
      </div>
      <img
        v-if="!displayImageOnLeft && !iSSmallScreen"
        class="w-28 h-full rounded-lg"
        :src="image_url"
        :alt="beer.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Beer } from '@/models/beer.model';
import { computed } from 'vue';

const props = defineProps<{
  beer: Beer;
  isImageOnLeft: boolean;
  screenWidth: number;
  index: number;
}>();
const image_url = props.beer.image_url || 'src/assets/beer.jpg';

const displayImageOnLeft = computed((): boolean => {
  if (iSSmallScreen.value) {
    return true;
  } else if (props.screenWidth >= 768 && props.isImageOnLeft) {
    return true;
  } else return props.screenWidth > 640 && props.screenWidth < 768 && props.index % 2 === 0;
});

const iSSmallScreen = computed((): boolean => {
  return props.screenWidth <= 640;
});
</script>

<style scoped></style>
