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
    seen: []
  },
  isLoggedIn: null
};

const getters = {
  user: (state: AuthState) => state.user,
  isUserLoggedIn: (state: AuthState) => state.isLoggedIn
};

const actions = {
  setAuthUser: async (context: UserContext, payload: { idToken: any, user: any }) => {
    const { idToken, user } = payload;
    const userInfo = await getUserInfo(idToken);
    userInfo.name = user.displayName;
    userInfo.photo = user.photoURL;
    userInfo.lastSignInTime = user.metadata.lastSignInTime;
    userInfo.creationTime = user.metadata.creationTime;
    console.log(userInfo);
    context.commit('setAuthUser', userInfo);
  },

  resetAuthUser: async (context: UserContext) => {
    context.commit('resetAuthUser');
  }
};

const mutations = {
  setAuthUser: (state: any, user: any) => {
    state.user.id = user.id;
    state.user.name = user.name;
    state.user.photo = user.photo;
    state.user.lastLogin = new Date(user.lastSignInTime).toLocaleString();
    state.user.userSince = new Date(user.creationTime).toLocaleString();
    state.isLoggedIn = true;
    state.user.bookmarks = user.bookmarks;
    state.user.seen = user.seen;
  },
  resetAuthUser: (state: any) => {
    state.user.id = null;
    state.user.name = null;
    state.user.photo = null;
    state.user.lastLogin = null;
    state.user.userSince = null;
    state.isLoggedIn = false;
    state.user.bookmarks = [];
    state.user.seen = [];
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
