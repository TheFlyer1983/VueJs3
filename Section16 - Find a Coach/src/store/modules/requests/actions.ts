import { ActionTree } from 'vuex';
import { RequestsStore, RequestStoreActions, RootState } from '@/types/interfaces';
import { RequestActionTypes } from './action-types';
import { RequestsMutationTypes } from './mutation-types';

export const actions: ActionTree<RequestsStore, RootState> & RequestStoreActions = {
  async [RequestActionTypes.contactCoach]({ commit }, payload: any) {
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

    commit(RequestsMutationTypes.addRequest, request);
  },
  async [RequestActionTypes.fetchRequests]({ commit, rootGetters }) {
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
    commit(RequestsMutationTypes.setRequests, requests);
  },
};
