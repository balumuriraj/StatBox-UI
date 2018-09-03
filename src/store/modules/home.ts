import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { getMoviesBetweenDatesRange } from '@/api/index';
import { HomeState, RootState } from '@/store/interfaces';

// https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart

type HomeContext = ActionContext<HomeState, RootState>;

const state = {
  movies: {
    latest: [],
    upcoming: []
  }
};

const getters = {
  latestMovies: (state: HomeState) => state.movies.latest,
  upcomingMovies: (state: HomeState) => state.movies.upcoming
};

const actions = {
  getLatestMovies: async (context: HomeContext) => {
    const days = 30;
    const date = new Date();
    const startDate = date.setDate(date.getDate() - days);
    const endDate = Date.now();
    const movies = await getMoviesBetweenDatesRange(startDate, endDate);
    context.commit('setLatestMovies', movies);
  },

  getUpcomingMovies: async (context: HomeContext) => {
    const days = 30;
    const date = new Date();
    const endDate = date.setDate(date.getDate() + days);
    const startDate = Date.now();
    const movies = await getMoviesBetweenDatesRange(startDate, endDate);
    context.commit('setUpcomingMovies', movies);
  }
};

const mutations = {
  setLatestMovies: (state: HomeState, movies: any[]) => {
    state.movies.latest = movies;
  },

  setUpcomingMovies: (state: HomeState, movies: any[]) => {
    state.movies.upcoming = movies;
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

export const getLatestMovies = read(home.getters.latestMovies);
export const getUpcomingMovies = read(home.getters.upcomingMovies);

export const dispatchGetLatestMoviesAction = dispatch(home.actions.getLatestMovies);
export const dispatchGetUpcomingMoviesAction = dispatch(home.actions.getUpcomingMovies);
