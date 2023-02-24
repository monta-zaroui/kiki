import { defineStore } from 'pinia';
import axios from 'axios';
import type { User } from '@/models/user.model';

const URL = import.meta.env.VITE_BACKEND_URL + '/users';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    error: null as Error | null
  }),

  actions: {
    async signIn(email: string, password: string): Promise<void> {
      try {
        const response = await axios.post(`${URL}/login`, { email, password });
        if (response.data.token) {
          this.user = response.data.user;
          this.token = response.data.token;
          this.isAuthenticated = true;
          localStorage.setItem('token', response.data.token);
        }
      } catch (error) {
        this.error = error as Error;
      }
    },

    async signUp(username: string, email: string, password: string): Promise<void> {
      try {
        await axios.post(`${URL}/users/create`, { username, email, password });
      } catch (error) {
        this.error = error as Error;
      }
    },

    async signOut(): Promise<void> {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
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
          this.user = response.data.user;
        } catch (error) {
          this.error = error as Error;
        }
      }
    }
  }
});
