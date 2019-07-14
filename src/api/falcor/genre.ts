import model from '@/api/falcor/model';
import { applyUserMetadataToMovies } from './utils';

export async function getGenreList(): Promise<any> {
  const countResponse = await model.get(['genresById', 'length']);
  const count = countResponse.json.genresById.length;

  const genresResponse = await model.get([
    'genresById', [{ from: 1, to: count }],
    ['id', 'name', 'movies'], 'length'
  ]);

  const listObj: any = genresResponse.json.genresById;
  const result: any[] = [];

  for (const index in listObj) {
    if (listObj[index] && listObj[index].id && typeof listObj[index].id === 'number') {
      const genre = listObj[index];

      result.push({
        id: genre.id,
        name: genre.name,
        moviesCount: genre.movies.length
      });
    }
  }

  return result;
}

export async function getGenreData(id: number): Promise<any> {
  const genreResponse = await model.get([
    'genresById', [id], 'name'
  ]);
  const name = genreResponse.json.genresById[id].name;

  return { name };
}

export async function getGenreMovies(
  ids: number[],
  range: { from: number; to: number; },
  includeUserMeta: boolean = true
): Promise<any> {
  const countResponse = await model.get(['genresById', ids, 'movies', 'length']);
  let count = 0;

  for (const index in countResponse.json.genresById) {
    if (index !== '$__path') {
      count += countResponse.json.genresById[index].movies.length;
    }
  }

  const key = 'movies';
  const genreResponse = await model.get([
    'genresById', ids,
    [key],
    range, ['id', 'title', 'poster', 'releaseDate', 'rating']
  ]);

  const itemsObj: any = {};
  const movieIds: string[] = []; // to preserve order

  for (const i in genreResponse.json.genresById) {
    if (i !== '$__path') {
      const moviesObj = genreResponse.json.genresById[i][key];

      for (const index in moviesObj) {
        if (moviesObj[index] && typeof moviesObj[index].id === 'number') {
          const movie = moviesObj[index];
          itemsObj[movie.id] = {
            id: movie.id,
            title: movie.title,
            poster: movie.poster,
            releaseDate: movie.releaseDate,
            rating: movie.rating
          };
          movieIds.push(movie.id);
        }
      }
    }
  }

  if (includeUserMeta) {
    await applyUserMetadataToMovies(movieIds, itemsObj);
  }

  const items = movieIds.map((movieId) => itemsObj[movieId]);

  return { items, count };
}

export async function getSortedGenreMovies(
  ids: number[],
  range: { from: number; to: number; },
  sortBy: 'releaseDate' | 'title' | 'rating',
  includeUserMeta: boolean = true
): Promise<any> {
  const genresKey = Array.isArray(ids) ? ids.join(',') : ids;
  const countResponse = await model.get(['sortedMoviesByGenreKeys', genresKey, sortBy, 'length']);
  let count = 0;

  for (const index in countResponse.json.sortedMoviesByGenreKeys) {
    if (index !== '$__path') {
      count += countResponse.json.sortedMoviesByGenreKeys[index][sortBy].length;
    }
  }

  const genreResponse = await model.get([
    'sortedMoviesByGenreKeys', genresKey,
    [sortBy],
    range, ['id', 'title', 'poster', 'releaseDate', 'rating']
  ]);

  const itemsObj: any = {};
  const movieIds: string[] = []; // to preserve order

  for (const i in genreResponse.json.sortedMoviesByGenreKeys) {
    if (i !== '$__path') {
      const moviesObj = genreResponse.json.sortedMoviesByGenreKeys[i][sortBy];

      for (const index in moviesObj) {
        if (moviesObj[index] && typeof moviesObj[index].id === 'number') {
          const movie = moviesObj[index];
          itemsObj[movie.id] = {
            id: movie.id,
            title: movie.title,
            poster: movie.poster,
            releaseDate: movie.releaseDate,
            rating: movie.rating
          };
          movieIds.push(movie.id);
        }
      }
    }
  }

  if (includeUserMeta) {
    await applyUserMetadataToMovies(movieIds, itemsObj);
  }

  const items = movieIds.map((movieId) => itemsObj[movieId]);

  return { items, count };
}
