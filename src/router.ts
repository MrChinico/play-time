import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import LocalAudio from '@/views/LocalAudio.vue';
import MusicList from '@/views/MusicList.vue';
import NetworkAudio from '@/views/NetworkAudio.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'welcome', component: Welcome,},
    {path: '/local-audio', name: 'local-audio', component: LocalAudio,},
    {path: '/music-list', name: 'music-list', component: MusicList,},
    {path: '/network-audio', name: 'about', component: NetworkAudio,},
    {path: '/network-audio', name: 'about', component: NetworkAudio,},
  ],
});
