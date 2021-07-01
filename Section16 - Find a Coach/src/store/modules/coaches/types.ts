import { Module, ActionContext } from 'vuex';
import { RootState } from '@/store/rootTypes';

export interface CoachesModuleState {
  lastFetch: number | null;
  coaches: Coaches;
}

export type CoachesModule = Module<CoachesModuleState, RootState>;
export type CoachesActionContext = ActionContext<CoachesModuleState, {}>;

export enum CoachesMutations {
  registerCoach = 'registerCoach',
  setCoaches = 'setCoaches',
  setFetchTimestamp = 'setFetchTimestamp',
}

export type CoachesStoreMutations<S = CoachesModuleState> = {
  [CoachesMutations.registerCoach](state: S, payload: Coach): void;
  [CoachesMutations.setCoaches](state: S, payload: Coaches): void;
  [CoachesMutations.setFetchTimestamp](state: S): void;
};

export enum CoachesActions {
  registerCoach = 'registerCoach',
  loadCoaches = 'loadCoaches',
}

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

export enum CoachesGetters {
  coaches = 'coaches',
  hasCoaches = 'hasCoaches',
  isCoach = 'isCoach',
  shouldUpdate = 'shouldUpdate'
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

export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: Array<string>;
  description: string;
  hourlyRate: number;
}

export type Coaches = Array<Coach>;

export interface LoadCoaches {
  forceRefresh: boolean;
}