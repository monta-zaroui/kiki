<template>
  <template v-if="loading">
    <BaseSpinner />
  </template>

  <template v-else>
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="w-full md:w-1/2">
          <img :src="beer.image_url" :alt="beer.name" class="h-full w-45 rounded-lg">
          <p class="text-gray-500 text-lg mb-4">{{ beer.tagline }} {{beer.first_brewed}} By {{beer.contributed_by}}</p>
          <h2 class="text-2xl font-bold mb-2">Tips:</h2>
          <p class="text-gray-600">{{ beer.brewers_tips }}</p>
        </div>
        <div class="w-full md:w-1/2">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {{beer.name}}
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{{ beer.description }}</p>
              </caption>
              <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400"><strong>ABV:</strong> {{ beer.abv }}% | <strong>Ph:</strong> {{ beer.ph }}% | <strong>Ibu:</strong> {{ beer.ibu }} <strong>Volume:</strong> {{ beer.volume.value}} {{beer.volume.unit}}</p>
                <p>Ingredients</p>
              </caption>
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Malt
                </th>
                <th scope="col" class="px-6 py-3">
                  Hops
                </th>
              </tr>
              </thead>
              <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <ul>
                    <li v-for="malt in beer.ingredients.malt" :key="malt.name">
                      <strong>{{malt.name}}:</strong> {{malt.amount.value}} {{malt.amount.unit}}
                    </li>
                  </ul>
                </th>
                <td class="px-6 py-4">
                  <ul>
                    <li v-for="hops in beer.ingredients.hops" :key="hops.name">
                      <strong>{{hops.name}}:</strong> {{hops.amount.value}} {{hops.amount.unit}} | {{hops.add}} | {{hops.attribute}}
                    </li>
                  </ul>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useBeersStore } from '@/stores/beers';
import { storeToRefs } from 'pinia';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const beersStore = useBeersStore();
const { beer, loading } = storeToRefs(beersStore);
</script>

<style scoped></style>
