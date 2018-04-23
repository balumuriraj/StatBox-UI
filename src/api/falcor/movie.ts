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
    ['title', 'date', 'poster', 'runtime', 'cert']
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

export async function getMovieById(movieId: number): Promise<any> {
  return await model.get([
    'moviesById', [movieId],
    ['title', 'description', 'date', 'poster', 'runtime', 'genre', 'cert']
  ])
    .then((response: any) => {
      const result: any = response.json.moviesById[movieId];
      const { title, description, date, poster, runtime, genre, cert } = result;

      return { title, description, date, poster, runtime, genre, cert };
    });
}
