export default {
  coaches(state: CoachesStore): Coach[] {
    return state.coaches;
  },
  hasCoaches(state: CoachesStore) {
    return state.coaches && state.coaches.length;
  },
  isCoach(state: CoachesStore, getters: any, rootState: any, rootGetters: any): boolean {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach: { id: string; }) => coach.id === userId);
  },
  shouldUpdate(state: CoachesStore): boolean {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
