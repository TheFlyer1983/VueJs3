import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';
import { Module } from 'vuex';
import { RequestsStore, RootState } from '@/types/interfaces';

export const requestsModule: Module<RequestsStore, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
