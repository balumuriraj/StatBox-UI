import Vue from 'vue';
import Vuex from 'vuex';
import { movieGetters } from './getters';
import { State } from './types';
import { movieMutations } from './mutations';
import { movieActions } from './actions';
import user from './modules/user';

Vue.use(Vuex);

const state: State = {
  movies: [],
  movie: {},
  celeb: {},
  showLoader: false,
  user: null
};

export default new Vuex.Store({
  state,
  getters: movieGetters,
  mutations: movieMutations,
  actions: movieActions,
  modules: { user }
});
