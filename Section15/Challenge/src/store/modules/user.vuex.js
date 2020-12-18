export default {
  namespaced: true,
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
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    logout(context) {
      context.commit('logout');
    },
  },
};
