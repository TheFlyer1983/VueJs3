import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';
import {CoachesModule} from '@/types/interfaces';

export const coachesModule: CoachesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
