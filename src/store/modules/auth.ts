import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { AuthState, RootState, Items } from '@/store/interfaces';
import { getUserId, getBookmarks, getSeen, getReviewed } from '@/api';

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
    seen: {
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

async function getUserSeen(id: number, seen: Items) {
  const range = getRange(seen.items.length, seen.count);
  return id && range && await getSeen(id, range);
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

        const bookmarksResult = await getUserBookmarks(id, user.bookmarks);
        context.commit('setBookmarks', bookmarksResult);

        const seenResult = await getUserSeen(id, user.seen);
        context.commit('setSeen', seenResult);

        const reviewedResult = await getUserReviewed(id, user.reviewed);
        context.commit('setReviewed', reviewedResult);
      }
    } catch (err) {
      console.log(err);
    }
  },
  fetchBookmarks: async (context: UserContext) => {
    try {
      const { id, bookmarks } = context.state.user;
      const result = await getUserBookmarks(id, bookmarks);
      context.commit('setBookmarks', result);
    } catch (err) {
      console.log(err);
    }
  },
  fetchSeen: async (context: UserContext) => {
    try {
      const { id, seen } = context.state.user;
      const result = await getUserSeen(id, seen);
      context.commit('setSeen', result);
    } catch (err) {
      console.log(err);
    }
  },
  fetchReviewed: async (context: UserContext) => {
    try {
      const { id, reviewed } = context.state.user;
      const result = await getUserReviewed(id, reviewed);
      context.commit('setReviewed', result);
    } catch (err) {
      console.log(err);
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
      state.user.bookmarks.items = state.user.bookmarks.items.concat(data.items.slice(0));
      state.user.bookmarks.count = data.count;
    }
  },
  setSeen: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.seen.items = state.user.seen.items.concat(data.items.slice(0));
      state.user.seen.count = data.count;
    }
  },
  setReviewed: (state: any, data: { items: any[], count: number }) => {
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
    state.user.seen = {
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
export const fetchSeen = dispatch(auth.actions.fetchSeen);
export const fetchReviewed = dispatch(auth.actions.fetchReviewed);
