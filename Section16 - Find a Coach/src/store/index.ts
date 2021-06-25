import { createStore } from 'vuex';

import { coachesModule } from './modules/coaches';
import { requestsModule } from './modules/requests';
import { authModule } from './modules/auth';
import { RootState } from '@/types/interfaces';

const state: RootState = {
  root: true,
  version: '1.0',
};

export const store = createStore({
  state,
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});

export default store;
