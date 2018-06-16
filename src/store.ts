import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseInfo: {
      appName: 'PlayTime',
    },
    musicList: [],
  },
  mutations: {
    musicListUpdate( state, musicList ) {
      state.musicList = musicList;
    },
  },
  actions: {

  },
});
