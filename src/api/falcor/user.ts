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

      if (id) {
        topActors.push({ id, name, photo, rating});
      }
    }
  }

  const topDirectorsObj = metadataObj.topDirectors;
  for (const prop in topDirectorsObj) {
    if (topDirectorsObj[prop] && 'celeb' in topDirectorsObj[prop]) {
      const { celeb, rating } = topDirectorsObj[prop];
      const { id, name, photo } = celeb;

      if (id) {
        topDirectors.push({ id, name, photo, rating});
      }
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

export async function addBookmark(movieId: number) {
  const response = await model.call(
    ['addBookmark'], // call path
    [movieId], // args
    [['isBookmarked']], // refPaths (moviesById)
    [['userBookmarks', 'length']] // thisPaths (usersById)
  );

  const bookmarks = response.json.userBookmarks;
  console.log(bookmarks);

  return true;
}

export async function addFavorite(movieId: number) {
  console.log('addFavorite movieId', movieId);
  const response = await model.call(
    ['addFavorite'],
    [movieId],
    [['isFavorite']],
    [['userFavorites', 'length']]
  );

  const favorites = response.json;
  console.log(favorites);

  return true;
}

export async function removeBookmark(movieId: number) {
  const response =  await model.call(
    ['removeBookmark'],
    [movieId],
    [],
    [['userBookmarks', 'length']]
  );

  const bookmarks = response.json;
  console.log(bookmarks);

  return false;
}

export async function removeFavorite(movieId: number) {
  console.log('removeFavorite movieId', movieId);
  const response = await model.call(
    ['removeFavorite'],
    [movieId],
    [],
    [['userFavorites', 'length']]
  );

  const favorites = response.json.userFavorites;
  console.log(favorites);

  return false;
}

export async function updateReview(review: any) {
  const response = await model.call(
    ['updateReview'],
    [review],
    ['rating', 'watchWith', 'pace', 'rewatch', 'story'],
    [['reviews', 'lastUpdatedIndex']]
  );

  const reviews = response.json.userReviews;
  const result = reviews[reviews.lastUpdatedIndex];
  const { rating, watchWith, pace, rewatch, story } = result;

  return { rating, watchWith, pace, rewatch, story };
}
