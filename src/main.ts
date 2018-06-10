import Vue from 'vue';
import Main from './Main.vue';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount('#app');
