import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录用户信息
  },
  mutations: {
    setUser (state, info) {
      state.user = JSON.parse(info);
      window.localStorage.setItem('user', info);
    }
  },
  actions: {
  },
  modules: {
  }
});
