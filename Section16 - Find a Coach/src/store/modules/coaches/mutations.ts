import { MutationTree } from 'vuex';
import { CoachesMutationTypes } from './mutation-types'
import { Coach, Coaches, CoachesStore, CoachesStoreMutations } from '@/types/interfaces';

export const mutations: MutationTree<CoachesStore> & CoachesStoreMutations = {
  [CoachesMutationTypes.registerCoach](state: CoachesStore, payload: Coach) {
    state.coaches.push(payload);
  },
  [CoachesMutationTypes.setCoaches](state: CoachesStore, payload: Coaches) {
    state.coaches = payload;
  },
  [CoachesMutationTypes.setFetchTimestamp](state: CoachesStore) {
    state.lastFetch = new Date().getTime();
  },
};
