import model from '@/api/falcor/model';

export async function applyUserMetadataToMovies(movieIds: string[], itemsObj: any) {
  const response = await model.get([
    'moviesById', movieIds, 'metadata',
    ['isFavorite', 'isBookmarked', 'userReview']
  ]);
  const result = response.json.moviesById;

  for (const movieId in result) {
    if (result[movieId] && result[movieId].metadata) {
      const metadata = result[movieId].metadata;

      if (itemsObj[movieId]) {
        const {isFavorite, isBookmarked, userReview} = metadata;

        itemsObj[movieId].isFavorite = isFavorite;
        itemsObj[movieId].isBookmarked = isBookmarked;
        itemsObj[movieId].userReview = userReview;
      }
    }
  }

  return itemsObj;
}
