<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else-if="error">
    <BaseError />
  </template>

  <template v-else>
    <div ref="scrollComponent">
      <RouterLink to="/beer/11"> (test) Go to Beer 11</RouterLink>
      <BaseCard v-for="beer in beers" :key="beer.id" :beer="beer" />
      <BaseSpinner v-if="loadingMore" />
    </div>
  </template>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useBeersStore } from '../stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseError from '@/components/base/BaseError.vue';
import BaseCard from '@/components/base/BaseCard.vue';

const beersStore = useBeersStore();
const { beers, loading, loadingMore, error } = storeToRefs(beersStore);
const scrollComponent = ref(null);

onBeforeMount(() => beersStore.fetchBeers());

onMounted(() => {
  window.addEventListener('scroll', handleInfiniteScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleInfiniteScroll);
});

function onLoadMore() {
  beersStore.pageNumber++;
  console.log('onLoadMore', beersStore.pageNumber);
  beersStore.fetchBeers();
}

const handleInfiniteScroll = () => {
  const element: any = scrollComponent.value;
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    onLoadMore();
  }
};
</script>

<style scoped></style>
