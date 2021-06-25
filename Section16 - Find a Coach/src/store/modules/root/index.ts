import { Module, ModuleTree } from 'vuex';
import { RootState } from '@/types/interfaces';
// import { authModule } from '@/store/modules/auth';
import { coachesModule } from '@/store/modules/coaches';
// import { AuthStore } from '@/types/types';
// import { requestsModule } from '@/store/modules/requests';

const modules: ModuleTree<RootState> = {
  coachesModule,
};

const root: Module<RootState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  modules,
};

export default root;