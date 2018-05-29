import { ALL_MOVIES, ALL_MOVIES_SUCCESS, USER_BY_ID, CELEB_BY_ID } from '@/store/mutation-types';
import { getMovies, getUser, getMovie, getCeleb } from '@/api/index';
import { MOVIE_BY_ID } from './mutation-types';

export const movieActions = {
  allMovies(context: any) {
    context.commit(ALL_MOVIES);
    getMovies().then((movies) => {
      context.commit(ALL_MOVIES_SUCCESS, movies);
    });
  },

  userById(context: any, id: number) {
    getUser(id).then((user) => {
      context.commit(USER_BY_ID, user);
    });
  },

  celebById(context: any, id: number) {
    getCeleb(id).then((celeb) => {
      context.commit(CELEB_BY_ID, celeb);
    });
  },

  movieById(context: any, id: number) {
    getMovie(id).then((movie) => {
      context.commit(MOVIE_BY_ID, movie);
    });
  }
};
