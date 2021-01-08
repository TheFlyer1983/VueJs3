export default {
  registerCoach(state: any, payload: any) {
    state.coaches.push(payload);
  },
  setCoaches(state: any, payload: any) {
    state.coaches = payload;
  },
  setFetchTimestamp(state: CoachesStore) {
    state.lastFetch = new Date().getTime();
  },
};
