import model from '@/api/falcor/model';

export async function getReviewsCountById(id: string, type: string): Promise<number> {
  const path = type === 'movie' ? 'reviewsByMovieId' : type === 'user' ? 'reviewsByCriticId' : 'reviewsById';

  return await model.get([
    path, [id],
    'reviews', 'length'
  ])
    .then((response: any) => {
      return response.json[path][id].reviews.length;
    });
}

export async function getReviewsById(id: string, type: string, count: number): Promise<any> {
  const path = type === 'movie' ? 'reviewsByMovieId' : type === 'user' ? 'reviewsByCriticId' : 'reviewsById';

  return await model.get([
    path, [id],
    'reviews', { length: count },
    ['url', 'rating', 'critic']
  ])
    .then((response: any) => {
      const data = response.json[path][id].reviews;
      const result: any[] = [];

      for (const index in data) {
        if (data[index]) {
          const review = data[index];

          if (review.rating) {
            result.push({
              url: review.url,
              rating: review.rating,
              critic: review.critic
            });
          }
        }
      }
      return result;
    });
}

export async function getTopRatedMovies(range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['topRatedMovies', 'length']);
  const count = countResponse.json.topRatedMovies.length;

  if (!count) {
    return {
      items: [],
      count: 0
    };
  }

  const response = await model.get([
    'topRatedMovies', range,
    [ 'id', 'title', 'releaseDate', 'poster', 'rating' ]
  ]);

  const moviesObj = response.json.topRatedMovies;
  const items: any[] = [];

  for (const index in moviesObj) {
    if (moviesObj[index] && moviesObj[index].id && typeof moviesObj[index].id === 'number') {
      const movie = moviesObj[index];
      items.push({
        id: movie.id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating,
        releaseDate: movie.releaseDate
      });
    }
  }

  return { items, count };
}
