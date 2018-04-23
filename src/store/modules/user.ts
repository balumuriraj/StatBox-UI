import Vue from 'vue';
import auth from '@/auth';

const state = {
  user: null
};

const getters = {
  user: (state: any) => state.user,
  isLogged: (state: any) => (state.user !== null)
};

const mutations = {
  setUser: (state: any, user: any) => {
    state.user = user;
  }
};

const actions = {
  setCurrentUser: (context: any) => {
    context.commit('setUser', auth.user());
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
