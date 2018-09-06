import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/modules/auth';
import { home } from './modules/home';
import { celeb } from './modules/celeb';
import { movie } from './modules/movie';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, home, celeb, movie },
  strict: true
});
