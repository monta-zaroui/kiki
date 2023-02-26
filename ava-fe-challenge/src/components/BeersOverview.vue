<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else-if="error">
    <BaseError />
  </template>

  <template v-else>
    <div class="p-2 sm:p-4 md:p-6 lg:p-12 flex justify-center">
      <div ref="scrollComponent" class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 w-full">
        <BaseCard
          v-for="(beer, index) in beers"
          :key="beer.id"
          :beer="beer"
          :index="index"
          :is-image-on-left="isImageOnTheLeft(index)"
          :screen-width="screenWidth"
        />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useBeersStore } from '@/stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseError from '@/components/base/BaseError.vue';
import BaseCard from '@/components/base/BaseCard.vue';

const beersStore = useBeersStore();
const { beers, loading, loadingMore, error } = storeToRefs(beersStore);
const scrollComponent = ref(null);
const screenWidth = ref<number>(window.innerWidth);

onBeforeMount(() => beersStore.fetchBeers());

onMounted(() => {
  window.addEventListener('scroll', handleInfiniteScroll);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleInfiniteScroll);
  window.removeEventListener('resize', handleResize);
});

function onLoadMore() {
  beersStore.pageNumber++;
  console.log('onLoadMore', beersStore.pageNumber);
  beersStore.fetchBeers();
}

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const handleInfiniteScroll = () => {
  const element: any = scrollComponent.value;
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    onLoadMore();
  }
};

const isImageOnTheLeft = (index: number): boolean => index % 4 !== 2 && index % 4 !== 3;
</script>
<style scoped></style>
