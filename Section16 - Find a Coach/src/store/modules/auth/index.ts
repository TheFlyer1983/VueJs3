import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';
import { AuthModule } from '@/types/interfaces';

export const authModule: AuthModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
