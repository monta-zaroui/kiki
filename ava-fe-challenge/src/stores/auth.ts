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
        this.error = error as Error;
        return false;
      }
    },

    async signUp(username: string, email: string, password: string): Promise<boolean | undefined> {
      try {
        await axios.post(URL, { username, email, password });
        return await this.signIn(email, password);
      } catch (error) {
        this.error = error as Error;
        return false;
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
          console.log(response.data);
          this.user = response.data;
          if (this.user) {
            this.isAuthenticated = true;
          }
        } catch (error) {
          console.log(error);
          this.error = error as Error;
          this.isAuthenticated = false;
        }
      }
    }
  }
});
