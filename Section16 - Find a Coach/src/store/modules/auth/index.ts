import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';
import { state } from './state';
import { Module } from 'vuex';
import { AuthStore, RootState } from '@/types/interfaces';

export const authModule: Module<AuthStore, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
