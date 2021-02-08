import { RequestsStore, RequestStoreGetters, RootState } from '@/types/interfaces';
import { GetterTree } from 'vuex';

export const getters: GetterTree<RequestsStore, RootState> & RequestStoreGetters = {
  requests(state: RequestsStore, _getters: RequestStoreGetters, _rootState: RootState, rootGetters: any) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req: { coachId: any; }) => req.coachId === coachId);
  },
  hasRequests(_state: RequestsStore, getters: RequestStoreGetters) {
    return getters.requests && !!getters.requests.length;
  },
};
