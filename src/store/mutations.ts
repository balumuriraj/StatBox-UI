import { ALL_MOVIES, ALL_MOVIES_SUCCESS, USER_BY_ID, MOVIE_BY_ID, CELEB_BY_ID } from './mutation-types';
import { State } from './types';

export const movieMutations = {
  [ALL_MOVIES](state: State) {
    // Called when fetching products
    state.showLoader = true;
  },
  [ALL_MOVIES_SUCCESS](state: State, payload: any) {
    // Called when products have been fetched
    state.showLoader = false;
    // Updates state products
    state.movies = payload;
  },
  [MOVIE_BY_ID](state: State, payload: any) {
    // Called when fetching products
    state.movie = payload;
  },
  [CELEB_BY_ID](state: State, payload: any) {
    // Called when fetching products
    state.celeb = payload;
  },
  [USER_BY_ID](state: State, payload: any) {
    // Called when fetching products
    state.user = payload;
  }
};
