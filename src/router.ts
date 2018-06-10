import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import NetworkAudio from '@/views/NetworkAudio.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Welcome,
    },
    {
      path: '/network-audio',
      name: 'about',
      component: NetworkAudio,
    },
  ],
});
