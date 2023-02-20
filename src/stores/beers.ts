import { defineStore } from 'pinia';
import type { Beer } from '@/models/beer.model';
import axios from 'axios';

const URL = import.meta.env.VITE_PUNKAPI_URL;

export const useBeersStore = defineStore('beers', {
  state: () => ({
    beers: [] as Beer[],
    pageNumber: 1,
    loading: false,
    loadingMore: false,
    error: null as Error | null
  }),

  actions: {
    async fetchBeers(): Promise<void> {
      this.pageNumber === 1 ? (this.loading = true) : (this.loadingMore = true);
      try {
        console.log('fetching beers 🍺');
        const response = await axios.get(`${URL}?per_page=10&page=${this.pageNumber}`);
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
    async addBeer(beerId: number): Promise<void> {
      const beer = this.beers.find((beer) => beer.id === beerId);
      if (beer) return;
      this.loading = true;
      try {
        console.log('fetching beer 🍺');
        const response = await axios.get(`${URL}/${beerId}`);
        this.beers.push(...response.data);
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.loading = false;
      }
    }
  }
});
