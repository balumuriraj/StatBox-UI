import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { AuthState, RootState, Items } from '@/store/interfaces';
import { getUserId, getBookmarks, getFavorites, getReviewed } from '@/api';

type UserContext = ActionContext<AuthState, RootState>;

const state = {
  user: {
    id: null,
    name: null,
    photo: null,
    lastLogin: null,
    userSince: null,
    bookmarks: {
      items: [],
      count: 0
    },
    favorites: {
      items: [],
      count: 0
    },
    reviewed: {
      items: [],
      count: 0
    }
  },
  isLoggedIn: false,
  token: null
};

const defaultRange = { from: 0, to: 9 };

// support
function getRange(length: number, count: number) {
  if (count === 0 || (count > length)) {
    const from = length;
    const to = !count || (count - from > 10) ? length + 9 : count;

    return { from, to };
  }
}

async function getUserBookmarks(id: number, bookmarks: Items) {
  const range = getRange(bookmarks.items.length, bookmarks.count);
  return id && range && await getBookmarks(id, range);
}

async function getUserFavorites(id: number, favorites: Items) {
  const range = getRange(favorites.items.length, favorites.count);
  return id && range && await getFavorites(id, range);
}

async function getUserReviewed(id: number, reviewed: Items) {
  const range = getRange(reviewed.items.length, reviewed.count);
  return id && range && await getReviewed(id, range);
}


// getters
const getters = {
  user: (state: AuthState) => state.user,
  isUserLoggedIn: (state: AuthState) => state.isLoggedIn
};

// actions
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
    try {
      const { token, user } = context.state;

      if (token) {
        const id = user.id ? user.id : await getUserId(token);
        context.commit('setUserId', id);

        const bookmarksResult = await getBookmarks(id, defaultRange);
        context.commit('setBookmarks', bookmarksResult);

        const favResult = await getFavorites(id, defaultRange);
        context.commit('setFavorite', favResult);

        const reviewedResult = await getReviewed(id, defaultRange);
        context.commit('setReviewed', reviewedResult);
      }
    } catch (err) {
      // console.log(err);
    }
  },
  fetchBookmarks: async (context: UserContext) => {
    try {
      const { id, bookmarks } = context.state.user;
      const result = await getUserBookmarks(id, bookmarks);
      context.commit('pushBookmarks', result);
    } catch (err) {
      // console.log(err);
    }
  },
  fetchFavorites: async (context: UserContext) => {
    try {
      const { id, favorites } = context.state.user;
      const result = await getUserFavorites(id, favorites);
      context.commit('pushFavorites', result);
    } catch (err) {
      // console.log(err);
    }
  },
  fetchReviewed: async (context: UserContext) => {
    try {
      const { id, reviewed } = context.state.user;
      const result = await getUserReviewed(id, reviewed);
      context.commit('pushReviewed', result);
    } catch (err) {
      // console.log(err);
    }
  },
  setToken: async (context: UserContext, payload: { token: string }) => {
    context.commit('setToken', payload.token);
  },
  resetAuthUser: async (context: UserContext) => {
    context.commit('resetAuthUser');
  }
};

// mutations
const mutations = {
  setAuthUser: (state: any, info: any) => {
    state.user.name = info.name;
    state.user.photo = info.photo;
    state.user.lastLogin = new Date(info.lastSignInTime).toLocaleString();
    state.user.userSince = new Date(info.creationTime).toLocaleString();
    state.isLoggedIn = true;
    state.token = info.token;
  },
  setUserId: (state: any, id: number) => {
    state.user.id = id;
  },
  setBookmarks: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.bookmarks.items = data.items.slice(0);
      state.user.bookmarks.count = data.count;
    }
  },
  pushBookmarks: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.bookmarks.items = state.user.bookmarks.items.concat(data.items.slice(0));
      state.user.bookmarks.count = data.count;
    }
  },
  setFavorite: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.favorites.items = data.items.slice(0);
      state.user.favorites.count = data.count;
    }
  },
  pushFavorites: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.favorites.items = state.user.favorites.items.concat(data.items.slice(0));
      state.user.favorites.count = data.count;
    }
  },
  setReviewed: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.reviewed.items = data.items.slice(0);
      state.user.reviewed.count = data.count;
    }
  },
  pushReviewed: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.reviewed.items = state.user.reviewed.items.concat(data.items.slice(0));
      state.user.reviewed.count = data.count;
    }
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
    state.user.bookmarks = {
      items: [],
      count: 0
    };
    state.user.favorites = {
      items: [],
      count: 0
    };
    state.user.reviewed = {
      items: [],
      count: 0
    };
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
export const fetchBookmarks = dispatch(auth.actions.fetchBookmarks);
export const fetchFavorites = dispatch(auth.actions.fetchFavorites);
export const fetchReviewed = dispatch(auth.actions.fetchReviewed);
