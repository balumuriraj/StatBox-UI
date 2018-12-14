import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { MovieState, RootState } from '@/store/interfaces';
import * as API from '@/api';

type MovieContext = ActionContext<MovieState, RootState>;

const state = {
  id: null,
  title: null,
  releaseDate: null,
  description: null,
  cert: null,
  poster: null,
  runtime: null,
  rating: null,
  genre: [],
  cast: [],
  crew: [],
  moviesAroundReleaseDate: {
    items: [],
    count: 0
  },
  isFavorite: false,
  isBookmarked: false,
  ratings: [],
  userRating: null
};

async function getMoviesAroundDate(date: any, length: number, count: number) {
  if (count === 0 || (count > length)) {
    const from = length;
    const to = (!count || (count - from > 10)) ? length + 9 : count;

    const days = 7;
    const date1 = new Date(date);
    const date2 = new Date(date);
    const startDate = date1.setDate(date1.getDate() - days);
    const endDate = date2.setDate(date2.getDate() + days);

    return await API.getMoviesBetweenDates(startDate, endDate, { from, to });
  }
}

const getters = {
  movie: (state: MovieState) => state,
  isBookmarked: (state: MovieState) => state.isBookmarked,
  isFavorite: (state: MovieState) => state.isFavorite,
  userRating: (state: MovieState) => state.userRating
};

const actions = {
  fetchMovieData: async (context: MovieContext, payload: { id: number }) => {
    const data = await API.getMovieData(payload.id);
    context.commit('setMovieData', data);

    const metadata = await API.getMovieMetadata(payload.id);
    context.commit('setMovieMetadata', metadata);

    // const moviesData = await getMoviesAroundDate(data.releaseDate, 0, 0);
    // context.commit('setMoviesAroundDate', moviesData);
  },
  fetchMoviesAroundDate: async (context: MovieContext) => {
    const { releaseDate, moviesAroundReleaseDate } = context.state;
    const count = moviesAroundReleaseDate.count;
    const length = moviesAroundReleaseDate.items.length;
    const data = await getMoviesAroundDate(releaseDate, length, count);
    context.commit('setMoviesAroundDate', data);
  },
  addBookmark: async (context: MovieContext, payload: { id: number }) => {
    if (!context.rootGetters.userId) {
      return;
    }
    const result = await API.addBookmark(context.rootGetters.userId, payload.id);
    context.commit('updateBookmark', result);
  },
  removeBookmark: async (context: MovieContext, payload: { id: number }) => {
    if (!context.rootGetters.userId) {
      return;
    }
    const result = await API.removeBookmark(context.rootGetters.userId, payload.id);
    context.commit('updateBookmark', result);
  },
  addFavorite: async (context: MovieContext, payload: { id: number }) => {
    if (!context.rootGetters.userId) {
      return;
    }
    const result = await API.addFavorite(context.rootGetters.userId, payload.id);
    context.commit('updateFavorite', result);
  },
  removeFavorite: async (context: MovieContext, payload: { id: number }) => {
    if (!context.rootGetters.userId) {
      return;
    }
    const result = await API.removeFavorite(context.rootGetters.userId, payload.id);
    context.commit('updateFavorite', result);
  },
  updateReview: async (context: MovieContext, payload: { review: any }) => {
    if (!context.rootGetters.userId) {
      return;
    }
    const result = await API.updateReview({ userId: context.rootGetters.userId, ...payload.review});
    context.commit('updateReview', result);
  }
};

const mutations = {
  setMovieData: (state: MovieState, info: any) => {
    state.id = info.id;
    state.title = info.title;
    state.poster = info.poster;
    state.description = info.description;
    state.releaseDate = info.releaseDate;
    state.cert = info.cert;
    state.cast = info.cast;
    state.crew = info.crew;
    state.genre = info.genre;
    state.rating = info.rating;
    state.runtime = info.runtime;
  },
  setMovieMetadata: (state: MovieState, metadata: any) => {
    state.isFavorite = metadata.isFavorite;
    state.isBookmarked = metadata.isBookmarked;
    state.ratings = metadata.ratings && metadata.ratings.slice(0),
    state.userRating = metadata.userRating;
  },
  setMoviesAroundDate: (state: MovieState, data: any) => {
    if (data) {
      state.moviesAroundReleaseDate.items = state.moviesAroundReleaseDate.items.concat(data.items.slice(0));
      state.moviesAroundReleaseDate.count = data.count;
    }
  },
  updateBookmark: (state: MovieState, value: boolean) => {
    state.isBookmarked = value;
  },
  updateFavorite: (state: MovieState, value: boolean) => {
    state.isFavorite = value;
  },
  updateReview: (state: MovieState, review: any) => {
    state.userRating = review.rating;
  }
};

export const movie = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

// We pass namespace here, if we make the module namespaced: true.
const { read, dispatch } = getStoreAccessors<MovieState, RootState>('movie');

export const getMovieData = read(movie.getters.movie);
export const isBookmarked = read(movie.getters.isBookmarked);
export const isFavorite = read(movie.getters.isFavorite);
export const userRating = read(movie.getters.userRating);
export const fetchMovieData = dispatch(movie.actions.fetchMovieData);
export const fetchMoviesAroundDate = dispatch(movie.actions.fetchMoviesAroundDate);
export const addBookmark = dispatch(movie.actions.addBookmark);
export const removeBookmark = dispatch(movie.actions.removeBookmark);
export const addFavorite = dispatch(movie.actions.addFavorite);
export const removeFavorite = dispatch(movie.actions.removeFavorite);
export const updateReview = dispatch(movie.actions.updateReview);
