import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue';

import './assets/main.css';
import router from '@/router';

const app = createApp(App);
app.use(Vue3Toasity, {
  position: 'top-right',
  autoClose: 3000,
  multiple: false
});
app.use(createPinia());
app.use(router);

app.mount('#app');
