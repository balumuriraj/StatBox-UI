import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import * as API from '@/api';
import { GenreState, RootState } from '@/store/interfaces';

type GenreContext = ActionContext<GenreState, RootState>;

const state: GenreState = {
  genreList: {
    items: [],
    count: 0
  },
  currentGenre: {
    id: null,
    name: null,
    movies: {
      items: [],
      count: 0
    }
  }
};

const getters = {
  genreList: (state: GenreState) => state.genreList,
  currentGenre: (state: GenreState) => state.currentGenre
};

const actions = {
  fetchGenreList: async (context: GenreContext) => {
    const data = await API.getGenreList();
    context.commit('setGenreList', data);
  },
  fetchGenreData: async (context: GenreContext, payload: { id: number }) => {
    context.commit('resetCurrentGenre');
    const data = await API.getGenreData(payload.id);
    context.commit('setGenreData', { id: payload.id, ...data });
  },
  fetchGenreMovies: async (context: GenreContext, payload: { ids: number[] }) => {
    if (payload.ids.length > 1) {
      context.commit('resetCurrentGenre');
    }

    const count = context.state.currentGenre.movies.count;
    const length = context.state.currentGenre.movies.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count - 1;
      const data = await API.getGenreMovies(payload.ids, { from, to });
      context.commit('setGenreMovies', data);
    }
  }
};

const mutations = {
  setGenreList: (state: GenreState, data: any) => {
    if (data && data.length) {
      state.genreList.count = data.length;
      state.genreList.items = data.slice(0);
    }
  },
  setGenreData: (state: GenreState, data: any) => {
    if (data) {
      state.currentGenre.id = data.id;
      state.currentGenre.name = data.name;
    }
  },
  setGenreMovies: (state: GenreState, data: any) => {
    if (data) {
      state.currentGenre.movies.items = state.currentGenre.movies.items.concat(data.items.slice(0));
      state.currentGenre.movies.count = data.count;
    }
  },
  resetCurrentGenre: (state: any) => {
    state.currentGenre.id = null;
    state.currentGenre.name = null;
    state.currentGenre.movies.items = [];
    state.currentGenre.movies.count = 0;
  }
};

export const genre = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

// We pass namespace here, if we make the module namespaced: true.
const { read, dispatch } = getStoreAccessors<GenreState, RootState>('genre');

export const getGenreList = read(genre.getters.genreList);
export const getCurrentGenre = read(genre.getters.currentGenre);
export const fetchGenreList = dispatch(genre.actions.fetchGenreList);
export const fetchGenreData = dispatch(genre.actions.fetchGenreData);
export const fetchGenreMovies = dispatch(genre.actions.fetchGenreMovies);
