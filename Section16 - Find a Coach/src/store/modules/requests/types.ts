import { Module, ActionContext } from 'vuex';
import { RootState } from '@/store/rootTypes';

export interface RequestsModuleState {
  requests: Requests;
}

export type RequestsModule = Module<RequestsModuleState, RootState>;

export type RequestsActionContext = ActionContext<RequestsModuleState, {}>;

export interface Request {
  id: string;
  coachId: string;
  message: string;
  userEmail: string;
}

export type Requests = Array<Request>;

export enum RequestsMutations {
  addRequest = 'addRequest',
  setRequests = 'setRequests',
}

export type RequestsStoreMutations<S = RequestsModuleState> = {
  [RequestsMutations.addRequest](state: S, payload: Request): void;
  [RequestsMutations.setRequests](state: S, payload: any): void;
};

export enum RequestActions {
  contactCoach = 'contactCoach',
  fetchRequests = 'fetchRequests',
}

export interface RequestStoreActions {
  [RequestActions.contactCoach]({ commit }: RequestsActionContext, payload: Request): Promise<void>;
  [RequestActions.fetchRequests]({ commit }: RequestsActionContext): Promise<void>;
}

export enum RequestGetters {
  requests = 'requests',
  hasRequests = 'requests',
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
