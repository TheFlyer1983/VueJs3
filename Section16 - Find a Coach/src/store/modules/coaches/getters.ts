import { Coaches, CoachesStore, CoachesStoreGetters, RootState } from '@/types/interfaces';
import { GetterTree } from 'vuex';

export const getters: GetterTree<CoachesStore, RootState> & CoachesStoreGetters = {
  coaches(state: CoachesStore) {
    return state.coaches;
  },
  hasCoaches(state: CoachesStore) {
    return state.coaches && !!state.coaches.length;
  },
  isCoach(
    state: CoachesStore,
    getters: CoachesStoreGetters,
    rootState: RootState,
    rootGetters: any
   ) {
    console.log('rootGetters', rootGetters, typeof rootGetters);
    console.log('getters', getters, typeof getters);
    console.log('rootState', rootState, typeof rootState);
    const coaches: Coaches = getters.coaches;
    console.log(typeof coaches)
    const userId = rootGetters.userId;
    return coaches.some((coach: { id: string }) => coach.id === userId);
  },
  shouldUpdate(state: CoachesStore) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
