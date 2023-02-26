<template>
  <div class="w-screen p-2 sm:p-4 md:p-6 lg:p-12 flex justify-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10">
      <BaseCard
        v-for="(beer, index) in favorites"
        :key="beer.id"
        :beer="beer"
        :index="index"
        :is-image-on-left="isImageOnTheLeft(index)"
        :screen-width="screenWidth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { useBeersStore } from '@/stores/beers';

const beerStore = useBeersStore();
const { favorites } = storeToRefs(beerStore);

const screenWidth = ref<number>(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const isImageOnTheLeft = (index: number): boolean => index % 4 !== 2 && index % 4 !== 3;
</script>

<style scoped></style>
