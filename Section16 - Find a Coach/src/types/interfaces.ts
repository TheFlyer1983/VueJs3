import { ActionContext } from 'vuex';
import { CoachesMutationTypes as CoachesMutations } from '@/store/modules/coaches/mutation-types';
import { CoachesActionTypes as CoachesActions } from '@/store/modules/coaches/action-types';
import { RequestsMutationTypes as RequestsMutations } from '@/store/modules/requests/mutation-types';
import { RequestActionTypes as RequestActions } from '@/store/modules/requests/action-types';
import { AuthMutationTypes as AuthtMutations } from '@/store/modules/auth/mutation-types';
import { AuthActionTypes as AuthActions, AuthActionTypes } from '@/store/modules/auth/action-types';
// import { AuthStore } from './types';

export interface RootState {
  root: boolean;
  version: string;
}

export interface CoachesStore {
  lastFetch: number | null;
  coaches: Coaches;
}

export interface RequestsStore {
  requests: Requests;
}

export interface AuthStore {
  userId: string | null;
  token: string | null;
  didAutoLogout: boolean;
}

export type Coaches = Array<Coach>;

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: Array<string>;
  description: string;
  hourlyRate: number;
}

export type Requests = Array<Request>;

export interface Request {
  id: string;
  coachId: string;
  message: string;
  userEmail: string;
}

export interface SetUser {
  token: string | null;
  userId: string | null;
}

export interface Login {
  email: string;
  password: string;
}

export interface Authenticate extends Login {
  mode: string;
}

export interface CoachesStoreGetters {
  coaches(state: CoachesStore): Coaches;
  hasCoaches(state: CoachesStore): boolean;
  isCoach(
    state: CoachesStore,
    getters: CoachesStoreGetters,
    rootState: RootState,
    rootGetters: RootState
  ): boolean;
  shouldUpdate(state: CoachesStore): boolean;
}

export interface RequestStoreGetters {
  requests(
    state: RequestsStore,
    getters: RequestStoreGetters,
    rootState: RootState,
    rootGetters: any
  ): Requests;
  hasRequests(state: RequestsStore, getters: RequestStoreGetters): boolean;
}

export interface AuthStoreGetters {
  userId(state: AuthStore): string | null;
  token(state: AuthStore): string | null;
  isAuthenticated(state: AuthStore): boolean;
  didAutoLogout(state: AuthStore): boolean;
}

export interface LoadCoaches {
  forceRefresh: boolean;
}

export type CoachesStoreMutations<S = CoachesStore> = {
  [CoachesMutations.registerCoach](state: S, payload: Coach): void;
  [CoachesMutations.setCoaches](state: S, payload: Coaches): void;
  [CoachesMutations.setFetchTimestamp](state: S): void;
};

export type RequestsStoreMutations<S = RequestsStore> = {
  [RequestsMutations.addRequest](state: S, payload: Request): void;
  [RequestsMutations.setRequests](state: S, payload: any): void;
};

export type AuthStoreMutations<S = AuthStore> = {
  [AuthtMutations.setUser](state: S, payload: SetUser): void;
  [AuthtMutations.setAutoLogout](state: S): void;
};

export type CoachesAugmentedActionContext = {
  commit<K extends keyof CoachesStoreMutations>(
    key: K,
    payload?: Parameters<CoachesStoreMutations[K]>[1]
  ): ReturnType<CoachesStoreMutations[K]>;
} & Omit<ActionContext<CoachesStore, RootState>, 'commit'>;

export type RequestsAugmentedActionContext = {
  commit<K extends keyof RequestsStoreMutations>(
    key: K,
    payload?: Parameters<RequestsStoreMutations[K]>[1]
  ): ReturnType<RequestsStoreMutations[K]>;
} & Omit<ActionContext<RequestsStore, RootState>, 'commit'>;

export type AuthAugmentedActionContext = {
  commit<K extends keyof AuthStoreMutations>(
    key: K,
    payload?: Parameters<AuthStoreMutations[K]>[1]
  ): ReturnType<AuthStoreMutations[K]>;
  dispatch<K extends keyof AuthStoreActions>(
    key: K,
    payload?: Parameters<AuthStoreActions[K]>[1]
  ): ReturnType<AuthStoreActions[K]>;
} & Omit<ActionContext<AuthStore, RootState>, 'commit'>;

export interface CoachesStoreActions {
  [CoachesActions.registerCoach](
    { commit }: CoachesAugmentedActionContext,
    { rootGetters }: any,
    payload: Coach
  ): Promise<void>;
  [CoachesActions.loadCoaches](
    { commit }: CoachesAugmentedActionContext,
    { getters }: any,
    payload: LoadCoaches
  ): Promise<void>;
}

export interface RequestStoreActions {
  [RequestActions.contactCoach](
    { commit }: RequestsAugmentedActionContext,
    payload: Request
  ): Promise<void>;
  [RequestActions.fetchRequests]({ commit }: RequestsAugmentedActionContext): Promise<void>;
}

export interface AuthStoreActions {
  [AuthActions.login]({ commit }: AuthAugmentedActionContext, payload: Login): Promise<void>;
  [AuthActions.signUp]({ commit }: AuthAugmentedActionContext, payload: Login): Promise<void>;
  [AuthActions.auth]({ commit }: AuthAugmentedActionContext, payload: Authenticate): Promise<void>;
  [AuthActions.tryLogin]({ commit }: AuthAugmentedActionContext): void;
  [AuthActions.logout]({ commit }: AuthAugmentedActionContext): void;
  [AuthActions.autoLogout]({ commit }: AuthAugmentedActionContext): void;
}
