import model from '@/api/falcor/model';

export async function getMoviesBetweenDates(date1: number, date2: number, count: number): Promise<any> {
  const queryString = `date1=${date1}&date2=${date2}`;
  return await model.get([
    'moviesSearches', [queryString], { length: count },
    ['id', 'title', 'releaseDate', 'poster', 'runtime', 'cert']
  ])
    .then((response: any) => {
      const moviesObj = response.json.moviesSearches[queryString];
      const result: any[] = [];

      for (const index in moviesObj) {
        if (moviesObj[index] && moviesObj[index].id && typeof moviesObj[index].id === 'number') {
          result.push(moviesObj[index]);
        }
      }

      return result;
    });
}

export async function getMovieById(movieId: string): Promise<any> {
  return await model.get([
    'moviesById', [movieId],
    ['id', 'title', 'description', 'releaseDate', 'poster', 'runtime', 'genre', 'cert', 'cast', 'crew'],
    {length: 5}, ['id', 'type', 'category', 'celeb'],
    ['id', 'name', 'photo']
  ])
    .then((response: any) => {
      const result: any = response.json.moviesById[movieId];
      const { id, title, description, releaseDate, poster, runtime, genre, cert } = result;
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

      return { id, title, description, releaseDate, poster, runtime, genre, cert, cast, crew };
    });
}
