import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import * as API from '@/api';
import { CelebState, RootState } from '@/store/interfaces';

type CelebContext = ActionContext<CelebState, RootState>;

const state = {
  name: null,
  photo: null,
  dob: null,
  movies: {
    items: [],
    count: 0
  }
};

const getters = {
  celeb: (state: CelebState) => state
};

const actions = {
  fetchCelebData: async (context: CelebContext, payload: { id: string }) => {
    const data = await API.getCelebData(payload.id);
    context.commit('setCelebData', data);
  },

  fetchCelebMovies: async (context: CelebContext, payload: { id: string }) => {
    const { movies } = context.state;
    const count = movies.count;
    const length = movies.items.length;

    if (count === 0 || (count > length)) {
      const from = length;
      const to = !count || (count - from > 10) ? length + 9 : count;

      const data = await API.getMoviesByCelebId(payload.id, { from, to });
      context.commit('setCelebMovies', data);
    }
  }
};

const mutations = {
  setCelebData: (state: CelebState, info: any) => {
    state.name = info.name;
    state.photo = info.photo;
    state.dob = info.dob;
  },

  setCelebMovies: (state: CelebState, data: any) => {
    state.movies.items = state.movies.items.concat(data.items);
    state.movies.count = data.count;
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
export const fetchCelebMovies = dispatch(celeb.actions.fetchCelebMovies);
