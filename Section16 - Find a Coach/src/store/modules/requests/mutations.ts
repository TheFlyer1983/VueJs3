import { MutationTree } from 'vuex';
import { RequestsMutationTypes } from './mutation-types';
import { Request, Requests, RequestsStore, RequestsStoreMutations } from '@/types/interfaces';

export const mutations: MutationTree<RequestsStore> & RequestsStoreMutations = {
  [RequestsMutationTypes.addRequest](state: RequestsStore, payload: Request) {
    state.requests.push(payload);
  },
  [RequestsMutationTypes.setRequests](state: RequestsStore, payload: Requests) {
    state.requests = payload;
  },
};
