import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';
import { RequestsModule } from '@/types/interfaces';

export const requestsModule: RequestsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
