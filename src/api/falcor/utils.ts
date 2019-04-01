import model from '@/api/falcor/model';
import * as API from '@/api';

async function setReview(movie: any, review: any) {
  const result = await API.updateReview({ ...review });
  const { rating, watchWith, pace, story, rewatch } = result;
  movie.userReview = { rating, watchWith, pace, story, rewatch };
  movie.isReviewed = !!(watchWith || pace || story || rewatch);
}

async function setFavorite(movie: any, value: boolean) {
  console.log(movie, value);
  if (value) {
    const result = await API.addFavorite(movie.id);
    movie.isFavorite = result;
  } else {
    const result = await API.removeFavorite(movie.id);
    movie.isFavorite = result;
  }
}

async function setBookmark(movie: any, value: boolean) {
  if (value) {
    const result = await API.addBookmark(movie.id);
    movie.isBookmarked = result;
  } else {
    const result = await API.removeBookmark(movie.id);
    movie.isBookmarked = result;
  }
}

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
        item.setReview = setReview.bind(item, item);
        item.setFavorite = setFavorite.bind(item, item);
        item.setBookmark = setBookmark.bind(item, item);

        console.log(item);
      }
    }
  }

  return itemsObj;
}
