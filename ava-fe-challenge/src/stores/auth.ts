import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
import type { User } from '@/models/user.model';

const URL = import.meta.env.VITE_BACKEND_URL + '/users';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    error: null as AxiosError | null
  }),

  actions: {
    async signIn(email: string, password: string): Promise<boolean | undefined> {
      try {
        const response = await axios.post(`${URL}/login`, { email, password });
        if (response.data.token) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('token', response.data.token);
          return true;
        }
      } catch (error) {
        this.error = error as AxiosError;
        return false;
      }
    },

    async signUp(username: string, email: string, password: string): Promise<boolean | undefined> {
      try {
        await axios.post(URL, { username, email, password });
        return await this.signIn(email, password);
      } catch (error: any) {
        this.error = error.response.data;
        return false;
      }
    },

    async signOut(): Promise<void> {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      this.error = null;
      localStorage.removeItem('token');
    },

    async initAuth(): Promise<void> {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${URL}/token`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.user = response.data;
          if (this.user) {
            this.isAuthenticated = true;
          }
        } catch (error) {
          this.error = error as AxiosError;
          this.isAuthenticated = false;
        }
      }
    },

    async updateFavoriteBeers(beerId: number, action: string): Promise<void> {
      if (this.isAuthenticated)
        try {
          if (action === 'add') this.user!.favoriteBeers.push(beerId);
          else this.user!.favoriteBeers = this.user!.favoriteBeers.filter((id) => id !== beerId);
          await axios.patch(
            `${URL}/beers/favorites`,
            { favoriteBeers: this.user!.favoriteBeers },
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          );
        } catch (error) {
          this.error = error as AxiosError;
        }
    }
  }
});
