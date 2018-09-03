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
