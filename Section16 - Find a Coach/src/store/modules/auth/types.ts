import { Module, ActionContext } from 'vuex';
import { RootState } from '@/store/rootTypes';

export interface AuthModuleState {
  userId: string | null;
  token: string | null;
  didAutoLogout: boolean;
}

export type AuthModule = Module<AuthModuleState, RootState>;
export type AuthActionContext = ActionContext<AuthModuleState, {}>;

export enum AuthMutations {
  setUser = 'setUser',
  setAutoLogout = 'setAutoLogout',
}

export type AuthStoreMutations<S = AuthModuleState> = {
  [AuthMutations.setUser](state: S, payload: SetUser): void;
  [AuthMutations.setAutoLogout](state: S): void;
};

export enum AuthActions {
  login = 'login',
  signUp = 'signUp',
  auth = 'auth',
  tryLogin = 'tryLogin',
  logout = 'logout',
  autoLogout = 'autoLogout',
}

export interface AuthStoreActions {
  [AuthActions.login]({ commit }: AuthActionContext, payload: Login): Promise<void>;
  [AuthActions.signUp]({ commit }: AuthActionContext, payload: Login): Promise<void>;
  [AuthActions.auth]({ commit, dispatch }: AuthActionContext, payload: Authenticate): Promise<void>;
  [AuthActions.tryLogin]({ commit }: AuthActionContext): void;
  [AuthActions.logout]({ commit }: AuthActionContext): void;
  [AuthActions.autoLogout]({ commit }: AuthActionContext): void;
}

export enum AuthGetters {
  userId = 'userId',
  token = 'token',
  isAuthenticated = 'isAuthenticated',
  didAutoLogout = 'didAutoLogout',
}

export interface AuthStoreGetters {
  [AuthGetters.userId](state: AuthModuleState): string | null;
  [AuthGetters.token](state: AuthModuleState): string | null;
  [AuthGetters.isAuthenticated](state: AuthModuleState): boolean;
  [AuthGetters.didAutoLogout](state: AuthModuleState): boolean;
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
