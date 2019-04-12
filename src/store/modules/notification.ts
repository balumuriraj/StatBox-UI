import { ActionContext } from 'vuex';
import * as API from '@/api';
import { RootState } from '@/store/interfaces';

type NotificationContext = ActionContext<any, RootState>;

const state: any = {
  message: null,
  isLoading: false,
  isError: false
};

const actions = {
  set: (
    context: NotificationContext,
    payload: { message: string, isLoading: boolean, isError: boolean }
  ) => {
    context.commit('set', payload);

    if (!payload.isLoading) {
      setTimeout(() => {
        context.commit('reset');
      }, 5000);
    }
  },

  reset: (context: NotificationContext) => {
    context.commit('reset');
  }
};

const mutations = {
  set: (state: any, payload: { message: string, isLoading: boolean, isError: boolean }) => {
    state.message = payload.message;
    state.isLoading = payload.isLoading;
    state.isError = payload.isError;
  },

  reset: (state: any) => {
    state.message = null;
    state.isLoading = false;
    state.isError = false;
  }
};

export const notification = {
  namespaced: true,
  state,
  // getters,
  mutations,
  actions
};
