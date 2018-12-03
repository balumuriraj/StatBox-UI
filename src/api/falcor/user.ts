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

  console.log('bookmarks', items, count);

  return { items, count };
}

export async function getSeen(id: number, range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['usersById', [id], 'seen', 'length']);
  const seen = countResponse.json.usersById[id].seen;
  const count = seen && seen.length;

  const seenResponse = await model.get([
    'usersById', [id],
    'seen',
    range, ['id', 'title', 'poster']
  ]);
  const seenObj = seenResponse.json.usersById[id].seen;
  const items: any[] = [];

  for (const index in seenObj) {
    if (seenObj[index] && typeof seenObj[index].id === 'number') {
      items.push({
        id: seenObj[index].id,
        title: seenObj[index].title,
        poster: seenObj[index].poster
      });
    }
  }

  console.log('seen', items, count);

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

  console.log('reviewed', items, count);

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

  console.log('addBookmark: ', response);
  const bookmarks = response.json.usersById[userId].bookmarks;
  const length = bookmarks.length;

  return bookmarks[length - 1].isBookmarked;
}

export async function addSeen(userId: number, movieId: number) {
  const response = await model.call(
    ['usersById', userId, 'addSeen'],
    [movieId],
    [['isSeen']],
    [['seen', 'length']]
  );

  console.log('addSeen: ', response);
  const seen = response.json.usersById[userId].seen;
  const length = seen.length;

  return seen[length - 1].isSeen;
}

export async function removeBookmark(userId: number, movieId: number) {
  const response =  await model.call(
    ['usersById', userId, 'removeBookmark'],
    [movieId],
    [],
    [['bookmarks', 'length']]
  );

  console.log('removeBookmark: ', response);
  const bookmarks = response.json.usersById[userId].bookmarks;
  const length = bookmarks.length;

  return false;
}

export async function removeSeen(userId: number, movieId: number) {
  const response = await model.call(
    ['usersById', userId, 'removeSeen'],
    [movieId],
    [],
    [['seen', 'length']]
  );

  console.log('removeSeen: ', response);
  const seen = response.json.usersById[userId].seen;
  const length = seen.length;

  return false;
}

export async function updateReview(review: any) {
  const response = await model.call(
    ['usersById', review.userId, 'updateReview'],
    [review],
    [['rating', 'watchWith', 'pace', 'theme', 'plot']],
    [['reviews', 'lastUpdatedIndex']]
  );

  console.log('updateReview: ', response);
  const reviews = response.json.usersById[review.userId].reviews;
  const result = reviews[reviews.lastUpdatedIndex];
  const { rating, watchWith, pace, theme, plot } = result;

  return { rating, watchWith, pace, theme, plot };
}
