import model from '@/api/falcor/model';

export async function getUser(id: number): Promise<any> {
  const reviews = await getUserReviews(id);
  console.log('reviews: ', reviews);

  return await model.get([
    'usersById', [id],
    ['id', 'authId', 'bookmarks', 'seen'],
    {length: 10}, ['id', 'title', 'poster', 'rating']
  ])
    .then((response: any) => {
      const userInfo = response.json.usersById[id];
      const bookmarks: any[] = [];
      const seen: any[] = [];
      const reviewed: any[] = [];

      console.log(userInfo);

      for (const index in userInfo.bookmarks) {
        if (userInfo.bookmarks[index] && typeof userInfo.bookmarks[index].id === 'number') {
          bookmarks.push({
            id: userInfo.bookmarks[index].id,
            title: userInfo.bookmarks[index].title,
            poster: userInfo.bookmarks[index].poster
          });
        }
      }

      for (const index in userInfo.seen) {
        if (userInfo.seen[index] && typeof userInfo.seen[index].id === 'number') {
          seen.push({
            id: userInfo.seen[index].id,
            title: userInfo.seen[index].title,
            poster: userInfo.seen[index].poster
          });
        }
      }

      reviews.forEach((review: any) => {
        reviewed.push({
          id: review.movie.id,
          title: review.movie.title,
          poster: review.movie.poster
        });
      });

      return {
        id: userInfo.id,
        authId: userInfo.authId,
        bookmarks,
        seen,
        reviewed
      };
    });
}

export async function getUserReviews(id: number): Promise<any> {
  return await model.get([
    'usersById', [id],
    'reviews',
    {length: 10}, ['id', 'movie', 'rating'],
    ['id', 'title', 'poster', 'rating']
  ])
    .then((response: any) => {
      const userInfo = response.json.usersById[id];
      const reviews: any[] = [];

      for (const index in userInfo.reviews) {
        if (userInfo.reviews[index] && typeof userInfo.reviews[index].id === 'number') {
          const review = userInfo.reviews[index];
          const movie = review.movie;

          reviews.push({
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

      return reviews;
    });
}

export async function addBookmark(userId: number, movieId: number) {
  return await model.call(
    ['usersById', userId, 'addBookmark'], // call path
    [movieId], // args
    [['isBookmarked']], // refPaths (moviesById)
    [['bookmarks', 'length']] // thisPaths (usersById)
  )
    .then((response: any) => {
      console.log('addBookmark: ', response);
      const bookmarks = response.json.usersById[userId].bookmarks;
      const length = bookmarks.length;

      return bookmarks[length - 1].isBookmarked;
    });
}

export async function addSeen(userId: number, movieId: number) {
  return await model.call(
    ['usersById', userId, 'addSeen'],
    [movieId],
    [['isSeen']],
    [['seen', 'length']]
  )
    .then((response: any) => {
      console.log('addSeen: ', response);
      const seen = response.json.usersById[userId].seen;
      const length = seen.length;

      return seen[length - 1].isSeen;
    });
}

export async function removeBookmark(userId: number, movieId: number) {
  return await model.call(
    ['usersById', userId, 'removeBookmark'],
    [movieId],
    [],
    [['bookmarks', 'length']]
  )
    .then((response: any) => {
      console.log('removeBookmark: ', response);
      const bookmarks = response.json.usersById[userId].bookmarks;
      const length = bookmarks.length;

      return false;
    });
}

export async function removeSeen(userId: number, movieId: number) {
  return await model.call(
    ['usersById', userId, 'removeSeen'],
    [movieId],
    [],
    [['seen', 'length']]
  )
    .then((response: any) => {
      console.log('removeSeen: ', response);
      const seen = response.json.usersById[userId].seen;
      const length = seen.length;

      return false;
    });
}

export async function updateReview(review: any) {
  return await model.call(
    ['usersById', review.userId, 'updateReview'],
    [review],
    [['rating', 'watchWith', 'pace', 'theme', 'plot']],
    [['reviews', 'lastUpdatedIndex']]
  )
    .then((response: any) => {
      console.log('updateReview: ', response);
      const reviews = response.json.usersById[review.userId].reviews;
      const result = reviews[reviews.lastUpdatedIndex];
      const { rating, watchWith, pace, theme, plot } = result;

      return { rating, watchWith, pace, theme, plot };
    });
}
