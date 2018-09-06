import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { AuthState, RootState } from '@/store/interfaces';

type UserContext = ActionContext<AuthState, RootState>;

const state = {
  user: {
    id: null,
    name: null,
    photo: null,
    lastLogin: null,
    userSince: null
  },
  isLoggedIn: null
};

const getters = {
  user: (state: AuthState) => state.user,
  isUserLoggedIn: (state: AuthState) => state.isLoggedIn
};

const actions = {
  setAuthUser: (context: UserContext, payload: { user: any }) => {
    context.commit('setAuthData', payload.user);
  }
};

const mutations = {
  setAuthData: (state: any, user: any) => {
    if (user) {
      state.user.id = user.uid;
      state.user.name = user.displayName;
      state.user.photo = user.photoURL;
      state.user.lastLogin = new Date(user.metadata.lastSignInTime).toLocaleString();
      state.user.userSince = new Date(user.metadata.creationTime).toLocaleString();
      state.isLoggedIn = true;
    } else {
      state.user.id = null;
      state.user.name = null;
      state.user.photo = null;
      state.user.lastLogin = null;
      state.user.userSince = null;
      state.isLoggedIn = false;
    }
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

// We pass namespace here, if we make the module namespaced: true.
const { read, dispatch } = getStoreAccessors<AuthState, RootState>('auth');

export const getUser = read(auth.getters.user);
export const isUserLoggedIn = read(auth.getters.isUserLoggedIn);
export const setAuthUser = dispatch(auth.actions.setAuthUser);
