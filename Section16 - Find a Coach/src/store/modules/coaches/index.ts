import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';
import { Module } from 'vuex';
import {CoachesStore, RootState} from '@/types/interfaces';

export const coachesModule: Module<CoachesStore, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
