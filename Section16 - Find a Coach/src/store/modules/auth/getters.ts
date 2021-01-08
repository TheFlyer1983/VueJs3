export default {
  userId(state: AuthStore): string {
    return state.userId;
  },
  token(state: AuthStore): string {
    return state.token;
  },
  isAuthenticated(state: AuthStore): boolean {
    return !!state.token;
  },
  didAutoLogout(state: AuthStore): boolean {
    return state.didAutoLogout;
  },
};
