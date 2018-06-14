import Vue from 'vue';
import Main from './Main.vue';
import loading from './Loading.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Icon from 'vue-svg-icon/Icon.vue';

Vue.component( 'icon', Icon );

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount('#app');

// new Vue({
//   router,
//   store,
//   render: (h) => h(loading),
// }).$mount('#loading');
