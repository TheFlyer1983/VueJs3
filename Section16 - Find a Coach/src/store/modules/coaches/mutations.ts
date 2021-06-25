import { MutationTree } from 'vuex';
import { CoachesMutationTypes } from './mutation-types';
import { Coach, Coaches, CoachesModuleState, CoachesStoreMutations } from '@/types/interfaces';

export const mutations: MutationTree<CoachesModuleState> & CoachesStoreMutations = {
  [CoachesMutationTypes.registerCoach](state: CoachesModuleState, payload: Coach) {
    state.coaches.push(payload);
  },
  [CoachesMutationTypes.setCoaches](state: CoachesModuleState, payload: Coaches) {
    state.coaches = payload;
  },
  [CoachesMutationTypes.setFetchTimestamp](state: CoachesModuleState) {
    state.lastFetch = new Date().getTime();
  },
};
