import model from '@/api/falcor/model';

export async function getMoviesByYears(years: number[]): Promise<any> {
  return await model.get([
    'moviesByYear', years,
    'movies', { from: 0, to: 9 },
    ['id', 'title', 'date', 'poster', 'runtime', 'rating']
  ])
    .then((response: any) => {
      const yearsObj = response.json.moviesByYear;
      const result: any[] = [];

      for (const year of years) {
        const moviesObj = yearsObj[year].movies;

        for (const movieId in moviesObj) {
          if (moviesObj[movieId] && moviesObj[movieId].title) {
            result.push(moviesObj[movieId]);
          }
        }
      }

      return result;
    });
}

export async function getMoviesCountByYearMonth(year: number, month: number): Promise<number> {
  return await model.get([
    'moviesByYearMonth', [year], [month],
    'movies', 'length'
  ])
    .then((response: any) => {
      return response.json.moviesByYearMonth[year][month].movies.length;
    });
}

export async function getMoviesByYearMonth(year: number, month: number, count: number): Promise<any> {
  return await model.get([
    'moviesByYearMonth', [year], [month],
    'movies', { length: count },
    ['id', 'title', 'date', 'poster', 'runtime', 'cert']
  ])
    .then((response: any) => {
      const moviesObj = response.json.moviesByYearMonth[year][month].movies;
      const result: any[] = [];

      for (const movieId in moviesObj) {
        if (moviesObj[movieId] && moviesObj[movieId].title) {
          result.push(moviesObj[movieId]);
        }
      }

      return result;
    });
}

export async function getMoviesBetweenDates(date1: number, date2: number, count: number): Promise<any> {
  return await model.get([
    'moviesBetweenDates', [date1], [date2],
    'movies', { length: count },
    ['id', 'title', 'date', 'poster', 'runtime', 'cert']
  ])
    .then((response: any) => {
      const moviesObj = response.json.moviesBetweenDates[date1][date2].movies;
      const result: any[] = [];

      for (const movieId in moviesObj) {
        if (moviesObj[movieId] && moviesObj[movieId].title) {
          result.push(moviesObj[movieId]);
        }
      }

      return result;
    });
}

export async function getMovieById(movieId: string): Promise<any> {
  return await model.get([
    'moviesById', [movieId],
    ['id', 'title', 'description', 'date', 'poster', 'runtime', 'genre', 'cert']
  ])
    .then((response: any) => {
      const result: any = response.json.moviesById[movieId];
      const { id, title, description, date, poster, runtime, genre, cert } = result;

      return { id, title, description, date, poster, runtime, genre, cert };
    });
}
