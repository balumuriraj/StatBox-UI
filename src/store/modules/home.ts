import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import * as API from '@/api';
import { RootState } from '@/store/interfaces';

// https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart

type HomeContext = ActionContext<any, RootState>;

const state: any = {
  movies: {
    latest: {
      items: [],
      count: 0
    },
    upcoming: {
      items: [],
      count: 0
    },
    popular: {
      items: [],
      count: 0
    },
    toprated: {
      items: [],
      count: 0
    },
    recent: {
      items: [],
      count: 0
    },
    from2010to2015: {
      items: [],
      count: 0
    },
    from2000to2010: {
      items: [],
      count: 0
    },
    from1990to2000: {
      items: [],
      count: 0
    }
  }
};

const getters = {
  latest: (state: any) => state.movies.latest,
  upcoming: (state: any) => state.movies.upcoming,
  popular: (state: any) => state.movies.popular,
  toprated: (state: any) => state.movies.toprated,
  recent: (state: any) => state.movies.recent,
  from2010to2015: (state: any) => state.movies.from2010to2015,
  from2000to2010: (state: any) => state.movies.from2000to2010,
  from1990to2000: (state: any) => state.movies.from1990to2000
};

const actions = {
  fetchLatest: async (context: HomeContext) => {
    const count = context.state.movies.latest.count;
    const length = context.state.movies.latest.items.length;

    if (count === 0 || (count > length)) {
      const days = 30;
      const date = new Date();
      const startDate = date.setDate(date.getDate() - days);
      const endDate = Date.now();
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      const result = await API.getMoviesBetweenDates(startDate, endDate, { from, to }, null);
      context.commit('setLatestMovies', result);
    }
  },

  fetchUpcoming: async (context: HomeContext) => {
    const count = context.state.movies.upcoming.count;
    const length = context.state.movies.upcoming.items.length;

    if (count === 0 || (count > length)) {
      const days = 30;
      const date = new Date();
      const endDate = date.setDate(date.getDate() + days);
      const startDate = Date.now();
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      const result = await API.getMoviesBetweenDates(startDate, endDate, { from, to }, null);
      context.commit('setUpcomingMovies', result);
    }
  },

  fetchPopular: async (context: HomeContext) => {
    const count = context.state.movies.popular.count;
    const length = context.state.movies.popular.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      const result = await API.getPopularMovies({ from, to }, null);
      context.commit('setPopularMovies', result);
    }
  },

  fetchTopRated: async (context: HomeContext) => {
    const count = context.state.movies.toprated.count;
    const length = context.state.movies.toprated.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      const result = await API.getTopRatedMovies({ from, to });
      context.commit('setTopRatedMovies', result);
    }
  },

  fetchMoviesByDates: async (context: HomeContext, payload: { name: string, startDate: number, endDate: number }) => {
    const movies = context.state.movies[payload.name];
    const count = movies && movies.count || 0;
    const length = movies && movies.items.length || 0;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      const result = await API.getMoviesBetweenDates(payload.startDate, payload.endDate, { from, to }, null);
      result.name = payload.name;
      context.commit('setMoviesByDates', result);
    }
  }
};

const mutations = {
  setLatestMovies: (state: any, data: { items: any[], count: number }) => {
    state.movies.latest.items = state.movies.latest.items.concat(data.items.slice(0));
    state.movies.latest.count = data.count;
  },

  setUpcomingMovies: (state: any, data: { items: any[], count: number }) => {
    state.movies.upcoming.items = state.movies.upcoming.items.concat(data.items.slice(0));
    state.movies.upcoming.count = data.count;
  },

  setPopularMovies: (state: any, data: { items: any[], count: number }) => {
    state.movies.popular.items = state.movies.popular.items.concat(data.items.slice(0));
    state.movies.popular.count = data.count;
  },

  setTopRatedMovies: (state: any, data: { items: any[], count: number }) => {
    state.movies.toprated.items = state.movies.toprated.items.concat(data.items.slice(0));
    state.movies.toprated.count = data.count;
  },

  setMoviesByDates: (state: any, data: { name: string, items: any[], count: number }) => {
    if (!state.movies[data.name]) {
      state.movies[data.name] = {
        items: [],
        count: 0
      };
    }

    state.movies[data.name].items = state.movies[data.name].items.concat(data.items.slice(0));
    state.movies[data.name].count = data.count;
  }
};

export const home = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

// We pass namespace here, if we make the module namespaced: true.
const { read, dispatch } = getStoreAccessors<any, RootState>('home');

export const getLatest = read(home.getters.latest);
export const getUpcoming = read(home.getters.upcoming);
export const getPopular = read(home.getters.popular);
export const getTopRated = read(home.getters.toprated);
export const getRecent = read(home.getters.recent);
export const get2010to2015 = read(home.getters.from2010to2015);
export const get2000to2010 = read(home.getters.from2000to2010);
export const get1990to2000 = read(home.getters.from1990to2000);

export const fetchLatest = dispatch(home.actions.fetchLatest);
export const fetchUpcoming = dispatch(home.actions.fetchUpcoming);
export const fetchPopular = dispatch(home.actions.fetchPopular);
export const fetchTopRated = dispatch(home.actions.fetchTopRated);

export const fetchMoviesByDates = dispatch(home.actions.fetchMoviesByDates);
