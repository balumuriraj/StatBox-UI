import model from '@/api/falcor/model';

export async function getBookmarks(id: number, range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['usersById', [id], 'bookmarks', 'length']);
  const bookmarks = countResponse.json.usersById[id].bookmarks;
  const count = bookmarks && bookmarks.length;

  const bookmarksResponse = await model.get([
    'usersById', [id],
    'bookmarks',
    range, ['id', 'title', 'poster']
  ]);
  const bookmarksObj = bookmarksResponse.json.usersById[id].bookmarks;
  const items: any[] = [];

  for (const index in bookmarksObj) {
    if (bookmarksObj[index] && typeof bookmarksObj[index].id === 'number') {
      items.push({
        id: bookmarksObj[index].id,
        title: bookmarksObj[index].title,
        poster: bookmarksObj[index].poster
      });
    }
  }

  return { items, count };
}

export async function getFavorites(id: number, range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['usersById', [id], 'favorites', 'length']);
  const favorites = countResponse.json.usersById[id].favorites;
  const count = favorites && favorites.length;

  const favResponse = await model.get([
    'usersById', [id],
    'favorites',
    range, ['id', 'title', 'poster']
  ]);
  const favObj = favResponse.json.usersById[id].favorites;
  const items: any[] = [];

  for (const index in favObj) {
    if (favObj[index] && typeof favObj[index].id === 'number') {
      items.push({
        id: favObj[index].id,
        title: favObj[index].title,
        poster: favObj[index].poster
      });
    }
  }

  return { items, count };
}

export async function getReviewed(id: number, range: { from: number; to: number; }): Promise<any> {
  const { items: reviews, count } = await getUserReviews(id, range);
  const items: any[] = [];

  reviews.forEach((review: any) => {
    items.push({
      id: review.movie.id,
      title: review.movie.title,
      poster: review.movie.poster
    });
  });

  return { items, count };
}

export async function getUserReviews(id: number, range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['usersById', [id], 'reviews', 'length']);
  const reviews = countResponse.json.usersById[id].reviews;
  const count = reviews && reviews.length;

  const reviewsResponse = await model.get([
    'usersById', [id],
    'reviews', range,
    ['id', 'movie', 'rating'],
    ['id', 'title', 'poster', 'rating']
  ]);

  const reviewsObj = reviewsResponse.json.usersById[id].reviews;
  const items: any[] = [];

  for (const index in reviewsObj) {
    if (reviewsObj[index] && typeof reviewsObj[index].id === 'number') {
      const review = reviewsObj[index];
      const movie = review.movie;

      items.push({
        id: review.id,
        movie: {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          rating: movie.rating
        },
        rating: review.rating
      });
    }
  }

  return { items, count };
}

export async function addBookmark(userId: number, movieId: number) {
  const response = await model.call(
    ['usersById', userId, 'addBookmark'], // call path
    [movieId], // args
    [['isBookmarked']], // refPaths (moviesById)
    [['bookmarks', 'length']] // thisPaths (usersById)
  );

  const bookmarks = response.json.usersById[userId].bookmarks;
  const length = bookmarks.length;

  return true;
}

export async function addFavorite(userId: number, movieId: number) {
  const response = await model.call(
    ['usersById', userId, 'addFavorite'],
    [movieId],
    [['isFavorite']],
    [['favorites', 'length']]
  );

  const favorites = response.json.usersById[userId].favorites;
  const length = favorites.length;

  return true;
}

export async function removeBookmark(userId: number, movieId: number) {
  const response =  await model.call(
    ['usersById', userId, 'removeBookmark'],
    [movieId],
    [],
    [['bookmarks', 'length']]
  );

  const bookmarks = response.json.usersById[userId].bookmarks;
  const length = bookmarks.length;

  return false;
}

export async function removeFavorite(userId: number, movieId: number) {
  const response = await model.call(
    ['usersById', userId, 'removeFavorite'],
    [movieId],
    [],
    [['favorites', 'length']]
  );

  const favorites = response.json.usersById[userId].favorites;
  const length = favorites.length;

  return false;
}

export async function updateReview(review: any) {
  const response = await model.call(
    ['usersById', review.userId, 'updateReview'],
    [review],
    [['rating', 'watchWith', 'pace', 'theme', 'plot']],
    [['reviews', 'lastUpdatedIndex']]
  );

  const reviews = response.json.usersById[review.userId].reviews;
  const result = reviews[reviews.lastUpdatedIndex];
  const { rating, watchWith, pace, theme, plot } = result;

  return { rating, watchWith, pace, theme, plot };
}
