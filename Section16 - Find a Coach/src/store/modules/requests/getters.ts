export default {
  requests(state: RequestsStore, getters: any, rootState: any, rootGetters: any) {
    const coachId = rootGetters.userId;
    return state.requests.filter(req => req.coachId === coachId);
  },
  hasRequests(state: any, getters: any) {
    return getters.requests && getters.requests.length;
  }
}