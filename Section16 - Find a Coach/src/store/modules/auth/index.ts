import {
  AuthModuleState,
  AuthModule,
  AuthMutations,
  SetUser,
  AuthActionContext,
  AuthActions,
  Login,
  Authenticate,
} from './types';

let timer: number;

export const state: AuthModuleState = {
  userId: null,
  token: null,
  didAutoLogout: false,
};

export const mutations = {
  [AuthMutations.setUser](state: AuthModuleState, payload: SetUser) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  [AuthMutations.setAutoLogout](state: AuthModuleState) {
    state.didAutoLogout = true;
  },
};

export const actions = {
  async [AuthActions.login]({ dispatch }: AuthActionContext, payload: Login) {
    return dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async [AuthActions.signUp]({ dispatch }: AuthActionContext, payload: Login) {
    return dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async [AuthActions.auth]({ commit, dispatch }: AuthActionContext, payload: Authenticate) {
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
      dispatch(AuthActions.autoLogout);
    }, expiresIn);

    commit(AuthMutations.setUser, {
      token: responseData.idToken,
      userId: responseData.userId,
    });
  },
  [AuthActions.tryLogin]({ commit, dispatch }: AuthActionContext): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration: string | null = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration! - new Date().getTime();

    // if (expiresIn < 0) {
    //   return;
    // }

    timer = setTimeout(() => {
      dispatch(AuthActions.autoLogout);
    }, expiresIn);

    if (token && userId) {
      commit(AuthMutations.setUser, {
        token: token,
        userId: userId,
      });
    }
  },
  [AuthActions.logout]({ commit }: AuthActionContext): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    commit(AuthMutations.setUser, {
      token: null,
      userId: null,
    });
  },
  [AuthActions.autoLogout]({ commit, dispatch }: AuthActionContext): void {
    dispatch(AuthActions.logout);
    commit(AuthMutations.setAutoLogout);
  },
};

export const getters = {
  userId(state: AuthModuleState): AuthModuleState['userId'] {
    return state.userId;
  },
  token(state: AuthModuleState): AuthModuleState['token'] {
    return state.token;
  },
  isAuthenticated(state: AuthModuleState): Boolean {
    return !!state.token;
  },
  didAutoLogout(state: AuthModuleState): AuthModuleState['didAutoLogout'] {
    return state.didAutoLogout;
  },
};

export const authModule: AuthModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
