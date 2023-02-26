<template>
  <div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <div class="flex gap-2">
            {{ beer.name }}
            <StarIconSolid
              v-if="isFavorite(beer.id)"
              class="h-5 w-5 text-yellow-400 cursor-pointer"
              @click="setFavorites('remove')"
            />
            <StarIconOutline v-else class="h-5 w-5 text-yellow-400 cursor-pointer" @click="setFavorites('add')" />
          </div>
          <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">{{ beer.description }}</p>
        </caption>
        <caption class="pl-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            <strong>ABV:</strong> {{ beer.abv }}% | <strong>Ph:</strong> {{ beer.ph }}% | <strong>Ibu:</strong>
            {{ beer.ibu }} <strong>Volume:</strong> {{ beer.volume.value }} {{ beer.volume.unit }}
          </p>
        </caption>
        <caption
          class="mt-8 pl-5 pr-5 pb-3 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800 hover:cursor-pointer"
        >
          <div style="display: flex; justify-content: space-between; text-align: center">
            <div v-for="item in reactiveItemDetail" :key="item.title"  class="w-full" :class="[item.value ? 'bg-indigo-400 text-white rounded-lg' : '']" @click="selectHeader(item)">
              {{ item.title }}
            </div>
          </div>
        </caption>
<!--        TODO: Add ingredients table-->
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Malt</th>
            <th scope="col" class="px-6 py-3">Hops</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <ul>
                <li v-for="malt in beer.ingredients.malt" :key="malt.name">
                  <strong>{{ malt.name }}:</strong> {{ malt.amount.value }} {{ malt.amount.unit }}
                </li>
              </ul>
            </th>
            <td class="px-6 py-4">
              <ul>
                <li v-for="hops in beer.ingredients.hops" :key="hops.name">
                  <strong>{{ hops.name }}:</strong> {{ hops.amount.value }} {{ hops.amount.unit }} | {{ hops.add }} |
                  {{ hops.attribute }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Beer } from '@/models/beer.model';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
const authStore = useAuthStore();

interface ItemDetail {
  title: string;
  value: boolean;
}
const itemsDetail: ItemDetail[] = [
  {
    title: 'Ingredients',
    value: true
  },
  {
    title: 'Hops',
    value: false
  },
  {
    title: 'Yeast',
    value: false
  }
];
const reactiveItemDetail = ref(itemsDetail);

const props = defineProps<{
  beer: Beer;
}>();

const isFavorite = (beerId: number) => authStore.user?.favoriteBeers.includes(beerId);
const setFavorites = async (action: string) => await authStore.updateFavoriteBeers(props.beer.id, action);
const selectHeader = (item: any) => {
  reactiveItemDetail.value.forEach((element) => {
    element.value = element.title === item.title;
  });
};
</script>
<style scoped></style>
