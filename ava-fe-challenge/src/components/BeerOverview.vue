<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else>
    <div class="flex justify-center">
      <div class="p-2 sm:p-4 md:p-6 lg:p-12 flex flex-col flex-start">
        <div class="flex flex-col md:flex-row justify-center items-center md:gap-24 mb-8 md:mb-10">
          <div>
            <img :src="beer.image_url" :alt="beer.name" class="w-20 md:w-24 rounded-lg" />
          </div>
          <BaseCardDetail :beer="beer" />
        </div>
        <MoreInformation class="max-w-3xl" :beer="beer" />
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useBeersStore } from '@/stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';
import BaseCardDetail from '@/components/base/BaseCardDetail.vue';
import MoreInformation from '@/components/MoreInformation.vue';

const beersStore = useBeersStore();
const { beer, loading } = storeToRefs(beersStore);
</script>

<style scoped></style>
