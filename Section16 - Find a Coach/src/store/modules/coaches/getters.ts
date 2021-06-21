import { Coaches, CoachesModuleState, CoachesStoreGetters, RootState } from '@/types/interfaces';
import { GetterTree } from 'vuex';

export const getters: GetterTree<CoachesModuleState, RootState> & CoachesStoreGetters = {
  coaches(state: CoachesModuleState): Coaches {
    return state.coaches;
  },
  hasCoaches(state: CoachesModuleState): boolean {
    return state.coaches && !!state.coaches.length;
  },
  isCoach(
    _state: CoachesModuleState,
    getters: any,
    _rootState: RootState,
    rootGetters: any
  ): boolean {
    const coaches: Coaches= getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach: { id: string }) => coach.id === userId);
  },
  shouldUpdate(state: CoachesModuleState): boolean {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
