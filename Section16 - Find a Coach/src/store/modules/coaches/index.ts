import { CoachesModule, CoachesModuleState, CoachesActionContext, CoachesGetters, CoachesMutations, CoachesActions,  Coaches, Coach, LoadCoaches } from './types';
import { RootState } from '@/store/rootTypes'

export const state: CoachesModuleState = {
  lastFetch: null,
  coaches: [],
};

export const mutations = {
  [CoachesMutations.registerCoach](state: CoachesModuleState, payload: Coach) {
    state.coaches.push(payload);
  },
  [CoachesMutations.setCoaches](state: CoachesModuleState, payload: Coaches) {
    state.coaches = payload;
  },
  [CoachesMutations.setFetchTimestamp](state: CoachesModuleState) {
    state.lastFetch = new Date().getTime();
  },
};

export const actions = {
  async [CoachesActions.registerCoach](
    { commit, rootGetters }: CoachesActionContext,
    data: Coach
  ) {
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

    commit(CoachesMutations.registerCoach, {
      ...coachData,
      id: userId,
    });
  },
  async [CoachesActions.loadCoaches](
    { commit, getters }: CoachesActionContext,
    payload: LoadCoaches
  ): Promise<void> {
    if (!payload.forceRefresh && getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vue-coach-856d3-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

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

    commit(CoachesMutations.setCoaches, coaches);
    commit(CoachesMutations.setFetchTimestamp);
  },
};

export const getters = {
  [CoachesGetters.coaches](state: CoachesModuleState): CoachesModuleState['coaches'] {
    return state.coaches;
  },
  [CoachesGetters.hasCoaches](state: CoachesModuleState): boolean {
    return state.coaches && !!state.coaches.length;
  },
  [CoachesGetters.isCoach](
    _state: CoachesModuleState,
    getters: any,
    _rootState: RootState,
    rootGetters: any
  ): boolean {
    const coaches: Coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach: { id: string }) => coach.id === userId);
  },
  [CoachesGetters.shouldUpdate](state: CoachesModuleState): boolean {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};

export const coachesModule: CoachesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
