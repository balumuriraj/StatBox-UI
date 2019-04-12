import model from '@/api/falcor/model';
import { applyUserMetadataToMovies } from './utils';

export async function getMoviesByCelebId(
  celebId: string,
  range: { from: number, to: number },
  includeUserMeta: boolean = true
): Promise<any> {
  const path = 'moviesByCelebId';
  const countResponse = await model.get([path, [celebId], 'movies', 'length']);
  const count = countResponse.json[path][celebId].movies.length;

  const response = await model.get([
    path, [celebId],
    'movies', range,
    ['id', 'title', 'poster', 'cert', 'releaseDate', 'rating']
  ]);

  const moviesObj = response.json[path][celebId].movies;
  const itemsObj: any = {};
  const movieIds: string[] = []; // to preserve order

  for (const movieId in moviesObj) {
    if (movieId !== '$__path') {
      const movie = moviesObj[movieId];

      if (movie) {
        itemsObj[movie.id] = {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          releaseDate: movie.releaseDate,
          cert: movie.cert,
          rating: movie.rating
        };
        movieIds.push(movie.id);
      }
    }
  }

  if (includeUserMeta) {
    await applyUserMetadataToMovies(movieIds, itemsObj);
  }

  const items = movieIds.map((movieId) => itemsObj[movieId]);

  return { items, count };
}
