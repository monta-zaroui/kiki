<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="w-full md:w-1/2">
          <img :src="beer.image_url" :alt="beer.name" class="w-full mb-8">
          <h1 class="text-3xl font-bold mb-2">{{ beer.name }}</h1>
          <p class="text-gray-500 text-lg mb-4">{{ beer.tagline }}</p>
          <p class="text-gray-600 mb-8">{{ beer.description }}</p>
          <h2 class="text-2xl font-bold mb-2">Brewers Tips:</h2>
          <p class="text-gray-600">{{ beer.brewers_tips }}</p>
        </div>
        <div class="w-full md:w-1/2">
          <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="mb-4">
              <h2 class="text-2xl font-bold mb-2">Beer Details:</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-gray-600 font-bold">ABV:</div>
                <div class="text-gray-600">{{ beer.abv }}%</div>
                <div class="text-gray-600 font-bold">IBU:</div>
                <div class="text-gray-600">{{ beer.ibu }}</div>
                <div class="text-gray-600 font-bold">EBC:</div>
                <div class="text-gray-600">{{ beer.ebc }}</div>
                <div class="text-gray-600 font-bold">SRM:</div>
                <div class="text-gray-600">{{ beer.srm }}</div>
                <div class="text-gray-600 font-bold">PH:</div>
                <div class="text-gray-600">{{ beer.ph }}</div>
              </div>
            </div>
            <div class="mb-4">
              <h2 class="text-2xl font-bold mb-2">Ingredients:</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-gray-600 font-bold">Malt:</div>
                <div>
                  <ul class="list-disc list-inside">
                    <li v-for="malt in beer.ingredients.malt" :key="malt.name">{{ malt.name }} - {{ malt.amount.value }} {{ malt.amount.unit }}</li>
                  </ul>
                </div>
                <div class="text-gray-600 font-bold">Hops:</div>
                <div>
                  <ul class="list-disc list-inside">
                    <li v-for="hop in beer.ingredients.hops" :key="hop.name">{{ hop.name }} - {{ hop.amount.value }} {{ hop.amount.unit }}, {{ hop.add }} {{ hop.attribute }}</li>
                  </ul>
                </div>
                <div class="text-gray-600 font-bold">Yeast:</div>
                <div class="text-gray-600">{{ beer.ingredients.yeast }}</div>
              </div>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-2">Food Pairing:</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-gray-600 font-bold">Recommended Food:</div>
                <div>
                  <ul class="list-disc list-inside">
                    <li v-for="food in beer.food_pairing" :key="food">{{ food }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useBeersStore } from '../stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const beersStore = useBeersStore();
const { beer, loading } = storeToRefs(beersStore);
</script>

<style scoped></style>
