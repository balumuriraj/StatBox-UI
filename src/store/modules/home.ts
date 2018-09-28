import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import * as API from '@/api';
import { HomeState, RootState } from '@/store/interfaces';

// https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart

type HomeContext = ActionContext<HomeState, RootState>;

const state = {
  movies: {
    latest: {
      items: [],
      count: 0
    },
    upcoming: {
      items: [],
      count: 0
    }
  }
};

const getters = {
  latest: (state: HomeState) => state.movies.latest,
  upcoming: (state: HomeState) => state.movies.upcoming
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
      const to = !count || (count - from > 10) ? length + 9 : count;
      const result = await API.getMoviesBetweenDates(startDate, endDate, { from, to });
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
      const to = !count || (count - from > 10) ? length + 9 : count;
      const result = await API.getMoviesBetweenDates(startDate, endDate, { from, to });
      context.commit('setUpcomingMovies', result);
    }
  }
};

const mutations = {
  setLatestMovies: (state: HomeState, data: { items: any[], count: number }) => {
    state.movies.latest.items = state.movies.latest.items.concat(data.items.slice(0));
    state.movies.latest.count = data.count;
  },

  setUpcomingMovies: (state: HomeState, data: { items: any[], count: number }) => {
    state.movies.upcoming.items = state.movies.upcoming.items.concat(data.items.slice(0));
    state.movies.upcoming.count = data.count;
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
const { read, dispatch } = getStoreAccessors<HomeState, RootState>('home');

export const getLatest = read(home.getters.latest);
export const getUpcoming = read(home.getters.upcoming);

export const fetchLatest = dispatch(home.actions.fetchLatest);
export const fetchUpcoming = dispatch(home.actions.fetchUpcoming);
