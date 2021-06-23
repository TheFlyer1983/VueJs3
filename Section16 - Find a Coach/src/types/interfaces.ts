import { Module, ActionContext } from 'vuex';
import { CoachesMutationTypes as CoachesMutations } from '@/store/modules/coaches/mutation-types';
import { CoachesActionTypes as CoachesActions } from '@/store/modules/coaches/action-types';
import { RequestsMutationTypes as RequestsMutations } from '@/store/modules/requests/mutation-types';
import { RequestActionTypes as RequestActions } from '@/store/modules/requests/action-types';
import { AuthMutationTypes as AuthtMutations } from '@/store/modules/auth/mutation-types';
import { AuthActionTypes as AuthActions } from '@/store/modules/auth/action-types';

export interface RootState {
  root: boolean;
  version: string;
}

export interface CoachesModuleState {
  lastFetch: number | null;
  coaches: Coaches;
}

export interface RequestsModuleState {
  requests: Requests;
}

export interface AuthModuleState {
  userId: string | null;
  token: string | null;
  didAutoLogout: boolean;
}

export type CoachesModule = Module<CoachesModuleState, RootState>;
export type RequestsModule = Module<RequestsModuleState, RootState>;
export type AuthModule = Module<AuthModuleState, RootState>;

export type CoachesActionContext = ActionContext<CoachesModuleState, {}>;
export type RequestsActionContext = ActionContext<RequestsModuleState, {}>;
export type AuthActionContext = ActionContext<AuthModuleState, {}>;

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: Array<string>;
  description: string;
  hourlyRate: number;
}

export type Coaches = Array<Coach>;

export interface Request {
  id: string;
  coachId: string;
  message: string;
  userEmail: string;
}

export type Requests = Array<Request>;

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
  coaches(state: CoachesModuleState): Coaches;
  hasCoaches(state: CoachesModuleState): boolean;
  isCoach(
    state: CoachesModuleState,
    getters: any,
    rootState: RootState,
    rootGetters: RootState
  ): boolean;
  shouldUpdate(state: CoachesModuleState): boolean;
}

export interface RequestStoreGetters {
  requests(
    state: RequestsModuleState,
    getters: RequestStoreGetters,
    rootState: RootState,
    rootGetters: any
  ): Requests;
  hasRequests(state: RequestsModuleState, getters: RequestStoreGetters): boolean;
}

export interface AuthStoreGetters {
  userId(state: AuthModuleState): string | null;
  token(state: AuthModuleState): string | null;
  isAuthenticated(state: AuthModuleState): boolean;
  didAutoLogout(state: AuthModuleState): boolean;
}

export interface LoadCoaches {
  forceRefresh: boolean;
}

export type CoachesStoreMutations<S = CoachesModuleState> = {
  [CoachesMutations.registerCoach](state: S, payload: Coach): void;
  [CoachesMutations.setCoaches](state: S, payload: Coaches): void;
  [CoachesMutations.setFetchTimestamp](state: S): void;
};

export type RequestsStoreMutations<S = RequestsModuleState> = {
  [RequestsMutations.addRequest](state: S, payload: Request): void;
  [RequestsMutations.setRequests](state: S, payload: any): void;
};

export type AuthStoreMutations<S = AuthModuleState> = {
  [AuthtMutations.setUser](state: S, payload: SetUser): void;
  [AuthtMutations.setAutoLogout](state: S): void;
};

export interface CoachesStoreActions {
  [CoachesActions.registerCoach](
    { commit, rootGetters }: CoachesActionContext,
    payload: Coach
  ): Promise<void>;
  [CoachesActions.loadCoaches](
    { commit, getters }: CoachesActionContext,
    payload: LoadCoaches
  ): Promise<void>;
}

export interface RequestStoreActions {
  [RequestActions.contactCoach]({ commit }: RequestsActionContext, payload: Request): Promise<void>;
  [RequestActions.fetchRequests]({ commit }: RequestsActionContext): Promise<void>;
}

export interface AuthStoreActions {
  [AuthActions.login]({ commit }: AuthActionContext, payload: Login): Promise<void>;
  [AuthActions.signUp]({ commit }: AuthActionContext, payload: Login): Promise<void>;
  [AuthActions.auth]({ commit, dispatch }: AuthActionContext, payload: Authenticate): Promise<void>;
  [AuthActions.tryLogin]({ commit }: AuthActionContext): void;
  [AuthActions.logout]({ commit }: AuthActionContext): void;
  [AuthActions.autoLogout]({ commit }: AuthActionContext): void;
}
