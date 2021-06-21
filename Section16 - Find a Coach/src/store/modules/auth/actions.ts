import { Authenticate, AuthActionContext, Login } from '@/types/interfaces';
import { AuthActionTypes } from './action-types';
import { AuthMutationTypes } from './mutation-types';

let timer: number;

export const actions = {
  async [AuthActionTypes.login]({ dispatch }: AuthActionContext, payload: Login) {
    return dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async [AuthActionTypes.signUp]({ dispatch }: AuthActionContext, payload: Login) {
    return dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async [AuthActionTypes.auth]({ commit, dispatch }: AuthActionContext, payload: Authenticate) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAG_ho49Rz19g2w6nF6Chisq5H2N2GZkQs';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAG_ho49Rz19g2w6nF6Chisq5H2N2GZkQs';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check your data.');
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate: any = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      dispatch(AuthActionTypes.autoLogout);
    }, expiresIn);

    commit(AuthMutationTypes.setUser, {
      token: responseData.idToken,
      userId: responseData.userId,
    });
  },
  [AuthActionTypes.tryLogin]({ commit, dispatch }: AuthActionContext ): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration: string | null = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration! - new Date().getTime();

    // if (expiresIn < 0) {
    //   return;
    // }

    timer = setTimeout(() => {
      dispatch(AuthActionTypes.autoLogout);
    }, expiresIn);

    if (token && userId) {
      commit(AuthMutationTypes.setUser, {
        token: token,
        userId: userId,
      });
    }
  },
  [AuthActionTypes.logout]( { commit }: AuthActionContext): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    commit(AuthMutationTypes.setUser, {
      token: null,
      userId: null,
    });
  },
  [AuthActionTypes.autoLogout]({ commit, dispatch }: AuthActionContext): void {
    dispatch(AuthActionTypes.logout);
    commit(AuthMutationTypes.setAutoLogout);
  },
};
