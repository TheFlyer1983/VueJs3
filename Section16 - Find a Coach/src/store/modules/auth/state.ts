import { AuthStore } from '@/types/interfaces';

export const state: AuthStore = {
  userId: null,
  token: null,
  didAutoLogout: false,
};
