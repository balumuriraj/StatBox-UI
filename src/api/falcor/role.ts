import model from '@/api/falcor/model';

export async function getMoviesByCelebId(celebId: string, range: { from: number, to: number }): Promise<any> {
  const path = 'moviesByCelebId';
  const countResponse = await model.get([path, [celebId], 'movies', 'length']);
  let count = countResponse.json[path][celebId].movies.length;

  const response = await model.get([
    path, [celebId],
    'movies', range,
    ['id', 'title', 'poster', 'releaseDate', 'rating']
  ]);

  const moviesObj = response.json[path][celebId].movies;
  let items: any[] = [];

  for (const movieId in moviesObj) {
    if (moviesObj[movieId] && moviesObj[movieId].title) {
      const movie = moviesObj[movieId];
      items.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        releaseDate: movie.releaseDate,
        rating: movie.rating
      });
    }
  }

  // remove duplicates
  const movieIds: string[] = [];

  items = items.filter((movie: any) => {
    if (movieIds.indexOf(movie.id) === -1) {
      movieIds.push(movie.id);
      return true;
    } else {
      count--;
    }
  });

  return { items, count };
}
