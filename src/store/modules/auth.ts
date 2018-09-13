import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { AuthState, RootState } from '@/store/interfaces';
import { getUserInfo } from '@/api';

type UserContext = ActionContext<AuthState, RootState>;

const state = {
  user: {
    id: null,
    name: null,
    photo: null,
    lastLogin: null,
    userSince: null,
    bookmarks: [],
    seen: [],
    reviewed: []
  },
  isLoggedIn: false,
  token: null
};

const getters = {
  user: (state: AuthState) => state.user,
  isUserLoggedIn: (state: AuthState) => state.isLoggedIn
};

const actions = {
  setAuthUser: async (context: UserContext, payload: { token: string, user: any }) => {
    const { token, user } = payload;
    context.commit('setAuthUser', {
      name: user.displayName,
      photo: user.photoURL,
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
      token
    });
  },
  fetchUserData: async (context: UserContext) => {
    const { token, user } = context.state;

    if (token) {
      const data = await getUserInfo(context.state.token, user.id);
      context.commit('setUserData', data);
    }
  },
  setToken: async (context: UserContext, payload: { token: string }) => {
    context.commit('setToken', payload.token);
  },
  resetAuthUser: async (context: UserContext) => {
    context.commit('resetAuthUser');
  }
};

const mutations = {
  setAuthUser: (state: any, info: any) => {
    state.user.name = info.name;
    state.user.photo = info.photo;
    state.user.lastLogin = new Date(info.lastSignInTime).toLocaleString();
    state.user.userSince = new Date(info.creationTime).toLocaleString();
    state.isLoggedIn = true;
    state.token = info.token;
  },
  setUserData: (state: any, user: any) => {
    state.user.id = user.id;
    state.user.bookmarks = user.bookmarks;
    state.user.seen = user.seen;
    state.user.reviewed = user.reviewed;
  },
  setToken: (state: any, token: string) => {
    state.token = token;
  },
  resetAuthUser: (state: any) => {
    state.user.id = null;
    state.user.name = null;
    state.user.photo = null;
    state.user.lastLogin = null;
    state.user.userSince = null;
    state.user.bookmarks = [];
    state.user.seen = [];
    state.user.reviewed = [];
    state.isLoggedIn = false;
    state.token = null;
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
export const fetchUserData = dispatch(auth.actions.fetchUserData);
