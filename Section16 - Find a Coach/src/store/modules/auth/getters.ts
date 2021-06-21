import { GetterTree } from 'vuex';
import { AuthModuleState, AuthStoreGetters, RootState } from '@/types/interfaces';

export const getters: GetterTree<AuthModuleState, RootState> & AuthStoreGetters = {
  userId(state: AuthModuleState) {
    return state.userId;
  },
  token(state: AuthModuleState) {
    return state.token;
  },
  isAuthenticated(state: AuthModuleState) {
    return !!state.token;
  },
  didAutoLogout(state: AuthModuleState) {
    return state.didAutoLogout;
  },
};
