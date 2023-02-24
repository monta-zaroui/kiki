import { createRouter, createWebHistory } from 'vue-router';
import BeersOverview from '@/components/BeersOverview.vue';
import { useBeersStore } from '@/stores/beers';
import SignInOverview from '@/components/SignInOverview.vue';
import SignUpOverview from '@/components/SignUpOverview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signIn',
      name: 'signIn',
      component: SignInOverview
    },

    {
      path: '/signUp',
      name: 'signUp',
      component: SignUpOverview
    },

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
        await beerStore.fetchBeer(Number(to.params.id));
        if (beerStore.error) next({ name: 'notFound' });
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
