import { GetterTree } from "vuex";
import { AuthStore, AuthStoreGetters, RootState } from "@/types/interfaces";

export const getters: GetterTree<AuthStore, RootState> & AuthStoreGetters = {
  userId(state: AuthStore) {
    return state.userId;
  },
  token(state: AuthStore) {
    return state.token;
  },
  isAuthenticated(state: AuthStore) {
    return !!state.token;
  },
  didAutoLogout(state: AuthStore) {
    return state.didAutoLogout;
  },
};
