import { createRouter, createWebHistory } from 'vue-router';
import BeersOverview from '@/components/BeersOverview.vue';
import { useBeersStore } from '@/stores/beers';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beers',
      component: BeersOverview
    },

    {
      path: '/beer/:id',
      name: 'beer',
      component: () => import('@/components/BeerOverview.vue'),
      props: true,
      beforeEnter: async (to, from, next) => {
        const beerStore = useBeersStore();
        await beerStore.addBeer(Number(to.params.id));
        if (beerStore.error) next({ name: 'notFound' });
        console.log('beerStore.beers', beerStore.beers.length);
        console.log(beerStore.beers);
        next();
      }
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/components/base/BaseError.vue')
    }
  ]
});

export default router;
