import { ActionTree } from 'vuex';
import { CoachesMutationTypes } from './mutation-types';
import { CoachesActionTypes } from './action-types';
import {
  CoachesStoreActions,
  CoachesStore,
  RootState,
  Coach,
  Coaches,
  LoadCoaches,
} from '@/types/interfaces';

export const actions: ActionTree<CoachesStore, RootState> & CoachesStoreActions = {
  async [CoachesActionTypes.registerCoach]({ commit, rootGetters }, data: Coach) {
    const userId = rootGetters.userId;
    const coachData = {
      firstName: data.firstName,
      lastName: data.lastName,
      description: data.description,
      hourlyRate: data.hourlyRate,
      areas: data.areas,
    };

    const token = rootGetters.token;

    const response = await fetch(
      `https://vue-coach-856d3-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    commit(CoachesMutationTypes.registerCoach, {
      ...coachData,
      id: userId,
    });
  },
  async [CoachesActionTypes.loadCoaches]({ commit, getters}, payload: LoadCoaches): Promise<void> {
    if (!payload.forceRefresh && getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-coach-856d3-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches: Coaches = [];

    for (const key in responseData) {
      const coach: Coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    commit(CoachesMutationTypes.setCoaches, coaches);
    commit(CoachesMutationTypes.setFetchTimestamp);
  },
};
