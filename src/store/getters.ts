export const movieGetters = {
  // all movies
  allMovies: (state: any, getters: any) => {
    return state.movies;
  },

  movieById: (state: any, getters: any) => {
    return state.movie;
  },

  userById: (state: any, getters: any) => {
    return state.user;
  }
};
