export default {
  addRequest(state: RequestsStore, payload: Request) {
    state.requests.push(payload);
  },
  setRequests(state: RequestsStore, payload: any) {
    state.requests = payload;
  }
};
