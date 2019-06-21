import model from '@/api/falcor/model';
import { applyUserMetadataToMovies } from './utils';

export async function getMoviesBetweenDates(
  date1: number,
  date2: number,
  range: { from: number; to: number; },
  includeUserMeta: boolean = true
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

  if (range.to > count - 1) {
    range.to = count - 1;
  }

  const moviesResponse = await model.get([
    'moviesSearches', [queryString], range,
    ['id', 'title', 'releaseDate', 'poster', 'runtime', 'cert']
  ]);

  const moviesObj = moviesResponse.json.moviesSearches[queryString];
  const itemsObj: any = {};

  for (const index in moviesObj) {
    if (moviesObj[index] && moviesObj[index].id && typeof moviesObj[index].id === 'number') {
      const movie = moviesObj[index];
      itemsObj[movie.id] = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        cert: movie.cert,
        runtime: movie.runtime,
        releaseDate: movie.releaseDate
      };
    }
  }

  const movieIds = Object.keys(itemsObj);

  if (includeUserMeta) {
    await applyUserMetadataToMovies(movieIds, itemsObj);
  }

  const items = movieIds.map((movieId) => itemsObj[movieId]);

  return { items, count };
}

export async function getMovieData(movieId: number): Promise<any> {
  const response = await model.get([
    'moviesById', [movieId],
    [
      'id', 'title', 'releaseDate', 'poster', 'rating', 'ratingsCount',
      'runtime', 'genre', 'cert'
    ]
  ]);

  const result: any = response.json.moviesById[movieId];
  const {
    id, title, releaseDate, poster,
    runtime, genre, cert, rating, ratingsCount
  } = result;

  return {
    id, title, releaseDate, rating, ratingsCount,
    poster, runtime, genre, cert
  };
}


export async function getMovieMetadata(movieId: number): Promise<any> {
  const response = await model.get([
    'moviesById', [movieId], 'metadata',
    ['cast', 'crew', 'ratingBins', 'attributes'],
    {length: 18}, ['id', 'type', 'category', 'celeb'],
    ['id', 'name', 'photo']
  ]);

  const result: any = response.json.moviesById[movieId].metadata;
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

  const attributes = {
    watchWith: {
      friends: 0,
      self: 0,
      family: 0
    },
    pace: {
      slow: 0,
      fast: 0
    },
    story: {
      simple: 0,
      complex: 0
    },
    rewatch: {
      yes: 0,
      no: 0
    }
  };

  if (result.attributes) {
    const attr = result.attributes;

    if (attr) {
      const { friends, family, self } = attr.watchWith;
      if (friends || family || self) {
        const watchWithTotal = friends + family + self;
        attributes.watchWith.family = Math.round(family / watchWithTotal * 100);
        attributes.watchWith.friends = Math.round(friends / watchWithTotal * 100);
        attributes.watchWith.self = Math.round(self / watchWithTotal * 100);
      }

      const { slow, fast } = attr.pace;
      if (slow || fast) {
        const paceTotal = slow + fast;
        attributes.pace.slow = Math.round(slow / paceTotal * 100);
        attributes.pace.fast = Math.round(fast / paceTotal * 100);
      }

      const { simple, complex } = attr.story;
      if (simple || complex) {
        const storyTotal = simple + complex;
        attributes.story.simple = Math.round(simple / storyTotal * 100);
        attributes.story.complex = Math.round(complex / storyTotal * 100);
      }

      const { yes, no } = attr.rewatch;
      if (yes || no) {
        const rewatchTotal = yes + no;
        attributes.rewatch.yes = Math.round(yes / rewatchTotal * 100);
        attributes.rewatch.no = Math.round(no / rewatchTotal * 100);
      }
    }
  }

  const { ratingBins } = result;
  const item = { attributes, ratingBins, cast, crew };

  return item;
}

export async function getMovieCountByYears(): Promise<any> {
  const response = await model.get([
    'moviesCountByYears'
  ]);

  const result: any = response.json.moviesCountByYears;
  return result;
}

export async function getMoviesByYear(
  year: number,
  range: { from: number; to: number; },
  includeUserMeta: boolean = true
): Promise<any> {
  const countResponse = await model.get(['moviesByYear', [year], 'length']);
  const count = countResponse.json.moviesByYear[year].length;

  if (!count) {
    return {
      items: [],
      count: 0
    };
  }

  if (range.to > count - 1) {
    range.to = count - 1;
  }

  const moviesResponse = await model.get([
    'moviesByYear', [year], range,
    ['id', 'title', 'releaseDate', 'poster', 'runtime', 'cert']
  ]);

  const moviesObj = moviesResponse.json.moviesByYear[year];
  const itemsObj: any = {};

  for (const index in moviesObj) {
    if (moviesObj[index] && moviesObj[index].id && typeof moviesObj[index].id === 'number') {
      const movie = moviesObj[index];
      itemsObj[movie.id] = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        cert: movie.cert,
        runtime: movie.runtime,
        releaseDate: movie.releaseDate
      };
    }
  }

  const movieIds = Object.keys(itemsObj);

  if (includeUserMeta) {
    await applyUserMetadataToMovies(movieIds, itemsObj);
  }

  const items = movieIds.map((movieId) => itemsObj[movieId]);

  return { items, count };
}


export async function getMoviesByFilter(
  genres: string[],
  years: number[],
  sortBy: string,
  range: { from: number; to: number; },
  includeUserMeta: boolean = true
): Promise<any> {
  const filter = `genres=${genres.join(',')}&years=${years}&sortBy=${sortBy || ''}`;
  const countResponse = await model.get(['moviesByFilter', filter, 'length']);

  const count = countResponse.json.moviesByFilter[filter].length;

  if (!count) {
    return {
      items: [],
      count: 0
    };
  }

  if (range.to > count - 1) {
    range.to = count - 1;
  }

  const moviesResponse = await model.get([
    'moviesByFilter', filter, range,
    ['id', 'title', 'poster', 'releaseDate', 'rating']
  ]);

  const moviesObj = moviesResponse.json.moviesByFilter[filter];
  const itemsObj: any = {};
  const movieIds: string[] = []; // to preserve order

  for (const index in moviesObj) {
    if (moviesObj[index] && moviesObj[index].id && typeof moviesObj[index].id === 'number') {
      const movie = moviesObj[index];
      itemsObj[movie.id] = {
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        releaseDate: movie.releaseDate,
        year: movie.releaseDate && new Date(movie.releaseDate).getFullYear(),
        rating: movie.rating && Math.round(movie.rating * 100) / 100
      };
      movieIds.push(movie.id);
    }
  }

  if (includeUserMeta) {
    await applyUserMetadataToMovies(movieIds, itemsObj);
  }

  const items = movieIds.map((movieId) => itemsObj[movieId]);

  return { items, count };
}

