import { defineStore } from 'pinia';
import type { Beer } from '@/models/beer.model';
import axios from 'axios';

const URL = import.meta.env.VITE_PUNKAPI_URL;

export const useBeersStore = defineStore('beers', {
  state: () => ({
    beers: [] as Beer[],
    loading: false,
    error: null as Error | null
  }),

  actions: {
    async fetchBeers(): Promise<void> {
      this.loading = true;
      try {
        console.log('fetching beers');
        const response = await axios.get(URL + '?per_page=10');
        this.beers = response.data;
      } catch (error) {
        this.error = error as Error;
      } finally {
        this.loading = false;
      }
    }
  }
});
