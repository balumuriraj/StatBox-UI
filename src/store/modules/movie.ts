import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { getMovie as getMovieAPI } from '@/api/index';
import { MovieState, RootState } from '@/store/interfaces';

type MovieContext = ActionContext<MovieState, RootState>;

const state = {
  id: null,
  title: null,
  date: null,
  description: null,
  cert: null,
  poster: null,
  runtime: null,
  rating: null,
  ratings: [],
  reviews: [],
  genre: [],
  cast: [],
  crew: [],
  moviesThisMonth: []
};

const getters = {
  movie: (state: MovieState) => state
};

const actions = {
  getMovieData: async (context: MovieContext, payload: { id: string }) => {
    const data = await getMovieAPI(payload.id);
    context.commit('setMovieData', data);
  }
};

const mutations = {
  setMovieData: (state: MovieState, info: any) => {
    state.id = info.id;
    state.title = info.title;
    state.poster = info.poster;
    state.description = info.description;
    state.date = info.date;
    state.cert = info.cert;
    state.cast = info.cast;
    state.crew = info.crew;
    state.genre = info.genre;
    state.moviesThisMonth = info.moviesThisMonth;
    state.ratings = info.ratings;
    state.reviews = info.reviews;
    state.runtime = info.runtime;
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

export const getMovie = read(movie.getters.movie);
export const dispatchGetMovieDataAction = dispatch(movie.actions.getMovieData);
