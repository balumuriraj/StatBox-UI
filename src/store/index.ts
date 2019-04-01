import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from '@/store/modules/auth';
import { home } from './modules/home';
import { genre } from './modules/genre';
import { RootState } from './interfaces';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state: {
    showModal: false,
    modalMovie: null
  },
  modules: { auth, home, genre },
  actions: {
    toggleModal(context, payload) {
      context.commit('toggleModal', payload && payload.movie);
    },
    initialiseStore(context) {
      context.commit('initialiseStore');
    }
  },
  mutations: {
    toggleModal(state, movie) {
      state.modalMovie = movie || null;
      state.showModal = !state.showModal;
    },
    initialiseStore(state) {
      const localStore = sessionStorage.getItem('store');

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
  sessionStorage.setItem('store', JSON.stringify(state));
});

export default store;
