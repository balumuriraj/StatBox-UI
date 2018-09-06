import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { getCeleb, getMoviesByCeleb } from '@/api';
import { CelebState, RootState } from '@/store/interfaces';

type CelebContext = ActionContext<CelebState, RootState>;

const state = {
  name: null,
  photo: null,
  dob: null,
  movies: {
    all: []
  }
};

const getters = {
  celeb: (state: CelebState) => state
};

const actions = {
  fetchCelebData: async (context: CelebContext, payload: { id: string }) => {
    const data = await getCeleb(payload.id);
    context.commit('setInfo', data);

    // TODO: set movies
    const movies = await getMoviesByCeleb(payload.id);
    context.commit('setAllMovies', movies);
  }
};

const mutations = {
  setInfo: (state: CelebState, info: any) => {
    state.name = info.name;
    state.photo = info.photo;
    state.dob = info.dob;
  },

  setAllMovies: (state: CelebState, movies: any) => {
    state.movies.all = movies;
  }
};

export const celeb = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

// We pass namespace here, if we make the module namespaced: true.
const { read, dispatch } = getStoreAccessors<CelebState, RootState>('celeb');

export const getCelebData = read(celeb.getters.celeb);
export const fetchCelebData = dispatch(celeb.actions.fetchCelebData);
