export default {
  userId(state: AuthStore) {
    return state.userId;
  },
  token(state: AuthStore) {
    return state.token;
  },
  isAuthenticated(state: AuthStore): boolean {
    return !!state.token;
  },
  didAutoLogout(state: AuthStore) {
    return state.didAutoLogout;
  },
};
