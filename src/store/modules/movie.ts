import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { getMovie, updateUserBookmark, updateUserSeen, updateUserReview, getMovieMetadata } from '@/api';
import { MovieState, RootState } from '@/store/interfaces';

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
  moviesThisMonth: [],
  isSeen: false,
  isBookmarked: false,
  userRating: null
};

const getters = {
  movie: (state: MovieState) => state,
  isBookmarked: (state: MovieState) => state.isBookmarked,
  isSeen: (state: MovieState) => state.isSeen,
  userRating: (state: MovieState) => state.userRating
};

const actions = {
  fetchMovieData: async (context: MovieContext, payload: { id: number }) => {
    const data = await getMovie(payload.id);
    context.commit('setMovieData', data);

    const metadata = await getMovieMetadata(payload.id);
    context.commit('setMovieMetadata', metadata);
  },
  updateBookmark: async (context: MovieContext, payload: { id: number, isPush: boolean }) => {
    const result = await updateUserBookmark(context.rootGetters.userId, payload.id, payload.isPush);
    context.commit('updateBookmark', result);
  },
  updateSeen: async (context: MovieContext, payload: { id: number, isPush: boolean }) => {
    const result = await updateUserSeen(context.rootGetters.userId, payload.id, payload.isPush);
    context.commit('updateSeen', result);
  },
  updateReview: async (context: MovieContext, payload: { review: any }) => {
    const result = await updateUserReview({ userId: context.rootGetters.userId, ...payload.review});
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
    state.moviesThisMonth = info.moviesThisMonth;
    state.rating = info.rating;
    state.runtime = info.runtime;
  },
  setMovieMetadata: (state: MovieState, metadata: any) => {
    state.isSeen = metadata.isSeen;
    state.isBookmarked = metadata.isBookmarked;
    state.userRating = metadata.userRating;
  },
  updateBookmark: (state: MovieState, value: boolean) => {
    state.isBookmarked = value;
  },
  updateSeen: (state: MovieState, value: boolean) => {
    state.isSeen = value;
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
export const isSeen = read(movie.getters.isSeen);
export const userRating = read(movie.getters.userRating);
export const fetchMovieData = dispatch(movie.actions.fetchMovieData);
export const updateBookmark = dispatch(movie.actions.updateBookmark);
export const updateSeen = dispatch(movie.actions.updateSeen);
export const updateReview = dispatch(movie.actions.updateReview);
