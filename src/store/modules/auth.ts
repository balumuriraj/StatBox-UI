import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { AuthState, RootState, Items } from '@/store/interfaces';
import { getUserId, getBookmarks, getFavorites, getReviewed, getUserMetadata } from '@/api';
import firebaseAuth from '@/auth';

type UserContext = ActionContext<AuthState, RootState>;

const state: AuthState = {
  user: {
    id: null,
    name: null,
    avatar: null,
    theme: null,
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
    },
    metadata: {
      genres: [],
      ratingBins: null,
      movieMinutes: 0,
      moviesCount: 0,
      topActors: [],
      topDirectors: []
    }
  },
  isLoggedIn: false,
  token: null,
  showModal: false
};

const defaultRange = { from: 0, to: 9 };

// support
function getRange(length: number, count: number) {
  if (count === 0 || (count > length)) {
    const from = length;
    const to = !count || (count - from > 10) ? length + 9 : count - 1;

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
  isUserLoggedIn: (state: AuthState) => state.isLoggedIn,
  showModal: (state: AuthState) => state.showModal
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

        const metadata = await getUserMetadata(id);
        context.commit('setUserMetadata', metadata);

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
  },
  saveUserAvatar: async (context: UserContext, payload: { avatar: string }) => {
    context.commit('saveUserAvatar', payload.avatar);
  },
  saveUserTheme: async (context: UserContext, payload: { theme: string }) => {
    context.commit('saveUserTheme', payload.theme);
  },
  logout: async (context: UserContext) => {
    await firebaseAuth.logout();
    context.commit('resetAuthUser');
  },
  openModal: async (context: UserContext) => {
    context.commit('openModal');
  },
  closeModal: async (context: UserContext) => {
    context.commit('closeModal');
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
  setUserMetadata: (state: any, data: any) => {
    state.user.metadata.genres = data.genres && data.genres.slice(0) || [];
    state.user.metadata.ratingBins = data.ratingBins;
    state.user.metadata.movieMinutes = data.movieMinutes;
    state.user.metadata.moviesCount = data.moviesCount;
    state.user.metadata.topActors = data.topActors && data.topActors.slice(0) || [];
    state.user.metadata.topDirectors = data.topDirectors && data.topDirectors.slice(0) || [];
  },
  setBookmarks: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.bookmarks.items = data.items && data.items.slice(0);
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
      state.user.favorites.items = data.items && data.items.slice(0);
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
      state.user.reviewed.items = data.items && data.items.slice(0);
      state.user.reviewed.count = data.count;
    }
  },
  pushReviewed: (state: any, data: { items: any[], count: number }) => {
    if (data) {
      state.user.reviewed.items = state.user.reviewed.items.concat(data.items && data.items.slice(0));
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
    state.user.metadata = {
      genres: [],
      ratingBins: null,
      movieMinutes: 0,
      moviesCount: 0,
      topActors: [],
      topDirectors: []
    };
    state.isLoggedIn = false;
    state.token = null;
    window.location.reload();
  },
  saveUserAvatar: (state: any, avatar: string) => {
    state.user.avatar = avatar;
  },
  saveUserTheme: (state: any, theme: string) => {
    state.user.theme = theme;
  },
  openModal: (state: any) => {
    state.showModal = true;
  },
  closeModal: (state: any) => {
    state.showModal = false;
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

export const getShowModal = read(auth.getters.showModal);
export const getUser = read(auth.getters.user);
export const isUserLoggedIn = read(auth.getters.isUserLoggedIn);
export const setAuthUser = dispatch(auth.actions.setAuthUser);
export const fetchUserData = dispatch(auth.actions.fetchUserData);
export const fetchBookmarks = dispatch(auth.actions.fetchBookmarks);
export const fetchFavorites = dispatch(auth.actions.fetchFavorites);
export const fetchReviewed = dispatch(auth.actions.fetchReviewed);
export const saveUserAvatar = dispatch(auth.actions.saveUserAvatar);
export const saveUserTheme = dispatch(auth.actions.saveUserTheme);
