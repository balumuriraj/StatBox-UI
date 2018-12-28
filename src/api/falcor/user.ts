import model from '@/api/falcor/model';

export async function getUserMetadata(id: number) {
  const range = { from: 0, to: 4 };
  const metdataResponse = await model.get([
    'usersById', [id],
    'metadata',
    ['genres', 'ratingBins', 'movieMinutes', 'moviesCount', 'topDirectors', 'topActors'], range,
    ['celeb', 'rating'],
    ['id', 'name', 'photo']
  ]);
  const metadataObj = metdataResponse.json.usersById[id].metadata;

  const topActors = [];
  const topDirectors = [];

  const topActorsObj = metadataObj.topActors;
  for (const prop in topActorsObj) {
    if (topActorsObj[prop] && 'celeb' in topActorsObj[prop]) {
      const { celeb, rating } = topActorsObj[prop];
      const { id, name, photo } = celeb;
      topActors.push({ id, name, photo, rating});
    }
  }

  const topDirectorsObj = metadataObj.topDirectors;
  for (const prop in topDirectorsObj) {
    if (topDirectorsObj[prop] && 'celeb' in topDirectorsObj[prop]) {
      const { celeb, rating } = topDirectorsObj[prop];
      const { id, name, photo } = celeb;
      topDirectors.push({ id, name, photo, rating});
    }
  }

  return {
    genres: metadataObj.genres,
    ratingBins: metadataObj.ratingBins,
    moviesCount: metadataObj.moviesCount,
    movieMinutes: metadataObj.movieMinutes,
    topActors,
    topDirectors
  };
}

export async function getBookmarks(id: number, range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['usersById', [id], 'bookmarks', 'length']);
  const bookmarks = countResponse.json.usersById[id].bookmarks;
  const count = bookmarks && bookmarks.length;

  const bookmarksResponse = await model.get([
    'usersById', [id],
    'bookmarks',
    range, ['id', 'title', 'poster', 'releaseDate']
  ]);
  const bookmarksObj = bookmarksResponse.json.usersById[id].bookmarks;
  const items: any[] = [];

  for (const index in bookmarksObj) {
    if (bookmarksObj[index] && typeof bookmarksObj[index].id === 'number') {
      items.push({
        id: bookmarksObj[index].id,
        title: bookmarksObj[index].title,
        poster: bookmarksObj[index].poster,
        releaseDate: bookmarksObj[index].releaseDate
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
    range, ['id', 'title', 'poster', 'releaseDate']
  ]);
  const favObj = favResponse.json.usersById[id].favorites;
  const items: any[] = [];

  for (const index in favObj) {
    if (favObj[index] && typeof favObj[index].id === 'number') {
      items.push({
        id: favObj[index].id,
        title: favObj[index].title,
        poster: favObj[index].poster,
        releaseDate: favObj[index].releaseDate
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
      poster: review.movie.poster,
      releaseDate: review.movie.releaseDate,
      rating: review.movie.rating,
      userReview: review.userReview
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
    ['id', 'movie', 'rating', 'watchWith', 'pace', 'rewatch', 'story'],
    ['id', 'title', 'poster', 'releaseDate', 'rating']
  ]);

  const reviewsObj = reviewsResponse.json.usersById[id].reviews;
  const items: any[] = [];

  for (const index in reviewsObj) {
    if (reviewsObj[index] && typeof reviewsObj[index].id === 'number') {
      const review = reviewsObj[index];
      const movie = review.movie;
      const { rating, watchWith, pace, story, rewatch } = review;

      items.push({
        id: review.id,
        movie: {
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
          releaseDate: movie.releaseDate,
          rating: movie.rating
        },
        userReview: { rating, watchWith, pace, story, rewatch }
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
    ['rating', 'watchWith', 'pace', 'rewatch', 'story'],
    [['reviews', 'lastUpdatedIndex']]
  );

  const reviews = response.json.usersById[review.userId].reviews;
  const result = reviews[reviews.lastUpdatedIndex];
  const { rating, watchWith, pace, rewatch, story } = result;

  return { rating, watchWith, pace, rewatch, story };
}
