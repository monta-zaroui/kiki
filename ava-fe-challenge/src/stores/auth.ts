import { defineStore } from 'pinia';
import axios from 'axios';
import type { User } from '@/models/user.model';

const URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    error: null as Error | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async signIn(email: string, password: string): Promise<void> {
      try {
        const response = await axios.post(`${URL}/user/signIn`, { email, password });
        if (response.data.token) {
          this.user = response.data.user;
          this.token = response.data.token;
          localStorage.setItem('token', response.data.token);
        }
      } catch (error) {
        this.error = error as Error;
      }
    },

    async signUp(username: string, email: string, password: string): Promise<void> {
      try {
        await axios.post(`${URL}/user/signUp`, { username, email, password });
      } catch (error) {
        this.error = error as Error;
      }
    },

    async signOut(): Promise<void> {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },

    async initAuth(): Promise<void> {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${URL}/user`, {
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
