import { MutationTree } from 'vuex';
import { RequestsMutationTypes } from './mutation-types';
import { Request, Requests, RequestsModuleState, RequestsStoreMutations } from '@/types/interfaces';

export const mutations: MutationTree<RequestsModuleState> & RequestsStoreMutations = {
  [RequestsMutationTypes.addRequest](state: RequestsModuleState, payload: Request) {
    state.requests.push(payload);
  },
  [RequestsMutationTypes.setRequests](state: RequestsModuleState, payload: Requests) {
    state.requests = payload;
  },
};
