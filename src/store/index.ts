import Vue from 'vue';
import Vuex from 'vuex';
import { movieGetters } from './getters';
import { State } from './types';
import { movieMutations } from './mutations';
import { movieActions } from './actions';
import user from './modules/user';
import { home } from './modules/home';
import { celeb } from './modules/celeb';
import { movie } from './modules/movie';

Vue.use(Vuex);

// const state: State = {
//   movies: [],
//   movie: {},
//   celeb: {},
//   showLoader: false,
//   user: null
// };

export default new Vuex.Store({
  // state,
  // getters: movieGetters,
  // mutations: movieMutations,
  // actions: movieActions,
  modules: { user, home, celeb, movie },
  strict: true
});
