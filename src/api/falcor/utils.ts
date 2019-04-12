import model from '@/api/falcor/model';

export async function applyUserMetadataToMovies(movieIds: number[] | string[], itemsObj: any) {
  const response = await model.get([
    'moviesById', movieIds, 'metadata',
    ['isFavorite', 'isBookmarked', 'userReview']
  ]);
  const result = response.json.moviesById;

  for (const movieId in result) {
    if (result[movieId] && result[movieId].metadata) {
      const metadata = result[movieId].metadata;
      const item = itemsObj[movieId];

      if (item) {
        const {isFavorite, isBookmarked, userReview} = metadata;

        item.isFavorite = isFavorite;
        item.isBookmarked = isBookmarked;
        item.isReviewed = !!(userReview && (
          userReview.watchWith || userReview.pace || userReview.story || userReview.rewatch
        ));

        if (item.userReview) {
          item.userReview.rating = userReview && userReview.rating;
          item.userReview.watchWith = userReview && userReview.watchWith;
          item.userReview.pace = userReview && userReview.pace;
          item.userReview.story = userReview && userReview.story;
          item.userReview.rewatch = userReview && userReview.rewatch;
        } else {
          item.userReview = userReview;
        }
      }
    }
  }

  return itemsObj;
}
