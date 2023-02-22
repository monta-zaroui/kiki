import { defineStore } from 'pinia';
import type { Beer } from '@/models/beer.model';
import axios from 'axios';

const URL = import.meta.env.VITE_PUNKAPI_URL;

export const useBeersStore = defineStore('beers', {
  state: () => ({
    beers: [] as Beer[],
    beer: null as Beer | null,
    pageNumber: 1,
    loading: false,
    loadingMore: false,
    error: null as Error | null
  }),

  actions: {
    async fetchBeers(): Promise<void> {
      this.pageNumber === 1 ? (this.loading = true) : (this.loadingMore = true);
      try {
        console.log('fetching beers 🍻');
        const response = await axios.get<Beer[]>(`${URL}?per_page=10&page=${this.pageNumber}`);
        this.beers.push(...response.data);
      } catch (error) {
        this.error = error as Error;
        // in case of error in the first call
        if (this.pageNumber > 1) this.pageNumber--;
      } finally {
        this.loading = false;
        this.loadingMore = false;
      }
    },
    async fetchBeer(beerId: number): Promise<void> {
      const beer = this.beers.find((beer) => beer.id === beerId);
      if (beer) this.beer = beer;
      this.loading = true;
      try {
        console.log('fetching beer 🍺');
        const response = await axios.get<Beer[]>(`${URL}/${beerId}`);
        this.beer = response.data[0];
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.loading = false;
      }
    }
  }
});
