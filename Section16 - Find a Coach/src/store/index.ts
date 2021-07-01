import { createStore } from 'vuex';

import { coachesModule } from './modules/coaches';
import { requestsModule } from './modules/requests';
import { authModule } from './modules/auth';
import { RootState } from '@/store/rootTypes';

export default createStore<RootState>({
  state: {},
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});
