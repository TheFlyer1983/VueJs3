import { MutationTree } from "vuex";
import { AuthStore, AuthStoreMutations, SetUser } from "@/types/interfaces";
import { AuthMutationTypes } from "./mutation-types";

export const mutations: MutationTree<AuthStore> & AuthStoreMutations = {
  [AuthMutationTypes.setUser](state: AuthStore, payload: SetUser) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  [AuthMutationTypes.setAutoLogout](state: AuthStore) {
    state.didAutoLogout = true;
  }
};
