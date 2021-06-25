import { AuthModuleState } from '@/types/interfaces';

export const state: AuthModuleState = {
  userId: null,
  token: null,
  didAutoLogout: false,
};
