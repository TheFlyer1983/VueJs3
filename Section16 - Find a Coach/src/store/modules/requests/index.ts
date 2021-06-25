import { RequestsModule, RequestsModuleState, RequestsActionContext,RequestStoreGetters, RequestGetters, RequestsMutations, RequestActions, Request, Requests } from './types';
import { RootState } from '@/store/rootTypes'

export const state: RequestsModuleState = {
  requests: [],
};

export const mutations = {
  [RequestsMutations.addRequest](state: RequestsModuleState, payload: Request) {
    state.requests.push(payload);
  },
  [RequestsMutations.setRequests](state: RequestsModuleState, payload: Requests) {
    state.requests = payload;
  },
};

export const actions = {
  async [RequestActions.contactCoach]({ commit }: RequestsActionContext, payload: any) {
    const newRequest = {
      message: payload.message,
      userEmail: payload.email,
    };
    const response = await fetch(
      `https://vue-coach-856d3-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.');
      throw error;
    }
    const request = {
      id: responseData.name,
      coachId: payload.coachId,
      ...newRequest,
    };
    // newRequest.id = responseData.name;
    // newRequest.coachId = payload.coachId;

    commit(RequestsMutations.addRequest, request);
  },
  async [RequestActions.fetchRequests]({ commit, rootGetters }: RequestsActionContext) {
    const coachId = rootGetters.userId;
    const token = rootGetters.token;
    const response = await fetch(
      `https://vue-coach-856d3-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.');
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    // console.log(requests)
    commit(RequestsMutations.setRequests, requests);
  },
};


export const getters = {
  [RequestGetters.requests](
    state: RequestsModuleState,
    _getters: RequestStoreGetters,
    _rootState: RootState,
    rootGetters: any
  ): RequestsModuleState['requests'] {
    const coachId = rootGetters.userId;
    return state.requests.filter((req: { coachId: any }) => req.coachId === coachId);
  },
  [RequestGetters.hasRequests](_state: RequestsModuleState, getters: RequestStoreGetters) {
    return getters.requests && !!getters.requests.length;
  },
};

export const requestsModule: RequestsModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
