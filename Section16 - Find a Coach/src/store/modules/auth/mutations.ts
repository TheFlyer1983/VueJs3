import { MutationTree } from 'vuex';
import { AuthModuleState, AuthStoreMutations, SetUser } from '@/types/interfaces';
import { AuthMutationTypes } from './mutation-types';

export const mutations: MutationTree<AuthModuleState> & AuthStoreMutations = {
  [AuthMutationTypes.setUser](state: AuthModuleState, payload: SetUser) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  [AuthMutationTypes.setAutoLogout](state: AuthModuleState) {
    state.didAutoLogout = true;
  },
};
