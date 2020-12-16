import { createStore } from 'vuex';
import counterModule from './modules/counter.vuex.js';

const store = createStore({
  modules: {
    counter: counterModule,
  },
  state() {
    return {
      loggedIn: false,
    };
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
  mutations: {
    toggleLogin(state) {
      state.loggedIn = !state.loggedIn;
    },
  },
  actions: {
    toggleLogin(context) {
      context.commit('toggleLogin');
    },
  },
});

export default store;
