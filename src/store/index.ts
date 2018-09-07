import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/modules/auth';
import { home } from './modules/home';
import { celeb } from './modules/celeb';
import { movie } from './modules/movie';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { auth, home, celeb, movie },
  actions: {
    initialiseStore(context) {
      context.commit('initialiseStore');
    }
  },
  mutations: {
    initialiseStore(state) {
      const localStore = localStorage.getItem('store');

      if (localStore) {
        this.replaceState(state, JSON.parse(localStore));
      }
    }
  },
  strict: true
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
