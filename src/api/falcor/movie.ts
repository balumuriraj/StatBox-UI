import model from '@/api/falcor/model';

export async function getMoviesBetweenDates(
  date1: number,
  date2: number,
  range: { from: number; to: number; }
): Promise<any> {
  const queryString = `date1=${date1}&date2=${date2}`;

  const countResponse = await model.get(['moviesSearches', [queryString], 'length']);
  const count = countResponse.json.moviesSearches[queryString].length;

  if (!count) {
    return {
      items: [],
      count: 0
    };
  }

  const moviesResponse = await model.get([
    'moviesSearches', [queryString], range,
    ['id', 'title', 'releaseDate', 'poster', 'runtime', 'cert']
  ]);

  const moviesObj = moviesResponse.json.moviesSearches[queryString];
  const items: any[] = [];

  for (const index in moviesObj) {
    if (moviesObj[index] && moviesObj[index].id && typeof moviesObj[index].id === 'number') {
      const movie = moviesObj[index];
      items.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        cert: movie.cert,
        runtime: movie.runtime,
        releaseDate: movie.releaseDate
      });
    }
  }

  return { items, count };
}

export async function getMovieData(movieId: number): Promise<any> {
  const response = await model.get([
    'moviesById', [movieId],
    [
      'id', 'title', 'releaseDate', 'poster', 'rating', 'ratingsCount',
      'runtime', 'genre', 'cert', 'cast', 'crew'
    ],
    {length: 5}, ['id', 'type', 'category', 'celeb'],
    ['id', 'name', 'photo']
  ]);

  const result: any = response.json.moviesById[movieId];
  const {
    id, title, releaseDate, poster,
    runtime, genre, cert, rating, ratingsCount
  } = result;
  const cast = [];
  const crew = [];

  for (const index in result.cast) {
    if (result.cast[index] && result.cast[index].id && typeof result.cast[index].id === 'number') {
      const obj = result.cast[index];
      cast.push({
        id: obj.celeb.id,
        name: obj.celeb.name,
        photo: obj.celeb.photo,
        role: obj.type
      });
    }
  }

  for (const index in result.crew) {
    if (result.crew[index] && result.crew[index].id && typeof result.crew[index].id === 'number') {
      const obj = result.crew[index];
      crew.push({
        id: obj.celeb.id,
        name: obj.celeb.name,
        photo: obj.celeb.photo,
        role: obj.type
      });
    }
  }

  return {
    id, title, releaseDate, rating, ratingsCount,
    poster, runtime, genre, cert, cast, crew
  };
}


export async function getMovieMetadata(movieId: number): Promise<any> {
  const response = await model.get([
    'moviesById', [movieId], 'metadata',
    ['ratingBins', 'isFavorite', 'isBookmarked', 'userReview']
  ]);

  const result: any = response.json.moviesById[movieId];

  if (!result.metadata) {
    return {
      isFavorite: false,
      isBookmarked: false,
      ratingBins: null,
      userReview: {
        rating: null,
        watchWith: null,
        pace: null,
        plot: null,
        theme: null
      }
    };
  }

  const { isFavorite, isBookmarked, userReview, ratingBins } = result.metadata;
  return { isFavorite, isBookmarked, userReview, ratingBins };
}
