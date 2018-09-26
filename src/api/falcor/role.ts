import model from '@/api/falcor/model';

export async function getRoleCountByMovieId(movieId: string, type: string): Promise<number> {
  const path = type === 'cast' ? 'castByMovieId' : 'crewByMovieId';

  return await model.get([
    path, [movieId],
    'roles', 'length'
  ])
    .then((response: any) => {
      return response.json[path][movieId].roles.length;
    });
}

export async function getRoleByMovieId(movieId: string, type: string, count: number): Promise<any>  {
  const path = type === 'cast' ? 'castByMovieId' : 'crewByMovieId';

  return await model.get([
    path, [movieId],
    'roles', { length: count },
    ['id', 'type', 'category', 'celeb'],
    ['id', 'name', 'photo']
  ])
    .then((response: any) => {
      const data = response.json[path][movieId].roles;
      const result: any[] = [];

      for (const index in data) {
        if (data[index]) {
          const role = data[index];

          if (role.celeb && role.celeb.name) {
            result.push({
              id: role.celeb.id,
              name: role.celeb.name,
              photo: role.celeb.photo,
              role: role.type
            });
          }
        }
      }
      return result;
    });
}

export async function getMoviesByCelebId(celebId: string, range: { from: number, to: number }): Promise<any> {
  const path = 'moviesByCelebId';
  const countResponse = await model.get([path, [celebId], 'movies', 'length']);
  let count = countResponse.json[path][celebId].movies.length;

  const response = await model.get([
    path, [celebId],
    'movies', range,
    ['id', 'title', 'poster', 'rating']
  ]);

  const moviesObj = response.json[path][celebId].movies;
  const items: any[] = [];

  for (const movieId in moviesObj) {
    if (moviesObj[movieId] && moviesObj[movieId].title) {
      const movie = moviesObj[movieId];
      items.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating
      });
    }
  }

  // remove duplicates
  const movieIds: string[] = [];

  items.filter((movie: any) => {
    if (movieIds.indexOf(movie.id) === -1) {
      movieIds.push(movie.id);
      return true;
    } else {
      count--;
    }
  });

  return { items, count };
}
