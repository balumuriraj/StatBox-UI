import model from '@/api/falcor/model';

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

export async function getGenreMovies(id: number, range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['genresById', [id], 'movies', 'length']);
  const count = countResponse.json.genresById[id].movies.length;

  const genreResponse = await model.get([
    'genresById', [id],
    ['movies'],
    range, ['id', 'title', 'poster']
  ]);
  const moviesObj = genreResponse.json.genresById[id].movies;
  const items: any[] = [];

  for (const index in moviesObj) {
    if (moviesObj[index] && typeof moviesObj[index].id === 'number') {
      items.push({
        id: moviesObj[index].id,
        title: moviesObj[index].title,
        poster: moviesObj[index].poster
      });
    }
  }

  console.log(genreResponse);
  console.log('genre movies', items, count);

  return { items, count };
}
