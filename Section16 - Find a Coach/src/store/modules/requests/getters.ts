import { RequestsModuleState, RequestStoreGetters, RootState } from '@/types/interfaces';
import { GetterTree } from 'vuex';

export const getters: GetterTree<RequestsModuleState, RootState> & RequestStoreGetters = {
  requests(
    state: RequestsModuleState,
    _getters: RequestStoreGetters,
    _rootState: RootState,
    rootGetters: any
  ) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req: { coachId: any }) => req.coachId === coachId);
  },
  hasRequests(_state: RequestsModuleState, getters: RequestStoreGetters) {
    return getters.requests && !!getters.requests.length;
  },
};
