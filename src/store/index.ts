import Vue from 'vue';
import Vuex from 'vuex';
import { movieGetters } from './getters';
import { State } from './types';
import { movieMutations } from './mutations';
import { movieActions } from './actions';

Vue.use(Vuex);

const state: State = {
  movies: [],
  movie: {},
  showLoader: false,
  user: null
};

export default new Vuex.Store({
  state,
  getters: movieGetters,
  mutations: movieMutations,
  actions: movieActions
});
