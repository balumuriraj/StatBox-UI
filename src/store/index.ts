import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/modules/auth';
import { home } from './modules/home';
import { celeb } from './modules/celeb';
import { movie } from './modules/movie';
import { genre } from './modules/genre';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { auth, home, celeb, movie, genre },
  getters: {
    userId(state) {
      return state.auth.user.id;
    }
  },
  actions: {
    initialiseStore(context) {
      context.commit('initialiseStore');
    }
  },
  mutations: {
    initialiseStore(state) {
      const localStore = localStorage.getItem('store');

      if (localStore) {
        const payload = JSON.parse(localStore);
        this.replaceState(Object.assign(state, payload), payload);
      }
    }
  },
  strict: true
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  // Store the state object as a JSON
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
